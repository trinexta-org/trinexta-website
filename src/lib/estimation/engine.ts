import {
  ESTIMATION_GRIDS,
  ESTIMATION_QUESTIONS_BY_ID,
  type AiModifier,
  type EstimationAnswers,
  type EstimationServiceId,
  type ServiceGrid,
} from "@/data/estimation";
import { detectServices } from "./flow";

// Moteur de calcul du tunnel d'estimation. Purement déterministe :
// (réponses + grille) -> fourchette. L'IA ne fixe jamais un prix, elle ne
// peut que sélectionner des modificateurs bornés déclarés dans la grille.

export interface AppliedModifier {
  id: string;
  label: string;
  percent: number;
  source: "reponse" | "ia";
}

export interface ServiceEstimate {
  serviceId: EstimationServiceId;
  label: string;
  kind: "recurring" | "one-shot";
  /** Euros par mois (recurring) ou euros (one-shot) */
  min: number;
  max: number;
  /** Lignes de décomposition affichables */
  lines: string[];
  appliedModifiers: AppliedModifier[];
}

export interface EstimationResult {
  services: ServiceEstimate[];
  monthlyMin: number;
  monthlyMax: number;
  oneShotMin: number;
  oneShotMax: number;
  /** Fourchette élargie faute d'analyse du contexte (champ libre vide ou IA indisponible) */
  widened: boolean;
}

export interface ComputeOptions {
  /** Identifiants de modificateurs IA retenus. Tout id hors grille est ignoré. */
  aiModifierIds?: string[];
  /** true si une analyse IA du contexte a abouti (fourchette resserrée) */
  aiAnalyzed?: boolean;
}

function roundTo(value: number, step: number) {
  return Math.max(step, Math.round(value / step) * step);
}

function answerMatches(answers: EstimationAnswers, questionId: string, optionId: string) {
  const value = answers[questionId];
  return Array.isArray(value) ? value.includes(optionId) : value === optionId;
}

function getUnits(answers: EstimationAnswers, questionId: string, fallback: number): number {
  const value = answers[questionId];
  if (typeof value === "string") {
    const option = ESTIMATION_QUESTIONS_BY_ID[questionId]?.options.find((o) => o.id === value);
    if (option?.units !== undefined) return option.units;
  }
  return fallback;
}

function collectModifiers(
  grid: ServiceGrid,
  answers: EstimationAnswers,
  aiModifierIds: string[]
): AppliedModifier[] {
  const applied: AppliedModifier[] = grid.answerAdjustments
    .filter((adj) => answerMatches(answers, adj.questionId, adj.optionId))
    .map((adj) => ({ id: `${adj.questionId}:${adj.optionId}`, label: adj.label, percent: adj.percent, source: "reponse" as const }));

  const byId = new Map(grid.aiModifiers.map((m) => [m.id, m]));
  for (const id of aiModifierIds) {
    const modifier = byId.get(id);
    if (modifier) {
      applied.push({ id: modifier.id, label: modifier.label, percent: modifier.percent, source: "ia" });
    }
  }
  return applied;
}

function formatEuros(value: number) {
  return value.toLocaleString("fr-FR");
}

function computeServiceEstimate(
  grid: ServiceGrid,
  answers: EstimationAnswers,
  aiModifierIds: string[],
  aiAnalyzed: boolean
): ServiceEstimate {
  const modifiers = collectModifiers(grid, answers, aiModifierIds);
  const totalPercent = modifiers.reduce((sum, m) => sum + m.percent, 0);
  const factor = 1 + totalPercent / 100;
  const lines: string[] = [];

  let min: number;
  let max: number;
  let kind: ServiceEstimate["kind"];

  if (grid.pricing.kind === "recurring") {
    kind = "recurring";
    const { base, tiers, unitLabel, unitQuestionId, fallbackUnits } = grid.pricing;
    const units = getUnits(answers, unitQuestionId, fallbackUnits);
    const tier = tiers.find((t) => t.upTo === null || units <= t.upTo) ?? tiers[tiers.length - 1];
    const center = (base + units * tier.unitPrice) * factor;
    const spread = (aiAnalyzed ? grid.spreadPercent : grid.widenedSpreadPercent) / 100;
    min = roundTo(center * (1 - spread), 10);
    max = roundTo(center * (1 + spread), 10);

    if (base > 0) lines.push(`Socle mensuel : ${formatEuros(base)} €`);
    const plural = units > 1 ? "s" : "";
    lines.push(`${units} ${unitLabel}${plural} environ, à ${formatEuros(tier.unitPrice)} €/${unitLabel}/mois`);
  } else {
    kind = "one-shot";
    const { tiers, tierQuestionId, fallbackTierOptionId } = grid.pricing;
    const answered = answers[tierQuestionId];
    const tier =
      tiers.find((t) => t.optionId === answered) ??
      tiers.find((t) => t.optionId === fallbackTierOptionId) ??
      tiers[0];
    const widen = aiAnalyzed ? 0 : grid.widenedSpreadPercent / 100;
    min = roundTo(tier.min * factor * (1 - widen), 100);
    max = roundTo(tier.max * factor * (1 + widen), 100);

    const option = ESTIMATION_QUESTIONS_BY_ID[tierQuestionId]?.options.find((o) => o.id === tier.optionId);
    if (option) lines.push(`Envergure retenue : ${option.label.toLowerCase()}`);
  }

  for (const modifier of modifiers) {
    const sign = modifier.percent > 0 ? "+" : "";
    lines.push(`${modifier.label} : ${sign}${modifier.percent} %`);
  }

  return { serviceId: grid.serviceId, label: grid.label, kind, min, max, lines, appliedModifiers: modifiers };
}

export function computeEstimate(
  answers: EstimationAnswers,
  options: ComputeOptions = {}
): EstimationResult {
  const aiModifierIds = options.aiModifierIds ?? [];
  const aiAnalyzed = options.aiAnalyzed ?? false;

  const services = detectServices(answers).map((serviceId) =>
    computeServiceEstimate(ESTIMATION_GRIDS[serviceId], answers, aiModifierIds, aiAnalyzed)
  );

  const recurring = services.filter((s) => s.kind === "recurring");
  const oneShot = services.filter((s) => s.kind === "one-shot");

  return {
    services,
    monthlyMin: recurring.reduce((sum, s) => sum + s.min, 0),
    monthlyMax: recurring.reduce((sum, s) => sum + s.max, 0),
    oneShotMin: oneShot.reduce((sum, s) => sum + s.min, 0),
    oneShotMax: oneShot.reduce((sum, s) => sum + s.max, 0),
    widened: !aiAnalyzed,
  };
}

/** Liste bornée des modificateurs IA proposables pour un ensemble de services. */
export function getAiModifiersForServices(serviceIds: EstimationServiceId[]): (AiModifier & { serviceId: EstimationServiceId })[] {
  return serviceIds.flatMap((serviceId) =>
    ESTIMATION_GRIDS[serviceId].aiModifiers.map((m) => ({ ...m, serviceId }))
  );
}
