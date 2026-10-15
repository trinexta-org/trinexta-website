import type { ServicePageProps } from "@/components/services/ServicePage";

export const infogeranceData: ServicePageProps = {
  serviceSlug: "infogerance",
  canonicalPath: "/infogerance",

  hero: {
    titlePart1: "Infogérance informatique",
    titlePart2: "pour TPE et PME en Essonne",
    description:
      "Votre informatique fonctionne. Votre entreprise avance. Basée à Évry-Courcouronnes, TRINEXTA gère, maintient et sécurise le parc informatique des TPE et PME de l'Essonne et d'Île-de-France, avec un interlocuteur qui connaît votre entreprise.\n\nL'humain avant les tickets.",
    ctaText: "Demander une étude de mon parc informatique",
    ctaHref: "/contact",
    secondaryCta: {
      text: "Découvrir l'offre Sérénité",
      href: "/serenite",
    },
  },

  problem: {
    subtitle: "Pourquoi externaliser votre informatique",
    transition: {
      line1: "Une informatique",
      line2: "qui ne freine plus",
    },
    title: "Votre informatique ne doit pas ralentir votre activité",
    description:
      "Un poste qui refuse de démarrer, une messagerie inaccessible, un logiciel métier bloqué : derrière chaque panne, des collaborateurs ralentis et parfois des clients qui attendent.\n\nPour une TPE ou une PME, un service informatique interne n'est pas toujours justifié. L'infogérance informatique permet d'externaliser tout ou partie de cette gestion auprès d'un prestataire spécialisé, dans un cadre de services défini avec vous.\n\nVous gardez la maîtrise de vos outils et de vos décisions. Nous prenons en charge leur gestion quotidienne.",
    painPoints: [
      "Pannes et lenteurs qui interrompent le travail des équipes",
      "Un salarié qui dépanne ses collègues au lieu de faire son métier",
      "Mises à jour et sauvegardes suivies sans méthode",
      "Aucune visibilité sur l'état du parc et les risques",
    ],
  },

  offer: {
    subtitle: "Nos services d'infogérance",
    transition: {
      line1: "Ce que nous",
      line2: "prenons en charge",
    },
    title: "Nos services d'infogérance informatique pour les entreprises",
    description:
      "Support, maintenance informatique d'entreprise, sécurité, gestion de parc informatique : chaque service s'intègre au périmètre défini avec vous.",
    details: [
      {
        title: "Support et assistance utilisateurs",
        intro:
          "Vos collaborateurs doivent pouvoir travailler sans devenir techniciens. Selon votre contrat, nous prenons en charge les incidents du quotidien et suivons chaque demande jusqu'à sa résolution.",
        items: [
          "Assistance par téléphone, e-mail et prise en main à distance",
          "Diagnostic des incidents Windows et applications courantes",
          "Installation et configuration des logiciels professionnels",
          "Préparation du poste des nouveaux collaborateurs",
          "Suivi des demandes jusqu'à résolution ou transmission",
          "Coordination avec les éditeurs de logiciels, selon le périmètre",
        ],
        link: {
          text: "Découvrir notre support informatique",
          href: "/support-informatique",
        },
      },
      {
        title: "Supervision et maintenance préventive",
        intro:
          "Une informatique bien entretenue demande moins d'interventions d'urgence. Nous suivons l'état des équipements couverts avec NinjaOne, notre outil professionnel de supervision et de gestion à distance.",
        items: [
          "Surveillance des indicateurs de santé des postes",
          "Détection des alertes et anomalies système",
          "Suivi des mises à jour Windows et logiciels compatibles",
          "Contrôle de la mémoire, du processeur et du stockage",
          "Repérage des équipements qui se dégradent",
          "Déploiement à distance de correctifs validés",
        ],
        note:
          "La supervision permet de repérer certaines anomalies en amont. Elle réduit les interruptions évitables, sans supprimer tout risque de panne.",
      },
      {
        title: "Cybersécurité et protection des postes",
        intro:
          "Les TPE et PME sont aussi exposées à l'hameçonnage, aux logiciels malveillants et aux rançongiciels. Selon l'offre souscrite, nous intégrons la protection de vos postes à la gestion informatique.",
        items: [
          "Déploiement et administration de l'EDR SentinelOne",
          "Surveillance des alertes de sécurité des postes couverts",
          "Gestion des correctifs de sécurité",
          "Renforcement de la configuration des postes",
          "Sécurisation des accès professionnels",
          "Suivi des incidents de sécurité dans le périmètre prévu",
        ],
        link: {
          text: "Découvrir nos solutions de cybersécurité",
          href: "/cybersecurite",
        },
      },
      {
        title: "Gestion du parc informatique",
        intro:
          "Combien d'ordinateurs, quelles licences actives, quels équipements à remplacer ? Une bonne gestion de parc informatique commence par un inventaire fiable, qui facilite vos arbitrages budgétaires.",
        items: [
          "Inventaire des ordinateurs et de leurs caractéristiques",
          "Suivi des systèmes et logiciels installés",
          "Identification des équipements vieillissants",
          "Préparation et configuration des nouveaux postes",
          "Accompagnement des arrivées et départs",
          "Conseil sur le renouvellement du matériel",
        ],
      },
      {
        title: "Microsoft 365 et messagerie",
        intro:
          "Exchange Online, Teams, OneDrive, SharePoint : un défaut de configuration peut perturber la collaboration et exposer des données. Nous administrons et sécurisons votre environnement Microsoft 365.",
        items: [
          "Création, modification et suppression des comptes",
          "Attribution et suivi des licences",
          "Configuration des messageries professionnelles",
          "Mise en place de l'authentification multifacteur",
          "Gestion des accès et autorisations",
          "Gestion des appareils avec Microsoft Intune, selon le besoin",
        ],
        note: "Ces prestations sont intégrées ou proposées en complément selon les services retenus.",
        link: {
          text: "Découvrir notre accompagnement Microsoft 365",
          href: "/microsoft-365",
        },
      },
      {
        title: "Sauvegarde et continuité",
        intro:
          "Avoir une sauvegarde ne suffit pas : il faut savoir ce qui est protégé, à quelle fréquence et comment restaurer. Nous évaluons, mettons en place et suivons votre stratégie de sauvegarde.",
        items: [
          "Identification des données critiques",
          "Choix des solutions adaptées",
          "Définition des objectifs de restauration",
          "Contrôles réguliers des sauvegardes",
        ],
        note: "Capacité et modalités de restauration sont définies selon votre environnement et votre contrat.",
        link: {
          text: "Découvrir nos solutions Cloud et Sauvegarde",
          href: "/cloud-sauvegarde",
        },
      },
    ],
  },

  formulas: {
    subtitle: "Une offre à votre taille",
    title: "Une infogérance adaptée à la taille de votre entreprise",
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
        title: "Environnements plus complexes",
        desc: "Plusieurs sites, serveurs, applications spécifiques ou contraintes métier : nous étudions un accompagnement personnalisé.",
        points: [
          "Gestion du parc et administration des systèmes",
          "Coordination de vos prestataires",
          "Cybersécurité et pilotage informatique",
          "Périmètre défini après analyse de vos besoins",
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
    subtitle: "Reprise de votre parc",
    title: "Comment se déroule la reprise de votre parc informatique ?",
    description:
      "Changer de prestataire ou démarrer une première infogérance demande de la méthode. Nous organisons la transition progressivement, selon vos contraintes.",
    steps: [
      {
        title: "Comprendre votre environnement",
        desc: "Nous échangeons avec votre direction ou votre référent pour identifier équipements, applications essentielles et difficultés.",
      },
      {
        title: "Réaliser l'état des lieux",
        desc: "Inventaire, versions des systèmes, accès administratifs, protections et sauvegardes : les anomalies sont documentées et priorisées.",
      },
      {
        title: "Déployer et organiser la transition",
        desc: "Après validation, nous déployons les outils de gestion et de sécurité, puis fixons canaux de support et interlocuteurs.",
      },
      {
        title: "Assurer le suivi",
        desc: "Supervision, maintenance, assistance et suivi des actions : la stabilité de votre environnement progresse, avec plus de visibilité.",
      },
    ],
    cta: {
      text: "Organiser un premier échange avec TRINEXTA",
      href: "/contact",
    },
  },

  localSeo: {
    subtitle: "Proximité en Essonne",
    title: "Votre prestataire informatique à Évry-Courcouronnes",
    description:
      "TRINEXTA dispose d'un bureau au 7 rue Montespan, 91000 Évry-Courcouronnes, au cœur de l'Essonne. Nous accompagnons les entreprises du Grand Paris Sud et, plus largement, l'infogérance en Île-de-France.\n\nPour les incidents du quotidien, notre [support informatique](/support-informatique) complète votre contrat d'infogérance.",
    items: [
      {
        title: "Communes couvertes",
        desc: "Évry-Courcouronnes, Corbeil-Essonnes, Ris-Orangis, Bondoufle, Lisses, Grigny et communes voisines, puis le reste de l'Essonne et de l'Île-de-France.",
      },
      {
        title: "À distance et sur site",
        desc: "L'essentiel du support et de la supervision se fait à distance. Les déplacements sont organisés selon les besoins et le contrat.",
      },
      {
        title: "Des PME aux réalités différentes",
        desc: "Un cabinet comptable, un commerce ou une entreprise du bâtiment n'ont pas les mêmes contraintes. Nous adaptons l'accompagnement.",
      },
      {
        title: "Un interlocuteur proche",
        desc: "La proximité facilite les échanges avec les dirigeants et la préparation des interventions sur site.",
      },
    ],
    ctaText: "Demander une étude de mon parc",
    ctaHref: "/contact",
  },

  benefits: {
    subtitle: "Pourquoi choisir TRINEXTA",
    transition: {
      line1: "Pourquoi",
      line2: "TRINEXTA",
    },
    title: "Pourquoi choisir TRINEXTA pour votre infogérance ?",
    items: [
      {
        title: "Un accompagnement humain",
        desc: "Des échanges directs, des explications compréhensibles et un suivi clair. Vos collaborateurs expliquent leur problème sans vocabulaire technique. L'humain avant les tickets guide notre relation client.",
      },
      {
        title: "Une approche préventive",
        desc: "Grâce à la supervision et au suivi du parc, nous identifions les anomalies récurrentes, anticipons la maintenance et vous conseillons sur les améliorations utiles.",
      },
      {
        title: "Des responsabilités claires",
        desc: "Prestations incluses, demandes hors contrat, modalités de support et d'engagement : chaque élément est compréhensible avant le démarrage.",
      },
      {
        title: "Un partenaire qui suit votre évolution",
        desc: "Recrutements, renouvellement du parc, Microsoft 365, sécurité : nous vous accompagnons quand vos besoins changent.",
      },
    ],
  },

  faq: [
    {
      question: "Qu'est-ce que l'infogérance informatique ?",
      answer:
        "C'est confier à un prestataire externe tout ou partie de la gestion de votre système informatique : maintenance des postes, assistance aux utilisateurs, supervision, cybersécurité, administration de certains services. Le périmètre dépend du contrat et de vos besoins.",
    },
    {
      question: "Quelle est la différence entre maintenance informatique et infogérance ?",
      answer:
        "La maintenance vise surtout à entretenir et réparer des équipements. L'infogérance organise dans la durée la gestion de votre environnement informatique, en associant support, supervision, maintenance, sécurité et conseil.",
    },
    {
      question: "Combien coûte une prestation d'infogérance pour une PME ?",
      answer:
        "Le tarif dépend du nombre de postes, des services inclus, du niveau de support et de la complexité de l'environnement. Les tarifs et prestations de nos offres standardisées sont détaillés sur notre page Sérénité. Pour un environnement spécifique, nous établissons une proposition personnalisée.\n\n[Consulter les offres Sérénité](/serenite)",
    },
    {
      question: "Faut-il s'engager sur une durée minimale ?",
      answer:
        "Cela dépend de l'offre et des prestations choisies : certaines formules prévoient une durée minimale, d'autres non. Durée, renouvellement et résiliation sont communiqués avant la signature.",
    },
    {
      question: "L'infogérance est-elle adaptée à une entreprise de moins de 10 salariés ?",
      answer:
        "Oui. Une petite entreprise a besoin d'un support fiable et d'une protection adaptée, même sans service informatique interne. Nous adaptons le niveau de service à votre organisation.",
    },
    {
      question: "Pouvez-vous intervenir sur des ordinateurs en télétravail ?",
      answer:
        "Oui, si les équipements sont compatibles avec nos outils de gestion et disposent des accès nécessaires. Une grande partie du support, de la supervision et de la maintenance se fait à distance.",
    },
    {
      question: "Intervenez-vous directement dans les locaux des entreprises ?",
      answer:
        "Oui, nous organisons des interventions sur site en Essonne et en Île-de-France. Leur disponibilité, leur facturation éventuelle et leurs modalités dépendent de l'offre souscrite et de votre localisation.",
    },
    {
      question: "Pouvez-vous reprendre un parc déjà géré par un autre prestataire ?",
      answer:
        "Oui. Nous étudions d'abord l'existant : équipements, services essentiels, accès administratifs et responsabilités de chaque intervenant. L'objectif est une reprise maîtrisée qui limite les perturbations.",
    },
    {
      question: "Est-ce que TRINEXTA peut gérer Microsoft 365 ?",
      answer:
        "Oui. Nous administrons et sécurisons Microsoft 365 : comptes utilisateurs, licences, messagerie et accès. Les prestations précises dépendent du périmètre convenu.",
    },
    {
      question: "Mes données restent-elles la propriété de mon entreprise ?",
      answer:
        "Oui. Faire appel à un prestataire ne transfère pas la propriété de vos données. Les accès et opérations techniques sont encadrés contractuellement, avec des règles de confidentialité adaptées.",
    },
    {
      question: "Comment contacter le support informatique TRINEXTA ?",
      answer:
        "Nos clients contactent le support par les canaux définis dans leur contrat. Pour une première demande commerciale, appelez le 09 78 25 07 46 ou écrivez à contact@trinexta.fr.",
    },
  ],

  cta: {
    line1: "Confiez votre",
    line2: "informatique à un",
    line3: "partenaire proche",
    description:
      "Quelques postes ou un parc plus important : échangeons sur votre environnement, vos difficultés et vos priorités pour définir une solution adaptée. L'humain avant les tickets.",
    buttonText: "Demander une étude de mon parc",
    buttonHref: "/contact",
  },

  schemaOverride: {
    name: "Infogérance informatique pour TPE et PME en Essonne",
    serviceType: "Infogérance informatique",
    areaServed: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Essonne", "Île-de-France"],
  },
};
