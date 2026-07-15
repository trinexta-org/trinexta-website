import type { CheckOutcome } from "../score";
import { getHtmlLang, getMetaContent, hasNoindex } from "./html";

// Faits nécessaires aux checks de l'axe Technique / crawlabilité.
export interface CrawlFacts {
  /** URL finale de la Cible (après redirections). */
  finalUrl: string;
  html: string;
  /** Contenu de /robots.txt, ou null si absent/inaccessible. */
  robotsTxt: string | null;
}

const SITEMAP_DIRECTIVE = /^\s*sitemap\s*:/im;

// Pure : faits de crawl -> résultats de checks.
export function runCrawlChecks({ finalUrl, html, robotsTxt }: CrawlFacts): CheckOutcome[] {
  let isHttps = false;
  try {
    isHttps = new URL(finalUrl).protocol === "https:";
  } catch {
    isHttps = false;
  }

  return [
    { id: "https-missing", passed: isHttps },
    { id: "robots-noindex", passed: !hasNoindex(html) },
    { id: "viewport-missing", passed: getMetaContent(html, "viewport") !== null },
    { id: "lang-missing", passed: getHtmlLang(html) !== null },
    { id: "robots-txt-missing", passed: robotsTxt !== null },
    { id: "sitemap-missing", passed: robotsTxt !== null && SITEMAP_DIRECTIVE.test(robotsTxt) },
  ];
}
