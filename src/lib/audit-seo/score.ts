import { AXES } from "@/data/audit-seo/axes";
import { CHECK_CATALOG, CHECK_LIST } from "@/data/audit-seo/catalog";
import type { CheckId } from "@/data/audit-seo/types";
import type { AuditResult, AxisId, AxisScore, Finding, Severity } from "./types";

// Moteur de score déterministe : mêmes constats = même score. L'IA n'intervient
// jamais ici. Sous-score d'un axe = 100 - somme des poids des checks échoués,
// borné à [0, 100]. Score global = moyenne des sous-scores des axes MESURÉS,
// pondérée par globalWeight (un axe non mesuré est exclu, jamais compté 0).

export interface CheckOutcome {
  id: CheckId;
  passed: boolean;
}

const SEVERITY_RANK: Record<Severity, number> = {
  critique: 0,
  majeur: 1,
  mineur: 2,
};

/** Axes calculés à partir du catalogue de checks (on-page, technique). */
const CATALOG_AXES: AxisId[] = [...new Set(CHECK_LIST.map((c) => c.axis))];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Combine les résultats de checks (et d'éventuels axes déjà calculés hors
 * catalogue, comme la Performance issue de PageSpeed) en un résultat complet.
 * Fonction pure et déterministe.
 */
export function computeScore(outcomes: CheckOutcome[], extraAxes: AxisScore[] = []): AuditResult {
  const failed = new Set(outcomes.filter((o) => !o.passed).map((o) => o.id));

  const findings: Finding[] = [];
  const catalogAxisScores: AxisScore[] = [];

  for (const axisId of CATALOG_AXES) {
    const axisChecks = CHECK_LIST.filter((c) => c.axis === axisId);
    let deduction = 0;
    for (const check of axisChecks) {
      if (failed.has(check.id)) {
        deduction += check.weight;
        findings.push({
          id: check.id,
          axis: check.axis,
          severity: check.severity,
          symptom: check.symptom,
          impact: check.impact,
        });
      }
    }
    catalogAxisScores.push({
      axis: axisId,
      label: AXES[axisId].label,
      measured: true,
      score: clamp(100 - deduction, 0, 100),
    });
  }

  const axes = [...catalogAxisScores, ...extraAxes];

  // Gating par constat critique : un check qui casse l'accès à la page plafonne
  // le Score global (le plus bas gagne), indépendamment du reste. Ex. noindex →
  // page invisible, un beau score technique n'y change rien.
  const caps = CHECK_LIST.filter(
    (c) => failed.has(c.id) && c.scoreCap !== undefined
  ).map((c) => c.scoreCap as number);

  // Constats triés du plus grave au moins grave (gravité, puis poids, puis id).
  findings.sort((a, b) => {
    const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (bySeverity !== 0) return bySeverity;
    const byWeight = CHECK_CATALOG[b.id as CheckId].weight - CHECK_CATALOG[a.id as CheckId].weight;
    if (byWeight !== 0) return byWeight;
    return a.id.localeCompare(b.id);
  });

  const scoreGlobal = Math.min(computeGlobal(axes), ...caps);

  return { scoreGlobal, axes, findings };
}

function computeGlobal(axes: AxisScore[]): number {
  const measured = axes.filter((a) => a.measured && a.score !== null);
  const weightSum = measured.reduce((sum, a) => sum + AXES[a.axis].globalWeight, 0);
  if (weightSum === 0) return 0;
  const weighted = measured.reduce((sum, a) => sum + (a.score ?? 0) * AXES[a.axis].globalWeight, 0);
  return Math.round(weighted / weightSum);
}
