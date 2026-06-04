import type { ServicePageProps } from "@/components/services/ServicePage";

export const cybersecuriteData: ServicePageProps = {
  serviceSlug: "cybersecurite",

  hero: {
    titlePart1: "Cybersécurité",
    titlePart2: "Proactive",
    description: "Dans un paysage numérique où les menaces évoluent chaque jour, la sécurité de votre entreprise ne peut plus être une option, ni un sujet réservé aux grands groupes. Trinexta vous propose une cybersécurité conçue spécifiquement pour les TPE et PME : une protection efficace, invisible et surtout simple à gérer au quotidien. Nous combinons des technologies de pointe (EDR et IA) avec une approche humaine pour sécuriser vos données, vos accès et votre activité, sans jargon inutile et sans alourdir votre quotidien technique.",
    ctaText: "Contactez-nous pour protéger votre entreprise",
    ctaHref: "/contact",
  },

  problem: {
    subtitle: "Une menace bien réelle et évolutive",
    title: "Les cyberattaques ne concernent plus seulement les grandes entreprises.",
    description: "Il est temps de déconstruire le mythe selon lequel les petites structures sont 'trop petites pour être ciblées'. Au contraire, les TPE et PME sont devenues les cibles privilégiées des cybercriminels, précisément parce qu'elles disposent souvent de moins de ressources de protection. Une seule attaque, un seul ransomware, peut suffire à paralyser votre activité, détruire des années de travail et mettre en péril la pérennité financière de votre société. Les menaces actuelles — ransomwares, phishing sophistiqué, vol d'identités — évoluent à une vitesse fulgurante. Les antivirus classiques, basés sur des signatures connues, sont désormais dépassés. Si vous n'êtes pas préparés, vous n'êtes pas protégés.",
    painPoints: [
      "Ransomwares capables de chiffrer l'intégralité de vos fichiers et de bloquer votre production en quelques minutes.",
      "Campagnes de phishing ultra-réalistes qui piègent vos collaborateurs les plus vigilants.",
      "Logiciels malveillants 'Zero-Day' (inconnus) capables de se propager d'un poste à l'autre sans alerter les systèmes traditionnels.",
      "Conséquences lourdes : pertes de données, amendes RGPD, arrêt forcé de l'activité et dégradation irrémédiable de votre réputation.",
    ],
  },

  offer: {
    subtitle: "EDR + Intelligence Artificielle : Le bouclier moderne",
    title: "Une protection automatisée, intelligente et infaillible",
    description: "Notre solution ne se contente pas de 'chercher des virus'. Nous déployons une solution d'EDR (Endpoint Detection & Response) enrichie par l'Intelligence Artificielle. Contrairement à un antivirus classique qui attend qu'une menace soit identifiée pour agir, notre système surveille en permanence le comportement réel de vos machines pour détecter les anomalies en temps réel, même s'il s'agit d'une attaque totalement inédite.",
    features: [
      {
        title: "Surveillance temps réel 24/7",
        desc: "L'activité de chaque poste de travail est analysée en continu, sans interruption. Notre plateforme de surveillance identifie les moindres écarts dans le fonctionnement normal de vos ordinateurs : processus suspects, connexions réseau anormales ou tentatives d'exécution de fichiers illégitimes. Vous bénéficiez d'une veille permanente qui ne dort jamais, garantissant une réactivité immédiate face aux signaux faibles.",
      },
      {
        title: "Détection comportementale par IA",
        desc: "La force de notre système réside dans l'analyse comportementale. Plutôt que de chercher des 'signatures' connues (ce qui est inutile face aux nouvelles menaces), notre intelligence artificielle apprend ce qu'est un comportement sain pour vos machines. Dès qu'une action dévie de cette norme, le système la qualifie de suspecte et peut l'interrompre instantanément, stoppant ainsi les menaces les plus furtives.",
      },
      {
        title: "Réponse automatique et isolation",
        desc: "En cas de menace avérée, le temps est votre allié le plus précieux. Notre solution ne se contente pas de vous envoyer une alerte ; elle peut réagir de manière autonome. Elle peut isoler instantanément un poste infecté du reste de votre réseau, bloquer l'exécution d'un processus dangereux et stopper net la propagation de l'attaque avant qu'elle n'atteigne vos serveurs ou données critiques.",
      },
      {
        title: "Bouclier anti-ransomware actif",
        desc: "Le ransomware est l'ennemi numéro un des TPE/PME. Notre bouclier détecte en temps réel les schémas de chiffrement de fichiers caractéristiques des attaques par ransomware. Non seulement le système bloque l'attaque, mais dans de nombreux cas, il permet d'engager une restauration automatique des fichiers touchés, réduisant ainsi drastiquement l'impact sur votre continuité de service.",
      },
      {
        title: "Défense robuste contre le phishing",
        desc: "L'humain reste le maillon le plus vulnérable de la chaîne de sécurité. Nos outils renforcent la détection des e-mails frauduleux, des liens piégés et des sites de phishing sophistiqués qui imitent les services légitimes (Microsoft 365, banques, etc.). Nous protégeons ainsi vos accès, vos mots de passe et vos données sensibles contre l'ingénierie sociale.",
      },
    ],
  },

  benefits: {
    subtitle: "La différence Trinexta",
    title: "Une sécurité pensée pour votre sérénité d'esprit",
    items: [
      {
        title: "Protection continue et totale",
        desc: "Vos postes ne sont pas protégés seulement lors des analyses planifiées. Ils sont sous surveillance 24h/24 et 7j/7. Nous allons bien au-delà de la simple analyse de fichiers statiques pour monitorer l'activité réelle de votre infrastructure.",
      },
      {
        title: "Réactivité immédiate et automatisée",
        desc: "L'automatisation intelligente permet de neutraliser les menaces à une vitesse qu'aucune équipe humaine, aussi compétente soit-elle, ne pourrait égaler. La propagation de l'incident est stoppée net, limitant les dégâts à leur plus simple expression.",
      },
      {
        title: "Simplicité de gestion radicale",
        desc: "La cybersécurité est souvent perçue comme une 'usine à gaz'. Chez Trinexta, nous supprimons cette complexité. Pas de jargon technique, pas de configurations complexes à gérer pour vous. Tout est géré en arrière-plan, vous laissant vous concentrer sur votre cœur de métier.",
      },
      {
        title: "Intégration totale et transparente",
        desc: "La protection EDR est incluse directement dans nos offres de maintenance. Il n'y a pas d'option cachée, pas de surcoût surprise. Vous bénéficiez d'une cybersécurité cohérente, robuste et pleinement intégrée à votre accompagnement informatique global.",
      },
    ],
  },

  faq: [
    {
      question: "Quelle est la différence fondamentale avec un antivirus classique ?",
      answer: "Un antivirus traditionnel agit comme un filtre : il compare vos fichiers à une base de données de menaces connues. Si une attaque est nouvelle (Zero-Day), il ne la verra pas. Notre solution EDR (Endpoint Detection & Response) agit comme un gardien : elle analyse ce que les programmes 'font' en temps réel. Si un logiciel se comporte anormalement, il est bloqué, qu'il soit connu ou non.",
    },
    {
      question: "Est-ce que cette protection ralentit mes ordinateurs ?",
      answer: "Pas du tout. Notre technologie a été sélectionnée pour être extrêmement légère. Elle fonctionne en arrière-plan avec une empreinte processeur minimale. Vous ne remarquerez absolument aucune différence de fluidité dans votre travail quotidien, même sur des machines plus anciennes.",
    },
    {
      question: "Que se passe-t-il concrètement si un ransomware attaque ?",
      answer: "Si un ransomware tente de chiffrer vos données, notre système détecte immédiatement l'anomalie. Il bloque instantanément le processus malveillant. Si des fichiers ont été touchés avant le blocage, la solution permet, selon le scénario, une restauration automatique ou assistée pour remettre vos documents dans leur état initial avant l'attaque.",
    },
    {
      question: "Cette protection est-elle incluse dans l'offre TRINEXTA ?",
      answer: "Absolument. Chez Trinexta, nous considérons la sécurité comme un pilier de la maintenance. La protection EDR enrichie par l'IA est directement intégrée dans nos offres de services. Vous n'avez pas besoin d'ajouter des couches complexes de sécurité externes.",
    },
    {
      question: "Est-ce que cela protège aussi contre les erreurs humaines ?",
      answer: "La cybersécurité est un tout. Bien que notre solution technique bloque l'exécution de menaces (phishing, malwares), nous intégrons des bonnes pratiques au sein de nos services pour vous aider à réduire le risque lié à l'erreur humaine. Notre solution EDR aide à limiter les conséquences catastrophiques d'un clic malheureux.",
    },
    {
      question: "La solution est-elle conforme aux réglementations comme le RGPD ?",
      answer: "Oui, utiliser une solution de cybersécurité moderne comme la nôtre est un excellent moyen de répondre à vos obligations de protection des données imposées par le RGPD. Vous garantissez ainsi la sécurité des données personnelles que vous manipulez, ce qui est un point de contrôle majeur lors d'audits.",
    },
    {
      question: "Comment gérez-vous les alertes ? Dois-je faire quelque chose ?",
      answer: "C'est là toute la puissance de notre accompagnement. En cas d'alerte critique, nos équipes techniques sont immédiatement notifiées. Nous analysons la situation, levons le doute, et intervenons si nécessaire. Vous n'avez aucune alerte technique à gérer : nous nous occupons de tout pour vous laisser l'esprit libre.",
    },
    {
      question: "Est-ce compatible avec tous mes logiciels métier ?",
      answer: "Oui, notre solution est conçue pour être transparente avec les applications métier courantes (Sage, EBP, outils de caisse, CRM, etc.). Elle surveille les comportements malveillants sans interférer avec le fonctionnement légitime de vos outils professionnels.",
    },
  ],

  cta: {
    line1: "Prêt à",
    line2: "blinder",
    line3: "vos systèmes ?",
    description: "La cybersécurité n'est pas un luxe, c'est une nécessité stratégique. Ne laissez pas une faille informatique mettre en péril vos années de travail et votre activité. Nos experts sont prêts à auditer votre niveau de protection actuel et à mettre en place le bouclier dont vous avez besoin.",
    buttonText: "Sécuriser mon entreprise",
    buttonHref: "/contact",
  },
};
