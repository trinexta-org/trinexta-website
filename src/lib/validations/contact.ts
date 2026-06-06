import { z } from "zod";

export const CONTACT_TYPES = ["devis", "support", "autre"] as const
export const SECTEURS = ["Commerce", "Sante", "BTP", "Finance", "IT", "Industrie", "Autre"] as const
export const TAILLES = ["1-9", "10-49", "50-249", "250+"] as const
export const URGENCES = ["Faible", "Normale", "Haute", "Critique"] as const

const optionalTrimmedText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

export const contactFormSchema = z.object({
  type: z.enum(["devis", "support", "autre"]),
  prenom: z.string().trim().min(1, "Le prénom est requis"),
  nom: z.string().trim().min(1, "Le nom est requis"),
  email: z.string().trim().email("Le format de l'email est invalide"),
  telephone: z.string().trim().optional(),
  entreprise: z.string().trim().optional(),
  secteur: z.string().trim().optional(),
  taille: z.string().trim().optional(),
  urgence: z.string().trim().optional(),
  message: z.string().trim().min(1, "Le message est requis"),
  siret: z.string().trim().optional(),
}).superRefine((data, ctx) => {

  if (data.type === "devis") {
    if (!data.entreprise || data.entreprise.trim() === "") {
      ctx.addIssue({ code: "custom", message: "Le nom de l'entreprise est requis", path: ["entreprise"] });
    }
    if (!data.secteur || data.secteur === "") {
      ctx.addIssue({ code: "custom", message: "Le secteur est requis", path: ["secteur"] });
    }
    if (!data.taille || data.taille === "") {
      ctx.addIssue({ code: "custom", message: "La taille est requise", path: ["taille"] });
    }

    const siretRegex = /^\d{14}$/;
    if (!data.siret || !siretRegex.test(data.siret)) {
      ctx.addIssue({
        code: "custom",
        message: "Le numéro SIRET doit contenir 14 chiffres",
        path: ["siret"]
      });
    }
  }

  if (data.type === "support") {
    if (!data.urgence || data.urgence === "") {
      ctx.addIssue({ code: "custom", message: "Le niveau d'urgence est requis", path: ["urgence"] });
    }
  }
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
