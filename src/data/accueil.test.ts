import { describe, expect, it } from "vitest";
import { formatAuteurAvis } from "./accueil";
import { isPartenaireValide } from "./partenaires";

describe("formatAuteurAvis", () => {
  it("garde le prénom et l'initiale du nom", () => {
    expect(formatAuteurAvis("julie R")).toBe("Julie R.");
    expect(formatAuteurAvis("Eric Marchand")).toBe("Eric M.");
  });

  it("ignore les mots sans lettre initiale", () => {
    expect(formatAuteurAvis("Marc (SOCIETE)")).toBe("Marc");
    expect(formatAuteurAvis("TOTONAM")).toBe("Totonam");
  });
});

describe("isPartenaireValide", () => {
  it("accepte les partenaires validés quelle que soit la graphie", () => {
    expect(isPartenaireValide("SentinelOne")).toBe(true);
    expect(isPartenaireValide("TD SYNNEX")).toBe(true);
    expect(isPartenaireValide("mca-technology")).toBe(true);
  });

  it("refuse les autres marques", () => {
    expect(isPartenaireValide("Dell")).toBe(false);
    expect(isPartenaireValide("Microsoft")).toBe(false);
    expect(isPartenaireValide(undefined)).toBe(false);
  });
});
