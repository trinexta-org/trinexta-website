import { getOffreContactHref } from "@/data/offres";

// Contenu de la page /serenite : grille tarifaire, comparatif, piliers, étapes, options et FAQ.
// Les prix affichés ici alimentent aussi le JSON-LD Offer de la page : une seule source.

export const SERENITE_DEVIS_HREF = "/contact?type=devis";

export const SERENITE_HERO = {
  titlePart1: "Vos équipes travaillent,",
  titlePart2: "nous gérons votre informatique.",
  accroche: "Infogérance par poste : un technicien qui répond, des postes protégés, un prix fixe.",
  description:
    "Sérénité Essentiel protège et entretient vos postes. Sérénité Complète y ajoute l'assistance de vos collaborateurs dès la signature. Prix fixes, hors taxes, par poste et par mois, sans frais de mise en service. Les 3 premiers mois, vous arrêtez quand vous voulez.",
  baseline: "L'humain avant les tickets.",
  ctaPrimary: { label: "Comparer les deux formules", href: "#comparatif" },
  ctaSecondary: { label: "Demander une proposition", href: SERENITE_DEVIS_HREF },
} as const;

// Bloc « En bref » : réponse directe, reprise telle quelle par les moteurs et assistants IA.
export const SERENITE_EN_BREF =
  "TRINEXTA Sérénité regroupe deux formules facturées par poste et par mois. Essentiel (39,99 € HT) : protection EDR SentinelOne, supervision NinjaOne, mises à jour de sécurité, maintenance préventive automatisée, inventaire et rapport trimestriel ; assistance aux utilisateurs non incluse ; engagement de 12 mois. Complète (79 € HT) : le socle Essentiel, plus l'assistance aux utilisateurs pour les demandes couvertes par le contrat, du lundi au vendredi de 8 h 30 à 19 h, la double authentification, la sensibilisation à l'hameçonnage, la réponse à incident cyber et un rapport mensuel ; assistance active dès la signature ; sans durée minimale, préavis de 2 mois. Les 3 premiers mois, les deux formules s'arrêtent sans préavis. Frais de mise en service : 0 €. État des lieux du parc offert. Licences, sauvegarde (option, données hébergées en France), serveurs, NAS, réseau, projets et matériel sont hors forfait.";

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
    accroche: "Pour protéger et entretenir vos postes.",
    prix: "39,99 €",
    prixSchema: "39.99",
    unite: "HT / poste / mois",
    pitch: "Protection EDR, supervision et maintenance préventive automatisée. Assistance aux utilisateurs et interventions non incluses, sur devis.",
    points: [
      "Protection EDR SentinelOne : analyse des comportements suspects, blocage ou isolement d'un poste selon sa configuration",
      "Supervision RMM NinjaOne des postes, alertes traitées par un technicien",
      "Suivi des mises à jour de sécurité Windows",
      "Maintenance préventive automatisée",
      "Inventaire des postes couverts",
      "Rapport trimestriel d'activité et de sécurité",
    ],
    conditions: [
      "Engagement de 12 mois, arrêt sans préavis possible les 3 premiers mois",
      "0 € de mise en service",
      "Assistance aux utilisateurs sur devis",
    ],
    pourQui: "Un indépendant ou une petite équipe qui veut des postes protégés, supervisés et à jour, et qui gère seule les demandes du quotidien ou les fait chiffrer au cas par cas.",
    cta: { label: "Choisir Sérénité Essentiel", href: getOffreContactHref("serenite-essentielle") },
  },
  {
    id: "complete",
    nom: "Sérénité Complète",
    accroche: "Pour déléguer votre informatique au quotidien.",
    prix: "79 €",
    prixSchema: "79",
    unite: "HT / poste / mois",
    pitch: "Le socle Essentiel et l'assistance aux utilisateurs pour les demandes couvertes par le contrat. Support du lundi au vendredi, de 8 h 30 à 19 h.",
    points: [
      "Tout le socle Essentiel",
      "Assistance illimitée aux utilisateurs dans le périmètre du contrat* : téléphone, e-mail, prise en main à distance",
      "Dépannage Windows et logiciels courants",
      "Microsoft 365 au quotidien : Outlook, Teams, OneDrive, comptes",
      "Arrivées et départs de collaborateurs",
      "Coordination avec les éditeurs de vos logiciels",
      "Double authentification (MFA) sur les comptes et sensibilisation de vos équipes à l'hameçonnage",
      "Réponse à incident cyber sur les postes et comptes couverts par le contrat",
      "Rapport mensuel d'activité et de sécurité",
    ],
    conditions: [
      "Assistance active dès la signature",
      "Sans durée minimale, préavis de 2 mois (aucun préavis les 3 premiers mois)",
      "0 € de mise en service",
      "Interventions sur site selon le contrat",
    ],
    pourQui: "Un cabinet, une agence, une entreprise du bâtiment ou une PME de services qui veut que ses collaborateurs appellent un support, et non un collègue, quand quelque chose bloque.",
    cta: { label: "Choisir Sérénité Complète", href: getOffreContactHref("serenite-complete") },
    highlighted: true,
  },
];

