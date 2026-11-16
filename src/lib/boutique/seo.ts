import type { JsonLdValue } from "@/components/seo/JsonLd"
import { montantSchema } from "./format"
import type { Article, ArticleResume, Disponibilite, Kit } from "./types"

// Données structurées de la boutique (schema.org). Prix : TTC en euros, tel que l'API le donne.

type Objet = { [key: string]: JsonLdValue }

export const VENDEUR: Objet = { "@type": "Organization", name: "TRINEXTA", url: "https://trinexta.fr" }

export function disponibiliteSchema(d: Disponibilite): string {
  return d === "en stock" ? "https://schema.org/InStock" : "https://schema.org/BackOrder"
}

export function produitJsonLd(a: Article, url: string, images: string[]): Objet {
  const produit: Objet = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: a.nom,
    url,
    category: a.categorie.libelle,
    offers: {
      "@type": "Offer",
      url,
      price: montantSchema(a.prix.ttc),
      priceCurrency: "EUR",
      availability: disponibiliteSchema(a.disponibilite),
      itemCondition: "https://schema.org/NewCondition",
      seller: VENDEUR,
      // Fin de promotion EXCLUE dans l'API : la date du dernier jour valable, sans recalcul de prix.
      ...(a.prix.finPromotion && a.prix.barreTtc !== null ? { priceValidUntil: a.prix.finPromotion.slice(0, 10) } : {}),
    },
  }
  if (a.marque) produit.brand = { "@type": "Brand", name: a.marque.libelle }
  if (a.referenceFabricant) {
    produit.sku = a.referenceFabricant
    produit.mpn = a.referenceFabricant
  }
  if (a.ean && /^\d{13}$/.test(a.ean)) produit.gtin13 = a.ean
  if (images.length) produit.image = images
  const texte = a.description ?? a.presentation ?? a.designation
  if (texte) produit.description = texte.slice(0, 5000)
  return produit
}

export function kitJsonLd(k: Kit, url: string): Objet {
  const prix = k.variantes.map((v) => v.prix.ttc)
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: k.nom,
    url,
    ...(k.description ? { description: k.description } : {}),
    brand: { "@type": "Brand", name: "TRINEXTA" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: montantSchema(Math.min(...prix)),
      highPrice: montantSchema(Math.max(...prix)),
      offerCount: k.variantes.length,
      availability: k.variantes.some((v) => v.disponibilite === "en stock")
        ? "https://schema.org/InStock"
        : "https://schema.org/BackOrder",
      seller: VENDEUR,
    },
  }
}

/** Liste de produits d'une page de catégorie ou de kits. */
export function listeJsonLd(nom: string, elements: { nom: string; url: string }[]): Objet {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nom,
    numberOfItems: elements.length,
    itemListElement: elements.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.nom, url: e.url })),
  }
}

export function elementsListe(articles: ArticleResume[], site: string): { nom: string; url: string }[] {
  return articles.map((a) => ({ nom: a.nom, url: `${site}/boutique/produit/${a.slug}` }))
}

export function faqJsonLd(questions: readonly { question: string; reponse: string }[]): Objet {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  }
}
