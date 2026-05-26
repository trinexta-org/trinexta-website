import { ServicePage } from "@/components/services/ServicePage"

export const metadata = {
  title: "Microsoft 365 pour Entreprises : Déploiement & Sécurisation | Trinexta",
  description: "Transformez Microsoft 365 en un moteur de productivité. Trinexta gère votre migration, la sécurité de votre tenant, SharePoint, Teams et optimise vos licences pour une rentabilité maximale.",
}

const ms365Data = {
  serviceSlug: "microsoft-365",
  
  hero: {
    titlePart1: "Microsoft",
    titlePart2: "365", 
    description: "La suite bureautique traditionnelle n'est plus suffisante pour répondre aux défis de l'entreprise moderne. Microsoft 365 est devenu l'écosystème central, le moteur de votre collaboration et le coffre-fort de vos données. Mais sans une configuration experte, cet outil puissant peut devenir complexe, sous-exploité ou, plus grave, une porte d'entrée pour les cybermenaces. Trinexta vous accompagne pour déployer, sécuriser et optimiser chaque brique de votre environnement Microsoft 365 : messagerie professionnelle, partage documentaire intelligent, visioconférence unifiée et mobilité totale. Nous transformons votre suite logicielle en un avantage concurrentiel majeur, tout en vous garantissant une gestion simplifiée et une parfaite maîtrise de vos coûts de licences.",
    ctaText: "Optimiser mon environnement Microsoft 365",
    ctaHref: "/contact"
  },
  
  problem: {
    subtitle: "Au-delà de la simple messagerie",
    title: "Microsoft 365 est une plateforme puissante, mais souvent mal exploitée.",
    description: "Beaucoup d'entreprises souscrivent à des licences Microsoft 365 par automatisme, sans jamais en exploiter la richesse fonctionnelle. Elles se retrouvent avec des outils collaboratifs (Teams, SharePoint, OneDrive) qui sont mal configurés, désordonnés ou, pire, utilisés comme de simples espaces de stockage sans aucune protection contre les fuites de données ou les intrusions. Entre les configurations de sécurité complexes, la gestion anarchique des accès, le manque de gouvernance documentaire et le paiement de licences inutiles, les entreprises perdent en efficacité et en sécurité. Microsoft 365 n'est pas un simple logiciel de traitement de texte ; c'est un écosystème complexe qui exige une véritable expertise pour devenir un outil de productivité réelle plutôt qu'une charge administrative et technique.",
    painPoints: [
      "Gestion chaotique des licences entraînant un gaspillage budgétaire mensuel sur des fonctionnalités non utilisées.",
      "Données sensibles stockées sans protection adéquate sur OneDrive ou SharePoint, augmentant drastiquement les risques de vol.",
      "Difficulté majeure à configurer des couches de sécurité indispensables (MFA, Accès conditionnels, Protection des identités).",
      "Outils collaboratifs comme Microsoft Teams sous-utilisés ou mal configurés, empêchant une vraie communication fluide entre les équipes.",
      "Gouvernance des données inexistante, rendant la recherche d'information lente et pénible pour vos collaborateurs."
    ]
  },
  
  offer: {
    subtitle: "Votre écosystème structuré et sécurisé",
    title: "Ce que l'on fait concrètement pour votre productivité",
    description: "Nous transformons votre environnement Microsoft 365 en un espace de travail digital sécurisé, fluide et parfaitement dimensionné pour vos besoins réels. Notre approche est exhaustive : nous intervenons sur la technique, la sécurité et l'usage.",
    features: [
      {
        title: "Migration et déploiement sans aucune coupure",
        desc: "La transition vers Microsoft 365 ne doit pas paralyser votre entreprise. Nous pilotons le transfert complet de vos emails, contacts, calendriers et dossiers depuis votre ancien prestataire ou votre infrastructure locale vers le cloud Microsoft. Nous assurons la continuité totale de service pour que vos collaborateurs ne ressentent aucune interruption lors du passage à la nouvelle plateforme."
      },
      {
        title: "Sécurisation experte du Tenant",
        desc: "Le 'Tenant' est le cœur de votre sécurité Microsoft 365. Nous activons et configurons la double authentification (MFA) pour chaque utilisateur, paramétrons les accès conditionnels et déployons les politiques de protection contre les menaces. Nous nous assurons que seuls les utilisateurs légitimes, depuis des appareils autorisés, peuvent accéder à vos données sensibles."
      },
      {
        title: "Gouvernance et structuration SharePoint/OneDrive",
        desc: "OneDrive et SharePoint sont des outils formidables, mais ils peuvent vite devenir des dépotoirs numériques illisibles. Nous structurons vos espaces de partage de fichiers en créant une architecture logique, intuitive et sécurisée. Nous définissons des politiques de droits d'accès fines, pour que chaque département ne voit que ce qu'il doit voir, tout en facilitant la recherche documentaire."
      },
      {
        title: "Audit et optimisation intelligente des licences",
        desc: "Payer pour des fonctionnalités inutilisées est une perte nette. Nous auditons vos usages réels pour ajuster vos licences Microsoft 365. Nous éliminons les doublons, supprimons les licences orphelines et nous nous assurons que vous disposez du bon niveau de service (Business Premium, Standard, etc.) par rapport à vos besoins, optimisant ainsi votre facture mensuelle."
      },
      {
        title: "Accompagnement et déploiement Teams",
        desc: "Teams est bien plus qu'un outil de visio. Nous le configurons comme votre centre névralgique de collaboration : gestion des équipes, canaux de discussion, espaces de co-édition documentaire et intégration des applications métiers. Nous sécurisons également les accès externes pour que vous puissiez collaborer avec vos clients ou partenaires en toute sécurité."
      }
    ]
  },
  
  benefits: {
    subtitle: "La différence Trinexta",
    title: "Une productivité libérée, une sécurité renforcée",
    items: [
      {
        title: "Expertise Microsoft 365 certifiée",
        desc: "En tant que partenaire certifié, nous maîtrisons toutes les subtilités de configuration de l'écosystème Microsoft. Nous évitons les erreurs de jeunesse et garantissons une stabilité totale de votre plateforme, là où des configurations génériques échouent souvent."
      },
      {
        title: "Sécurité proactive par défaut",
        desc: "La sécurité n'est pas une option. Elle est intégrée nativement dans chacune de nos configurations (MFA, chiffrement, protection anti-spam). Nous protégeons vos comptes contre les vols d'identités et les attaques par phishing, qui sont aujourd'hui la menace principale des TPE/PME."
      },
      {
        title: "Maîtrise budgétaire durable",
        desc: "Nous ne sommes pas là pour vous vendre le maximum de licences, mais le strict nécessaire pour que vous soyez performants. Nous éliminons les licences inutiles et optimisons vos investissements pour réduire drastiquement vos coûts fixes mensuels récurrents."
      },
      {
        title: "Support technique dédié et réactif",
        desc: "Un accès à Teams qui bloque, un problème de synchronisation OneDrive ou un utilisateur qui a perdu ses accès ? Nos experts interviennent rapidement pour que vos équipes ne restent jamais immobilisées. Nous prenons en charge la gestion technique pour que vous n'ayez plus jamais à appeler le support Microsoft."
      }
    ]
  },
  
  faq: [
    {
      question: "Est-ce que je risque de perdre mes données durant la migration ?",
      answer: "Absolument pas. Nos processus de migration sont éprouvés et garantissent une intégrité totale de vos données. Nous effectuons des sauvegardes préalables systématiques et des phases de test pour vérifier que tous vos emails, documents, calendriers et contacts sont parfaitement transférés avant le basculement définitif."
    },
    {
      question: "Comment gérez-vous concrètement la sécurité des accès ?",
      answer: "Nous mettons en place une stratégie de défense en profondeur. Cela commence par l'activation obligatoire de la double authentification (MFA), couplée à des politiques d'accès conditionnel qui analysent le contexte de connexion (lieu, appareil, heure) pour bloquer toute activité suspecte avant même qu'elle ne compromette vos données."
    },
    {
      question: "Pouvez-vous reprendre en main mon environnement déjà existant ?",
      answer: "Oui, c'est même un cas très fréquent. Nous réalisons un audit complet de votre configuration actuelle, identifions les failles de sécurité, supprimons les erreurs de configuration et remettons à plat vos droits d'accès pour optimiser votre environnement existant."
    },
    {
      question: "Est-ce que l'on peut ajouter ou retirer des postes facilement ?",
      answer: "C'est l'un des avantages majeurs de Microsoft 365. La plateforme est conçue pour l'évolutivité. Nous gérons pour vous toute l'administration : attribution des licences, création des nouveaux comptes utilisateurs ou suppression des comptes en cas de départ, garantissant ainsi une gestion administrative fluide."
    },
    {
      question: "La conformité RGPD est-elle assurée avec Microsoft 365 ?",
      answer: "Microsoft 365 offre les outils techniques nécessaires pour assurer la conformité RGPD, mais c'est la configuration qui fait la différence. Nous configurons votre tenant pour respecter les règles de rétention, de protection et de confidentialité des données personnelles de vos clients et collaborateurs."
    },
    {
      question: "Quels sont les avantages de Teams par rapport à d'autres outils de visio ?",
      answer: "Teams n'est pas seulement un outil de visioconférence. Il est intégré à l'ensemble de la suite Microsoft 365. Lorsque vous partagez un document dans Teams, vous travaillez directement sur le fichier stocké dans SharePoint avec le contrôle de version et la sécurité. Cette intégration native supprime les risques liés à l'usage d'outils tiers déconnectés de votre système."
    },
    {
      question: "Gérez-vous aussi les sauvegardes de Microsoft 365 ?",
      answer: "Microsoft assure la disponibilité du service, mais pas la sauvegarde à long terme de vos données en cas de suppression accidentelle ou de ransomware. Nous complétons votre protection avec des solutions de sauvegarde professionnelles externalisées pour garantir que vos données restent récupérables quoi qu'il arrive."
    },
    {
      question: "Est-ce que les solutions de sécurité ralentissent le travail des équipes ?",
      answer: "Non. Nous configurons la sécurité pour qu'elle soit robuste mais fluide. L'objectif est de sécuriser sans paralyser. Grâce à notre expertise, nous trouvons le juste équilibre pour protéger votre entreprise tout en garantissant une expérience utilisateur rapide et agréable."
    }
  ],

  cta: {
    title: "Prêt à optimiser votre collaboration et sécuriser votre écosystème ?",
    description: "Faites de Microsoft 365 un véritable moteur de performance pour votre entreprise. Nos experts sont prêts à auditer votre environnement, sécuriser vos accès et former vos équipes pour tirer le meilleur parti de vos outils. Ne subissez plus votre informatique, pilotez-la avec Trinexta.",
    buttonText: "Échanger avec un conseiller",
    buttonHref: "/contact"
  }
}

export default function Microsoft365Page() {
  return <ServicePage {...ms365Data} />
}