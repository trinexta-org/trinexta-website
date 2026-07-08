import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).
// Les environnements multi-serveurs relèvent de Cloud & PRA (sur devis),
// détecté en plus de ce service : pas d'ajustement "plusieurs serveurs" ici.

export const sauvegardeManageeGrid: ServiceGrid = {
  serviceId: "sauvegarde-managee",
  label: "Sauvegarde managée",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    tiers: [
      { upTo: 5, unitPrice: 15 },
      { upTo: 15, unitPrice: 13 },
      { upTo: 40, unitPrice: 11 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "serveurs", optionId: "un", percent: 25, label: "Sauvegarde d'un serveur ou NAS" },
    { questionId: "criticite", optionId: "critique", percent: 15, label: "Reprise rapide exigée" },
  ],
  aiModifiers: [
    { id: "cloud-gros-volumes", label: "Gros volumes de données", hint: "Vidéos, plans, imagerie, bases volumineuses ou plusieurs téraoctets mentionnés", percent: 20 },
    { id: "cloud-retention-longue", label: "Rétention longue exigée", hint: "Obligation de conserver les données plusieurs années (légal, comptable, santé)", percent: 10 },
    { id: "cloud-deja-partiel", label: "Sauvegarde partielle déjà en place", hint: "Une solution de sauvegarde existe déjà partiellement et peut être reprise", percent: -10 },
  ],
};
