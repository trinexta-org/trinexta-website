"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heading } from "@/components/ui/Typography"

const steps = [
  {
    num: "01",
    title: "Vous nous expliquez votre besoin",
    desc: "Par téléphone, par e-mail ou en visio, vous nous présentez votre besoin simplement, avec vos mots.",
  },
  {
    num: "02",
    title: "Analyse & Proposition sur mesure",
    desc: "Nous étudions votre situation, votre matériel existant et vos besoins réels. Puis nous vous transmettons un devis clair, avec un prix fixe.",
  },
  {
    num: "03",
    title: "Réalisation de la prestation",
    desc: "Nous planifions l'intervention au moment le plus adapté. La prestation est réalisée, testée, puis validée avec vous.",
  },
  {
    num: "04",
    title: "Nous restons disponibles",
    desc: "Une fois terminée, nous restons joignables si vous avez besoin d'un ajustement, d'une précision ou pour guider vos équipes.",
  },
]

export function ServicesProcess() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Texte Sticky */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-[25vh]">
              <span className="text-secondary text-xs md:text-sm font-bold tracking-widest mb-4 block uppercase">
                Processus
              </span>
              <Heading as="h2" className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
                Comment ça se passe, <br />
                <em className="not-italic text-secondary">du premier appel au résultat ?</em>
              </Heading>
              <p className="mt-8 text-white/70 text-base md:text-lg max-w-md leading-relaxed">
                Quatre étapes. Aucune surprise. Un cadre clair pour démarrer votre collaboration sans friction.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7 relative mt-12 lg:mt-0 pl-8 lg:pl-20">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
            
            <motion.div
              className="absolute left-0 top-0 w-1 bg-secondary rounded-full shadow-[0_0_15px_var(--secondary)]"
              style={{ height: lineHeight }}
            />

            <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-32">
              {steps.map((step) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative group"
                >
                  <div className="absolute -left-[37.5px] lg:-left-[85px] top-3 md:top-4 w-4 h-4 rounded-full bg-primary border-4 border-secondary group-hover:scale-150 group-hover:bg-secondary transition-all duration-300 z-10 shadow-[0_0_10px_var(--secondary)]" />

                  <div className="absolute -top-10 md:-top-16 -left-4 md:-left-8 text-[80px] md:text-[150px] font-black text-white/[0.03] select-none pointer-events-none leading-none transition-colors duration-500 group-hover:text-white/[0.06]">
                    {step.num}
                  </div>

                  <div className="relative z-10 pt-2">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <span className="text-lg md:text-xl font-bold text-secondary font-mono">
                        {step.num}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white tracking-normal group-hover:text-secondary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm md:text-xl leading-relaxed max-w-2xl font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}