"use client"

import { useSyncExternalStore, type CSSProperties } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/useInView"
import { Section } from "@/components/layout/Section"
import { GridCards } from "@/components/layout/GridCards"
import { Heading, Text } from "@/components/ui/Typography"

const CONTACT_CARDS = [
  {
    id: "bureau",
    title: "Bureau d'activité",
    image: "/images/contact/bureau.webp",
    alt: "Le Magelan Grand Paris Sud, bureau d'activité de trinexta",
    content: (
      <Text variant="small" className="text-white/80 leading-relaxed mt-4 drop-shadow-md font-medium">
        7 Rue Montespan<br />
        91000 Évry-Courcouronnes
      </Text>
    )
  },
  {
    id: "telephone",
    title: "Téléphone",
    image: "/images/contact/telephone.png",
    content: (
      <div className="mt-4">
        <a href="tel:+33978250746" className="text-secondary font-black hover:underline block text-2xl drop-shadow-lg">
          09 78 25 07 46
        </a>
      </div>
    )
  },
  {
    id: "email",
    title: "Email",
    image: "/images/contact/email.png",
    content: (
      <div className="mt-4">
        <a href="mailto:contact@trinexta.fr" className="text-secondary font-black hover:underline block text-xl drop-shadow-lg">
          contact@trinexta.fr
        </a>
        <Text variant="small" className="text-white/80 font-medium mt-2 drop-shadow-md">
          support@trinexta.fr
        </Text>
      </div>
    )
  }
];

function getCardStyle(index: number, visible: boolean, reducedMotion: boolean): CSSProperties {
  if (reducedMotion) return {}
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
    transitionDelay: `${index * 100}ms`,
  }
}

export function ContactCards() {
  const [containerRef, isInView] = useInView<HTMLDivElement>({ once: true, rootMargin: "-100px" })
  const reducedMotion = useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )

  const visible = isInView || reducedMotion

  return (
    <Section id="coordonnees" className="py-16 md:py-24 bg-primary overflow-hidden relative">
      <div ref={containerRef}>
        <h2 className="sr-only">Nos coordonnées de contact</h2>
        <GridCards columns={3} mobileColumns={1} gap="gap-6 md:gap-8">
          {CONTACT_CARDS.map((card, index) => (
            <div
              key={card.id}
              style={getCardStyle(index, visible, reducedMotion)}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] min-h-[350px] shadow-2xl"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30 backdrop-blur-[2px]" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <Heading as="h3" className="text-white text-2xl md:text-3xl font-black mb-2 drop-shadow-md">
                  {card.title}
                </Heading>
                {card.content}
              </div>
            </div>
          ))}
        </GridCards>
      </div>
    </Section>
  )
}
