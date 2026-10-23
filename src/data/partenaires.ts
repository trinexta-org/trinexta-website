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

const normaliser = (nom: string) => nom.toLowerCase().replace(/[^a-z0-9]/g, "")

export function isPartenaireValide(nom: string | null | undefined): boolean {
  if (!nom) return false
  const cle = normaliser(nom)
  return PARTENAIRES_VALIDES.some((partenaire) => normaliser(partenaire) === cle)
}
