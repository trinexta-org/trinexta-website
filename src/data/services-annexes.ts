// Page /services-annexes (« Dépannage et interventions ») : textes de la fiche 10
// du dossier final (23/10/2026). Interventions ponctuelles, sur devis.
// Règles : aucun tarif d'intervention (horaire, journée, déplacement) ; aucun
// délai chiffré. Partenaires affichables : Microsoft, Dell et Lenovo (partenariats confirmés
// par la direction le 27/10/2026 : devis constructeur, licences et tenants Microsoft 365
// pour les clients), MCA Technology et TD Synnex (distributeurs).

import type { FaqItem } from "@/components/shared/FaqSection"

export const SA_HERO = {
  part1: "Dépannage et interventions",
  part2: "informatiques sur devis",
  cta: { label: "Demander un devis", href: "/contact#formulaire" },
  subtitles: [
    "À Évry et en Essonne, avec ou sans contrat d'infogérance : chaque intervention fait l'objet d'un devis préalable.",
    "Un poste qui ne démarre plus, dix ordinateurs à remplacer, un déménagement : certaines demandes ne justifient pas un contrat.",
    "Nous analysons le besoin, vous remettons un devis clair et intervenons à distance ou sur site.",
  ],
}

export const SA_INTRO = {
  surtitre: "Dépannage et interventions",
  titreDebut: "Interventions ponctuelles, ",
  titreAccent: "sans abonnement",
  texte:
    "Un poste qui ne démarre plus, dix ordinateurs à remplacer, un déménagement de bureaux, un parc encore sous Windows 10 : certaines demandes ne justifient pas un contrat. Nous analysons le besoin, vous remettons un devis clair et intervenons à distance ou sur site, depuis notre bureau d'Évry-Courcouronnes.",
  enBref:
    "En bref : interventions ponctuelles pour les entreprises d'Évry, de l'Essonne et d'Île-de-France, avec ou sans contrat d'infogérance. Chaque intervention fait l'objet d'un devis préalable. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; le temps passé sur site est facturé selon le devis. Équipe joignable du lundi au vendredi, de 8 h 30 à 19 h.",
}

export interface SujetActuel {
  label: string
  desc: string
  lien?: { label: string; href: string }
}

/** Accordéon « Ce qui vous concerne en ce moment ». */
export const SA_SUJETS = {
  titreDebut: "Ce qui vous concerne",
  titreAccent: "en ce moment",
  intro:
    "Deux échéances touchent les petites entreprises cette année, et une règle guide tous nos conseils matériel.",
  items: [
    {
      label: "Fin de Windows 10",
      desc: "Microsoft a arrêté le support de Windows 10 le 14 octobre 2025 : les postes qui l'utilisent encore ne reçoivent plus de correctifs de sécurité, sauf programme payant de mises à jour étendues, limité dans le temps. Nous faisons l'inventaire de vos postes, indiquons lesquels peuvent passer à Windows 11 et lesquels doivent être remplacés, puis réalisons la migration en vérifiant vos logiciels métier.",
    },
    {
      label: "Facturation électronique",
      desc: "Depuis le 1er septembre 2026, les entreprises concernées doivent pouvoir recevoir des factures électroniques ; l'émission s'étend aux PME et microentreprises au 1er septembre 2027 (calendrier officiel sur impots.gouv.fr). Plateforme et paramétrage comptable relèvent de vous, de votre expert-comptable et de votre éditeur. Notre rôle : des postes à jour et compatibles, des accès nominatifs protégés par la double authentification, des droits retirés au départ d'un collaborateur, la coordination technique avec votre éditeur.",
    },
    {
      label: "Conseiller avant de vendre",
      desc: "Avant de recommander un achat, nous évaluons ce que vous avez déjà. Un poste de quelques années peut souvent être prolongé : nous le faisons quand c'est rentable, et nous vous le disons quand ça ne l'est plus.",
    },
  ] satisfies SujetActuel[],
}

export interface InterventionSurDevis {
  title: string
  desc: string
  image: string
  points: string[]
}

