import { describe, expect, it } from "vitest";
import { extractPageSpeed, toPerformanceAxis } from "./pagespeed";

const SAMPLE = {
  lighthouseResult: {
    categories: { performance: { score: 0.74 } },
    audits: {
      "largest-contentful-paint": { numericValue: 3200, displayValue: "3,2 s" },
      "cumulative-layout-shift": { numericValue: 0.05, displayValue: "0,05" },
      "interaction-to-next-paint": { numericValue: 180, displayValue: "180 ms" },
    },
  },
};

describe("extractPageSpeed", () => {
  it("extrait le score Lighthouse ramené sur 100 et les métriques", () => {
    const result = extractPageSpeed(SAMPLE);
    expect(result).not.toBeNull();
    expect(result!.performanceScore).toBe(74);
    expect(result!.lcp.numericValue).toBe(3200);
    expect(result!.cls.numericValue).toBe(0.05);
    expect(result!.inp.numericValue).toBe(180);
  });

  it("tombe sur experimental-interaction-to-next-paint en secours", () => {
    const result = extractPageSpeed({
      lighthouseResult: {
        categories: { performance: { score: 0.9 } },
        audits: { "experimental-interaction-to-next-paint": { numericValue: 210 } },
      },
    });
    expect(result!.inp.numericValue).toBe(210);
  });

  it("renvoie null si le score de performance est absent", () => {
    expect(extractPageSpeed({ lighthouseResult: { categories: {} } })).toBeNull();
    expect(extractPageSpeed({})).toBeNull();
    expect(extractPageSpeed(null)).toBeNull();
  });
});

describe("toPerformanceAxis — dégradation propre", () => {
  it("axe mesuré quand PageSpeed répond", () => {
    const axis = toPerformanceAxis({
      performanceScore: 74,
      lcp: { numericValue: 3200, displayValue: null },
      cls: { numericValue: 0.05, displayValue: null },
      inp: { numericValue: 180, displayValue: null },
    });
    expect(axis).toMatchObject({ axis: "performance", measured: true, score: 74 });
  });

  it("axe non mesuré (score null) quand PageSpeed échoue", () => {
    const axis = toPerformanceAxis(null);
    expect(axis).toMatchObject({ axis: "performance", measured: false, score: null });
  });
});
