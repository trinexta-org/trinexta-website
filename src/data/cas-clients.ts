export type CaseClientSector = "cabinet" | "commerce" | "industrie" | "service" | "association"

export interface CaseClientMetric {
  indicator: string
  before: string
  after: string
}

export interface CaseClientService {
  label: string
  href: string
  content: string
}

export interface CaseClient {
  slug: string
  label: string
  clientName: string
  sector: CaseClientSector
  sectorLabel: string
  size: string
  heroImage: string
  cardImage: string
  metaDescription: string
  /** Title SEO quand il differe du H1 (title). Le template ajoute " | TRINEXTA". */
  seoTitle?: string
  cardChallenge: string
  cardResult: string
  title: string
  context: string[]
  challenges: string[]
  solutions: CaseClientService[]
  benefits: string[]
  metrics: CaseClientMetric[]
  // Cas mis en vedette (accueil, haut de /cas-clients, première slide du hero)
  featured?: { badge: string; teaser: string }
}

export const caseClientSectors = [
  { value: "all", label: "Tous" },
  { value: "cabinet", label: "Cabinet" },
  { value: "commerce", label: "Commerce" },
  { value: "industrie", label: "Industrie" },
  { value: "service", label: "Service" },
  { value: "association", label: "Association" },
] as const

export const caseClients: CaseClient[] = [
  {
    slug: "cybersecurite-tpe-essonne",
    label: "Cas n°1",
    clientName: "TPE de conseil",
    sector: "cabinet",
    sectorLabel: "Cabinet",
    size: "TPE",
    heroImage: "/images/cas-clients/cas-1.avif",
    cardImage: "/images/cas-clients/cas-1.avif",
    metaDescription:
      "Découvrez comment TRINEXTA a sécurisé les données d'une TPE de conseil : migration Windows 11 Pro, chiffrement BitLocker et support IT illimité.",
    cardChallenge:
      "Windows Famille, sans chiffrement, sans support. Chaque incident tombait directement sur les épaules des dirigeants.",
    cardResult:
      "Postes chiffrés, parc suivi, support disponible. L'informatique est devenue quelque chose qu'on gère, pas qu'on subit.",
    title:
      "Des postes grand public transformés en environnement pro",
    context: [
      "Une TPE spécialisée dans le conseil gérait son activité sur des postes sous Windows Famille. Cette configuration limitait l'accès aux fonctionnalités professionnelles et exposait l'entreprise à des risques de sécurité accrus.",
      "Sans service informatique interne, chaque mise à jour devenait une source de stress pour les dirigeants. L'informatique était subie au lieu d'être encadrée.",
      "L'enjeu principal n'était pas d'ajouter des couches complexes, mais de remettre une base professionnelle, stable et sécurisée sous les postes de travail.",
    ],
    challenges: [
      "Postes sous Windows Famille, peu adaptés à un usage professionnel structuré.",
      "Accès limité aux fonctionnalités de sécurité et d'administration.",
      "Risque accru sur les données de l'entreprise.",
      "Absence de support IT interne pour absorber les incidents et mises à jour.",
    ],
    solutions: [
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content:
          "Migration Windows 11 Pro avec installation de licences officielles et activation du chiffrement BitLocker pour professionnaliser les postes et protéger les données.",
      },
      {
        label: "Cybersécurité",
        href: "/cybersecurite",
        content:
          "Intégration à Azure AD pour une gestion plus sécurisée des accès et des identités, avec une base cohérente pour le pilotage de la sécurité.",
      },
      {
        label: "Infogérance",
        href: "/infogerance",
        content:
          "Support illimité, intervention prioritaire en cas de panne critique, maintenance proactive, surveillance constante et antivirus de nouvelle génération.",
      },
    ],
    benefits: [
      "Sécurité renforcée : données chiffrées et réduction drastique des risques de cyberattaques.",
      "Productivité accrue : un système plus stable permet aux collaborateurs de rester concentrés sur leur cœur de métier.",
      "Maîtrise des coûts : un abonnement clair, sans surprise, plus rentable qu'un recrutement interne.",
    ],
    metrics: [
      { indicator: "Postes migrés", before: "Windows Famille", after: "Windows 11 Pro" },
      { indicator: "Chiffrement des données", before: "Non", after: "Oui, BitLocker" },
      { indicator: "Support IT", before: "Ponctuel", after: "Illimité" },
    ],
  },
  {
    slug: "modernisation-it-pme-essonne",
    label: "Cas n°2",
    clientName: "Société de services",
    sector: "service",
    sectorLabel: "Service",
    size: "5 postes",
    heroImage: "/images/cas-clients/cas2-modernisation.avif",
    cardImage: "/images/cas-clients/cas2-modernisation.avif",
    metaDescription:
      "Modernisation IT d'une société de services : passage d'Office 2007 à Microsoft 365, upgrade RAM 16Go et déploiement de stations de travail Dell 27\".",
    cardChallenge:
      "Office 2007, 8 Go de RAM saturés au repos, sauvegardes sur clé USB. La machine tournait, mais à quel prix.",
    cardResult:
      "16 Go, Microsoft 365, écrans Dell 27\". Même budget, autre confort, et moins de risques sur les données.",
    title:
      "Moderniser cinq postes sans remplacer tout le parc",
    context: [
      "Cette société de services disposait de 5 PC sous Windows Famille avec seulement 8 Go de RAM, saturant à 80% au repos. Le quotidien était freiné par les ralentissements et les blocages logiciels.",
      "Le travail sur Office 2007 et les sauvegardes sur clés USB ou disques durs externes créaient aussi un risque critique de perte de données.",
      "Plutôt que de remplacer tout le parc, l'objectif a été de moderniser intelligemment l'existant pour retrouver de la performance, du confort et un meilleur cadre de sécurité.",
    ],
    challenges: [
      "Machines limitées à 8 Go de RAM avec saturation importante au repos.",
      "Usage d'Office 2007, trop ancien pour des besoins de collaboration modernes.",
      "Sauvegardes dispersées sur clés USB et disques externes.",
      "Postes de travail peu ergonomiques pour un usage quotidien soutenu.",
    ],
    solutions: [
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content:
          "Création d'un tenant Microsoft 365 avec adresses mails professionnelles et signatures unifiées pour renforcer à la fois les usages collaboratifs et l'image de marque.",
      },
      {
        label: "Support informatique",
        href: "/support-informatique",
        content:
          "Passage des postes à 16 Go de RAM DDR4 pour redonner de la fluidité aux applications et stabiliser le quotidien des utilisateurs.",
      },
      {
        label: "Infogérance",
        href: "/infogerance",
        content:
          "Remplacement des anciens écrans par des moniteurs Dell 27 pouces avec docking intégré, complété par un accompagnement Sérénité avec support illimité, maintenance préventive et pack cybersécurité.",
      },
    ],
    benefits: [
      "Gain de temps : fin des ralentissements et des blocages logiciels récurrents.",
      "Sécurité moderne : abandon progressif des clés USB au profit d'un stockage Cloud plus sécurisé.",
      "Économie circulaire : prolongation de la durée de vie du matériel à moindre coût par rapport à un achat neuf.",
    ],
    metrics: [
      { indicator: "Mémoire vive", before: "8 Go", after: "16 Go DDR4" },
      { indicator: "Suite bureautique", before: "Office 2007", after: "Microsoft 365" },
      { indicator: "Poste de travail", before: "Écrans vieillissants", after: "Dell 27\" + docking" },
    ],
  },
  {
    slug: "migration-cloud-tpe-essonne",
    label: "Cas n°3",
    clientName: "TPE en transformation digitale",
    sector: "service",
    sectorLabel: "Service",
    size: "TPE",
    heroImage: "/images/cas-clients/cas-3.avif",
    cardImage: "/images/cas-clients/cas-3.avif",
    metaDescription:
      "Étude de cas : migration réussie d'OVH vers Microsoft 365 pour une TPE. Optimisation des processus collaboratifs et sécurisation des postes de travail.",
    cardChallenge:
      "Messagerie OVH, postes Windows Famille, pas de MFA. Ça fonctionnait, mais sans filet de sécurité.",
    cardResult:
      "Migration Microsoft 365, MFA activé, postes mis à niveau. Une transition propre, sans interruption d'activité.",
    title:
      "Une TPE qui voulait passer à la vitesse supérieure, sans tout casser",
    context: [
      "Une TPE utilisait une messagerie hébergée chez OVH et des postes Windows Famille. L'ensemble fonctionnait, mais sans la robustesse ni les fonctionnalités collaboratives nécessaires pour accompagner la croissance de l'entreprise.",
      "Les postes restaient limités sur les aspects de sécurité et d'administration. Les usages collaboratifs manquaient de fluidité.",
      "Le projet a été pensé comme une transition en deux phases : d'abord la messagerie et les accès, puis l'optimisation des postes pour poser une base plus professionnelle.",
    ],
    challenges: [
      "Messagerie historique peu adaptée à une collaboration moderne.",
      "Postes Windows Famille limitant l'administration et la sécurité.",
      "Absence de cadre homogène pour les accès, les boîtes partagées et le pilotage du parc.",
      "Besoin de sécuriser la transition sans perturber l'activité.",
    ],
    solutions: [
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content:
          "Migration sécurisée des emails depuis OVH vers Microsoft 365, avec configuration des comptes et des boîtes partagées pour structurer les usages collaboratifs.",
      },
      {
        label: "Cybersécurité",
        href: "/cybersecurite",
        content:
          "Activation de l'authentification multifacteur pour relever immédiatement le niveau de protection des accès et limiter le risque de compromission.",
      },
      {
        label: "Infogérance",
        href: "/infogerance",
        content:
          "Mise à niveau des postes vers Windows 11 Pro pour activer BitLocker et la jonction Azure AD, puis mise en place d'une maintenance proactive avec prêt de PC en cas de panne.",
      },
    ],
    benefits: [
      "Productivité décuplée : processus fluidifiés grâce à des outils collaboratifs modernes.",
      "Sécurité inégalée : surveillance constante et réduction majeure des risques de phishing.",
      "Tranquillité totale : délégation complète de l'informatique à un partenaire expert.",
    ],
    metrics: [
      { indicator: "Messagerie", before: "OVH", after: "Microsoft 365" },
      { indicator: "MFA", before: "Non", after: "Oui" },
      { indicator: "Postes", before: "Windows Famille", after: "Windows 11 Pro" },
    ],
  },
  {
    slug: "piratage-sites-wordpress-ecommerce",
    label: "Cas n°4",
    featured: {
      badge: "Nouveau · Réponse à incident",
      teaser:
        "Plusieurs sites piratés, dont une boutique en ligne, une compromission installée depuis des semaines : voici comment TRINEXTA a contenu l'attaque sans couper l'activité.",
    },
    clientName: "Entreprise francilienne",
    sector: "commerce",
    sectorLabel: "E-commerce",
    size: "Plusieurs sites web",
    heroImage: "/images/services/cybersecurite/hero.avif",
    cardImage: "/images/services/cybersecurite/bento-1.jpg",
    seoTitle: "Site WordPress piraté : cas client cybersécurité",
    metaDescription:
      "Découvrez comment TRINEXTA a analysé une compromission WordPress et e-commerce, isolé 63 fichiers malveillants et engagé la sécurisation des sites.",
    cardChallenge:
      "Plusieurs sites en dysfonctionnement, dont une boutique en ligne. Derrière les symptômes, une compromission installée depuis plusieurs semaines.",
    cardResult:
      "63 fichiers malveillants isolés, accès renforcés, principaux sites maintenus accessibles. La remédiation complète est en préparation.",
    title:
      "Cas client : intervention après le piratage de plusieurs sites WordPress et e-commerce",
    context: [
      "Une entreprise francilienne a constaté des dysfonctionnements sur plusieurs de ses sites internet, dont une boutique e-commerce. TRINEXTA a été sollicitée pour rechercher l'origine de l'incident et engager les premières mesures de sécurisation.",
      "L'investigation a mis au jour des activités malveillantes remontant au 23 septembre 2026, des portes dérobées et des mécanismes de manipulation du référencement naturel.",
      "L'enjeu : contenir la compromission sans couper les sites dont l'activité dépend, tout en conservant les éléments utiles à l'analyse.",
    ],
    challenges: [
      "Dysfonctionnements sur plusieurs sites, dont une boutique en ligne.",
      "Activités malveillantes présentes depuis plusieurs semaines.",
      "Portes dérobées permettant un retour de l'attaquant.",
      "Mécanismes de manipulation du référencement naturel installés sur les sites.",
    ],
    solutions: [
      {
        label: "Cybersécurité",
        href: "/cybersecurite",
        content:
          "Recherche de l'origine de l'incident, mise en quarantaine de 63 fichiers malveillants avec conservation des éléments nécessaires à l'investigation, puis neutralisation des mécanismes malveillants identifiés.",
      },
      {
        label: "Sécurisation des accès",
        href: "/cybersecurite",
        content:
          "Renforcement des accès administratifs et renouvellement des identifiants sensibles pour fermer les portes d'entrée connues.",
      },
      {
        label: "Sites web",
        href: "/cybersecurite",
        content:
          "Opérations initiales menées en maintenant les principaux sites accessibles, et préparation des vérifications nécessaires à une remédiation complète.",
      },
    ],
    benefits: [
      "Compromission contenue : les fichiers malveillants sont isolés et les mécanismes identifiés neutralisés.",
      "Activité préservée : les principaux sites sont restés accessibles pendant les opérations initiales.",
      "Base d'investigation conservée : les éléments utiles à l'analyse ont été préservés.",
      "Étape suivante cadrée : les vérifications nécessaires à une remédiation complète sont en préparation.",
    ],
    metrics: [
      { indicator: "Fichiers malveillants", before: "63 identifiés", after: "En quarantaine" },
      { indicator: "Accès administratifs", before: "À sécuriser", after: "Renforcés" },
      { indicator: "Principaux sites", before: "Dysfonctionnements", after: "Accessibles" },
    ],
  },
]

export const featuredCaseClient = caseClients.find((item) => item.featured)

// Ordre d'affichage : le cas en vedette d'abord
export const caseClientsOrdered = featuredCaseClient
  ? [featuredCaseClient, ...caseClients.filter((item) => item !== featuredCaseClient)]
  : caseClients

export function getCaseClientBySlug(slug: string) {
  return caseClients.find((item) => item.slug === slug)
}

// Cas mis en avant sur l'accueil (infogérance d'une PME), distinct du cas en vedette de /cas-clients.
const homeCase = caseClients.find((item) => item.slug === "modernisation-it-pme-essonne")

export const homeCaseClient: CaseClient | undefined = homeCase && {
  ...homeCase,
  featured: {
    badge: "Moderniser cinq postes sans remplacer tout le parc",
    teaser:
      "Cinq postes sous Office 2007, 8 Go de RAM saturés et des sauvegardes sur clé USB : le parc a été modernisé sans tout remplacer, avec Microsoft 365, 16 Go de mémoire et des écrans Dell 27 pouces.",
  },
}
