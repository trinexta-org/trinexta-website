import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { GridCards } from "@/components/layout/GridCards"
import { FinalCTA } from "@/components/FinalCTA"
import { Heading } from "@/components/ui/Typography"
import { legalDocuments } from "@/data/legal-documents"
import { LegalDocCard } from "@/components/legal/LegalDocCard"

export const metadata: Metadata = {
  title: "Informations juridiques - Trinexta",
  description: "Tous les documents légaux et contractuels de TRINEXTA : mentions légales, CGV, confidentialité, DPA, SLA et procédures de sécurité.",
}

export default function InformationsJuridiquesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <Section className="bg-primary pt-12 lg:pt-8 pb-6 lg:pb-8">
        <div className="max-w-4xl mb-6 lg:mb-8">
          <Heading as="h1" className="text-4xl md:text-5xl font-extrabold text-white mb-4" emphasis={false}>
            Informations juridiques
          </Heading>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            L&apos;ensemble de nos documents légaux, contractuels et de sécurité.
          </p>
        </div>
        <GridCards columns={3} mobileColumns={1} gap="gap-4 md:gap-5">
          {legalDocuments.map((doc) => (
            <LegalDocCard key={doc.slug} {...doc} />
          ))}
        </GridCards>
      </Section>

      <FinalCTA
        line1="Vous aider à"
        line2="surmonter vos"
        line3="défis technologiques"
        description="Trinexta by Trustech IT Support simplifie et sécurise votre informatique. Un accompagnement fiable, souple et adapté à votre performance."
        ctaLabel="En savoir plus"
        ctaHref="/nos-offres"
      />
    </main>
  )
}
