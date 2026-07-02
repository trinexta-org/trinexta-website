import type { ServiceGrid } from "../types";

// PLACEHOLDER : valeurs tarifaires non validées par Valoux.
// Ne pas merger vers main avant validation de la grille.

export const cybersecuriteGrid: ServiceGrid = {
  serviceId: "cybersecurite",
  label: "Cybersécurité",
  pricing: {
    kind: "recurring",
    unitLabel: "poste",
    unitQuestionId: "parc",
    fallbackUnits: 10,
    base: 60,
    tiers: [
      { upTo: 5, unitPrice: 18 },
      { upTo: 15, unitPrice: 15 },
      { upTo: 40, unitPrice: 12 },
      { upTo: null, unitPrice: 10 },
    ],
  },
  spreadPercent: 10,
  widenedSpreadPercent: 20,
  answerAdjustments: [
    { questionId: "serveurs", optionId: "un", percent: 10, label: "Un serveur ou NAS à protéger" },
    { questionId: "serveurs", optionId: "plusieurs", percent: 20, label: "Plusieurs serveurs à protéger" },
    { questionId: "criticite", optionId: "critique", percent: 15, label: "Activité critique, surveillance renforcée" },
  ],
  aiModifiers: [
    { id: "cyber-donnees-sensibles", label: "Données sensibles ou réglementées", hint: "Données de santé, financières, personnelles ou soumises à une réglementation (RGPD renforcé, secteur régulé)", percent: 20 },
    { id: "cyber-incident-recent", label: "Incident de sécurité récent", hint: "Un piratage, ransomware, phishing réussi ou incident récent est mentionné", percent: 15 },
    { id: "cyber-teletravail", label: "Télétravail généralisé", hint: "Beaucoup de collaborateurs travaillent à distance ou en mobilité", percent: 10 },
    { id: "cyber-base-saine", label: "Bonnes pratiques déjà en place", hint: "MFA, gestionnaire de mots de passe ou sensibilisation déjà en place", percent: -10 },
  ],
};
