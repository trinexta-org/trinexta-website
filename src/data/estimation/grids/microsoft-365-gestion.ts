import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).
// Gestion récurrente du tenant. La mise en place initiale est un service
// one-shot séparé (microsoft-365-mise-en-place).

export const microsoft365GestionGrid: ServiceGrid = {
  serviceId: "microsoft-365-gestion",
  label: "Microsoft 365 — gestion",
  pricing: {
    kind: "recurring",
    unitLabel: "utilisateur",
    unitQuestionId: "effectif",
    fallbackUnits: 10,
    tiers: [
      { upTo: 5, unitPrice: 12 },
      { upTo: 15, unitPrice: 10 },
      { upTo: 40, unitPrice: 8 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  note: "+ Licences Microsoft 365 en sus, facturées au tarif public en vigueur (à partir de 6€/utilisateur/mois pour Basic)",
  answerAdjustments: [],
  aiModifiers: [
    { id: "m365-usage-simple", label: "Usage bureautique simple", hint: "Besoins limités à l'email et à la bureautique de base", percent: -10 },
  ],
};
