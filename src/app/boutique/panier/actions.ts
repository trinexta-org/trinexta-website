"use server"

import { boutique } from "@/lib/boutique/api"
import { baseApi } from "@/lib/boutique/constantes"
import { urlImage } from "@/lib/boutique/format"
import { cleLigne, LIGNES_MAX, ligneValide, type LigneDetaillee } from "@/lib/boutique/panier"

/**
 * Complète les lignes du panier avec les données publiques de l'API (nom, photo, prix, disponibilité).
 * Lecture seule, sans donnée personnelle ; les lignes reçues du navigateur sont revalidées ici.
 * Les réponses de l'API sont celles du cache de 300 s, partagées avec les fiches produit.
 */
export async function chargerPanier(entree: unknown): Promise<LigneDetaillee[]> {
  if (!Array.isArray(entree)) return []
  const lignes = entree.slice(0, LIGNES_MAX).map(ligneValide).filter((l) => l !== null)
  const api = boutique()
  const vignette = (i: { miniature: string } | null | undefined) => urlImage(i?.miniature, baseApi())
  return Promise.all(
    lignes.map(async (ligne): Promise<LigneDetaillee> => {
      const base = { cle: cleLigne(ligne), ligne, variante: null, image: null, prix: null, disponibilite: null }
      if (ligne.type === "article") {
        const res = await api.article(ligne.slug)
        if (!res.ok) return { ...base, statut: res.raison, nom: ligne.slug, href: `/boutique/produit/${ligne.slug}`, categorie: "autre" }
        const a = res.data
        return {
          ...base,
          statut: "ok",
          nom: a.marque && !a.nom.toLowerCase().startsWith(a.marque.libelle.toLowerCase()) ? `${a.marque.libelle} ${a.nom}` : a.nom,
          href: `/boutique/produit/${a.slug}`,
          image: vignette(a.image),
          categorie: a.categorie.code,
          prix: a.prix,
          disponibilite: a.disponibilite,
        }
      }
      const res = await api.kit(ligne.slug)
      const href = `/boutique/kits/${ligne.slug}?variante=${ligne.variante}`
      if (!res.ok) return { ...base, statut: res.raison, nom: ligne.slug, href, categorie: "kit" }
      const v = res.data.variantes.find((x) => x.code === ligne.variante)
      if (!v) return { ...base, statut: "introuvable", nom: res.data.nom, href, categorie: "kit" }
      return {
        ...base,
        statut: "ok",
        nom: res.data.nom,
        variante: v.code === "unique" ? null : v.libelle,
        href,
        image: vignette(v.composition.find((c) => c.image)?.image),
        categorie: "kit",
        prix: v.prix,
        disponibilite: v.disponibilite,
      }
    }),
  )
}
