import { describe, expect, it } from "vitest"
import { kitJsonLd, listeJsonLd, produitJsonLd } from "./seo"
import type { Article, Kit } from "./types"

const prix = { devise: "EUR" as const, tauxTva: 20, ht: 108000, ttc: 129600, barreHt: null, barreTtc: null, promotion: null, pourcentage: null, finPromotion: null, operation: null, avantages: [], ecoParticipationHt: 50, ecoParticipationTtc: 60 }

const article: Article = {
  slug: "lenovo-thinkpad-e14-gen-6-21m7001afr",
  nom: "Lenovo ThinkPad E14 Gen 6",
  designation: "Portable 14\" Intel Core i5 16 Go 512 Go SSD",
  marque: { code: "lenovo", libelle: "Lenovo" },
  categorie: { code: "portable", libelle: "Ordinateur portable" },
  prix,
  disponibilite: "sur commande",
  image: null,
  miseAJour: "2026-11-16T02:10:00.000Z",
  referenceFabricant: "21M7001AFR",
  ean: "0197529000000",
  description: null,
  presentation: "Présentation.",
  caracteristiques: [],
  images: [],
  lies: [],
}

describe("données structurées de la boutique", () => {
  it("décrit un produit avec son offre TTC", () => {
    const ld = produitJsonLd(article, "https://trinexta.fr/boutique/produit/x", ["https://api.test/i.webp"])
    expect(ld).toMatchObject({
      "@type": "Product",
      brand: { "@type": "Brand", name: "Lenovo" },
      sku: "21M7001AFR",
      gtin13: "0197529000000",
      image: ["https://api.test/i.webp"],
      offers: {
        "@type": "Offer",
        price: "1296.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/BackOrder",
        seller: { "@type": "Organization", name: "TRINEXTA" },
      },
    })
  })

  it("omet un EAN mal formé et l'image absente", () => {
    const ld = produitJsonLd({ ...article, ean: "123", disponibilite: "en stock" }, "u", [])
    expect(ld.gtin13).toBeUndefined()
    expect(ld.image).toBeUndefined()
    expect((ld.offers as { availability: string }).availability).toBe("https://schema.org/InStock")
  })

  it("donne la fourchette de prix d'un kit", () => {
    const variante = (ttc: number) => ({
      code: "unique" as const, libelle: "", memoireGo: null, ecrans: null, nom: "", prix: { ...prix, ttc },
      valeur: { ht: 0, ttc: 0 }, remisePourcent: 0, disponibilite: "sur commande" as const, composition: [],
    })
    const kit: Kit = { slug: "k", nom: "Kit", description: null, aPartirDe: { ht: 0, ttc: 0 }, miseAJour: "", variantes: [variante(174000), variante(210000)], aide: null }
    expect(kitJsonLd(kit, "u").offers).toMatchObject({ "@type": "AggregateOffer", lowPrice: "1740.00", highPrice: "2100.00", offerCount: 2 })
  })

  it("numérote les éléments d'une liste", () => {
    const ld = listeJsonLd("Écrans", [{ nom: "A", url: "https://a" }, { nom: "B", url: "https://b" }])
    expect(ld.numberOfItems).toBe(2)
    expect(ld.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "A", url: "https://a" },
      { "@type": "ListItem", position: 2, name: "B", url: "https://b" },
    ])
  })
})
