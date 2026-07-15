import type { AxisId, Severity } from "@/lib/audit-seo/types";

// Source de vérité du Barème (poids + seuils) et du catalogue de Constats.
// Le moteur de score (src/lib/audit-seo/score.ts) ne fait que combiner ces
// données de façon déterministe. Rien ici ne décrit la méthode de correction.

export type CheckId =
  // Axe on-page
  | "title-missing"
  | "title-length"
  | "meta-description-missing"
  | "meta-description-length"
  | "h1-missing"
  | "h1-multiple"
  | "img-alt-missing"
  | "canonical-missing"
  | "open-graph-missing"
  | "structured-data-missing"
  | "content-thin"
  // Axe technique / crawlabilité
  | "https-missing"
  | "robots-noindex"
  | "viewport-missing"
  | "lang-missing"
  | "robots-txt-missing"
  | "sitemap-missing";

/**
 * Une entrée du catalogue : un check déterministe et le Constat qu'il émet
 * quand il échoue. `weight` = points retirés au sous-score de l'axe.
 * `symptom`/`impact` respectent la règle de registre (jamais la méthode).
 */
export interface CheckDefinition {
  id: CheckId;
  axis: AxisId;
  severity: Severity;
  /** Points retirés au sous-score de l'axe si le check échoue (0-100). */
  weight: number;
  /**
   * Plafond du Score GLOBAL si ce check échoue (constat critique qui casse
   * l'accès à la page). Le plus bas gagne. Absent = pas de gate.
   */
  scoreCap?: number;
  symptom: string;
  impact: string;
}

export interface AxisConfig {
  id: AxisId;
  label: string;
  /** Poids relatif dans le calcul du Score global (sur les axes mesurés). */
  globalWeight: number;
}
