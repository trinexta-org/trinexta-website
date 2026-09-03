import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ADS_LEAD_CONVERSION,
  buildHashedUserData,
  pushGtmEvent,
  sha256Hex,
  trackAdsConversion,
  trackLeadConversion,
} from "./gtm";

// L'env de test est "node" : on simule window/gtag a la main.
const stubWindow = (gtag?: unknown) =>
  vi.stubGlobal("window", gtag === undefined ? {} : { gtag });

// Hashes de reference calcules hors du code teste (sha256 de la valeur
// normalisee), pour verifier la normalisation autant que le hachage.
const HASH_EMAIL =
  "8500be602b35b0df3c7b2847434591e01669c0c93a10b9b070d28a51843ee71a";
const HASH_PHONE =
  "42d573cfc315801d4cd8eddd5416b416a0bf298b9b9e12d6b07442c91db42bd8";
// sha256("janedoe@gmail.com") : points et suffixe + retires du local-part.
const HASH_GMAIL =
  "d6117306485ed0e50afab3ac871e98f81699151f30281527d63ff5f233656c69";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("trackLeadConversion", () => {
  it("emet un event conversion vers l'action lead du compte Ads", async () => {
    const gtag = vi.fn();
    stubWindow(gtag);

    await trackLeadConversion({ form_id: "contact_principal" });

    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: ADS_LEAD_CONVERSION,
      form_id: "contact_principal",
    });
  });

  it("reste silencieux sans gtag (consentement refuse, hors production)", async () => {
    stubWindow();
    await expect(trackLeadConversion()).resolves.toBeUndefined();
  });

  it("n'envoie aucun user_data tant que le flag conversions ameliorees est off", async () => {
    const gtag = vi.fn();
    stubWindow(gtag);

    await trackLeadConversion(
      { form_id: "contact_principal" },
      { email: "jean.dupont@example.com", telephone: "06 12 34 56 78" },
    );

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).not.toHaveBeenCalledWith("set", "user_data", expect.anything());
  });

  // Un bloqueur ou une extension peut remplacer window.gtag par une fonction
  // qui leve. Le parcours de succes du formulaire ne doit pas en dependre.
  it("ne rejette pas si gtag leve une exception", async () => {
    const gtag = vi.fn(() => {
      throw new Error("gtag remplace par une extension");
    });
    stubWindow(gtag);

    await expect(
      trackLeadConversion(
        { form_id: "contact_principal" },
        { email: "jean.dupont@example.com" },
      ),
    ).resolves.toBeUndefined();
    expect(gtag).toHaveBeenCalled();
  });

  it("ne rejette pas si dataLayer est inaccessible", () => {
    vi.stubGlobal("window", {
      get dataLayer() {
        throw new Error("acces refuse");
      },
    });

    expect(() => pushGtmEvent("form_submit")).not.toThrow();
  });

  it("ne rejette pas si trackAdsConversion rencontre un gtag defaillant", () => {
    stubWindow(() => {
      throw new Error("boom");
    });

    expect(() => trackAdsConversion("AW-000/label")).not.toThrow();
  });

  it("cible bien l'ID et le label fournis par Google Ads", () => {
    expect(ADS_LEAD_CONVERSION).toBe("AW-16975609254/T_j8CLGw9rQaEKb7zJ4_");
  });
});

describe("buildHashedUserData — normalisation Google", () => {
  it.each([
    ["Jane.Doe@Gmail.com"],
    ["janedoe@gmail.com"],
    ["jane.doe+devis@gmail.com"],
    ["  Jane.Doe+Devis@GMAIL.COM  "],
  ])(
    "retire points et suffixe + du local-part Gmail : %s",
    async (email) => {
      const data = await buildHashedUserData({ email });
      expect(data).toEqual({ sha256_email_address: HASH_GMAIL });
    },
  );

  it("ne touche ni aux points ni au + hors Gmail", async () => {
    const data = await buildHashedUserData({ email: "jean.dupont@example.com" });
    expect(data).toEqual({ sha256_email_address: HASH_EMAIL });
  });

  it("met l'email en minuscules et le trim avant hachage", async () => {
    const data = await buildHashedUserData({
      email: "  Jean.Dupont@Example.COM ",
    });
    expect(data).toEqual({ sha256_email_address: HASH_EMAIL });
  });

  it.each([
    ["0612345678"],
    ["06 12 34 56 78"],
    ["06.12.34.56.78"],
    ["+33 6 12 34 56 78"],
    ["33612345678"],
  ])("normalise %s en E.164 avant hachage", async (telephone) => {
    const data = await buildHashedUserData({ telephone });
    expect(data).toEqual({ sha256_phone_number: HASH_PHONE });
  });

  it("ignore un telephone hors format plutot que de hacher une valeur inutile", async () => {
    expect(await buildHashedUserData({ telephone: "12345" })).toBeNull();
  });

  it("retourne null si aucune donnee exploitable", async () => {
    expect(await buildHashedUserData({})).toBeNull();
    expect(await buildHashedUserData({ email: "" })).toBeNull();
  });
});

describe("sha256Hex", () => {
  it("produit un hex minuscule de 64 caracteres", async () => {
    const hash = await sha256Hex("jean.dupont@example.com");
    expect(hash).toBe(HASH_EMAIL);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});
