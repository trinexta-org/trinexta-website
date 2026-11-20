import { describe, expect, it } from "vitest"
import { partenaireFormSchema } from "./partenaire"

const valide = {
  prenom: "Marie",
  nom: "Durand",
  activite: "Graphiste indépendante",
  entreprise: "MD Création",
  siret: "123 456 789 00012",
  ville: "Évry-Courcouronnes",
  telephone: "06.12.34.56.78",
  email: "marie@example.com",
}

describe("candidature partenaire", () => {
  it("accepte une candidature complète et normalise SIRET et téléphone", () => {
    const r = partenaireFormSchema.parse(valide)
    expect(r.siret).toBe("12345678900012")
    expect(r.telephone).toBe("06 12 34 56 78")
    expect(r.source).toBeUndefined()
  })

  it("exige un SIRET de 14 chiffres", () => {
    expect(partenaireFormSchema.safeParse({ ...valide, siret: "" }).success).toBe(false)
    expect(partenaireFormSchema.safeParse({ ...valide, siret: "1234" }).success).toBe(false)
  })

  it("exige le nom de l'entreprise", () => {
    expect(partenaireFormSchema.safeParse({ ...valide, entreprise: " " }).success).toBe(false)
  })

  it("refuse une source inconnue et accepte une source vide", () => {
    expect(partenaireFormSchema.safeParse({ ...valide, source: "pirate" }).success).toBe(false)
    expect(partenaireFormSchema.parse({ ...valide, source: "" }).source).toBeUndefined()
    expect(partenaireFormSchema.parse({ ...valide, source: "facebook" }).source).toBe("facebook")
  })
})
