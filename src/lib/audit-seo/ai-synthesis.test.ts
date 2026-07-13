import { describe, expect, it } from "vitest";
import { CHECK_LIST } from "@/data/audit-seo/catalog";
import { filterKnownIds, generateSynthesis, guardSynthesis } from "./ai-synthesis";
import { computeScore, type CheckOutcome } from "./score";

function outcomes(failedIds: string[]): CheckOutcome[] {
  const failed = new Set(failedIds);
  return CHECK_LIST.map((c) => ({ id: c.id, passed: !failed.has(c.id) }));
}

describe("filterKnownIds", () => {
  const known = new Set(["a", "b", "c"]);
  it("ne garde que les ids connus", () => {
    expect(filterKnownIds(["a", "x", "b", "y"], known)).toEqual(["a", "b"]);
  });
  it("déduplique", () => {
    expect(filterKnownIds(["a", "a", "b"], known)).toEqual(["a", "b"]);
  });
  it("gère les entrées non-tableau ou non-string", () => {
    expect(filterKnownIds(null, known)).toEqual([]);
    expect(filterKnownIds(["a", 3, null], known)).toEqual(["a"]);
  });
});

describe("guardSynthesis", () => {
  const known = new Set(["title-missing", "https-missing"]);

  it("filtre les ids hors liste et conserve le résumé", () => {
    const out = guardSynthesis(
      { summary: "Résumé.", priorityFindingIds: ["title-missing", "inexistant"] },
      known
    );
    expect(out).toEqual({ summary: "Résumé.", priorityFindingIds: ["title-missing"] });
  });

  it("renvoie null si le résumé est vide ou absent", () => {
    expect(guardSynthesis({ summary: "   ", priorityFindingIds: [] }, known)).toBeNull();
    expect(guardSynthesis({ priorityFindingIds: [] }, known)).toBeNull();
    expect(guardSynthesis(null, known)).toBeNull();
  });

  it("ignore un summary non-string", () => {
    expect(guardSynthesis({ summary: 42, priorityFindingIds: [] }, known)).toBeNull();
  });
});

describe("generateSynthesis — garde-fou borné (l'IA ne modifie pas le score)", () => {
  const baseResult = computeScore(outcomes(["title-missing", "https-missing"]));

  it("le score mécanique reste identique quoi que renvoie l'IA", async () => {
    const before = JSON.parse(JSON.stringify(baseResult));
    await generateSynthesis(
      { scoreGlobal: baseResult.scoreGlobal, result: baseResult, pageText: "texte" },
      {
        // L'IA tente d'injecter un faux score et des ids bidon.
        invoke: async () => ({
          summary: "Score réel : 100/100, tout va bien.",
          priorityFindingIds: ["title-missing", "id-bidon", "999"],
        }),
      }
    );
    // Le résultat mécanique n'est pas muté par l'appel IA.
    expect(baseResult).toEqual(before);
  });

  it("filtre les ids hors constats réels", async () => {
    const synthesis = await generateSynthesis(
      { scoreGlobal: baseResult.scoreGlobal, result: baseResult, pageText: "x" },
      {
        invoke: async () => ({
          summary: "Synthèse.",
          priorityFindingIds: ["title-missing", "id-bidon"],
        }),
      }
    );
    expect(synthesis?.priorityFindingIds).toEqual(["title-missing"]);
  });

  it("dégradation propre : null si l'IA échoue", async () => {
    const synthesis = await generateSynthesis(
      { scoreGlobal: baseResult.scoreGlobal, result: baseResult, pageText: "x" },
      {
        invoke: async () => {
          throw new Error("IA indisponible");
        },
      }
    );
    expect(synthesis).toBeNull();
  });
});
