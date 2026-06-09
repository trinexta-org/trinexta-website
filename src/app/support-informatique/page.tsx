import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"

export const metadata: Metadata = {
  title: "Support Informatique Expert pour TPE et PME",
  description: "Assistance technique complète : postes, logiciels métier et outils collaboratifs. Trinexta est votre partenaire de confiance pour résoudre vos pannes et sécuriser votre productivité au quotidien.",
  alternates: {
    canonical: "/support-informatique",
  },
  openGraph: {
    title: "Support Informatique Expert pour TPE et PME | Trinexta",
    description: "Assistance technique complète : postes, logiciels métier et outils collaboratifs. Trinexta est votre partenaire de confiance pour résoudre vos pannes et sécuriser votre productivité au quotidien.",
    url: "/support-informatique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Informatique Expert pour TPE et PME | Trinexta",
    description: "Assistance technique complète : postes, logiciels métier et outils collaboratifs. Trinexta est votre partenaire de confiance pour résoudre vos pannes et sécuriser votre productivité au quotidien.",
    images: ["/images/og-default.png"],
  },
}

const supportData = {
  serviceSlug: "support-informatique",
  
  hero: {
    titlePart1: "Support",
    titlePart2: "Informatique", 
    description: "Un ordinateur qui bloque, un logiciel récalcitrant, une imprimante déconnectée ? Ces incidents, bien que mineurs en apparence, sont les premiers freins à la croissance de votre entreprise. Ne perdez plus de temps à jouer les techniciens par défaut. Trinexta intervient avec réactivité pour résoudre vos problèmes techniques et assurer la continuité totale de votre activité, vous permettant ainsi de vous concentrer exclusivement sur votre cœur de métier.",
    ctaText: "Obtenir une assistance réactive",
    ctaHref: "/contact"
  },
  
  problem: {
    subtitle: "Fini la solitude face à l'informatique",
    title: "Quand un problème survient, vous n'avez pas besoin d'un parcours du combattant.",
    description: "Un standard téléphonique impersonnel, des temps d'attente interminables, ou devoir expliquer dix fois le même problème à des interlocuteurs différents... c'est ce qui épuise votre productivité et fragilise votre moral. Votre informatique devrait être un levier de croissance, une force tranquille sur laquelle vous pouvez vous appuyer, et non une source de frustration quotidienne qui accapare votre énergie et celle de vos équipes.",
    painPoints: [
      "Perte de temps massive face à des pannes imprévues qui bloquent vos processus métier.",
      "Frustration liée à l'impossibilité de joindre un expert compétent et de recevoir une réponse claire.",
      "Difficulté chronique à faire le lien avec les éditeurs de logiciels lorsque la solution technique dépasse le cadre du matériel.",
      "Fatigue mentale et baisse de motivation causée par des blocages récurrents sur vos outils de travail essentiels."
    ]
  },
  
  offer: {
    subtitle: "Une assistance pensée pour l'humain et la performance",
    title: "Ce que l'on fait concrètement",
    description: "Nous ne sommes pas de simples techniciens, nous sommes vos alliés. Du dépannage d'urgence à la gestion complexe de vos logiciels métier, nous prenons le sujet en main jusqu'à la résolution complète, pour vous garantir une tranquillité d'esprit totale.",
    features: [
      {
        title: "Support Multi-canal Réactif",
        desc: "Nous ne nous limitons pas à un simple numéro de téléphone. Accédez à notre assistance via téléphone, email ou notre portail de ticketing dédié pour un suivi clair, centralisé et transparent de toutes vos demandes. Chaque ticket est traité avec le même souci d'efficacité, assurant une traçabilité complète de vos besoins et de nos interventions."
      },
      {
        title: "Intervention technique à distance",
        desc: "Grâce à des outils de prise en main sécurisés, nous diagnostiquons et résolvons vos blocages en temps réel. Cette méthode permet une réactivité quasi-instantanée, sans les délais et les coûts d'une intervention physique, tout en évitant d'immobiliser vos équipes au bureau."
      },
      {
        title: "Accompagnement expert logiciel métier",
        desc: "C'est notre vraie valeur ajoutée. Comptabilité, caisse, facturation... nous analysons le problème avec vous et, si le sujet dépasse le cadre informatique pur, nous contactons l'éditeur à votre place. Vous n'avez plus à jongler entre plusieurs prestataires, nous devenons votre point d'entrée unique."
      },
      {
        title: "Gestion de bout en bout",
        desc: "Notre mission ne s'arrête pas à l'ouverture d'un ticket. Nous prenons en charge la totalité de la chaîne : diagnostic, communication avec les tiers, suivi des dossiers et validation finale de la résolution. Vous restez informé, mais vous ne portez plus la charge administrative du problème."
      },
      {
        title: "Historique et capitalisation technique",
        desc: "Chaque intervention est rigoureusement documentée dans votre dossier technique. Si une difficulté se reproduit, nous possédons déjà l'historique de la résolution, ce qui nous permet de gagner un temps précieux et d'éviter les allers-retours inutiles."
      }
    ]
  },
  
  benefits: {
    subtitle: "La différence Trinexta",
    title: "Un seul interlocuteur pour tout votre support",
    items: [
      {
        title: "Assistance illimitée",
        desc: "Nous avons banni les compteurs de temps. Le support est illimité sur le périmètre couvert pour vous permettre de travailler sereinement, sans avoir peur de 'dépasser votre forfait' à chaque question."
      },
      {
        title: "Intermédiation avec vos éditeurs",
        desc: "Nous faisons l'interface avec vos éditeurs de logiciels métier. Nous parlons technique pour vous, traduisons les besoins et exigeons des solutions, vous libérant ainsi de cette contrainte chronophage."
      },
      {
        title: "Réactivité et clarté",
        desc: "Obtenez un diagnostic rapide avec un interlocuteur compétent. Nous communiquons sans jargon inutile et nous nous engageons sur une résolution efficace pour maintenir votre productivité."
      },
      {
        title: "Suivi rigoureux et proactif",
        desc: "Nous conservons l'historique de chaque incident pour accélérer les interventions futures et surtout, pour identifier les causes racines et prévenir les récidives."
      }
    ]
  },
  
  faq: [
    {
      question: "Le support est-il vraiment illimité ?",
      answer: "Oui. Vous pouvez nous contacter autant de fois que nécessaire par téléphone, e-mail ou via notre portail de ticketing, dans le cadre du périmètre informatique défini. Notre modèle est basé sur la tranquillité de nos clients, et non sur la facturation à l'acte."
    },
    {
      question: "Gérez-vous vraiment les problèmes liés aux logiciels métier ?",
      answer: "C'est une spécialité de Trinexta. Nous comprenons que pour vous, le problème est global. Si un logiciel métier ne fonctionne pas, nous analysons le dysfonctionnement. Si cela concerne un éditeur tiers, nous prenons en charge la communication et le suivi technique avec eux pour vous."
    },
    {
      question: "Quels types de logiciels métier prenez-vous en charge ?",
      answer: "Nous accompagnons tout type d'outil quotidien : logiciel de comptabilité (Sage, EBP, etc.), outil de point de vente et caisse, logiciel de planning, outil de facturation, outils de messagerie spécialisés, et bien d'autres."
    },
    {
      question: "Intervenez-vous sur site si besoin ?",
      answer: "Le support est principalement distant pour garantir une réactivité immédiate et une résolution rapide. Si une intervention physique sur site s'avère nécessaire pour résoudre une panne matérielle majeure, nous planifions l'intervention avec vous selon les modalités de votre contrat."
    },
    {
      question: "Quels sont les horaires du support ?",
      answer: "Nos équipes sont disponibles pendant vos heures d'ouverture habituelles pour assurer une continuité de service alignée avec votre activité. Nous avons mis en place des processus pour que vos urgences soient traitées avec la priorité nécessaire."
    },
    {
      question: "Comment est assurée la sécurité de la prise en main à distance ?",
      answer: "La sécurité est notre priorité. Nos outils de prise en main à distance sont hautement sécurisés, cryptés et ne permettent une connexion qu'avec votre autorisation explicite et ponctuelle pour chaque intervention."
    },
    {
      question: "Puis-je suivre l'état d'avancement de mes tickets ?",
      answer: "Oui, notre portail de ticketing vous offre une visibilité totale sur l'historique de vos demandes et leur statut actuel. Vous savez en temps réel qui travaille sur votre dossier et quelle est la prochaine étape."
    },
    {
      question: "Comment se passe la transition avec mon prestataire actuel ?",
      answer: "La transition est gérée en douceur. Nous effectuons un audit de votre parc et de vos accès pour prendre le relais sans coupure. Nous nous assurons que tous les paramètres critiques sont récupérés pour garantir un service immédiat."
    }
  ],

  cta: {
    line1: "Un problème",
    line2: "informatique",
    line3: "récurrent ?",
    description: "Libérez-vous définitivement de la gestion technique et des pannes stressantes. Confiez votre support informatique à Trinexta, transformez votre quotidien, et retrouvez enfin la sérénité nécessaire pour diriger votre entreprise.",
    buttonText: "Démarrer votre support",
    buttonHref: "/contact"
  }
}

export default function SupportInformatiquePage() {
  return <ServicePage {...supportData} />
}