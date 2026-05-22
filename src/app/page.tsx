import { JsonLd, trinextaLocalBusiness } from "@/components/seo/JsonLd"
import { Metadata } from "next"
import { HeroSection } from "@/components/HeroSection"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ReassuranceSection } from "@/components/ReassuranceSection"
import { ForWhoSection } from "@/components/ForWhoSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ApproachSection } from "@/components/ApproachSection"
import { InterventionMap } from "@/components/InterventionMap"
import { KpiSection } from "@/components/KpiSection"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { PartnersSection } from "@/components/PartnersSection"
import { FinalCTA } from "@/components/FinalCTA"

export const metadata: Metadata = {
  title: "Trinexta | Infogérance à Évry et prestataire informatique dans l'Essonne",
  description: "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <JsonLd data={trinextaLocalBusiness} />
      <HeroSection />
      <ReassuranceSection />

      <TransitionTitle
        line1="Des solutions pour"
        line2="chaque activité"
      />
      <ForWhoSection />

      <TransitionTitle
        surtitle="Notre cœur de métier"
        line1="Nos Services"
        line2="Infogérance"
      />
      <ServicesSection />

      <ApproachSection />

      <KpiSection />

      <TransitionTitle
        surtitle="Ce que nous offrons"
        line1="Pourquoi"
        line2="Trinexta ?"
      />
      <WhyChooseUs />

      <TransitionTitle
        surtitle="Écosystème"
        line1="Nos Partenaires"
        line2="Technologiques"
      />
      <PartnersSection />

      <InterventionMap />

      <FinalCTA />

    </main>
  )
}