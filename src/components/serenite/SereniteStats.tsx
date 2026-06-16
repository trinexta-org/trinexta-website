"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Text } from "@/components/ui/Typography"

const stats = [
  { id: 1, value: 79, suffix: "€", title: "HT / poste / mois", description: "Une tarification claire, pensée pour s'adapter à votre budget." },
  { id: 2, value: 0, suffix: "", title: "Engagement minimum", description: "Une offre totalement flexible, résiliable à tout moment." },
  { id: 3, value: 100, suffix: "%", title: "Support illimité", description: "Une assistance continue sans aucun surcoût caché." },
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
            ref.current.textContent = Math.floor(latest) + suffix
          }
        }
      })
      return controls.stop
    }
  }, [isInView, value, suffix])

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
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="group flex flex-col items-center text-center"
        >
          <div className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-normal mb-2 md:mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:text-secondary">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>

          <div className="space-y-1 md:space-y-3 w-full flex flex-col items-center">
            <motion.div
              initial={{ width: 12 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] md:h-1 bg-secondary"
            />
            <h3 className="text-[9px] sm:text-xs md:text-base font-bold text-secondary uppercase tracking-[0.05em] md:tracking-[0.2em] leading-tight mt-2">
              {stat.title}
            </h3>
            <Text className="hidden md:block text-white/60 text-sm xl:text-base leading-relaxed font-medium max-w-[280px]">
              {stat.description}
            </Text>
          </div>
        </motion.div>
      ))}
    </div>
  )
}