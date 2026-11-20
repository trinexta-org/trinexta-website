import { describe, expect, it } from "vitest"
import { PARTENAIRES_EXEMPLES, PARTENAIRES_PRIX_POSTE, commissionMensuelle, progressionExemple } from "./programme-partenaires"
import { SERENITE_OFFRES } from "./serenite"

describe("exemples de gains partenaires", () => {
  it("calcule 15 % de 79 € par poste", () => {
    expect(commissionMensuelle(1)).toBe(11.85)
    expect(commissionMensuelle(35)).toBe(414.75)
  })

  it("donne les montants affichés pour Karim et Sophie", () => {
    const [karim, sophie] = PARTENAIRES_EXEMPLES.map((e) => progressionExemple(e).at(-1))
    expect(karim).toMatchObject({ postesSuivis: 35, commission: 414.75 })
    expect(sophie).toMatchObject({ postesSuivis: 18, commission: 213.3 })
  })

  it("reste aligné sur le prix public de Sérénité Complète", () => {
    expect(JSON.stringify(SERENITE_OFFRES)).toContain(`${PARTENAIRES_PRIX_POSTE} €`)
  })
})
