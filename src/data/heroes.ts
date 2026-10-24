import { HeroCarousel } from "@/components/ui/HeroCarousel"
import Image from "next/image"
import React from "react"

export type HomeHeroSlide = {
  title: string
  subtitle: string
  badge?: string
  cta?: { label: string; href: string }
  visual?: "coffee-shield"
}

// h1 fixe de l'accueil, porte la requete cible (prestataire informatique a Evry).
// Les titres des slides tournent et ne sont que des accroches.
export const homeHeroH1 = "Prestataire informatique pour TPE et PME à Évry-Courcouronnes"

// Message fixe (recommandation de la revue du 23/10) : une promesse, pas de défilement.
// Aucun prix ici : les montants restent sur /serenite.
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    title: "Votre informatique *suivie.* Une équipe qui connaît votre entreprise.",
    subtitle:
      "Assistance aux collaborateurs, maintenance des postes et protection informatique : TRINEXTA accompagne les TPE et PME depuis Évry-Courcouronnes, à distance et sur site en Île-de-France.",
  },
]

export const aproposHeroSlides = [
  {
    title: "Une *informatique* plus simple, humaine et utile",
    subtitle:
      "Nous considérons que l'informatique ne doit pas être une contrainte de plus dans votre quotidien. Elle doit être un appui fiable, clair et efficace, au service de votre activité."
  },
  {
    title: "L'humain au centre de notre *métier*",
    subtitle:
      "Derrière chaque demande, il y a un dirigeant, un collaborateur, une équipe. C'est pour cela que nous plaçons l'écoute et la confiance au centre de notre accompagnement."
  },
  {
    title: "Simplifier l'informatique pour soutenir votre *activité*",
    subtitle:
      "Bénéficiez d'un support dédié, d'un accès direct à nos experts qualifiés et d'une approche sur mesure pour vous aider à surmonter vos défis technologiques."
  }
]

// Le h1 de /contact est le titre de la slide active (1re au chargement).
export const contactHeroSlides = [
  {
    part1: "Parlons de",
    part2: "votre informatique",
    subtitle: "Un contrat d'infogérance, un changement de prestataire, une intervention ponctuelle : décrivez votre situation en quelques champs, ou appelez-nous directement."
  },
  {
    part1: "Déjà",
    part2: "client ?",
    subtitle: "Utilisez les canaux de support prévus à votre contrat, pour que votre demande soit suivie et documentée."
  },
  {
    part1: "Urgence",
    part2: "cyber ?",
    subtitle: "Ordinateur ou compte piraté : appelez-nous au 09 78 25 07 46, du lundi au vendredi de 8 h 30 à 19 h, et consultez notre charte d'assistance."
  }
]

export const blogHeroSlides = [
  {
    title: "Insights, *Ideas* & Innovation",
    subtitle: "Explorez nos articles d'experts, les tendances technologiques et nos conseils pratiques pour garder votre entreprise toujours en avance."
  },
  {
    title: "Cybersécurité : *Anticiper* les menaces",
    subtitle: "Protégez vos données et votre infrastructure grâce à nos guides détaillés sur les meilleures pratiques de sécurité informatique pour les PME."
  },
  {
    title: "Une informatique *performante* et agile",
    subtitle: "Découvrez comment l'infogérance moderne et le cloud transforment votre parc informatique en un véritable levier de croissance."
  },
  {
    title: "La technologie au service de *l'Humain*",
    subtitle: "Retrouvez nos retours d'expérience, études de cas et conseils pour garantir une adoption technologique fluide par vos équipes."
  }
]
