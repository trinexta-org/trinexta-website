import { z } from "zod";

const optionalTrimmedText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

export const contactFormSchema = z.object({
  type: z.enum(["devis", "support", "candidature", "autre"]),
  prenom: z.string().trim().min(1, "Le prénom est requis"),
  nom: z.string().trim().min(1, "Le nom est requis"),
  email: z.string().trim().email("Le format de l'email est invalide"),
  telephone: optionalTrimmedText,
  entreprise: optionalTrimmedText,
  secteur: optionalTrimmedText,
  taille: optionalTrimmedText,
  urgence: optionalTrimmedText,
  message: z.string().trim().min(1, "Le message est requis"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
