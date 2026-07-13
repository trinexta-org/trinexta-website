import { describe, expect, it } from "vitest";
import type { CheckOutcome } from "../score";
import { runCrawlChecks } from "./crawl";

function byId(outcomes: CheckOutcome[]): Record<string, boolean> {
  return Object.fromEntries(outcomes.map((o) => [o.id, o.passed]));
}

describe("runCrawlChecks", () => {
  it("page technique saine", () => {
    const r = byId(
      runCrawlChecks({
        finalUrl: "https://exemple.fr/",
        html: '<html lang="fr"><head><meta name="viewport" content="width=device-width"></head></html>',
        robotsTxt: "User-agent: *\nSitemap: https://exemple.fr/sitemap.xml",
      })
    );
    expect(r).toMatchObject({
      "https-missing": true,
      "robots-noindex": true,
      "viewport-missing": true,
      "lang-missing": true,
      "robots-txt-missing": true,
      "sitemap-missing": true,
    });
  });

  it("détecte HTTP non sécurisé", () => {
    const r = byId(
      runCrawlChecks({ finalUrl: "http://exemple.fr/", html: "<html></html>", robotsTxt: null })
    );
    expect(r["https-missing"]).toBe(false);
  });

  it("détecte un noindex", () => {
    const r = byId(
      runCrawlChecks({
        finalUrl: "https://exemple.fr/",
        html: '<meta name="robots" content="noindex, follow">',
        robotsTxt: null,
      })
    );
    expect(r["robots-noindex"]).toBe(false);
  });

  it("détecte l'absence de viewport et de lang", () => {
    const r = byId(
      runCrawlChecks({ finalUrl: "https://exemple.fr/", html: "<html></html>", robotsTxt: null })
    );
    expect(r["viewport-missing"]).toBe(false);
    expect(r["lang-missing"]).toBe(false);
  });

  it("robots.txt absent => check robots + sitemap échouent", () => {
    const r = byId(
      runCrawlChecks({ finalUrl: "https://exemple.fr/", html: "<html></html>", robotsTxt: null })
    );
    expect(r["robots-txt-missing"]).toBe(false);
    expect(r["sitemap-missing"]).toBe(false);
  });

  it("robots.txt présent mais sans sitemap déclaré", () => {
    const r = byId(
      runCrawlChecks({
        finalUrl: "https://exemple.fr/",
        html: "<html></html>",
        robotsTxt: "User-agent: *\nDisallow:",
      })
    );
    expect(r["robots-txt-missing"]).toBe(true);
    expect(r["sitemap-missing"]).toBe(false);
  });
});
