import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const microsoft365Grid: ServiceGrid = {
  serviceId: "microsoft-365",
  label: "Microsoft 365",
  pricing: {
    kind: "recurring",
    unitLabel: "utilisateur",
    unitQuestionId: "effectif",
    fallbackUnits: 10,
    base: 30,
    tiers: [
      { upTo: 5, unitPrice: 24 },
      { upTo: 15, unitPrice: 21 },
      { upTo: 50, unitPrice: 18 },
      { upTo: null, unitPrice: 16 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "collab-etat", optionId: "rien", percent: 20, label: "Mise en place complète des outils" },
    { questionId: "collab-etat", optionId: "disperse", percent: 10, label: "Migration depuis des outils dispersés" },
    { questionId: "collab-etat", optionId: "m365-sous-exploite", percent: -10, label: "Environnement Microsoft 365 existant" },
  ],
  aiModifiers: [
    { id: "m365-migration-donnees", label: "Migration de données importante", hint: "Beaucoup d'emails, de fichiers ou d'historique à migrer depuis d'anciens systèmes", percent: 15 },
    { id: "m365-formation", label: "Accompagnement des équipes", hint: "Besoin de formation ou d'accompagnement au changement mentionné", percent: 10 },
    { id: "m365-usage-simple", label: "Usage bureautique simple", hint: "Besoins limités à l'email et à la bureautique de base", percent: -10 },
  ],
};
