import { assertPublicUrl, AuditUrlError, type AssertPublicUrlOptions } from "./assert-public-url";

// Fetch bridé de la Cible : timeout court, taille plafonnée, HTML only,
// redirections limitées et re-vérifiées (anti-SSRF), user-agent identifiable.

const TIMEOUT_MS = 8000;
const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo
const MAX_REDIRECTS = 3;
const USER_AGENT = "TrinextaAuditBot/1.0 (+https://trinexta.fr)";

/** Erreur de récupération de la Cible. Message affichable côté prospect. */
export class AuditFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuditFetchError";
  }
}

export interface FetchedTarget {
  /** URL finale effectivement analysée (après redirections). */
  finalUrl: string;
  status: number;
  html: string;
}

function isHtml(contentType: string): boolean {
  return contentType.includes("text/html") || contentType.includes("application/xhtml+xml");
}

async function readCapped(response: Response, maxBytes: number = MAX_BYTES): Promise<string> {
  const declared = response.headers.get("content-length");
  if (declared && Number(declared) > maxBytes) {
    throw new AuditFetchError("Page trop volumineuse");
  }

  const body = response.body;
  if (!body) return "";

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        throw new AuditFetchError("Page trop volumineuse");
      }
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  return new TextDecoder("utf-8").decode(concat(chunks, total));
}

function concat(chunks: Uint8Array[], total: number): Uint8Array {
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

const ROBOTS_TIMEOUT_MS = 5000;
const ROBOTS_MAX_BYTES = 512 * 1024; // 512 Ko

/**
 * Récupère /robots.txt de l'origine de la Cible. Tolérant : renvoie null en cas
 * d'absence, d'erreur ou de réponse non exploitable (le check "robots.txt
 * manquant" tranchera). Ne suit pas les redirections (anti-SSRF).
 */
export async function fetchRobotsTxt(
  finalUrl: string,
  options: AssertPublicUrlOptions = {}
): Promise<string | null> {
  let robotsUrl: URL;
  try {
    robotsUrl = new URL("/robots.txt", finalUrl);
    await assertPublicUrl(robotsUrl.toString(), options);
  } catch {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ROBOTS_TIMEOUT_MS);
  try {
    const response = await fetch(robotsUrl, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, Accept: "text/plain" },
    });
    if (response.status !== 200) return null;
    const text = await readCapped(response, ROBOTS_MAX_BYTES);
    return text;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Récupère le HTML de la Cible en appliquant toutes les brides.
 * Chaque redirection est re-validée par assertPublicUrl (anti-SSRF).
 * Lève AuditUrlError (URL refusée) ou AuditFetchError (récupération impossible).
 */
export async function fetchTargetHtml(
  rawUrl: string,
  options: AssertPublicUrlOptions = {}
): Promise<FetchedTarget> {
  let current = await assertPublicUrl(rawUrl, options);
  let redirects = 0;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    for (;;) {
      let response: Response;
      try {
        response = await fetch(current, {
          method: "GET",
          redirect: "manual",
          signal: controller.signal,
          headers: {
            "User-Agent": USER_AGENT,
            Accept: "text/html,application/xhtml+xml",
          },
        });
      } catch (error) {
        if (error instanceof AuditUrlError) throw error;
        if (controller.signal.aborted) throw new AuditFetchError("Délai dépassé");
        throw new AuditFetchError("Site injoignable");
      }

      const location = response.headers.get("location");
      if (response.status >= 300 && response.status < 400 && location) {
        redirects += 1;
        if (redirects > MAX_REDIRECTS) throw new AuditFetchError("Trop de redirections");
        const next = new URL(location, current);
        current = await assertPublicUrl(next.toString(), options); // re-vérification
        continue;
      }

      if (response.status >= 400) {
        throw new AuditFetchError(`La page a répondu ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!isHtml(contentType)) {
        throw new AuditFetchError("La cible ne renvoie pas de HTML");
      }

      const html = await readCapped(response);
      return { finalUrl: current.toString(), status: response.status, html };
    }
  } finally {
    clearTimeout(timeout);
  }
}
