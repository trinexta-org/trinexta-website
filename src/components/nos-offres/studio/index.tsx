"use client"

import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { StudioIntro } from "./StudioIntro"
import { StudioDifferentiator } from "./StudioDifferentiator"
import { StudioGrid } from "./StudioGrid"
import StudioDemos from "./StudioDemos"

export function StudioDetails() {
  return (
    <div id="studio" className="space-y-32 pb-16">
      <Section container={false} className="pt-0">
        <Container className="max-w-[1400px]">
          <StudioIntro />
        </Container>
      </Section>
      
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
    </div>
  )
}