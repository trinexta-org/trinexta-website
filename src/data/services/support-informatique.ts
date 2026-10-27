import type { ServicePageProps } from "@/components/services/ServicePage";

// Page /support-informatique : textes de la fiche 04 du dossier final (23/10/2026).
// Aucun prix ici : les montants vivent uniquement sur /serenite.

export const supportInformatiqueData: ServicePageProps = {
  serviceSlug: "support-informatique",
  canonicalPath: "/support-informatique",

  hero: {
    titlePart1: "Support informatique",
    titlePart2: "pour TPE et PME à Évry-Courcouronnes",
    description:
      "Ordinateur bloqué, messagerie inaccessible, logiciel métier figé : vos collaborateurs appellent notre équipe au lieu de chercher le collègue « qui s'y connaît ».\n\nUn support humain, du premier appel jusqu'à la clôture de la demande.",
    ctaText: "Mettre en place un support pour mon équipe",
    ctaHref: "/contact#formulaire",
    secondaryCta: {
      text: "Voir les formules",
      href: "/serenite",
    },
  },

  problem: {
    subtitle: "Le quotidien sans support",
    title: "Vos équipes doivent travailler, pas résoudre des pannes",
    transition: {
      line1: "Ce qui ralentit",
      line2: "vos équipes",
    },
    description:
      "Dans beaucoup de petites entreprises, l'incident retombe sur un salarié débrouillard. Ça tient tant que les pannes restent rares.\n\nUn support externalisé vous donne un point de contact unique, des demandes traitées dans un périmètre convenu et une documentation de chaque intervention. Vous voulez aussi la maintenance, la supervision et la sécurité du parc ? C'est le rôle de l'[infogérance](/infogerance).",
    painPoints: [
      "La messagerie bloquée toute une matinée.",
      "Le logiciel métier qui plante sans que personne sache qui appeler.",
      "Les pannes qui reviennent sans trace de la solution précédente.",
      "Le salarié « qui s'y connaît » détourné de son vrai travail.",
    ],
  },

  offer: {
    subtitle: "Ce que traite le support",
    title: "Quels problèmes notre support informatique résout",
    transition: {
      line1: "Notre",
      line2: "assistance",
    },
    description:
      "Pas besoin de recruter un technicien à temps plein : TRINEXTA intervient comme support externalisé ou en renfort de votre équipe informatique.",
    details: [
      {
        title: "Postes de travail",
        intro:
          "Lenteurs et blocages sur PC Windows ou sur Mac, logiciels courants, périphériques : nous diagnostiquons et corrigeons avec l'utilisateur.",
        items: [
          "Lenteurs et blocages, PC Windows et Mac",
          "Logiciels courants",
          "Installation et configuration",
          "Imprimantes et périphériques",
          "Accès aux ressources de l'entreprise",
          "Préparation ou remplacement d'un poste",
        ],
        note: "En cas de panne matérielle, nous orientons vers le constructeur ou chiffrons la réparation.",
      },
      {
        title: "Microsoft 365, Outlook et Teams",
        intro:
          "Messagerie et outils collaboratifs sont au centre du travail quotidien : nous aidons vos utilisateurs quand leur environnement [Microsoft 365](/microsoft-365) leur résiste.",
        items: [
          "Connexion à Outlook et messagerie",
          "Authentification",
          "Accès à Teams",
          "Synchronisation OneDrive",
          "Droits SharePoint",
        ],
        note: "L'administration avancée dépend des droits et du périmètre convenus.",
        link: {
          text: "Microsoft 365 pour les entreprises",
          href: "/microsoft-365",
        },
      },
      {
        title: "Logiciels métier et éditeurs",
        intro:
          "Comptabilité, facturation, gestion commerciale : nous vérifions le poste, les accès et la configuration.",
        items: [
          "Vérification du poste, des accès et de la configuration",
          "Contact avec l'éditeur selon le contrat",
          "Suivi de la demande jusqu'à sa clôture",
        ],
        note: "Si le problème vient de l'éditeur, nous le contactons et suivons la demande : vous n'avez qu'un interlocuteur.",
      },
      {
        title: "Réseau et ressources partagées",
        intro:
          "Connexion instable, dossier partagé inaccessible : premiers diagnostics et coordination avec votre fournisseur d'accès ou votre opérateur.",
        items: [
          "Premiers diagnostics",
          "Connexions locales",
          "Accès aux dossiers partagés",
          "Coordination avec le fournisseur d'accès ou l'opérateur",
        ],
        note: "Le périmètre dépend de la formule.",
        link: {
          text: "Téléphonie et réseau",
          href: "/solutions-metier",
        },
      },
    ],
  },

  keyFacts: [
    {
      label: "Canaux",
      value: "Téléphone, e-mail et prise en main à distance, du lundi au vendredi de 8 h 30 à 19 h.",
    },
    {
      label: "Qui répond",
      value: "Notre équipe support interne, qui dispose de la documentation de votre environnement ; votre technicien titulaire intervient sur site quand c'est nécessaire.",
    },
    {
      label: "Volume",
      value: "Avec Sérénité Complète, le nombre de demandes couvertes par le contrat n'est pas plafonné.",
    },
    {
      label: "Sans contrat",
      value: "Une intervention ponctuelle est possible, sur devis.",
    },
  ],

  process: {
    subtitle: "Comment une demande est traitée",
    title: "Un traitement structuré de chaque demande",
    description:
      "Vos collaborateurs nous joignent par téléphone ou par e-mail, au 09 78 25 07 46 du lundi au vendredi de 8 h 30 à 19 h. Pour un incident critique signalé pendant ces horaires, notre objectif est une prise en charge sous 30 minutes : c'est le début du traitement, pas un délai de résolution.",
    steps: [
      {
        title: "Réception et qualification",
        desc: "Qui, quel poste, quel problème.",
      },
      {
        title: "Évaluation de l'urgence",
        desc: "Impact sur votre activité et priorité de traitement.",
      },
      {
        title: "Diagnostic",
        desc: "À distance, avec l'utilisateur.",
      },
      {
        title: "Intervention",
        desc: "Résolution à distance, ou passage sur site si nécessaire.",
      },
      {
        title: "Suivi",
        desc: "Jusqu'à la clôture, ou transmission au bon intervenant (éditeur, opérateur, constructeur).",
      },
      {
        title: "Documentation",
        desc: "La solution est notée pour les demandes suivantes.",
      },
    ],
    cta: {
      text: "Voir nos niveaux de service",
      href: "/niveau-de-service",
    },
  },

  formulas: {
    subtitle: "Régulier ou ponctuel",
    title: "Support compris dans un contrat ou intervention ponctuelle ?",
    items: [
      {
        badge: "Sérénité Complète",
        title: "Support permanent",
        desc: "Pour les entreprises qui veulent un support permanent pour leurs collaborateurs.",
        points: [
          "Demandes couvertes par le contrat, sans plafond de nombre",
          "Téléphone, e-mail et prise en main à distance",
          "Historique des demandes et rapport mensuel",
          "Sans durée minimale, préavis de 2 mois",
          "Prix par poste et par mois, détaillé sur la page Sérénité",
        ],
        cta: {
          text: "Comparer les formules",
          href: "/serenite#comparatif",
        },
        highlighted: true,
      },
      {
        badge: "Sans abonnement",
        title: "Intervention ponctuelle",
        desc: "Pour un besoin isolé, sans externaliser toute votre informatique.",
        points: [
          "Périmètre fixé dans le devis",
          "À distance ou sur site",
          "Compte rendu d'intervention",
          "Aucune durée d'engagement",
        ],
        cta: {
          text: "Demander une intervention",
          href: "/services-annexes",
        },
      },
    ],
    note: "Sérénité Essentiel ne comprend pas l'assistance aux utilisateurs : elle est chiffrée sur devis. Projets, licences, interventions matérielles et prestations non prévues au contrat sont facturés en complément.",
  },

  localSeo: {
    subtitle: "Helpdesk de proximité",
    title: "À distance d'abord, sur site quand il le faut",
    description:
      "La plupart des demandes se règlent à distance, y compris pour vos collaborateurs en télétravail, quand les postes sont compatibles avec nos outils et que les accès sont en place. Certaines pannes demandent pourtant quelqu'un sur place : un poste qui ne démarre plus, un équipement à vérifier, l'arrivée d'un nouveau collaborateur.\n\nLes appels sont traités par l'équipe support interne et chaque entreprise a un technicien titulaire pour le terrain, qui connaît vos locaux. Pourquoi c'est important : [un helpdesk local change tout pour vos équipes](/blog/pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes).",
    items: [
      {
        title: "Notre bureau",
        desc: "7 rue Montespan, 91000 Évry-Courcouronnes.",
      },
      {
        title: "Zone d'intervention sur site",
        desc: "Évry-Courcouronnes, Corbeil-Essonnes, Ris-Orangis, Lisses, Bondoufle et communes voisines, en Essonne et dans toute l'Île-de-France.",
      },
      {
        title: "Déplacement",
        desc: "Sans frais pour les interventions programmées dans un rayon de 15 km autour d'Évry ; au-delà, selon le devis. Le temps passé sur site est facturé selon le contrat.",
      },
      {
        title: "Télétravail",
        desc: "Prise en main à distance des postes de vos collaborateurs, où qu'ils travaillent.",
      },
    ],
    ctaText: "Être rappelé",
    ctaHref: "/contact#formulaire",
  },

  benefits: {
    subtitle: "Ce qui change avec TRINEXTA",
    title: "Un support qui connaît votre environnement",
    transition: {
      line1: "Pourquoi",
      line2: "TRINEXTA",
    },
    items: [
      {
        title: "L'historique de vos demandes",
        desc: "Chaque demande est documentée ; les incidents qui reviennent sont repérés et traités à la source.",
      },
      {
        title: "Un coordinateur entre vos prestataires",
        desc: "Fournisseur d'accès, éditeur, opérateur, constructeur : nous faisons le lien.",
      },
      {
        title: "L'humain avant les tickets",
        desc: "Des explications compréhensibles, par une équipe qui connaît votre contexte.",
      },
      {
        title: "Un technicien titulaire pour le terrain",
        desc: "Le même interlocuteur dans vos locaux, d'une intervention à l'autre.",
      },
    ],
  },

  faq: [
    {
      question: "Quelle différence entre support informatique et infogérance ?",
      answer:
        "Le support traite les demandes et incidents du quotidien. L'[infogérance](/infogerance) couvre en plus la maintenance, la supervision, la sécurité et le suivi du parc, en continu.",
    },
    {
      question: "Le support est-il illimité ?",
      answer:
        "Avec [Sérénité Complète](/serenite), le nombre de demandes couvertes par le contrat n'est pas plafonné, aux horaires du support. Les exclusions, les équipements couverts et les modalités figurent au contrat.",
    },
    {
      question: "Quels sont vos horaires ?",
      answer:
        "Du lundi au vendredi, de 8 h 30 à 19 h. La supervision des postes fonctionne en continu de façon automatisée ; les alertes reçues hors horaires sont traitées par un technicien à la reprise du support.",
    },
    {
      question: "Prenez-vous en charge les Mac ?",
      answer: "Oui. Nous prenons en charge les Mac comme les PC Windows.",
    },
    {
      question: "Peut-on vous solliciter sans contrat ?",
      answer:
        "Oui. Une [intervention ponctuelle](/services-annexes) est étudiée et chiffrée sur devis.",
    },
    {
      question: "Vous déplacez-vous dans nos locaux ?",
      answer:
        "Oui, selon la nature de l'incident. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; le temps sur site est facturé selon votre contrat.",
    },
    {
      question: "Comment démarrer ?",
      answer:
        "Nous échangeons sur le nombre de collaborateurs, les équipements, les logiciels essentiels et les difficultés actuelles, puis nous vous orientons vers une [formule Sérénité](/serenite) ou une intervention adaptée.",
    },
  ],

  cta: {
    line1: "Vos collaborateurs",
    line2: "méritent un support",
    line3: "qui les connaît",
    description:
      "Appelez le 09 78 25 07 46, du lundi au vendredi de 8 h 30 à 19 h, ou laissez vos coordonnées : nous vous rappelons.",
    buttonText: "Mettre en place un support pour mon équipe",
    buttonHref: "/contact#formulaire",
  },

  schemaOverride: {
    name: "Support informatique et hotline pour PME",
    serviceType: "Support informatique",
    areaServed: ["Évry-Courcouronnes", "Essonne", "Île-de-France"],
  },
};
