import { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/shared/OfferHero"
import { FaqSection } from "@/components/shared/FaqSection"
import { officialFaqs } from "@/components/shared/faqData"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { TechnicienIntro } from "@/components/technicien-sous-regie/TechnicienIntro"
import { TechnicienConcret } from "@/components/technicien-sous-regie/TechnicienConcret"
import { TechnicienSteps } from "@/components/technicien-sous-regie/TechnicienSteps"
import { TechnicienPillars } from "@/components/technicien-sous-regie/TechnicienPillars"
import { TechnicienProfiles } from "@/components/technicien-sous-regie/TechnicienProfiles"
import { TechnicienPricing } from "@/components/technicien-sous-regie/TechnicienPricing"
import { TechnicienAssurances } from "@/components/technicien-sous-regie/TechnicienAssurances"
import { FinalCTA } from "@/components/FinalCTA"

export const metadata: Metadata = {
    title: "Technicien sous régie - Régie & Renfort IT | Trinexta",
    description: "Votre technicien support sur mesure. Une solution souple et ciblée pour renforcer vos équipes et absorber vos pics d'activité.",
}

export default function TechnicienSousRegiePage() {
    const filteredFaqs = officialFaqs.filter(faq =>
        faq.tags?.includes('technicien-sous-regie') || faq.tags?.includes('general')
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
                part1="Technicien"
                part2="Sous régie"
                subtitles={[
                    "Votre technicien support sur mesure. Une solution souple et ciblée pour renforcer vos équipes et absorber vos pics d'activité.",
                    "Pas de frais cachés, pas de lourdeur inutile. La collaboration démarre simplement et s'adapte à votre budget réel.",
                    "Une réponse rapide et concrète en Île-de-France : des profils qualifiés présentés dans les meilleurs délais."
                ]}
                imageSrc="/images/nos-offres/hero-impulsion.jpg"
            />

            <div className="w-full relative z-10 pt-12">
                <div id="technicien" className="space-y-24 pb-24">
                    <Section container={false} className="pt-0">
                        <Container className="max-w-[1400px] space-y-24">
                            <TechnicienIntro />
                            <TechnicienConcret />
                            <TechnicienSteps />
                        </Container>
                    </Section>

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Périmètre d'intervention"
                            line1="Des experts du support"
                            line2="à votre service"
                        />
                        <Section container={false} className="py-0">
                            <Container className="max-w-[1400px]">
                                <TechnicienPillars />
                            </Container>
                        </Section>
                    </div>

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Profils mobilisés"
                            line1="Les experts que"
                            line2="nous envoyons"
                        />
                        <Section container={false} className="py-0">
                            <Container className="max-w-[1400px]">
                                <TechnicienProfiles />
                            </Container>
                        </Section>
                    </div>

                    <Section container={false} className="py-0">
                        <Container className="max-w-[1400px]">
                            <TechnicienPricing />
                        </Container>
                    </Section>

                    <div className="space-y-12">
                        <TransitionTitle
                            surtitle="Nos engagements"
                            line1="Simple, souple"
                            line2="sans surprises"
                        />
                        <Section container={false} className="py-0">
                            <Container className="max-w-[1400px]">
                                <TechnicienAssurances />
                            </Container>
                        </Section>
                    </div>
                </div>
            </div>

            <FinalCTA
                line1="Prêt à trouver"
                line2="le technicien qui"
                line3="fera la différence ?"
                description="Donnez une nouvelle impulsion à votre support IT. Nous vous aidons à surmonter vos défis technologiques avec des profils adaptés à vos besoins réels."
                ctaLabel="Trouver mon technicien"
                ctaHref="/contact"
            />

            <FaqSection faqs={filteredFaqs} />
        </main>
    )
}