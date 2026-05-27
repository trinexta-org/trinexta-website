"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"

const slides = [
    {
        title: "Une informatique plus simple, humaine et utile",
        subtitle: "Nous considérons que l’informatique ne doit pas être une contrainte de plus dans votre quotidien. Elle doit être un appui fiable, clair et efficace, au service de votre activité."
    },
    {
        title: "L'humain au centre de notre métier",
        subtitle: "Derrière chaque demande, il y a un dirigeant, un collaborateur, une équipe. C’est pour cela que nous plaçons l’écoute et la confiance au centre de notre accompagnement."
    },
    {
        title: "Simplifier l'informatique pour soutenir votre activité",
        subtitle: "Bénéficiez d'un support dédié, d'un accès direct à nos experts qualifiés et d'une approche sur mesure pour vous aider à surmonter vos défis technologiques."
    }
]

export function AProposHero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Section container={false} className="relative z-10 min-h-[100dvh] flex items-center justify-center overflow-hidden p-0 m-0">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/a-propos/hero-apropos.jpg"
                    alt="L'équipe Trinexta by Trustech IT Support"
                    fill
                    priority
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-primary/70 lg:bg-primary/80" />
            </div>

            <Container className="relative z-10 w-full py-20 md:py-32 flex flex-col justify-center">
                <div className="max-w-4xl">

                    <div className="min-h-[220px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[260px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <Heading
                                    as="h1"
                                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xl text-white text-balance"
                                >
                                    {slides[currentSlide].title.split(" ").map((word, i) => {
                                        const targetKeywords = ["simple,", "humaine", "utile", "humain", "centre", "simplifier", "soutenir"]
                                        const cleanWord = word.toLowerCase().replace(/[,.]/g, "")
                                        const isHighlighted = targetKeywords.includes(cleanWord) || word === "simple,"

                                        return (
                                            <span
                                                key={i}
                                                className={isHighlighted ? "text-secondary inline-block mr-2 sm:mr-3" : "text-white inline-block mr-2 sm:mr-3"}
                                            >
                                                {word}
                                            </span>
                                        )
                                    })}
                                </Heading>

                                <Text className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md text-white/90 text-balance">
                                    {slides[currentSlide].subtitle}
                                </Text>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => document.getElementById("signification")?.scrollIntoView({ behavior: "smooth" })}
                            className="w-full sm:w-auto text-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
                        >
                            Découvrir notre ADN
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto text-center text-white border-white hover:bg-white/10 backdrop-blur-sm cursor-pointer"
                        >
                            <Link href="/contact">Échanger avec nos experts</Link>
                        </Button>
                    </div>

                    <div className="mt-10 md:mt-12 pt-6">
                        <Text className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-md text-balance">
                            Trinexta by Trustech IT Support simplifie et sécurise votre informatique pour vous offrir un accompagnement fiable, souple et adapté à la performance de votre entreprise.
                        </Text>

                        <div className="flex items-center gap-2 mt-4 opacity-90">
                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <Text variant="small" className="font-bold tracking-wider uppercase text-white">
                                Proximité · Réactivité · Expertise partagée
                            </Text>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    )
}