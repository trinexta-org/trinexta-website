// Programme d'apporteurs d'affaires « TRINEXTA Partenaires » : source unique du contenu de /partenaires,
// de l'e-mail de notification et du lien du pied de page. Texte validé par Valoux le 20/11/2026.

/** Boîte qui reçoit les candidatures (surchargeable par PARTENAIRE_TO_EMAIL). */
export const PARTENAIRES_EMAIL = "partenaire@trinexta.fr"

export const PARTENAIRES_LIEN = { name: "Devenir partenaire", href: "/partenaires" } as const

export const PARTENAIRES_META = {
  title: "Devenir apporteur d'affaires informatique | TRINEXTA Partenaires",
  description:
    "Recommandez TRINEXTA aux dirigeants de TPE et PME qui ont besoin d'un informaticien et touchez 15 % du montant mensuel de l'infogérance pendant 12 mois. Sans frais ni engagement.",
}

export const PARTENAIRES_HERO = {
  surtitre: "TRINEXTA Partenaires",
  titre: "Vos contacts ont besoin d'un informaticien. Proposez TRINEXTA, vous êtes rémunéré.",
  intro:
    "TRINEXTA Partenaires est le réseau d'apporteurs d'affaires de TRINEXTA, prestataire informatique des TPE et PME à Évry-Courcouronnes.",
  cta: "Devenir partenaire",
}

// Rôle du partenaire (précisé par Valoux le 20/11/2026) : il repère l'entreprise et crée la proposition
// depuis son accès partenaire à l'espace client ; TRINEXTA réalise l'audit, l'installation et le suivi.
export const PARTENAIRES_ETAPES: { titre: string; texte: string }[] = [
  {
    titre: "Vous repérez une entreprise",
    texte:
      "Un dirigeant qui se plaint de sa messagerie, d'un PC qui rame ou d'un prestataire injoignable : vous nous le présentez, avec son accord.",
  },
  {
    titre: "Nous réalisons l'audit",
    texte: "Un technicien TRINEXTA fait le point sur son informatique : postes, sauvegardes, sécurité, Microsoft 365.",
  },
  {
    titre: "Vous créez la proposition",
    texte:
      "Depuis votre accès partenaire à l'espace client TRINEXTA, vous établissez la proposition à partir de l'audit et vous la présentez au client.",
  },
  {
    titre: "Vous touchez votre commission",
    texte: "Le client signe avec TRINEXTA, nous assurons l'installation et le suivi. Vous êtes payé chaque mois, pendant 12 mois.",
  },
]

export const PARTENAIRES_COMMISSIONS: { chiffre: string; texte: string }[] = [
  { chiffre: "15 %", texte: "du montant mensuel HT de l'infogérance, pendant 12 mois" },
  { chiffre: "3 %", texte: "de parrainage quand un partenaire que vous avez fait entrer signe des clients" },
  { chiffre: "0 €", texte: "pas de frais d'entrée, pas d'engagement, pas d'objectif imposé" },
]

export const PARTENAIRES_VERSEMENT =
  "Commission versée sur les factures encaissées, sur simple facture de votre part."

export const PARTENAIRES_PROFILS: string[] = [
  "Freelances du web, graphistes et community managers",
  "Commerciaux indépendants et agents multicartes",
  "Comptables et assistants administratifs indépendants",
  "Courtiers et agents immobiliers d'entreprise",
  "Installateurs : télécom, alarme, électricité, bureautique",
]

export const PARTENAIRES_CONDITION =
  "Pour devenir partenaire, il faut obligatoirement une entreprise immatriculée, avec un numéro SIRET : c'est elle qui nous facture vos commissions."

export const PARTENAIRES_ARGUMENTS: { titre: string; texte: string }[] = [
  {
    titre: "Un technicien attitré par client",
    texte: "Il intervient sur place en Essonne et en Île-de-France, et connaît l'entreprise de vos contacts.",
  },
  {
    titre: "L'humain avant les tickets",
    texte: "Vos contacts parlent à quelqu'un qui connaît leur entreprise, pas à une plateforme.",
  },
  {
    titre: "Une réputation protégée",
    texte: "Vous recommandez une société qui répond. Votre recommandation vous fait honneur.",
  },
]