export const SERENITE_OFFRES_NOTE =
  "* Le nombre de demandes couvertes par le contrat n'est pas plafonné. Projets, licences, interventions matérielles et prestations non prévues au contrat sont facturés en complément. Les délais de prise en charge suivent nos niveaux de service. Licences, sauvegarde, serveurs, NAS, réseau, projets et matériel ne sont pas inclus dans le forfait standard ; les interventions hors forfait font l'objet d'un devis. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; la main-d'œuvre sur site reste facturée selon le contrat. Tarifs HT.";

// Éléments identiques dans les deux formules : affichés une fois, au-dessus du comparatif.
export const SERENITE_SOCLE = [
  "Protection EDR SentinelOne",
  "Supervision NinjaOne, alertes traitées par un technicien",
  "Inventaire du parc",
  "0 € de mise en service",
  "Déplacement sans frais dans 15 km autour d'Évry (main-d'œuvre selon le contrat)",
] as const;

// Seules les différences entre Essentiel et Complète.
export const SERENITE_COMPARATIF: { critere: string; detail?: string; essentiel: string; complete: string }[] = [
  { critere: "Prix par poste et par mois", essentiel: "39,99 € HT", complete: "79 € HT" },
  { critere: "Durée d'engagement", essentiel: "12 mois minimum", complete: "Aucune durée minimale, préavis de 2 mois" },
  { critere: "Les 3 premiers mois", essentiel: "Arrêt sans préavis", complete: "Arrêt sans préavis" },
  { critere: "Maintenance préventive", essentiel: "Automatisée", complete: "Socle automatisé et assistance couverte" },
  { critere: "Correctifs", essentiel: "Sécurité Windows", complete: "Mises à jour de sécurité ; périmètre logiciel défini au contrat" },
  {
    critere: "Assistance aux utilisateurs",
    detail: "Téléphone, e-mail et prise en main à distance",
    essentiel: "sur-devis",
    complete: "Incluse, demandes couvertes par le contrat",
  },
  { critere: "Microsoft 365 courant, arrivées et départs", essentiel: "sur-devis", complete: "inclus" },
  { critere: "Coordination avec les éditeurs", essentiel: "sur-devis", complete: "inclus" },
  { critere: "Double authentification (MFA)", essentiel: "Non incluse", complete: "inclus" },
  { critere: "Sensibilisation à l'hameçonnage", essentiel: "Non incluse", complete: "inclus" },
  { critere: "Réponse à incident cyber", essentiel: "Non incluse", complete: "inclus" },
  { critere: "Conseils sur le parc", essentiel: "Sur demande", complete: "inclus" },
  { critere: "Rapport d'activité et de sécurité", essentiel: "Trimestriel", complete: "Mensuel" },
  { critere: "Intervention sur site", essentiel: "sur-devis", complete: "Selon le contrat" },
];

