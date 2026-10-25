import { CHAMP_PIEGE } from "@/data/anti-abus";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";

/**
 * Protections communes des routes publiques qui envoient un e-mail
 * (skill studio-securite, § 2) : corps JSON strict, piège à robots,
 * limite d'envois par IP et par adresse e-mail.
 */

/** true si le champ piège est rempli : la requête vient d'un robot. */
export function estRobot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const valeur = (body as Record<string, unknown>)[CHAMP_PIEGE];
  return typeof valeur === "string" && valeur.trim() !== "";
}

/**
 * Lit un corps JSON. null si le Content-Type n'est pas JSON (un site tiers ne
 * peut alors pas faire soumettre le formulaire sans prévol CORS) ou si le JSON
 * est invalide (400 au lieu de 500).
 */
export async function lireCorpsJson(request: Request): Promise<unknown | null> {
  const type = request.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) return null;
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/** Limite d'envois par IP pour une route donnée. */
export function limiteParIp(request: Request, route: string, max: number): boolean {
  return checkRateLimit(`${route}:ip:${hashIp(getClientIp(request))}`, max);
}

/** Limite d'envois par adresse e-mail destinataire (empêche de bombarder une même boîte). */
export function limiteParEmail(email: string, route: string, max: number): boolean {
  return checkRateLimit(`${route}:email:${hashIp(email.trim().toLowerCase())}`, max);
}