export const PARTENAIRES_FAQ: { question: string; reponse: string }[] = [
  {
    question: "Comment préparer une proposition ?",
    reponse:
      "Vous recevez un accès partenaire à l'espace client TRINEXTA. Vous y créez la proposition à partir de l'audit, avec nos offres et nos tarifs à jour.",
  },
  {
    question: "Dois-je être informaticien ?",
    reponse:
      "Non. L'audit technique est réalisé par TRINEXTA. Vous préparez la proposition à partir de cet audit, depuis votre accès partenaire.",
  },
  {
    question: "Et si le client connaît déjà TRINEXTA ?",
    reponse:
      "Le contact est enregistré à votre nom dès sa déclaration. S'il était déjà chez nous, nous vous le disons tout de suite.",
  },
  {
    question: "Comment suis-je payé ?",
    reponse: "Chaque mois, sur facture, après encaissement du paiement du client.",
  },
  {
    question: "Faut-il une société ?",
    reponse:
      "Oui. Il faut une entreprise immatriculée avec un numéro SIRET, qui nous adresse une facture pour chaque commission.",
  },
  {
    question: "Y a-t-il un contrat ?",
    reponse: "Oui, un contrat partenaire simple, sans exclusivité ni engagement de volume.",
  },
]

export const PARTENAIRES_SOURCES = [
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "bouche-a-oreille", label: "Bouche-à-oreille" },
  { value: "recherche", label: "Recherche Google" },
  { value: "autre", label: "Autre" },
] as const

export const PARTENAIRES_SOURCE_VALUES = PARTENAIRES_SOURCES.map((s) => s.value) as [
  (typeof PARTENAIRES_SOURCES)[number]["value"],
  ...(typeof PARTENAIRES_SOURCES)[number]["value"][],
]

export function libelleSource(value?: string): string {
  return PARTENAIRES_SOURCES.find((s) => s.value === value)?.label ?? "Non renseigné"
}

export const PARTENAIRES_MESSAGE_SUCCES =
  "Merci. Nous vous rappelons pour vous présenter le partenariat et vous envoyer le contrat."

// Exemples chiffrés (demande de Valoux du 20/11/2026) : profils types désignés par leur métier, sans nom,
// pour ne jamais les faire passer pour des témoignages de partenaires réels.
/** Prix public Sérénité Complète, en € HT par poste et par mois (voir src/data/serenite.ts). */
export const PARTENAIRES_PRIX_POSTE = 79
export const PARTENAIRES_TAUX = 0.15

export interface ExemplePartenaire {
  /** Profil type, avec article : « Un commercial multicarte ». */
  profil: string
  /** Sujet de la phrase de synthèse : « il » / « elle ». */
  pronom: string
  duree: string
  /** Mois d'arrivée de chaque entreprise signée et nombre de postes. */
  clients: { mois: number; entreprise: string; postes: number }[]
}

export const PARTENAIRES_EXEMPLES: ExemplePartenaire[] = [
  {
    profil: "Un commercial multicarte",
    pronom: "il",
    duree: "6 mois",
    clients: [
      { mois: 1, entreprise: "un cabinet comptable", postes: 5 },
      { mois: 2, entreprise: "une agence immobilière", postes: 8 },
      { mois: 4, entreprise: "une PME de transport", postes: 10 },
      { mois: 6, entreprise: "un groupe de pharmacies", postes: 12 },
    ],
  },
  {
    profil: "Une graphiste indépendante",
    pronom: "elle",
    duree: "4 mois",
    clients: [
      { mois: 1, entreprise: "un artisan électricien", postes: 3 },
      { mois: 3, entreprise: "un institut de beauté", postes: 6 },
      { mois: 4, entreprise: "une agence de communication", postes: 9 },
    ],
  },
]

/** Commission mensuelle pour un nombre de postes suivis. */
export function commissionMensuelle(postes: number): number {
  return Math.round(postes * PARTENAIRES_PRIX_POSTE * PARTENAIRES_TAUX * 100) / 100
}

/** Postes suivis et commission à la fin de chaque mois où une entreprise arrive. */
export function progressionExemple(e: ExemplePartenaire) {
  let postes = 0
  return e.clients.map((c) => {
    postes += c.postes
    return { ...c, postesSuivis: postes, commission: commissionMensuelle(postes) }
  })
}

export function formaterEuros(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "\u00a0€"
}

/** Temps moyen consacré au partenariat dans les exemples (indiqué par Valoux le 20/11/2026). */
export const PARTENAIRES_EXEMPLES_TEMPS = "2 heures par semaine"

export const PARTENAIRES_EXEMPLES_NOTE =
  "Calculs réalisés sur la formule Sérénité Complète à 79 € HT par poste et par mois. La commission de chaque entreprise est versée pendant les 12 mois qui suivent sa signature."

export const PARTENAIRES_SIMULATEUR = {
  titre: "Calculez vos gains",
  intro: "Combien d'entreprises pourriez-vous nous présenter, et de quelle taille ?",
  entreprises: { min: 1, max: 20, defaut: 4 },
  postes: { min: 2, max: 30, defaut: 8 },
}
