import type { MetadataRoute } from "next"
import { CATEGORIES_BOUTIQUE } from "@/data/boutique"
import { boutique, type ClientBoutique } from "./api"

/**
 * Adresses de la boutique pour le sitemap : accueil, kits, catégories non vides (facettes du catalogue),
 * produits et kits (`/plan`, `lastModified` = `miseAJour`). API indisponible : seulement les pages fixes.
 */
export async function routesBoutique(base: string, api: ClientBoutique = boutique()): Promise<MetadataRoute.Sitemap> {
  const [plan, catalogue] = await Promise.all([api.plan(), api.catalogue({ parPage: 1 })])
  const fixes: MetadataRoute.Sitemap = [
    { url: `${base}/boutique`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/boutique/kits`, changeFrequency: "weekly", priority: 0.7 },
  ]
  const categories: MetadataRoute.Sitemap = catalogue.ok
    ? catalogue.data.facettes.categories
        .filter((c) => c.nombre > 0 && CATEGORIES_BOUTIQUE.includes(c.code))
        .map((c) => ({ url: `${base}/boutique/${c.code}`, changeFrequency: "daily", priority: 0.7 }))
    : []
  if (!plan.ok) return [...fixes, ...categories]
  const produits: MetadataRoute.Sitemap = plan.data.articles.map((a) => ({
    url: `${base}/boutique/produit/${a.slug}`,
    lastModified: new Date(a.miseAJour),
    changeFrequency: "weekly",
    priority: 0.6,
  }))
  const kits: MetadataRoute.Sitemap = plan.data.kits.map((k) => ({
    url: `${base}/boutique/kits/${k.slug}`,
    lastModified: new Date(k.miseAJour),
    changeFrequency: "weekly",
    priority: 0.6,
  }))
  return [...fixes, ...categories, ...produits, ...kits]
}
