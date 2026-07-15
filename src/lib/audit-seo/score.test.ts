import { describe, expect, it } from "vitest";
import { CHECK_CATALOG, CHECK_LIST } from "@/data/audit-seo/catalog";
import { computeScore, type CheckOutcome } from "./score";
import type { AxisScore } from "./types";

// Toutes les checks au vert, sauf les ids fournis.
function outcomes(failedIds: string[] = []): CheckOutcome[] {
  const failed = new Set(failedIds);
  return CHECK_LIST.map((c) => ({ id: c.id, passed: !failed.has(c.id) }));
}

describe("computeScore — barème", () => {
  it("somme des poids = 100 par axe (page parfaite = 100, page nulle = 0)", () => {
    const byAxis = new Map<string, number>();
    for (const c of CHECK_LIST) byAxis.set(c.axis, (byAxis.get(c.axis) ?? 0) + c.weight);
    for (const total of byAxis.values()) expect(total).toBe(100);
  });

  it("page parfaite : tous les sous-scores et le global à 100", () => {
    const result = computeScore(outcomes());
    expect(result.scoreGlobal).toBe(100);
    for (const axis of result.axes) expect(axis.score).toBe(100);
    expect(result.findings).toHaveLength(0);
  });

  it("page ratée : sous-scores à 0", () => {
    const result = computeScore(outcomes(CHECK_LIST.map((c) => c.id)));
    for (const axis of result.axes) expect(axis.score).toBe(0);
    expect(result.scoreGlobal).toBe(0);
  });

  it("déduit exactement le poids du check échoué", () => {
    const result = computeScore(outcomes(["title-missing"])); // poids 20, axe on-page
    const onPage = result.axes.find((a) => a.axis === "on-page");
    expect(onPage?.score).toBe(80);
  });

  it("est déterministe : mêmes constats = même résultat", () => {
    const a = computeScore(outcomes(["title-missing", "https-missing"]));
    const b = computeScore(outcomes(["https-missing", "title-missing"]));
    expect(a).toEqual(b);
  });
});

describe("computeScore — global pondéré et dégradation propre", () => {
  it("pondère le global par globalWeight des axes mesurés", () => {
    // on-page 80 (fail title 20), technique 100. Poids 30 et 25.
    const result = computeScore(outcomes(["title-missing"]));
    expect(result.scoreGlobal).toBe(Math.round((80 * 30 + 100 * 25) / 55));
  });

  it("intègre un axe extra mesuré (ex. Performance) au global", () => {
    const perf: AxisScore = { axis: "performance", label: "Performance", measured: true, score: 40 };
    const result = computeScore(outcomes(), [perf]);
    // on-page 100, technique 100, perf 40. Poids 30/25/30.
    expect(result.scoreGlobal).toBe(Math.round((100 * 30 + 100 * 25 + 40 * 30) / 85));
    expect(result.axes.some((a) => a.axis === "performance")).toBe(true);
  });

  it("exclut un axe non mesuré du global (jamais compté 0)", () => {
    const perf: AxisScore = {
      axis: "performance",
      label: "Performance",
      measured: false,
      score: null,
    };
    const result = computeScore(outcomes(), [perf]);
    expect(result.scoreGlobal).toBe(100); // perf ignoré, pas de 0 fictif
  });
});

describe("computeScore — gating par constat critique", () => {
  it("robots-noindex plafonne le global à 30", () => {
    const result = computeScore(outcomes(["robots-noindex"]));
    expect(result.scoreGlobal).toBe(30);
  });

  it("https-missing plafonne le global à 55", () => {
    const result = computeScore(outcomes(["https-missing"]));
    expect(result.scoreGlobal).toBe(55);
  });

  it("le plafond le plus bas gagne quand plusieurs gates s'appliquent", () => {
    const result = computeScore(outcomes(["robots-noindex", "https-missing"]));
    expect(result.scoreGlobal).toBe(30);
  });

  it("title-missing ne plafonne pas (pas de gate, page accessible)", () => {
    const result = computeScore(outcomes(["title-missing"]));
    expect(result.scoreGlobal).toBeGreaterThan(30);
    expect(CHECK_CATALOG["title-missing"].scoreCap).toBeUndefined();
  });
});

describe("computeScore — recalibrage content-thin", () => {
  it("content-thin pèse 14 (bande majeure)", () => {
    expect(CHECK_CATALOG["content-thin"].weight).toBe(14);
  });
});

describe("computeScore — tri des constats", () => {
  it("classe du plus grave au moins grave (gravité puis poids)", () => {
    const result = computeScore(outcomes(["h1-multiple", "title-missing", "https-missing"]));
    // https-missing (critique, 25) > title-missing (critique, 20) > h1-multiple (mineur, 5)
    expect(result.findings.map((f) => f.id)).toEqual([
      "https-missing",
      "title-missing",
      "h1-multiple",
    ]);
  });

  it("un constat porte symptôme + impact, sans méthode", () => {
    const result = computeScore(outcomes(["title-missing"]));
    const finding = result.findings[0];
    expect(finding.symptom.length).toBeGreaterThan(0);
    expect(finding.impact.length).toBeGreaterThan(0);
  });
});
