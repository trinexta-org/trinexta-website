"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const kpis = [
  {
    id: 1,
    value: 24,
    suffix: "h",
    title: "Réactivité",
    fullTitle: "Temps de réponse max",
    description: "Une prise en charge garantie dans la journée.",
  },
  {
    id: 2,
    value: 100,
    suffix: "%",
    title: "Liberté",
    fullTitle: "Sans engagement",
    description: "Des offres flexibles, sans contrainte inutile.",
  },
  {
    id: 3,
    value: 7,
    suffix: "j/7",
    title: "Supervision",
    fullTitle: "Surveillance active",
    description: "Vos systèmes protégés en continu.",
  },
  {
    id: 4,
    value: 5,
    suffix: "/5",
    title: "Satisfaction",
    fullTitle: "Note moyenne clients",
    description: "L'excellence opérationnelle au quotidien.",
  },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.3,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat("fr-FR").format(Math.floor(latest)) + suffix
          }
        }
      })

      return controls.stop
    }
  }, [isInView, value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function KpiSection() {
  return (
    <Section container={false} className="relative bg-primary py-12 md:py-32 lg:py-40 overflow-hidden">

      <Container className="relative z-10">
        <div className="mb-10 md:mb-16 lg:mb-24 flex items-center gap-4 md:gap-8 overflow-hidden">
          <Heading as="h2" className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-normal shrink-0 whitespace-nowrap">
            Impact <span className="text-secondary">Réel</span>
          </Heading>
          <div className="h-[1px] w-full bg-white/10 hidden sm:block" />
        </div>

        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 md:gap-10 lg:gap-12">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="text-[1.35rem] sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-normal mb-2 md:mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:text-secondary">
                <Counter value={kpi.value} suffix={kpi.suffix} />
              </div>

              <div className="space-y-1 md:space-y-4 w-full flex flex-col items-center md:items-start">
                <motion.div
                  initial={{ width: 12 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[1px] md:h-1 bg-secondary"
                />
                <h3 className="text-[9px] sm:text-xs md:text-base lg:text-lg font-bold text-secondary uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] leading-tight">
                  <span className="md:hidden">{kpi.title}</span>
                  <span className="hidden md:inline">{kpi.fullTitle}</span>
                </h3>
                <Text className="hidden md:block text-white/60 text-sm xl:text-base leading-relaxed font-medium">
                  {kpi.description}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