/** Carrousel « Nos interventions sur devis » (une image existante par carte). */
export const SA_INTERVENTIONS: InterventionSurDevis[] = [
  {
    title: "Dépannage informatique",
    desc: "Poste lent ou qui ne démarre plus, imprimante introuvable, messagerie bloquée, logiciel qui plante. Diagnostic à distance quand c'est possible, sur site quand il le faut.",
    image: "/images/services-annexes/formation-utilisateurs.webp",
    points: [
      "Diagnostic à distance, avec votre accord",
      "Intervention sur site si nécessaire",
      "Test avec vous avant de partir",
      "Compte rendu de ce qui a été fait",
    ],
  },
  {
    title: "Nouveaux postes et renouvellement de parc",
    desc: "Inventaire, choix des postes selon les usages réels plutôt que selon le catalogue, commande du matériel auprès de nos partenaires MCA Technology et TD Synnex, préparation et livraison. Le collaborateur retrouve son environnement le jour de la livraison.",
    image: "/images/services-annexes/conseil-materiel.webp",
    points: [
      "Inventaire et choix selon les usages",
      "Commande via MCA Technology et TD Synnex",
      "Préparation et installation des logiciels",
      "Transfert des données de l'ancien poste",
      "Connexion à la messagerie et aux imprimantes",
    ],
  },
  {
    title: "Passage à Windows 11 et à Windows Professionnel",
    desc: "Vérification de la compatibilité de chaque poste, mise à niveau quand le matériel le permet, remplacement sinon. Les postes achetés en grande surface sont souvent en édition Famille, sans les fonctions utiles en entreprise : mise à niveau vers Professionnel sans réinstallation complète.",
    image: "/images/services-annexes/windows-pro.webp",
    points: [
      "Inventaire de compatibilité Windows 11",
      "Mise à niveau ou remplacement",
      "Windows Famille vers Professionnel, licence comprise dans le devis",
      "Chiffrement BitLocker et gestion centralisée",
      "Contrôle des logiciels métier après migration",
    ],
  },
  {
    title: "Remise à niveau d'un poste existant",
    desc: "Ajout de mémoire, passage à un disque SSD, réinstallation propre. Un poste de quelques années peut souvent être prolongé : nous le faisons quand c'est rentable, et nous vous le disons quand ça ne l'est plus.",
    image: "/images/services-annexes/optimisation-poste.webp",
    points: [
      "Diagnostic du poste",
      "Ajout de mémoire si utile",
      "Passage à un disque SSD",
      "Réinstallation propre si besoin",
    ],
  },
  {
    title: "Migration de la messagerie vers Microsoft 365",
    desc: "Transfert des e-mails, contacts et calendriers, configuration du domaine et des appareils, double authentification. Le calendrier est précisé après vérification de l'environnement.",
    image: "/images/services-annexes/migration-messagerie-365.webp",
    points: [
      "Création de l'environnement Microsoft 365",
      "Transfert des e-mails, contacts et calendriers",
      "Configuration des ordinateurs et téléphones",
      "Double authentification",
    ],
  },
  {
    title: "Sécurisation de la messagerie",
    desc: "Double authentification, protection contre l'hameçonnage, enregistrements SPF, DKIM et DMARC de votre domaine pour limiter l'usurpation de vos adresses.",
    image: "/images/services-annexes/securisation-messagerie.webp",
    points: [
      "Double authentification sur les comptes",
      "Protection contre l'hameçonnage",
      "Enregistrements SPF, DKIM et DMARC",
    ],
  },
  {
    title: "Arrivée ou départ d'un collaborateur",
    desc: "Arrivée : compte, poste, messagerie, logiciels. Départ : fermeture des accès, transfert de la messagerie et des fichiers.",
    image: "/images/services-annexes/arrivee-depart.webp",
    points: [
      "Création du compte et préparation du poste",
      "Accès à la messagerie et aux logiciels",
      "Fermeture des accès au départ",
      "Transfert de la messagerie et des fichiers",
    ],
  },
  {
    title: "Réseau, Wi-Fi et déménagement de bureaux",
    desc: "Routeur, Wi-Fi avec réseau invités séparé, partage des imprimantes et des dossiers. Pour un déménagement : inventaire avant le départ, démontage et remontage des équipements, coordination avec l'opérateur, tests le jour de la reprise.",
    image: "/images/services-annexes/reseau-entreprise.webp",
    points: [
      "Routeur et Wi-Fi, réseau invités séparé",
      "Partage des imprimantes et des dossiers",
      "Inventaire, démontage et remontage",
      "Coordination avec l'opérateur, tests à la reprise",
    ],
  },
  {
    title: "Mise en place d'une sauvegarde",
    desc: "En option : étude du besoin et mise en place, avec des données hébergées en France.",
    image: "/images/services-annexes/sauvegarde-pro.webp",
    points: [
      "Étude du besoin",
      "Mise en place et planification",
      "Données hébergées en France",
    ],
  },
  {
    title: "Postes et accès prêts pour la facturation électronique",
    desc: "Le choix de la plateforme et le paramétrage comptable relèvent de vous, de votre expert-comptable et de votre éditeur. Nous préparons le côté informatique.",
    image: "/images/services-annexes/environnement-365.webp",
    points: [
      "Postes à jour et compatibles",
      "Comptes nominatifs avec double authentification",
      "Droits attribués et retirés au bon moment",
      "Coordination technique avec votre éditeur",
    ],
  },
]

