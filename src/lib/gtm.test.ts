import { afterEach, describe, expect, it, vi } from "vitest";
import { ADS_LEAD_CONVERSION, trackLeadConversion } from "./gtm";

// L'env de test est "node" : on simule window/gtag a la main.
const stubWindow = (gtag?: unknown) =>
  vi.stubGlobal("window", gtag === undefined ? {} : { gtag });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("trackLeadConversion", () => {
  it("emet un event conversion vers l'action lead du compte Ads", () => {
    const gtag = vi.fn();
    stubWindow(gtag);

    trackLeadConversion({ form_id: "contact_principal" });

    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: ADS_LEAD_CONVERSION,
      form_id: "contact_principal",
    });
  });

  it("reste silencieux sans gtag (consentement refuse, hors production)", () => {
    stubWindow();
    expect(() => trackLeadConversion()).not.toThrow();
  });

  it("cible bien l'ID et le label fournis par Google Ads", () => {
    expect(ADS_LEAD_CONVERSION).toBe("AW-16975609254/T_j8CLGw9rQaEKb7zJ4_");
  });
});
