import { describe, expect, it } from "vitest";
import type { CheckOutcome } from "../score";
import { runOnPageChecks } from "./on-page";

function byId(outcomes: CheckOutcome[]): Record<string, boolean> {
  return Object.fromEntries(outcomes.map((o) => [o.id, o.passed]));
}

const longText = Array.from({ length: 320 }, () => "mot").join(" ");

const PERFECT = `<!doctype html>
<html lang="fr"><head>
<title>Infogérance à Évry pour les PME de l'Essonne</title>
<meta name="description" content="Trinexta accompagne les PME de l'Essonne sur leur infogérance, leur cybersécurité et leur informatique au quotidien, avec un interlocuteur dédié.">
<link rel="canonical" href="https://exemple.fr/">
<meta property="og:title" content="Infogérance Évry">
<meta property="og:image" content="https://exemple.fr/og.png">
<script type="application/ld+json">{"@context":"https://schema.org"}</script>
</head><body>
<h1>Infogérance à Évry</h1>
<p>${longText}</p>
<img src="/a.jpg" alt="Une équipe au travail">
</body></html>`;

const BROKEN = `<html><head></head><body>
<h1>Un</h1><h1>Deux</h1>
<p>Trop court.</p>
<img src="/a.jpg">
</body></html>`;

describe("runOnPageChecks — page bien optimisée", () => {
  const r = byId(runOnPageChecks(PERFECT));
  it.each([
    "title-missing",
    "title-length",
    "meta-description-missing",
    "meta-description-length",
    "h1-missing",
    "h1-multiple",
    "img-alt-missing",
    "canonical-missing",
    "open-graph-missing",
    "structured-data-missing",
    "content-thin",
  ])("passe %s", (id) => {
    expect(r[id]).toBe(true);
  });
});

describe("runOnPageChecks — page à problèmes", () => {
  const r = byId(runOnPageChecks(BROKEN));

  it("détecte le titre manquant", () => expect(r["title-missing"]).toBe(false));
  it("détecte la description manquante", () => expect(r["meta-description-missing"]).toBe(false));
  it("détecte les H1 multiples", () => expect(r["h1-multiple"]).toBe(false));
  it("ne signale pas de H1 manquant (il y en a)", () => expect(r["h1-missing"]).toBe(true));
  it("détecte l'image sans alt", () => expect(r["img-alt-missing"]).toBe(false));
  it("détecte l'absence de canonical", () => expect(r["canonical-missing"]).toBe(false));
  it("détecte l'absence d'Open Graph", () => expect(r["open-graph-missing"]).toBe(false));
  it("détecte l'absence de données structurées", () =>
    expect(r["structured-data-missing"]).toBe(false));
  it("détecte le contenu trop maigre", () => expect(r["content-thin"]).toBe(false));
});

describe("runOnPageChecks — longueur du titre", () => {
  it("échoue sur un titre trop court", () => {
    const r = byId(runOnPageChecks("<title>Court</title>"));
    expect(r["title-missing"]).toBe(true);
    expect(r["title-length"]).toBe(false);
  });

  it("ne pénalise pas la longueur quand le titre est absent", () => {
    const r = byId(runOnPageChecks("<html><head></head><body></body></html>"));
    expect(r["title-missing"]).toBe(false);
    expect(r["title-length"]).toBe(true);
  });
});
