"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Heading, Text } from "@/components/ui/Typography"

export function SereniteIntro() {
  const [visible, setVisible] = useState(false)
  const [swapped, setSwapped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setSwapped((s) => !s)
    }, 4000)
    return () => clearInterval(interval)
  }, [visible])

  const img1 = "/images/nos-offres/serenite.jpg"
  const img2 = "/images/nos-offres/infogerance.jpg"

  return (
    <div ref={ref} className="py-10 lg:py-16 overflow-visible">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full">

        <div
          className={`
            relative z-20
            w-full lg:col-span-6 space-y-4 lg:space-y-6 
            pt-8 lg:pt-0 lg:pr-8
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="text-secondary font-mono text-xs tracking-widest uppercase">OFFRE SÉRÉNITÉ</span>
          <Heading as="h2" className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            Votre informatique doit <em className="not-italic text-secondary">soutenir</em> votre activité. 
            <br />
            Pas la <em className="not-italic text-secondary">freiner</em>.
          </Heading>

          <div className="w-10 h-px bg-secondary/50" />

          <Text className="text-lg text-white/80 leading-relaxed">
            Un logiciel de caisse qui bloque en plein service. Une messagerie inaccessible. Un poste lent. Ce ne sont pas de simples soucis. Ce sont des blocages concrets qui ralentissent votre entreprise.
          </Text>

          <p className="py-6 px-6 italic text-white/90 text-sm leading-relaxed bg-white/[0.02] rounded-2xl">
            Avec l'offre Sérénité, bénéficiez d'un accompagnement informatique complet : support illimité, maintenance proactive et cybersécurité. Un seul interlocuteur pour centraliser vos besoins.
          </p>
        </div>

        <div
          className={`
            relative z-10
            w-full sm:w-[80%] lg:w-full lg:col-span-6 max-w-[680px] self-center
            h-[350px] sm:h-[450px] lg:h-[520px]
            mb-8 lg:mb-0 lg:-ml-12 order-first lg:order-last
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ transitionDelay: "200ms" }}
        >
          <div
            className={`
              absolute rounded-2xl overflow-hidden shadow-xl
              transition-all duration-700 ease-[cubic-bezier(0.34,1.3,0.64,1)]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
            `}
            style={{
              transitionDelay: "250ms",
              top: 0, right: 0, width: "72%", height: "78%", zIndex: 1,
              animation: "floatBack 5s ease-in-out infinite",
            }}
          >
            <Image src={img2} alt="Supervision IT" fill className={`object-cover transition-opacity duration-1000 ease-in-out ${swapped ? "opacity-0" : "opacity-100"}`} />
            <Image src={img1} alt="Supervision IT" fill className={`object-cover transition-opacity duration-1000 ease-in-out ${swapped ? "opacity-100" : "opacity-0"}`} />
          </div>

          <div
            className={`
              absolute rounded-2xl overflow-hidden shadow-2xl
              transition-all duration-700 ease-[cubic-bezier(0.34,1.3,0.64,1)]
              pointer-events-none
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}
            `}
            style={{
              transitionDelay: "400ms",
              bottom: 0, left: 0, width: "84%", height: "88%", zIndex: 2,
              animation: "floatFront 6s ease-in-out infinite",
            }}
          >
            <Image src={img1} alt="Infogérance Trinexta" fill priority className={`object-cover transition-opacity duration-1000 ease-in-out ${swapped ? "opacity-0" : "opacity-100"}`} />
            <Image src={img2} alt="Infogérance Trinexta" fill className={`object-cover transition-opacity duration-1000 ease-in-out ${swapped ? "opacity-100" : "opacity-0"}`} />
            <div className="absolute inset-0 hidden lg:block z-10" style={{ background: "linear-gradient(to right, var(--color-primary) 0%, rgba(10,35,62,0.85) 20%, rgba(10,35,62,0.3) 45%, transparent 70%)" }} />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes floatFront {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(0.3deg); }
          66% { transform: translateY(-4px) rotate(-0.2deg); }
        }
        @keyframes floatBack {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(-0.4deg); }
          66% { transform: translateY(-6px) rotate(0.3deg); }
        }
      `}</style>
    </div>
  )
}