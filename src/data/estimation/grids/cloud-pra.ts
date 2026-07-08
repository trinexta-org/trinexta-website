import type { ServiceGrid } from "../types";

// Grille officielle Valoux (benchmark marché, 2026-07).
// Toujours sur devis : le dimensionnement dépend du volume, du nombre
// de serveurs et du niveau de reprise attendu (RPO/RTO).

export const cloudPraGrid: ServiceGrid = {
  serviceId: "cloud-pra",
  label: "Cloud & PRA",
  pricing: {
    kind: "sur-devis",
    line: "Sur devis : dépend du volume, du nombre de serveurs et du niveau de reprise (RPO/RTO)",
  },
  spreadPercent: 0,
  answerAdjustments: [],
  aiModifiers: [],
};
