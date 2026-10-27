export type CaseClientSector = "cabinet" | "commerce" | "industrie" | "service" | "association" | "batiment" | "immobilier"

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
  { value: "batiment", label: "Bâtiment" },
  { value: "immobilier", label: "Immobilier" },
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
  // Cas n°5 à n°10 : interventions réelles décrites par la direction (27/10/2026),
  // anonymisées (secteur et ville seulement). Aucun chiffre non vérifié : les
  // indicateurs sont qualitatifs.
  {
    slug: "departs-collaborateurs-comptes-licences-cabinet-comptable-essonne",
    label: "Cas n°5",
    clientName: "Cabinet d'expertise comptable",
    sector: "cabinet",
    sectorLabel: "Cabinet comptable",
    size: "Essonne",
    heroImage: "/images/services/microsoft-365/hero.avif",
    cardImage: "/images/services/microsoft-365/problem-1.jpg",
    seoTitle: "Départs de salariés : comptes, licences et accès repris en main dans un cabinet comptable en Essonne",
    metaDescription:
      "Cabinet d'expertise comptable en Essonne : comptes d'anciens salariés fermés, licences inutiles arrêtées, messagerie sécurisée et sauvegardes vérifiées par TRINEXTA.",
    cardChallenge:
      "Les collaborateurs partaient, leurs comptes et leurs licences restaient. Les accès aux dossiers clients n'étaient jamais retirés.",
    cardResult:
      "Comptes et licences repris en main, accès inutiles fermés, sauvegardes vérifiées et procédure d'arrivée et de départ en place.",
    title: "Les collaborateurs partaient. Leurs comptes et les factures restaient.",
    context: [
      "Dans ce cabinet d'expertise comptable de l'Essonne, chaque recrutement se traduisait par l'achat d'un ordinateur et la création d'une adresse e-mail. Un proche du cabinet s'occupait de l'informatique quand il le pouvait.",
      "Au fil des départs, personne ne faisait le ménage : des comptes restaient actifs plusieurs mois après le départ, des licences continuaient d'être payées et les accès aux dossiers clients n'étaient jamais retirés.",
      "Les sauvegardes reposaient sur des disques durs, sans contrôle régulier de leur restauration. Pour un cabinet qui détient des données confidentielles, le risque était réel.",
    ],
    challenges: [
      "Comptes d'anciens collaborateurs toujours actifs plusieurs mois après leur départ.",
      "Licences payées pour des personnes qui ne travaillaient plus au cabinet.",
      "Accès aux dossiers clients jamais retirés.",
      "Sauvegardes sur disques durs, sans test de restauration.",
      "Dépendance à la disponibilité d'un proche pour toute question informatique.",
    ],
    solutions: [
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content:
          "Reprise des comptes et des licences, fermeture des accès devenus inutiles et sécurisation de la messagerie.",
      },
      {
        label: "Sauvegarde",
        href: "/cloud-sauvegarde",
        content: "Mise en place de sauvegardes organisées, dont la restauration est vérifiée.",
      },
      {
        label: "Infogérance",
        href: "/serenite",
        content:
          "Procédure d'arrivée et de départ des collaborateurs pour garder la maîtrise du parc dans la durée.",
      },
    ],
    benefits: [
      "Dépenses inutiles arrêtées : plus de licences payées pour d'anciens collaborateurs.",
      "Dossiers confidentiels protégés : seuls les collaborateurs présents y ont accès.",
      "Autonomie : le cabinet ne dépend plus de la disponibilité d'un proche pour travailler.",
    ],
    metrics: [
      { indicator: "Comptes d'anciens salariés", before: "Toujours actifs", after: "Fermés" },
      { indicator: "Licences inutiles", before: "Payées", after: "Arrêtées" },
      { indicator: "Sauvegardes", before: "Non vérifiées", after: "Restauration contrôlée" },
    ],
  },
  {
    slug: "pc-en-panne-devis-recuperes-entreprise-batiment-evry",
    label: "Cas n°6",
    clientName: "Entreprise du bâtiment",
    sector: "batiment",
    sectorLabel: "Bâtiment",
    size: "Évry-Courcouronnes",
    heroImage: "/images/services/cloud-sauvegarde/hero.avif",
    cardImage: "/images/services/microsoft-365/benefit-4.jpg",
    seoTitle: "PC en panne, devis bloqués : récupération des documents et sauvegarde pour une entreprise du bâtiment à Évry",
    metaDescription:
      "Entreprise du bâtiment à Évry-Courcouronnes : le seul PC qui contenait devis et plans ne démarrait plus. TRINEXTA a récupéré les documents et organisé un stockage partagé sauvegardé.",
    cardChallenge:
      "Devis, plans de chantier et coordonnées clients sur un seul PC. Un matin, il ne démarre plus.",
    cardResult:
      "Documents récupérés et remis à disposition, puis stockage partagé avec des sauvegardes contrôlées.",
    title: "Les devis sont sur un seul PC. Et ce matin, il ne démarre plus.",
    context: [
      "Dans cette entreprise du bâtiment d'Évry-Courcouronnes, les devis en cours, les plans de chantier et les coordonnées des clients étaient enregistrés sur l'ordinateur de l'assistante.",
      "Le jour où il est tombé en panne, le dirigeant a découvert que ces documents n'étaient sauvegardés nulle part ailleurs. Les équipes attendaient leurs plans et les devis ne partaient plus.",
    ],
    challenges: [
      "Documents de travail stockés sur un seul ordinateur.",
      "Aucune sauvegarde des devis, plans et fichiers clients.",
      "Activité bloquée : plans indisponibles pour les équipes, devis en attente.",
    ],
    solutions: [
      {
        label: "Dépannage",
        href: "/services-annexes",
        content:
          "Diagnostic du poste, recherche des possibilités de récupération et remise des documents à disposition de l'équipe.",
      },
      {
        label: "Sauvegarde",
        href: "/cloud-sauvegarde",
        content: "Organisation d'un stockage partagé avec des sauvegardes contrôlées.",
      },
    ],
    benefits: [
      "Documents retrouvés et remis à disposition de l'équipe.",
      "Fin de la dépendance à un seul ordinateur : les dossiers sont partagés et sauvegardés.",
    ],
    metrics: [
      { indicator: "Stockage des devis et plans", before: "Un seul PC", after: "Stockage partagé" },
      { indicator: "Sauvegardes", before: "Aucune", after: "Contrôlées" },
    ],
  },
  {
    slug: "messagerie-partagee-securisee-agence-immobiliere-corbeil-essonnes",
    label: "Cas n°7",
    clientName: "Agence immobilière",
    sector: "immobilier",
    sectorLabel: "Immobilier",
    size: "Corbeil-Essonnes",
    heroImage: "/images/services/cybersecurite/hero.avif",
    cardImage: "/images/services/microsoft-365/problem-2.jpg",
    seoTitle: "Mot de passe partagé et messages suspects : messagerie sécurisée pour une agence immobilière à Corbeil-Essonnes",
    metaDescription:
      "Agence immobilière à Corbeil-Essonnes : un mot de passe de messagerie partagé, connu d'anciens salariés, et des messages envoyés sans auteur connu. TRINEXTA a sécurisé les accès avec la double authentification.",
    cardChallenge:
      "Toute l'agence utilisait la même boîte mail avec le même mot de passe, connu même d'anciens salariés.",
    cardResult:
      "Comptes sécurisés, anciennes sessions fermées, accès individuels à la messagerie partagée avec double authentification.",
    title: "Le mot de passe de la messagerie est connu de toute l'agence. Même des anciens salariés.",
    context: [
      "Pour répondre vite aux clients, toute l'agence utilisait la même boîte e-mail avec le même mot de passe. Il était enregistré sur des téléphones personnels et n'avait pas changé malgré plusieurs départs.",
      "Un jour, des messages ont été envoyés au nom de l'agence sans que personne ne sache qui les avait expédiés.",
    ],
    challenges: [
      "Un mot de passe unique partagé par toute l'équipe.",
      "Mot de passe jamais changé après le départ de salariés.",
      "Accès depuis des téléphones personnels non maîtrisés.",
      "Messages envoyés au nom de l'agence sans auteur identifiable.",
    ],
    solutions: [
      {
        label: "Cybersécurité",
        href: "/cybersecurite",
        content: "Sécurisation des comptes et fermeture des anciennes sessions ouvertes.",
      },
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content:
          "Accès individuels à la messagerie partagée, avec double authentification pour chaque collaborateur.",
      },
    ],
    benefits: [
      "L'équipe continue de travailler ensemble sur la même boîte.",
      "L'agence sait qui peut consulter les échanges avec ses clients.",
      "Les anciens salariés n'ont plus accès à la messagerie.",
    ],
    metrics: [
      { indicator: "Accès à la messagerie", before: "Un mot de passe pour tous", after: "Un accès par personne" },
      { indicator: "Double authentification", before: "Non", after: "Oui" },
      { indicator: "Anciennes sessions", before: "Ouvertes", after: "Fermées" },
    ],
  },
  {
    slug: "arrivee-nouveau-salarie-poste-pret-cabinet-conseil-paris",
    label: "Cas n°8",
    clientName: "Cabinet de conseil",
    sector: "cabinet",
    sectorLabel: "Conseil",
    size: "Paris 15e",
    heroImage: "/images/services/microsoft-365/hero.avif",
    cardImage: "/images/services/support-informatique/benefit-4.jpg",
    seoTitle: "Arrivée d'un nouveau salarié : poste et Microsoft 365 prêts le premier jour, cabinet de conseil à Paris",
    metaDescription:
      "Cabinet de conseil à Paris 15e : les nouveaux salariés attendaient leur informatique toute une semaine. TRINEXTA prépare le poste et Microsoft 365 avant leur arrivée.",
    cardChallenge:
      "À chaque arrivée, le poste n'était pas prêt et un collègue laissait son travail pour aider le nouveau venu.",
    cardResult:
      "Poste préparé avant l'arrivée, Microsoft 365 configuré, logiciels et accès vérifiés. Opérationnel dès le premier jour.",
    title: "Un nouveau salarié arrive lundi. Son informatique sera prête… dans la semaine.",
    context: [
      "Dans ce cabinet de conseil parisien, l'ordinateur d'un nouveau collaborateur venait d'être acheté, mais les logiciels manquaient. La messagerie fonctionnait dans le navigateur et pas dans Outlook.",
      "Les dossiers partagés étaient inaccessibles et personne ne retrouvait les identifiants administrateur. Le nouveau collaborateur attendait, pendant qu'un collègue laissait son propre travail pour l'aider.",
    ],
    challenges: [
      "Poste livré sans les logiciels du métier.",
      "Messagerie non configurée dans Outlook.",
      "Dossiers partagés inaccessibles.",
      "Identifiants administrateur introuvables.",
    ],
    solutions: [
      {
        label: "Microsoft 365",
        href: "/microsoft-365",
        content: "Configuration de Microsoft 365 : messagerie dans Outlook, dossiers partagés et accès.",
      },
      {
        label: "Support informatique",
        href: "/support-informatique",
        content:
          "Préparation du poste avant l'arrivée, installation des logiciels et vérification des accès nécessaires au métier.",
      },
    ],
    benefits: [
      "Un collaborateur opérationnel dès son arrivée.",
      "Plus de collègue détourné de son travail pour dépanner.",
      "Un interlocuteur identifié pour l'assistance informatique.",
    ],
    metrics: [
      { indicator: "Poste du nouvel arrivant", before: "Prêt dans la semaine", after: "Prêt le premier jour" },
      { indicator: "Logiciels du métier", before: "Manquants", after: "Installés avant l'arrivée" },
    ],
  },
  {
    slug: "pannes-reseau-repetees-pme-services-carre-senart",
    label: "Cas n°9",
    clientName: "PME de services",
    sector: "service",
    sectorLabel: "Service",
    size: "Carré Sénart",
    heroImage: "/images/services/solutions-metier/hero.avif",
    cardImage: "/images/services/solutions-metier/benefit-4.jpg",
    seoTitle: "Coupures réseau répétées : cause trouvée et corrigée pour une PME de services au Carré Sénart",
    metaDescription:
      "PME de services au Carré Sénart : déconnexions du logiciel de gestion, dossiers partagés et imprimante introuvables chaque semaine. TRINEXTA a trouvé l'origine des coupures et corrigé le réseau.",
    cardChallenge:
      "Chaque semaine, le logiciel de gestion se déconnectait et les dossiers partagés disparaissaient. Les factures attendaient.",
    cardResult:
      "Origine des coupures recherchée, réseau et équipements vérifiés, défauts corrigés, puis suivi pour repérer toute récidive.",
    title: "La même panne revient chaque semaine. Et toute l'équipe s'adapte autour.",
    context: [
      "Dans cette PME de services du Carré Sénart, le logiciel de gestion se déconnectait, les dossiers partagés disparaissaient et l'imprimante devenait introuvable, semaine après semaine.",
      "Les collaborateurs redémarraient leurs postes jusqu'à ce que cela fonctionne. Pendant ce temps, les factures attendaient et le dirigeant rappelait la personne qui avait installé le réseau.",
    ],
    challenges: [
      "Déconnexions répétées du logiciel de gestion.",
      "Dossiers partagés et imprimante régulièrement introuvables.",
      "Facturation ralentie par les interruptions.",
      "Aucun suivi de l'origine des pannes.",
    ],
    solutions: [
      {
        label: "Téléphonie et réseau",
        href: "/solutions-metier",
        content:
          "Recherche de l'origine des coupures, vérification du réseau et des équipements, correction des défauts identifiés.",
      },
      {
        label: "Infogérance",
        href: "/serenite",
        content: "Suivi informatique pour repérer les signes de récidive.",
      },
    ],
    benefits: [
      "Moins d'interruptions répétées qui ralentissaient la facturation.",
      "Les équipes ne perdent plus leur temps à redémarrer leurs postes.",
      "Les signes de récidive sont repérés par le suivi.",
    ],
    metrics: [
      { indicator: "Origine des coupures", before: "Inconnue", after: "Identifiée et corrigée" },
      { indicator: "Suivi du réseau", before: "Aucun", after: "En place" },
    ],
  },
  {
    slug: "sauvegardes-verifiees-entreprise-maintenance-sainte-genevieve-des-bois",
    label: "Cas n°10",
    clientName: "Entreprise de maintenance",
    sector: "industrie",
    sectorLabel: "Maintenance",
    size: "Sainte-Geneviève-des-Bois",
    heroImage: "/images/services/cloud-sauvegarde/hero.avif",
    cardImage: "/images/services/infogerance/problem-1.jpg",
    seoTitle: "Sauvegardes vieilles de plusieurs mois : copies vérifiées pour une entreprise de maintenance à Sainte-Geneviève-des-Bois",
    metaDescription:
      "Entreprise de maintenance à Sainte-Geneviève-des-Bois : le disque de sauvegarde ne copiait plus rien depuis des mois. TRINEXTA a mis en place des copies automatiques avec test de restauration et alertes.",
    cardChallenge:
      "Un disque de sauvegarde branché chaque soir. Mais les dernières copies dataient de plusieurs mois.",
    cardResult:
      "Sauvegardes automatiques adaptées, restauration testée et alertes en cas d'échec.",
    title: "Le disque de sauvegarde est branché. Mais les dernières copies datent de plusieurs mois.",
    context: [
      "Chaque soir, un disque dur était censé sauvegarder les dossiers de cette entreprise de maintenance. Personne ne regardait les messages d'erreur : tout le monde pensait que cela fonctionnait.",
      "Lorsqu'un dossier client a été supprimé, la seule copie retrouvée ne contenait ni les derniers devis ni les interventions récentes.",
    ],
    challenges: [
      "Sauvegardes en échec depuis plusieurs mois sans que personne ne le sache.",
      "Messages d'erreur jamais consultés.",
      "Derniers devis et interventions perdus après la suppression d'un dossier.",
    ],
    solutions: [
      {
        label: "Sauvegarde",
        href: "/cloud-sauvegarde",
        content:
          "Vérification de ce qui était réellement sauvegardé, mise en place de copies automatiques adaptées et test de restauration des fichiers.",
      },
      {
        label: "Supervision",
        href: "/serenite",
        content: "Alertes en cas d'échec d'une sauvegarde, pour ne plus le découvrir le jour où l'on en a besoin.",
      },
    ],
    benefits: [
      "Des sauvegardes vérifiées, dont la restauration a été testée.",
      "Un échec de sauvegarde est signalé tout de suite.",
      "Plus besoin de reconstituer des semaines de travail.",
    ],
    metrics: [
      { indicator: "Dernière copie exploitable", before: "Plusieurs mois", after: "Automatique et récente" },
      { indicator: "Test de restauration", before: "Jamais", after: "Effectué" },
      { indicator: "Alerte en cas d'échec", before: "Aucune", after: "En place" },
    ],
  },
]

export const featuredCaseClient = caseClients.find((item) => item.featured)

// Ordre d'affichage : le cas en vedette d'abord
export const caseClientsOrdered = featuredCaseClient
  ? [featuredCaseClient, ...caseClients.filter((item) => item !== featuredCaseClient)]
  : caseClients

// Carrousel du haut de /cas-clients : quatre cas au plus, la grille montre les autres.
export const caseClientsHeroSlides = caseClientsOrdered.slice(0, 4)

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
