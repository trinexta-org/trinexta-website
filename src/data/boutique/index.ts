import type { CodeCategorie, CodeVariante } from "@/lib/boutique/types"

// Contenus de la boutique de matériel professionnel (lot 4B). Les produits, prix et disponibilités
// viennent de l'API de l'espace client ; ce fichier ne porte que les textes du site.
// Règles : TONE.md, aucun délai ni prix inventé, aucune promesse (« garanti », « 24h/24 »...).

/** Commande et paiement : servis par l'espace client sur un hôte dédié (lot 4C). Le panier y est transmis. */
export const BOUTIQUE_COMMANDE_URL = "https://boutique.trinexta.fr/commande"

export const MENTION_PROFESSIONNELS = "Boutique réservée aux professionnels"

export const PANIER_TEXTES = {
  titre: "Votre panier",
  vide: "Votre panier est vide.",
  indicatif:
    "Prix indicatifs, calculés avec les tarifs du catalogue au moment de l'affichage. Le prix, la disponibilité et la livraison sont recalculés et confirmés à la commande.",
  continuer: "Continuer mes achats",
  commander: "Commander",
  indisponible: "Ce produit n'est plus proposé : retirez-le pour commander.",
  horsLigne: "Les prix ne peuvent pas être affichés pour le moment. Vous pouvez tout de même commander : ils seront calculés à l'étape suivante.",
}

/** Demande de devis par le formulaire de contact (question sur un produit, besoin particulier). */
export const COMMANDE_BASE = "/contact"

export function lienCommande(p: { slug: string; nom: string; variante?: CodeVariante; kit?: boolean }): string {
  const q = new URLSearchParams({ besoin: "materiel", produit: p.slug, nom: p.nom })
  if (p.variante) q.set("variante", p.variante)
  if (p.kit) q.set("kit", "1")
  return `${COMMANDE_BASE}?${q.toString()}#formulaire`
}

/** Lien de la boutique pour llms.txt et les renvois du site. */
export const BOUTIQUE_LIEN = {
  name: "Boutique",
  href: "/boutique",
  desc: "matériel informatique professionnel (portables, postes, écrans, accessoires, kits poste de travail), prix HT et TTC, installation possible par TRINEXTA",
}

export const BOUTIQUE_HERO = {
  surtitre: "Boutique · espace professionnel",
  titre: "Le matériel de vos équipes, choisi par votre *informaticien*",
  intro:
    "Portables, postes fixes, écrans, stations d'accueil et accessoires des marques que nous installons chez nos clients. Prix affichés en HT et en TTC, installation possible par TRINEXTA.",
}

export const BOUTIQUE_REASSURANCE = [
  {
    titre: "Du matériel professionnel",
    texte: "Gammes pro de Dell, HP, Lenovo, ASUS et Acer, avec fiches techniques complètes et références fabricant.",
  },
  {
    titre: "Installation par TRINEXTA",
    texte: "Vous pouvez recevoir le matériel prêt à l'emploi : nous le préparons, le configurons et l'installons chez vous.",
  },
  {
    titre: "Un interlocuteur à Évry-Courcouronnes",
    texte: "Une question avant d'acheter ? Vous parlez à notre équipe du Magellan, à Évry-Courcouronnes.",
  },
] as const

/** Catégories présentées dans la boutique (les kits ont leurs propres pages). */
export const CATEGORIES_BOUTIQUE: CodeCategorie[] = [
  "portable",
  "poste",
  "ecran",
  "accessoire",
  "peripherique",
  "reseau",
  "impression",
  "telephonie",
  "logiciel",
  "licence",
  "autre",
]

export interface ContenuCategorie {
  /** Nom au pluriel, pour les titres et le fil d'Ariane. */
  titre: string
  /** Titre de la page (balise title), sans « | TRINEXTA ». */
  seoTitre: string
  description: string
  intro: string
  /** Questions qu'un acheteur pose à un moteur ou à une IA avant d'acheter. */
  questions: { question: string; reponse: string }[]
}

const SANS_QUESTIONS: ContenuCategorie["questions"] = []

