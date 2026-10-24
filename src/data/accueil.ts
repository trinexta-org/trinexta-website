// Contenus textuels de la page d'accueil (/). Aucun prix ici : les montants
// restent sur /serenite uniquement.

export const ACCUEIL_EN_BREF =
  "TRINEXTA est un prestataire d'infogérance et de support informatique pour TPE et PME, basé au 7 rue Montespan à Évry-Courcouronnes (Essonne). Deux formules facturées par poste et par mois : Sérénité Essentiel (protection EDR, supervision, maintenance préventive automatisée) et Sérénité Complète (Essentiel plus l'assistance aux utilisateurs pour les demandes couvertes par le contrat). Support humain du lundi au vendredi, de 8 h 30 à 19 h ; supervision automatisée en continu. Formules sans minimum de postes, pour les entreprises de 1 à 20 postes et au-delà. Interventions sur site dans toute l'Île-de-France, sans frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry."

export const ACCUEIL_CHAPEAU =
  "TRINEXTA prend en charge l'informatique des entreprises qui n'ont pas de service informatique interne : assistance à vos collaborateurs, maintenance de vos postes, protection contre les cyberattaques. Depuis notre bureau d'Évry-Courcouronnes, avec un technicien titulaire qui connaît votre entreprise."

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
