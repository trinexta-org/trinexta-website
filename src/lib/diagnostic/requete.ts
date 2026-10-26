import { assertPublicUrl, type AssertPublicUrlOptions } from "./assert-public-url";
import { avecDispatcherPublic } from "./dispatcher";

// Requête bridée vers le site analysé, adaptée de trinexta-studio (audit-seo/fetch.ts) :
// adresse publique contrôlée avant la requête et à la connexion (agent undici),
// redirections limitées et re-vérifiées, délai court, lecture plafonnée,
// user-agent identifiable.

export const USER_AGENT = "TrinextaDiagnostic/1.0 (+https://trinexta.fr/diagnostic-securite)";
const DELAI_MS = 8000;
const MAX_REDIRECTIONS = 3;
const MAX_OCTETS = 2 * 1024 * 1024;

/** Le site n'a pas répondu (réseau, délai, TLS). */
export class RequeteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequeteError";
  }
}

export interface ReponseBridee {
  /** Adresse qui a produit la réponse, après redirections suivies. */
  urlFinale: string;
  statut: number;
  entetes: Headers;
  /** Corps lu, au plus `maxOctets` octets. */
  corps: Uint8Array;
  /** true si le corps a été coupé à `maxOctets`. */
  tronque: boolean;
}

export interface OptionsRequete extends AssertPublicUrlOptions {
  methode?: "GET" | "HEAD";
  /** Redirections suivies, chacune re-vérifiée. 0 : la réponse 3xx est rendue telle quelle. */
  maxRedirections?: number;
  /** Octets lus au plus ; 0 : corps non lu. */
  maxOctets?: number;
  accept?: string;
  /** Annulation globale (délai total du diagnostic). */
  signal?: AbortSignal;
  delaiMs?: number;
  /** fetch injectable pour les tests. */
  fetchImpl?: typeof fetch;
}

async function lirePlafonne(reponse: Response, maxOctets: number): Promise<{ corps: Uint8Array; tronque: boolean }> {
  if (maxOctets <= 0 || !reponse.body) {
    await reponse.body?.cancel().catch(() => {});
    return { corps: new Uint8Array(0), tronque: false };
  }
  const lecteur = reponse.body.getReader();
  const morceaux: Uint8Array[] = [];
  let total = 0;
  let tronque = false;
  try {
    while (total < maxOctets) {
      const { done, value } = await lecteur.read();
      if (done) break;
      const reste = maxOctets - total;
      if (value.byteLength > reste) {
        morceaux.push(value.subarray(0, reste));
        total += reste;
        tronque = true;
        break;
      }
      morceaux.push(value);
      total += value.byteLength;
    }
    if (!tronque && total >= maxOctets) {
      const suite = await lecteur.read();
      tronque = !suite.done;
    }
  } finally {
    await lecteur.cancel().catch(() => {});
  }
  const corps = new Uint8Array(total);
  let decalage = 0;
  for (const m of morceaux) {
    corps.set(m, decalage);
    decalage += m.byteLength;
  }
  return { corps, tronque };
}

/**
 * Requête bridée. Lève UrlRefuseeError si une adresse (initiale ou de
 * redirection) n'est pas publique, RequeteError si le site ne répond pas.
 */
export async function requeteBridee(url: string, options: OptionsRequete = {}): Promise<ReponseBridee> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const maxRedirections = options.maxRedirections ?? MAX_REDIRECTIONS;
  const signaux = [AbortSignal.timeout(options.delaiMs ?? DELAI_MS)];
  if (options.signal) signaux.push(options.signal);
  const signal = AbortSignal.any(signaux);

  let courante = await assertPublicUrl(url, options);
  let redirections = 0;
  for (;;) {
    let reponse: Response;
    try {
      reponse = await fetchImpl(
        courante,
        avecDispatcherPublic({
          method: options.methode ?? "GET",
          redirect: "manual",
          signal,
          headers: { "User-Agent": USER_AGENT, Accept: options.accept ?? "*/*" },
        })
      );
    } catch {
      throw new RequeteError(signal.aborted ? "Délai dépassé" : "Site injoignable");
    }

    const location = reponse.headers.get("location");
    if (reponse.status >= 300 && reponse.status < 400 && location && redirections < maxRedirections) {
      redirections += 1;
      await reponse.body?.cancel().catch(() => {});
      courante = await assertPublicUrl(new URL(location, courante).toString(), options);
      continue;
    }

    const lecture =
      options.methode === "HEAD"
        ? { corps: new Uint8Array(0), tronque: false }
        : await lirePlafonne(reponse, options.maxOctets ?? MAX_OCTETS).catch(() => {
            throw new RequeteError(signal.aborted ? "Délai dépassé" : "Lecture interrompue");
          });
    return {
      urlFinale: courante.toString(),
      statut: reponse.status,
      entetes: reponse.headers,
      corps: lecture.corps,
      tronque: lecture.tronque,
    };
  }
}
