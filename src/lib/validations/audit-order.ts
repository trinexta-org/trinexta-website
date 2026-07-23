import { z } from "zod";

export const auditOrderRequestSchema = z.object({
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
    tva: z.string().trim().max(20).optional().or(z.literal("")),
    seoAuditId: z.string().trim().max(100).optional(),
    consent: z.literal(true, "Le consentement est requis"),
});

export type AuditOrderRequestData = z.infer<typeof auditOrderRequestSchema>;