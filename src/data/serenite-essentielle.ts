import { getOffreContactHref } from "@/data/offres";

// Offre d'entrée Sérénité Essentiel (le nom de fichier et le slug gardent l'ancienne graphie).
// Réutilisé par la slide d'accueil. Le détail de l'offre vit dans src/data/serenite.ts.

export const SERENITE_ESSENTIELLE = {
  badge: "Nouveau : offre d'entrée",
  // Version courte pour la slide d'accueil (titre en très gros caractères)
  heroTitle: "La sécurité au prix d'un *café*",
  heroSubtitle: "Sérénité Essentiel : antivirus nouvelle génération et EDR pour vos postes, à 29,99 € HT par poste et par mois.",
  ctaLabel: "Être rappelé par un conseiller",
  ctaHref: getOffreContactHref("serenite-essentielle"),
} as const;
