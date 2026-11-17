import { describe, expect, it } from "vitest"
import { CGV_CONSOMMATEURS, MEDIATEUR_CONSOMMATION } from "./cgv-consommateurs"
import { GARANTIE_LEGALE_BIENS } from "./garantie-legale-biens"

describe("CGV, article 23 (consommateurs de la boutique)", () => {
  const texte = JSON.stringify(CGV_CONSOMMATEURS)

  it("porte l'encadré de l'article D211-2 sans modification", () => {
    const garanties = CGV_CONSOMMATEURS.rubriques.find((r) => "encadre" in r)
    expect(garanties && "encadre" in garanties && garanties.encadre).toBe(GARANTIE_LEGALE_BIENS)
    expect(GARANTIE_LEGALE_BIENS.paragraphes).toHaveLength(17)
    expect(GARANTIE_LEGALE_BIENS.paragraphes.at(-1)).toMatch(/^Le consommateur bénéficie également de la garantie légale des vices cachés/)
  })

  it("annonce la rétractation : 14 jours, bouton en ligne, frais de retour, remboursement, exclusions", () => {
    for (const attendu of ["quatorze jours", "Renoncer au contrat ici", "Les frais directs de renvoi sont à sa charge", "L221-28", "boutique.trinexta.fr/retractation"]) {
      expect(texte).toContain(attendu)
    }
  })

  it("ne promet aucun médiateur tant qu'il n'est pas désigné", () => {
    if (MEDIATEUR_CONSOMMATION === null) expect(texte).not.toMatch(/médiateur de la consommation dont/i)
  })

  it("règles de rédaction : pas de tiret cadratin ni demi-cadratin hors texte légal", () => {
    const sansEncadre = JSON.stringify(CGV_CONSOMMATEURS.rubriques.map((r) => ({ ...r, encadre: undefined })))
    expect(sansEncadre).not.toMatch(/[—–]/)
  })
})
