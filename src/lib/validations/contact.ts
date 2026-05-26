import { z } from "zod";

export const contactFormSchema = z.object({
  type: z.enum(["devis", "support", "candidature", "autre"]),
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Le format de l'email est invalide"),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  secteur: z.string().optional(),
  taille: z.string().optional(),
  urgence: z.string().optional(),
  message: z.string().min(1, "Le message est requis"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;