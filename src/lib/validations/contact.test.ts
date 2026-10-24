import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations/contact";
import { premierJourRdv } from "@/lib/contact/rdv";

const base = {
  profil: "entreprise",
  besoin: "infogerance",
  prenom: "Marie",
  nom: "Durand",
  email: "marie@exemple.fr",
  telephone: "0612345678",
  entreprise: "Durand Conseil",
  suite: "rappel",
};

describe("contactFormSchema (TRINEXTA)", () => {
  it("accepte une demande de rappel minimale et formate le téléphone", () => {
    const r = contactFormSchema.safeParse(base);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.telephone).toBe("06 12 34 56 78");
  });

  it("exige le nom de l'entreprise pour une entreprise existante", () => {
    const r = contactFormSchema.safeParse({ ...base, entreprise: "" });
    expect(r.success).toBe(false);
  });

  it("n'exige ni entreprise ni SIRET pour un indépendant, et retire le SIRET", () => {
    const r = contactFormSchema.safeParse({ ...base, profil: "independant", entreprise: undefined, siret: "12345678901234" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.siret).toBeUndefined();
  });

  it("refuse un SIRET qui n'a pas 14 chiffres", () => {
    expect(contactFormSchema.safeParse({ ...base, siret: "123 456" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ ...base, siret: "123 456 789 00012" }).success).toBe(true);
  });

  it("refuse un téléphone qui n'a pas 10 chiffres", () => {
    expect(contactFormSchema.safeParse({ ...base, telephone: "06 12 34" }).success).toBe(false);
  });

  it("exige un message pour un simple message, pas pour un rappel", () => {
    expect(contactFormSchema.safeParse({ ...base, suite: "message" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ ...base, suite: "message", message: "Bonjour" }).success).toBe(true);
  });

  it("exige date, moment et format pour un rendez-vous", () => {
    expect(contactFormSchema.safeParse({ ...base, suite: "rdv" }).success).toBe(false);
    const r = contactFormSchema.safeParse({
      ...base,
      suite: "rdv",
      rdvDate: premierJourRdv(),
      moment: "matin",
      rdvFormat: "sur-site",
    });
    expect(r.success).toBe(true);
  });

  it("efface le créneau de rendez-vous quand la suite n'est pas un rendez-vous", () => {
    const r = contactFormSchema.safeParse({ ...base, rdvDate: premierJourRdv(), rdvFormat: "visio", moment: "matin" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.rdvDate).toBeUndefined();
      expect(r.data.rdvFormat).toBeUndefined();
      expect(r.data.moment).toBe("matin");
    }
  });
});
