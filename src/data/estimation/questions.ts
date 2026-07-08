import type { EstimationQuestion } from "./types";

// Arbre de découverte du tunnel d'estimation.
// Aucune question ne demande de choisir un service : la détection
// découle des réponses (voir src/lib/estimation/flow.ts).
// Plafond dur : 7 questions quel que soit le chemin.

export const MAX_QUESTIONS = 7;

export const ESTIMATION_QUESTIONS: EstimationQuestion[] = [
  {
    id: "effectif",
    title: "Combien de personnes travaillent dans votre entreprise ?",
    subtitle: "Une idée suffit, pas besoin du chiffre exact.",
    options: [
      { id: "solo", label: "Je travaille seul ou presque", description: "1 à 2 personnes", units: 2 },
      { id: "petite", label: "Une petite équipe", description: "3 à 10 personnes", units: 6 },
      { id: "moyenne", label: "Une équipe qui grandit", description: "11 à 50 personnes", units: 25 },
      { id: "grande", label: "Une structure établie", description: "Plus de 50 personnes", units: 60 },
    ],
  },
  {
    id: "besoins",
    title: "Qu'est-ce qui vous amène aujourd'hui ?",
    subtitle: "Plusieurs choix possibles.",
    multiple: true,
    options: [
      {
        id: "lenteurs",
        label: "Notre informatique nous fait perdre du temps",
        description: "Pannes, lenteurs, mises à jour repoussées, personne pour s'en occuper",
      },
      {
        id: "securite",
        label: "La sécurité nous inquiète",
        description: "Phishing, mots de passe, accès mal maîtrisés, conformité",
      },
      {
        id: "sauvegarde",
        label: "Perdre nos fichiers serait une catastrophe",
        description: "Sauvegardes incertaines, données au même endroit, pas de plan B",
      },
      {
        id: "collaboration",
        label: "On veut mieux travailler ensemble",
        description: "Emails, partage de fichiers, visio, télétravail",
      },
      {
        id: "projet",
        label: "Nous avons un projet à réaliser",
        description: "Site web, application, outil métier, automatisation",
      },
      {
        id: "renfort",
        label: "Il nous faut un renfort technique",
        description: "Un technicien en plus, ponctuellement ou dans la durée",
      },
      {
        id: "depannage",
        label: "Il nous faut quelqu'un à appeler en cas de pépin",
        description: "Un interlocuteur fiable quand ça bloque, sans engagement lourd",
      },
    ],
  },
  {
    id: "parc",
    title: "Combien de postes de travail utilisez-vous ?",
    subtitle: "PC fixes, portables et Mac confondus.",
    options: [
      { id: "p1", label: "1 à 5 postes", units: 4 },
      { id: "p2", label: "6 à 15 postes", units: 10 },
      { id: "p3", label: "16 à 40 postes", units: 25 },
      { id: "p4", label: "Plus de 40 postes", units: 55 },
    ],
  },
  {
    id: "criticite",
    title: "Si votre informatique s'arrête une journée, que se passe-t-il ?",
    options: [
      {
        id: "genant",
        label: "C'est gênant, on s'adapte",
        description: "On peut travailler autrement en attendant",
      },
      {
        id: "grave",
        label: "On perd du temps et de l'argent",
        description: "Une partie de l'activité est bloquée",
      },
      {
        id: "critique",
        label: "C'est critique, tout s'arrête",
        description: "Impossible de facturer, produire ou livrer",
      },
    ],
  },
  {
    id: "projet-type",
    title: "Quel type de projet avez-vous en tête ?",
    options: [
      {
        id: "site",
        label: "Un site web",
        description: "Site vitrine, refonte, e-commerce",
      },
      {
        id: "app",
        label: "Une application",
        description: "Application web ou mobile pour vos clients ou vos équipes",
      },
      {
        id: "outil",
        label: "Un outil métier",
        description: "Logiciel adapté à votre activité : gestion, suivi, facturation",
      },
      {
        id: "automatisation",
        label: "Automatiser ce qui nous fait perdre du temps",
        description: "Connecter vos outils, supprimer les saisies en double",
      },
    ],
  },
  {
    id: "projet-envergure",
    title: "Comment imaginez-vous ce projet ?",
    options: [
      {
        id: "simple",
        label: "Simple et efficace",
        description: "L'essentiel, bien fait, sans superflu",
      },
      {
        id: "standard",
        label: "Complet",
        description: "Des fonctionnalités spécifiques à votre activité",
      },
      {
        id: "sur-mesure",
        label: "Ambitieux et sur mesure",
        description: "Un projet structurant pour votre entreprise",
      },
    ],
  },
  {
    id: "serveurs",
    title: "Avez-vous des serveurs ou un NAS ?",
    subtitle: "Les machines qui hébergent vos fichiers ou vos logiciels en interne.",
    options: [
      { id: "aucun", label: "Non, tout est sur les postes ou dans le cloud" },
      { id: "un", label: "Oui, un serveur ou un NAS" },
      { id: "plusieurs", label: "Oui, plusieurs" },
      { id: "nsp", label: "Je ne sais pas" },
    ],
  },
  {
    id: "renfort-categorie",
    title: "Sur quel terrain ce renfort doit-il intervenir ?",
    options: [
      {
        id: "support-infra",
        label: "Support & Infrastructure",
        description: "Assistance utilisateurs, postes, réseau, serveurs",
      },
      {
        id: "developpement",
        label: "Développement",
        description: "Sites, applications, outils métier, intégrations",
      },
      {
        id: "cybersecurite",
        label: "Cybersécurité",
        description: "Sécurisation, audits, conformité, gestion des accès",
      },
      {
        id: "pilotage",
        label: "Pilotage",
        description: "Chefferie de projet, coordination, conduite du changement",
      },
    ],
  },
  {
    id: "renfort-profil",
    title: "Quel renfort vous faudrait-il ?",
    options: [
      {
        id: "ponctuel",
        label: "Ponctuel",
        description: "Quelques jours pour un besoin précis",
        units: 2,
      },
      {
        id: "regulier",
        label: "Régulier, à temps partiel",
        description: "Une présence récurrente chaque semaine",
        units: 10,
      },
      {
        id: "plein",
        label: "À temps plein",
        description: "Un technicien dédié sur plusieurs mois",
        units: 20,
      },
    ],
  },
  {
    id: "renfort-duree",
    title: "Sur quelle durée imaginez-vous cette collaboration ?",
    subtitle: "Un engagement plus long donne droit à un tarif préférentiel.",
    options: [
      {
        id: "6-mois",
        label: "6 mois",
        description: "Engagement sur un semestre",
      },
      {
        id: "12-mois",
        label: "12 mois",
        description: "Engagement sur l'année",
      },
    ],
  },
  {
    id: "collab-etat",
    title: "Où en êtes-vous côté outils de travail ?",
    options: [
      {
        id: "rien",
        label: "Rien de structuré",
        description: "Chacun se débrouille avec ses outils",
      },
      {
        id: "disperse",
        label: "Des outils dispersés",
        description: "Un peu de Google, un peu de Dropbox, des licences par-ci par-là",
      },
      {
        id: "m365-sous-exploite",
        label: "Microsoft 365 est en place",
        description: "Mais on est loin d'en tirer le maximum",
      },
    ],
  },
];

export const ESTIMATION_QUESTIONS_BY_ID: Record<string, EstimationQuestion> =
  Object.fromEntries(ESTIMATION_QUESTIONS.map((q) => [q.id, q]));
