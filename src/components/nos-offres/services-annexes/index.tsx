"use client"

import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ServicesIntro } from "./ServicesIntro"
import { ServicesApproach } from "./ServicesApproach"
import { ServicesGrid } from "./ServicesGrid"
import { ServicesProcess } from "./ServicesProcess"
import { ServicesPartners } from "./ServicesPartners"

export function ServicesDetails() {
    return (
        <div id="services-annexes" className="space-y-24 pb-24">

            <Section container={false} className="pt-0">
                <Container className="max-w-[1400px] space-y-24">
                    <ServicesIntro />
                    <ServicesApproach />
                </Container>
            </Section>

            <div className="space-y-12">
                <TransitionTitle
                    surtitle="Prestations à la carte"
                    line1="Nos services"
                    line2="sur devis"
                />
                <Section container={false} className="py-0">
                    <Container className="max-w-[1400px]">
                        <ServicesGrid />
                    </Container>
                </Section>

                <Section container={false} className="py-0">
                    <Container className="max-w-[1400px]">
                        <ServicesProcess />
                    </Container>
                </Section>
            </div>


            <div className="space-y-12">
                <TransitionTitle
                    surtitle="Écosystème"
                    line1="Nos"
                    line2="partenaires"
                />
                <Section container={false} className="py-0">
                    <Container className="max-w-[1400px]">
                        <ServicesPartners />
                    </Container>
                </Section>
            </div>

        </div>
    )
}