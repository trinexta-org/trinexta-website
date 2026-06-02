import React from "react"

export interface LegalHero {
  title: string
  imageSrc: string
}

export interface LegalSection {
  title: string
  paragraphs: React.ReactNode[]
}

export interface LegalData {
  hero: LegalHero
  sections: LegalSection[]
}

export const mentionsLegalesData: LegalData = {
  hero: {
    title: "Mentions Légales",
    imageSrc: "/images/mentions-legales/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Informations légales",
      paragraphs: [
        "Trustech IT Support (marque Trinexta)",
        "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil‑Essonnes, France",
        "Bureau d’activité : 7 Rue Montespan, 91000 EVRY COURCOURONNES",
        "SIREN : 942 020 082 – SIRET : 942 020 082 00015",
        "TVA intracommunautaire : FR81 942 020 082",
        "Téléphone : 09 78 25 07 46",
        <span key="email">Email : <a href="mailto:contact@trinexta.com" className="text-secondary hover:underline transition-colors">contact@trinexta.com</a></span>,
      ],
    },
    {
      title: "Directeur de la publication",
      paragraphs: [
        "Le directeur de la publication est le président en exercice de la société Trustech IT Support.",
      ],
    },
    {
      title: "Conception et développement",
      paragraphs: [
        "Ce site est conçu et développé en interne par Trustech IT Support. Toute reproduction ou adaptation du design ou du code source sans autorisation écrite est interdite.",
      ],
    },
    {
      title: "Hébergement",
      paragraphs: [
        "OVH SAS",
        "2 rue Kellermann - 59100 Roubaix, France",
        "+33 9 72 10 10 07",
      ],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        "Le site trinexta.com ainsi que l’ensemble de ses contenus (textes, logos, marques, photographies, infographies) sont la propriété exclusive de Trustech IT Support. Toute reproduction ou représentation, totale ou partielle, sans autorisation expresse est prohibée.",
      ],
    },
    {
      title: "Responsabilité",
      paragraphs: [
        "Les informations publiées sur ce site sont fournies à titre indicatif et peuvent être mises à jour sans préavis. Trustech IT Support décline toute responsabilité en cas d’erreurs ou d’omissions. L’utilisateur est seul responsable de l’usage qu’il fait des informations présentées.",
      ],
    },
    {
      title: "Protection des données et confidentialité",
      paragraphs: [
        <span key="rgpd">
          Ce site est protégé par le service reCAPTCHA de Google ; votre utilisation est soumise à la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">politique de confidentialité de Google</a> et aux <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">conditions d’utilisation de Google</a>. Les données personnelles collectées sont traitées par Trustech IT Support pour répondre à vos demandes et assurer la gestion des services. Conformément au RGPD, vous pouvez exercer vos droits d’accès, de rectification, d’effacement et d’opposition en contactant <a href="mailto:contact@trinexta.com" className="text-secondary hover:underline transition-colors">contact@trinexta.com</a>.
        </span>,
      ],
    },
  ],
}