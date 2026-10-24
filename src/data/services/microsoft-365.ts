import type { ServicePageProps } from "@/components/services/ServicePage";

// Page /microsoft-365 : textes de la fiche 08 du dossier final (23/10/2026).
// Aucun prix ici. Retirés : « partenaire certifié », « sans aucune coupure »,
// « stabilité totale », « rentabilité maximale » (aucun justificatif).

export const microsoft365Data: ServicePageProps = {
  serviceSlug: "microsoft-365",
  canonicalPath: "/microsoft-365",

  hero: {
    titlePart1: "Microsoft 365",
    titlePart2: "pour TPE et PME en Essonne",
    description:
      "Microsoft 365 est souvent installé vite et réglé une fois pour toutes : des licences payées pour rien, des fichiers partagés sans contrôle, des comptes sans double authentification.\n\nNous migrons, sécurisons et administrons votre environnement pour qu'il serve votre travail, et qu'un collaborateur sache à qui parler quand quelque chose bloque.",
    ctaText: "Faire le point sur mon Microsoft 365",
    ctaHref: "/contact#formulaire",
    secondaryCta: {
      text: "Voir les formules Sérénité",
      href: "/serenite",
    },
  },

  problem: {
    subtitle: "Ce que nous voyons le plus souvent",
    title: "Les problèmes que nous voyons le plus souvent",
    description:
      "Microsoft 365 n'est pas un simple abonnement de messagerie : mal réglé, il coûte plus qu'il ne devrait et expose les comptes de l'entreprise. Au quotidien, vos collaborateurs passent par notre [support informatique](/support-informatique) pour leurs questions sur Outlook, Teams ou OneDrive.",
    painPoints: [
      "Des licences mal ajustées : des comptes d'anciens salariés encore payés, des licences haut de gamme pour des usages simples, ou l'inverse.",
      "Des comptes sans double authentification : un mot de passe volé suffit pour lire la messagerie et envoyer de fausses factures.",
      "Des fichiers partagés sans règle : des liens ouverts à tous, des dossiers personnels qui contiennent les documents de l'entreprise.",
      "Teams sous-utilisé : des pièces jointes qui circulent par e-mail alors que l'équipe pourrait travailler sur le même fichier.",
      "Personne en charge : quand un collaborateur arrive ou part, les accès sont créés ou fermés au hasard.",
    ],
  },

  offer: {
    subtitle: "Ce que nous faisons",
    title: "Migrer, sécuriser, organiser, administrer",
    description:
      "Nous intervenons sur la technique, la sécurité et l'usage, pour que Microsoft 365 soit réglé une bonne fois et suivi ensuite.",
    features: [
      {
        title: "Migration vers Microsoft 365",
        desc: "Transfert des e-mails, contacts, calendriers et fichiers depuis une autre messagerie (OVH, Gmail, serveur Exchange…), configuration du domaine, des postes et des téléphones. La bascule est planifiée pour limiter l'interruption, en dehors des heures de travail si besoin.",
      },
      {
        title: "Sécurisation du compte de l'entreprise",
        desc: "Double authentification pour tous les utilisateurs et les administrateurs, séparation des comptes d'administration, règles d'accès conditionnel lorsque vos licences le permettent, protection de la messagerie contre l'hameçonnage, enregistrements SPF, DKIM et DMARC de votre domaine.",
      },
      {
        title: "OneDrive, SharePoint et Teams",
        desc: "Une organisation des documents claire : espaces par service ou par projet, droits par fonction, règles de partage avec l'extérieur. Dans Teams, des équipes et canaux utiles, la co-édition des documents et un accès des invités encadré.",
      },
      {
        title: "Licences",
        desc: "Revue des abonnements : comptes inactifs, licences en double, niveau adapté à chaque usage. Vous payez ce qui sert. Les licences Microsoft restent facturées à part.",
      },
      {
        title: "Gestion courante",
        desc: "Création et fermeture des comptes, réinitialisation des mots de passe, boîtes partagées, listes de diffusion, questions des utilisateurs sur Outlook, Teams ou OneDrive. Incluse dans Sérénité Complète.",
      },
    ],
  },

  keyFacts: [
    {
      label: "Périmètre",
      value: "Messagerie, Teams, OneDrive, SharePoint, comptes et licences.",
    },
    {
      label: "Dans Sérénité Complète",
      value: "Gestion courante, arrivées et départs, double authentification, sensibilisation à l'hameçonnage et assistance aux utilisateurs pour les demandes couvertes par le contrat.",
    },
    {
      label: "Sur devis",
      value: "Migrations, réorganisation SharePoint, projets Teams. Les licences Microsoft sont facturées à part ; la sauvegarde de Microsoft 365 est une option sur étude, données hébergées en France.",
    },
    {
      label: "Horaires",
      value: "Assistance du lundi au vendredi, de 8 h 30 à 19 h.",
    },
  ],

  formulas: {
    subtitle: "Inclus ou sur devis",
    title: "Ce qui est inclus dans Sérénité, ce qui ne l'est pas",
    items: [
      {
        badge: "Sérénité Complète",
        title: "Administration au quotidien",
        desc: "Sérénité Essentiel ne comprend pas la gestion de Microsoft 365 ; Sérénité Complète la comprend.",
        points: [
          "Gestion courante Microsoft 365",
          "Arrivées et départs des collaborateurs",
          "Double authentification des comptes",
          "Sensibilisation à l'hameçonnage",
          "Assistance aux utilisateurs (Outlook, Teams, OneDrive)",
        ],
        cta: {
          text: "Comparer les formules",
          href: "/serenite#comparatif",
        },
        highlighted: true,
      },
      {
        badge: "Sur devis",
        title: "Projets ponctuels",
        desc: "Avec ou sans contrat Sérénité.",
        points: [
          "Migration vers Microsoft 365",
          "Réorganisation SharePoint, projet Teams",
          "Licences Microsoft, facturées à part",
          "Sauvegarde de Microsoft 365, en option sur étude",
        ],
        cta: {
          text: "Demander un devis",
          href: "/services-annexes",
        },
      },
    ],
    note: "Les prix des formules sont détaillés sur la page Sérénité.",
  },

  process: {
    subtitle: "Migration",
    title: "Comment se passe une migration",
    description:
      "Les données sont copiées et vérifiées avant la bascule. Le risque principal est l'oubli d'une source (une ancienne boîte, un dossier local) : c'est pour cela que l'état des lieux vient en premier.",
    steps: [
      {
        title: "État des lieux",
        desc: "Messagerie actuelle, nombre de boîtes, volume, domaine, appareils utilisés.",
      },
      {
        title: "Préparation",
        desc: "Environnement Microsoft 365, comptes, licences, sécurité de base.",
      },
      {
        title: "Copie des données",
        desc: "E-mails, contacts, calendriers et fichiers copiés et vérifiés avant la bascule.",
      },
      {
        title: "Bascule",
        desc: "Modification du domaine à une heure convenue avec vous, configuration des postes et des téléphones.",
      },
      {
        title: "Accompagnement",
        desc: "Premières heures d'utilisation, réponses aux questions, contrôle des messages reçus.",
      },
    ],
    cta: {
      text: "Préparer ma migration",
      href: "/contact#formulaire",
    },
  },

  benefits: {
    subtitle: "Ce qui change avec TRINEXTA",
    title: "Un Microsoft 365 réglé, puis suivi",
    items: [
      {
        title: "Un état des lieux offert",
        desc: "Vous avez déjà Microsoft 365 ? Nous regardons comptes, licences, droits d'administration, partages et sécurité, puis vous remettons la liste des points à corriger.",
      },
      {
        title: "Des comptes protégés",
        desc: "La double authentification bloque la plupart des connexions avec un mot de passe volé. Nous l'activons avec vous, en expliquant le geste à chacun. Voir aussi notre page [Cybersécurité](/cybersecurite).",
      },
      {
        title: "Des arrivées et départs propres",
        desc: "Vous nous prévenez, nous créons ou fermons le compte, la licence, les accès et la boîte mail. Au départ, la messagerie et les fichiers vont à la personne que vous désignez.",
      },
      {
        title: "Un seul interlocuteur",
        desc: "Vos collaborateurs passent par nous. Pour un incident de la plateforme elle-même, nous ouvrons et suivons le dossier auprès de Microsoft à votre place.",
      },
    ],
  },

  localSeo: {
    subtitle: "Sauvegarde et compte piraté",
    title: "Ce que Microsoft ne fait pas à votre place",
    description:
      "Microsoft fait fonctionner le service, mais la conservation de vos données au-delà des délais de corbeille relève de vous. Une [sauvegarde dédiée](/cloud-sauvegarde) conserve une copie indépendante, en option sur étude, avec des données hébergées en France.\n\nDes e-mails envoyés à votre insu, une règle de transfert inconnue, une connexion depuis l'étranger : ce sont les signes d'un compte compromis. Changez le mot de passe depuis un appareil sain et appelez-nous au 09 78 25 07 46.",
    items: [
      {
        title: "Suppression ancienne",
        desc: "Un fichier supprimé par erreur il y a plusieurs mois peut ne plus être récupérable sans sauvegarde.",
      },
      {
        title: "Compte piraté",
        desc: "Des e-mails effacés par un attaquant peuvent disparaître avec la corbeille.",
      },
      {
        title: "Premiers gestes",
        desc: "Mot de passe changé depuis un appareil sain, sessions fermées, règles de messagerie vérifiées.",
      },
      {
        title: "Notre zone",
        desc: "TPE et PME d'Évry-Courcouronnes, de l'Essonne et d'Île-de-France.",
      },
    ],
    ctaText: "Je pense avoir été piraté",
    ctaHref: "/charte-assistance",
  },

  faq: [
    {
      question: "Risque-t-on de perdre des données pendant la migration ?",
      answer:
        "Les données sont copiées et vérifiées avant la bascule. Le risque principal est l'oubli d'une source (une ancienne boîte, un dossier local) : c'est pour cela que l'état des lieux vient en premier.",
    },
    {
      question: "Pouvez-vous reprendre un Microsoft 365 déjà en place ?",
      answer:
        "Oui. Nous commençons par un état des lieux, offert : comptes, licences, droits d'administration, partages, sécurité. Vous recevez la liste des points à corriger.",
    },
    {
      question: "La double authentification va-t-elle gêner mes équipes ?",
      answer:
        "Elle demande une validation sur le téléphone lors des connexions depuis un nouvel appareil. Nous l'activons avec vous, poste par poste, en expliquant le geste. C'est la mesure qui bloque la plupart des connexions avec un mot de passe volé.",
    },
    {
      question: "Comment ajouter ou retirer un collaborateur ?",
      answer:
        "Avec [Sérénité Complète](/serenite), vous nous prévenez et nous créons ou fermons le compte, la licence, les accès et la boîte mail. Au départ, nous transférons la messagerie et les fichiers à la personne que vous désignez.",
    },
    {
      question: "Microsoft 365 aide-t-il à respecter le RGPD ?",
      answer:
        "Il fournit des outils : droits d'accès, chiffrement, journaux. Encore faut-il qu'ils soient réglés. Nous configurons le volet technique ; le volet juridique reste du ressort de votre conseil.",
    },
    {
      question: "Avez-vous encore besoin du support Microsoft ?",
      answer:
        "Pour la plupart des demandes courantes, non : vos collaborateurs passent par nous. Pour certains incidents de la plateforme elle-même, nous ouvrons et suivons le dossier auprès de Microsoft à votre place.",
    },
  ],

  cta: {
    line1: "Votre",
    line2: "Microsoft 365",
    line3: "est-il bien réglé ?",
    description:
      "Nous regardons avec vous vos licences, vos comptes et vos partages, et nous vous disons ce qui mérite d'être corrigé en premier. Du lundi au vendredi, de 8 h 30 à 19 h, au 09 78 25 07 46.",
    buttonText: "Faire le point sur mon Microsoft 365",
    buttonHref: "/contact#formulaire",
  },

  schemaOverride: {
    name: "Microsoft 365 pour TPE et PME",
    serviceType: "Migration et administration Microsoft 365",
    areaServed: ["Essonne", "Île-de-France"],
  },
};
