"use client"

import { useCountUp } from "@/hooks/useCountUp"
import { Text } from "@/components/ui/Typography"
import { FadeIn } from "@/components/ui/FadeIn"
import { SERENITE_STATS as stats } from "@/data/serenite"

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
          key={stat.title}
          direction="up"
          delay={index * 0.1}
          className="group flex flex-col items-center text-center"
        >
          <div className="mb-2 md:mb-6 transition-transform duration-500 group-hover:scale-105">
            <div className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-normal transition-colors duration-500 group-hover:text-secondary-soft">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
          </div>

          <div className="space-y-1 md:space-y-3 w-full flex flex-col items-center">
            <div className="animate-bar-grow h-[1px] md:h-1 bg-secondary" />
            <h3 className="text-[9px] sm:text-xs md:text-base font-bold text-secondary-soft uppercase tracking-[0.05em] md:tracking-[0.2em] leading-tight mt-2">
              {stat.title}
            </h3>
            <Text className="hidden md:block text-white/70 text-sm xl:text-base leading-relaxed font-medium max-w-[280px]">
              {stat.description}
            </Text>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}