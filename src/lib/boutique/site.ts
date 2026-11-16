import { PRODUCTION_URL } from "@/lib/site"
import { CONTENU_CATEGORIES } from "@/data/boutique"
import type { CodeCategorie } from "./types"

/** Adresse absolue du site, pour les données structurées. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "")

export const ETAPE_ACCUEIL = { nom: "Accueil", url: "/" }
export const ETAPE_BOUTIQUE = { nom: "Boutique", url: "/boutique" }

export function etapeCategorie(code: CodeCategorie) {
  return { nom: CONTENU_CATEGORIES[code].titre, url: `/boutique/${code}` }
}
