import { describe, expect, it } from "vitest";
import { creerJeton, hacherJeton, jetonValide } from "./jeton";

describe("jetons du diagnostic", () => {
  it("crée un jeton de 32 octets en base64url, stocké haché", () => {
    const { jeton, hash } = creerJeton();
    expect(jeton).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(hash).toBe(hacherJeton(jeton));
    expect(hash).not.toContain(jeton);
    expect(creerJeton().jeton).not.toBe(jeton);
  });

  it("valide le bon jeton, refuse un jeton absent, faux ou mal formé", () => {
    const { jeton, hash } = creerJeton();
    expect(jetonValide(jeton, hash)).toBe(true);
    expect(jetonValide(undefined, hash)).toBe(false);
    expect(jetonValide(creerJeton().jeton, hash)).toBe(false);
    expect(jetonValide("court", hash)).toBe(false);
    // Jeton déjà utilisé : le hash a été effacé en base.
    expect(jetonValide(jeton, null)).toBe(false);
  });
});
