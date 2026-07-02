import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const regieGrid: ServiceGrid = {
  serviceId: "regie",
  label: "Technicien en régie",
  pricing: {
    kind: "recurring",
    unitLabel: "jour",
    unitQuestionId: "renfort-profil",
    fallbackUnits: 8,
    base: 0,
    tiers: [
      { upTo: 4, unitPrice: 480 },
      { upTo: 12, unitPrice: 450 },
      { upTo: null, unitPrice: 420 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "renfort-profil", optionId: "ponctuel", percent: 10, label: "Mission ponctuelle, mobilisation rapide" },
    { questionId: "renfort-profil", optionId: "plein", percent: -5, label: "Engagement longue durée" },
  ],
  aiModifiers: [
    { id: "regie-profil-expert", label: "Profil expert requis", hint: "Compétences pointues demandées : réseau avancé, sécurité, administration système senior", percent: 20 },
    { id: "regie-deplacements", label: "Déplacements fréquents", hint: "Interventions sur plusieurs sites ou déplacements réguliers mentionnés", percent: 10 },
    { id: "regie-mission-standard", label: "Mission de support standard", hint: "Tâches de support de proximité classiques, sans expertise particulière", percent: -5 },
  ],
};
