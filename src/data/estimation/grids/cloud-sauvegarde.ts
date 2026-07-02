import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const cloudSauvegardeGrid: ServiceGrid = {
  serviceId: "cloud-sauvegarde",
  label: "Cloud & Sauvegarde",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    base: 40,
    tiers: [
      { upTo: 5, unitPrice: 12 },
      { upTo: 15, unitPrice: 10 },
      { upTo: 40, unitPrice: 8 },
      { upTo: null, unitPrice: 7 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "serveurs", optionId: "un", percent: 25, label: "Sauvegarde d'un serveur ou NAS" },
    { questionId: "serveurs", optionId: "plusieurs", percent: 50, label: "Sauvegarde de plusieurs serveurs" },
    { questionId: "criticite", optionId: "critique", percent: 15, label: "Reprise rapide exigée" },
  ],
  aiModifiers: [
    { id: "cloud-gros-volumes", label: "Gros volumes de données", hint: "Vidéos, plans, imagerie, bases volumineuses ou plusieurs téraoctets mentionnés", percent: 20 },
    { id: "cloud-retention-longue", label: "Rétention longue exigée", hint: "Obligation de conserver les données plusieurs années (légal, comptable, santé)", percent: 10 },
    { id: "cloud-deja-partiel", label: "Sauvegarde partielle déjà en place", hint: "Une solution de sauvegarde existe déjà partiellement et peut être reprise", percent: -10 },
  ],
};
