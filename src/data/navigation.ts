// Menu principal de trinexta.fr (menu desktop et menu mobile).
// Règle du gabarit : une page entre dans le menu le jour de sa mise en ligne, jamais avant.
// Une entrée avec sous-menu n'est pas un lien : elle ouvre le sous-menu (desktop et mobile).
// La création de sites n'y figure pas : elle vit sur trinexta-studio.fr (pied de page).

import { DIAGNOSTIC_LIEN } from "@/data/diagnostic"

export interface SubMenuItem {
  label: string
  href: string
  /** Une ligne pour aider à choisir, affichée sous le libellé (desktop). */
  desc?: string
  disabled?: boolean
}

export interface SubMenuGroup {
  titre: string
  items: SubMenuItem[]
}

export interface MenuItem {
  label: string
  /** Lien direct, pour une entrée sans sous-menu. */
  href?: string
  groups?: SubMenuGroup[]
}

export const menuItems: MenuItem[] = [
  { label: "Offre Sérénité", href: "/serenite" },
  {
    label: "Services",
    groups: [
      {
        titre: "Au quotidien",
        items: [
          { label: "Infogérance", href: "/infogerance", desc: "Votre informatique suivie et maintenue" },
          { label: "Support informatique", href: "/support-informatique", desc: "Une équipe qui répond à vos collaborateurs" },
          { label: "Cybersécurité", href: "/cybersecurite", desc: "Protection des postes et des comptes" },
          { label: "Sauvegarde", href: "/cloud-sauvegarde", desc: "Vos données copiées, en France" },
          { label: "Microsoft 365", href: "/microsoft-365", desc: "Migration, sécurité, comptes et licences" },
          { label: "Téléphonie et réseau", href: "/solutions-metier", desc: "Réseau, Wi-Fi et téléphonie" },
        ],
      },
      {
        titre: "À la demande",
        items: [
          { label: "Interventions sur devis", href: "/services-annexes", desc: "Dépannage, Windows 11, déménagement" },
          { label: "Technicien en régie", href: "/technicien-sous-regie", desc: "Un renfort dans votre équipe, avec Talentero" },
        ],
      },
    ],
  },
  { label: "Cas clients", href: "/cas-clients" },
  {
    label: "Ressources",
    groups: [
      {
        titre: "En cas de problème",
        items: [
          { label: "Ordinateur ou compte piraté", href: "/charte-assistance", desc: "Les premiers gestes" },
          { label: "Plan de réponse aux incidents", href: "/plan-reponse-incidents-securite", desc: "Nos 8 étapes" },
          { label: "Niveaux de service", href: "/niveau-de-service", desc: "Horaires et priorités" },
        ],
      },
      {
        titre: "S'informer",
        items: [
          { label: DIAGNOSTIC_LIEN.name, href: DIAGNOSTIC_LIEN.href, desc: "Votre site analysé en 30 secondes" },
          { label: "Blog", href: "/blog", desc: "Conseils pour les TPE et PME" },
        ],
      },
    ],
  },
  {
    label: "À propos",
    groups: [
      {
        titre: "TRINEXTA",
        items: [
          { label: "Qui sommes-nous", href: "/a-propos", desc: "L'équipe et notre façon de travailler" },
          { label: "Nous rejoindre", href: "/nous-rejoindre", desc: "Rejoindre l'équipe" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
]

/** Tous les liens d'une entrée (pour l'état actif). */
export function liensDe(item: MenuItem): string[] {
  return item.href ? [item.href] : (item.groups ?? []).flatMap((g) => g.items.map((i) => i.href))
}
