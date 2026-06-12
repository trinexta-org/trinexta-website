"use client"

import { useRef, useState, useEffect, useSyncExternalStore } from "react"
import Image from "next/image"
import { motion, useInView, Variants } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { GridCards } from "@/components/layout/GridCards"
import { Heading, Text } from "@/components/ui/Typography"

const CONTACT_CARDS = [
  {
    id: "bureau",
    title: "Bureau d'activité",
    image: "/images/contact/bureau.webp",
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

const getCardAnimation = (index: number, isMobile: boolean): Variants => {
  const gap = isMobile ? 24 : 32;
  
  let initialX = "0%";
  let initialY = "0%";

  if (!isMobile) {
    if (index === 0) initialX = `calc(100% + ${gap}px)`;
    if (index === 2) initialX = `calc(-100% - ${gap}px)`;
  } else {
    if (index === 0) initialY = `calc(100% + ${gap}px)`;
    if (index === 2) initialY = `calc(-100% - ${gap}px)`;
  }

  if (index === 0) {
    return {
      hidden: { opacity: 0, x: initialX, y: initialY },
      visible: {
        opacity: [0, 1, 1],
        x: [initialX, initialX, "0%"],
        y: [initialY, initialY, "0%"],
        transition: { delay: 0.2, duration: 1.5, times: [0, 0.4, 1], ease: "easeInOut" }
      }
    }
  } 
  else if (index === 2) {
    return {
      hidden: { opacity: 0, x: initialX, y: initialY },
      visible: {
        opacity: [0, 1, 1],
        x: [initialX, initialX, "0%"],
        y: [initialY, initialY, "0%"],
        transition: { delay: 2.2, duration: 1.5, times: [0, 0.4, 1], ease: "easeInOut" }
      }
    }
  } 
  else {
    return {
      hidden: { opacity: 0, x: 0, y: 0 },
      visible: {
        opacity: [0, 1],
        x: ["0%", "0%"],
        y: ["0%", "0%"],
        transition: { delay: 4.2, duration: 0.8, ease: "easeInOut" }
      }
    }
  }
}

const getOverlayAnimation = (index: number): Variants => {
  let delay = 0;
  if (index === 0) delay = 1.8;
  if (index === 2) delay = 3.8;
  if (index === 1) delay = 5.1;

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay, duration: 0.6, ease: "easeOut" }
    }
  }
}

export function ContactCards() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const isMobile = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback)
      return () => window.removeEventListener("resize", callback)
    },
    () => window.innerWidth < 768,
    () => false
  )

  return (
    <Section id="coordonnees" className="py-16 md:py-24 bg-primary overflow-hidden relative">
      <div ref={containerRef}>
        <h2 className="sr-only">Nos coordonnées de contact</h2>
        <GridCards columns={3} mobileColumns={1} gap="gap-6 md:gap-8">
          {CONTACT_CARDS.map((card, index) => {
            const cardAnim = getCardAnimation(index, isMobile)
            const overlayAnim = getOverlayAnimation(index)

            return (
              <motion.div
                key={card.id}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardAnim}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] min-h-[350px] shadow-2xl"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />

                <motion.div 
                  variants={overlayAnim}
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30 backdrop-blur-[2px]" 
                />

                <motion.div 
                  variants={overlayAnim}
                  className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center"
                >
                  <Heading as="h3" className="text-white text-2xl md:text-3xl font-black mb-2 drop-shadow-md">
                    {card.title}
                  </Heading>
                  {card.content}
                </motion.div>

              </motion.div>
            )
          })}
        </GridCards>
      </div>
    </Section>
  )
}