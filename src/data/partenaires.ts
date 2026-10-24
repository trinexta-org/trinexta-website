// Partenaires validés le 23/10/2026 : seuls ceux-ci peuvent apparaître dans le bandeau
// partenaires de l'accueil (logos gérés dans Sanity, type "editeur").
// NinjaOne est un outil utilisé, pas un partenaire affiché. Aucun opérateur télécom.
export const PARTENAIRES_VALIDES = [
  "SentinelOne",
  "ESET",
  "Plenit",
  "MCA Technology",
  "TD Synnex",
] as const

export const PARTENAIRES_INTRO =
  "TRINEXTA s'engage avec les meilleurs pour vous apporter les meilleures solutions, matériel comme logiciel."

/**
 * Partenaires validés, regroupés par domaine. Logo local s'il existe, sinon logo Sanity,
 * sinon nom en toutes lettres. Affichage fixe : pas de défilement.
 */
export const PARTENAIRES_GROUPES: {
  domaine: string
  partenaires: { nom: (typeof PARTENAIRES_VALIDES)[number]; logo?: string }[]
}[] = [
  { domaine: "Cybersécurité", partenaires: [{ nom: "SentinelOne" }, { nom: "ESET", logo: "/images/partenaires/eset.png" }] },
  { domaine: "Sauvegarde", partenaires: [{ nom: "Plenit" }] },
  {
    domaine: "Matériel",
    partenaires: [
      { nom: "MCA Technology", logo: "/images/partenaires/mca-technology.png" },
      { nom: "TD Synnex", logo: "/images/partenaires/td-synnex.png" },
    ],
  },
]

const normaliser = (nom: string) => nom.toLowerCase().replace(/[^a-z0-9]/g, "")

export const cleFournisseur = (nom: string) => normaliser(nom)

export function isPartenaireValide(nom: string | null | undefined): boolean {
  if (!nom) return false
  const cle = normaliser(nom)
  return PARTENAIRES_VALIDES.some((partenaire) => normaliser(partenaire) === cle)
}
