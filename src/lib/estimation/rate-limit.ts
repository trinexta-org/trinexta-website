import { createHash, randomBytes } from "crypto";

// Rate limit en mémoire par IP hashée. L'IP n'est jamais stockée en clair :
// hash SHA-256 salé avec un sel aléatoire propre au processus, non persisté.

const SALT = randomBytes(16).toString("hex");
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

// Chaque clé garde sa fenêtre : une route peut compter sur 24 h sans que le
// nettoyage, réglé sur 10 min pour les autres, n'efface ses horodatages.
const requestLog = new Map<string, { fenetreMs: number; horodatages: number[] }>();

export function hashIp(ip: string): string {
  return createHash("sha256").update(SALT + ip).digest("hex");
}

export function getClientIp(request: Request): string {
  // Derrière Nginx. X-Real-IP vaut $remote_addr : posé par Nginx, le client ne
  // peut pas le forger. Dans X-Forwarded-For, seule la dernière entrée est
  // ajoutée par Nginx ($proxy_add_x_forwarded_for) ; les premières viennent du
  // client et permettraient de changer d'IP apparente à chaque requête.
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const derniere = forwarded.split(",").at(-1)?.trim();
    if (derniere) return derniere;
  }
  return "unknown";
}

/**
 * true si la requête est autorisée, false si la limite est atteinte.
 * `key` doit être préfixé par endpoint (ex. `email:${hashIp(ip)}`) pour que
 * chaque route ait son propre quota au lieu de partager un compteur global.
 * `fenetreMs` : durée de la fenêtre glissante, 10 minutes par défaut.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = MAX_REQUESTS_PER_WINDOW,
  fenetreMs: number = WINDOW_MS
): boolean {
  const now = Date.now();

  // Nettoyage opportuniste des entrées expirées, chacune selon sa propre fenêtre.
  if (requestLog.size > 1000) {
    for (const [k, entree] of requestLog) {
      if (entree.horodatages.every((t) => now - t > entree.fenetreMs)) requestLog.delete(k);
    }
  }

  const horodatages = (requestLog.get(key)?.horodatages ?? []).filter((t) => now - t <= fenetreMs);
  if (horodatages.length >= maxRequests) {
    requestLog.set(key, { fenetreMs, horodatages });
    return false;
  }

  horodatages.push(now);
  requestLog.set(key, { fenetreMs, horodatages });
  return true;
}