export const SERENITE_PILIERS = [
  {
    num: "Protection",
    title: "EDR professionnel avec SentinelOne",
    desc: "Vos postes compatibles sont protégés par l'EDR SentinelOne. Il analyse les comportements suspects et peut bloquer ou isoler un poste selon sa configuration ; il complète les autres mesures de sécurité.",
    inclusions: ["Analyse des comportements suspects", "Blocage ou isolement selon la configuration", "Alertes traitées par un technicien", "Correctifs de sécurité suivis"],
    note: "Une protection qui réduit les risques, sans promettre une sécurité absolue.",
    image: "/images/nos-offres/pilier-cyber.jpg",
  },
  {
    num: "Supervision",
    title: "Supervision proactive avec NinjaOne",
    desc: "Un ordinateur montre souvent des signes de faiblesse avant de tomber en panne. NinjaOne suit les indicateurs techniques et nous remonte les alertes, traitées par un technicien aux horaires du support.",
    inclusions: ["État des postes", "Suivi des mises à jour", "Alertes automatiques", "Inventaire du parc"],
    note: "La supervision est automatisée et fonctionne en continu ; les alertes sont traitées par un technicien aux horaires du support.",
    image: "/images/nos-offres/pilier_maintenance.jpg",
  },
  {
    num: "Maintenance",
    title: "Une maintenance adaptée à votre formule",
    desc: "Essentiel automatise la maintenance préventive. Complète ajoute le diagnostic des incidents et l'assistance aux utilisateurs pour les demandes couvertes par le contrat.",
    inclusions: ["Opérations préventives automatisées", "Correctifs de sécurité Windows", "Assistance aux utilisateurs (Complète)", "Conseils sur le parc (Complète)"],
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
  title: "L'assistance de Complète, en *clair*",
  intro:
    "Un ordinateur qui ralentit, une application métier qui refuse de démarrer, un accès Outlook qui ne répond plus : les collaborateurs couverts sollicitent le support pour les incidents prévus au contrat, du lundi au vendredi de 8 h 30 à 19 h.",
  items: [
    {
      label: "Une assistance pour le quotidien",
      desc: "Les demandes de vos collaborateurs couverts par le contrat, sans plafond de nombre, par téléphone, e-mail et prise en main à distance.",
    },
    {
      label: "Des demandes suivies",
      desc: "Chaque incident est centralisé. L'historique aide à repérer les problèmes récurrents et à orienter les prochains diagnostics.",
    },
    {
      label: "Microsoft 365 et logiciels métier",
      desc: "Accompagnement courant sur Outlook, Teams et OneDrive, et coordination avec l'éditeur quand le problème vient de son logiciel. Les licences et les migrations restent hors abonnement.",
    },
    {
      label: "Sécurité des comptes et réponse à incident",
      desc: "Mise en place de la double authentification, sensibilisation de vos équipes à l'hameçonnage et réponse à incident cyber sur les postes et comptes couverts par le contrat.",
    },
  ],
  note: "La supervision est automatisée et fonctionne en continu. Dans les deux formules, les alertes sont traitées par un technicien aux horaires du support. Pour un incident critique signalé pendant les heures d'ouverture, notre objectif est une prise en charge sous 30 minutes : il s'agit du début du traitement, pas d'un délai de résolution. Les délais de prise en charge suivent nos niveaux de service.",
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
    desc: "Chaque mois, les indicateurs de supervision, les demandes traitées, les interventions réalisées et les recommandations. Un support clair pour vos décisions.",
  },
] as const;

export const SERENITE_POUR_QUI = {
  essentiel: "Essentiel convient à un indépendant ou à une petite équipe qui veut des postes protégés, supervisés et à jour. Plusieurs sites, serveurs ou applications spécifiques : nous étudions l'environnement et établissons une proposition sur mesure.",
  complete: "Complète convient à un cabinet, une agence, une entreprise du bâtiment ou une PME de services qui veut que ses collaborateurs appellent un support, et non un collègue, quand quelque chose bloque.",
} as const;

// Preuves : interventions réelles, anonymisées (secteur et taille seulement, aucun nom
// de client ni chiffre non vérifié). Le bandeau de logos attend l'accord écrit d'au moins
// deux clients de plus de 20 postes (décision de la direction, 27/10/2026).
export const SERENITE_PREUVES = {
  lienEtudes: { label: "Voir tous nos cas clients", href: "/cas-clients" },
  experience:
    "Nos techniciens ont assuré le support de proximité de parcs de plus de 800 utilisateurs. Aujourd'hui, nous mettons cette exigence au service des TPE et PME.",
  // Cas détaillés de /cas-clients mis en avant sur cette page (slugs de src/data/cas-clients.ts).
  casEnAvant: [
    "departs-collaborateurs-comptes-licences-cabinet-comptable-essonne",
    "messagerie-partagee-securisee-agence-immobiliere-corbeil-essonnes",
    "sauvegardes-verifiees-entreprise-maintenance-sainte-genevieve-des-bois",
    "pc-en-panne-devis-recuperes-entreprise-batiment-evry",
    "arrivee-nouveau-salarie-poste-pret-cabinet-conseil-paris",
    "pannes-reseau-repetees-pme-services-carre-senart",
  ],
  // Autres interventions réelles récentes, en bref.
  recentes: [
    {
      secteur: "Entreprise du bâtiment, 6 postes",
      titre: "Le constructeur concluait à une impasse",
      texte:
        "Un poste restait lent malgré une réparation par le constructeur, qui refusait d'aller plus loin. Notre diagnostic à distance a trouvé la cause : une mémoire virtuelle sous-dimensionnée. Corrigée sans déplacement.",
    },
    {
      secteur: "Entreprise du bâtiment, 6 postes",
      titre: "Un fichier malveillant arrêté par l'EDR",
      texte:
        "Un fichier malveillant caché dans un logiciel téléchargé sur un poste a été détecté et mis en quarantaine automatiquement par la protection SentinelOne, puis analysé par un technicien.",
    },
    {
      secteur: "Entreprise du bâtiment, 6 postes",
      titre: "Windows 11 sans racheter de licence",
      texte:
        "Une tour sous Windows 10 a été passée à Windows 11 Pro sur place, après activation des fonctions de sécurité nécessaires, sans perte de données ni nouvelle licence.",
    },
    {
      secteur: "Cabinet d'expertise comptable, Essonne",
      titre: "Des mises à jour bloquées depuis des semaines",
      texte:
        "Les correctifs de sécurité ne s'installaient plus. Nous avons réparé le système, installé le correctif en retard et réglé la supervision pour que la panne ne revienne pas.",
    },
    {
      secteur: "Cabinet d'expertise comptable, Essonne",
      titre: "Une installation complète, puis le quotidien",
      texte:
        "Création de l'environnement Microsoft 365 (comptes, messagerie), fourniture et installation du matériel, puis infogérance au quotidien.",
    },
  ],
} as const

