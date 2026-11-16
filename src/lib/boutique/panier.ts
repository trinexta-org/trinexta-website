import type { CodeCategorie, CodeVariante, Disponibilite, Prix } from "./types"

// Panier de la boutique, conservé dans le navigateur (localStorage). Il ne contient AUCUNE donnée
// personnelle : des adresses de produit (slug), des codes de variante et des quantités. Aucun prix :
// les montants sont relus dans l'API à chaque affichage, et l'espace client recalcule tout à la commande.
// Fonctions pures, testées dans panier.test.ts ; l'accès au navigateur est isolé en bas du fichier.

export const CLE_PANIER = "trinexta_boutique_panier"
/** Un panier oublié s'efface au bout de 30 jours. */
export const DUREE_PANIER_MS = 30 * 24 * 60 * 60 * 1000
/** Bornes du contrat `docs/boutique-panier.md` (espace client) : 1 à 500 par ligne, 50 lignes au plus. */
export const QUANTITE_MAX = 500
export const LIGNES_MAX = 50

export const VARIANTES: readonly CodeVariante[] = ["16go-1ecran", "16go-2ecrans", "32go-1ecran", "32go-2ecrans", "unique"]

export type LignePanier =
  | { type: "article"; slug: string; quantite: number }
  | { type: "kit"; slug: string; variante: CodeVariante; quantite: number }

