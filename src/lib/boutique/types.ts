// Types de l'API publique de la boutique (espace client, contrat `docs/api-boutique.md`, ADR EC-0007).
// Ils reprennent le contrat champ par champ : rien de ce qui n'y figure pas n'est supposé.
// Montants : entiers en centimes d'euro.

export const CODES_CATEGORIE = [
  "poste",
  "portable",
  "ecran",
  "peripherique",
  "accessoire",
  "telephonie",
  "reseau",
  "impression",
  "licence",
  "logiciel",
  "kit",
  "autre",
] as const
export type CodeCategorie = (typeof CODES_CATEGORIE)[number]

export function estCodeCategorie(v: string): v is CodeCategorie {
  return (CODES_CATEGORIE as readonly string[]).includes(v)
}

export type Disponibilite = "en stock" | "sur commande"

export interface Prix {
  devise: "EUR"
  tauxTva: number
  ht: number
  ttc: number
  barreHt: number | null
  barreTtc: number | null
  promotion: string | null
  ecoParticipationHt: number
  ecoParticipationTtc: number
}

export interface ImageArticle {
  miniature: string
  moyenne: string
  grande: string
}

export interface Categorie {
  code: CodeCategorie
  libelle: string
}

export interface Marque {
  code: string
  libelle: string
}

export interface ArticleResume {
  slug: string
  nom: string
  marque: Marque | null
  categorie: Categorie
  prix: Prix
  disponibilite: Disponibilite
  image: ImageArticle | null
  miseAJour: string
}

export interface Caracteristique {
  groupe: string
  nom: string
  valeur: string
}

export interface Article extends ArticleResume {
  referenceFabricant: string | null
  ean: string | null
  description: string | null
  presentation: string | null
  caracteristiques: Caracteristique[]
  images: ImageArticle[]
  lies: ArticleResume[]
}

export interface Pagination {
  page: number
  parPage: number
  total: number
  pages: number
}

export interface Facettes {
  categories: (Categorie & { nombre: number })[]
  marques: (Marque & { nombre: number })[]
  prix: { minHt: number; maxHt: number; minTtc: number; maxTtc: number } | null
}

export interface ReponseCatalogue {
  articles: ArticleResume[]
  pagination: Pagination
  facettes: Facettes
}

export type CodeVariante = "16go-1ecran" | "16go-2ecrans" | "32go-1ecran" | "32go-2ecrans" | "unique"

export interface VarianteKit {
  code: CodeVariante
  libelle: string
  memoireGo: number | null
  ecrans: number | null
  nom: string
  prix: Prix
  valeur: { ht: number; ttc: number }
  remisePourcent: number
  disponibilite: Disponibilite
}

export interface LigneKit {
  nom: string
  quantite: number
  offert: boolean
  categorie: Categorie
  slug: string
  image: ImageArticle | null
}

export interface KitResume {
  slug: string
  nom: string
  description: string | null
  aPartirDe: { ht: number; ttc: number }
  miseAJour: string
  variantes: VarianteKit[]
}

export interface Kit extends Omit<KitResume, "variantes"> {
  variantes: (VarianteKit & { composition: LigneKit[] })[]
  aide: {
    memoire: { titre: string; texte: string }[]
    ecrans: string
  } | null
}

export interface ReponseKits {
  kits: KitResume[]
}

export interface ReponsePlan {
  articles: { slug: string; miseAJour: string }[]
  kits: { slug: string; miseAJour: string }[]
}

export const TRIS = ["prix", "-prix", "nouveautes"] as const
export type Tri = (typeof TRIS)[number]

/** Critères de `/catalogue`, tels que validés côté site avant l'appel. */
export interface CriteresCatalogue {
  categorie?: CodeCategorie
  marque?: string
  prixMin?: number
  prixMax?: number
  q?: string
  tri?: Tri
  page?: number
  parPage?: number
}
