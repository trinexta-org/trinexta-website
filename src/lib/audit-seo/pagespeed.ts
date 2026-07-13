import { AXES } from "@/data/audit-seo/axes";
import type { AxisScore, PageSpeedMetric, PageSpeedResult } from "./types";

// Axe Performance : Google PageSpeed Insights (stratégie mobile). Fournit les
// faits de performance mobile réelle. En cas d'échec/timeout, on ne fabrique
// jamais un chiffre : l'axe est marqué « non mesuré » (dégradation propre).

const PAGESPEED_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const PAGESPEED_TIMEOUT_MS = 20000;

interface RawAudit {
  numericValue?: number;
  displayValue?: string;
}

interface RawPageSpeed {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, RawAudit>;
  };
}

function metric(audit: RawAudit | undefined): PageSpeedMetric {
  return {
    numericValue: typeof audit?.numericValue === "number" ? audit.numericValue : null,
    displayValue: typeof audit?.displayValue === "string" ? audit.displayValue : null,
  };
}

/**
 * Extrait les faits utiles de la réponse PageSpeed. Pur et testable.
 * Renvoie null si le score de performance est absent (réponse inexploitable).
 */
export function extractPageSpeed(raw: unknown): PageSpeedResult | null {
  const data = raw as RawPageSpeed;
  const score = data?.lighthouseResult?.categories?.performance?.score;
  if (typeof score !== "number") return null;

  const audits = data.lighthouseResult?.audits ?? {};
  return {
    performanceScore: Math.round(score * 100),
    lcp: metric(audits["largest-contentful-paint"]),
    cls: metric(audits["cumulative-layout-shift"]),
    inp: metric(
      audits["interaction-to-next-paint"] ?? audits["experimental-interaction-to-next-paint"]
    ),
  };
}

/**
 * Appelle PageSpeed en mobile. Tolérant : renvoie null en cas d'absence de clé,
 * d'erreur réseau, de timeout ou de réponse inexploitable.
 */
export async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  const params = new URLSearchParams({ url, strategy: "mobile", category: "performance" });
  const key = process.env.PAGESPEED_API_KEY;
  if (key) params.set("key", key);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PAGESPEED_TIMEOUT_MS);
  try {
    const response = await fetch(`${PAGESPEED_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const raw = await response.json();
    return extractPageSpeed(raw);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Traduit un résultat PageSpeed (ou son absence) en sous-score de l'Axe
 * Performance. null => axe non mesuré (exclu du Score global, jamais compté 0).
 */
export function toPerformanceAxis(result: PageSpeedResult | null): AxisScore {
  if (!result) {
    return { axis: "performance", label: AXES.performance.label, measured: false, score: null };
  }
  return {
    axis: "performance",
    label: AXES.performance.label,
    measured: true,
    score: result.performanceScore,
  };
}
