import type { AssertPublicUrlOptions } from "./assert-public-url";
import { runCrawlChecks } from "./checks/crawl";
import { runOnPageChecks } from "./checks/on-page";
import { fetchRobotsTxt, type FetchedTarget } from "./fetch";
import { fetchPageSpeed, toPerformanceAxis } from "./pagespeed";
import { computeScore } from "./score";
import type { AuditResult, PageSpeedResult } from "./types";

export interface AnalyzeOptions extends AssertPublicUrlOptions {
  /** Fetcher PageSpeed injectable (tests). Défaut : appel réel PSI mobile. */
  fetchPageSpeed?: (url: string) => Promise<PageSpeedResult | null>;
}

export interface AnalyzeOutcome {
  result: AuditResult;
  /** Faits PageSpeed persistés dans pagespeed(Json), null si non mesuré. */
  pagespeed: PageSpeedResult | null;
}

// Orchestration de l'analyse mécanique d'une Cible déjà récupérée.
// Glue I/O (robots.txt, PageSpeed) + logique pure (checks + moteur de score).
// L'axe Contenu/SEO local (narratif IA) arrive en Phase 4.
export async function analyzeTarget(
  target: FetchedTarget,
  options: AnalyzeOptions = {}
): Promise<AnalyzeOutcome> {
  const onPageOutcomes = runOnPageChecks(target.html);

  // I/O en parallèle : robots.txt (crawlabilité) et PageSpeed (performance).
  const runPageSpeed = options.fetchPageSpeed ?? fetchPageSpeed;
  const [robotsTxt, pagespeed] = await Promise.all([
    fetchRobotsTxt(target.finalUrl, options),
    runPageSpeed(target.finalUrl),
  ]);

  const crawlOutcomes = runCrawlChecks({
    finalUrl: target.finalUrl,
    html: target.html,
    robotsTxt,
  });

  const result = computeScore([...onPageOutcomes, ...crawlOutcomes], [toPerformanceAxis(pagespeed)]);
  return { result, pagespeed };
}