export const SERENITE_LOCAL =
  "TRINEXTA est installée au 7 rue Montespan, 91000 Évry-Courcouronnes. Nos formules n'ont pas de minimum de postes : de 1 à 20 postes et au-delà, pour les entreprises du Grand Paris Sud, de l'Essonne et d'Île-de-France. La supervision et l'assistance à distance suivent vos postes où qu'ils soient, sous réserve de compatibilité et d'autorisation.";

export const SERENITE_ETAPES = [
  { title: "Échange et état des lieux, offert", desc: "Nombre de postes, environnement technique, prestations recherchées." },
  { title: "Proposition écrite", desc: "Postes, prix, options et conditions." },
  { title: "Signature : l'assistance démarre", desc: "Avec Complète, vos collaborateurs peuvent nous appeler dès la signature : téléphone, e-mail et prise en main à distance." },
  { title: "Installation des outils", desc: "Nous déployons la protection et la supervision sur les postes compatibles, à des créneaux choisis avec vous pour ne pas gêner le travail." },
  { title: "Rapports et suivi", desc: "Trimestriel pour Essentiel, mensuel pour Complète." },
];

export const SERENITE_OPTIONS = [
  {
    title: "Sauvegarde des données",
    price: "Sur étude",
    desc: "Les formules standard n'incluent pas la sauvegarde. Nous la proposons en option, après étude de vos données et de votre activité ; les données sauvegardées sont hébergées en France.",
  },
  {
    title: "Serveurs, NAS et réseau",
    price: "Sur devis",
    desc: "Les formules par poste ne couvrent pas l'administration complète de l'infrastructure. Nous la chiffrons à part.",
  },
  {
    title: "Projets, licences et matériel",
    price: "Sur devis",
    desc: "Migration Microsoft 365, renouvellement du parc, nouveaux équipements : devis distinct. Licences Microsoft 365 et logiciels non incluses ; leur gestion courante l'est dans Complète.",
  },
];

export const SERENITE_CTA = {
  line1: "Recevez une",
  line2: "proposition pour",
  line3: "votre parc",
  description:
    "Indiquez votre nombre de postes et la formule qui vous intéresse : nous revenons vers vous avec une proposition écrite. Téléphone : 09 78 25 07 46, du lundi au vendredi, de 8 h 30 à 19 h.",
  ctaLabel: "Demander une proposition",
  ctaHref: SERENITE_DEVIS_HREF,
} as const;

