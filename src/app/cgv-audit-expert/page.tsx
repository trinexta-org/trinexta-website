import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { cgvAuditExpertData } from "@/data/cgv-audit-expert"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
    title: `${cgvAuditExpertData.hero.title}`,
    description: "Conditions Générales de Vente applicables à l'achat en ligne de l'Audit SEO Expert Trinexta.",
    alternates: {
        canonical: "/cgv-audit-expert",
    },
}

export default function CgvAuditExpertPage() {
    return (
        <main className="bg-primary min-h-screen relative space-y-12 pb-12">
            <BreadcrumbJsonLd
                items={[
                    { name: "Accueil", url: "/" },
                    { name: "CGV Audit SEO Expert", url: "/cgv-audit-expert" }
                ]}
            />
            <Section className="bg-primary pt-24 pb-24">
                <LegalContent data={cgvAuditExpertData} />
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