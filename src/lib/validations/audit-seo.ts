import { z } from "zod";

const FRENCH_PHONE_REGEX = /^(?:\+33|0)\s*[1-9](?:[\s.-]?\d{2}){4}$/;

// Requête de lancement d'un audit : URL de la Cible + identité du Prospect
// (Gate en amont). Le téléphone est optionnel, le reste obligatoire.
export const auditSeoRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "L'URL est requise")
    .max(2000)
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Entrez une URL http(s) valide (ex. https://mon-site.fr)"),
  prenom: z.string().trim().min(1, "Le prénom est requis").max(100),
  nom: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.email("Le format de l'email est invalide").max(200),
  entreprise: z.string().trim().min(1, "Le nom de l'entreprise est requis").max(200),
  telephone: z
    .string()
    .trim()
    .regex(FRENCH_PHONE_REGEX, "Le format du téléphone est invalide")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, "Le consentement est requis"),
});

export type AuditSeoRequestData = z.infer<typeof auditSeoRequestSchema>;
