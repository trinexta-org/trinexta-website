import type { ServicePageProps } from "@/components/services/ServicePage";

export const infogeranceData: ServicePageProps = {
  serviceSlug: "infogerance",
  canonicalPath: "/infogerance",

  hero: {
    titlePart1: "Infogérance informatique",
    titlePart2: "pour TPE et PME à Évry et en Essonne",
    description:
      "Votre informatique fonctionne, votre entreprise avance. Depuis notre bureau d'Évry-Courcouronnes, TRINEXTA gère, maintient et sécurise le parc informatique des TPE et PME de l'agglomération Grand Paris Sud, de l'Essonne et d'Île-de-France, avec un technicien titulaire qui connaît votre entreprise.\n\nL'humain avant les tickets.",
    ctaText: "Demander un état des lieux de mon parc",
    ctaHref: "/contact#formulaire",
    secondaryCta: {
      text: "Voir les formules et les prix",
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
      "Un poste qui refuse de démarrer, une messagerie inaccessible, un logiciel métier bloqué : derrière chaque panne, des collaborateurs ralentis et parfois des clients qui attendent.\n\nPour une TPE ou une PME, un informaticien salarié n'est pas toujours justifié. L'infogérance permet de confier tout ou partie de cette gestion à un prestataire, dans un périmètre écrit.\n\nVous gardez la maîtrise de vos outils et de vos décisions ; nous prenons en charge leur gestion quotidienne.",
    painPoints: [
      "Pannes et lenteurs qui interrompent le travail des équipes",
      "Un salarié qui dépanne ses collègues au lieu de faire son métier",
      "Mises à jour et sauvegardes suivies sans méthode",
      "Aucune visibilité sur l'état du parc et les risques",
    ],
  },

  offer: {
    subtitle: "Ce que nous prenons en charge",
    transition: {
      line1: "Ce que nous",
      line2: "prenons en charge",
    },
    title: "Ce que comprend notre infogérance",
    description:
      "Le contenu exact dépend de la formule : le support des utilisateurs, la double authentification, la sensibilisation à l'hameçonnage et la réponse à incident cyber sont inclus dans Sérénité Complète ; avec Sérénité Essentiel, les alertes sont traitées par un technicien et l'assistance aux utilisateurs est sur devis.",
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
          "Suivi de chaque demande jusqu'à sa clôture",
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
          "Espace disque qui se réduit, mises à jour en échec, matériel instable : certains signes annoncent une panne. La maintenance préventive, réalisée avec NinjaOne, consiste à les repérer et à agir avant qu'ils n'arrêtent vos équipes. Elle est incluse dans Sérénité Essentiel et Sérénité Complète.",
        items: [
          "Supervision de l'état des postes : disque, mémoire, processeur, mises à jour",
          "Correctifs Windows et logiciels compatibles déployés à distance",
          "Inventaire du parc et alertes",
          "Recommandations de renouvellement",
          "En curatif : diagnostic à distance, réparation logicielle, intervention sur site si nécessaire",
          "Remplacement de pièces, matériel, serveurs et NAS chiffrés à part",
        ],
        note:
          "Elle réduit les interruptions évitables ; elle ne supprime pas tout risque de panne. Un poste ancien peut souvent être prolongé (mémoire, disque SSD, réinstallation propre) : nous le faisons quand c'est rentable et nous vous le disons quand ça ne l'est plus.",
        link: {
          text: "Exemple : modernisation du parc d'une PME en Essonne",
          href: "/cas-clients/modernisation-it-pme-essonne",
        },
      },
      {
        title: "Cybersécurité et protection des postes",
        intro:
          "Les TPE et PME sont aussi exposées à l'hameçonnage, aux logiciels malveillants et aux rançongiciels. Selon l'offre souscrite, nous intégrons la protection de vos postes à la gestion informatique.",
        items: [
          "Déploiement et administration de l'EDR SentinelOne",
          "Alertes de sécurité des postes couverts suivies par un technicien",
          "Gestion des correctifs de sécurité",
          "Sécurisation des accès professionnels",
          "Double authentification et sensibilisation à l'hameçonnage (Sérénité Complète)",
          "Réponse à incident cyber sur les postes et comptes couverts (Sérénité Complète)",
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
          "Avoir une sauvegarde ne suffit pas : il faut savoir ce qui est protégé, à quelle fréquence et comment restaurer. La sauvegarde est une option hors forfait, proposée après étude.",
        items: [
          "Identification des données critiques",
          "Solution proposée après étude de vos données et de votre activité",
          "Données hébergées en France",
          "Préparation de leur reprise en cas d'incident",
        ],
        note: "Option hors forfait Sérénité, chiffrée selon votre environnement.",
        link: {
          text: "Découvrir nos solutions Cloud et Sauvegarde",
          href: "/cloud-sauvegarde",
        },
      },
    ],
  },

  keyFacts: [
    {
      label: "Définition",
      value: "L'infogérance consiste à confier à un prestataire la gestion courante de votre informatique : postes, comptes utilisateurs, mises à jour, sécurité, fournisseurs.",
    },
    {
      label: "Pour qui",
      value: "Les TPE et PME d'Évry-Courcouronnes, de l'Essonne et d'Île-de-France, sous contrat facturé par poste et par mois.",
    },
    {
      label: "Interlocuteurs",
      value: "Un technicien titulaire pour le terrain ; les appels et incidents sont traités par l'équipe support, du lundi au vendredi de 8 h 30 à 19 h.",
    },
    {
      label: "Maintenance préventive",
      value: "Automatisée et incluse dans les deux formules Sérénité.",
    },
  ],

  formulas: {
    subtitle: "Une offre à votre taille",
    title: "Une infogérance adaptée à la taille de votre entreprise",
    items: [
      {
        badge: "Offre packagée",
        title: "TRINEXTA Sérénité",
        desc: "Supervision, maintenance préventive, protection des postes et, selon la formule, assistance aux utilisateurs. Deux formules facturées par poste et par mois.",
        points: [
          "Sérénité Essentiel : engagement de 12 mois, rapport annuel",
          "Sérénité Complète : sans durée minimale, préavis de 2 mois, rapport trimestriel",
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
    subtitle: "Changer de prestataire informatique",
    title: "Changer de prestataire informatique : une reprise préparée",
    description:
      "Une reprise préparée limite l'impact sur le travail de vos équipes. Prévenez votre prestataire actuel en respectant votre préavis ; nous coordonnons ensuite la suite avec lui quand c'est possible. Avant de résilier, vérifiez que vous seront remis les comptes administrateurs Microsoft 365 ou Google Workspace, les accès au nom de domaine, à la messagerie, au routeur, au pare-feu et au Wi-Fi, les licences et contrats éditeurs, l'emplacement des sauvegardes et l'inventaire du parc : ils appartiennent à votre entreprise. Le calendrier de reprise est établi après inventaire des accès, des équipements et des dépendances.",
    steps: [
      {
        title: "Comprendre votre environnement",
        desc: "Échange avec la direction ou votre référent sur les équipements, les applications essentielles et les difficultés.",
      },
      {
        title: "État des lieux, offert",
        desc: "Inventaire, versions des systèmes, accès administrateurs, protections et sauvegardes ; anomalies documentées et classées par priorité.",
      },
      {
        title: "Accès, documentation et outils",
        desc: "Récupération des accès, changement des mots de passe administrateurs, documentation centralisée, agents NinjaOne et SentinelOne sur les postes compatibles.",
      },
      {
        title: "Transition",
        desc: "Coordination avec votre ancien prestataire pendant son préavis quand c'est possible, puis présentation de votre technicien titulaire.",
      },
    ],
    cta: {
      text: "Préparer ma reprise de parc",
      href: "/contact#formulaire",
    },
  },

  localSeo: {
    subtitle: "Proximité en Essonne",
    title: "Infogérance à Évry-Courcouronnes et dans l'agglomération Grand Paris Sud",
    description:
      "Notre bureau est au 7 rue Montespan, à Évry-Courcouronnes. Interventions sur site dans toute l'Île-de-France. Déplacement sans frais pour les interventions programmées dans un rayon de 15 km autour d'Évry ; au-delà, déplacement facturé selon le devis. Le temps passé sur site reste facturé selon le contrat.\n\nPour les incidents du quotidien, notre [support informatique](/support-informatique) complète votre contrat d'infogérance.",
    items: [
      {
        title: "Communes couvertes",
        desc: "Évry-Courcouronnes, Corbeil-Essonnes, Ris-Orangis, Bondoufle, Lisses, Grigny et communes voisines, puis le reste de l'Essonne et de l'Île-de-France.",
      },
      {
        title: "À distance d'abord, sur site quand il le faut",
        desc: "La plupart des demandes, la supervision et les mises à jour se traitent à distance. Poste qui ne démarre plus, nouveau collaborateur, matériel à vérifier : votre technicien titulaire vient dans vos locaux.",
      },
      {
        title: "Des PME aux réalités différentes",
        desc: "Un cabinet comptable, un commerce ou une entreprise du bâtiment n'ont pas les mêmes contraintes. Nous adaptons l'accompagnement.",
      },
      {
        title: "Un technicien titulaire",
        desc: "Il connaît vos locaux, vos postes et vos collaborateurs ; les appels et incidents sont traités par l'équipe support, du lundi au vendredi de 8 h 30 à 19 h.",
      },
    ],
    ctaText: "Demander un état des lieux de mon parc",
    ctaHref: "/contact#formulaire",
  },

  benefits: {
    subtitle: "Votre contrat d'infogérance",
    transition: {
      line1: "Votre contrat",
      line2: "en clair",
    },
    title: "Votre contrat d'infogérance, en clair",
    items: [
      {
        title: "Facturation et durée",
        desc: "Par poste et par mois, prix détaillés sur la page Sérénité, sans frais de mise en service. Sérénité Complète sans durée minimale, préavis de 2 mois ; Sérénité Essentiel, engagement de 12 mois. Rapport annuel (Essentiel) ou trimestriel (Complète).",
      },
      {
        title: "Horaires et délais",
        desc: "Support humain du lundi au vendredi, de 8 h 30 à 19 h ; supervision automatisée en continu. Pour un incident critique signalé pendant les heures d'ouverture, notre objectif est une prise en charge sous 30 minutes : c'est le début du traitement, pas un délai de résolution. Le périmètre figure dans nos niveaux de service.",
      },
      {
        title: "Hors forfait",
        desc: "Licences, sauvegarde (option, données hébergées en France), serveurs, NAS, réseau, projets et matériel, sur devis. Environnements plus complexes (plusieurs sites, serveurs, applications spécifiques) : proposition établie après analyse.",
      },
      {
        title: "Sur site",
        desc: "Pas de frais de déplacement dans un rayon de 15 km autour d'Évry ; le temps passé sur site est facturé selon le contrat.",
      },
    ],
  },

  faq: [
    {
      question: "Qu'est-ce que l'infogérance informatique ?",
      answer:
        "C'est confier à un prestataire tout ou partie de la gestion de votre informatique : maintenance des postes, assistance aux utilisateurs, supervision, cybersécurité, administration de certains services. Le périmètre est fixé par le contrat.",
    },
    {
      question: "Quelle est la différence entre maintenance informatique et infogérance ?",
      answer:
        "La maintenance entretient et répare les équipements. L'infogérance organise dans la durée la gestion de votre environnement : support, supervision, maintenance, sécurité et conseil.",
    },
    {
      question: "Infogérance, contrat de maintenance, dépannage : que choisir ?",
      answer:
        "Le dépannage ponctuel intervient quand quelque chose casse, à l'intervention et sur devis : ce sont nos [interventions sur devis](/services-annexes). Le contrat de maintenance suit vos postes de façon planifiée, par poste et par mois : c'est Sérénité Essentiel. L'infogérance suit en continu votre parc et vos demandes, par poste et par mois : c'est Sérénité Complète.",
    },
    {
      question: "Combien coûte une prestation d'infogérance pour une PME ?",
      answer:
        "Le prix dépend du nombre de postes et du niveau de service. Nos deux formules sont facturées par poste et par mois ; leurs prix et ce qu'elles couvrent sont détaillés sur la page Sérénité. Pour un environnement spécifique, nous établissons une proposition.\n\n[Consulter les offres Sérénité](/serenite)",
    },
    {
      question: "Faut-il s'engager sur une durée minimale ?",
      answer:
        "Sérénité Complète est sans durée minimale, avec un préavis de 2 mois. Sérénité Essentiel demande un engagement de 12 mois.",
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
        "Oui. Votre technicien titulaire se déplace quand une intervention l'exige. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; le temps sur site est facturé selon votre contrat.",
    },
    {
      question: "Pouvez-vous reprendre un parc déjà géré par un autre prestataire ?",
      answer:
        "Oui. Nous étudions d'abord l'existant : équipements, services essentiels, accès administratifs et responsabilités de chaque intervenant. L'objectif est une reprise maîtrisée qui limite les perturbations.",
    },
    {
      question: "Et si l'ancien prestataire tarde à transmettre les accès ?",
      answer:
        "Recensez les comptes, licences, données et documents nécessaires, ainsi que les modalités de restitution prévues par votre contrat. Nous vous aidons à les faire valoir auprès des éditeurs, par exemple Microsoft ou l'organisme qui gère votre nom de domaine, quand c'est possible. Nous ne donnons pas de conseil juridique.",
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
      question: "Comment contacter TRINEXTA ?",
      answer:
        "Nos clients utilisent les canaux de support prévus à leur contrat. Pour une première demande, appelez le 09 78 25 07 46 ou écrivez à contact@trinexta.fr.",
    },
  ],

  cta: {
    line1: "Confiez votre",
    line2: "informatique à une",
    line3: "équipe proche",
    description:
      "Quelques postes ou un parc plus important : parlons de votre environnement, de vos difficultés et de vos priorités. Téléphone : 09 78 25 07 46, du lundi au vendredi, de 8 h 30 à 19 h.",
    buttonText: "Demander un état des lieux de mon parc",
    buttonHref: "/contact#formulaire",
  },

  schemaOverride: {
    name: "Infogérance et maintenance informatique",
    serviceType: "Infogérance informatique",
    areaServed: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Essonne", "Île-de-France"],
  },
};