export const CONTENU_CATEGORIES: Record<CodeCategorie, ContenuCategorie> = {
  portable: {
    titre: "Ordinateurs portables",
    seoTitre: "Ordinateurs portables professionnels pour PME",
    description:
      "Portables professionnels Dell, HP, Lenovo, ASUS et Acer pour PME : prix HT et TTC, fiches techniques, installation possible par TRINEXTA à Évry.",
    intro:
      "Un portable pro se choisit sur trois points : la mémoire, l'autonomie et la garantie. Pour la bureautique et la visio, 16 Go suffisent. Pour plusieurs outils métier ouverts en même temps, prenez 32 Go.",
    questions: [
      {
        question: "Quel ordinateur portable choisir pour une PME ?",
        reponse:
          "Une gamme professionnelle plutôt qu'une gamme grand public : châssis plus solide, pièces disponibles plus longtemps, outils de gestion à distance. Visez un processeur récent, 16 Go de mémoire et un SSD de 512 Go pour un poste de bureau courant.",
      },
      {
        question: "16 ou 32 Go de mémoire ?",
        reponse:
          "16 Go pour la bureautique, la messagerie et la visio. 32 Go si vos équipes gardent ouverts un logiciel métier lourd, plusieurs navigateurs et des fichiers volumineux à la fois.",
      },
    ],
  },
  poste: {
    titre: "Ordinateurs fixes",
    seoTitre: "Ordinateurs fixes professionnels pour entreprise",
    description:
      "Unités centrales et ordinateurs fixes professionnels pour entreprise : prix HT et TTC, fiches techniques, installation possible par TRINEXTA.",
    intro:
      "Un poste fixe reste le plus durable pour un bureau où l'on ne se déplace pas : plus évolutif qu'un portable, moins cher à performances égales.",
    questions: [
      {
        question: "Portable ou poste fixe pour un collaborateur ?",
        reponse:
          "Fixe si la personne travaille toujours au même bureau. Portable avec station d'accueil si elle alterne bureau, télétravail et réunions.",
      },
    ],
  },
  ecran: {
    titre: "Écrans",
    seoTitre: "Écrans professionnels 24 et 27 pouces",
    description:
      "Écrans professionnels 24 et 27 pouces pour le bureau : pied réglable, connectique USB-C ou HDMI, prix HT et TTC.",
    intro:
      "Un deuxième écran fait gagner du temps dès qu'on travaille sur deux documents à la fois. Pour un bureau standard, 24 pouces suffisent ; 27 pouces pour les tableaux et les plans.",
    questions: [
      {
        question: "Un ou deux écrans par poste ?",
        reponse:
          "Deux écrans pour la comptabilité, la gestion et tous les métiers qui comparent ou recopient des données. Un seul suffit pour la saisie et la messagerie.",
      },
    ],
  },
  accessoire: {
    titre: "Accessoires",
    seoTitre: "Stations d'accueil, sacoches et accessoires pro",
    description:
      "Stations d'accueil USB-C, sacoches, câbles et accessoires pour postes professionnels : prix HT et TTC.",
    intro:
      "La station d'accueil transforme un portable en poste de bureau complet : un seul câble pour l'écran, le réseau, le clavier et la charge.",
    questions: [
      {
        question: "Quelle station d'accueil choisir ?",
        reponse:
          "Celle de la marque du portable quand elle existe : la compatibilité et les mises à jour sont assurées par le fabricant. Vérifiez le nombre d'écrans pris en charge et la puissance de charge.",
      },
    ],
  },
  peripherique: {
    titre: "Périphériques",
    seoTitre: "Claviers, souris et casques professionnels",
    description:
      "Claviers, souris et casques pour le bureau et la visio : périphériques professionnels, prix HT et TTC.",
    intro:
      "Un bon casque change la qualité des visios plus que n'importe quel réglage. Pour un open space, préférez un modèle avec réduction de bruit du micro.",
    questions: SANS_QUESTIONS,
  },
  reseau: {
    titre: "Réseau",
    seoTitre: "Matériel réseau pour PME",
    description: "Matériel réseau pour PME : prix HT et TTC, installation et configuration possibles par TRINEXTA.",
    intro:
      "Le réseau se dimensionne sur place : avant d'acheter, demandez-nous un avis, nous vous dirons ce qui est utile pour vos locaux.",
    questions: SANS_QUESTIONS,
  },
  impression: {
    titre: "Impression",
    seoTitre: "Imprimantes et impression pour entreprise",
    description: "Imprimantes et matériel d'impression pour entreprise : prix HT et TTC.",
    intro: "Pour un petit bureau, une imprimante réseau partagée revient souvent moins cher qu'une imprimante par poste.",
    questions: SANS_QUESTIONS,
  },
  telephonie: {
    titre: "Téléphonie",
    seoTitre: "Téléphonie professionnelle",
    description: "Matériel de téléphonie professionnelle : prix HT et TTC.",
    intro: "Casques, téléphones et accessoires pour vos appels et vos visios.",
    questions: SANS_QUESTIONS,
  },
  logiciel: {
    titre: "Logiciels",
    seoTitre: "Logiciels professionnels",
    description: "Logiciels professionnels : prix HT et TTC.",
    intro: "Logiciels pour les postes de travail de vos équipes.",
    questions: SANS_QUESTIONS,
  },
  licence: {
    titre: "Licences",
    seoTitre: "Licences professionnelles",
    description: "Licences logicielles professionnelles : prix HT et TTC.",
    intro: "Licences pour les outils de vos équipes.",
    questions: SANS_QUESTIONS,
  },
  kit: {
    titre: "Kits",
    seoTitre: "Kits poste de travail",
    description: "Kits poste de travail complets pour équiper un collaborateur.",
    intro: "",
    questions: SANS_QUESTIONS,
  },
  autre: {
    titre: "Autres équipements",
    seoTitre: "Autres équipements informatiques professionnels",
    description: "Équipements informatiques professionnels : prix HT et TTC.",
    intro: "Le reste du matériel que nous proposons à nos clients.",
    questions: SANS_QUESTIONS,
  },
}

