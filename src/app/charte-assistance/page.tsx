import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { FaqSection } from "@/components/shared/FaqSection"
import { JsonLd } from "@/components/seo/JsonLd"
import { charteAssistanceData, FAQ_CHARTE_ASSISTANCE } from "@/data/charte-assistance"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

const DESCRIPTION =
  "Ordinateur piraté, compte Microsoft 365 compromis, rançongiciel, e-mail suspect : les premiers gestes à faire et comment joindre TRINEXTA."

export const metadata: Metadata = {
  title: charteAssistanceData.hero.title,
  description: DESCRIPTION,
  alternates: {
    canonical: "/charte-assistance",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CHARTE_ASSISTANCE.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function CharteAssistancePage() {
  return (
    <main className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Ordinateur ou compte piraté", url: "/charte-assistance" },
        ]}
      />
      <JsonLd data={faqJsonLd} />

      <Section className="bg-surface pt-24 pb-24">
        <LegalContent data={charteAssistanceData} />
      </Section>

      <FaqSection faqs={FAQ_CHARTE_ASSISTANCE} />

      <FinalCTA
        line1="Besoin d'aide"
        line2="maintenant ?"
        line3="Appelez-nous."
        description="09 78 25 07 46, du lundi au vendredi, de 8 h 30 à 19 h. Ou laissez vos coordonnées : nous vous rappelons."
        ctaLabel="Être rappelé"
        ctaHref="/contact#formulaire"
      />
    </main>
  )
}
