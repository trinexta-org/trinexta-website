import { randomBytes } from "node:crypto";
import {
  analyserEntetes,
  cookiesDeposes,
  detecterLogiciels,
  estCleDkim,
  estExpose,
  evaluerConnexion,
  evaluerEntetes,
  evaluerFichiers,
  evaluerMessagerie,
  evaluerTraceurs,
  evaluerVersions,
  FICHIERS_SENSIBLES,
  nonVerifiable,
  SELECTEURS_DKIM,
  type EntreeConnexion,
  type ReponseSonde,
} from "./analyses";
import { domaineMessagerie } from "./domaine";
import { lireCertificat, lireTxt } from "./reseau";
import { requeteBridee, type ReponseBridee } from "./requete";
import type { IdVerification, ResultatVerification } from "./types";

// Orchestration des six vérifications passives. Chacune est indépendante : une
// erreur ou un dépassement de délai donne « indetermine » pour elle seule.

export const DELAI_TOTAL_MS = 20_000;
const MAX_OCTETS_ACCUEIL = 2 * 1024 * 1024;
const MAX_OCTETS_SONDE = 512;

export interface Dependances {
  requete: typeof requeteBridee;
  lireCertificat: typeof lireCertificat;
  lireTxt: typeof lireTxt;
  maintenant: () => Date;
}

const DEPENDANCES: Dependances = {
  requete: requeteBridee,
  lireCertificat,
  lireTxt,
  maintenant: () => new Date(),
};

const MESSAGE_ACCUEIL_ILLISIBLE = "La page d'accueil n'a pas pu être lue en HTTPS pendant l'analyse.";

/** La page d'accueil HTTPS est-elle exploitable ? Sinon, le constat à afficher. */
function accueilExploitable(accueil: ReponseBridee | null): string | null {
  if (!accueil || !accueil.urlFinale.startsWith("https:")) return MESSAGE_ACCUEIL_ILLISIBLE;
  if (accueil.statut >= 400) {
    return `La page d'accueil a répondu par une erreur (code ${accueil.statut}) : elle bloque peut-être les visites automatisées.`;
  }
  return null;
}

function estHtml(accueil: ReponseBridee): boolean {
  const type = (accueil.entetes.get("content-type") ?? "").toLowerCase();
  return type.includes("text/html") || type.includes("application/xhtml+xml");
}

function comportementHttp(reponse: ReponseBridee | null): EntreeConnexion["http"] {
  if (!reponse) return "injoignable";
  if (reponse.urlFinale.startsWith("https:")) return "redirige-https";
  const location = reponse.entetes.get("location") ?? "";
  if (reponse.statut >= 300 && reponse.statut < 400 && /^https:/i.test(location)) return "redirige-https";
  return "reste-http";
}

