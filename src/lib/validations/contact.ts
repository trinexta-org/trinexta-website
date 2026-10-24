import { z } from "zod";
import {
  BESOIN_VALUES,
  MOMENT_VALUES,
  POSTES_VALUES,
  PROFIL_VALUES,
  RDV_FORMAT_VALUES,
  SUITE_VALUES,
} from "@/data/contact-trinexta";
import { OFFRE_SLUGS } from "@/data/offres";
import { estDateRdvValide } from "@/lib/contact/rdv";

const texteFacultatif = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

/**
 * Formulaire de contact TRINEXTA (même principe que Studio).
 * Toujours obligatoires : profil, besoin, prénom, nom, e-mail, téléphone (10 chiffres), suite.
 * Entreprise obligatoire seulement pour une entreprise existante ; SIRET et taille du parc facultatifs.
 * Message obligatoire seulement pour un simple message ; créneau exigé pour un rendez-vous.
 */
export const contactFormSchema = z
  .object({
    profil: z.enum(PROFIL_VALUES, { message: "Indiquez qui vous êtes" }),
    besoin: z.enum(BESOIN_VALUES, { message: "Choisissez l'objet de votre demande" }),
    prenom: z.string({ error: "Le prénom est requis" }).trim().min(1, "Le prénom est requis").max(100),
    nom: z.string({ error: "Le nom est requis" }).trim().min(1, "Le nom est requis").max(100),
    email: z
      .string({ error: "L'e-mail est requis" })
      .trim()
      .min(1, "L'e-mail est requis")
      .email("Le format de l'e-mail est invalide")
      .max(200),
    telephone: z
      .string({ error: "Le téléphone est requis" })
      .transform((v) => v.replace(/[\s.-]/g, ""))
      .pipe(z.string().regex(/^0[1-9]\d{8}$/, "Le numéro doit compter 10 chiffres, par exemple 06 12 34 56 78"))
      .transform((v) => v.replace(/(\d{2})(?=\d)/g, "$1 ")),
    entreprise: texteFacultatif(200),
    siret: z
      .string()
      .optional()
      .transform((v) => v?.replace(/\s/g, "") || undefined)
      .refine((v) => !v || /^\d{14}$/.test(v), "Le SIRET compte 14 chiffres"),
    ville: texteFacultatif(120),
    postes: z.enum(POSTES_VALUES).optional(),
    offre: z.enum(OFFRE_SLUGS).optional(),
    message: texteFacultatif(5000),
    suite: z.enum(SUITE_VALUES, { message: "Rappel, rendez-vous ou message ?" }),
    moment: z.enum(MOMENT_VALUES).optional(),
    rdvDate: z.string().optional(),
    rdvFormat: z.enum(RDV_FORMAT_VALUES).optional(),
  })
  // `when` : ces vérifications tournent même si d'autres champs sont en erreur,
  // pour afficher toutes les erreurs du formulaire d'un coup.
  .superRefine(
    (data, ctx) => {
      if (data.suite === "message" && !data.message) {
        ctx.addIssue({ code: "custom", message: "Décrivez votre demande en quelques mots", path: ["message"] });
      }
      if (data.suite !== "rdv") return;
      if (!data.rdvDate || !estDateRdvValide(data.rdvDate)) {
        ctx.addIssue({ code: "custom", message: "Choisissez un jour ouvré, à partir de demain", path: ["rdvDate"] });
      }
      if (!data.moment) ctx.addIssue({ code: "custom", message: "Matin ou après-midi ?", path: ["moment"] });
      if (!data.rdvFormat) ctx.addIssue({ code: "custom", message: "Visio, dans vos locaux ou au Magellan ?", path: ["rdvFormat"] });
    },
    { when: () => true }
  )
  .refine((data) => data.profil !== "entreprise" || !!data.entreprise, {
    message: "Le nom de l'entreprise est requis",
    path: ["entreprise"],
    when: (payload) => (payload.value as { profil?: unknown })?.profil === "entreprise",
  })
  .transform((data) => ({
    ...data,
    siret: data.profil === "entreprise" ? data.siret : undefined,
    ville: data.profil === "entreprise" ? data.ville : undefined,
    moment: data.suite === "message" ? undefined : data.moment,
    rdvDate: data.suite === "rdv" ? data.rdvDate : undefined,
    rdvFormat: data.suite === "rdv" ? data.rdvFormat : undefined,
  }));

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;
