import { CHEMIN_IMAGES } from "./constantes"
import { estCodeCategorie, TRIS, type CodeCategorie, type CriteresCatalogue, type Tri } from "./types"

// Fonctions pures de la boutique : affichage des montants, adresses, lecture des paramètres d'URL.
// Aucun prix n'est calculé ici : les montants viennent tels quels de l'API.

const EUROS = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })

/** Centimes vers « 1 296,00 € » (espace insécable du format français). */
export function euros(centimes: number): string {
  return EUROS.format(centimes / 100)
}

/** Centimes vers « 1296.00 », pour les données structurées (point décimal, sans séparateur). */
export function montantSchema(centimes: number): string {
  return (centimes / 100).toFixed(2)
}

/** Adresse absolue d'une image de l'API. Toute adresse hors du chemin des images est refusée. */
export function urlImage(chemin: string | null | undefined, base: string): string | null {
  if (!chemin || !chemin.startsWith(CHEMIN_IMAGES)) return null
  return `${base.replace(/\/+$/, "")}${chemin}`
}

export type Params = Record<string, string | string[] | undefined>

function un(p: Params, cle: string): string | undefined {
  const v = p[cle]
  return Array.isArray(v) ? v[0] : v
}

/** Entier positif écrit en chiffres seulement, sinon undefined. */
function entier(v: string | undefined, max: number): number | undefined {
  if (!v || !/^\d{1,9}$/.test(v)) return undefined
  const n = Number(v)
  return n > 0 && n <= max ? n : undefined
}

export const PAR_PAGE = 24

/**
 * Paramètres d'URL d'une liste vers les critères de l'API. Les prix de l'URL sont en euros HT entiers
 * (lisibles), convertis en centimes pour l'API. Toute valeur mal formée est ignorée, jamais transmise.
 */
export function lireCriteres(p: Params, categorie?: CodeCategorie): CriteresCatalogue {
  const marque = un(p, "marque")
  const q = un(p, "q")?.trim().slice(0, 80)
  const tri = un(p, "tri")
  let prixMin = entier(un(p, "prixMin"), 1_000_000)
  let prixMax = entier(un(p, "prixMax"), 1_000_000)
  if (prixMin !== undefined && prixMax !== undefined && prixMin > prixMax) [prixMin, prixMax] = [undefined, undefined]
  return {
    categorie,
    marque: marque && /^[a-z0-9-]{1,60}$/.test(marque) ? marque : undefined,
    q: q || undefined,
    tri: tri && (TRIS as readonly string[]).includes(tri) ? (tri as Tri) : undefined,
    prixMin: prixMin === undefined ? undefined : prixMin * 100,
    prixMax: prixMax === undefined ? undefined : prixMax * 100,
    page: entier(un(p, "page"), 10_000) ?? 1,
    parPage: PAR_PAGE,
  }
}

/** Une liste filtrée (marque, prix, recherche) n'a pas d'adresse canonique propre : elle renvoie à sa catégorie. */
export function estFiltree(c: CriteresCatalogue): boolean {
  return Boolean(c.marque || c.q || c.prixMin !== undefined || c.prixMax !== undefined)
}

/**
 * Adresse canonique d'une liste : sans tri ni filtre ; la pagination n'est gardée qu'au-delà de la page 1
 * et seulement sur une liste non filtrée.
 */
export function canonicalListe(chemin: string, c: CriteresCatalogue): string {
  if (estFiltree(c) || !c.page || c.page <= 1) return chemin
  return `${chemin}?page=${c.page}`
}

/** Paramètres d'URL de la liste, avec des modifications (null retire le paramètre). Prix en euros HT. */
export function lienListe(
  chemin: string,
  c: CriteresCatalogue,
  modif: Partial<Record<"marque" | "q" | "tri" | "prixMin" | "prixMax" | "page", string | null>> = {},
): string {
  const v: Record<string, string | null | undefined> = {
    q: c.q,
    marque: c.marque,
    prixMin: c.prixMin === undefined ? undefined : String(c.prixMin / 100),
    prixMax: c.prixMax === undefined ? undefined : String(c.prixMax / 100),
    tri: c.tri,
    page: c.page && c.page > 1 ? String(c.page) : undefined,
    ...modif,
  }
  if (!("page" in modif)) v.page = undefined
  const p = new URLSearchParams()
  for (const [cle, val] of Object.entries(v)) if (val) p.set(cle, val)
  const s = p.toString()
  return s ? `${chemin}?${s}` : chemin
}

export function codeCategorie(v: string): CodeCategorie | null {
  return estCodeCategorie(v) ? v : null
}
