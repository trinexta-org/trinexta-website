import { createHash, randomBytes } from "crypto";

// Rate limit en mémoire par IP hashée. L'IP n'est jamais stockée en clair :
// hash SHA-256 salé avec un sel aléatoire propre au processus, non persisté.

const SALT = randomBytes(16).toString("hex");
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

const requestLog = new Map<string, number[]>();

export function hashIp(ip: string): string {
  return createHash("sha256").update(SALT + ip).digest("hex");
}

export function getClientIp(request: Request): string {
  // Derrière Nginx : la première IP de X-Forwarded-For est celle du client.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * true si la requête est autorisée, false si la limite est atteinte.
 * `key` doit être préfixé par endpoint (ex. `email:${hashIp(ip)}`) pour que
 * chaque route ait son propre quota au lieu de partager un compteur global.
 */
export function checkRateLimit(key: string, maxRequests: number = MAX_REQUESTS_PER_WINDOW): boolean {
  const now = Date.now();

  // Nettoyage opportuniste des entrées expirées.
  if (requestLog.size > 1000) {
    for (const [k, timestamps] of requestLog) {
      if (timestamps.every((t) => now - t > WINDOW_MS)) requestLog.delete(k);
    }
  }

  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t <= WINDOW_MS);
  if (timestamps.length >= maxRequests) {
    requestLog.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return true;
}
