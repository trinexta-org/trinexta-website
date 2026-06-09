"use client"

import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { SereniteIntro } from "./SereniteIntro"
import { SereniteStats } from "./SereniteStats"
import { SereniteConcret } from "./SereniteConcret"
import { SerenitePillars } from "./SerenitePillars"
import { SereniteTargets } from "./SereniteTargets"
import { SerenitePricing } from "./SerenitePricing"
import { SereniteOptions } from "./SereniteOptions"

export function SereniteDetails() {
  return (
    <div id="serenite" className="space-y-24 pb-24">
      
      <Section container={false} className="pt-0">
        <Container className="max-w-[1400px] space-y-24">
          <SereniteIntro />
          <SereniteStats />
          <SereniteConcret />
        </Container>
      </Section>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Les piliers"
          line1="Les 3 piliers de"
          line2="l'offre Sérénité"
        />
        <Section container={false} className="py-0">
          <Container className="max-w-[1400px]">
            <SerenitePillars />
          </Container>
        </Section>
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Bénéficiaires"
          line1="Pour qui est"
          line2="l'offre Sérénité ?"
        />
        <Section container={false} className="py-0">
          <Container className="max-w-[1400px]">
            <SereniteTargets />
          </Container>
        </Section>
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Tarifs"
          line1="Une tarification claire"
          line2="et sans surprise"
        />
        <Section container={false} className="py-0">
          <Container className="max-w-[1400px]">
            <SerenitePricing />
          </Container>
        </Section>
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Options"
          line1="Options disponibles"
          line2="sur mesure"
        />
        <Section container={false} className="py-0">
          <Container className="max-w-[1400px]">
            <SereniteOptions />
          </Container>
        </Section>
      </div>

    </div>
  )
}