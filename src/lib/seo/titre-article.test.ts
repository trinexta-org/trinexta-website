import { describe, expect, it } from "vitest";
import { titreArticle } from "./titre-article";

describe("titreArticle", () => {
  it("ne double pas la marque déjà présente en suffixe", () => {
    expect(
      titreArticle("Helpdesk local pour PME : distance ou sur site ? | TRINEXTA"),
    ).toEqual("Helpdesk local pour PME : distance ou sur site ? | TRINEXTA");
  });

  it("détecte la marque quelle que soit la casse", () => {
    expect(titreArticle("Sauvegarde des PME | Trinexta")).toEqual("Sauvegarde des PME | TRINEXTA");
  });

  it("ajoute la marque une seule fois quand le titre reste sous 60 caractères", () => {
    expect(titreArticle("Sauvegarde des PME")).toEqual("Sauvegarde des PME | TRINEXTA");
  });

  it("n'ajoute pas la marque si le title dépasserait 60 caractères", () => {
    const long = "Cyberattaques 2026 : les menaces qui visent vraiment les TPE";
    expect(titreArticle(`${long} | TRINEXTA`)).toEqual(long);
  });

  it("garde la marque citée dans le corps du titre sans la répéter", () => {
    expect(titreArticle("Pourquoi TRINEXTA mise sur le support local")).toEqual("Pourquoi TRINEXTA mise sur le support local");
  });
});
