// Programme d'apporteurs d'affaires « TRINEXTA Partenaires » : source unique du contenu de /partenaires,
// de l'e-mail de notification et du lien du pied de page. Texte validé par Valoux le 20/11/2026.

/** Boîte qui reçoit les candidatures (surchargeable par PARTENAIRE_TO_EMAIL). */
export const PARTENAIRES_EMAIL = "partenaire@trinexta.fr"

export const PARTENAIRES_LIEN = { name: "Devenir partenaire", href: "/partenaires" } as const

export const PARTENAIRES_META = {
  title: "Devenir apporteur d'affaires informatique | TRINEXTA",
  description:
    "Recommandez TRINEXTA aux dirigeants de TPE et PME : 15 % sur l'infogérance pendant 12 mois, 10 % sur les sites et applications. Sans frais d'entrée.",
}

export const PARTENAIRES_HERO = {
  surtitre: "TRINEXTA Partenaires",
  titre: "Vos contacts ont besoin d'un informaticien. Proposez TRINEXTA, vous êtes rémunéré.",
  intro:
    "TRINEXTA Partenaires est le réseau d'apporteurs d'affaires de TRINEXTA, prestataire informatique des TPE et PME à Évry-Courcouronnes.",
  cta: "Devenir partenaire",
}

// Rôle du partenaire (parcours décidé par Valoux le 24/11/2026, contrat partenaire v2.0) : il identifie
// l'entreprise et son besoin, présente TRINEXTA et recueille l'accord du dirigeant ; TRINEXTA fait tout le reste
// (prise de contact, rendez-vous, proposition, contrat, réalisation). Même parcours que la plaquette Partenaires.
export const PARTENAIRES_ETAPES: { titre: string; texte: string }[] = [
  {
    titre: "Vous identifiez",
    texte:
      "Un dirigeant de votre réseau a un souci informatique ou un projet : messagerie, PC qui rame, prestataire injoignable, site à refaire. Vous lui présentez TRINEXTA et recueillez son accord.",
  },
  {
    titre: "Vous recommandez",
    texte: "Depuis votre espace partenaire, vous renseignez l'entreprise, son besoin et les créneaux où le dirigeant peut être appelé.",
  },
  {
    titre: "Nous prenons le relais",
    texte: "Prise de contact, rendez-vous, analyse du besoin, proposition, signature et réalisation : notre équipe s'occupe de tout et vous tient informé à chaque étape.",
  },
  {
    titre: "Vous touchez vos commissions",
    texte: "Vous suivez vos recommandations dans votre espace et percevez vos commissions sur les prestations facturées et encaissées.",
  },
]

// Barème du contrat d'apport d'affaires v2.0 (annexe 1), validé par Valoux le 24/11/2026.
export const PARTENAIRES_COMMISSIONS: { chiffre: string; texte: string }[] = [
  { chiffre: "15 %", texte: "de l'infogérance, pendant les 12 premiers mois du contrat" },
  { chiffre: "10 %", texte: "des sites et applications, sur les factures HT du projet" },
  { chiffre: "3 %", texte: "de la maintenance et de l'hébergement web, pendant 12 mois" },
  { chiffre: "Jusqu'à 5 %", texte: "de la régie informatique, pendant 12 mois au plus" },
  { chiffre: "3 %", texte: "de parrainage sur les affaires des partenaires que vous faites entrer" },
  { chiffre: "0 €", texte: "pas de frais d'entrée, pas d'engagement, pas d'objectif imposé" },
]

export const PARTENAIRES_VERSEMENT =
  "Commissions calculées sur le chiffre d'affaires HT encaissé, versées sur simple facture de votre part. En régie, le cumul des commissions est plafonné à 5 %, parrainage compris."

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
    question: "Qu'est-ce qu'une bonne recommandation ?",
    reponse:
      "Un besoin réel et décrit, une entreprise et un interlocuteur identifiés, un dirigeant qui sait qui est TRINEXTA et qui accepte d'être appelé. Vous le renseignez en quelques minutes depuis votre espace partenaire.",
  },
  {
    question: "Dois-je être informaticien ?",
    reponse:
      "Non. Vous créez la mise en relation, nous apportons la solution : rendez-vous, analyse du besoin, proposition, contrat et réalisation sont assurés par TRINEXTA.",
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
    reponse: "Oui, un contrat d'apport d'affaires signé en ligne, sans exclusivité ni engagement de volume. Une formation de 15 minutes vous présente ensuite le fonctionnement de votre espace.",
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

// Exemples chiffrés (demande de Valoux du 20/11/2026) : personnages d'exemple avec un prénom et un métier.
// Chaque carte reste titrée « Exemple » et la note précise qu'il s'agit d'exemples de parcours : ils ne doivent
// jamais être présentés comme des témoignages de partenaires réels (pas de citation, de photo ni de nom complet).
/** Abonnement moyen de référence par poste et par mois, utilisé seulement pour les exemples de commission. Jamais affiché comme un prix. */
export const PARTENAIRES_PRIX_POSTE = 79
export const PARTENAIRES_TAUX = 0.15

export interface ExemplePartenaire {
  prenom: string
  metier: string
  duree: string
  /** Mois d'arrivée de chaque entreprise signée et nombre de postes. */
  clients: { mois: number; entreprise: string; postes: number }[]
}

export const PARTENAIRES_EXEMPLES: ExemplePartenaire[] = [
  {
    prenom: "Karim",
    metier: "commercial multicarte",
    duree: "6 mois",
    clients: [
      { mois: 1, entreprise: "un cabinet comptable", postes: 5 },
      { mois: 2, entreprise: "une agence immobilière", postes: 8 },
      { mois: 4, entreprise: "une PME de transport", postes: 10 },
      { mois: 6, entreprise: "un groupe de pharmacies", postes: 12 },
    ],
  },
  {
    prenom: "Sophie",
    metier: "graphiste indépendante",
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
  "Exemples de parcours, calculés sur un abonnement moyen de référence. La commission réelle dépend du prix de chaque contrat ; elle est versée pendant les 12 mois qui suivent la signature de l'entreprise."

export const PARTENAIRES_SIMULATEUR = {
  titre: "Calculez vos gains",
  intro: "Combien d'entreprises pourriez-vous nous présenter, et de quelle taille ?",
  entreprises: { min: 1, max: 20, defaut: 4 },
  postes: { min: 2, max: 30, defaut: 8 },
}
