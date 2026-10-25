import { describe, expect, it } from "vitest";
import { diagnosticRequeteSchema, domaineMessagerie, normaliserDomaine, rapportRequeteSchema } from "./domaine";

describe("normaliserDomaine", () => {
  it("normalise la saisie courante", () => {
    expect(normaliserDomaine("Exemple.FR")).toBe("exemple.fr");
    expect(normaliserDomaine("  https://www.exemple.fr/ ")).toBe("www.exemple.fr");
    expect(normaliserDomaine("http://sous.domaine.exemple.co.uk")).toBe("sous.domaine.exemple.co.uk");
    expect(normaliserDomaine("exemple.fr.")).toBe("exemple.fr");
  });

  it("convertit un nom accentué en punycode", () => {
    expect(normaliserDomaine("café.fr")).toBe("xn--caf-dma.fr");
  });

  it("refuse les IP, ports, chemins et identifiants", () => {
    for (const saisie of [
      "192.168.1.1",
      "8.8.8.8",
      "[::1]",
      "exemple.fr:8080",
      "exemple.fr/contact",
      "exemple.fr?x=1",
      "user@exemple.fr",
      "ftp://exemple.fr",
    ]) {
      expect(normaliserDomaine(saisie), saisie).toBeNull();
    }
  });

  it("refuse les noms internes ou réservés et les formes invalides", () => {
    for (const saisie of ["localhost", "intranet", "serveur.local", "app.internal", "site.test", "-exemple.fr", "exemple-.fr", "exem ple.fr", "", "a..fr"]) {
      expect(normaliserDomaine(saisie), saisie).toBeNull();
    }
  });
});

describe("domaineMessagerie", () => {
  it("retire www. seulement en tête", () => {
    expect(domaineMessagerie("www.exemple.fr")).toBe("exemple.fr");
    expect(domaineMessagerie("exemple.fr")).toBe("exemple.fr");
    expect(domaineMessagerie("wwwexemple.fr")).toBe("wwwexemple.fr");
  });
});

describe("schémas zod", () => {
  it("valide et transforme le domaine", () => {
    expect(diagnosticRequeteSchema.parse({ domaine: "HTTPS://Exemple.fr/" })).toEqual({ domaine: "exemple.fr" });
    expect(diagnosticRequeteSchema.safeParse({ domaine: "127.0.0.1" }).success).toBe(false);
    expect(diagnosticRequeteSchema.safeParse({}).success).toBe(false);
  });

  it("exige le jeton du résultat pour le rapport, sans case de consentement", () => {
    const jeton = "A".repeat(43);
    const base = { diagnosticId: "clx123", jeton, email: " Jean@Exemple.fr " };
    expect(rapportRequeteSchema.parse(base)).toEqual({ diagnosticId: "clx123", jeton, email: "jean@exemple.fr" });
    expect(rapportRequeteSchema.safeParse({ ...base, jeton: undefined }).success).toBe(false);
    expect(rapportRequeteSchema.safeParse({ ...base, jeton: "court" }).success).toBe(false);
    expect(rapportRequeteSchema.safeParse({ ...base, email: "pas-un-email" }).success).toBe(false);
  });
});
