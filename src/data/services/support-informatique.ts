import type { ServicePageProps } from "@/components/services/ServicePage";

export const supportInformatiqueData: ServicePageProps = {
  serviceSlug: "support-informatique",
  canonicalPath: "/support-informatique",

  hero: {
    titlePart1: "Support informatique",
    titlePart2: "pour TPE et PME à Évry-Courcouronnes",
    description:
      "Ordinateur bloqué, messagerie inaccessible, logiciel qui ne répond plus : vos collaborateurs ont besoin d'une solution, pas d'un parcours du combattant.\n\nTRINEXTA accompagne les TPE et PME d'Évry-Courcouronnes, de l'Essonne et d'Île-de-France avec un support informatique humain et structuré, du premier appel au suivi de l'incident.",
    ctaText: "Demander un accompagnement informatique",
    ctaHref: "/contact",
    secondaryCta: {
      text: "Découvrir nos offres Sérénité",
      href: "/serenite",
    },
  },

  problem: {
    subtitle: "Le quotidien des TPE et PME",
    title: "Vos équipes doivent travailler, pas résoudre des pannes",
    transition: {
      line1: "Ce qui ralentit",
      line2: "vos équipes",
    },
    description:
      "Dans beaucoup de PME, les incidents informatiques retombent sur un salarié qui s'y connaît un peu, mais dont ce n'est pas le métier. Ça tient pour les problèmes simples, beaucoup moins quand l'équipe grandit ou que les pannes se répètent.\n\nAvec un support externalisé, vos collaborateurs ont un point de contact pour signaler leurs difficultés. TRINEXTA traite les demandes du périmètre convenu, documente chaque intervention et explique simplement ce qui a été fait.\n\nVous cherchez une gestion complète de votre système (supervision, maintenance, sécurité du parc) ? C'est le rôle de notre [infogérance informatique](/infogerance).",
    painPoints: [
      "Un collaborateur bloqué sans messagerie pendant une matinée.",
      "Un logiciel métier qui plante sans qu'on sache pourquoi.",
      "Des pannes qui reviennent faute d'historique.",
      "Le salarié « qui s'y connaît » détourné de son vrai travail.",
    ],
  },

  offer: {
    subtitle: "Les incidents que nous prenons en charge",
    title: "Quels problèmes notre support informatique peut-il résoudre ?",
    transition: {
      line1: "Notre",
      line2: "assistance",
    },
    description:
      "Pas besoin de recruter un technicien à temps plein pour quelques dizaines de collaborateurs. TRINEXTA intervient comme support externalisé ou en renfort de votre équipe informatique existante.",
    details: [
      {
        title: "Dépannage des postes de travail",
        intro:
          "Un poste Windows qui ne démarre plus, un ralentissement inhabituel, une application qui se bloque : nos techniciens diagnostiquent l'incident et cherchent l'action adaptée.",
        items: [
          "Lenteurs et blocages Windows",
          "Problèmes logiciels courants",
          "Installation et configuration d'applications",
          "Périphériques, imprimantes et scanners",
          "Accès aux ressources de l'entreprise",
          "Préparation ou remplacement d'un poste",
        ],
        note: "Défaillance matérielle suspectée ? Nous vous aidons à identifier les vérifications utiles et la prise en charge possible par le constructeur.",
      },
      {
        title: "Microsoft 365, Outlook et Teams",
        intro:
          "La messagerie et les outils collaboratifs sont au centre du travail quotidien. Nous accompagnons vos utilisateurs quand leur environnement Microsoft 365 leur résiste.",
        items: [
          "Connexion à Outlook",
          "Configuration de la messagerie professionnelle",
          "Difficultés d'authentification",
          "Accès à Microsoft Teams",
          "Synchronisation OneDrive",
          "Autorisations SharePoint",
        ],
        note: "Les opérations d'administration avancée sont réalisées selon les droits accordés et le périmètre contractuel.",
        link: {
          text: "Accompagnement Microsoft 365 pour entreprises",
          href: "/microsoft-365",
        },
      },
      {
        title: "Logiciels métier et éditeurs",
        intro:
          "Comptabilité, ERP, facturation, gestion commerciale : quand l'outil dysfonctionne, la cause peut venir du poste, du réseau, de la configuration ou de l'application elle-même.",
        items: [
          "Analyse de l'origine probable de l'incident",
          "Vérification du poste, des accès et de la configuration",
          "Coordination technique avec l'éditeur selon votre contrat",
          "Suivi des échanges jusqu'à la clôture",
        ],
        note: "Vous gardez un seul interlocuteur entre vos utilisateurs, votre infrastructure et vos prestataires logiciels.",
      },
      {
        title: "Réseau et ressources partagées",
        intro:
          "Connexion instable, dossier partagé inaccessible, imprimante réseau muette : ces incidents touchent souvent plusieurs collaborateurs à la fois.",
        items: [
          "Premiers diagnostics réseau",
          "Dépannage des connexions locales",
          "Analyse des accès aux dossiers partagés",
          "Coordination avec les intervenants de l'infrastructure",
        ],
        note: "Le périmètre d'intervention réseau dépend de la formule souscrite.",
      },
    ],
  },

  process: {
    subtitle: "Comment nous contacter",
    title: "Un traitement structuré de chaque incident",
    description:
      "Selon votre contrat, vos collaborateurs nous joignent par téléphone, par e-mail ou via notre système de ticketing. Notre standard répond au 09 78 25 07 46, du lundi au vendredi de 8 h 30 à 19 h.",
    steps: [
      {
        title: "Réception et qualification",
        desc: "Nous enregistrons la demande et les informations utiles au diagnostic.",
      },
      {
        title: "Analyse de l'urgence",
        desc: "Nous évaluons l'impact sur votre activité pour prioriser.",
      },
      {
        title: "Diagnostic technique",
        desc: "Nous identifions l'origine probable du problème.",
      },
      {
        title: "Intervention",
        desc: "À distance, ou organisation d'une action complémentaire si nécessaire.",
      },
      {
        title: "Suivi jusqu'à la clôture",
        desc: "Le dossier reste ouvert jusqu'à sa résolution ou sa transmission au bon intervenant.",
      },
      {
        title: "Documentation",
        desc: "Nous conservons les informations utiles pour les prochains incidents.",
      },
    ],
    cta: {
      text: "Échanger sur les besoins de mon entreprise",
      href: "/contact",
    },
  },

  formulas: {
    subtitle: "Récurrent ou ponctuel",
    title: "Support illimité ou assistance ponctuelle : quelle solution choisir ?",
    items: [
      {
        badge: "Sérénité Complète",
        title: "Support récurrent",
        desc: "Un accompagnement régulier de vos collaborateurs, avec un périmètre défini au contrat.",
        points: [
          "Support utilisateurs illimité pour les demandes couvertes",
          "Assistance par téléphone, e-mail et prise en main à distance",
          "Suivi des demandes et rapport mensuel",
          "79 € HT par poste et par mois, sans engagement de durée",
        ],
        cta: {
          text: "Découvrir les offres TRINEXTA Sérénité",
          href: "/serenite",
        },
        highlighted: true,
      },
      {
        badge: "Sur demande",
        title: "Intervention ponctuelle",
        desc: "Un besoin technique précis, sans externaliser toute votre informatique.",
        points: [
          "Étude de la demande et de sa faisabilité",
          "Périmètre et conditions précisés dans un devis",
          "Intervention à distance ou sur site selon le besoin",
        ],
        cta: {
          text: "Demander un devis d'intervention informatique",
          href: "/contact",
        },
      },
    ],
    note: "Le caractère illimité concerne les demandes couvertes par la formule souscrite. Exclusions, horaires et modalités sont précisés au contrat.",
  },

  localSeo: {
    subtitle: "Ancrage local",
    title: "Votre prestataire de support informatique en Essonne",
    description:
      "TRINEXTA dispose d'un bureau au 7 rue Montespan, 91000 Évry-Courcouronnes. La plupart des incidents se traitent à distance avec des outils sécurisés, y compris pour vos collaborateurs en télétravail.\n\nQuand une présence physique est nécessaire, nous organisons une intervention dans vos locaux. Délai, déplacement et facturation éventuelle dépendent de votre offre.",
    items: [
      {
        title: "Zone d'intervention",
        desc: "Évry-Courcouronnes, Corbeil-Essonnes, Ris-Orangis, Lisses, Bondoufle et communes voisines. Le reste de l'Île-de-France à distance.",
      },
      {
        title: "Dépannage à distance",
        desc: "Diagnostic avec l'utilisateur, opérations autorisées et vérification du résultat, sans déplacement.",
      },
      {
        title: "Intervention sur site",
        desc: "Remplacement ou vérification d'un équipement, incident matériel, problème impossible à traiter à distance.",
      },
      {
        title: "Secteurs accompagnés",
        desc: "PME de services, cabinets comptables, BTP et bureaux d'études, commerces, entreprises multi-sites.",
      },
    ],
    ctaText: "Parler de mon entreprise",
    ctaHref: "/contact",
  },

  benefits: {
    subtitle: "La différence TRINEXTA",
    title: "Un support qui connaît votre environnement",
    transition: {
      line1: "Pourquoi",
      line2: "TRINEXTA",
    },
    items: [
      {
        title: "L'historique de vos incidents",
        desc: "Chaque demande est documentée. Nous retrouvons les actions passées, repérons les incidents récurrents et orientons mieux les prochains diagnostics.",
      },
      {
        title: "Un coordinateur entre vos prestataires",
        desc: "Fournisseur d'accès, éditeur, opérateur, constructeur : quand un incident implique plusieurs intervenants, nous aidons à trouver le bon interlocuteur et suivons les actions.",
      },
      {
        title: "L'humain avant les tickets",
        desc: "Un utilisateur n'est pas un numéro de ticket. Nous privilégions des explications compréhensibles et la connaissance de votre contexte.",
      },
      {
        title: "À distance et sur site",
        desc: "La plupart des demandes se traitent à distance. Pour le reste, nous nous déplaçons en Essonne et en Île-de-France selon les modalités convenues.",
      },
    ],
  },

  faq: [
    {
      question: "Quelle est la différence entre support informatique et infogérance ?",
      answer:
        "Le support accompagne vos utilisateurs et résout leurs incidents du quotidien. L'[infogérance](/infogerance) couvre une gestion plus large et continue : maintenance, supervision, sécurité et suivi du parc.",
    },
    {
      question: "Le support informatique TRINEXTA est-il illimité ?",
      answer:
        "Certaines offres, comme [Sérénité Complète](/serenite), prévoient un support illimité pour les demandes couvertes par le contrat. Exclusions, horaires, équipements et modalités sont précisés dans la formule souscrite.",
    },
    {
      question: "Intervenez-vous sur les ordinateurs des télétravailleurs ?",
      answer:
        "Oui, s'ils font partie du périmètre couvert et que les conditions techniques d'accès sont réunies. De nombreux problèmes logiciels et de configuration se traitent à distance.",
    },
    {
      question: "Pouvez-vous intervenir sur un logiciel de comptabilité ou de facturation ?",
      answer:
        "Nous analysons les problèmes liés au poste, aux accès, à la configuration et à l'environnement informatique. Si l'incident relève de l'éditeur, nous assurons la coordination selon les conditions prévues.",
    },
    {
      question: "Peut-on vous solliciter sans contrat d'infogérance ?",
      answer:
        "Oui, une intervention ponctuelle peut être étudiée selon la demande et nos disponibilités. Elle fait l'objet d'un devis.",
    },
    {
      question: "Quels sont les horaires du support ?",
      answer:
        "Les horaires et modalités de prise en charge sont précisés dans votre contrat. Pour une première demande, notre standard répond au 09 78 25 07 46, du lundi au vendredi de 8 h 30 à 19 h.",
    },
    {
      question: "Proposez-vous un support informatique sur site en Essonne ?",
      answer:
        "Oui. Des interventions sur site peuvent être organisées en Essonne et en Île-de-France, selon la nature de l'incident et les modalités convenues.",
    },
    {
      question: "Comment mettre en place le support TRINEXTA ?",
      answer:
        "Nous échangeons d'abord sur le nombre de collaborateurs, les équipements, les logiciels essentiels et les difficultés rencontrées. Nous vous orientons ensuite vers une [formule Sérénité](/serenite) ou une prestation adaptée.",
    },
  ],

  cta: {
    line1: "Vos collaborateurs",
    line2: "méritent un support",
    line3: "fiable et humain",
    description:
      "Vous cherchez un prestataire de support informatique à Évry-Courcouronnes, en Essonne ou en Île-de-France ? Parlons de vos besoins et trouvons ensemble l'accompagnement adapté.",
    buttonText: "Contacter TRINEXTA",
    buttonHref: "/contact",
  },

  schemaOverride: {
    name: "Support informatique pour TPE et PME",
    serviceType: "Support informatique",
    areaServed: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Essonne", "Île-de-France"],
  },
};
