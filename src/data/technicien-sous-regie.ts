// Page /technicien-sous-regie : textes de la fiche 11 du dossier final (23/10/2026).
// Décision Q-003 : la régie reste sur trinexta.fr, sans aucun prix ni TJM chiffré,
// gérée par Talentero (renvoi vers talentero.fr).
// Retirés : « plus de 40 techniciens », « 2 à 3 profils sous 72h », « opérationnel dès J+1 »,
// « zéro frais », « transparence absolue », « dans les meilleurs délais ».
// Non publiés tant qu'ils ne sont pas validés : entité signataire, durée minimale,
// préavis type, statut des techniciens, missions hors Île-de-France.

import type { FaqItem } from "@/components/shared/FaqSection"

export const TALENTERO_URL = "https://talentero.fr"

export const REGIE_HERO = {
  part1: "Technicien informatique",
  part2: "en régie",
  cta: { label: "Décrire mon besoin", href: "/contact#formulaire" },
  subtitles: [
    "Un pic d'activité, un collaborateur absent, un déploiement à mener : un technicien qualifié pour une période donnée, sans recrutement en CDI.",
    "Un technicien support ou réseau en régie, recruté et suivi par Talentero, notre plateforme dédiée aux techniciens informatiques.",
    "Pour les entreprises d'Île-de-France. Le prix figure dans la proposition écrite, selon le profil et la durée.",
  ],
}

export const REGIE_INTRO = {
  titreDebut: "Renfort informatique,",
  titreAccent: "avec Talentero",
  accroche:
    "Un technicien qualifié pour la durée de votre besoin, sans ouvrir un recrutement en CDI.",
  paragraphes: [
    "TRINEXTA met à disposition des entreprises d'Île-de-France des techniciens informatiques en régie : support utilisateurs, gestion de parc, systèmes et réseaux, Microsoft 365, déploiement.",
    "La régie est gérée par Talentero, la plateforme de TRINEXTA dédiée au recrutement et à l'accompagnement des techniciens : sélection des profils, vérification des compétences, suivi des missions. La mission est facturée au jour travaillé ou au forfait mensuel ; le prix dépend du profil et de la durée et figure dans la proposition écrite.",
  ],
}

export const REGIE_SITUATIONS = {
  titreDebut: "Quand faire appel",
  titreAccent: "à un technicien en régie ?",
  paragraphes: [
    "Un technicien en régie rejoint votre équipe pour une durée définie, avec un prestataire qui recrute, suit la mission et reste votre interlocuteur.",
  ],
  items: [
    {
      label: "Pic d'activité",
      desc: "Un renfort pour tenir les délais pendant une période chargée.",
    },
    {
      label: "Absence à couvrir",
      desc: "Congé, arrêt, départ en cours de remplacement : le support de vos utilisateurs continue.",
    },
    {
      label: "Projet de déploiement",
      desc: "Renouvellement de postes, passage à Windows 11, migration Microsoft 365, déménagement.",
    },
    {
      label: "Besoin durable sans recrutement",
      desc: "Un technicien présent régulièrement, sans gérer vous-même l'embauche.",
    },
    {
      label: "Mission courte",
      desc: "Une intervention ciblée sur quelques jours.",
    },
  ],
}

export const REGIE_PILIERS = [
  {
    title: "Support utilisateurs",
    subtitle: "Niveaux 1 et 2",
    desc: "Demandes et incidents du quotidien : comptes, mots de passe, logiciels, connexion, lenteurs.",
    detail: "Vos collaborateurs ont un interlocuteur présent, qui connaît vos outils.",
  },
  {
    title: "Proximité et gestion de parc",
    subtitle: "Sur site",
    desc: "Préparation, installation, renouvellement et maintenance des postes, imprimantes et périphériques.",
    detail: "Un parc tenu à jour et suivi, au rythme de votre activité.",
  },
  {
    title: "Systèmes, réseaux et déploiement",
    subtitle: "Projets",
    desc: "Administration des serveurs, du réseau et des accès ; installation de postes et de logiciels en série, migrations ; Microsoft 365 (comptes, licences, Intune, Microsoft Entra ID, Teams, SharePoint).",
    detail: "Un renfort pour mener un projet sans surcharger votre équipe.",
  },
]

export const REGIE_PROFILS = [
  { role: "Support utilisateurs", spec: "Niveaux 1 et 2", image: "/images/nos-offres/profiles/profile-support-v2.jpg" },
  { role: "Gestion de parc", spec: "Technicien de proximité", image: "/images/nos-offres/profiles/profile-parc-v2.jpg" },
  { role: "Systèmes et réseaux", spec: "Serveurs, réseau, accès", image: "/images/nos-offres/profiles/profile-reseau.jpg" },
  { role: "Microsoft 365", spec: "Intune · Entra ID", image: "/images/nos-offres/profiles/profile-m365-v2.jpg" },
  { role: "Déploiement", spec: "Postes, logiciels, migrations", image: "/images/nos-offres/profiles/profile-deploiement-v2.jpg" },
  { role: "Cybersécurité", spec: "Sensibilisation, contrôles, remédiation", image: "/images/nos-offres/profiles/profile-cyber-v2.jpg" },
]

