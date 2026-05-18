"use client"

import { Star, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"

const cards = [
  {
    id: 1,
    type: "google-rating",
    tags: ["SATISFACTION CLIENT", "AVIS VERIFIES"],
    tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
    title: "Note de 4,9/5",
    description: "Base sur nos avis clients verifies. Un taux de satisfaction de 99% pour nos interventions de maintenance.",
    buttonText: "Voir les avis",
    backgroundImage: "/images/reassurance/avis-clients.avif",
    alt: "Modern office workspace",
  },
  {
    id: 2,
    type: "cybermalveillance",
    tags: ["CERTIFICATION", "SECURITE"],
    tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
    title: "Referent Cybermalveillance",
    description: "Prestataire reference sur la plateforme nationale pour accompagner les TPE et PME d'Ile-de-France.",
    buttonText: "En savoir plus",
    backgroundImage: "/images/reassurance/cybermalveillance.avif",
    alt: "Server room datacenter",
  },
  {
    id: 3,
    type: "clusif",
    tags: ["MEMBRE ACTIF", "EXPERTISE"],
    tagColors: ["bg-primary border border-border text-white", "bg-secondary text-white"],
    title: "Adherent Clusif",
    description: "Membre actif du Club de la Securite de l'Information Francais pour anticiper les risques de demain.",
    buttonText: "Decouvrir",
    backgroundImage: "/images/reassurance/clusif.avif",
    alt: "Global network connections",
  },
  {
    id: 4,
    type: "expertcyber",
    tags: ["LABEL AFNOR", "INFRASTRUCTURE"],
    tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
    title: "Label ExpertCyber",
    description: "Reconnaissance de notre expertise par l'AFNOR pour la securisation de vos infrastructures critiques.",
    buttonText: "En savoir plus",
    backgroundImage: "/images/reassurance/expertcyber.avif",
    alt: "Cybersecurity technology",
  },
  {
    id: 5,
    type: "france-cybersecurity",
    tags: ["LABEL NATIONAL", "CONFIANCE"],
    tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
    title: "France Cybersecurity",
    description: "Un label gage de confiance pour nos solutions de cybersecurite aux standards francais eleves.",
    buttonText: "Decouvrir",
    backgroundImage: "/images/reassurance/france-cybersecurity.avif",
    alt: "Digital matrix code",
  },
]

function BouncingStar({ index }: { index: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 2,
        delay: index * 0.15,
      }}
    >
      <Star className="w-3.5 h-3.5 md:w-7 md:h-7 fill-secondary text-secondary drop-shadow-lg" />
    </motion.div>
  )
}

function FloatingTag({ tag, color, index }: { tag: string; color: string; index: number }) {
  return (
    <motion.span
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        delay: index * 0.3,
      }}
      className={`${color} px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wide shadow-lg`}
    >
      {tag}
    </motion.span>
  )
}

function LightSweepText({ children, delay = 0 }: { children: string; delay?: number }) {
  const text = children.toString()
  const letters = text.split("")
  
  return (
    <span className="inline">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ 
            whiteSpace: letter === " " ? "pre" : "normal",
          }}
          animate={{
            color: [
              "var(--primary-foreground)",
              "var(--primary-foreground)",
              "var(--secondary)",
              "var(--secondary)",
              "var(--secondary)",
              "var(--primary-foreground)",
              "var(--primary-foreground)",
            ],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + i * 0.05,
            times: [0, 0.2, 0.3, 0.5, 0.7, 0.8, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}

function AnimatedButton({ text }: { text: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex-shrink-0 group flex items-center justify-center sm:justify-start gap-3 bg-background hover:bg-background/90 transition-all duration-300 rounded-full sm:pl-5 pr-2 py-1.5 sm:py-2 pl-2 shadow-lg w-full sm:w-auto mt-3 sm:mt-0"
    >
      <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap ml-3 sm:ml-0">
        {text}
      </span>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-7 h-7 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center ml-auto sm:ml-0"
      >
        <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
      </motion.div>
    </motion.button>
  )
}

export function ReassuranceSection() {
  return (
    <Section container={false} className="relative bg-primary">
      <Container>
        {cards.map((card, index) => {
          const stackOffsetDesktop = index * 40
          const stackOffsetMobile = index * 15
          
          return (
            <div 
              key={card.id}
              className="sticky top-0 w-full h-[75vh] md:h-[100dvh] pb-8 md:pb-16"
              style={{ 
                zIndex: index + 1,
                paddingTop: `calc(70px + ${stackOffsetMobile}px)`,
              }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 768px) {
                  .card-${index} {
                    padding-top: calc(120px + ${stackOffsetDesktop}px) !important;
                  }
                }
              `}} />

              <div 
                className={`card-${index} relative w-full h-full overflow-hidden rounded-[24px] md:rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-border/10`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={card.backgroundImage}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10" />
                </div>

                <div className="absolute top-5 left-5 md:top-8 md:left-8 flex flex-wrap gap-2 z-10 max-w-[70%] md:max-w-none">
                  {card.tags.map((tag, tagIndex) => (
                    <FloatingTag
                      key={tag}
                      tag={tag}
                      color={card.tagColors[tagIndex]}
                      index={tagIndex}
                    />
                  ))}
                </div>

                {card.type === "google-rating" && (
                  <div className="absolute top-5 right-5 md:top-8 md:right-8 flex gap-0.5 md:gap-1 z-10">
                    {[...Array(5)].map((_, i) => (
                      <BouncingStar key={i} index={i} />
                    ))}
                  </div>
                )}

                <div className="absolute bottom-5 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="backdrop-blur-xl bg-primary-foreground/10 rounded-[20px] md:rounded-3xl p-4 md:p-6 border border-border/20 shadow-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 md:gap-4">
                      <div className="flex-1">
                        <Heading as="h3" className="text-lg md:text-3xl font-bold mb-1 md:mb-2 leading-tight text-balance text-[var(--primary-foreground)]">
                          <LightSweepText delay={index * 0.5}>{card.title}</LightSweepText>
                        </Heading>
                        <Text className="text-[11px] md:text-base leading-relaxed max-w-lg text-[var(--primary-foreground)]">
                          <LightSweepText delay={index * 0.5 + 0.3}>{card.description}</LightSweepText>
                        </Text>
                      </div>

                      <AnimatedButton text={card.buttonText} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </Container>
    </Section>
  )
}