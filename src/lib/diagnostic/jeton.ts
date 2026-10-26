import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

// Jetons du diagnostic : 32 octets aléatoires en base64url, remis une seule
// fois (navigateur ou e-mail) et stockés uniquement sous forme de SHA-256.

const FORMAT = /^[A-Za-z0-9_-]{43}$/;

export function hacherJeton(jeton: string): string {
  return createHash("sha256").update(jeton).digest("hex");
}

export function creerJeton(): { jeton: string; hash: string } {
  const jeton = randomBytes(32).toString("base64url");
  return { jeton, hash: hacherJeton(jeton) };
}

export function formatJetonValide(jeton: unknown): jeton is string {
  return typeof jeton === "string" && FORMAT.test(jeton);
}

/** Compare le jeton fourni au hash stocké, en temps constant. */
export function jetonValide(jeton: unknown, hashStocke: string | null): boolean {
  if (!hashStocke || !formatJetonValide(jeton)) return false;
  const attendu = Buffer.from(hashStocke, "hex");
  const fourni = Buffer.from(hacherJeton(jeton), "hex");
  return attendu.length === fourni.length && timingSafeEqual(attendu, fourni);
}
