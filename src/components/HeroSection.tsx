"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"

// Justification du "use client" : Requis pour les hooks useState et useEffect 
// qui gèrent le défilement des phrases de la machine à écrire et l'alternance de couleur du H1.

function TypewriterText({ phrases }: { phrases: string[] }) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex]

        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false)
                setIsDeleting(true)
            }, 2000)
            return () => clearTimeout(pauseTimeout)
        }

        if (isDeleting) {
            if (currentText === "") {
                setIsDeleting(false)
                setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
                return
            }

            const deleteTimeout = setTimeout(() => {
                setCurrentText(currentText.slice(0, -1))
            }, 30)
            return () => clearTimeout(deleteTimeout)
        }

        if (currentText === currentPhrase) {
            setIsPaused(true)
            return
        }

        const typeTimeout = setTimeout(() => {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
    }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases])

    return (
        <span className="font-sans text-white/90">
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-0.5 text-white"
            >
                _
            </motion.span>
        </span>
    )
}

export function HeroSection() {
    const [isStateA, setIsStateA] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsStateA((prev) => !prev)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const typewriterPhrases = [
        "Support illimité, maintenance proactive et cybersécurité incluse.",
        "Un partenaire local et humain pour les TPE et PME d'Île-de-France.",
        "Votre SI sous haute protection, sans engagement.",
    ]

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

                    <Heading
                        as="h1"
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xl"
                    >
                        <motion.span
                            animate={{ color: isStateA ? "var(--secondary)" : "white" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="block"
                        >
                            Votre informatique, simplifiée.
                        </motion.span>
                        <motion.span
                            animate={{ color: isStateA ? "white" : "var(--secondary)" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="block mt-2 md:mt-0"
                        >
                            Votre activité, sereine.
                        </motion.span>
                    </Heading>

                    <div className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl min-h-[80px] sm:min-h-[64px] drop-shadow-md">
                        <TypewriterText phrases={typewriterPhrases} />
                    </div>

                    <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link href="/tarifs" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full text-center text-white cursor-pointer">
                                Découvrir l'offre Sérénité
                            </Button>
                        </Link>

                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full text-center text-white border-white hover:bg-white/10 backdrop-blur-sm cursor-pointer">
                                Demandez à être rappelé
                            </Button>
                        </Link>
                    </div>
                        
                    <Text variant="small" className="mt-6 font-medium tracking-wide uppercase drop-shadow-sm text-white/60 block">
                        Sans engagement · Réponse sous 24h
                    </Text>
                </div>
            </Container>
        </Section>
    )
}