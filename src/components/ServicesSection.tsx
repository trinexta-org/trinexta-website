"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "@/hooks/useInView"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const services = [
  {
    id: 1,
    title: "Infogérance",
    description: "**Pilotez** votre croissance, on gère le reste. **Maintenance proactive**, supervision 24/7 et gestion complète de votre parc matériel et logiciel.",
    image: "/images/services/infogerance.avif",
    fillDir: "ltr",
    alt: "Techniciennes IT Trinexta inspectant une baie de serveurs pour assurer la supervision et l'infogérance d'une PME."
  },
  {
    id: 2,
    title: "Support",
    description: "Une **assistance illimitée** pour vos équipes. Résolution instantanée de vos incidents à **distance** ou intervention rapide **sur site**.",
    image: "/images/services/support.avif",
    fillDir: "rtl",
    alt: "Téléphone classique symbolisant l'assistance informatique illimitée et le support technique réactif proposés par Trinexta."
  },
  {
    id: 3,
    title: "Cybersécurité",
    description: "**Blindez** vos systèmes. **Audits de sécurité**, EDR nouvelle génération, protection anti-ransomware et **sauvegardes immuables**.",
    image: "/images/services/cybersecurite.avif",
    fillDir: "ltr",
    alt: "Expert en cybersécurité analysant les données sur un ordinateur portable pour protéger le réseau informatique d'une entreprise."
  },
  {
    id: 4,
    title: "Cloud",
    description: "**Modernisez** votre infrastructure. Hébergement souverain, serveurs dédiés et **Plan de Reprise d'Activité (PRA)** hautement disponible.",
    image: "/images/services/cloud.avif",
    fillDir: "rtl",
    alt: ""
  },
  {
    id: 5,
    title: "Microsoft 365",
    description: "**Collaborez** sans limite. Migration sans coupure, sécurisation des tenants et **optimisation de vos licences** d'entreprise.",
    image: "/images/services/microsoft.avif",
    fillDir: "ltr",
    alt: ""
  },
  {
    id: 6,
    title: "Solutions Métier",
    description: "Des outils qui épousent vos **processus**. Téléphonie VoIP, réseaux multisites et intégration de **logiciels spécialisés**.",
    image: "/images/services/solutions.avif",
    fillDir: "rtl",
    alt: ""
  },
]

const positions = [
  { top: "0%", left: "0%", scale: 1, rotateY: -5, zIndex: 30 },
  { top: "8%", left: "33.33%", scale: 0.95, rotateY: 0, zIndex: 25 },
  { top: "0%", left: "66.66%", scale: 1, rotateY: 5, zIndex: 20 },
  { top: "48%", left: "66.66%", scale: 0.95, rotateY: 3, zIndex: 15 },
  { top: "56%", left: "33.33%", scale: 1, rotateY: 0, zIndex: 10 },
  { top: "48%", left: "0%", scale: 0.95, rotateY: -3, zIndex: 5 },
]

const mobilePositions = [
  { top: "0%", left: "5%", scale: 1, rotateY: 0, zIndex: 30 },
  { top: "16.5%", left: "5%", scale: 1, rotateY: 0, zIndex: 25 },
  { top: "33%", left: "5%", scale: 1, rotateY: 0, zIndex: 20 },
  { top: "49.5%", left: "5%", scale: 1, rotateY: 0, zIndex: 15 },
  { top: "66%", left: "5%", scale: 1, rotateY: 0, zIndex: 10 },
  { top: "82.5%", left: "5%", scale: 1, rotateY: 0, zIndex: 5 },
]

function CharteFormattedText({ children }: { children: string }) {
  const parts = children.split(/(\*\*.*?\*\*)/g)
  return (
    <p className="text-white/80 text-xs md:text-sm lg:text-base leading-relaxed mb-6 md:mb-8 line-clamp-3">
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index} className="text-secondary font-bold">{part.slice(2, -2)}</strong>
        }
        return part
      })}
    </p>
  )
}

function AnimatedArrow({ direction }: { direction: string }) {
  return (
    <div className="relative w-5 h-5 md:w-6 md:h-6 ml-3 md:ml-4 flex-shrink-0">
      <ArrowRight className="w-full h-full text-white/20 absolute inset-0" />
      <div
        className={`absolute inset-0 text-secondary ${direction === "ltr" ? "animate-arrow-fill-ltr" : "animate-arrow-fill-rtl"}`}
      >
        <ArrowRight className="w-full h-full" />
      </div>
    </div>
  )
}

const getServiceUrl = (title: string) => {
  const map: Record<string, string> = {
    "Infogérance": "/infogerance",
    "Support": "/support-informatique",
    "Cybersécurité": "/cybersecurite",
    "Cloud": "/cloud-sauvegarde",
    "Microsoft 365": "/microsoft-365",
    "Solutions Métier": "/solutions-metier"
  };
  return map[title] || "/nos-offres";
};

export function ServicesSection() {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ once: true, rootMargin: "-100px" })
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5])
  const [isCarouselActive, setIsCarouselActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isInView) return
    const startCarouselTimer = setTimeout(() => {
      if (!isMobile) setIsCarouselActive(true)
    }, 3000)
    return () => clearTimeout(startCarouselTimer)
  }, [isInView, isMobile])

  useEffect(() => {
    if (!isCarouselActive || isMobile) return
    const interval = setInterval(() => {
      setOrder(prev => prev.map(pos => (pos + 1) % 6))
    }, 6000)
    return () => clearInterval(interval)
  }, [isCarouselActive, isMobile])

  const activePositions = isMobile ? mobilePositions : positions

  return (
    <Section container={false} className="bg-background min-h-screen pt-8 pb-16 md:pb-32 perspective-[2000px]">
      <Container className="relative z-10">
        <div ref={sectionRef} className="relative w-full h-[2400px] md:h-[1100px]">
          {services.map((service, index) => {
            const currentSlot = activePositions[isMobile ? index : order[index]]

            const target = isInView
              ? {
                  opacity: 1,
                  scale: currentSlot.scale,
                  rotateY: currentSlot.rotateY,
                  top: currentSlot.top,
                  left: currentSlot.left,
                  zIndex: currentSlot.zIndex,
                }
              : {
                  opacity: 0,
                  scale: 0.1,
                  rotateY: 180,
                  top: "20%",
                  left: "50%",
                  zIndex: 0,
                }

            return (
              <Link
                key={service.id}
                href={getServiceUrl(service.title)}
                style={{
                  position: "absolute",
                  width: isMobile ? "90%" : "31%",
                  transformStyle: "preserve-3d",
                  top: target.top,
                  left: target.left,
                  zIndex: target.zIndex,
                  opacity: target.opacity,
                  transform: `scale(${target.scale}) rotateY(${target.rotateY}deg)`,
                  transitionProperty: "opacity, transform, top, left",
                  transitionDuration: "1.2s",
                  transitionTimingFunction: "ease-in-out",
                  transitionDelay: `${isCarouselActive ? 0 : index * 0.1}s`,
                }}
                className="group h-[360px] md:h-[480px] rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl border border-white/10 cursor-pointer bg-primary block"
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 31vw, 90vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                </div>

                <div className="relative h-full z-10 flex flex-col justify-end p-6 md:p-8 xl:p-10">
                  <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl xl:text-4xl font-black text-white mb-2 md:mb-4 tracking-normal break-words">
                      {service.title}
                    </h3>

                    <CharteFormattedText>{service.description}</CharteFormattedText>

                    <div className="flex items-center transition-transform duration-300 hover:translate-x-[5px]">
                      <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Découvrir</span>
                      <AnimatedArrow direction={service.fillDir} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}