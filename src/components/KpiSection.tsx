"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Heading, Text } from "@/components/ui/Typography"

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
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 60 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("fr-FR").format(Math.floor(latest)) + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0</span>
}

export function KpiSection() {
  return (
    <section className="relative bg-primary py-12 md:py-40 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--secondary-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-24 flex items-center gap-4 md:gap-8">
          <Heading as="h2" className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter shrink-0">
            Impact <span className="text-secondary">Réel</span>
          </Heading>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-12">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="text-2xl sm:text-4xl md:text-8xl font-black text-white tracking-tighter mb-2 md:mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:text-secondary">
                <Counter value={kpi.value} suffix={kpi.suffix} />
              </div>

              <div className="space-y-1 md:space-y-4 w-full flex flex-col items-center md:items-start">
                <motion.div 
                  initial={{ width: 12 }} 
                  whileInView={{ width: 48 }} 
                  transition={{ duration: 1, delay: 0.5 }} 
                  className="h-0.5 md:h-1 bg-secondary" 
                />
                <h3 className="text-[10px] md:text-lg font-bold text-secondary uppercase tracking-[0.1em] md:tracking-[0.2em] leading-tight">
                  <span className="md:hidden">{kpi.title}</span>
                  <span className="hidden md:inline">{kpi.fullTitle}</span>
                </h3>
                <Text className="hidden md:block text-white/50 text-base leading-relaxed font-medium">
                  {kpi.description}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}