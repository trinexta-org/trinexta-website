import {
  ESTIMATION_GRIDS,
  ESTIMATION_QUESTIONS_BY_ID,
  type AiModifier,
  type EstimationAnswers,
  type EstimationServiceId,
  type RangePricing,
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
  kind: "recurring" | "one-shot" | "sur-devis";
  /** Euros par mois (recurring) ou euros (one-shot). 0 pour un "sur-devis". */
  min: number;
  max: number;
  /** Lignes de décomposition affichables */
  lines: string[];
  /** Mention informative de la grille (ex. licences en sus), hors calcul */
  note?: string;
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

/** Décalage du curseur régie selon la taille d'entreprise (position dans [0, 1]) */
const RANGE_EFFECTIF_DELTAS: Record<string, number> = {
  solo: -0.15,
  petite: -0.15,
  moyenne: 0,
  grande: 0.15,
};

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

/** Tarif jour régie : curseur borné dans [low, high], puis décote Mode B plafonnée au plancher. */
function computeRangeDayRate(
  pricing: RangePricing,
  answers: EstimationAnswers,
  modifiers: AppliedModifier[]
): { dayRate: number; engagementLabel: string | null } {
  let position = 0.5 + (RANGE_EFFECTIF_DELTAS[String(answers["effectif"])] ?? 0);
  // Pour ce kind, percent s'interprète en position : percent/100 de la largeur [low, high].
  for (const modifier of modifiers) {
    position += modifier.percent / 100;
  }
  position = Math.min(1, Math.max(0, position));
  let dayRate = pricing.low + position * (pricing.high - pricing.low);

  const profil = String(answers[pricing.modeBQuestionId]);
  const engagement = answers[pricing.engagementQuestionId];
  const discount =
    pricing.modeBOptionIds.includes(profil) && typeof engagement === "string"
      ? pricing.engagementDiscounts[engagement]
      : undefined;

  if (discount === undefined) return { dayRate, engagementLabel: null };

  dayRate = Math.max(dayRate * (1 + discount / 100), pricing.low * pricing.floorFactor);
  const option = ESTIMATION_QUESTIONS_BY_ID[pricing.engagementQuestionId]?.options.find(
    (o) => o.id === engagement
  );
  return {
    dayRate,
    engagementLabel: `Engagement ${option?.label ?? engagement} : ${discount} % sur le tarif jour`,
  };
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

  let min = 0;
  let max = 0;
  let kind: ServiceEstimate["kind"];

  if (grid.pricing.kind === "recurring") {
    const { tiers, unitLabel, unitQuestionId, fallbackUnits } = grid.pricing;
    const units = getUnits(answers, unitQuestionId, fallbackUnits);
    const tier = tiers.find((t) => units <= t.upTo);

    if (!tier) {
      // Volume au-delà du dernier palier tarifé : bascule en devis.
      kind = "sur-devis";
      const lastTier = tiers[tiers.length - 1];
      lines.push(`Au-delà de ${lastTier.upTo} ${unitLabel}s, sur devis`);
    } else {
      kind = "recurring";
      const center = units * tier.unitPrice * factor;
      const spread = (aiAnalyzed ? grid.spreadPercent : grid.widenedSpreadPercent ?? grid.spreadPercent) / 100;
      min = roundTo(center * (1 - spread), 10);
      max = roundTo(center * (1 + spread), 10);
      const plural = units > 1 ? "s" : "";
      lines.push(`${units} ${unitLabel}${plural} environ, à ${formatEuros(tier.unitPrice)} €/${unitLabel}/mois`);
    }
  } else if (grid.pricing.kind === "one-shot") {
    kind = "one-shot";
    const { tiers, tierQuestionId, fallbackTierOptionId } = grid.pricing;
    const answered = answers[tierQuestionId];
    const tier =
      tiers.find((t) => t.optionId === answered) ??
      tiers.find((t) => t.optionId === fallbackTierOptionId) ??
      tiers[0];
    min = roundTo(tier.min * factor, 100);
    max = roundTo(tier.max * factor, 100);

    const option = ESTIMATION_QUESTIONS_BY_ID[tierQuestionId]?.options.find((o) => o.id === tier.optionId);
    if (option) lines.push(`Envergure retenue : ${option.label.toLowerCase()}`);
  } else if (grid.pricing.kind === "one-shot-formula") {
    kind = "one-shot";
    const { setupFee, perUnit, unitLabel, unitQuestionId, fallbackUnits } = grid.pricing;
    const units = getUnits(answers, unitQuestionId, fallbackUnits);
    const center = (setupFee + units * perUnit) * factor;
    // Calcul exact, pas de fourchette.
    min = roundTo(center, 10);
    max = min;
    lines.push(
      `Mise en service : ${formatEuros(setupFee)} € + ${units} × ${formatEuros(perUnit)} € par ${unitLabel}`
    );
  } else if (grid.pricing.kind === "range") {
    kind = "recurring";
    const { unitLabel, unitQuestionId, fallbackUnits } = grid.pricing;
    const { dayRate, engagementLabel } = computeRangeDayRate(grid.pricing, answers, modifiers);
    const units = getUnits(answers, unitQuestionId, fallbackUnits);
    const spread = grid.spreadPercent / 100;
    min = roundTo(dayRate * (1 - spread) * units, 10);
    max = roundTo(dayRate * (1 + spread) * units, 10);
    const plural = units > 1 ? "s" : "";
    lines.push(`${units} ${unitLabel}${plural} par mois environ, autour de ${formatEuros(Math.round(dayRate))} €/${unitLabel}`);
    if (engagementLabel) lines.push(engagementLabel);
  } else {
    kind = "sur-devis";
    lines.push(grid.pricing.line);
  }

  if (kind !== "sur-devis") {
    for (const modifier of modifiers) {
      const sign = modifier.percent > 0 ? "+" : "";
      lines.push(`${modifier.label} : ${sign}${modifier.percent} %`);
    }
  }

  return {
    serviceId: grid.serviceId,
    label: grid.label,
    kind,
    min,
    max,
    lines,
    note: grid.note,
    appliedModifiers: modifiers,
  };
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

  // Les services "sur-devis" ne contribuent à aucun total.
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