/** Lance les six vérifications sur un domaine déjà validé. Ne lève jamais. */
export async function lancerDiagnostic(
  domaine: string,
  deps: Dependances = DEPENDANCES,
  delaiTotalMs: number = DELAI_TOTAL_MS
): Promise<ResultatVerification[]> {
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), delaiTotalMs);
  const signal = controleur.signal;

  const sansErreur = <T>(p: Promise<T>): Promise<T | null> => p.catch(() => null);

  // Lectures partagées entre plusieurs vérifications.
  const accueil = sansErreur(
    deps.requete(`https://${domaine}/`, {
      signal,
      accept: "text/html,application/xhtml+xml",
      maxOctets: MAX_OCTETS_ACCUEIL,
    })
  );
  const http = sansErreur(deps.requete(`http://${domaine}/`, { signal, maxOctets: 0 }));
  const certificat = sansErreur(deps.lireCertificat(domaine, signal));

  const borner = (id: IdVerification, travail: () => Promise<ResultatVerification>): Promise<ResultatVerification> =>
    Promise.race([
      travail().catch((error) => {
        console.error(`[diagnostic] vérification ${id}`, error);
        return nonVerifiable(id, "Cette vérification n'a pas pu aboutir.");
      }),
      new Promise<ResultatVerification>((resolve) => {
        const delai = () => resolve(nonVerifiable(id, "Cette vérification a dépassé le délai prévu."));
        if (signal.aborted) delai();
        else signal.addEventListener("abort", delai, { once: true });
      }),
    ]);

  try {
    return await Promise.all([
      borner("connexion", async () => {
        const [a, h, c] = await Promise.all([accueil, http, certificat]);
        return evaluerConnexion({
          certificat: c,
          httpsRepond: a !== null && a.urlFinale.startsWith("https:"),
          http: comportementHttp(h),
          maintenant: deps.maintenant(),
        });
      }),

      borner("messagerie", async () => {
        const domaineMail = domaineMessagerie(domaine);
        const [spf, dmarc, ...dkim] = await Promise.all([
          deps.lireTxt(domaineMail),
          deps.lireTxt(`_dmarc.${domaineMail}`),
          ...SELECTEURS_DKIM.map((s) => deps.lireTxt(`${s}._domainkey.${domaineMail}`)),
        ]);
        return evaluerMessagerie({
          domaine: domaineMail,
          spf,
          dmarc,
          dkim: SELECTEURS_DKIM.map((selecteur, i) => ({ selecteur, trouve: estCleDkim(dkim[i]) })),
        });
      }),

      borner("entetes", async () => {
        const a = await accueil;
        const probleme = accueilExploitable(a);
        if (probleme || !a) return nonVerifiable("entetes", probleme ?? MESSAGE_ACCUEIL_ILLISIBLE);
        return evaluerEntetes(analyserEntetes(a.entetes));
      }),

      borner("traceurs", async () => {
        const a = await accueil;
        const probleme = accueilExploitable(a);
        if (probleme || !a) return nonVerifiable("traceurs", probleme ?? MESSAGE_ACCUEIL_ILLISIBLE);
        if (!estHtml(a)) return nonVerifiable("traceurs", "La page d'accueil ne renvoie pas de HTML lisible.");
        return evaluerTraceurs(new TextDecoder().decode(a.corps), cookiesDeposes(a.entetes));
      }),

      borner("fichiers", async () => {
        const a = await accueil;
        const origine = a ? new URL(a.urlFinale).origin : `https://${domaine}`;
        const sonder = async (chemin: string): Promise<ReponseSonde> => {
          const r = await deps.requete(`${origine}${chemin}`, {
            signal,
            maxRedirections: 0,
            maxOctets: MAX_OCTETS_SONDE,
          });
          return { statut: r.statut, debut: r.corps };
        };
        // Témoin : une adresse qui ne peut pas exister. Un site qui répond 200
        // partout ne doit pas produire de faux positif.
        const temoin = await sonder(`/trinexta-diagnostic-${randomBytes(6).toString("hex")}.txt`).catch(() => null);
        const sondes = await Promise.all(
          FICHIERS_SENSIBLES.map(async (f) => {
            try {
              const tete = await deps.requete(`${origine}${f.chemin}`, {
                signal,
                methode: "HEAD",
                maxRedirections: 0,
              });
              // HEAD refusé (405, 501) : on lit les premiers octets par GET.
              if (tete.statut !== 200 && tete.statut !== 405 && tete.statut !== 501) {
                return { chemin: f.chemin, expose: false };
              }
              return { chemin: f.chemin, expose: estExpose(f.signature, await sonder(f.chemin), temoin) };
            } catch {
              return { chemin: f.chemin, expose: null };
            }
          })
        );
        return evaluerFichiers(sondes);
      }),

      borner("versions", async () => {
        const a = await accueil;
        const probleme = accueilExploitable(a);
        if (probleme || !a) return nonVerifiable("versions", probleme ?? MESSAGE_ACCUEIL_ILLISIBLE);
        const html = estHtml(a) ? new TextDecoder().decode(a.corps) : "";
        return evaluerVersions(detecterLogiciels(a.entetes, html));
      }),
    ]);
  } finally {
    clearTimeout(minuteur);
    controleur.abort();
  }
}
