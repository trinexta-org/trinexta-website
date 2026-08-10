"use client"

import { useState, useRef, useEffect, type CSSProperties } from "react"
import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const reasons = [
  {
    id: 1,
    title: "Équipe experte",
    description: "Vous bénéficiez d'un accompagnement assuré par des professionnels capables de comprendre vos enjeux, de traiter vos demandes avec sérieux et de vous orienter vers des solutions adaptées.",
    image: "/images/why-us/equipe.webp",
    alt: "Équipe d'experts informatiques Trinexta collaborant sur un projet IT pour une PME en Île-de-France.",
  },
  {
    id: 2,
    title: "Solutions sur mesure",
    description: "Nos prestations sont pensées pour les TPE et PME, avec une approche utile, lisible et sans complexité inutile.",
    image: "/images/why-us/sur-mesure.webp",
    alt: "Technicien Trinexta configurant une solution d'infogérance sur mesure sur un poste de travail.",
  },
  {
    id: 3,
    title: "Interlocuteur unique",
    description: "Vous gagnez en simplicité avec un contact privilégié pour centraliser vos demandes et suivre plus facilement vos sujets informatiques.",
    image: "/images/why-us/interlocuteur.webp",
    alt: "Ordinateur portable affichant le tableau de bord de supervision proactive et de reporting IT Trinexta pour une PME.",
  },
  {
    id: 4,
    title: "Transparence totale",
    description: "Nos engagements sont clairs, nos interventions sont cadrées, et nos tarifs annoncés sans surprise.",
    image: "/images/why-us/transparence.webp",
    alt: "Experte informatique de l'équipe Trinexta souriante lors d'une séance de brainstorming sur l'architecture réseau d'un client."
  },
]

const AUTOPLAY_MS = 5000

export function WhyChooseUs() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % reasons.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [isPaused, active])

  return (
    <Section container={false} className="relative bg-surface pt-8 pb-16 md:pb-32 overflow-hidden">
      <Container className="relative z-10">

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-col md:flex-row h-[600px] md:h-[600px] w-full gap-3 md:gap-4"
        >
          {reasons.map((reason, index) => {
            const isActive = active === index

            return (
              <div
                key={reason.id}
                onClick={() => { setActive(index); setIsPaused(true) }}
                style={{ flex: isActive ? 12 : 1 }}
                className={`relative overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? "border-2 border-secondary" : "border border-primary/10 opacity-70 md:opacity-100 hover:opacity-100"
                  }`}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={reason.image}
                    alt={reason.alt}
                    fill
                    className={`object-cover transition-transform duration-[1400ms] ${isActive ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 78vw, 940px"
                  />
                  <div
                    style={{ opacity: isActive ? 0.75 : 0.35 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-opacity duration-500"
                  />
                </div>

                {isActive && !isPaused && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <div
                      key={active}
                      className="h-full bg-secondary origin-left"
                      style={{
                        animation: `why-us-progress ${AUTOPLAY_MS}ms linear forwards`,
                      }}
                    />
                  </div>
                )}

                <div
                  style={{ opacity: isActive ? 0 : 1 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                  aria-hidden={isActive}
                >
                  <span className="text-white/50 font-mono font-black text-2xl md:text-4xl rotate-0 md:-rotate-90 whitespace-nowrap tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <div
                  className={`absolute bottom-4 md:bottom-10 left-4 md:left-10 right-4 md:right-10 z-10 transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100 delay-150 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-2xl max-w-2xl">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <span className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary-strong text-white font-bold text-sm md:text-xl shrink-0 shadow-[0_0_20px_rgba(92,146,184,0.5)]">
                        0{index + 1}
                      </span>
                      <Heading as="h3" className="text-xl md:text-3xl font-black text-white tracking-normal">
                        {reason.title}
                      </Heading>
                    </div>
                    <Text className="text-white/90 text-xs md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                      {reason.description}
                    </Text>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        <style>{`
          @keyframes why-us-progress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="why-us-progress"] {
              animation: none !important;
            }
          }
        `}</style>
      </Container>
    </Section>
  )
}