interface Stocke {
  v: 1
  maj: number
  lignes: LignePanier[]
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function quantite(n: unknown): number | null {
  return typeof n === "number" && Number.isInteger(n) && n >= 1 ? Math.min(n, QUANTITE_MAX) : null
}

/** Ligne venue du navigateur (donc modifiable par n'importe qui) : validée champ par champ, sinon écartée. */
export function ligneValide(x: unknown): LignePanier | null {
  if (!x || typeof x !== "object") return null
  const o = x as Record<string, unknown>
  const q = quantite(o.quantite)
  if (q === null || typeof o.slug !== "string" || o.slug.length > 200 || !SLUG.test(o.slug)) return null
  if (o.type === "article") return { type: "article", slug: o.slug, quantite: q }
  if (o.type === "kit" && typeof o.variante === "string" && (VARIANTES as readonly string[]).includes(o.variante)) {
    return { type: "kit", slug: o.slug, variante: o.variante as CodeVariante, quantite: q }
  }
  return null
}

const memeLigne = (a: LignePanier, b: LignePanier) =>
  a.type === b.type && a.slug === b.slug && (a.type === "article" || (b.type === "kit" && a.variante === b.variante))

/** Lit le contenu stocké : JSON illisible, version inconnue ou panier expiré donnent un panier vide. */
export function decoderStocke(brut: string | null, maintenant: number): LignePanier[] {
  if (!brut) return []
  try {
    const s = JSON.parse(brut) as Partial<Stocke>
    if (s.v !== 1 || typeof s.maj !== "number" || !Array.isArray(s.lignes)) return []
    if (maintenant - s.maj > DUREE_PANIER_MS) return []
    return fusionner(s.lignes.map(ligneValide).filter((l): l is LignePanier => l !== null))
  } catch {
    return []
  }
}

export function encoderStocke(lignes: LignePanier[], maintenant: number): string {
  const s: Stocke = { v: 1, maj: maintenant, lignes }
  return JSON.stringify(s)
}

/** Regroupe les doublons (même produit, même variante) et borne le nombre de lignes. */
export function fusionner(lignes: LignePanier[]): LignePanier[] {
  const out: LignePanier[] = []
  for (const l of lignes) {
    const deja = out.find((o) => memeLigne(o, l))
    if (deja) deja.quantite = Math.min(deja.quantite + l.quantite, QUANTITE_MAX)
    else if (out.length < LIGNES_MAX) out.push({ ...l })
  }
  return out
}

export function ajouter(lignes: LignePanier[], ligne: LignePanier): LignePanier[] {
  return fusionner([...lignes, ligne])
}

export function changerQuantite(lignes: LignePanier[], cible: LignePanier, q: number): LignePanier[] {
  if (q < 1) return retirer(lignes, cible)
  return lignes.map((l) => (memeLigne(l, cible) ? { ...l, quantite: Math.min(Math.floor(q), QUANTITE_MAX) } : l))
}

export function retirer(lignes: LignePanier[], cible: LignePanier): LignePanier[] {
  return lignes.filter((l) => !memeLigne(l, cible))
}

export function nombreArticles(lignes: LignePanier[]): number {
  return lignes.reduce((n, l) => n + l.quantite, 0)
}

export function cleLigne(l: LignePanier): string {
  return l.type === "kit" ? `kit:${l.slug}:${l.variante}` : `article:${l.slug}`
}

/**
 * Valeur du paramètre `panier` de https://boutique.trinexta.fr/commande, contrat `docs/boutique-panier.md`
 * (dépôt espace-client) : `a:<slug>:<quantité>` pour un article, `k:<slug>:<variante>:<quantité>` pour une
 * variante de kit, lignes séparées par des virgules, puis le tout en base64url sans `=` de remplissage.
 * Ni prix, ni nom, ni disponibilité : la boutique relit tout côté serveur.
 */
export function texteCommande(lignes: LignePanier[]): string {
  return lignes
    .map((l) => (l.type === "kit" ? `k:${l.slug}:${l.variante}:${l.quantite}` : `a:${l.slug}:${l.quantite}`))
    .join(",")
}

export function encoderPanier(lignes: LignePanier[]): string {
  // Texte en ASCII seul (slugs validés par SLUG, codes de variante, chiffres) : btoa suffit, côté serveur comme navigateur.
  return btoa(texteCommande(lignes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export function urlCommande(base: string, lignes: LignePanier[]): string {
  const u = new URL(base)
  u.searchParams.set("panier", encoderPanier(lignes))
  return u.toString()
}

// ── Accès au navigateur ─────────────────────────────────────────────────────────────────────────

export const EVENEMENT_PANIER = "trinexta:panier"

export function lirePanier(): LignePanier[] {
  if (typeof window === "undefined") return []
  try {
    const brut = window.localStorage.getItem(CLE_PANIER)
    const lignes = decoderStocke(brut, Date.now())
    // Panier expiré ou illisible : effacé, pas seulement ignoré.
    if (brut && lignes.length === 0) window.localStorage.removeItem(CLE_PANIER)
    return lignes
  } catch {
    return []
  }
}

export function ecrirePanier(lignes: LignePanier[]): void {
  try {
    if (lignes.length === 0) window.localStorage.removeItem(CLE_PANIER)
    else window.localStorage.setItem(CLE_PANIER, encoderStocke(lignes, Date.now()))
  } catch {
    // Stockage indisponible (navigation privée stricte, quota) : le panier n'est pas conservé.
  }
  window.dispatchEvent(new Event(EVENEMENT_PANIER))
}

// ── Affichage du panier ─────────────────────────────────────────────────────────────────────────

/** Ligne du panier complétée côté serveur avec les données publiques de l'API. */
export interface LigneDetaillee {
  cle: string
  ligne: LignePanier
  statut: "ok" | "introuvable" | "indisponible"
  nom: string
  /** Libellé de la variante d'un kit (« 16 Go · 1 écran »). */
  variante: string | null
  href: string
  /** Adresse absolue de la vignette (résolue côté serveur), ou null. */
  image: string | null
  categorie: CodeCategorie
  prix: Prix | null
  disponibilite: Disponibilite | null
}

export interface Totaux {
  ht: number
  ttc: number
  ecoHt: number
  ecoTtc: number
  /** Produits plus éco-participation. */
  totalHt: number
  totalTtc: number
}

/** Totaux indicatifs : prix unitaires de l'API multipliés par les quantités, lignes sans prix exclues. */
export function totaux(lignes: LigneDetaillee[]): Totaux {
  const t = { ht: 0, ttc: 0, ecoHt: 0, ecoTtc: 0 }
  for (const l of lignes) {
    if (l.statut !== "ok" || !l.prix) continue
    const q = l.ligne.quantite
    t.ht += l.prix.ht * q
    t.ttc += l.prix.ttc * q
    t.ecoHt += l.prix.ecoParticipationHt * q
    t.ecoTtc += l.prix.ecoParticipationTtc * q
  }
  return { ...t, totalHt: t.ht + t.ecoHt, totalTtc: t.ttc + t.ecoTtc }
}
