import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { ShieldCheck, Award, Lock, CheckCircle } from "lucide-react"
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
          
          <div className="w-full flex items-center justify-center">
            <GoogleRatingSection />
          </div>

          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-2">
            {labels.map((label, index) => (
              <div 
                key={index} 
                className="group flex items-center justify-center gap-3 py-4 px-4 sm:px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <label.icon className="w-5 h-5 text-secondary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors duration-300 text-center">
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