export const SERENITE_FAQ: { question: string; answer: string }[] = [
  {
    question: "Combien coûte TRINEXTA Sérénité ?",
    answer:
      "Sérénité Essentiel coûte 39,99 € HT par poste et par mois, avec un engagement de 12 mois. Sérénité Complète coûte 79 € HT par poste et par mois, sans durée minimale, avec un préavis de 2 mois. Aucun frais de mise en service. Licences, sauvegarde, serveurs, NAS, réseau, projets et matériel sont chiffrés à part.",
  },
  {
    question: "Quelle différence entre Essentiel et Complète ?",
    answer:
      "Essentiel couvre la protection EDR, la supervision, les mises à jour de sécurité, la maintenance préventive automatisée, l'inventaire et un rapport trimestriel. Complète ajoute l'assistance de vos collaborateurs pour les demandes couvertes par le contrat, le Microsoft 365 courant, les arrivées et départs, la coordination avec vos éditeurs, la double authentification, la sensibilisation à l'hameçonnage, la réponse à incident cyber et un rapport mensuel.",
  },
  {
    question: "L'assistance aux utilisateurs est-elle incluse dans Essentiel ?",
    answer:
      "Non. Essentiel couvre la supervision, la protection et les opérations automatisées ; les alertes sont traitées par un technicien. L'assistance aux utilisateurs et le dépannage font l'objet d'un devis.",
  },
  {
    question: "Pourquoi 12 mois d'engagement pour Essentiel ?",
    answer:
      "Essentiel repose sur la mise en place d'outils de protection et de supervision sur chaque poste, pensée pour durer. Pendant les 3 premiers mois, vous pouvez toutefois arrêter sans préavis. Les modalités de renouvellement et de résiliation figurent au contrat.",
  },
  {
    question: "Et si je ne suis pas satisfait ?",
    answer:
      "Les 3 premiers mois suivant la signature, vous pouvez arrêter Essentiel comme Complète sans préavis ni durée minimale à respecter. Les prestations déjà réalisées et les éventuels achats de matériel ou de licences restent dus.",
  },
  {
    question: "Quand l'assistance commence-t-elle ?",
    answer:
      "Avec Sérénité Complète, vos collaborateurs peuvent joindre le support dès la signature. L'installation des outils de protection et de supervision se fait ensuite sur les postes compatibles, à des créneaux convenus avec vous.",
  },
  {
    question: "Sérénité Complète est-elle sans engagement ?",
    answer:
      "Complète n'a pas de durée minimale. Vous pouvez y mettre fin avec un préavis de 2 mois, et sans préavis pendant les 3 premiers mois, selon les conditions contractuelles.",
  },
  {
    question: "Que veut dire « assistance illimitée » ?",
    answer:
      "Le nombre de demandes couvertes par le contrat n'est pas plafonné, aux horaires du support (lundi au vendredi, 8 h 30 à 19 h). Les projets, licences, interventions matérielles et prestations non prévues sont facturés en complément. Les délais de prise en charge suivent nos niveaux de service.",
  },
  {
    question: "EDR, RMM, MDR : que couvre Sérénité ?",
    answer:
      "L'EDR (SentinelOne) analyse les comportements suspects sur chaque poste et peut bloquer ou isoler un poste selon sa configuration. Le RMM (NinjaOne) supervise et entretient les postes à distance. Le MDR désigne une surveillance humaine dédiée en continu : il n'est pas inclus dans Sérénité.",
  },
  {
    question: "Les licences Microsoft 365 sont-elles incluses ?",
    answer:
      "Non. Les licences sont facturées à part. La gestion courante de Microsoft 365 (comptes, messagerie, Teams, OneDrive) est incluse dans Complète.",
  },
  {
    question: "Mes fichiers sont-ils sauvegardés ?",
    answer:
      "La sauvegarde n'est pas incluse dans les formules standard. Nous la proposons en option, après étude de vos données et de votre activité. Les données sauvegardées sont hébergées en France.",
  },
  {
    question: "Intervenez-vous sur site ?",
    answer:
      "Oui, dans toute l'Île-de-France. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; au-delà, le déplacement est facturé selon le devis. La main-d'œuvre sur site reste facturée selon le contrat. Avec Essentiel, les interventions sont sur devis.",
  },
  {
    question: "Quelles entreprises peuvent souscrire ?",
    answer:
      "Indépendants, TPE, cabinets, commerces et PME, de 1 à 20 postes et au-delà : nos formules n'ont pas de minimum de postes. Les PC Windows et les Mac sont pris en charge ; nous vérifions avant le déploiement que vos postes sont compatibles avec nos outils.",
  },
  {
    question: "Peut-on passer d'Essentiel à Complète ?",
    answer:
      "Demandez une proposition de changement de formule. Elle précisera la date de bascule et le traitement de l'engagement en cours.",
  },
  {
    question: "Comment obtenir une proposition ?",
    answer:
      "Appelez le 09 78 25 07 46 ou remplissez le formulaire de contact. Nous étudions le nombre de postes, leur compatibilité et le niveau de service attendu, puis vous envoyons une proposition écrite.",
  },
];

// Calculateur « nombre de postes » sous les cartes tarifaires.
export const SERENITE_CALCULATEUR = {
  surtitle: "Votre budget",
  titre: "Combien de postes à équiper ?",
  intro: "Indiquez le nombre d'ordinateurs de votre entreprise : le total mensuel s'affiche pour chaque formule.",
  min: 1,
  max: 100,
  defaut: 10,
  note: "Estimation hors licences, sauvegarde, options et interventions hors forfait. Le montant définitif figure dans la proposition écrite.",
} as const;
