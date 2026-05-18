import { Metadata } from "next"
import { HeroSection } from "@/components/HeroSection"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ReassuranceSection } from "@/components/ReassuranceSection"

export const metadata: Metadata = {
  title: "Trinexta | Infogérance à Évry et prestataire informatique dans l'Essonne",
  description: "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <HeroSection />
      <TransitionTitle line1="Une expertise reconnue" line2="et certifiée" />
      <ReassuranceSection />
    </main>
  )
}