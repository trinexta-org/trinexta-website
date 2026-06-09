import { notFound } from "next/navigation"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/nos-offres/OfferHero"
import { ImpulsionDetails } from "@/components/nos-offres/impulsion"
import { SereniteDetails } from "@/components/nos-offres/SereniteDetails"
import { ServicesDetails } from "@/components/nos-offres/ServicesDetails"
import { StudioDetails } from "@/components/nos-offres/StudioDetails"
import { FaqSection } from "@/components/nos-offres/FaqSection"
import { officialFaqs, OfferTag } from "@/components/nos-offres/faqData"

const OFFERS = {
  "impulsion": {
    title: "Offre Impulsion - Régie & Renfort IT | Trinexta",
    subtitles: [
      "Votre technicien support sur mesure. Une solution souple et ciblée pour renforcer vos équipes et absorber vos pics d'activité.",
      "Pas de frais cachés, pas de lourdeur inutile. La collaboration démarre simplement et s'adapte à votre budget réel.",
      "Une réponse rapide et concrète en Île-de-France : des profils qualifiés présentés dans les meilleurs délais."
    ],
    part1: "Offre",
    part2: "Impulsion",
    Component: ImpulsionDetails,
  },
  "serenite": {
    title: "Offre Sérénité - Infogérance complète | Trinexta",
    subtitles: [
      "L'informatique PME clé en main. Support illimité, maintenance proactive et cybersécurité avancée.",
      "Un modèle hybride unique : services managés, technicien sur site et un seul interlocuteur qui coordonne tout.",
      "Sécurisation systématique de vos données : sauvegardes, accès, et hébergement en France conforme RGPD."
    ],
    part1: "Offre",
    part2: "Sérénité",
    Component: SereniteDetails,
  },
  "services-annexes": {
    title: "Services Annexes IT & Cybersécurité | Trinexta",
    subtitles: [
      "Prestations IT sur mesure et à la demande. Conseils, matériel, réseaux et sauvegardes professionnelles.",
      "Des interventions ponctuelles ou projets spécifiques, pilotés de bout en bout par nos experts.",
      "Une approche « Fondations » : nous sécurisons et stabilisons vos infrastructures avec des solutions fiables et évolutives."
    ],
    part1: "Services",
    part2: "Annexes",
    Component: ServicesDetails,
  },
  "studio": {
    title: "Trinexta Studio - Création Web & SaaS | Trinexta",
    subtitles: [
      "Développement de sites internet sur mesure. Plateformes et solutions web performantes conçues par notre entreprise.",
      "Un accompagnement technique complet pour la création de vos outils métiers, portails clients ou vitrines digitales.",
      "Hébergement en France et conception sécurisée par design (Secure by Design) pour protéger vos utilisateurs."
    ],
    part1: "Trinexta",
    part2: "Studio",
    Component: StudioDetails,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const offer = OFFERS[slug as keyof typeof OFFERS]
  if (!offer) return {}

  return {
    title: offer.title,
    description: offer.subtitles[0],
  }
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const offer = OFFERS[slug as keyof typeof OFFERS]

  if (!offer) {
    notFound()
  }

  const { Component } = offer
  const filteredFaqs = officialFaqs.filter(faq =>
    faq.tags?.includes(slug as OfferTag) || faq.tags?.includes('general')
  )

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  }

  return (
    <main className="bg-primary min-h-screen relative pb-24">
      <JsonLd data={faqJsonLd} />
      
      <OfferHero 
        part1={offer.part1} 
        part2={offer.part2} 
        subtitles={offer.subtitles} 
      />

      <div className="w-full relative z-10 pt-12">
        <Component />
      </div>

      <FaqSection faqs={filteredFaqs} />
    </main>
  )
}