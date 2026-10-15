import { getOffreContactHref } from "@/data/offres";

// Contenu de la page /serenite : grille tarifaire, comparatif, piliers, étapes, options et FAQ.
// Les prix affichés ici alimentent aussi le JSON-LD Offer de la page : une seule source.

export const SERENITE_DEVIS_HREF = "/contact?type=devis";

export const SERENITE_HERO = {
  title: "TRINEXTA Sérénité\u00a0: maintenance, cybersécurité et support informatique pour PME",
  accroche: "Votre informatique protégée, vos équipes accompagnées, votre activité préservée.",
  description:
    "Deux formules par poste, sans frais de mise en service : Essentiel pour protéger vos ordinateurs, Complète pour déléguer aussi l'assistance de vos collaborateurs. Depuis Évry-Courcouronnes, pour les entreprises de l'Essonne et d'Île-de-France.",
  baseline: "L'humain avant les tickets.",
  ctaPrimary: { label: "Comparer les deux offres", href: "#offres" },
  ctaSecondary: { label: "Demander mon devis Sérénité", href: SERENITE_DEVIS_HREF },
} as const;

export interface SereniteOffre {
  id: "essentiel" | "complete";
  nom: string;
  accroche: string;
  prix: string;
  // Valeur numérique publiée dans le JSON-LD Offer (point décimal)
  prixSchema: string;
  unite: string;
  pitch: string;
  points: string[];
  conditions: string[];
  pourQui: string;
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export const SERENITE_OFFRES: SereniteOffre[] = [
  {
    id: "essentiel",
    nom: "Sérénité Essentiel",
    accroche: "La sécurité de vos postes, pour le prix d'un café par jour.",
    prix: "29,99 €",
    prixSchema: "29.99",
    unite: "HT / poste / mois",
    pitch: "Les fondations de la sécurité informatique : protection EDR, supervision et maintenance préventive automatisée.",
    points: [
      "Antivirus nouvelle génération et EDR",
      "Supervision RMM des postes",
      "Remontée des activités suspectes",
      "Mises à jour de sécurité Windows suivies",
      "Maintenance préventive automatisée de base",
      "Inventaire des postes couverts",
      "Rapport trimestriel d'activité et de sécurité",
    ],
    conditions: [
      "Engagement minimum de 12 mois",
      "0 € de mise en service",
      "Support utilisateurs et dépannage sur devis",
    ],
    pourQui: "Indépendants, TPE et petites équipes qui veulent une protection professionnelle à budget maîtrisé.",
    cta: { label: "Choisir Sérénité Essentiel", href: getOffreContactHref("serenite-essentielle") },
  },
  {
    id: "complete",
    nom: "Sérénité Complète",
    accroche: "Votre service informatique externalisé.",
    prix: "79 €",
    prixSchema: "79",
    unite: "HT / poste / mois",
    pitch: "Tout Essentiel, plus l'assistance quotidienne de vos collaborateurs et une maintenance renforcée.",
    points: [
      "Tous les services Essentiel",
      "Support utilisateurs illimité*",
      "Assistance téléphone, e-mail et à distance",
      "Dépannage Windows et logiciels courants",
      "Accompagnement Microsoft 365, Outlook et Teams",
      "Arrivées et départs de collaborateurs",
      "Coordination avec les éditeurs de logiciels",
      "Rapport mensuel d'activité et de sécurité",
    ],
    conditions: [
      "Sans engagement de durée",
      "0 € de mise en service",
      "Interventions sur site selon le contrat",
    ],
    pourQui: "PME qui veulent externaliser leur informatique et accompagner leurs collaborateurs au quotidien.",
    cta: { label: "Choisir Sérénité Complète", href: getOffreContactHref("serenite-complete") },
    highlighted: true,
  },
];

export const SERENITE_OFFRES_NOTE =
  "* Dans le périmètre contractuel. Tarifs HT. Équipements, licences, projets, interventions matérielles et prestations non prévues au contrat peuvent être facturés en complément.";

// Éléments identiques dans les deux formules : affichés une fois, au-dessus du comparatif.
export const SERENITE_SOCLE = [
  "Antivirus nouvelle génération et EDR",
  "Détection des comportements suspects",
  "Alertes de sécurité",
  "Supervision automatisée des équipements",
  "Inventaire des postes",
  "0 € de mise en service",
] as const;

// Seules les différences entre Essentiel et Complète.
export const SERENITE_COMPARATIF: { critere: string; detail?: string; essentiel: string; complete: string }[] = [
  { critere: "Prix mensuel par poste", essentiel: "29,99 € HT", complete: "79 € HT" },
  { critere: "Engagement minimum", essentiel: "12 mois", complete: "Aucun" },
  { critere: "Support utilisateurs", essentiel: "sur-devis", complete: "Illimité*" },
  {
    critere: "Assistance au quotidien",
    detail: "Assistance à distance, diagnostic, dépannage logiciel, Microsoft 365, comptes utilisateurs, installation de logiciels, remédiation, arrivées et départs, coordination avec les éditeurs",
    essentiel: "sur-devis",
    complete: "inclus",
  },
  { critere: "Maintenance préventive", essentiel: "Basique", complete: "Avancée" },
  { critere: "Correctifs Windows", essentiel: "Sécurité", complete: "Sécurité et courants" },
  { critere: "Rapport d'activité et de sécurité", essentiel: "Trimestriel", complete: "Mensuel" },
  { critere: "Conseils sur le parc", essentiel: "Sur demande", complete: "inclus" },
  { critere: "Intervention sur site", essentiel: "sur-devis", complete: "Selon contrat" },
];

export const SERENITE_PILIERS = [
  {
    num: "Protection",
    title: "EDR professionnel avec SentinelOne",
    desc: "Vos postes compatibles sont protégés par une technologie de détection et de réponse aux menaces. Elle surveille les comportements suspects et déclenche des mécanismes de protection.",
    inclusions: ["Antivirus nouvelle génération", "Détection comportementale", "Protection anti-ransomware", "Alertes de sécurité suivies"],
    note: "Une protection qui réduit les risques, sans promettre une sécurité absolue.",
    image: "/images/nos-offres/pilier-cyber.jpg",
  },
  {
    num: "Supervision",
    title: "Supervision proactive avec NinjaOne",
    desc: "Un ordinateur montre souvent des signes de faiblesse avant de tomber en panne. Notre outil de supervision suit les indicateurs techniques et nous remonte les alertes.",
    inclusions: ["État des postes", "Suivi des mises à jour", "Alertes automatiques", "Inventaire du parc"],
    note: "La supervision automatisée tourne en continu. Ce n'est pas une équipe humaine qui surveille chaque poste 24 h sur 24.",
    image: "/images/nos-offres/pilier_maintenance.jpg",
  },
  {
    num: "Maintenance",
    title: "Une maintenance adaptée à votre formule",
    desc: "Essentiel automatise la maintenance préventive. Complète ajoute le diagnostic des incidents, des opérations supplémentaires et l'assistance aux utilisateurs.",
    inclusions: ["Opérations préventives automatisées", "Correctifs Windows", "Maintenance renforcée (Complète)", "Conseils sur le parc (Complète)"],
    note: "Prévenir les problèmes évitables, traiter les autres avec méthode.",
    image: "/images/nos-offres/serenite.jpg",
  },
  {
    num: "Relation",
    title: "Un interlocuteur humain",
    desc: "Avec Complète, vos collaborateurs expliquent leur problème à des techniciens qui connaissent votre environnement, vos logiciels et vos contraintes métier.",
    inclusions: ["Téléphone et e-mail", "Prise en main à distance", "Suivi des demandes", "Explications sans jargon"],
    note: "L'humain avant les tickets.",
    image: "/images/nos-offres/pilier-support.jpg",
  },
];

export const SERENITE_SUPPORT = {
  title: "Comment fonctionne le support *illimité* de Sérénité Complète ?",
  intro:
    "Un ordinateur qui ralentit, une application métier qui refuse de démarrer, un accès Outlook qui ne répond plus : les collaborateurs couverts sollicitent le support pour les incidents prévus au contrat, du lundi au vendredi de 8 h 30 à 19 h.",
  items: [
    {
      label: "Une assistance pour le quotidien",
      desc: "Téléphone, e-mail ou prise en main à distance : nous diagnostiquons, intervenons à distance ou organisons l'action complémentaire nécessaire.",
    },
    {
      label: "Des demandes suivies",
      desc: "Chaque incident est centralisé. L'historique aide à repérer les problèmes récurrents et à orienter les prochains diagnostics.",
    },
    {
      label: "Microsoft 365 et logiciels métier",
      desc: "Accompagnement courant sur Outlook, Teams et OneDrive, et coordination avec l'éditeur quand le problème vient de son logiciel. Les licences et les migrations restent hors abonnement.",
    },
  ],
  note: "Illimité porte sur le nombre de demandes éligibles. Ce n'est ni une garantie de résolution immédiate, ni une disponibilité permanente.",
  link: { label: "Découvrir le support informatique TRINEXTA", href: "/support-informatique" },
} as const;

export const SERENITE_RAPPORTS = [
  {
    formule: "Sérénité Essentiel",
    frequence: "Rapport trimestriel",
    desc: "Tous les trois mois, une synthèse de l'état du parc supervisé, des alertes significatives, des mises à jour suivies et des recommandations prioritaires.",
  },
  {
    formule: "Sérénité Complète",
    frequence: "Rapport mensuel",
    desc: "Chaque mois, les indicateurs de supervision, les incidents traités, les interventions réalisées et les recommandations. Un support clair pour vos décisions.",
  },
] as const;

export const SERENITE_POUR_QUI = {
  essentiel: "Indépendant avec un ordinateur professionnel ? Sérénité Essentiel pose un premier niveau de protection.",
  complete: "Cabinet comptable, entreprise du bâtiment, agence ou PME de services ? Sérénité Complète simplifie la gestion des demandes du quotidien.",
} as const;

export const SERENITE_LOCAL =
  "TRINEXTA est installée au 7 rue Montespan, 91000 Évry-Courcouronnes. Nous accompagnons les entreprises du Grand Paris Sud, de l'Essonne et d'Île-de-France. La supervision et l'assistance à distance suivent vos postes où qu'ils soient, sous réserve de compatibilité et d'autorisation.";

export const SERENITE_ETAPES = [
  { title: "Échange sur vos besoins", desc: "Nombre de postes, environnement technique, prestations recherchées." },
  { title: "Validation de la formule", desc: "Une proposition précise le nombre de postes, le prix, les options et les conditions." },
  { title: "Installation des outils", desc: "Après accord, nous déployons les agents de supervision et de sécurité sur les postes compatibles." },
  { title: "Démarrage", desc: "Les outils remontent leurs informations. Pour Complète, vos utilisateurs reçoivent les canaux de support." },
  { title: "Rapports et suivi", desc: "Trimestriels pour Essentiel, mensuels pour Complète." },
];

export const SERENITE_OPTIONS = [
  {
    title: "Sauvegarde des données",
    price: "Sur étude",
    desc: "Les offres standard n'incluent pas la sauvegarde. Nous proposons une solution de protection et de restauration adaptée à votre environnement.",
  },
  {
    title: "Serveurs, NAS et réseau",
    price: "Sur devis",
    desc: "Les formules par poste ne couvrent pas l'administration complète de l'infrastructure. Nous la chiffrons à part.",
  },
  {
    title: "Projets informatiques",
    price: "Sur devis",
    desc: "Migration Microsoft 365, renouvellement du parc, nouveaux équipements ou application métier : un devis distinct.",
  },
];

export const SERENITE_CTA = {
  line1: "Votre informatique",
  line2: "mérite une protection",
  line3: "professionnelle.",
  description:
    "Protégez vos postes dès 29,99 € HT par mois ou confiez votre informatique quotidienne à TRINEXTA pour 79 € HT par poste et par mois. Sans frais standard de mise en service.",
  ctaLabel: "Demander mon devis Sérénité",
  ctaHref: SERENITE_DEVIS_HREF,
} as const;

export const SERENITE_FAQ: { question: string; answer: string }[] = [
  {
    question: "Quel est le prix de TRINEXTA Sérénité ?",
    answer:
      "Sérénité Essentiel coûte 29,99 € HT par poste et par mois, avec un engagement minimum de 12 mois. Sérénité Complète coûte 79 € HT par poste et par mois, sans engagement de durée. Aucun frais standard de mise en service. Les options et prestations hors périmètre font l'objet d'un devis.",
  },
  {
    question: "Quelle est la différence entre Sérénité Essentiel et Complète ?",
    answer:
      "Essentiel couvre la protection EDR, la supervision et la maintenance préventive automatisée, avec un rapport trimestriel. Les interventions humaines de support sont facturées à part.\n\nComplète ajoute le support illimité pour les demandes couvertes, l'assistance à distance, le dépannage logiciel courant, une maintenance renforcée et un rapport mensuel.",
  },
  {
    question: "Pourquoi parler du prix d'un café ?",
    answer:
      "Sérénité Essentiel coûte 29,99 € HT par poste et par mois. Rapporté à une journée, c'est l'ordre de grandeur d'un café. La facturation reste mensuelle.",
  },
  {
    question: "Pourquoi Essentiel demande-t-il un engagement de 12 mois ?",
    answer:
      "Essentiel est une protection accessible qui prend son sens dans la durée. Les conditions de renouvellement et de résiliation sont précisées dans le contrat.",
  },
  {
    question: "Sérénité Complète est-il vraiment sans engagement ?",
    answer:
      "Oui, aucune durée minimale. La résiliation suit les modalités et le préavis définis au contrat.",
  },
  {
    question: "Le support informatique est-il inclus dans Essentiel ?",
    answer:
      "Non. Essentiel comprend la supervision, les protections et les opérations automatisées. Assistance utilisateur, dépannage manuel et interventions spécifiques sont proposés sur devis.",
  },
  {
    question: "Que signifie support informatique illimité dans Complète ?",
    answer:
      "Les utilisateurs couverts soumettent autant de demandes éligibles que nécessaire, du lundi au vendredi de 8 h 30 à 19 h. Projets, interventions matérielles, prestations spécialisées et services exclus du périmètre n'en font pas partie.",
  },
  {
    question: "Quelle est la différence entre EDR, RMM et MDR ?",
    answer:
      "L'EDR détecte et traite certaines menaces sur les équipements. Le RMM sert à superviser, administrer et entretenir les appareils à distance. Le MDR est un service managé de détection et de réponse avec une surveillance humaine dédiée.\n\nSérénité comprend l'EDR et la supervision RMM. Un service MDR humain permanent n'est pas inclus.",
  },
  {
    question: "Les rapports sont-ils inclus dans les deux formules ?",
    answer: "Oui : un rapport trimestriel avec Essentiel, un rapport mensuel avec Complète.",
  },
  {
    question: "Les licences Microsoft 365 sont-elles incluses ?",
    answer:
      "Non. Complète inclut l'assistance et la gestion courante de Microsoft 365 dans le périmètre du contrat. Les licences restent facturées à part, sauf mention contraire sur le devis.",
  },
  {
    question: "La sauvegarde des fichiers est-elle incluse ?",
    answer:
      "Pas dans les offres standard. Nous proposons une solution complémentaire après étude de votre environnement.",
  },
  {
    question: "Intervenez-vous sur site dans l'Essonne ?",
    answer:
      "Oui, à Évry-Courcouronnes, Corbeil-Essonnes et plus largement en Île-de-France. Les interventions sont planifiées et facturées selon l'offre souscrite.",
  },
  {
    question: "Quels types d'entreprises peuvent souscrire ?",
    answer:
      "Indépendants, TPE, cabinets, commerces et PME qui veulent protéger ou externaliser la gestion de leurs postes. Nous vérifions la compatibilité technique avant le déploiement.",
  },
  {
    question: "Puis-je passer d'Essentiel à Complète ?",
    answer:
      "Oui, à tout moment. Les modalités de changement de formule et la fin de l'engagement Essentiel sont précisées dans le contrat.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Appelez-nous au 09 78 25 07 46 ou écrivez à contact@trinexta.fr. Nous étudions le nombre de postes, la compatibilité technique et le niveau de service adapté.",
  },
];
