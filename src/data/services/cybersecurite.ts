import type { ServicePageProps } from "@/components/services/ServicePage";
import { DIAGNOSTIC_LIEN } from "@/data/diagnostic";

// Page /cybersecurite : textes de la fiche 06 du dossier final (23/10/2026).
// Aucun prix ici : les montants vivent uniquement sur /serenite.
// Retirés : « 24/7 », « temps réel » au sens de veille humaine, « infaillible »,
// certifications non détenues, éditeurs non utilisés (Sophos, Bitdefender).

export const cybersecuriteData: ServicePageProps = {
  serviceSlug: "cybersecurite",
  canonicalPath: "/cybersecurite",

  hero: {
    titlePart1: "Cybersécurité pour TPE et PME",
    titlePart2: "en Essonne",
    description:
      "Un e-mail piégé, un mot de passe réutilisé, un poste sans mises à jour : la plupart des attaques contre les petites entreprises passent par là.\n\nNous fermons ces portes, surveillons vos postes et vous accompagnons quand une alerte survient, depuis notre bureau d'Évry-Courcouronnes.",
    ctaText: "Faire le point sur ma sécurité",
    ctaHref: "/contact#formulaire",
    secondaryCta: {
      text: "Je pense avoir été piraté",
      href: "/charte-assistance",
    },
    tertiaryLink: {
      text: "Tester gratuitement la sécurité de votre site web",
      href: DIAGNOSTIC_LIEN.href,
    },
  },

  problem: {
    subtitle: "Ce qui arrive vraiment",
    title: "Les attaques qui touchent vraiment les TPE et PME",
    description:
      "Les petites entreprises ne sont pas trop petites pour être visées : elles ont souvent moins de protections. Les attaques les plus courantes ne demandent aucune technique avancée, seulement une porte restée ouverte. Le jour de l'incident, la différence se fait entre une entreprise qui sait qui appeler et quoi couper, et une entreprise qui improvise.",
    painPoints: [
      "L'hameçonnage : un faux message Microsoft, une fausse facture ; un clic suffit pour livrer un mot de passe.",
      "Le compte Microsoft 365 compromis : une règle de transfert discrète, puis de fausses demandes de virement envoyées à vos clients.",
      "Le rançongiciel : les fichiers sont chiffrés, l'activité s'arrête.",
      "Le poste oublié : une faille connue reste ouverte des semaines faute de mise à jour.",
      "L'absence de procédure : personne ne sait qui appeler ni quoi couper.",
    ],
  },

  banner: {
    title: "Un incident en cours ?",
    description:
      "Débranchez le poste du réseau sans l'éteindre, ne supprimez rien, et suivez les gestes par situation. Pendant nos horaires, appelez le 09 78 25 07 46.",
    ctaText: "Je pense avoir été piraté",
    ctaHref: "/charte-assistance",
  },

  offer: {
    subtitle: "Ce que nous mettons en place",
    title: "Des protections simples, tenues dans la durée",
    description:
      "Chaque mesure ferme une porte précise. Ensemble, elles couvrent les attaques les plus fréquentes contre les petites entreprises.",
    features: [
      {
        title: "EDR SentinelOne sur chaque poste",
        desc: "L'EDR analyse le comportement des programmes : un logiciel qui chiffre des fichiers en série peut être bloqué même s'il est inconnu, et le poste peut être isolé du réseau selon la configuration retenue avec vous. Inclus dans les deux formules Sérénité.",
      },
      {
        title: "Mises à jour et inventaire du parc",
        desc: "Les correctifs de sécurité sont suivis par notre supervision, et la liste de vos postes et de leurs protections reste à jour. Un poste oublié est repéré avant d'être exploité. Inclus dans les deux formules Sérénité.",
      },
      {
        title: "Double authentification",
        desc: "Sur Microsoft 365 et les comptes administrateurs : un mot de passe volé ne suffit plus pour se connecter. C'est la mesure qui bloque la plupart des prises de contrôle de messagerie. Incluse dans Sérénité Complète.",
      },
      {
        title: "Sensibilisation à l'hameçonnage",
        desc: "Les bons réflexes expliqués à vos équipes : reconnaître un faux message, vérifier une demande de changement de RIB, savoir qui prévenir. Incluse dans Sérénité Complète.",
      },
      {
        title: "Réponse à incident cyber",
        desc: "Si une attaque survient, nous suivons un plan en 8 étapes, de la détection au retour d'expérience. Incluse dans Sérénité Complète. La sauvegarde, qui prépare la reprise des données hébergées en France, est une option sur étude.",
      },
    ],
  },

  keyFacts: [
    {
      label: "Protection",
      value: "EDR SentinelOne sur les postes, en complément des mises à jour, de la double authentification et de la sauvegarde.",
    },
    {
      label: "Surveillance",
      value: "Détection automatisée et continue ; analyse des alertes par nos techniciens du lundi au vendredi, de 8 h 30 à 19 h.",
    },
    {
      label: "Dans les formules",
      value: "L'EDR est inclus dans les deux formules Sérénité ; double authentification, sensibilisation et réponse à incident dans Sérénité Complète.",
    },
    {
      label: "Zone",
      value: "Interventions en Essonne et en Île-de-France, depuis Évry-Courcouronnes.",
    },
  ],

  formulas: {
    subtitle: "Dans les formules Sérénité",
    title: "Ce que comprend chaque formule",
    items: [
      {
        badge: "Sérénité Essentiel",
        title: "Protéger et surveiller",
        desc: "Surveillance et sécurité des postes, sans assistance aux utilisateurs.",
        points: [
          "EDR SentinelOne",
          "Mises à jour de sécurité suivies",
          "Inventaire du parc",
          "Alertes traitées par un technicien",
        ],
        cta: {
          text: "Voir le détail et les prix",
          href: "/serenite#comparatif",
        },
      },
      {
        badge: "Sérénité Complète",
        title: "Protéger, accompagner, réagir",
        desc: "Tout Essentiel, plus les mesures qui protègent les comptes et préparent l'incident.",
        points: [
          "Tout ce qui est dans Essentiel",
          "Double authentification",
          "Sensibilisation à l'hameçonnage",
          "Réponse à incident cyber",
          "Assistance de vos utilisateurs",
        ],
        cta: {
          text: "Comparer les formules",
          href: "/serenite#comparatif",
        },
        highlighted: true,
      },
    ],
    note: "La sauvegarde est une option hors forfait, sur étude, avec des données hébergées en France. Les prix des formules sont sur la page Sérénité.",
  },

  process: {
    subtitle: "Compte Microsoft 365 piraté",
    title: "Les signes et les premiers gestes",
    description:
      "C'est souvent un client qui donne l'alerte, en s'étonnant d'un changement de RIB. Les signes : des e-mails envoyés que personne n'a écrits, une règle de transfert inconnue, des alertes de connexion depuis un pays inhabituel.",
    steps: [
      {
        title: "Changer le mot de passe",
        desc: "Depuis un appareil sain.",
      },
      {
        title: "Fermer les accès",
        desc: "Révoquer les sessions ouvertes et activer la double authentification.",
      },
      {
        title: "Vérifier la messagerie",
        desc: "Règles de transfert et applications autorisées.",
      },
      {
        title: "Prévenir vos contacts",
        desc: "Si de faux messages sont partis en votre nom.",
      },
      {
        title: "Nous appeler",
        desc: "Au 09 78 25 07 46, du lundi au vendredi de 8 h 30 à 19 h.",
      },
    ],
    cta: {
      text: "Les gestes par situation",
      href: "/charte-assistance",
    },
  },

  localSeo: {
    subtitle: "Audit de cybersécurité",
    title: "Faire le point avant l'incident",
    description:
      "Le point de sécurité que nous menons dans les entreprises de l'Essonne et d'Île-de-France répond à des questions simples. Il est offert : vous recevez une liste de corrections classées par priorité, en distinguant ce qui relève de [Sérénité](/serenite) et ce qui demande un devis.",
    items: [
      {
        title: "Postes",
        desc: "Tous les postes ont-ils une protection active et des mises à jour récentes ?",
      },
      {
        title: "Comptes",
        desc: "Les comptes Microsoft 365 et administrateurs ont-ils la double authentification ? Les anciens collaborateurs ont-ils encore des accès ?",
      },
      {
        title: "Sauvegarde",
        desc: "Existe-t-il une sauvegarde hors du réseau, déjà restaurée au moins une fois ?",
      },
      {
        title: "Réflexes",
        desc: "Vos équipes savent-elles qui prévenir face à un e-mail douteux ?",
      },
    ],
    ctaText: "Faire le point sur ma sécurité",
    ctaHref: "/contact#formulaire",
  },

  benefits: {
    subtitle: "Détection automatique, traitement humain",
    title: "Un logiciel qui réagit, une équipe qui prend le relais",
    items: [
      {
        title: "Une détection continue",
        desc: "L'EDR surveille vos postes en continu. Face à un comportement suspect, il peut bloquer le programme ou isoler le poste, selon la configuration retenue avec vous. C'est un logiciel qui réagit, pas une équipe qui veille la nuit.",
      },
      {
        title: "Des techniciens qui analysent",
        desc: "Du lundi au vendredi, de 8 h 30 à 19 h : analyse de l'alerte, levée de doute, appel à la personne concernée, remise en état. Hors horaires, l'alerte est traitée à la reprise du support, selon nos niveaux de service.",
      },
      {
        title: "Aucune console à surveiller",
        desc: "Vous n'avez rien à paramétrer ni à suivre : nous gérons les protections et vous expliquons simplement ce qui a été fait.",
      },
      {
        title: "Vos logiciels métier préservés",
        desc: "Si l'EDR bloque à tort un logiciel de comptabilité ou de caisse, nous ajoutons une exclusion après vérification, en lien avec l'éditeur si besoin.",
      },
    ],
  },

  incidentResponse: {
    surtitle: "En cas d'incident",
    title: "Notre plan en 8 étapes",
    intro:
      "Quand une attaque survient, chaque étape compte et l'ordre aussi. En cas de violation de données personnelles, une notification à la CNIL peut être nécessaire dans les 72 heures : nous rassemblons avec vous les éléments techniques.",
    items: [
      {
        title: "Détection",
        desc: "EDR, supervision, alerte Microsoft 365 ou signalement d'un utilisateur.",
      },
      {
        title: "Qualification",
        desc: "Nature de l'incident, systèmes et données touchés, criticité.",
      },
      {
        title: "Contention",
        desc: "Isolement des postes, blocage des comptes compromis.",
      },
      {
        title: "Préservation des preuves",
        desc: "Copie avant toute manipulation, journal horodaté.",
      },
      {
        title: "Investigation",
        desc: "Origine, méthode et étendue de l'attaque.",
      },
      {
        title: "Éradication",
        desc: "Nettoyage ou réinstallation, correctifs, nouveaux mots de passe.",
      },
      {
        title: "Restauration",
        desc: "Vérification des sauvegardes, retour progressif à la normale.",
      },
      {
        title: "Retour d'expérience",
        desc: "Causes de l'incident et mesures de renforcement.",
      },
    ],
    ctaLabel: "Je pense avoir été piraté",
    ctaHref: "/charte-assistance",
    planHref: "/plan-reponse-incidents-securite",
  },

  expertise: {
    surtitle: "NIS2, RGPD, assurance cyber",
    title: "Où en êtes-vous ?",
    intro:
      "Nous faisons le point sur votre situation technique et documentons les mesures en place ; le volet juridique reste du ressort de votre conseil.",
    items: [
      "NIS2 vise des entités de secteurs déterminés, selon leur taille et leur activité : le service officiel messervices.cyber.gouv.fr/nis2 indique si vous êtes concerné. Un client ou un donneur d'ordre concerné peut aussi vous demander des mesures de sécurité ;",
      "le RGPD impose à toute entreprise de protéger les données personnelles qu'elle traite, donc ses postes et ses accès ;",
      "les assureurs demandent de plus en plus souvent la double authentification, un EDR ou une sauvegarde testée ;",
      "notre veille s'appuie sur le CERT-FR, l'ANSSI, Cybermalveillance.gouv.fr et les avis de SentinelOne et Microsoft.",
    ],
  },

  caseStudy: {
    surtitle: "Cas client",
    title: "Intervention après le piratage de plusieurs sites web",
    context:
      "Une entreprise francilienne confrontée à une compromission de son infrastructure web.\n\nAprès des dysfonctionnements affectant plusieurs sites internet, dont une boutique e-commerce, TRINEXTA a été sollicitée pour rechercher l'origine de l'incident et engager les premières mesures de sécurisation. L'investigation a permis d'identifier des activités malveillantes remontant à plusieurs semaines, des portes dérobées et des mécanismes de manipulation du référencement naturel.",
    stats: [
      { value: "63", label: "fichiers malveillants isolés et conservés pour l'investigation" },
    ],
    results: [
      "63 fichiers malveillants placés en quarantaine, avec conservation des éléments nécessaires à l'investigation.",
      "Identification d'activités suspectes remontant au 23 septembre 2026.",
      "Neutralisation des mécanismes malveillants identifiés.",
      "Renforcement des accès administratifs et renouvellement d'identifiants sensibles.",
      "Maintien de l'accessibilité des principaux sites lors des opérations initiales.",
    ],
    conclusion:
      "L'intervention a permis d'engager la sécurisation de l'environnement tout en préparant les vérifications nécessaires à une remédiation complète.",
    cta: {
      text: "Lire le cas client",
      href: "/cas-clients/piratage-sites-wordpress-ecommerce",
    },
    note: "Cas client anonymisé. Résultats intermédiaires au 14 octobre 2026.",
  },

  faq: [
    {
      question: "Quelle différence entre un antivirus et un EDR ?",
      answer:
        "Un antivirus compare les fichiers à une liste de menaces connues. Un EDR observe aussi le comportement des programmes : un logiciel qui chiffre des fichiers en série peut être bloqué même s'il est inconnu. Il complète la double authentification et la [sauvegarde](/cloud-sauvegarde), il ne les remplace pas.",
    },
    {
      question: "Nos logiciels métier restent-ils utilisables ?",
      answer:
        "Oui. Si l'EDR bloque à tort un logiciel de comptabilité ou de caisse, nous ajoutons une exclusion après vérification, en lien avec l'éditeur si besoin.",
    },
    {
      question: "Que faire si je pense avoir été piraté ?",
      answer:
        "Débranchez le poste du réseau sans l'éteindre, ne supprimez rien et appelez-nous au 09 78 25 07 46 (du lundi au vendredi, 8 h 30 à 19 h). Les gestes par situation sont sur notre page [Assistance cybersécurité](/charte-assistance).",
    },
    {
      question: "Ma PME est-elle concernée par NIS2 ?",
      answer:
        "Cela dépend de votre secteur et de votre taille : le test officiel est sur messervices.cyber.gouv.fr/nis2. Nous préparons avec vous les éléments techniques demandés.",
    },
    {
      question: "La double authentification est-elle comprise dans Sérénité ?",
      answer:
        "Oui, dans [Sérénité Complète](/serenite), avec la sensibilisation de vos équipes à l'hameçonnage et la réponse à incident cyber. Elle n'est pas comprise dans Sérénité Essentiel, qui couvre la protection EDR, la supervision et la maintenance préventive automatisée.",
    },
  ],

  cta: {
    line1: "Où en est",
    line2: "la sécurité",
    line3: "de votre entreprise ?",
    description:
      "Un échange avec un technicien suffit pour repérer les urgences : postes sans protection, comptes sans double authentification, sauvegarde jamais testée. Ou appelez le 09 78 25 07 46.",
    buttonText: "Faire le point sur ma sécurité",
    buttonHref: "/contact#formulaire",
  },

  schemaOverride: {
    name: "Cybersécurité pour TPE et PME",
    serviceType: "Cybersécurité des postes et des comptes",
    areaServed: ["Essonne", "Île-de-France"],
  },
};
