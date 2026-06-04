export interface LegalDoc {
  slug: string
  title: string
  description: string
  href: string
}

export const legalDocuments: LegalDoc[] = [
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    description: "Informations légales sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
    href: "/mentions-legales",
  },
  {
    slug: "cgv",
    title: "CGV / CGU",
    description: "Conditions générales de vente et d'utilisation des prestations et services TRINEXTA.",
    href: "/cgv",
  },
  {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    description: "Protection de vos données personnelles, droits RGPD et engagements de confidentialité.",
    href: "/confidentialite",
  },
  {
    slug: "cookies",
    title: "Gestion des cookies",
    description: "Utilisation des cookies et technologies similaires sur le site trinexta.fr.",
    href: "/cookies",
  },
  {
    slug: "accord-traitement-donnees",
    title: "Accord de traitement des données",
    description: "DPA - cadre contractuel RGPD régissant le traitement des données pour le compte des clients.",
    href: "/accord-traitement-donnees",
  },
  {
    slug: "niveau-de-service",
    title: "Niveaux de service",
    description: "SLA - engagements de disponibilité, délais d'intervention et niveaux de priorité du support.",
    href: "/niveau-de-service",
  },
  {
    slug: "charte-assistance",
    title: "Assistance cybersécurité",
    description: "Procédures d'urgence, conseils pratiques et ressources officielles en cas de cyberattaque.",
    href: "/charte-assistance",
  },
  {
    slug: "plan-reponse-incidents",
    title: "Plan de réponse aux incidents",
    description: "Méthodologie de détection, contention, investigation et remédiation des incidents de sécurité.",
    href: "/plan-reponse-incidents-securite",
  },
]
