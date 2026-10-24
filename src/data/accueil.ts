// Contenus textuels de la page d'accueil (/). Aucun prix ici : les montants
// restent sur /serenite uniquement.

/** « En bref » : les faits qu'un moteur ou une IA doit pouvoir retenir sans interpréter. */
export const ACCUEIL_IDENTITE =
  "TRINEXTA est un prestataire d'infogérance et de support informatique pour les TPE et PME, basé à Évry-Courcouronnes (Essonne), qui intervient à distance et sur site dans toute l'Île-de-France."

export const ACCUEIL_FAITS: { label: string; valeur: string }[] = [
  { label: "Ce que nous faisons", valeur: "Assistance aux collaborateurs, maintenance et supervision des postes, cybersécurité, Microsoft 365, sauvegarde" },
  { label: "Pour qui", valeur: "Entreprises sans service informatique interne, de 1 à 20 postes et au-delà, sans minimum" },
  { label: "Formules", valeur: "Sérénité Essentiel et Sérénité Complète, facturées par poste et par mois" },
  { label: "Horaires", valeur: "Support humain du lundi au vendredi, de 8 h 30 à 19 h ; supervision automatisée en continu" },
  { label: "Zone", valeur: "Toute l'Île-de-France ; déplacement sans frais pour les interventions programmées à moins de 15 km d'Évry" },
]

export const ACCUEIL_ADRESSE = {
  lieu: "Le Magellan",
  rue: "7 rue Montespan",
  ville: "91000 Évry-Courcouronnes",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=7+rue+Montespan+91000+%C3%89vry-Courcouronnes",
  telephone: "09 78 25 07 46",
  telephoneHref: "tel:+33978250746",
  email: "contact@trinexta.fr",
} as const

/** Vidéo de présentation (fin refaite le 24/10/2026 : baseline, bouton et contacts mis en forme, comme la vidéo Studio). */
export const VIDEO_TRINEXTA = {
  src: "/videos/trinexta-presentation.mp4",
  poster: "/videos/trinexta-presentation-affiche.webp",
  titre: "TRINEXTA en 44 secondes",
  duree: "0:44",
}

export const VIDEO_TRINEXTA_JSONLD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "TRINEXTA : infogérance et support informatique des TPE et PME",
  description:
    "Présentation de TRINEXTA, prestataire d'infogérance, de support et de cybersécurité pour les TPE et PME, à Évry-Courcouronnes et en Île-de-France.",
  thumbnailUrl: "https://trinexta.fr/videos/trinexta-presentation-affiche.webp",
  contentUrl: "https://trinexta.fr/videos/trinexta-presentation.mp4",
  uploadDate: "2026-10-24",
  duration: "PT44S",
}

export const ACCUEIL_OFFRES = {
  title: "Deux formules selon ce que vous voulez déléguer",
  description:
    "Sérénité Essentiel protège et entretient vos postes : EDR SentinelOne, supervision NinjaOne, maintenance préventive automatisée, rapport annuel, engagement de 12 mois. Sérénité Complète y ajoute l'assistance de vos collaborateurs, Microsoft 365 au quotidien et un rapport trimestriel, sans durée minimale avec un préavis de 2 mois. Licences, sauvegarde, serveurs, NAS, réseau, projets et matériel sont chiffrés à part.",
  ctaLabel: "Voir les prix et comparer les formules",
  ctaHref: "/serenite",
} as const

export const ACCUEIL_FAQ: { question: string; answer: string }[] = [
  {
    question: "Combien coûte l'infogérance pour une PME ?",
    answer:
      "Nos formules sont facturées par poste et par mois. Les prix et ce qu'ils couvrent sont détaillés sur la page Sérénité. Licences, sauvegarde, serveurs et projets sont chiffrés à part.",
  },
  {
    question: "Êtes-vous joignables le soir et le week-end ?",
    answer:
      "Notre équipe répond du lundi au vendredi, de 8 h 30 à 19 h. La protection EDR et la supervision fonctionnent en continu de façon automatisée ; les alertes reçues hors horaires sont traitées par nos techniciens à la reprise du support.",
  },
  {
    question: "Intervenez-vous dans nos locaux ?",
    answer:
      "Oui, dans toute l'Île-de-France. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; au-delà, le déplacement est facturé selon le devis. Le temps passé sur site est facturé selon votre contrat.",
  },
  {
    question: "Faut-il s'engager sur une longue durée ?",
    answer:
      "Sérénité Complète est sans durée minimale, avec un préavis de 2 mois. Sérénité Essentiel demande un engagement de 12 mois.",
  },
]

export const ACCUEIL_CTA = {
  line1: "Parlons de",
  line2: "votre",
  line3: "informatique",
  description:
    "Un premier échange suffit pour savoir si nous pouvons vous aider, et avec quelle formule. Téléphone : 09 78 25 07 46, du lundi au vendredi, de 8 h 30 à 19 h.",
  ctaLabel: "Être rappelé",
  ctaHref: "/contact#formulaire",
} as const

// Note Google relevée le 23/10/2026 : à mettre à jour à chaque intégration.
export const GOOGLE_NOTE = { note: "5/5", avis: 12 } as const

// Avis Google non affichés : l'auteur y cite le nom d'une entreprise cliente.
export const AVIS_EXCLUS: readonly string[] = [
  "Ci9DQUlRQUNvZENodHljRjlvT21aM0xXdHZSamhqWWtaMVZVWnZiRXMxVVZSWlUzYxAB",
]

/** "julie R" -> "Julie R." ; "Eric Marchand" -> "Eric M." (prénom et initiale). */
export function formatAuteurAvis(nom: string): string {
  const [prenom, ...reste] = nom.trim().split(/\s+/)
  const p = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase()
  const initiale = reste.find((mot) => /^\p{L}/u.test(mot))?.charAt(0).toUpperCase()
  return initiale ? `${p} ${initiale}.` : p
}
