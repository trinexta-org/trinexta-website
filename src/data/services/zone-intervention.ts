import type { ServicePageProps } from "@/components/services/ServicePage";

export const zoneInterventionData: ServicePageProps = {
  serviceSlug: "zone-intervention",
  canonicalPath: "/zone-intervention",
  imageSlug: "infogerance",

  hero: {
    titlePart1: "Prestataire informatique",
    titlePart2: "en Essonne et en Île-de-France",
    description:
      "Notre bureau est au 7 rue Montespan, à Évry-Courcouronnes. De là, nous accompagnons les TPE et PME de l'Essonne et d'Île-de-France : à distance pour l'essentiel, dans vos locaux quand c'est nécessaire.",
    ctaText: "Vérifier que nous couvrons votre commune",
    ctaHref: "/contact",
    secondaryCta: {
      text: "Découvrir l'infogérance",
      href: "/infogerance",
    },
  },

  problem: {
    subtitle: "Pourquoi un prestataire proche",
    transition: {
      line1: "Un prestataire",
      line2: "à portée de main",
    },
    title: "Certaines pannes ne se règlent pas à distance",
    description:
      "Un serveur qui ne redémarre plus, un poste à remplacer, un réseau à recâbler : il faut alors quelqu'un dans vos locaux. Un prestataire basé à l'autre bout de la France vous fera attendre.\n\nInstallés à Évry-Courcouronnes, nous connaissons le tissu économique de l'Essonne : zones d'activité, cabinets, commerces, entreprises du bâtiment. Nous organisons nos interventions sur site en fonction de la géographie de nos clients.",
    painPoints: [
      "Un prestataire injoignable ou trop éloigné pour se déplacer",
      "Des interventions sur site qui se décident au dernier moment",
      "Un interlocuteur qui change à chaque demande",
    ],
  },

  offer: {
    subtitle: "Communes et secteurs couverts",
    transition: {
      line1: "Où nous",
      line2: "intervenons",
    },
    title: "Notre zone d'intervention informatique",
    description:
      "Le support et la supervision fonctionnent partout à distance. Les modalités des interventions sur site dépendent de votre contrat et de votre localisation.",
    details: [
      {
        title: "Évry-Courcouronnes et Grand Paris Sud",
        intro:
          "Notre secteur de proximité immédiate, autour de notre bureau d'Évry-Courcouronnes.",
        items: [
          "Évry-Courcouronnes",
          "Corbeil-Essonnes",
          "Ris-Orangis",
          "Bondoufle",
          "Lisses",
          "Grigny",
          "Villabé",
          "Saint-Germain-lès-Corbeil",
          "Saint-Pierre-du-Perray",
        ],
        link: {
          text: "Infogérance à Évry et en Essonne",
          href: "/infogerance",
        },
      },
      {
        title: "Nord Essonne",
        intro:
          "Le nord du département, de la vallée de l'Orge au plateau de Saclay.",
        items: [
          "Massy",
          "Palaiseau",
          "Les Ulis",
          "Longjumeau",
          "Savigny-sur-Orge",
          "Viry-Châtillon",
          "Juvisy-sur-Orge",
          "Athis-Mons",
          "Draveil",
          "Vigneux-sur-Seine",
        ],
        link: {
          text: "Support informatique pour TPE et PME",
          href: "/support-informatique",
        },
      },
      {
        title: "Val d'Yerres et sud Essonne",
        intro:
          "L'est et le sud du département, jusqu'à Étampes.",
        items: [
          "Brunoy",
          "Yerres",
          "Montgeron",
          "Mennecy",
          "Brétigny-sur-Orge",
          "Arpajon",
          "Étampes",
        ],
        link: {
          text: "Maintenance informatique pour PME",
          href: "/maintenance-informatique",
        },
      },
      {
        title: "Reste de l'Île-de-France",
        intro:
          "Nous accompagnons aussi des entreprises dans les autres départements franciliens, dont Tikehau Capital et Sofidy : plus de 800 utilisateurs, avec un support de proximité et un helpdesk.",
        items: [
          "Paris",
          "Hauts-de-Seine",
          "Val-de-Marne",
          "Seine-Saint-Denis",
          "Seine-et-Marne",
          "Yvelines",
          "Val-d'Oise",
        ],
        note: "Les modalités des interventions sur site hors Essonne sont précisées avant la signature.",
        link: {
          text: "Technicien informatique en régie",
          href: "/technicien-sous-regie",
        },
      },
    ],
  },

  process: {
    subtitle: "Organisation",
    title: "Comment s'organise une intervention ?",
    steps: [
      {
        title: "Vous nous contactez",
        desc: "Par les canaux prévus dans votre contrat. Vous décrivez le problème avec vos mots.",
      },
      {
        title: "Diagnostic à distance",
        desc: "Nous prenons la main sur le poste concerné. La plupart des incidents se règlent à cette étape.",
      },
      {
        title: "Déplacement si nécessaire",
        desc: "Panne matérielle, installation ou câblage : nous planifions une intervention dans vos locaux.",
      },
      {
        title: "Suivi jusqu'à résolution",
        desc: "La demande reste ouverte jusqu'à ce que le problème soit réglé, et vous savez où elle en est.",
      },
    ],
    cta: {
      text: "Parler de votre besoin",
      href: "/contact",
    },
  },

  localSeo: {
    subtitle: "Nous trouver",
    title: "Un bureau à Évry-Courcouronnes",
    description:
      "TRINEXTA, 7 rue Montespan, 91000 Évry-Courcouronnes. Téléphone : 09 78 25 07 46.\n\nPour une première demande, écrivez-nous via la page [contact](/contact).",
    items: [
      {
        title: "Infogérance",
        desc: "Gestion complète de votre informatique : support, supervision, sécurité et conseil.",
      },
      {
        title: "Maintenance informatique",
        desc: "Entretien préventif et dépannage de votre parc, à distance et sur site.",
      },
      {
        title: "Cybersécurité",
        desc: "Protection des postes avec l'EDR SentinelOne et réponse aux incidents de sécurité.",
      },
      {
        title: "Technicien en régie",
        desc: "Un technicien support ou réseau intégré à votre équipe, pour une durée définie.",
      },
    ],
    ctaText: "Nous contacter",
    ctaHref: "/contact",
  },

  benefits: {
    subtitle: "Pourquoi un prestataire local",
    transition: {
      line1: "La proximité",
      line2: "au quotidien",
    },
    title: "Ce que change un prestataire informatique proche de chez vous",
    items: [
      {
        title: "Des déplacements mieux organisés",
        desc: "Notre activité est centrée sur l'Essonne et l'Île-de-France. Les interventions sur site se planifient sans traverser la France.",
      },
      {
        title: "Un interlocuteur que vous connaissez",
        desc: "Vous parlez à des personnes qui connaissent votre entreprise, votre parc et votre historique.",
      },
      {
        title: "Un état des lieux dans vos locaux",
        desc: "Au démarrage, l'état des lieux de votre parc peut se faire sur place, avec vos équipes.",
      },
      {
        title: "L'humain avant les tickets",
        desc: "Une demande n'est pas un numéro de ticket. C'est un collaborateur bloqué qu'il faut aider.",
      },
    ],
  },

  faq: [
    {
      question: "Intervenez-vous dans toute l'Essonne ?",
      answer:
        "Oui. Notre bureau est à Évry-Courcouronnes et nous accompagnons des entreprises dans tout le département. Les modalités des interventions sur site dépendent de votre contrat et de votre localisation.",
    },
    {
      question: "Intervenez-vous à Paris et dans le reste de l'Île-de-France ?",
      answer:
        "Oui. Le support et la supervision se font à distance, partout. Les interventions sur site hors Essonne sont organisées selon les besoins et précisées avant la signature.",
    },
    {
      question: "Ma commune n'apparaît pas dans la liste, pouvez-vous intervenir ?",
      answer:
        "Les communes listées ne sont que des exemples. Contactez-nous en indiquant votre adresse : nous vous dirons comment nous pouvons vous accompagner.\n\n[Nous contacter](/contact)",
    },
    {
      question: "Faut-il être proche pour bénéficier du support à distance ?",
      answer:
        "Non. Le support à distance fonctionne quelle que soit la localisation du poste, y compris en télétravail. La proximité compte surtout pour les interventions dans vos locaux.",
    },
    {
      question: "L'état des lieux peut-il se faire dans nos locaux ?",
      answer:
        "Oui. Un état des lieux de votre parc fait partie du démarrage de nos accompagnements. Il peut se faire dans vos locaux.",
    },
  ],

  cta: {
    line1: "Un prestataire",
    line2: "informatique",
    line3: "près de chez vous",
    description:
      "Dites-nous où se trouve votre entreprise et ce dont vous avez besoin. Nous vous répondons avec une proposition adaptée.",
    buttonText: "Nous contacter",
    buttonHref: "/contact",
  },

  schemaOverride: {
    name: "Prestataire informatique pour TPE et PME en Essonne et en Île-de-France",
    serviceType: "Services informatiques aux entreprises",
    areaServed: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Ris-Orangis",
      "Massy",
      "Palaiseau",
      "Brunoy",
      "Étampes",
      "Essonne",
      "Île-de-France",
    ],
  },
};
