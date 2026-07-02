import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const infogeranceGrid: ServiceGrid = {
  serviceId: "infogerance",
  label: "Infogérance",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    base: 90,
    tiers: [
      { upTo: 5, unitPrice: 45 },
      { upTo: 15, unitPrice: 39 },
      { upTo: 40, unitPrice: 33 },
      { upTo: null, unitPrice: 28 },
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
