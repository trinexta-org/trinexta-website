import type { EstimationServiceId, ServiceGrid } from "../types";

// Grilles régie officielles Valoux (benchmark marché, 2026-07).
// Une grille par catégorie, chacune = fourchette native [low, high] avec
// curseur borné (kind "range"). Ajustements et modificateurs identiques
// pour les 4 catégories : seuls le libellé et les bornes changent.
// L'engagement long (Mode B) passe par la décote engagementDiscounts,
// pas par un ajustement de position.

export function makeRegieGrid(params: {
  serviceId: EstimationServiceId;
  label: string;
  low: number;
  high: number;
}): ServiceGrid {
  return {
    serviceId: params.serviceId,
    label: params.label,
    pricing: {
      kind: "range",
      unitLabel: "jour",
      low: params.low,
      high: params.high,
      unitQuestionId: "renfort-profil",
      fallbackUnits: 10,
      modeBQuestionId: "renfort-profil",
      modeBOptionIds: ["regulier", "plein"],
      engagementQuestionId: "renfort-duree",
      engagementDiscounts: { "6-mois": -5, "12-mois": -10 },
      floorFactor: 0.85,
    },
    spreadPercent: 5,
    answerAdjustments: [
      { questionId: "renfort-profil", optionId: "ponctuel", percent: 10, label: "Mission ponctuelle, mobilisation rapide" },
    ],
    aiModifiers: [
      { id: "regie-profil-expert", label: "Profil expert requis", hint: "Compétences pointues demandées : réseau avancé, sécurité, administration système senior", percent: 20 },
      { id: "regie-deplacements", label: "Déplacements fréquents", hint: "Interventions sur plusieurs sites ou déplacements réguliers mentionnés", percent: 10 },
      { id: "regie-mission-standard", label: "Mission de support standard", hint: "Tâches de support de proximité classiques, sans expertise particulière", percent: -5 },
    ],
  };
}
