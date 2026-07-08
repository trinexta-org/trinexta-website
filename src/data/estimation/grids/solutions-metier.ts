import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).

export const solutionsMetierGrid: ServiceGrid = {
  serviceId: "solutions-metier",
  label: "Solutions métier",
  pricing: {
    kind: "one-shot",
    tierQuestionId: "projet-envergure",
    fallbackTierOptionId: "standard",
    tiers: [
      { optionId: "simple", min: 4000, max: 8000 },
      { optionId: "standard", min: 8000, max: 18000 },
      { optionId: "sur-mesure", min: 18000, max: 40000 },
    ],
  },
  spreadPercent: 0,
  answerAdjustments: [
    { questionId: "projet-type", optionId: "automatisation", percent: -30, label: "Automatisation et intégration d'outils existants" },
  ],
  aiModifiers: [
    { id: "metier-donnees-existantes", label: "Reprise de données existante", hint: "Migration ou reprise de données depuis un ancien système mentionnée", percent: 15 },
    { id: "metier-multi-roles", label: "Plusieurs profils d'utilisateurs", hint: "Différents rôles, permissions ou niveaux d'accès nécessaires", percent: 15 },
    { id: "metier-processus-simple", label: "Processus simple et bien défini", hint: "Le besoin est clairement décrit, périmètre restreint et stable", percent: -10 },
    { id: "metier-integrations", label: "Intégrations avec d'autres outils", hint: "Connexion à des logiciels tiers (comptabilité, CRM, planning) mentionnée", percent: 20 },
  ],
};
