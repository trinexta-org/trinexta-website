import { ServicePage } from "@/components/services/ServicePage"

export const metadata = {
  title: "Solutions Métier & Téléphonie VoIP : Intégration Stratégique pour TPE/PME | Trinexta",
  description: "Transformez vos processus métiers avec l'expertise Trinexta. Téléphonie VoIP avancée, interconnexion de sites, intégration logicielle et audit de performance IT : pilotez votre entreprise avec des outils parfaitement alignés sur vos objectifs de croissance.",
}

const solutionsData = {
  serviceSlug: "solutions-metier",
  
  hero: {
    titlePart1: "Solutions",
    titlePart2: "Métier", 
    description: "Votre informatique ne doit plus être une contrainte. Chez Trinexta, nous concevons des architectures sur mesure qui épousent votre réalité : téléphonie VoIP, interconnexion de sites et intégration logicielle. Nous transformons la complexité technique en simplicité opérationnelle pour faire de vos outils le socle de votre croissance.",
    ctaText: "Déployer mes solutions métier",
    ctaHref: "/contact"
  },
  
  problem: {
    subtitle: "Le diagnostic : quand votre IT devient un frein invisible",
    title: "Le coût caché de l'hétérogénéité technologique et des silos.",
    description: "La plupart des entreprises qui nous sollicitent souffrent du même mal insidieux : le 'cloisonnement technologique'. Vous disposez probablement d'excellents outils, mais ils fonctionnent en silos hermétiques. Votre logiciel de gestion commerciale ne communique pas avec votre comptabilité, votre standard téléphonique est déconnecté de votre CRM, et vos réseaux inter-sites sont instables ou mal sécurisés. Le résultat est une perte de productivité quotidienne colossale que peu de dirigeants mesurent réellement. Vos équipes passent un temps précieux à effectuer des doubles saisies manuelles, à jongler entre des interfaces incompatibles, ou à attendre après des connexions réseaux erratiques. Cette fragmentation technique n'est pas seulement frustrante, elle crée des failles de sécurité, des erreurs humaines coûteuses et une lenteur décisionnelle qui bride votre potentiel de développement. Votre infrastructure devrait être un tapis roulant fluide pour vos données, une autoroute pour l'information, et non un obstacle à franchir à chaque étape de votre journée. Nous sommes là pour briser ces silos et reconnecter votre entreprise.",
    painPoints: [
      "Processus métier fragmentés : saisies manuelles redondantes entre logiciels non interfacés qui génèrent des erreurs coûteuses.",
      "Téléphonie fixe rigide : incapacité à gérer la mobilité des collaborateurs ou le télétravail, impactant la satisfaction client.",
      "Infrastructure réseau obsolète : lenteurs et instabilités bloquant l'accès aux applications critiques et empêchant la collaboration.",
      "Silos de données : impossibilité d'avoir une vision globale, unifiée et en temps réel de votre activité commerciale.",
      "Coûts opérationnels invisibles : temps perdu par vos équipes à corriger des problèmes de flux d'informations au lieu de créer de la valeur."
    ]
  },
  
  offer: {
    subtitle: "Notre approche : l'ingénierie au service du métier",
    title: "Nos piliers d'intervention pour votre performance globale",
    description: "Notre méthode est radicalement différente : nous ne commençons jamais par la technique, nous commençons par votre métier. Nous analysons vos flux d'informations, vos habitudes de travail et vos points de blocage pour concevoir une architecture technique cohérente et évolutive. Voici comment nous intervenons.",
    features: [
      {
        title: "Téléphonie VoIP Professionnelle de Nouvelle Génération",
        desc: "Nous remplaçons vos lignes analogiques obsolètes par une solution VoIP (Voix sur IP) taillée pour l'entreprise moderne et agile. Vous bénéficiez d'une mobilité totale : vos collaborateurs reçoivent les appels de l'entreprise sur leur mobile, leur PC ou leur poste fixe. Avec des fonctionnalités avancées comme le standard interactif (SVI) personnalisable, la messagerie vocale transmise par email, le transfert d'appels intelligent et des statistiques détaillées, vous améliorez drastiquement votre image professionnelle tout en réduisant vos coûts de communication. C'est la fin du téléphone fixe qui vous lie à votre bureau."
      },
      {
        title: "Architecture réseaux multisites sécurisée et unifiée",
        desc: "L'agrandissement de votre entreprise ne doit pas diviser votre IT. Nous interconnectons vos différents bureaux via des tunnels VPN (Virtual Private Network) de haute sécurité. Vos ressources partagées, vos fichiers serveurs et vos applications métier deviennent accessibles partout, avec la même sécurité, la même fluidité et la même vitesse que si vous étiez tous réunis dans la même pièce. Nous garantissons l'étanchéité des flux et la performance des échanges inter-sites grâce à des routeurs professionnels administrés par nos soins."
      },
      {
        title: "Intégration et interopérabilité logicielle sur mesure",
        desc: "L'information doit circuler sans couture. Nous travaillons à l'intégration de vos différents outils : automatisation des transferts de données, mise en place de connecteurs personnalisés, synchronisation de bases clients... Nous réduisons drastiquement les erreurs de saisie humaine et permettons à vos outils de travailler ensemble. C'est le passage d'une gestion manuelle à un écosystème automatisé où l'information voyage seule, permettant à vos équipes de se concentrer sur la valeur ajoutée client."
      },
      {
        title: "Gestion des accès et connectivité haute disponibilité",
        desc: "L'accès à vos données est le nerf de la guerre. Nous sécurisons les accès à vos applications métier et optimisons votre infrastructure de stockage (NAS/Serveurs locaux ou distants). Nous configurons des règles d'accès strictes pour que chaque collaborateur n'accède qu'aux données nécessaires à ses fonctions, tout en assurant une vitesse d'accès optimale depuis tous vos sites, garantissant ainsi que votre travail ne soit jamais ralenti par l'infrastructure."
      },
      {
        title: "Audit de processus métier et conseil stratégique",
        desc: "La technologie n'est qu'un outil. Avant de déployer la moindre solution, nous réalisons un audit exhaustif de vos processus actuels pour identifier les goulots d'étranglement. Nous vous remettons une feuille de route technologique claire : quels outils garder, quels outils remplacer, et comment les faire interagir pour booster votre rentabilité globale. C'est un véritable travail de consultant IT pour aligner votre technologie sur vos objectifs financiers et commerciaux."
      }
    ]
  },
  
  benefits: {
    subtitle: "Les bénéfices tangibles de notre accompagnement",
    title: "Une transformation durable de votre efficacité opérationnelle",
    items: [
      {
        title: "Agilité et mobilité totales",
        desc: "Vos équipes ne sont plus liées à leur bureau physique. Une téléphonie mobile et des outils connectés permettent de maintenir le même niveau de service client, que vous soyez au bureau, chez un client ou en télétravail. Votre réactivité est démultipliée."
      },
      {
        title: "Gain de temps massif par l'automatisation",
        desc: "Chaque tâche automatisée est une erreur de moins et une minute gagnée pour vos collaborateurs. Nous supprimons la ressaisie manuelle pour transformer vos processus en flux automatisés, fluides et exempts d'erreurs humaines."
      },
      {
        title: "Évolutivité garantie sans douleur",
        desc: "Nos solutions sont conçues pour croître avec vous. Ajoutez un site, un nouvel outil ou plus d'utilisateurs sans remettre en cause toute votre structure. Votre IT devient une fondation solide, pas un assemblage fragile."
      },
      {
        title: "Expertise technique transverse (Vision 360)",
        desc: "Nous maîtrisons autant le réseau que le logiciel. Cette double compétence est indispensable pour garantir que vos outils métier fonctionnent sans jamais faiblir, offrant une stabilité totale à votre organisation."
      }
    ]
  },
  
  faq: [
    {
      question: "Pouvez-vous reprendre une installation de téléphonie existante sans couper le service ?",
      answer: "Absolument. Nous réalisons d'abord un audit complet de votre infrastructure télécom actuelle. Nous migrons vos services vers une solution VoIP moderne en conservant vos numéros habituels. La bascule est préparée en amont pour être transparente pour vos clients : il n'y a aucune interruption d'activité pendant la transition."
    },
    {
      question: "Quelle est la différence entre votre approche réseau et une installation classique ?",
      answer: "Les installateurs classiques se concentrent sur la pose physique (câbles, bornes). Nous, nous concevons une architecture réseau intelligente. Nous segmentons vos flux pour la sécurité (isolant vos invités de votre réseau pro), nous priorisons les flux de voix (VoIP) pour une qualité sonore parfaite, et nous configurons le tout pour être totalement administrable et évolutif."
    },
    {
      question: "Accompagnez-vous les entreprises sur des logiciels très spécifiques (métiers verticaux) ?",
      answer: "Oui, c'est notre spécialité. Nous intervenons sur une grande variété de logiciels métiers : comptabilité, gestion de production, planning médical, outils de caisse, CRM spécialisés. Nous apprenons leur fonctionnement technique pour mieux les intégrer à votre infrastructure, devenant ainsi l'interlocuteur technique idéal pour vos éditeurs."
    },
    {
      question: "L'interconnexion multisite est-elle complexe à gérer pour nous ?",
      answer: "C'est notre métier de rendre cette complexité invisible. Nous utilisons des technologies VPN robustes qui rendent l'accès distant aussi simple et fluide qu'une connexion locale. Vos collaborateurs n'ont besoin d'aucune compétence technique particulière pour accéder aux ressources distantes, tout se fait de manière transparente."
    },
    {
      question: "Quels sont les gains financiers réels d'une telle modernisation ?",
      answer: "Les gains sont triples : d'abord sur la réduction immédiate de vos factures télécoms, ensuite sur le gain de temps massif de vos collaborateurs (qui ne font plus de tâches manuelles et répétitives), et enfin sur la réduction des erreurs de gestion. La plupart de nos clients observent un retour sur investissement significatif en moins de 12 à 18 mois grâce à ces gains cumulés."
    },
    {
      question: "Proposez-vous un support après l'installation des solutions métier ?",
      answer: "Bien sûr. Nous ne vous abandonnons pas une fois le projet déployé. Nous proposons des contrats de maintenance incluant un support technique réactif pour garantir que vos processus métier restent fluides en permanence. Nous surveillons vos équipements pour intervenir préventivement avant qu'une anomalie ne bloque votre activité."
    },
    {
      question: "Comment gérez-vous la formation des équipes après l'installation ?",
      answer: "La technologie n'est efficace que si elle est adoptée. Dans le cadre de nos déploiements de solutions métiers, nous incluons des phases d'accompagnement au changement. Nous formons vos équipes aux bonnes pratiques, leur montrons comment utiliser les nouveaux outils de manière optimale, et restons disponibles pour répondre à leurs questions lors du démarrage."
    },
    {
      question: "Est-ce qu'une solution multisite nécessite un gros investissement matériel ?",
      answer: "Pas nécessairement. Nous privilégions une approche optimisée. Nous auditons ce que vous avez déjà : souvent, nous pouvons réutiliser une partie de votre matériel existant et compléter uniquement par des équipements indispensables pour assurer la sécurité et la performance. Nous cherchons toujours le meilleur compromis entre investissement et efficacité."
    }
  ],

  cta: {
    line1: "Prêt à aligner",
    line2: "vos outils avec",
    line3: "votre ambition ?",
    description: "Ne laissez plus vos outils techniques limiter votre potentiel de croissance. Trinexta conçoit les solutions métier qui soutiennent réellement vos objectifs de développement. Discutons de vos besoins, de vos processus et de vos objectifs lors d'un premier audit complet. Il est temps de passer à une informatique qui travaille pour vous.",
    buttonText: "Échanger sur mon projet",
    buttonHref: "/contact"
  }
}

export default function SolutionsMetierPage() {
  return <ServicePage {...solutionsData} />
}