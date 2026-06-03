"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { Container } from "@/components/layout/Container"
import { ViewportHero } from "@/components/layout/ViewportHero"

const slides = [
  {
    part1: "Offre",
    part2: "Sérénité",
    subtitle: "L'informatique PME clé en main. Support illimité, maintenance proactive et cybersécurité avancée pour piloter votre activité en toute tranquillité."
  },
  {
    part1: "Offre",
    part2: "Impulsion",
    subtitle: "Votre technicien support sur mesure. Une solution souple et ciblée pour renforcer vos équipes et absorber vos pics d'activité informatique."
  },
  {
    part1: "Services",
    part2: "Annexes",
    subtitle: "Prestations IT sur mesure et à la demande. Conseils, achat de matériel, réseaux, sauvegardes professionnelles et migrations Microsoft 365."
  },
  {
    part1: "Trinexta",
    part2: "Studio",
    subtitle: "Création et développement de sites internet sur mesure. Découvrez les plateformes et solutions web performantes conçues par notre entreprise."
  }
]

export function NosOffresHero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length)
                setIsTransitioning(false)
            }, 500)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <ViewportHero className="min-h-[500px]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/pricing/hero-offres.avif"
                    alt="Offres Trinexta"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-primary/90" />
            </div>

            <Container className="relative z-10 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl">
                    <div className="min-h-[250px] flex flex-col justify-center">
                        <div className={`transition-all duration-500 ease-in-out transform ${
                                isTransitioning 
                                    ? "opacity-0 -translate-y-4" 
                                    : "opacity-100 translate-y-0"
                            }`}
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
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link href="#details">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-primary font-bold">
                                Voir les détails
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                                Demander un devis
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </ViewportHero>
    )
}