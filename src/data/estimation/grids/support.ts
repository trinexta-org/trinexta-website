import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const supportGrid: ServiceGrid = {
  serviceId: "support",
  label: "Support informatique",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    base: 50,
    tiers: [
      { upTo: 5, unitPrice: 25 },
      { upTo: 15, unitPrice: 21 },
      { upTo: 40, unitPrice: 17 },
      { upTo: null, unitPrice: 14 },
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
