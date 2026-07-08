import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).

export const trinextaStudioGrid: ServiceGrid = {
  serviceId: "trinexta-studio",
  label: "Trinexta Studio",
  pricing: {
    kind: "one-shot",
    tierQuestionId: "projet-envergure",
    fallbackTierOptionId: "standard",
    tiers: [
      { optionId: "simple", min: 2500, max: 5000 },
      { optionId: "standard", min: 5000, max: 15000 },
      { optionId: "sur-mesure", min: 12000, max: 25000 },
    ],
  },
  spreadPercent: 0,
  answerAdjustments: [
    { questionId: "projet-type", optionId: "app", percent: 50, label: "Application web ou mobile" },
  ],
  aiModifiers: [
    { id: "studio-ecommerce", label: "Vente en ligne", hint: "Paiement en ligne, boutique, réservation ou commande mentionnés", percent: 25 },
    { id: "studio-contenu-pret", label: "Contenus déjà prêts", hint: "Textes, photos et identité visuelle déjà disponibles", percent: -10 },
    { id: "studio-multilingue", label: "Site multilingue", hint: "Plusieurs langues ou audience internationale mentionnées", percent: 15 },
    { id: "studio-integrations", label: "Intégrations avec d'autres outils", hint: "Connexion à un CRM, ERP ou outil externe mentionnée", percent: 20 },
  ],
};
