import { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/shared/OfferHero"
import { FaqSection } from "@/components/shared/FaqSection"
import { officialFaqs } from "@/components/shared/faqData"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { WaveDivider } from "@/components/ui/WaveDivider"
import { StudioIntro } from "@/components/studio/StudioIntro"
import { StudioDifferentiator } from "@/components/studio/StudioDifferentiator"
import { StudioGrid } from "@/components/studio/StudioGrid"
import { StudioPaymentPlan } from "@/components/studio/StudioPaymentPlan"
import StudioDemos from "@/components/studio/StudioDemos"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { Button } from "@/components/ui/Button"
import { FinalCTA } from "@/components/FinalCTA"

export const metadata: Metadata = {
    title: "Création de site web et application pour PME",
    description: "TRINEXTA Studio conçoit des sites internet et des applications web sur mesure pour les TPE et PME : site vitrine, refonte, outil métier et référencement.",
    alternates: {
        canonical: "/trinexta-studio",
    },
}

export default function TrinextaStudioPage() {
    const filteredFaqs = officialFaqs.filter(faq =>
        faq.tags?.includes('studio') || faq.tags?.includes('general')
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

            {/* =========================================================
                BLOC SOMBRE
                Hero + Intro
                ========================================================= */}
            <section className="relative bg-primary">
                <OfferHero
                    part1="Trinexta"
                    part2="Studio"
                    subtitles={[
                        "Développement de sites internet sur mesure. Plateformes et solutions web performantes conçues par notre entreprise.",
                        "Un accompagnement technique complet pour la création de vos outils métiers, portails clients ou vitrines digitales.",
                        "Hébergement en France et conception sécurisée par design (Secure by Design) pour protéger vos utilisateurs."
                    ]}
                    imageSrc="/images/nos-offres/hero-studio.jpg"
                />

                <div className="w-full relative z-10 pt-12 pb-16">
                    <Section container={false} className="pt-0">
                        <Container className="max-w-[1400px]">
                            <StudioIntro />
                        </Container>
                    </Section>
                </div>
            </section>

            {/* =========================================================
                TRANSITION SOMBRE → CLAIR
                ========================================================= */}
            <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

            {/* =========================================================
                BLOC CLAIR
                Différenciateur + Grille + Démos
                ========================================================= */}
            <section className="relative bg-surface">
                <div className="space-y-32 py-16">

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Notre vision"
                            line1="Pourquoi choisir"
                            line2="notre Studio"
                        />
                        <Section container={false}>
                            <Container className="max-w-[1400px]">
                                <StudioDifferentiator />
                            </Container>
                        </Section>
                    </div>

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Développement"
                            line1="Nos solutions"
                            line2="Web & SaaS"
                        />
                        <Section container={false}>
                            <Container className="max-w-[1400px]">
                                <StudioGrid />
                            </Container>
                        </Section>
                    </div>

                    <Section container={false}>
                        <Container className="max-w-[1400px]">
                            <BannerCTA
                                variant="surface"
                                title="Site WordPress piraté ? Nous savons intervenir."
                                description="Analyse de la compromission, isolement des fichiers malveillants, sécurisation des accès : découvrez notre intervention sur plusieurs sites WordPress et e-commerce."
                                action={
                                    <Link href="/cas-clients/piratage-sites-wordpress-ecommerce">
                                        <Button variant="secondary" className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold">
                                            Voir le cas client
                                        </Button>
                                    </Link>
                                }
                            />
                        </Container>
                    </Section>

                    <StudioPaymentPlan />

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Démonstrations"
                            line1="Testez nos modèles"
                            line2="en conditions réelles"
                        />
                        <Section container={false}>
                            <Container className="max-w-[1400px]">
                                <StudioDemos />
                            </Container>
                        </Section>
                    </div>

                    <Section container={false}>
                        <Container className="max-w-[1400px]">
                            <BannerCTA
                                variant="surface"
                                title="Votre site est-il vraiment vu par Google ?"
                                description="Obtenez votre score SEO en 30 secondes, gratuitement et sans engagement."
                                action={
                                    <Button asChild variant="secondary" size="lg">
                                        <Link href="/audit-seo">Lancer mon audit gratuit</Link>
                                    </Button>
                                }
                            />
                        </Container>
                    </Section>

                </div>
            </section>

            <FinalCTA
                line1="Un projet web complexe ?"
                line2="Développons votre outil."
                line3="Avec rigueur."
                description="Nous concevons des plateformes performantes sur mesure. Pas de superflu, juste des outils qui répondent à vos besoins métiers."
                ctaLabel="Lancer mon projet"
                ctaHref="/contact"
            />

            <FaqSection faqs={filteredFaqs} />
        </main>
    )
}
