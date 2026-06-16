"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, Variants } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { GridCards } from "@/components/layout/GridCards"
import { Heading, Text } from "@/components/ui/Typography"

const meanings = [
  {
    syllable: "Tri",
    title: "Trois piliers au cœur de notre approche",
    desc: "Une expertise technique solide, une proximité humaine fondée sur l'écoute, et une souplesse d'intervention pour s'adapter à votre structure. Ces trois dimensions avancent ensemble pour un service fiable et accessible.",
    image: "/images/a-propos/tri.jpg",
    alt: "",
  },
  {
    syllable: "Next",
    title: "Une informatique pensée pour évoluer",
    desc: "Nous ne nous contentons pas de gérer l'existant. « Next », c'est préparer l'avenir : faire les bons choix, anticiper les besoins et sécuriser l'environnement de travail. Votre informatique suit votre développement.",
    image: "/images/a-propos/next.avif",
    alt: ""
  },
  {
    syllable: "A",
    title: "L'agilité au service de votre quotidien",
    desc: "Le « A » final symbolise notre capacité d'adaptation. Nous construisons un accompagnement souple, lisible et proportionné, sans lourdeur inutile ni complexité contractuelle.",
    image: "/images/a-propos/a.jpg",
    alt: ""
  }
]

const cardVariants: Variants = {
  hidden: (_i: number) => ({ opacity: 0, scale: 0.9, y: 30 }),
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 2.2, duration: 0.6, ease: "easeOut" }
  })
}

const getAnimProps = (index: number) => {
  switch (index) {
    case 0: return { scale: 3.5, y: 120 }
    case 1: return { scale: 2.2, y: 120 }
    case 2: return { scale: 5.0, y: 120 }
    default: return { scale: 3, y: 120 }
  }
}

const syllableVariants: Variants = {
  hidden: (i: number) => {
    const props = getAnimProps(i)
    return { opacity: 0, scale: props.scale, y: props.y }
  },
  visible: (i: number) => {
    const props = getAnimProps(i)
    return {
      opacity: [0, 1, 1, 1],
      scale: [props.scale, props.scale, props.scale, 1],
      y: [props.y, props.y, props.y, 0],
      transition: {
        delay: i * 2.2,
        duration: 1.8,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut"
      }
    }
  }
}

const contentVariants: Variants = {
  hidden: (_i: number) => ({ opacity: 0, y: 20 }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i * 2.2) + 1.5, duration: 0.6, ease: "easeOut" }
  })
}

const imageVariants: Variants = {
  hidden: (_i: number) => ({ opacity: 0 }),
  visible: (i: number) => ({
    opacity: 0.4,
    transition: { delay: (i * 2.2) + 1.5, duration: 1, ease: "easeInOut" }
  })
}

export function TrinextaMeaning() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <Section id="signification" className="py-16 md:py-32 bg-primary overflow-hidden relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Text variant="lead" className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-md">
          Le nom Trinexta n&apos;a pas été choisi au hasard. Il traduit notre vision profonde :
          une synergie parfaite entre l&apos;expertise, l&apos;humain et l&apos;avenir de votre entreprise.
        </Text>
      </div>

      <div ref={containerRef}>
        <GridCards columns={3} mobileColumns={1} gap="gap-6 md:gap-8">
          {meanings.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] min-h-[420px] flex flex-col p-8 group shadow-2xl"
            >
              <motion.div
                custom={index}
                variants={imageVariants}
                className="absolute inset-0 z-0 mix-blend-screen"
              >
                <Image
                  src={item.image}
                  alt={`Illustration ${item.syllable} Trinexta`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent" />
              </motion.div>

              <div className="relative z-10 flex flex-col h-full items-center text-center">
                <motion.span
                  custom={index}
                  variants={syllableVariants}
                  className="text-5xl md:text-6xl font-black text-secondary tracking-normal drop-shadow-lg inline-block origin-center w-full"
                >
                  {item.syllable}
                </motion.span>

                <motion.div
                  custom={index}
                  variants={contentVariants}
                  className="mt-6 space-y-4 flex-grow flex flex-col justify-start w-full text-left"
                >
                  <Heading as="h3" className="text-xl md:text-2xl text-white font-bold leading-tight drop-shadow-md">
                    {item.title}
                  </Heading>
                  <Text className="text-white/80 leading-relaxed text-sm md:text-base font-medium">
                    {item.desc}
                  </Text>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </GridCards>
      </div>
    </Section>
  )
}