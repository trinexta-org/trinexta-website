"use client"

import { type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import { Mail, Phone, type LucideIcon } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Section } from "@/components/layout/Section"
import { GridCards } from "@/components/layout/GridCards"
import { Heading, Text } from "@/components/ui/Typography"

// Téléphone et e-mail : texte sur fond uni (AA), sans illustration derrière les coordonnées.
type CarteContact = {
  id: string
  title: string
  content: ReactNode
  image?: string
  alt?: string
  icon?: LucideIcon
}

const CONTACT_CARDS: CarteContact[] = [
  {
    id: "bureau",
    title: "Bureau d'activité",
    image: "/images/contact/bureau.webp",
    alt: "Le Magellan Grand Paris Sud, bureau d'activité de TRINEXTA à Évry-Courcouronnes",
    content: (
      <Text variant="small" className="text-white/80 leading-relaxed mt-4 drop-shadow-md font-medium">
        7 rue Montespan<br />
        91000 Évry-Courcouronnes<br />
        <span className="text-white/60">Siège social : 74 B boulevard Henri Dunant, 91100 Corbeil-Essonnes</span>
      </Text>
    )
  },
  {
    id: "telephone",
    title: "Téléphone",
    icon: Phone,
    content: (
      <div className="mt-4">
        <a href="tel:+33978250746" className="text-white font-black underline-offset-4 hover:underline block text-2xl">
          09 78 25 07 46
        </a>
        <Text variant="small" className="text-white/80 mt-2 font-medium">
          Du lundi au vendredi, de 8 h 30 à 19 h
        </Text>
      </div>
    )
  },
  {
    id: "email",
    title: "E-mail",
    icon: Mail,
    content: (
      <div className="mt-4">
        <a href="mailto:contact@trinexta.fr" className="text-white font-black underline-offset-4 hover:underline block text-xl break-all">
          contact@trinexta.fr
        </a>
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
  const reducedMotion = useReducedMotion()

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
              className={`relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[350px] shadow-2xl ${card.image ? "bg-white/[0.02]" : "bg-primary-elevated"}`}
            >
              {card.image && (
                <>
                  <Image
                    src={card.image}
                    alt={card.alt ?? card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30 backdrop-blur-[2px]" />
                </>
              )}

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                {card.icon && (
                  <span className="mb-5 flex size-14 items-center justify-center rounded-full border border-secondary-soft/40 text-secondary-soft">
                    <card.icon aria-hidden="true" className="size-6" />
                  </span>
                )}
                <Heading as="h3" className="text-white text-2xl md:text-3xl font-black mb-2 drop-shadow-md">
                  {card.title}
                </Heading>
                {card.content}
              </div>
            </div>
          ))}
        </GridCards>
        <Text className="mt-10 md:mt-12 max-w-4xl mx-auto text-center text-white/80 text-base md:text-lg leading-relaxed">
          <strong className="text-white">En bref.</strong> TRINEXTA est joignable du lundi au vendredi, de 8 h 30 à 19 h, au 09 78 25 07 46 ou à contact@trinexta.fr. Bureau : 7 rue Montespan, 91000 Évry-Courcouronnes. Le formulaire sert aux nouvelles demandes ; les clients sous contrat utilisent les canaux de support prévus à leur contrat.
        </Text>
      </div>
    </Section>
  )
}
