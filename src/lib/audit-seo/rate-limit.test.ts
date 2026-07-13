import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/estimation/rate-limit";

// Le module audit SEO applique checkRateLimit avec des clés préfixées par
// dimension (email, domaine). On vérifie ici que les quotas sont indépendants
// par clé et bien plafonnés. Clés uniques par test pour éviter les collisions
// de compteur en mémoire entre tests.

describe("rate-limit audit SEO — email et domaine", () => {
  it("plafonne un email après N requêtes, sans affecter un autre email", () => {
    const max = 4;
    const a = `audit-seo-email:${Math.random()}`;
    const b = `audit-seo-email:${Math.random()}`;

    for (let i = 0; i < max; i++) expect(checkRateLimit(a, max)).toBe(true);
    expect(checkRateLimit(a, max)).toBe(false); // a plafonné
    expect(checkRateLimit(b, max)).toBe(true); // b intact
  });

  it("plafonne un domaine indépendamment de l'email", () => {
    const max = 5;
    const domain = `audit-seo-domain:${Math.random()}`;
    const email = `audit-seo-email:${Math.random()}`;

    for (let i = 0; i < max; i++) expect(checkRateLimit(domain, max)).toBe(true);
    expect(checkRateLimit(domain, max)).toBe(false); // domaine plafonné
    expect(checkRateLimit(email, max)).toBe(true); // dimension email non touchée
  });
});
