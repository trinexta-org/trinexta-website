import { getOffreContactHref } from "@/data/offres";

// Offre d'entrée Sérénité Essentielle : aucun prix affiché, le tarif est établi par un conseiller.
// Réutilisé par la section de /serenite, la FAQ et la slide d'accueil.

export const SERENITE_ESSENTIELLE = {
  badge: "Nouveau : offre d'entrée",
  title: "La sécurité de vos postes, pour le prix d'un *café* par jour.",
  subtitle: "Surveillance antivirus et EDR, sans engagement.",
  priceNote: "Par poste. Le tarif exact est établi par un conseiller selon votre parc.",
  inclus: [
    "Licence antivirus et EDR fournie et déployée",
    "Supervision des alertes de sécurité",
    "Vous êtes prévenu dès qu'une menace est détectée",
    "Un rapport de sécurité chaque mois",
  ],
  horsForfait: "Assistance et interventions chiffrées à la demande.",
  ctaLabel: "Être rappelé par un conseiller",
  ctaHref: getOffreContactHref("serenite-essentielle"),
  engagement: "Sans engagement, résiliable chaque mois.",
} as const;

export type ComparatifValeur = "inclus" | "sur-devis" | string;

export const COMPARATIF_ESSENTIELLE: { critere: string; essentielle: ComparatifValeur; serenite: ComparatifValeur }[] = [
  { critere: "Supervision antivirus et EDR", essentielle: "inclus", serenite: "inclus" },
  { critere: "Rapport de sécurité mensuel", essentielle: "inclus", serenite: "inclus" },
  { critere: "Support utilisateurs", essentielle: "sur-devis", serenite: "Illimité" },
  { critere: "Remédiation des incidents", essentielle: "sur-devis", serenite: "inclus" },
  { critere: "Intervention sur site", essentielle: "sur-devis", serenite: "Selon besoin" },
  { critere: "Engagement", essentielle: "Aucun", serenite: "Aucun" },
];

export const FAQ_ESSENTIELLE = {
  question: "Que comprend l'offre Sérénité Essentielle ?",
  answer:
    "Sérénité Essentielle est notre offre d'entrée, centrée sur la sécurité de vos postes : licence antivirus et EDR fournie et déployée, supervision des alertes, alerte dès qu'une menace est détectée et rapport de sécurité mensuel. Elle est sans engagement et résiliable chaque mois.\n\nElle n'inclut pas d'assistance : le support utilisateurs, la remédiation et les interventions sur site sont chiffrés à la demande. Quand vous voulez déléguer toute votre informatique, l'offre Sérénité prend le relais.",
};
