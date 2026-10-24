import { describe, expect, it } from "vitest";
import { estDateRdvValide, formaterSiret, formaterTelephone, premierJourRdv } from "@/lib/contact/rdv";

// Vendredi 23 octobre 2026, 23 h 30 à Paris (21 h 30 UTC)
const vendrediSoir = new Date("2026-10-23T21:30:00Z");

describe("rendez-vous", () => {
  it("propose le lundi suivant un vendredi", () => {
    expect(premierJourRdv(vendrediSoir)).toBe("2026-10-26");
  });

  it("refuse aujourd'hui, le week-end et au-delà de la fenêtre", () => {
    expect(estDateRdvValide("2026-10-23", vendrediSoir)).toBe(false);
    expect(estDateRdvValide("2026-10-24", vendrediSoir)).toBe(false);
    expect(estDateRdvValide("2026-10-26", vendrediSoir)).toBe(true);
    expect(estDateRdvValide("2027-03-01", vendrediSoir)).toBe(false);
  });
});

describe("formatage de saisie", () => {
  it("groupe le téléphone par paires et limite à 10 chiffres", () => {
    expect(formaterTelephone("0612345678")).toBe("06 12 34 56 78");
    expect(formaterTelephone("06123456789999")).toBe("06 12 34 56 78");
    expect(formaterTelephone("+33 6 12 34 56 78")).toBe("06 12 34 56 78");
  });

  it("groupe le SIRET en 3 3 3 5", () => {
    expect(formaterSiret("12345678900012")).toBe("123 456 789 00012");
  });
});
