"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { Container } from "@/components/layout/Container"

const slides = [
  {
    part1: "Contactez",
    part2: "Trinexta",
    subtitle: "Besoin d'un devis sur-mesure, d'une assistance technique ou d'une expertise ponctuelle ? Nos experts vous répondent sous 24h ouvrées."
  },
  {
    part1: "Support",
    part2: "Proactif",
    subtitle: "Une urgence technique ? Nos techniciens qualifiés interviennent rapidement à distance ou directement dans vos locaux pour garantir la continuité de votre activité."
  },
  {
    part1: "Échangeons",
    part2: "Ensemble",
    subtitle: "Arrêtez de perdre du temps avec une informatique mal suivie. Discutons de vos besoins et trouvons la solution simple et fiable adaptée à votre entreprise."
  }
]

export function ContactHero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative z-10 min-h-[80dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/services/support-informatique/hero.jpg"
                    alt="Contact Trinexta"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-primary/90" />
            </div>

            <Container className="relative z-10 py-20 flex flex-col justify-center">
                <div className="max-w-4xl">
                    <div className="min-h-[250px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Heading
                                    as="h1"
                                    className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-xl"
                                >
                                    <span className="text-white">{slides[currentSlide].part1}</span>
                                    {" "}
                                    <span className="text-secondary">{slides[currentSlide].part2}</span>
                                </Heading>

                                <Text className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md">
                                    {slides[currentSlide].subtitle}
                                </Text>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                        <Link href="#formulaire" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full text-white shadow-lg hover:shadow-xl transition-all">
                                Remplir le formulaire
                            </Button>
                        </Link>
                        <Link href="tel:+33978250746" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full text-white border-white hover:bg-white/10 backdrop-blur-sm transition-all">
                                Appeler le 09 78 25 07 46
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}