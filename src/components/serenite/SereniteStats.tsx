"use client"

import { useCountUp } from "@/hooks/useCountUp"
import { Text } from "@/components/ui/Typography"
import { FadeIn } from "@/components/ui/FadeIn"

const stats = [
  { id: 1, value: 79, suffix: "€", title: "HT / poste / mois", description: "Une tarification claire, pensée pour s'adapter à votre budget." },
  { id: 2, value: 0, suffix: "", title: "Engagement minimum", description: "Une offre totalement flexible, résiliable à tout moment." },
  { id: 3, value: 100, suffix: "%", title: "Support illimité", description: "Une assistance continue sans aucun surcoût caché." },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp<HTMLSpanElement>({
    value,
    format: (n) => n + suffix,
  })

  return (
    <>
      <span className="sr-only">{value}{suffix}</span>

      <span aria-hidden="true" ref={ref}>0{suffix}</span>
    </>
  )
}

export function SereniteStats() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-5xl mx-auto w-full">
      {stats.map((stat, index) => (
        <FadeIn
          key={stat.id}
          direction="up"
          delay={index * 0.1}
          className="group flex flex-col items-center text-center"
        >
          <div className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-normal mb-2 md:mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:text-secondary">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>

          <div className="space-y-1 md:space-y-3 w-full flex flex-col items-center">
            <div className="animate-bar-grow h-[1px] md:h-1 bg-secondary" />
            <h3 className="text-[9px] sm:text-xs md:text-base font-bold text-secondary uppercase tracking-[0.05em] md:tracking-[0.2em] leading-tight mt-2">
              {stat.title}
            </h3>
            <Text className="hidden md:block text-white/60 text-sm xl:text-base leading-relaxed font-medium max-w-[280px]">
              {stat.description}
            </Text>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}