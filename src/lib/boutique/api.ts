import type {
  Article,
  CriteresCatalogue,
  Kit,
  ReponseCatalogue,
  ReponseKits,
  ReponsePlan,
} from "./types"
import { simulation } from "./simulation"
import { baseApi, CHEMIN_API } from "./constantes"
import { isIndexable } from "@/lib/site"

// Client de l'API publique de la boutique (espace client, ADR EC-0007, contrat `docs/api-boutique.md`).
// Appels côté serveur uniquement : la limite de débit (300 requêtes par minute et par IP) est partagée
// par toutes les pages rendues par ce serveur, d'où le cache de 300 s obligatoire.

export const DELAI_MS = 8000
export const REVALIDATE_S = 300

/**
 * Réponses simulées : seulement hors production (staging, local), et seulement si
 * `BOUTIQUE_SIMULATION=1`. Jamais sur trinexta.fr, même par erreur de variable.
 */
export function simulationActive(): boolean {
  return process.env.BOUTIQUE_SIMULATION === "1" && !isIndexable
}

export type Resultat<T> = { ok: true; data: T } | { ok: false; raison: "introuvable" | "indisponible" }

type Fetch = (url: string, init: RequestInit & { next?: { revalidate?: number } }) => Promise<Response>

export interface OptionsClient {
  base?: string
  fetch?: Fetch
  delaiMs?: number
  simuler?: boolean
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugValide(slug: string): boolean {
  return slug.length <= 200 && SLUG.test(slug)
}

export function parametresCatalogue(c: CriteresCatalogue): URLSearchParams {
  const p = new URLSearchParams()
  if (c.categorie) p.set("categorie", c.categorie)
  if (c.marque) p.set("marque", c.marque)
  if (c.prixMin !== undefined) p.set("prixMin", String(c.prixMin))
  if (c.prixMax !== undefined) p.set("prixMax", String(c.prixMax))
  if (c.q) p.set("q", c.q)
  if (c.tri) p.set("tri", c.tri)
  if (c.page && c.page > 1) p.set("page", String(c.page))
  if (c.parPage) p.set("parPage", String(c.parPage))
  return p
}

export function creerClient(options: OptionsClient = {}) {
  const base = (options.base ?? baseApi()).replace(/\/+$/, "")
  const fetcher: Fetch = options.fetch ?? ((url, init) => fetch(url, init))
  const delaiMs = options.delaiMs ?? DELAI_MS
  const simuler = options.simuler ?? simulationActive()

  async function lire<T>(chemin: string, params?: URLSearchParams): Promise<Resultat<T>> {
    const qs = params && params.toString() ? `?${params.toString()}` : ""
    const url = `${base}${CHEMIN_API}${chemin}${qs}`
    try {
      const res = await fetcher(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: REVALIDATE_S },
        signal: AbortSignal.timeout(delaiMs),
      })
      if (res.status === 404) return { ok: false, raison: "introuvable" }
      if (!res.ok) {
        console.error("[boutique] réponse de l'API", res.status, chemin)
        return { ok: false, raison: "indisponible" }
      }
      return { ok: true, data: (await res.json()) as T }
    } catch (error) {
      console.error("[boutique] API injoignable", chemin, error instanceof Error ? error.name : "erreur")
      return { ok: false, raison: "indisponible" }
    }
  }

  return {
    catalogue(criteres: CriteresCatalogue = {}): Promise<Resultat<ReponseCatalogue>> {
      if (simuler) return Promise.resolve({ ok: true, data: simulation.catalogue(criteres) })
      return lire<ReponseCatalogue>("/catalogue", parametresCatalogue(criteres))
    },
    article(slug: string): Promise<Resultat<Article>> {
      if (!slugValide(slug)) return Promise.resolve({ ok: false, raison: "introuvable" })
      if (simuler) return Promise.resolve(simulation.article(slug))
      return lire<Article>(`/articles/${encodeURIComponent(slug)}`)
    },
    kits(): Promise<Resultat<ReponseKits>> {
      if (simuler) return Promise.resolve({ ok: true, data: simulation.kits() })
      return lire<ReponseKits>("/kits")
    },
    kit(slug: string): Promise<Resultat<Kit>> {
      if (!slugValide(slug)) return Promise.resolve({ ok: false, raison: "introuvable" })
      if (simuler) return Promise.resolve(simulation.kit(slug))
      return lire<Kit>(`/kits/${encodeURIComponent(slug)}`)
    },
    plan(): Promise<Resultat<ReponsePlan>> {
      if (simuler) return Promise.resolve({ ok: true, data: simulation.plan() })
      return lire<ReponsePlan>("/plan")
    },
  }
}

export type ClientBoutique = ReturnType<typeof creerClient>

/** Client par défaut des pages. */
export function boutique(): ClientBoutique {
  return creerClient()
}