export const KITS_CONTENU = {
  titre: "Kits poste de travail",
  seoTitre: "Kits poste de travail pour équiper un collaborateur",
  description:
    "Kits poste bureautique complets : portable, écran, station d'accueil, clavier, souris et sacoche. Variantes 16 ou 32 Go, un ou deux écrans.",
  intro:
    "Un nouvel arrivant, un poste à remplacer : le kit réunit tout ce qu'il faut pour un bureau complet, choisi par nos techniciens. Vous choisissez la mémoire et le nombre d'écrans, le reste est prévu.",
}

/** Aide au choix, si l'API n'en fournit pas pour un kit. */
export const AIDE_KIT_PAR_DEFAUT = {
  memoire: [
    {
      titre: "16 Go : le poste de bureau courant",
      texte:
        "Messagerie, Office, navigateur et visio en même temps, sans ralentir. C'est le bon choix pour la plupart des postes administratifs et commerciaux.",
    },
    {
      titre: "32 Go : plusieurs outils lourds à la fois",
      texte:
        "Logiciel métier, gros fichiers Excel, retouche ou plans, avec la visio par-dessus. Pour les profils qui sentent leur poste ramer aujourd'hui.",
    },
  ],
  ecrans:
    "Deux écrans pour ceux qui comparent, recopient ou contrôlent des données toute la journée : comptabilité, gestion, planification. Un seul pour les autres.",
}

export const BOUTIQUE_QUESTIONS = [
  {
    question: "Qui peut acheter sur la boutique TRINEXTA ?",
    reponse:
      "La boutique est un espace professionnel : entreprises, indépendants, associations. Un particulier peut aussi commander ; les prix sont affichés TTC pour tous.",
  },
  {
    question: "Les prix sont-ils HT ou TTC ?",
    reponse:
      "Les deux sont affichés sur chaque produit. L'éco-participation, quand elle s'applique, est indiquée à part.",
  },
  {
    question: "Pouvez-vous installer le matériel ?",
    reponse:
      "Oui. Nous pouvons préparer et configurer le matériel dans nos locaux d'Évry-Courcouronnes puis l'installer chez vous, ou vous le faire livrer directement.",
  },
  {
    question: "Je suis client Sérénité, où sont mes prix ?",
    reponse:
      "Dans votre espace client, rubrique Achats : vous y commandez avec vos conditions et votre code d'achat.",
  },
] as const

export const BOUTIQUE_REPLI = {
  titre: "La boutique est momentanément indisponible",
  texte:
    "Le catalogue ne répond pas pour le moment. Décrivez-nous le matériel qu'il vous faut : nous vous répondons avec une proposition.",
  cta: "Nous écrire",
  href: "/contact?besoin=materiel#formulaire",
}

/** Libellé de disponibilité, tel que l'API le donne. */
export const DISPONIBILITE_LIBELLE: Record<"en stock" | "sur commande", string> = {
  "en stock": "En stock",
  "sur commande": "Sur commande",
}

/** Tranches de prix proposées en filtre, en euros HT (le paramètre d'URL est en euros). */
export const TRANCHES_PRIX: { libelle: string; min?: number; max?: number }[] = [
  { libelle: "Moins de 100 € HT", max: 100 },
  { libelle: "100 à 500 € HT", min: 100, max: 500 },
  { libelle: "500 à 1 000 € HT", min: 500, max: 1000 },
  { libelle: "1 000 à 1 500 € HT", min: 1000, max: 1500 },
  { libelle: "Plus de 1 500 € HT", min: 1500 },
]

export const LIBELLES_TRI: { valeur: "" | "prix" | "-prix" | "nouveautes"; libelle: string }[] = [
  { valeur: "", libelle: "Pertinence" },
  { valeur: "prix", libelle: "Prix croissant" },
  { valeur: "-prix", libelle: "Prix décroissant" },
  { valeur: "nouveautes", libelle: "Nouveautés" },
]
