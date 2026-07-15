import { describe, expect, it } from "vitest";
import { AUDIT_BLIND_SPOTS, getScoreBand, SCORE_BAND_NARRATIVE } from "./bands";

describe("getScoreBand", () => {
  it.each([
    [0, "bas"],
    [49, "bas"],
    [50, "moyen"],
    [79, "moyen"],
    [80, "haut"],
    [100, "haut"],
  ] as const)("score %i => %s", (score, band) => {
    expect(getScoreBand(score)).toBe(band);
  });
});

describe("narratif et angles morts", () => {
  it("fournit conclusion + accroche pour chaque palier", () => {
    for (const band of ["bas", "moyen", "haut"] as const) {
      expect(SCORE_BAND_NARRATIVE[band].conclusion.length).toBeGreaterThan(0);
      expect(SCORE_BAND_NARRATIVE[band].ctaHook.length).toBeGreaterThan(0);
    }
  });

  it("expose les 4 dimensions non mesurées", () => {
    expect(AUDIT_BLIND_SPOTS).toHaveLength(4);
    for (const spot of AUDIT_BLIND_SPOTS) {
      expect(spot.title.length).toBeGreaterThan(0);
      expect(spot.description.length).toBeGreaterThan(0);
    }
  });
});
