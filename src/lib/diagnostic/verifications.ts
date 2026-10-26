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
  lireEntete,
  nonVerifiable,
  sembleExpose,
  SELECTEURS_DKIM,
  type EntreeConnexion,
  type EtatSonde,
  type ReponseEntete,
  type ReponseSonde,
} from "./analyses";
import { domaineMessagerie } from "./domaine";
import { lireCertificat, lireTxt } from "./reseau";
import { requeteBridee, type ReponseBridee } from "./requete";
import type { IdVerification, ResultatVerification } from "./types";

// Orchestration des six vérifications non intrusives. Chacune est indépendante : une
// erreur ou un dépassement de délai donne « indetermine » pour elle seule.

export const DELAI_TOTAL_MS = 20_000;
// Le HTML analysé est limité aux 512 premiers Ko (borne aussi le coût des regex).
export const MAX_OCTETS_ACCUEIL = 512 * 1024;
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
  if (accueil.statut >= 300 && accueil.statut < 400) {
    return "La page d'accueil redirige trop de fois, ou sans adresse de destination : elle n'a pas pu être lue.";
  }
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

/** Hôte autorisé pour les sondes de fichiers : le domaine saisi, avec ou sans www. */
export function memeSite(domaine: string, urlFinale: string): boolean {
  const base = domaineMessagerie(domaine);
  const hote = new URL(urlFinale).hostname.toLowerCase();
  return hote === base || hote === `www.${base}`;
}

/** Domaines où chercher DMARC : le domaine, puis ses parents (au moins deux labels). */
export function domainesDmarc(domaine: string): string[] {
  const labels = domaine.split(".");
  const sorties: string[] = [];
  for (let i = 0; labels.length - i >= 2; i++) sorties.push(labels.slice(i).join("."));
  return sorties;
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
        const lireDmarc = async () => {
          // Un sous-domaine sans politique propre hérite de celle de son parent.
          let dernier = { domaine: domaineMail, txt: await deps.lireTxt(`_dmarc.${domaineMail}`) };
          for (const parent of domainesDmarc(domaineMail).slice(1)) {
            if (dernier.txt.etat !== "absent") break;
            dernier = { domaine: parent, txt: await deps.lireTxt(`_dmarc.${parent}`) };
          }
          return dernier;
        };
        const [spf, dmarc, ...dkim] = await Promise.all([
          deps.lireTxt(domaineMail),
          lireDmarc(),
          ...SELECTEURS_DKIM.map((s) => deps.lireTxt(`${s}._domainkey.${domaineMail}`)),
        ]);
        return evaluerMessagerie({
          domaine: domaineMail,
          domaineDmarc: dmarc.domaine,
          spf,
          dmarc: dmarc.txt,
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
        return evaluerTraceurs(new TextDecoder().decode(a.corps.subarray(0, MAX_OCTETS_ACCUEIL)), cookiesDeposes(a.entetes));
      }),

      borner("fichiers", async () => {
        const a = await accueil;
        // On ne sonde que le site saisi : si l'accueil part ailleurs, rien n'est demandé à l'autre hôte.
        if (a && !memeSite(domaine, a.urlFinale)) {
          return nonVerifiable(
            "fichiers",
            "Le site redirige vers un autre domaine : cette vérification n'a pas été faite."
          );
        }
        const origine = a ? new URL(a.urlFinale).origin : `https://${domaine}`;
        const lireDebut = async (chemin: string): Promise<ReponseSonde> => {
          const r = await deps.requete(`${origine}${chemin}`, { signal, maxRedirections: 0, maxOctets: MAX_OCTETS_SONDE });
          return { statut: r.statut, debut: r.corps };
        };
        const lireTete = async (chemin: string): Promise<ReponseEntete> => {
          const r = await deps.requete(`${origine}${chemin}`, { signal, methode: "HEAD", maxRedirections: 0 });
          return lireEntete(r.statut, r.entetes);
        };
        // Témoin : une adresse qui ne peut pas exister. Un site qui répond 200
        // partout ne doit pas produire de faux positif.
        const cheminTemoin = `/trinexta-diagnostic-${randomBytes(6).toString("hex")}.txt`;
        const [temoinTete, temoinDebut] = await Promise.all([
          lireTete(cheminTemoin).catch(() => null),
          lireDebut(cheminTemoin).catch(() => null),
        ]);
        const sondes = await Promise.all(
          FICHIERS_SENSIBLES.map(async (f): Promise<{ chemin: string; etat: EtatSonde }> => {
            try {
              const tete = await lireTete(f.chemin);
              if (f.mode === "entete") {
                return { chemin: f.chemin, etat: sembleExpose(f.types, tete, temoinTete) ? "probable" : "non" };
              }
              // HEAD refusé (405, 501) : on lit les premiers octets par GET.
              if (tete.statut !== 200 && tete.statut !== 405 && tete.statut !== 501) {
                return { chemin: f.chemin, etat: "non" };
              }
              const expose = estExpose(f.signature, await lireDebut(f.chemin), temoinDebut);
              return { chemin: f.chemin, etat: expose ? "expose" : "non" };
            } catch {
              return { chemin: f.chemin, etat: null };
            }
          })
        );
        return evaluerFichiers(sondes);
      }),

      borner("versions", async () => {
        const a = await accueil;
        const probleme = accueilExploitable(a);
        if (probleme || !a) return nonVerifiable("versions", probleme ?? MESSAGE_ACCUEIL_ILLISIBLE);
        const html = estHtml(a) ? new TextDecoder().decode(a.corps.subarray(0, MAX_OCTETS_ACCUEIL)) : "";
        return evaluerVersions(detecterLogiciels(a.entetes, html));
      }),
    ]);
  } finally {
    clearTimeout(minuteur);
    controleur.abort();
  }
}