export const REGIE_ETAPES = [
  {
    num: "01",
    title: "Votre besoin",
    desc: "Profil, missions, lieu, durée estimée, date de démarrage souhaitée. Par téléphone, e-mail ou formulaire.",
  },
  {
    num: "02",
    title: "Proposition écrite",
    desc: "Profil recherché, mode de facturation, prix et conditions, validés avec vous avant toute recherche.",
  },
  {
    num: "03",
    title: "Présentation des candidats",
    desc: "Des profils qualifiés et briefés sur votre contexte. Vous choisissez.",
  },
  {
    num: "04",
    title: "Démarrage",
    desc: "Le technicien rejoint votre équipe, sur site ou en hybride selon la mission.",
  },
  {
    num: "05",
    title: "Suivi",
    desc: "Un point régulier avec vous pendant la mission.",
  },
]

export const REGIE_ETAPES_NOTE =
  "Le délai de présentation des profils dépend du profil et de la période : nous vous l'indiquons au moment de la proposition."

export const REGIE_FACTURATION = {
  titreDebut: "Notre modèle",
  titreAccent: "de facturation",
  texte:
    "Deux modes, au choix selon la mission. Le prix dépend du profil, de l'expérience demandée et de la durée. Vous pouvez nous indiquer votre budget ou un taux journalier cible : nous cherchons le profil cohérent avec. Les conditions de mission sont précisées dans la proposition.",
  modes: [
    {
      titre: "Au jour travaillé",
      sousTitre: "Missions courtes",
      texte: "Adapté aux missions courtes ou aux remplacements. Vous payez les jours effectivement travaillés.",
    },
    {
      titre: "Au forfait mensuel",
      sousTitre: "Missions longues",
      texte: "Adapté aux missions longues. Le budget est connu à l'avance.",
    },
  ],
}

/** « Technicien sans CDI : régie ou freelance ? » (intention des anciens articles Villejuif et Chevilly). */
export const REGIE_ALTERNATIVES = {
  surtitre: "Technicien sans CDI",
  ligne1: "Régie, freelance,",
  ligne2: "CDD ou intérim ?",
  items: [
    {
      title: "La régie",
      desc: "Un technicien intégré à votre équipe sur une durée définie, avec un prestataire qui recrute, suit la mission et reste votre interlocuteur. C'est ce que nous proposons, avec Talentero.",
    },
    {
      title: "Le freelance",
      desc: "Pour une mission précise et courte, avec un expert identifié. La continuité dépend d'une seule personne, et un indépendant qui travaille comme un salarié (horaires imposés, ordres directs, exclusivité) expose l'entreprise à un risque de requalification.",
    },
    {
      title: "Le CDD et l'intérim",
      desc: "Pour un poste que vous voulez encadrer vous-même, dans les cas prévus par le Code du travail (remplacement, surcroît temporaire d'activité).",
    },
    {
      title: "Sans technicien à demeure",
      desc: "Pour une petite entreprise sans service informatique, une autre réponse existe : confier le support à un prestataire. C'est notre infogérance Sérénité.",
    },
  ],
}

export const REGIE_FAQ: FaqItem[] = [
  {
    question: "Quelle différence entre la régie et votre infogérance ?",
    answer:
      "En régie, un technicien travaille dans votre équipe, pour une durée définie. En infogérance, notre équipe support prend en charge votre parc à distance et sur site, sans technicien à demeure, avec un abonnement par poste.",
  },
  {
    question: "Puis-je arrêter ou prolonger la mission ?",
    answer: "Oui, selon les conditions de préavis écrites dans la proposition et le contrat.",
  },
  {
    question: "Le technicien peut-il travailler sur nos outils et selon nos procédures ?",
    answer:
      "Oui. Il est présenté et briefé sur votre contexte avant le démarrage, et applique vos procédures pendant la mission.",
  },
  {
    question: "Où intervenez-vous ?",
    answer: "Nos techniciens interviennent dans toute l'Île-de-France.",
  },
  {
    question: "Combien coûte un technicien en régie ?",
    answer:
      "Le prix dépend du profil, de l'expérience demandée et de la durée. Il figure dans la proposition écrite, au jour travaillé ou au forfait mensuel.",
  },
  {
    question: "Je suis technicien informatique, comment rejoindre vos missions ?",
    answer:
      "Les candidatures passent par Talentero : rendez-vous sur talentero.fr ou sur notre page Nous rejoindre.",
  },
]
