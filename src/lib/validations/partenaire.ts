import { z } from "zod"
import { PARTENAIRES_SOURCE_VALUES } from "@/data/programme-partenaires"

/**
 * Candidature au programme TRINEXTA Partenaires.
 * Tout est obligatoire sauf la source : un partenaire doit avoir une entreprise immatriculée (SIRET).
 */
export const partenaireFormSchema = z.object({
  prenom: z.string({ error: "Le prénom est requis" }).trim().min(1, "Le prénom est requis").max(100),
  nom: z.string({ error: "Le nom est requis" }).trim().min(1, "Le nom est requis").max(100),
  activite: z
    .string({ error: "Indiquez votre activité" })
    .trim()
    .min(2, "Indiquez votre activité")
    .max(200),
  entreprise: z
    .string({ error: "Le nom de votre entreprise est requis" })
    .trim()
    .min(1, "Le nom de votre entreprise est requis")
    .max(200),
  siret: z
    .string({ error: "Le SIRET est requis" })
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().regex(/^\d{14}$/, "Le SIRET compte 14 chiffres")),
  ville: z.string({ error: "La ville est requise" }).trim().min(1, "La ville est requise").max(120),
  telephone: z
    .string({ error: "Le téléphone est requis" })
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .pipe(z.string().regex(/^0[1-9]\d{8}$/, "Le numéro doit compter 10 chiffres, par exemple 06 12 34 56 78"))
    .transform((v) => v.replace(/(\d{2})(?=\d)/g, "$1 ")),
  email: z
    .string({ error: "L'e-mail est requis" })
    .trim()
    .min(1, "L'e-mail est requis")
    .email("Le format de l'e-mail est invalide")
    .max(200),
  source: z
    .enum(PARTENAIRES_SOURCE_VALUES)
    .optional()
    .or(z.literal("").transform(() => undefined)),
})

export type PartenaireFormInput = z.input<typeof partenaireFormSchema>
export type PartenaireFormData = z.output<typeof partenaireFormSchema>
