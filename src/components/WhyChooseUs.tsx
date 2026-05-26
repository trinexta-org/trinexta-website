"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence} from "framer-motion"
import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const reasons = [
  {
    id: 1,
    title: "Équipe experte",
    description: "Vous bénéficiez d'un accompagnement assuré par des professionnels capables de comprendre vos enjeux, de traiter vos demandes avec sérieux et de vous orienter vers des solutions adaptées.",
    image: "/images/why-us/equipe.avif",
  },
  {
    id: 2,
    title: "Solutions sur mesure",
    description: "Nos prestations sont pensées pour les TPE et PME, avec une approche utile, lisible et sans complexité inutile.",
    image: "/images/why-us/sur-mesure.avif",
  },
  {
    id: 3,
    title: "Interlocuteur unique",
    description: "Vous gagnez en simplicité avec un contact privilégié pour centraliser vos demandes et suivre plus facilement vos sujets informatiques.",
    image: "/images/why-us/interlocuteur.avif",
  },
  {
    id: 4,
    title: "Transparence totale",
    description: "Nos engagements sont clairs, nos interventions sont cadrées, et nos tarifs annoncés sans surprise.",
    image: "/images/why-us/transparence.avif",
  },
]

export function WhyChooseUs() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Section container={false} className="relative bg-primary pt-8 pb-16 md:pb-32 overflow-hidden">
      <Container>
        <div ref={containerRef} className="flex flex-col md:flex-row h-[600px] md:h-[600px] w-full gap-3 md:gap-4">
          {reasons.map((reason, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={reason.id}
                layout
                onClick={() => setActive(index)}
                initial={false}
                animate={{
                  flex: isActive ? 12 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  mass: 0.8
                }}
                className={`relative overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl shadow-2xl transition-all duration-500 ${isActive ? "border-2 border-secondary" : "border border-white/10 opacity-70 md:opacity-100"
                  }`}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <motion.div
                    animate={{ opacity: isActive ? 0.7 : 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"
                  />
                </div>

                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <span className="text-white/40 font-bold text-xl md:text-3xl rotate-0 md:-rotate-90 whitespace-nowrap tracking-widest">
                        0{index + 1}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-4 md:bottom-10 left-4 md:left-10 right-4 md:right-10 z-10"
                    >
                      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-2xl max-w-2xl">
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <span className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary text-white font-bold text-sm md:text-xl shrink-0">
                            0{index + 1}
                          </span>
                          <Heading as="h3" className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
                            {reason.title}
                          </Heading>
                        </div>
                        <Text className="text-white/90 text-xs md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                          {reason.description}
                        </Text>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}