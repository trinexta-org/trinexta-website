import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).
// Mise en place one-shot : 490 € + 250 € par boîte mail (nb boîtes = effectif).

export const microsoft365MiseEnPlaceGrid: ServiceGrid = {
  serviceId: "microsoft-365-mise-en-place",
  label: "Microsoft 365 — mise en place",
  pricing: {
    kind: "one-shot-formula",
    setupFee: 490,
    perUnit: 250,
    unitLabel: "boîte mail",
    unitQuestionId: "effectif",
    fallbackUnits: 10,
  },
  spreadPercent: 0,
  answerAdjustments: [],
  aiModifiers: [
    { id: "m365-migration-donnees", label: "Migration de données importante", hint: "Beaucoup d'emails, de fichiers ou d'historique à migrer depuis d'anciens systèmes", percent: 15 },
    { id: "m365-formation", label: "Accompagnement des équipes", hint: "Besoin de formation ou d'accompagnement au changement mentionné", percent: 10 },
  ],
};
