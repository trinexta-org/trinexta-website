// Menu principal de trinexta.fr (menu desktop et menu mobile).
// Règle du gabarit : une page entre dans le menu le jour de sa mise en ligne, jamais avant.
// La création de sites n'y figure pas : elle vit sur trinexta-studio.fr (lien dans le pied de page).

export interface SubMenuItem {
  label: string
  href: string
  disabled?: boolean
}

export interface MenuItem {
  label: string
  href: string
  subMenu?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  { label: "Offre Sérénité", href: "/serenite" },
  {
    label: "Services",
    href: "/infogerance",
    subMenu: [
      { label: "Infogérance", href: "/infogerance" },
      { label: "Support informatique", href: "/support-informatique" },
      { label: "Cybersécurité", href: "/cybersecurite" },
      { label: "Sauvegarde", href: "/cloud-sauvegarde" },
      { label: "Microsoft 365", href: "/microsoft-365" },
      { label: "Téléphonie et réseau", href: "/solutions-metier" },
      { label: "Interventions sur devis", href: "/services-annexes" },
      { label: "Technicien en régie", href: "/technicien-sous-regie" },
    ],
  },
  { label: "Cas clients", href: "/cas-clients" },
  {
    label: "Ressources",
    href: "/blog",
    subMenu: [
      { label: "Blog", href: "/blog" },
      { label: "Ordinateur ou compte piraté", href: "/charte-assistance" },
      { label: "Niveaux de service", href: "/niveau-de-service" },
      { label: "Plan de réponse aux incidents", href: "/plan-reponse-incidents-securite" },
    ],
  },
  {
    label: "À propos",
    href: "/a-propos",
    subMenu: [
      { label: "Qui sommes-nous", href: "/a-propos" },
      { label: "Nous rejoindre", href: "/nous-rejoindre" },
    ],
  },
  { label: "Contact", href: "/contact" },
]
