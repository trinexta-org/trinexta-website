// Pied de page de trinexta.fr : source unique des colonnes et des coordonnées.
// Les autres activités et produits de TRINEXTA y sont regroupés (« Les marques TRINEXTA »).

import { DIAGNOSTIC_LIEN } from "@/data/diagnostic"

export interface LienPied {
  name: string
  href: string
  desc?: string
}

export const PIED_SERVICES: LienPied[] = [
  { name: "Offre Sérénité", href: "/serenite" },
  { name: "Infogérance", href: "/infogerance" },
  { name: "Support informatique", href: "/support-informatique" },
  { name: "Cybersécurité", href: "/cybersecurite" },
  { name: "Sauvegarde", href: "/cloud-sauvegarde" },
  { name: "Microsoft 365", href: "/microsoft-365" },
  { name: "Téléphonie et réseau", href: "/solutions-metier" },
  { name: "Interventions sur devis", href: "/services-annexes" },
  { name: "Technicien en régie", href: "/technicien-sous-regie" },
]

export const PIED_RESSOURCES: LienPied[] = [
  { name: DIAGNOSTIC_LIEN.name, href: DIAGNOSTIC_LIEN.href },
  { name: "Ordinateur ou compte piraté", href: "/charte-assistance" },
  { name: "Plan de réponse aux incidents", href: "/plan-reponse-incidents-securite" },
  { name: "Niveaux de service", href: "/niveau-de-service" },
  { name: "Cas clients", href: "/cas-clients" },
  { name: "Blog", href: "/blog" },
  { name: "Qui sommes-nous", href: "/a-propos" },
  { name: "Nous rejoindre", href: "/nous-rejoindre" },
  { name: "Contact", href: "/contact" },
]

/** Autres activités et produits de TRINEXTA (sites externes). */
export const PIED_MARQUES: LienPied[] = [
  { name: "TRINEXTA Studio", href: "https://trinexta-studio.fr", desc: "Sites internet et applications web" },
  { name: "Talentero", href: "https://talentero.fr", desc: "Techniciens informatiques en régie" },
  { name: "LeadSynch", href: "https://leadsynch.com", desc: "CRM et prospection commerciale" },
]

export const PIED_LEGAL: LienPied[] = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Confidentialité", href: "/confidentialite" },
  { name: "Cookies", href: "/cookies" },
  { name: "Tous les documents", href: "/informations-juridiques" },
  { name: "Plan du site", href: "/plan-du-site" },
]

export const PIED_CONTACT = {
  telephone: "09 78 25 07 46",
  telephoneHref: "tel:+33978250746",
  email: "contact@trinexta.fr",
  horaires: "Du lundi au vendredi, 8 h 30-19 h",
  bureau: "7 rue Montespan, 91000 Évry-Courcouronnes",
  siege: "74 B boulevard Henri Dunant, 91100 Corbeil-Essonnes",
}
