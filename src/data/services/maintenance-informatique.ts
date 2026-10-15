import type { ServicePageProps } from "@/components/services/ServicePage";

export const maintenanceInformatiqueData: ServicePageProps = {
  serviceSlug: "maintenance-informatique",
  canonicalPath: "/maintenance-informatique",
  imageSlug: "support-informatique",

  hero: {
    titlePart1: "Maintenance informatique",
    titlePart2: "pour TPE et PME à Évry et en Essonne",
    description:
      "Un poste qui rame, une mise à jour qui bloque, un disque qui fatigue : la plupart des pannes s'annoncent. TRINEXTA entretient, surveille et dépanne le parc informatique des TPE et PME depuis Évry-Courcouronnes, à distance et sur site.",
    ctaText: "Demander un contrat de maintenance",
    ctaHref: "/contact",
    secondaryCta: {
      text: "Voir l'offre Sérénité",
      href: "/serenite",
    },
  },

  problem: {
    subtitle: "Pourquoi un contrat de maintenance",
    transition: {
      line1: "Entretenir",
      line2: "plutôt que réparer",
    },
    title: "Une panne coûte plus cher que l'entretien qui l'aurait évitée",
    description:
      "Sans suivi, un parc informatique vieillit en silence : mises à jour en retard, disques qui saturent, antivirus expiré. Le jour où un poste lâche, toute l'équipe attend.\n\nLa maintenance informatique consiste à entretenir vos équipements avant qu'ils tombent en panne, puis à les remettre en état rapidement quand un incident survient. Un contrat fixe ce que nous surveillons, ce que nous corrigeons et comment nous intervenons.",
    painPoints: [
      "Des postes de plus en plus lents, sans cause identifiée",
      "Des mises à jour Windows reportées pendant des mois",
      "Un dépannage qui attend la bonne volonté d'un collègue",
      "Aucune idée de l'âge ni de l'état réel du matériel",
    ],
  },

  offer: {
    subtitle: "Nos prestations de maintenance",
    transition: {
      line1: "Ce que couvre",
      line2: "la maintenance",
    },
    title: "Maintenance préventive et curative de votre parc informatique",
    description:
      "Selon le contrat retenu, la maintenance associe surveillance continue, entretien planifié et dépannage.",
    details: [
      {
        title: "Maintenance préventive",
        intro:
          "Nous suivons l'état des postes couverts avec NinjaOne, notre outil de supervision et de gestion à distance, pour corriger les anomalies avant qu'elles bloquent vos équipes.",
        items: [
          "Suivi de l'espace disque, de la mémoire et du processeur",
          "Application des mises à jour Windows et des logiciels compatibles",
          "Détection des alertes système et des équipements qui se dégradent",
          "Déploiement à distance de correctifs validés",
          "Contrôle régulier des sauvegardes, selon le périmètre",
        ],
        note:
          "La maintenance préventive réduit les pannes évitables. Elle ne supprime pas tout risque d'incident.",
      },
      {
        title: "Maintenance curative et dépannage",
        intro:
          "Quand un incident survient, nous le diagnostiquons d'abord à distance. Si le problème est matériel ou demande une présence, nous organisons une intervention dans vos locaux.",
        items: [
          "Diagnostic et dépannage par prise en main à distance",
          "Résolution des incidents Windows et des applications courantes",
          "Intervention sur site en Essonne et en Île-de-France",
          "Remplacement de composants ou d'équipements défectueux",
          "Suivi de chaque demande jusqu'à sa résolution",
        ],
        link: {
          text: "Découvrir notre support informatique",
          href: "/support-informatique",
        },
      },
      {
        title: "Sécurité des postes",
        intro:
          "Un poste bien entretenu est aussi un poste mieux protégé. Selon l'offre, la maintenance inclut la protection des postes contre les logiciels malveillants.",
        items: [
          "Déploiement et suivi de l'EDR SentinelOne",
          "Application des correctifs de sécurité",
          "Renforcement de la configuration des postes",
          "Surveillance des alertes de sécurité sur les postes couverts",
        ],
        link: {
          text: "Découvrir nos solutions de cybersécurité",
          href: "/cybersecurite",
        },
      },
      {
        title: "Gestion et renouvellement du parc",
        intro:
          "Savoir quel poste remplacer, et quand, évite les achats dans l'urgence. Nous tenons l'inventaire de votre parc et vous conseillons sur son renouvellement.",
        items: [
          "Inventaire des postes et de leurs caractéristiques",
          "Repérage des équipements vieillissants",
          "Préparation et configuration des nouveaux postes",
          "Accompagnement des arrivées et départs de collaborateurs",
        ],
        link: {
          text: "Découvrir l'infogérance complète",
          href: "/infogerance",
        },
      },
    ],
  },

  formulas: {
    subtitle: "Contrat de maintenance",
    title: "Un contrat de maintenance informatique adapté à votre parc",
    items: [
      {
        badge: "Offre packagée",
        title: "TRINEXTA Sérénité",
        desc: "Supervision, maintenance préventive, protection des postes et, selon la formule, assistance aux utilisateurs. Deux formules par poste, dès 39,99 € HT/poste/mois.",
        points: [
          "Prestations et conditions précisées avant souscription",
          "Formule choisie selon votre nombre de collaborateurs",
          "Aucun frais de mise en service",
        ],
        cta: {
          text: "Comparer les offres TRINEXTA Sérénité",
          href: "/serenite",
        },
        highlighted: true,
      },
      {
        badge: "Sur mesure",
        title: "Parcs plus complexes",
        desc: "Serveurs, plusieurs sites, logiciels métier ou matériel spécifique : nous établissons un contrat de maintenance après étude de votre environnement.",
        points: [
          "Périmètre défini après état des lieux",
          "Maintenance des serveurs et du réseau",
          "Coordination avec vos éditeurs et fournisseurs",
        ],
        cta: {
          text: "Obtenir une proposition personnalisée",
          href: "/contact",
        },
      },
    ],
    note: "Les tarifs, prestations incluses et conditions d'engagement sont détaillés sur la page [de l'offre Sérénité](/serenite).",
  },

  process: {
    subtitle: "Démarrage",
    title: "Comment démarre un contrat de maintenance ?",
    steps: [
      {
        title: "Premier échange",
        desc: "Nous faisons le point avec vous sur votre parc, vos logiciels essentiels et les problèmes qui reviennent.",
      },
      {
        title: "État des lieux",
        desc: "Inventaire, versions des systèmes, protections et sauvegardes : les points faibles sont listés et classés par priorité.",
      },
      {
        title: "Mise en place",
        desc: "Nous installons les outils de supervision et de protection sur les postes couverts, puis remettons à niveau ce qui doit l'être.",
      },
      {
        title: "Suivi dans la durée",
        desc: "Surveillance, mises à jour et dépannage suivent le rythme prévu au contrat, avec un interlocuteur qui connaît votre parc.",
      },
    ],
    cta: {
      text: "Organiser un premier échange",
      href: "/contact",
    },
  },

  localSeo: {
    subtitle: "Proximité en Essonne",
    title: "Votre société de maintenance informatique à Évry-Courcouronnes",
    description:
      "TRINEXTA dispose d'un bureau au 7 rue Montespan, 91000 Évry-Courcouronnes. Nous assurons la maintenance informatique des TPE et PME de l'Essonne et d'Île-de-France.\n\nConsultez notre [zone d'intervention](/zone-intervention) pour le détail des communes couvertes.",
    items: [
      {
        title: "Communes couvertes",
        desc: "Évry-Courcouronnes, Corbeil-Essonnes, Ris-Orangis, Bondoufle, Lisses, Grigny et communes voisines, puis le reste de l'Essonne et de l'Île-de-France.",
      },
      {
        title: "À distance d'abord",
        desc: "La majorité des opérations de maintenance se fait à distance, sans interrompre le travail de vos équipes.",
      },
      {
        title: "Sur site quand il le faut",
        desc: "Panne matérielle, installation, remplacement d'équipement : nous intervenons dans vos locaux selon les modalités prévues au contrat.",
      },
      {
        title: "Un interlocuteur qui connaît votre parc",
        desc: "Vous parlez à quelqu'un qui sait quels postes vous utilisez et ce qui a déjà été fait.",
      },
    ],
    ctaText: "Demander un contrat de maintenance",
    ctaHref: "/contact",
  },

  benefits: {
    subtitle: "Pourquoi choisir TRINEXTA",
    transition: {
      line1: "Pourquoi",
      line2: "TRINEXTA",
    },
    title: "Pourquoi confier votre maintenance informatique à TRINEXTA ?",
    items: [
      {
        title: "Moins de pannes subies",
        desc: "La supervision repère les disques saturés, les mises à jour en échec et le matériel qui faiblit, avant que vos équipes s'en rendent compte.",
      },
      {
        title: "Un dépannage suivi",
        desc: "Chaque demande est suivie jusqu'à sa résolution. Vous savez où en est votre problème.",
      },
      {
        title: "Un contrat lisible",
        desc: "Ce qui est inclus, ce qui ne l'est pas et comment nous intervenons : tout est écrit avant le démarrage.",
      },
      {
        title: "L'humain avant les tickets",
        desc: "Vos collaborateurs expliquent leur problème avec leurs mots. Nous nous chargeons de la technique.",
      },
    ],
  },

  faq: [
    {
      question: "Qu'est-ce qu'un contrat de maintenance informatique ?",
      answer:
        "C'est un accord qui fixe l'entretien et le dépannage de votre parc informatique : quels équipements sont couverts, ce qui est surveillé, comment les incidents sont pris en charge et à quelles conditions.",
    },
    {
      question: "Quelle différence entre maintenance préventive et curative ?",
      answer:
        "La maintenance préventive entretient vos équipements pour éviter les pannes : mises à jour, surveillance, contrôles. La maintenance curative répare ce qui est tombé en panne. Un bon contrat associe les deux.",
    },
    {
      question: "Quelle différence entre maintenance informatique et infogérance ?",
      answer:
        "La maintenance porte sur l'entretien et la réparation des équipements. L'infogérance va plus loin : elle organise dans la durée la gestion de votre informatique, avec le support des utilisateurs, la sécurité et le conseil.\n\n[Découvrir l'infogérance](/infogerance)",
    },
    {
      question: "Combien coûte la maintenance informatique d'une PME ?",
      answer:
        "Le prix dépend du nombre de postes et des prestations incluses. Nos offres Sérénité démarrent à 39,99 € HT par poste et par mois. Pour un parc avec serveurs ou plusieurs sites, nous établissons une proposition après étude.\n\n[Consulter les offres Sérénité](/serenite)",
    },
    {
      question: "Intervenez-vous sur site ?",
      answer:
        "Oui, en Essonne et en Île-de-France. Les modalités et l'éventuelle facturation des déplacements dépendent de l'offre souscrite et de votre localisation.",
    },
    {
      question: "Pouvez-vous entretenir du matériel que vous n'avez pas fourni ?",
      answer:
        "Oui, si les équipements sont compatibles avec nos outils de supervision. L'état des lieux de départ permet d'identifier le matériel à remettre à niveau ou à remplacer.",
    },
    {
      question: "La maintenance couvre-t-elle les postes en télétravail ?",
      answer:
        "Oui. La supervision et la plupart des opérations de maintenance se font à distance, quel que soit l'endroit où se trouve le poste, dès lors qu'il est connecté à Internet.",
    },
  ],

  cta: {
    line1: "Un parc entretenu,",
    line2: "des équipes qui",
    line3: "travaillent",
    description:
      "Quelques postes ou un parc plus important : parlons de votre matériel, des pannes qui reviennent et de ce que vous attendez d'un contrat de maintenance.",
    buttonText: "Demander un contrat de maintenance",
    buttonHref: "/contact",
  },

  schemaOverride: {
    name: "Maintenance informatique pour TPE et PME à Évry et en Essonne",
    serviceType: "Maintenance informatique",
    areaServed: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Essonne", "Île-de-France"],
  },
};
