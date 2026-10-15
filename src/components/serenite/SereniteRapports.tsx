import { FadeIn } from "@/components/ui/FadeIn"
import { Heading, Text } from "@/components/ui/Typography"
import { SERENITE_RAPPORTS } from "@/data/serenite"

export function SereniteRapports() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {SERENITE_RAPPORTS.map((rapport, idx) => (
        <FadeIn key={rapport.formule} delay={idx * 0.1} className="h-full">
          <div className="h-full rounded-2xl border border-secondary/20 bg-surface-strong p-6 md:p-8 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary-strong">
              {rapport.formule}
            </span>
            <Heading as="h3" className="text-primary">{rapport.frequence}</Heading>
            <Text className="text-primary/75 leading-relaxed">{rapport.desc}</Text>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
