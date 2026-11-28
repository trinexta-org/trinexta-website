import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"

export const metadata: Metadata = {
  title: "Logiciels métier et réseau en Essonne",
  description: "Logiciel métier inaccessible, réseau instable, téléphonie à organiser : TRINEXTA étudie les besoins de votre entreprise et coordonne les intervenants.",
  alternates: {
    canonical: "/solutions-metier",
  },
  openGraph: {
    title: "Logiciels métier et réseau en Essonne | TRINEXTA",
    description: "Logiciel métier inaccessible, réseau instable, téléphonie à organiser : TRINEXTA étudie les besoins de votre entreprise et coordonne les intervenants.",
    url: "/solutions-metier",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logiciels métier et réseau en Essonne | TRINEXTA",
    description: "Logiciel métier inaccessible, réseau instable, téléphonie à organiser : TRINEXTA étudie les besoins de votre entreprise et coordonne les intervenants.",
    images: ["/images/og-default.png"],
  },
}

const solutionsData = {
  serviceSlug: "solutions-metier",

  hero: {
    titlePart1: "Logiciels métier,",
    titlePart2: "réseau et téléphonie",
    description: "TRINEXTA aide les entreprises de l'Essonne et d'Île-de-France à comprendre ce qui bloque entre leurs logiciels métier, leur réseau et leur téléphonie, puis coordonne les intervenants concernés : éditeur, opérateur, fournisseur de matériel.",
    ctaText: "Décrire mon environnement",
    ctaHref: "/contact"
  },

  problem: {
    subtitle: "Les situations que nous rencontrons",
    title: "Quand personne ne sait d'où vient le problème",
    description: "Le logiciel de facturation ne s'ouvre plus le lundi matin. Le Wi-Fi coupe plusieurs fois par jour. La connexion au serveur du bureau est lente depuis la maison. L'éditeur dit que le problème vient du réseau, l'opérateur dit que tout fonctionne de son côté, et c'est le dirigeant qui passe ses journées au téléphone. Notre rôle : établir d'où vient la panne, puis faire intervenir la bonne personne.",
    painPoints: [
      "Un logiciel métier qui ne s'ouvre plus ou devient très lent, sans explication claire.",
      "Un réseau ou un Wi-Fi qui coupe à répétition et interrompt le travail des équipes.",
      "Des accès à distance au serveur ou aux fichiers du bureau difficiles ou instables.",
      "Une téléphonie mal organisée : appels perdus, renvois qui ne fonctionnent pas.",
      "Plusieurs prestataires qui se renvoient la responsabilité, sans personne pour trancher."
    ]
  },

  offer: {
    subtitle: "Ce que nous faisons",
    title: "Qualifier, corriger ce qui relève de nous, coordonner le reste",
    description: "Nous commençons par observer : quel poste, quel logiciel, quel moment de la journée, quels utilisateurs. Nous corrigeons ce qui relève du poste, du réseau ou des accès, et nous contactons l'éditeur ou l'opérateur avec un diagnostic précis lorsque la correction lui revient.",
    features: [
      {
        title: "Diagnostic poste, réseau ou logiciel",
        desc: "Nous établissons si un blocage vient du poste, du réseau, du serveur ou du logiciel lui-même. C'est la première étape pour ne pas payer une intervention inutile ni remplacer du matériel qui fonctionne."
      },
      {
        title: "Réseau et Wi-Fi du bureau",
        desc: "Nous vérifions la box, les commutateurs et les bornes Wi-Fi, séparons le réseau des visiteurs de celui de l'entreprise et organisons les accès à distance au bureau de façon sécurisée."
      },
      {
        title: "Coordination avec l'éditeur de vos logiciels métier",
        desc: "Comptabilité, facturation, gestion commerciale ou planning : nous préparons l'environnement technique du logiciel et nous traitons avec l'éditeur à votre place. Les corrections du logiciel lui-même restent de la responsabilité de l'éditeur. Cette coordination est une option de votre contrat."
      },
      {
        title: "Téléphonie de l'entreprise",
        desc: "Nous vous aidons à organiser la téléphonie : renvois d'appels, postes fixes ou logiciels, compatibilité avec votre réseau. Le choix de l'opérateur et l'abonnement restent les vôtres."
      },
      {
        title: "Accès et droits des collaborateurs",
        desc: "Chaque collaborateur accède aux fichiers et aux logiciels dont il a besoin, et ses accès sont retirés à son départ. Nous documentons ces droits pour que vous sachiez qui a accès à quoi."
      }
    ]
  },

  benefits: {
    subtitle: "Ce que vous y gagnez",
    title: "Un seul interlocuteur quand vos outils ne fonctionnent pas",
    items: [
      {
        title: "Moins de temps perdu à chercher la cause",
        desc: "Vous n'avez plus à arbitrer entre l'éditeur, l'opérateur et le vendeur de matériel : nous établissons le diagnostic et nous faisons intervenir la bonne personne."
      },
      {
        title: "Un réseau qui tient la journée",
        desc: "Un Wi-Fi et un réseau correctement configurés réduisent les coupures qui interrompent le travail et les accès aux logiciels."
      },
      {
        title: "Des accès maîtrisés",
        desc: "Vous savez qui accède à quoi, et un départ de collaborateur ne laisse pas d'accès ouvert."
      },
      {
        title: "Un environnement documenté",
        desc: "Ce que nous mettons en place est noté : le jour où un nouvel intervenant arrive, il ne repart pas de zéro."
      }
    ]
  },

  faq: [
    {
      question: "Intervenez-vous avec l'éditeur de mon logiciel ?",
      answer: "Oui, si cette coordination est prévue dans votre contrat. Nous préparons le poste et le réseau, nous décrivons le problème à l'éditeur et nous suivons sa résolution. Les corrections du logiciel lui-même restent de sa responsabilité."
    },
    {
      question: "Comment savoir si le problème vient du poste ou du réseau ?",
      answer: "Nous regardons si le problème touche un seul poste ou tous, s'il apparaît à certaines heures, au bureau ou à distance. Ces observations suffisent souvent à orienter le diagnostic avant toute intervention."
    },
    {
      question: "Le Wi-Fi de notre bureau coupe sans arrêt : que pouvez-vous faire ?",
      answer: "Nous vérifions l'emplacement et le réglage des bornes, les interférences, la box et les commutateurs. Selon le résultat, nous corrigeons la configuration ou nous vous recommandons le matériel à remplacer, sans changer ce qui fonctionne."
    },
    {
      question: "Pouvez-vous reprendre une téléphonie existante ?",
      answer: "Nous étudions d'abord votre installation et votre contrat d'opérateur. Nous vous indiquons ce qui peut être conservé et ce qui doit évoluer, puis nous préparons le changement avec vous pour limiter la gêne pendant la transition."
    },
    {
      question: "Ces prestations sont-elles incluses dans Sérénité ?",
      answer: "L'offre Sérénité couvre la supervision, la maintenance et la protection des postes. La coordination avec les éditeurs, les interventions sur le réseau et la téléphonie sont des options définies dans votre proposition."
    }
  ],

  cta: {
    line1: "Un outil",
    line2: "qui bloque",
    line3: "votre journée ?",
    description: "Décrivez-nous le logiciel, le réseau ou la téléphonie qui pose problème. Nous commençons par un état des lieux offert, puis nous vous proposons une intervention adaptée.",
    buttonText: "Décrire mon environnement",
    buttonHref: "/contact"
  }
}

export default function SolutionsMetierPage() {
  return <ServicePage {...solutionsData} />
}