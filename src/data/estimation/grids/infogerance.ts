import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).

export const infogeranceGrid: ServiceGrid = {
  serviceId: "infogerance",
  label: "Infogérance",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    tiers: [
      { upTo: 5, unitPrice: 79 },
      { upTo: 15, unitPrice: 74 },
      { upTo: 40, unitPrice: 69 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "serveurs", optionId: "un", percent: 15, label: "Un serveur ou NAS à superviser" },
    { questionId: "serveurs", optionId: "plusieurs", percent: 30, label: "Plusieurs serveurs à superviser" },
    { questionId: "criticite", optionId: "grave", percent: 10, label: "Activité sensible aux interruptions" },
    { questionId: "criticite", optionId: "critique", percent: 20, label: "Activité critique, continuité renforcée" },
  ],
  aiModifiers: [
    { id: "info-multi-sites", label: "Plusieurs sites à couvrir", hint: "L'entreprise a plusieurs sites, agences ou entrepôts distants", percent: 15 },
    { id: "info-logiciels-metier", label: "Logiciels métier spécifiques", hint: "Des applications métier critiques (ERP, logiciel sectoriel) sont mentionnées", percent: 10 },
    { id: "info-parc-recent", label: "Parc récent et homogène", hint: "Le parc est décrit comme récent, homogène ou déjà bien entretenu", percent: -10 },
    { id: "info-parc-vieillissant", label: "Parc vieillissant", hint: "Machines anciennes, systèmes obsolètes ou hétérogènes mentionnés", percent: 10 },
  ],
};
