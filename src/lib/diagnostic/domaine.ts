import { domainToASCII } from "node:url";
import { z } from "zod";

// Validation du domaine saisi : un nom de domaine public, sans IP, port ni chemin.
// La saisie est tolérante sur la forme (majuscules, http(s)://, barre finale) :
// « https://www.Exemple.fr/ » devient « www.exemple.fr ».

export const MESSAGE_DOMAINE_INVALIDE = "Saisissez l'adresse de votre site, par exemple votre-site.fr.";

const LABEL = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/;
const TLD = /^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

// Suffixes réservés ou internes : jamais un site public.
const SUFFIXES_INTERDITS = [
  "localhost",
  "local",
  "internal",
  "intranet",
  "lan",
  "home",
  "corp",
  "test",
  "example",
  "invalid",
  "onion",
  "arpa",
];

/** Nettoie la saisie : espaces, casse, schéma, barre finale. Ne retire rien d'autre. */
export function nettoyerSaisie(saisie: string): string {
  return saisie
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/\.$/, "");
}

/** Domaine ASCII valide, ou null. */
export function normaliserDomaine(saisie: string): string | null {
  const nettoye = nettoyerSaisie(saisie);
  if (!nettoye || nettoye.length > 253) return null;
  // Chemin, requête, port, identifiants, IPv6 : refusés avant toute conversion.
  if (/[/?#:@\[\]\\\s]/.test(nettoye)) return null;

  const ascii = domainToASCII(nettoye);
  if (!ascii || ascii.length > 253) return null;

  const labels = ascii.split(".");
  if (labels.length < 2) return null;
  if (!labels.every((l) => LABEL.test(l))) return null;
  const tld = labels[labels.length - 1];
  // Un TLD numérique signale une adresse IPv4 : refusée.
  if (!TLD.test(tld)) return null;
  if (SUFFIXES_INTERDITS.includes(tld)) return null;
  return ascii;
}

/** Domaine de messagerie : le domaine saisi sans « www. ». */
export function domaineMessagerie(domaine: string): string {
  return domaine.startsWith("www.") ? domaine.slice(4) : domaine;
}

export const domaineSchema = z
  .string()
  .max(300, MESSAGE_DOMAINE_INVALIDE)
  .transform((valeur, ctx) => {
    const domaine = normaliserDomaine(valeur);
    if (!domaine) {
      ctx.addIssue({ code: "custom", message: MESSAGE_DOMAINE_INVALIDE });
      return z.NEVER;
    }
    return domaine;
  });

export const diagnosticRequeteSchema = z.object({
  domaine: domaineSchema,
});

export const rapportRequeteSchema = z.object({
  diagnosticId: z.string().min(1).max(40),
  /** Jeton remis avec le résultat : seul le navigateur qui a lancé l'analyse peut demander le rapport. */
  jeton: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Adresse e-mail invalide")),
});
