// Types partagés du module audit SEO. Vocabulaire : voir GLOSSAIRE.md.

/** Les 4 Axes de score. */
export type AxisId = "on-page" | "performance" | "technique" | "contenu-local";

/** Gravité d'un Constat, du plus au moins grave. */
export type Severity = "critique" | "majeur" | "mineur";

/**
 * Un Constat : problème détecté sur la Cible exprimé en symptôme + impact +
 * gravité. Jamais la méthode de correction (celle-ci relève de l'audit
 * approfondi vendu en RDV).
 */
export interface Finding {
  id: string;
  axis: AxisId;
  severity: Severity;
  /** Symptôme observé, factuel. */
  symptom: string;
  /** Impact business, sans jargon. */
  impact: string;
}

/** Une métrique PageSpeed : valeur numérique brute + libellé lisible. */
export interface PageSpeedMetric {
  numericValue: number | null;
  displayValue: string | null;
}

/** Faits de l'Axe Performance issus de PageSpeed (stratégie mobile). */
export interface PageSpeedResult {
  /** Score Lighthouse performance ramené sur 100. */
  performanceScore: number;
  lcp: PageSpeedMetric;
  cls: PageSpeedMetric;
  inp: PageSpeedMetric;
}

/** Sous-score d'un Axe. `measured: false` = axe non mesuré (dégradation propre). */
export interface AxisScore {
  axis: AxisId;
  label: string;
  measured: boolean;
  /** Score /100 de l'axe, null si non mesuré. */
  score: number | null;
}

/** Résultat complet d'un audit, persisté et projeté en Teaser/Rapport. */
export interface AuditResult {
  scoreGlobal: number;
  axes: AxisScore[];
  findings: Finding[];
}

/** Teaser renvoyé à l'écran : score global + les 3 constats les plus graves. */
export interface TeaserResponse {
  id: string;
  url: string;
  scoreGlobal: number;
  axes: AxisScore[];
  topFindings: Finding[];
  /** Synthèse IA (priorisation + angle SEO local), null si non générée. */
  aiSummary: string | null;
}
