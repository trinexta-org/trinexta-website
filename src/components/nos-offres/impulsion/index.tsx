"use client"

import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ImpulsionIntro } from "./ImpulsionIntro"
import { ImpulsionConcret } from "./ImpulsionConcret"
import { ImpulsionSteps } from "./ImpulsionSteps"
import { ImpulsionPillars } from "./ImpulsionPillars"
import { ImpulsionProfiles } from "./ImpulsionProfiles"
import { ImpulsionPricing } from "./ImpulsionPricing"
import { ImpulsionAssurances } from "./ImpulsionAssurances"

export function ImpulsionDetails() {
  return (
    <div id="impulsion" className="space-y-24 pb-24">
      
      <Section container={false} className="pt-0">
        <Container className="max-w-[1400px] space-y-24">
          <ImpulsionIntro />
          <ImpulsionConcret />
          <ImpulsionSteps />
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
            <ImpulsionPillars />
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
            <ImpulsionProfiles />
          </Container>
        </Section>
      </div>

      <Section container={false} className="py-0">
        <Container className="max-w-[1400px]">
          <ImpulsionPricing />
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
            <ImpulsionAssurances />
          </Container>
        </Section>
      </div>

    </div>
  )
}