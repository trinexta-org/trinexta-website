import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).

export const supportGrid: ServiceGrid = {
  serviceId: "support",
  label: "Support informatique",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    tiers: [
      { upTo: 5, unitPrice: 59 },
      { upTo: 15, unitPrice: 53 },
      { upTo: 40, unitPrice: 49 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "criticite", optionId: "grave", percent: 10, label: "Délais d'intervention resserrés" },
    { questionId: "criticite", optionId: "critique", percent: 20, label: "Priorité d'intervention maximale" },
  ],
  aiModifiers: [
    { id: "support-horaires-etendus", label: "Horaires étendus", hint: "Besoin d'assistance tôt le matin, le soir ou le week-end mentionné", percent: 15 },
    { id: "support-multi-sites", label: "Plusieurs sites à couvrir", hint: "Interventions sur plusieurs adresses ou agences", percent: 10 },
    { id: "support-utilisateurs-autonomes", label: "Utilisateurs autonomes", hint: "Équipe à l'aise avec l'informatique, sollicitations rares attendues", percent: -10 },
  ],
};
