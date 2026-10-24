// Page Contact TRINEXTA (infogérance, support, cybersécurité) : coordonnées, choix du
// formulaire et suite donnée à une demande. Même principe que le formulaire Studio,
// appliqué à l'informatique des entreprises : court, adapté à la situation du visiteur.
// Règle : aucun délai de réponse chiffré tant qu'il n'est pas validé.

export const TRINEXTA_CONTACT = {
  email: "contact@trinexta.fr",
  telephone: "09 78 25 07 46",
  telephoneHref: "tel:+33978250746",
  horaires: "du lundi au vendredi, de 8 h 30 à 19 h",
  lieu: "Le Magellan",
  rue: "7 rue Montespan",
  ville: "91000 Évry-Courcouronnes",
} as const

/** Qui écrit : le nom de l'entreprise n'est demandé que si elle existe. */
export const PROFILS = [
  { value: "entreprise", label: "Une entreprise" },
  { value: "independant", label: "Un indépendant ou une profession libérale" },
  { value: "creation", label: "Une entreprise en création" },
] as const
export type Profil = (typeof PROFILS)[number]["value"]
export const PROFIL_VALUES = PROFILS.map((p) => p.value) as [Profil, ...Profil[]]

/** Objet de la demande : informatique de l'entreprise uniquement (les sites web sont sur trinexta-studio.fr). */
export const BESOINS = [
  { value: "infogerance", label: "Confier mon informatique (Sérénité)" },
  { value: "support", label: "Un problème informatique à régler" },
  { value: "cyber", label: "Sécurité ou suspicion de piratage" },
  { value: "intervention", label: "Une intervention ponctuelle" },
  { value: "regie", label: "Un technicien en régie" },
  { value: "autre", label: "Autre demande" },
] as const
export type Besoin = (typeof BESOINS)[number]["value"]
export const BESOIN_VALUES = BESOINS.map((b) => b.value) as [Besoin, ...Besoin[]]

/** Anciens liens `?type=` conservés : ils pré-sélectionnent le besoin équivalent. */
export const TYPE_HERITE: Record<string, Besoin> = {
  devis: "infogerance",
  support: "support",
  autre: "autre",
}

/** Taille du parc, facultative : elle oriente la formule, rien de plus. */
export const POSTES = [
  { value: "1-5", label: "1 à 5" },
  { value: "6-20", label: "6 à 20" },
  { value: "21-50", label: "21 à 50" },
  { value: "50+", label: "Plus de 50" },
] as const
export type Postes = (typeof POSTES)[number]["value"]
export const POSTES_VALUES = POSTES.map((p) => p.value) as [Postes, ...Postes[]]

export function postesPourNombre(n: number): Postes {
  if (n <= 5) return "1-5"
  if (n <= 20) return "6-20"
  if (n <= 50) return "21-50"
  return "50+"
}

/** Suite souhaitée : rappel (par défaut, c'est le bouton « Être rappelé »), rendez-vous ou simple message. */
export const SUITES_CONTACT = [
  { value: "rappel", label: "Être rappelé" },
  { value: "rdv", label: "Prendre rendez-vous" },
  { value: "message", label: "Envoyer un message" },
] as const
export type SuiteContact = (typeof SUITES_CONTACT)[number]["value"]
export const SUITE_VALUES = SUITES_CONTACT.map((s) => s.value) as [SuiteContact, ...SuiteContact[]]

export const MOMENTS = [
  { value: "matin", label: "Matin" },
  { value: "apres-midi", label: "Après-midi" },
] as const
export type Moment = (typeof MOMENTS)[number]["value"]
export const MOMENT_VALUES = MOMENTS.map((m) => m.value) as [Moment, ...Moment[]]

export const RDV_FORMATS = [
  { value: "visio", label: "En visio" },
  { value: "sur-site", label: "Dans vos locaux" },
  { value: "magellan", label: "Au Magellan, Évry" },
] as const
export type RdvFormat = (typeof RDV_FORMATS)[number]["value"]
export const RDV_FORMAT_VALUES = RDV_FORMATS.map((f) => f.value) as [RdvFormat, ...RdvFormat[]]

/** Fenêtre de prise de rendez-vous, en jours à partir d'aujourd'hui. */
export const RDV_FENETRE_JOURS = 60

function libelle(liste: readonly { value: string; label: string }[], value?: string | null): string {
  if (!value) return ""
  return liste.find((x) => x.value === value)?.label ?? value
}

export const libelleBesoin = (value?: string | null) => libelle(BESOINS, value)
export const libelleProfil = (value?: string | null) => libelle(PROFILS, value)
export const libellePostes = (value?: string | null) => (value ? `${libelle(POSTES, value)} postes` : "")
export const libelleMoment = (value?: string | null) => libelle(MOMENTS, value)
export const libelleFormat = (value?: string | null) => libelle(RDV_FORMATS, value)
export const libelleSuite = (value?: string | null) => libelle(SUITES_CONTACT, value)
