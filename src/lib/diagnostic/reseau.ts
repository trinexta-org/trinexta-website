import { lookup, Resolver } from "node:dns/promises";
import { connect } from "node:tls";
import { isPrivateIp, UrlRefuseeError } from "./assert-public-url";

// Accès réseau hors HTTP : certificat TLS et enregistrements DNS.
// Mêmes garde-fous que les requêtes HTTP : IP publique vérifiée avant la connexion.

const DELAI_TLS_MS = 6000;
const DELAI_DNS_MS = 3000;

export interface InfoCertificat {
  /** Chaîne de confiance et nom d'hôte validés par Node. */
  autorise: boolean;
  /** Code d'erreur de validation (ex. CERT_HAS_EXPIRED), null si valide. */
  erreur: string | null;
  /** Date de fin de validité, null si illisible. */
  expireLe: Date | null;
}

/**
 * Lit le certificat présenté sur le port 443. Le domaine est résolu ici, chaque
 * adresse est contrôlée, puis la connexion part vers l'IP vérifiée avec
 * `servername` : aucune seconde résolution ne peut viser une adresse interne.
 */
export async function lireCertificat(hote: string, signal?: AbortSignal): Promise<InfoCertificat> {
  const adresses = await lookup(hote, { all: true });
  if (adresses.length === 0 || adresses.some((a) => isPrivateIp(a.address))) {
    throw new UrlRefuseeError("Adresse non autorisée");
  }
  const ip = adresses[0].address;

  return new Promise<InfoCertificat>((resolve, reject) => {
    const socket = connect({
      host: ip,
      port: 443,
      servername: hote,
      // On veut lire un certificat invalide pour le signaler, pas refuser la connexion.
      rejectUnauthorized: false,
      timeout: DELAI_TLS_MS,
    });
    const fin = (erreur?: Error, info?: InfoCertificat) => {
      signal?.removeEventListener("abort", surAnnulation);
      socket.destroy();
      if (erreur) reject(erreur);
      else resolve(info!);
    };
    const surAnnulation = () => fin(new Error("Délai dépassé"));
    signal?.addEventListener("abort", surAnnulation, { once: true });

    socket.once("secureConnect", () => {
      const certificat = socket.getPeerCertificate();
      const expire = certificat?.valid_to ? new Date(certificat.valid_to) : null;
      const erreur = socket.authorizationError;
      fin(undefined, {
        autorise: socket.authorized,
        erreur: erreur ? String((erreur as unknown as { code?: string }).code ?? erreur) : null,
        expireLe: expire && !Number.isNaN(expire.getTime()) ? expire : null,
      });
    });
    socket.once("timeout", () => fin(new Error("Délai dépassé")));
    socket.once("error", (e) => fin(e));
  });
}

export type ResultatTxt = { etat: "trouve"; enregistrements: string[] } | { etat: "absent" } | { etat: "erreur" };

const CODES_ABSENCE = new Set(["ENODATA", "ENOTFOUND", "NXDOMAIN"]);

/** Enregistrements TXT d'un nom (morceaux recollés). « absent » si le nom n'en publie pas. */
export async function lireTxt(nom: string): Promise<ResultatTxt> {
  const resolveur = new Resolver({ timeout: DELAI_DNS_MS, tries: 2 });
  try {
    const enregistrements = await resolveur.resolveTxt(nom);
    if (enregistrements.length === 0) return { etat: "absent" };
    return { etat: "trouve", enregistrements: enregistrements.map((morceaux) => morceaux.join("")) };
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code && CODES_ABSENCE.has(code)) return { etat: "absent" };
    return { etat: "erreur" };
  }
}
