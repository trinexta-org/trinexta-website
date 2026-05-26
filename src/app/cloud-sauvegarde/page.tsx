import { ServicePage } from "@/components/services/ServicePage"

export const metadata = {
  title: "Cloud & Sauvegarde pour TPE/PME | Trinexta",
  description: "Modernisez votre infrastructure avec le Cloud Trinexta. Sauvegardes immuables, serveurs dédiés, accès distants sécurisés et plan de reprise d'activité (PRA).",
}

const cloudData = {
  serviceSlug: "cloud-sauvegarde",
  
  hero: {
    titlePart1: "Cloud &",
    titlePart2: "Sauvegarde", 
    description: "La donnée est le moteur de votre entreprise : si elle s'arrête, vous vous arrêtez. Trinexta modernise votre infrastructure pour vous offrir une disponibilité totale et une résilience à toute épreuve. Que ce soit via des solutions de stockage sécurisées, des accès distants optimisés ou des stratégies de sauvegarde avancées, nous construisons un socle numérique sur lequel vous pouvez bâtir votre croissance en toute confiance.",
    ctaText: "Sécuriser mes données",
    ctaHref: "/contact"
  },
  
  problem: {
    subtitle: "Ne jouez pas avec votre survie numérique",
    title: "La perte de données est le risque numéro un des TPE et PME.",
    description: "Une suppression accidentelle, une défaillance matérielle imprévue ou une cyberattaque ciblée… sans stratégie de sauvegarde solide, l'incident devient une catastrophe. De nombreuses entreprises pensent être protégées par une simple copie de fichier, mais découvrent trop tard qu'elles ne peuvent pas restaurer leur activité. Le problème n'est pas seulement de stocker, mais de garantir que vos données restent accessibles et intègrent le cœur de votre stratégie de survie.",
    painPoints: [
      "Absence de stratégie de sauvegarde garantissant une restauration rapide en cas de sinistre.",
      "Risque d'interruption totale d'activité lors d'une panne serveur ou d'un incident réseau.",
      "Difficultés à accéder à vos fichiers de travail en situation de télétravail ou de mobilité.",
      "Complexité à gérer des infrastructures de stockage locales coûteuses et souvent obsolètes."
    ]
  },
  
  offer: {
    subtitle: "Infrastructure résiliente et collaborative",
    title: "Ce que l'on fait concrètement",
    description: "Nous ne nous contentons pas de louer du stockage. Nous concevons une infrastructure hybride intelligente qui combine la performance du stockage local avec la sécurité et la flexibilité du cloud. Chaque solution est pensée pour respecter la souveraineté de vos données et garantir votre agilité.",
    features: [
      {
        title: "Stratégie de sauvegarde 3-2-1",
        desc: "La règle d'or pour ne jamais perdre vos données : nous mettons en place 3 copies, sur 2 supports différents, dont 1 hors-site (cloud sécurisé). Cela garantit que même en cas d'incendie, de vol ou de crypto-virus, vos données sont saines et restaurables rapidement."
      },
      {
        title: "Stockage NAS et serveurs locaux",
        desc: "Pour les besoins de haute performance et de rapidité, nous optimisons vos serveurs de fichiers locaux (NAS). Ils permettent un accès instantané à vos données au bureau, tout en étant synchronisés automatiquement vers le cloud pour une sécurité totale."
      },
      {
        title: "VPN et Accès Distant Sécurisé",
        desc: "Le Cloud, c'est aussi pouvoir travailler partout. Nous configurons des tunnels VPN (Virtual Private Network) sécurisés pour que vos collaborateurs accèdent à leurs dossiers et applications d'entreprise depuis n'importe où, comme s'ils étaient au bureau, avec un chiffrement de bout en bout."
      },
      {
        title: "Plan de Reprise d'Activité (PRA)",
        desc: "Anticiper l'imprévisible, c'est ce qui différencie une TPE qui survit d'une TPE qui disparaît après un incident. Nous définissons ensemble un protocole clair : combien de temps pouvez-vous rester à l'arrêt ? Nous mettons en œuvre les mécanismes pour minimiser ce délai et redémarrer au plus vite."
      },
      {
        title: "Hébergement et Cloud Souverain",
        desc: "Nous privilégions des solutions d'hébergement respectueuses de vos données. Nous évitons la dépendance totale aux solutions étrangères quand cela est possible, en favorisant des infrastructures robustes et conformes aux exigences de sécurité européennes."
      }
    ]
  },
  
  benefits: {
    subtitle: "La différence Trinexta",
    title: "Une infrastructure qui vous rend plus agile",
    items: [
      {
        title: "Disponibilité garantie",
        desc: "Vos données sont accessibles quand vous en avez besoin. Nos architectures sont conçues pour éliminer les points de défaillance uniques et assurer une continuité permanente."
      },
      {
        title: "Sécurité et conformité",
        desc: "Nous intégrons des protocoles de chiffrement et des politiques de gestion des droits d'accès pour que vos fichiers sensibles ne soient accessibles qu'aux bonnes personnes."
      },
      {
        title: "Économie de ressources",
        desc: "Nous optimisons vos investissements matériels. Avant de recommander un serveur coûteux, nous vérifions si des solutions cloud ou de virtualisation ne seraient pas plus efficaces et économiques pour vous."
      },
      {
        title: "Sérénité totale",
        desc: "Vous n'avez plus à vous soucier des sauvegardes qui tournent (ou non) dans votre coin. Nous monitorons l'intégrité de vos données chaque jour, nous gérons les restaurations et nous vous alertons immédiatement en cas de doute."
      }
    ]
  },
  
  faq: [
    {
      question: "Quelle est la différence entre une sauvegarde et une synchronisation ?",
      answer: "C'est une confusion fréquente. La synchronisation (comme avec Dropbox ou OneDrive) reflète vos fichiers : si vous supprimez un fichier par erreur, il est aussi supprimé dans le cloud. La sauvegarde est une copie immuable de vos données à un instant T. Seule la sauvegarde permet de revenir en arrière après une erreur humaine ou une attaque."
    },
    {
      question: "Où sont stockées mes données ?",
      answer: "Nous privilégions des solutions de stockage géographiquement sécurisées. En fonction de vos besoins en souveraineté, nous choisissons des centres de données offrant les garanties de confidentialité et de sécurité les plus strictes."
    },
    {
      question: "Le cloud, est-ce vraiment sécurisé ?",
      answer: "Le cloud est souvent bien plus sécurisé que des serveurs physiques gérés manuellement dans un bureau. Nos solutions cloud intègrent des couches de sécurité (chiffrement au repos, MFA, détection d'anomalies) impossibles à mettre en place soi-même."
    },
    {
      question: "Combien de temps faut-il pour restaurer mes données ?",
      answer: "Cela dépend du volume de données et de la méthode de restauration. Dans le cadre de votre Plan de Reprise d'Activité (PRA), nous définissons des objectifs de temps (RTO) pour garantir que vous puissiez redémarrer votre activité le plus rapidement possible."
    },
    {
      question: "Puis-je accéder à mes fichiers sans connexion internet ?",
      answer: "Grâce à notre approche hybride, les fichiers critiques peuvent être conservés en cache local sur vos machines ou votre serveur. Vous conservez ainsi un accès minimal à vos documents de travail, même en cas de coupure réseau temporaire."
    },
    {
      question: "Quelle est la différence avec Office 365 OneDrive/SharePoint ?",
      answer: "OneDrive et SharePoint sont des outils de collaboration formidables, mais ils ne remplacent pas une stratégie de sauvegarde externalisée. Nous utilisons ces outils pour le quotidien, tout en les complétant avec des solutions de sauvegarde professionnelles garantissant une restauration à long terme."
    }
  ],

  cta: {
    title: "Vos données sont votre capital. Protégez-les.",
    description: "Ne laissez pas votre avenir dépendre d'une simple panne matérielle. Nos experts sont là pour concevoir une infrastructure cloud et une stratégie de sauvegarde taillées pour la résilience de votre entreprise.",
    buttonText: "Sécuriser mes données",
    buttonHref: "/contact"
  }
}

export default function CloudSauvegardePage() {
  return <ServicePage {...cloudData} />
}