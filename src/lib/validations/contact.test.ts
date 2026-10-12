import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations/contact";

const devisPayload = {
  type: "devis",
  prenom: "Jean",
  nom: "Dupont",
  email: "jean.dupont@entreprise.fr",
  entreprise: "Entreprise SAS",
  siret: "12345678901234",
  ville: "Évry-Courcouronnes",
  secteur: "IT",
  taille: "10-49",
  message: "Bonjour",
};

describe("contactFormSchema - offre", () => {
  it("accepte une demande sans offre", () => {
    const result = contactFormSchema.safeParse(devisPayload);
    expect(result.success).toBe(true);
    expect(result.data?.offre).toBeUndefined();
  });

  it("accepte une offre connue", () => {
    const result = contactFormSchema.safeParse({ ...devisPayload, offre: "serenite-essentielle" });
    expect(result.success).toBe(true);
    expect(result.data?.offre).toBe("serenite-essentielle");
  });

  it.each(["offre-inconnue", "", "<script>"])("rejette une offre invalide : %s", (offre) => {
    const result = contactFormSchema.safeParse({ ...devisPayload, offre });
    expect(result.success).toBe(false);
  });
});
