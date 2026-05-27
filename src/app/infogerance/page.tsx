import { ServicePage } from "@/components/services/ServicePage"

export const metadata = {
  title: "Infogérance Informatique pour TPE et PME | Trinexta",
  description: "Déléguez votre gestion informatique à des experts. Trinexta assure la supervision 24/7, la maintenance proactive et la sécurité de votre parc pour une productivité sans faille.",
}

const infogeranceData = {
  serviceSlug: "infogerance",
  
  hero: {
    titlePart1: "Infogérance",
    titlePart2: "Informatique", 
    description: "Dans un monde où la continuité numérique est le pilier de votre compétitivité, votre informatique ne doit plus être une contrainte, mais un levier. Trinexta propose aux TPE et PME une infogérance complète et réactive. Nous ne nous contentons pas de réparer ; nous bâtissons, surveillons et optimisons votre environnement de travail pour qu'il soit le support fiable et infaillible de votre croissance, tout en éliminant les surprises budgétaires et techniques.",
    ctaText: "Être rappelé pour l'infogérance",
    ctaHref: "/contact"
  },
  
  problem: {
    subtitle: "Fini les pertes de temps et d'énergie",
    title: "Quand on dirige une entreprise, on n'a ni le temps ni l'envie de gérer les problèmes informatiques.",
    description: "Postes qui ralentissent, mises à jour repoussées, conflits logiciels, périphériques capricieux ou incidents qui surviennent au pire moment (souvent juste avant une échéance importante)… ces petits dysfonctionnements accumulés finissent par coûter une fortune en temps de travail, en énergie mentale et en productivité réelle. Si vous passez plus de temps à dépanner votre outil informatique qu'à développer votre chiffre d'affaires, c'est que votre infrastructure actuelle est devenue un poids plutôt qu'un moteur. L'informatique doit être transparente : elle doit fonctionner sans que vous ayez à y penser.",
    painPoints: [
      "Interruptions d'activité constantes liées à des pannes imprévisibles et récurrentes.",
      "Perte de rentabilité due à des équipements obsolètes, lents ou mal configurés qui brident vos équipes.",
      "Stress permanent lié à la gestion des sauvegardes, à la sécurité des données et à la conformité.",
      "Temps précieux perdu à essayer de 'bricoler' une solution soi-même au lieu de se concentrer sur son métier."
    ]
  },
  
  offer: {
    subtitle: "Une plateforme puissante et discrète",
    title: "Ce que l'on fait concrètement pour votre sérénité",
    description: "Notre approche ne repose pas sur le hasard, mais sur une surveillance constante. Nous installons un agent de supervision de pointe sur chaque poste. Cet outil discret mais redoutablement efficace nous transmet en temps réel l'état de santé de vos machines (processeur, mémoire, disque, température, santé du système) pour nous permettre d'agir préventivement, souvent avant même que vous ne perceviez le moindre ralentissement.",
    features: [
      {
        title: "Mises à jour automatisées et sécurisées",
        desc: "L'oubli des mises à jour est la porte ouverte aux vulnérabilités. Nous prenons en charge la gestion complète des correctifs Windows, de vos applications métier et de vos pilotes matériels. Tout se déroule en arrière-plan, sans dépendre d'une action manuelle de vos collaborateurs. Le résultat est mathématique : un parc informatique systématiquement à jour, plus sécurisé, plus performant et plus stable dans la durée."
      },
      {
        title: "Maintenance préventive intelligente",
        desc: "Réparer une panne est toujours plus coûteux et perturbant que de l'éviter. Nous effectuons un nettoyage régulier, une vérification des processus critiques et une optimisation proactive de vos postes. Nous entretenons vos machines en amont pour limiter drastiquement les dysfonctionnements, les bugs, les ralentissements liés à l'usure logicielle et les pannes évitables qui paralysent votre quotidien professionnel."
      },
      {
        title: "Gestion proactive des alertes techniques",
        desc: "Notre plateforme ne dort jamais. Dès qu'un composant montre un signe de faiblesse, qu'un comportement anormal est détecté ou qu'un disque dur commence à saturer, une alerte est immédiatement générée dans nos outils. Cela nous permet d'intervenir à distance avec précision, bien avant qu'une panne ne vienne bloquer réellement votre activité. Vous passez d'une gestion subie à une gestion maîtrisée."
      },
      {
        title: "Inventaire complet et suivi du parc",
        desc: "Comment prendre les bonnes décisions d'équipement si vous ne savez pas exactement ce que vous avez ? Nous tenons un inventaire vivant de votre parc : matériel, logiciels, versions installées, dates d'achat et licences. Cette cartographie précise facilite vos prises de décision, vous permet d'anticiper le renouvellement du matériel et garantit la conformité logicielle de votre entreprise à tout moment."
      },
      {
        title: "Déploiement et support à distance",
        desc: "Besoin d'installer un logiciel sur cinq postes différents ou de modifier un paramètre de sécurité global ? Nous le faisons à distance, sans aucun déplacement physique et sans immobiliser vos équipes. C'est plus rapide, beaucoup plus fluide pour vos collaborateurs, et cela garantit une homogénéité de configuration sur l'ensemble de votre flotte informatique, assurant ainsi une meilleure performance globale."
      }
    ]
  },
  
  benefits: {
    subtitle: "La différence Trinexta",
    title: "De la réaction à l'anticipation proactive",
    items: [
      {
        title: "Surveillance continue 24/7",
        desc: "Fini l'intervention uniquement quand la panne est là et que tout le monde est bloqué. Nous surveillons vos systèmes en permanence et de façon totalement automatisée. Nos experts ont une vision d'ensemble de votre santé informatique, permettant une réactivité que seul un partenaire dédié peut offrir."
      },
      {
        title: "Gestion experte des mises à jour",
        desc: "Les mises à jour système sont complexes et sources de conflits. Elles ne sont plus laissées au hasard ni à la responsabilité des utilisateurs. Elles sont rigoureusement suivies, testées et gérées par nos experts pour garantir la compatibilité totale avec vos outils métier."
      },
      {
        title: "Intervention en amont (Anticipation)",
        desc: "Nous ne courons pas après les problèmes, nous les stoppons avant qu'ils ne surviennent. Nous agissons dès les premiers signaux faibles, avant même que la panne ne vienne interrompre vos services. C'est la clé pour maintenir un niveau de productivité constant sans stress technique."
      },
      {
        title: "Coûts lissés et maîtrisés",
        desc: "Le dépannage à l'acte est par nature imprévisible et souvent très coûteux au moment où vous en avez le plus besoin. Avec l'infogérance Trinexta, votre coût informatique devient clair, lisse et prévisible sur l'année. Vous transformez une charge variable dangereuse en un investissement fixe et maîtrisé, sans aucune mauvaise surprise budgétaire."
      }
    ]
  },
  
  faq: [
    {
      question: "Est-ce que je garde le contrôle sur mes ordinateurs ?",
      answer: "Oui, absolument. Nous ne prenons pas le contrôle sans raison. L’agent de supervision est conçu pour être invisible. Trinexta intervient en arrière-plan et nous ne vous sollicitons que pour ce qui est réellement critique ou si une action nécessite votre validation. Vous restez le propriétaire et le maître de votre infrastructure."
    },
    {
      question: "Est-ce que ça fonctionne aussi pour les postes en télétravail ?",
      answer: "Oui. Aujourd'hui, le télétravail est la norme. Dès lors qu’un poste est connecté à Internet, il est intégré à notre périmètre de supervision. Nous pouvons superviser, maintenir et sécuriser le poste de votre collaborateur, qu'il soit au bureau, à domicile ou en déplacement."
    },
    {
      question: "Combien de postes peut-on gérer avec Trinexta ?",
      answer: "Nous accompagnons les structures dès 1 poste jusqu'aux PME de plus grande taille. Notre force est l'adaptabilité : nous avons conçu nos processus pour offrir une qualité de service de haut niveau, que vous soyez un indépendant ou une structure en forte croissance."
    },
    {
      question: "En combien de temps intervenez-vous en cas de problème critique ?",
      answer: "La réactivité est gravée dans notre ADN. Les incidents sont classés par criticité et pris en charge en priorité via notre support à distance. Dans l'immense majorité des cas, les problèmes sont résolus en quelques minutes, sans aucune interruption notable de votre activité."
    },
    {
      question: "Y a-t-il un engagement de durée contraignant ?",
      answer: "Non. Notre approche est basée sur la satisfaction client et la confiance mutuelle. Nos contrats sont conçus pour être flexibles, car nous savons que la vie d'une TPE/PME peut évoluer rapidement. Nous préférons vous garder parce que le service est excellent, pas parce qu'un contrat vous y oblige."
    },
    {
      question: "Est-ce que l’infogérance est incluse dans l’offre Sérénité ?",
      answer: "Oui, c'est l'essence même de notre offre Sérénité, proposée à partir de 79 € HT/mois par poste. Tout est inclus : surveillance 24/7, maintenance proactive, gestion des mises à jour et support illimité. C'est le pack complet pour transformer votre informatique en un support fiable et performant."
    },
    {
      question: "Comment gérez-vous la sécurité des données sensibles ?",
      answer: "La sécurité est au cœur de notre approche. Toutes nos interventions, qu'elles soient de maintenance ou de support, respectent les normes les plus strictes. Nous appliquons des protocoles de chiffrement et de contrôle d'accès rigoureux pour garantir que vos données restent confidentielles et protégées en toute circonstance."
    },
    {
      question: "Pouvez-vous gérer le renouvellement de mon matériel ?",
      answer: "Oui, grâce à l'inventaire que nous tenons, nous sommes en mesure de vous conseiller sur le renouvellement de votre parc. Nous vous aidons à choisir le matériel le plus adapté à vos besoins réels, évitant ainsi les surcoûts inutiles tout en garantissant la performance."
    }
  ],

  cta: {
    title: "Prêt à transformer votre informatique en atout stratégique ?",
    description: "Votre informatique ne doit plus être un sujet subi, mais un support fiable et performant de votre activité. Nos experts sont prêts à auditer vos besoins et à construire un cadre d'intervention clair et sur mesure pour votre entreprise.",
    buttonText: "Échanger avec un conseiller",
    buttonHref: "/contact"
  }
}

export default function InfogerancePage() {
  return <ServicePage {...infogeranceData} />
}