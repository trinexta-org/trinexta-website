import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { ShieldCheck, Award, Lock, CheckCircle } from "lucide-react"

// Import de ton composant issu de la branche 70
import { GoogleRatingSection } from "@/components/sections/GoogleRatingSection"

export function ReassuranceSection() {
  const labels = [
    { name: "Cybermalveillance.gouv.fr", icon: ShieldCheck },
    { name: "Adhérent Clusif", icon: Lock },
    { name: "Label ExpertCyber", icon: Award },
    { name: "France Cybersecurity", icon: CheckCircle },
  ]

  return (
    <Section container={false} className="py-10 md:py-14 bg-primary relative overflow-hidden">
      <Container>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          
          {/* 1. Ta note Google (Seule la capsule blanche du composant s'affiche ici) */}
          <div className="w-full flex items-center justify-center">
            <GoogleRatingSection />
          </div>

          {/* 2. Les 4 labels officiels positionnés en bas sur le fond bleu foncé global */}
          <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {labels.map((label, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors duration-300"
              >
                <label.icon className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold tracking-wider uppercase">
                  {label.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  )
}