export const SA_ETAPES = [
  {
    num: "01",
    title: "Votre demande",
    desc: "Par téléphone, par e-mail ou via le formulaire de contact.",
  },
  {
    num: "02",
    title: "Analyse et devis",
    desc: "Nous précisons le besoin avec vous, puis nous vous remettons un devis écrit avant toute intervention.",
  },
  {
    num: "03",
    title: "Intervention",
    desc: "À distance ou sur site, à la date convenue. Nous testons avec vous avant de partir.",
  },
  {
    num: "04",
    title: "Après l'intervention",
    desc: "Un compte rendu de ce qui a été fait, et un interlocuteur si une question se pose ensuite.",
  },
]

export const SA_ETAPES_NOTE =
  "Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; le temps passé sur site est facturé selon le devis. Au-delà, les conditions sont précisées dans le devis."

/** Partenaires matériel validés le 23/10/2026. Logos absents : affichage par nom. */
export const SA_PARTENAIRES: { name: string; role: string; logo?: string }[] = [
  { name: "Microsoft", role: "Licences et environnements Microsoft 365 de nos clients.", logo: "/images/partners/microsoft.png" },
  { name: "Dell", role: "Postes et écrans professionnels, devis constructeur.", logo: "/images/partners/Dell.png" },
  { name: "Lenovo", role: "Postes professionnels, devis constructeur.", logo: "/images/partners/Lenovo.jpg" },
  { name: "MCA Technology", role: "Distribution de matériel." },
  { name: "TD Synnex", role: "Distribution de matériel." },
]

export const SA_SUIVI = {
  texte:
    "Si les dépannages se répètent, un contrat est souvent plus simple : supervision des postes, mises à jour, protection EDR et, avec la formule Complète, assistance aux utilisateurs.",
  lien: { label: "Découvrir les formules Sérénité", href: "/serenite" },
}

export const SA_FAQ: FaqItem[] = [
  {
    question: "Intervenez-vous sans contrat d'infogérance ?",
    answer: "Oui. Toutes les prestations de cette page se font sur devis, sans abonnement.",
  },
  {
    question: "Combien coûte une intervention ?",
    answer:
      "Le prix dépend du besoin, du nombre de postes et du lieu d'intervention. Vous recevez un devis écrit avant toute intervention.",
  },
  {
    question: "Sous quel délai pouvez-vous intervenir ?",
    answer:
      "Cela dépend de la nature de la demande et de notre planning. Nous vous donnons une date au moment du devis.",
  },
  {
    question: "Pouvez-vous dépanner à distance ?",
    answer:
      "Oui, quand le poste démarre et se connecte à Internet. Nous prenons la main avec votre accord et vous voyez ce que nous faisons.",
  },
  {
    question: "Prenez-vous en charge les Mac ?",
    answer: "Oui. Nous intervenons sur les Mac comme sur les PC Windows.",
  },
  {
    question: "Vous déplacez-vous dans nos locaux ?",
    answer:
      "Oui. Pas de frais de déplacement pour les interventions programmées dans un rayon de 15 km autour d'Évry ; le temps passé sur site est facturé selon le devis.",
  },
]
