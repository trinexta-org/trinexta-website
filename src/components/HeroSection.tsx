"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"

const slides = [
    {
        title: "Simplifiez votre informatique au quotidien",
        subtitle: "Support illimité, maintenance proactive et cybersécurité incluse pour travailler avec plus de sérénité."
    },
    {
        title: "Renforcez votre support avec souplesse",
        subtitle: "Un technicien support adapté à vos besoins, pour accompagner votre activité sans contrainte inutile."
    },
    {
        title: "Gardez une informatique fiable et bien suivie",
        subtitle: "Surveillance, maintenance et suivi proactif pour limiter les pannes et gagner en tranquillité."
    }
]

export function HeroSection() {
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
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video_Hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-primary/40 lg:bg-primary/70" />
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
                                        // Colorisation automatique des mots techniques clés
                                        const targetKeywords = ["informatique", "support", "fiable", "quotidien", "souplesse", "suivie"]
                                        const cleanWord = word.toLowerCase().replace(/[,.]/g, "")
                                        const isHighlighted = targetKeywords.includes(cleanWord)

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
                        <Link href="/nos-offres" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full text-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all">
                                Découvrir l&apos;offre Sérénité
                            </Button>   
                        </Link>

                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full text-center text-white border-white hover:bg-white/10 backdrop-blur-sm cursor-pointer">
                                Demandez à être rappelé
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-10 md:mt-12 pt-6">
                        <Text className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-md text-balance">
                            Arrêtez de perdre du temps et de l&apos;argent avec une informatique mal suivie. Découvrez Trinexta et avancez avec des solutions simples, fiables et adaptées à votre entreprise.
                        </Text>

                        <div className="flex items-center gap-2 mt-4 opacity-90">
                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <Text variant="small" className="font-bold tracking-wider uppercase text-white">
                                Sans engagement · Réponse sous 24h
                            </Text>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    )
}