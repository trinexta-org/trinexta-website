import { describe, expect, it } from "vitest"
import {
  ajouter,
  changerQuantite,
  decoderStocke,
  DUREE_PANIER_MS,
  encoderPanier,
  encoderStocke,
  LIGNES_MAX,
  ligneValide,
  nombreArticles,
  QUANTITE_MAX,
  retirer,
  texteCommande,
  totaux,
  urlCommande,
  type LigneDetaillee,
  type LignePanier,
} from "./panier"

const A: LignePanier = { type: "article", slug: "dell-ecran-p2425h", quantite: 1 }
const K: LignePanier = { type: "kit", slug: "poste-essentiel", variante: "16go-1ecran", quantite: 2 }

describe("panier de la boutique", () => {
  it("ne garde que des lignes valides (le navigateur est modifiable par tous)", () => {
    expect(ligneValide({ type: "article", slug: "ok-slug", quantite: 3 })).toEqual({ type: "article", slug: "ok-slug", quantite: 3 })
    expect(ligneValide({ type: "article", slug: "../admin", quantite: 1 })).toBeNull()
    expect(ligneValide({ type: "article", slug: "a", quantite: 0 })).toBeNull()
    expect(ligneValide({ type: "article", slug: "a", quantite: 1.5 })).toBeNull()
    expect(ligneValide({ type: "kit", slug: "a", variante: "64go", quantite: 1 })).toBeNull()
    expect(ligneValide({ type: "article", slug: "a", quantite: 5000 })?.quantite).toBe(QUANTITE_MAX)
    expect(ligneValide({ type: "article", slug: "a", quantite: 1, email: "x@y.fr" })).toEqual({ type: "article", slug: "a", quantite: 1 })
  })

  it("regroupe un même produit et une même variante", () => {
    let p = ajouter([], A)
    p = ajouter(p, { ...A, quantite: 2 })
    p = ajouter(p, K)
    p = ajouter(p, { ...K, variante: "32go-2ecrans", quantite: 1 })
    expect(p).toHaveLength(3)
    expect(p[0].quantite).toBe(3)
    expect(nombreArticles(p)).toBe(6)
  })

  it("modifie, borne et supprime", () => {
    const p = [A, K]
    expect(changerQuantite(p, A, 7)[0].quantite).toBe(7)
    expect(changerQuantite(p, A, 500)[0].quantite).toBe(QUANTITE_MAX)
    expect(changerQuantite(p, A, 0)).toEqual([K])
    expect(retirer(p, K)).toEqual([A])
  })

  it("limite le nombre de lignes", () => {
    let p: LignePanier[] = []
    for (let i = 0; i < LIGNES_MAX + 5; i++) p = ajouter(p, { type: "article", slug: `produit-${i}`, quantite: 1 })
    expect(p).toHaveLength(LIGNES_MAX)
  })

  it("relit le stockage et efface un panier de plus de 30 jours ou illisible", () => {
    const brut = encoderStocke([A, K], 1000)
    expect(decoderStocke(brut, 2000)).toEqual([A, K])
    expect(decoderStocke(brut, 1000 + DUREE_PANIER_MS + 1)).toEqual([])
    expect(decoderStocke("{pas du json", 0)).toEqual([])
    expect(decoderStocke(JSON.stringify({ v: 2, maj: 0, lignes: [A] }), 0)).toEqual([])
    expect(brut).not.toMatch(/prix|@/)
  })

  it("encode le panier au format du contrat de la boutique (exemple de docs/boutique-panier.md)", () => {
    const lignes: LignePanier[] = [
      { type: "article", slug: "lenovo-thinkpad-e14-gen-6-21m7001afr", quantite: 2 },
      { type: "kit", slug: "kit-poste-bureautique", variante: "16go-1ecran", quantite: 1 },
    ]
    expect(texteCommande(lignes)).toBe("a:lenovo-thinkpad-e14-gen-6-21m7001afr:2,k:kit-poste-bureautique:16go-1ecran:1")
    expect(encoderPanier(lignes)).toBe(
      "YTpsZW5vdm8tdGhpbmtwYWQtZTE0LWdlbi02LTIxbTcwMDFhZnI6MixrOmtpdC1wb3N0ZS1idXJlYXV0aXF1ZToxNmdvLTFlY3Jhbjox",
    )
    expect(urlCommande("https://boutique.trinexta.fr/commande", lignes)).toBe(
      "https://boutique.trinexta.fr/commande?panier=YTpsZW5vdm8tdGhpbmtwYWQtZTE0LWdlbi02LTIxbTcwMDFhZnI6MixrOmtpdC1wb3N0ZS1idXJlYXV0aXF1ZToxNmdvLTFlY3Jhbjox",
    )
  })

  it("reste en base64url sans remplissage et sous 6 000 caractères au maximum du panier", () => {
    const plein: LignePanier[] = Array.from({ length: LIGNES_MAX }, (_, i) => ({
      type: "article",
      slug: `marque-modele-reference-assez-longue-pour-le-test-${String(i).padStart(4, "0")}`.slice(0, 60),
      quantite: QUANTITE_MAX,
    }))
    const encode = encoderPanier(plein)
    expect(encode).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(encode.length).toBeLessThanOrEqual(6000)
  })

  it("calcule des totaux indicatifs sans les lignes sans prix", () => {
    const prix = { devise: "EUR" as const, tauxTva: 20, ht: 10000, ttc: 12000, barreHt: null, barreTtc: null, promotion: null, pourcentage: null, finPromotion: null, operation: null, avantages: [], ecoParticipationHt: 50, ecoParticipationTtc: 60 }
    const d = (ligne: LignePanier, statut: LigneDetaillee["statut"]): LigneDetaillee => ({
      cle: ligne.slug, ligne, statut, nom: "", variante: null, href: "", image: null, categorie: "autre", prix: statut === "ok" ? prix : null, disponibilite: null,
    })
    expect(totaux([d(A, "ok"), d(K, "ok"), d({ ...A, slug: "x" }, "introuvable")])).toEqual({
      ht: 30000, ttc: 36000, ecoHt: 150, ecoTtc: 180, totalHt: 30150, totalTtc: 36180,
    })
  })
})
