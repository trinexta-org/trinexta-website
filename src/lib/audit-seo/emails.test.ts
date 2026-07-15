import { describe, expect, it } from "vitest";
import {
  buildAuditReportHtml,
  buildAuditTeamNotificationHtml,
  type AuditEmailData,
} from "./emails";

const DATA: AuditEmailData = {
  url: "https://exemple.fr/",
  scoreGlobal: 63,
  axes: [
    { axis: "on-page", label: "Référencement on-page", measured: true, score: 55 },
    { axis: "performance", label: "Performance", measured: false, score: null },
  ],
  findings: [
    {
      id: "meta-description-missing",
      axis: "on-page",
      severity: "majeur",
      symptom: "La page n'a pas de méta description.",
      impact: "Google compose un extrait au hasard sous votre lien.",
    },
  ],
  aiSummary: "Deux points pèsent sur votre visibilité.",
};

describe("buildAuditReportHtml", () => {
  const html = buildAuditReportHtml(DATA, "Jean", "https://bookings.example/trinexta");

  it("affiche le score global et les sous-scores", () => {
    expect(html).toContain("63");
    expect(html).toContain("Référencement on-page");
    expect(html).toContain("Non mesuré"); // axe performance dégradé
  });

  it("affiche les constats en symptôme + impact", () => {
    expect(html).toContain("La page n&#39;a pas de méta description.");
    expect(html).toContain("Google compose un extrait au hasard");
  });

  it("intègre la synthèse IA et le CTA RDV", () => {
    expect(html).toContain("Deux points pèsent sur votre visibilité.");
    expect(html).toContain("https://bookings.example/trinexta");
    expect(html).toContain("Prendre rendez-vous");
  });

  it("ne divulgue pas de méthode de correction", () => {
    expect(html).not.toMatch(/<meta name/i);
    expect(html).not.toMatch(/ajoutez|balise à ajouter|voici comment/i);
  });

  it("intègre le bloc « ce que cet audit ne mesure pas » (4 dims)", () => {
    expect(html).toContain("Ce que cet audit ne mesure pas");
    expect(html).toContain("Le SEO local");
    expect(html).toContain("La conversion");
    expect(html).toContain("La concurrence");
    expect(html).toContain("Le reste du site");
  });

  it("propose l'offre d'audit approfondi déduit", () => {
    expect(html).toContain("390");
    expect(html).toMatch(/déduit/i);
  });

  it("adapte la conclusion au palier de score (moyen)", () => {
    // score 63 => palier moyen
    expect(html).toMatch(/base est correcte/i);
  });

  it("pointe le CTA vers /contact pré-rempli quand aucun bookings", () => {
    const noBookings = buildAuditReportHtml(DATA, "Jean");
    expect(noBookings).toContain("/contact?");
    expect(noBookings).toContain("audit_score=63");
  });
});

describe("buildAuditTeamNotificationHtml", () => {
  const lead = {
    prenom: "Jean",
    nom: "Dupont",
    email: "jean@exemple.fr",
    telephone: "06 12 34 56 78",
    entreprise: "ACME",
  };

  it("contient les coordonnées du lead et le score", () => {
    const html = buildAuditTeamNotificationHtml(DATA, lead, "audit_123", true);
    expect(html).toContain("jean@exemple.fr");
    expect(html).toContain("ACME");
    expect(html).toContain("63/100");
    expect(html).toContain("audit_123");
  });

  it("signale l'échec d'envoi du rapport prospect", () => {
    const html = buildAuditTeamNotificationHtml(DATA, lead, "audit_123", false);
    expect(html).toMatch(/échoué/i);
  });

  it("gère un téléphone absent", () => {
    const html = buildAuditTeamNotificationHtml(DATA, { ...lead, telephone: null }, "a", true);
    expect(html).toContain("Non renseigné");
  });
});
