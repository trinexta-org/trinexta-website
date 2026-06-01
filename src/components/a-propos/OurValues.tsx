"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"
import { Container } from "@/components/layout/Container"

const AUTOPLAY_DELAY = 4000
const PAUSE_AFTER_CLICK = 10000


const values = [
    {
        title: "Accessibilité",
        desc: "Un accompagnement sérieux ne doit pas être réservé aux grandes structures. Vous bénéficiez d'un service fiable et réactif, quelle que soit votre taille. Nous ne proposons pas une réponse standardisée à tous les clients. Nous prenons le temps de comprendre votre environnement, vos besoins et vos objectifs pour vous orienter vers la solution la plus pertinente.",
        image: "/images/a-propos/engagements/accessibilite.jpg"
    },
    {
        title: "Proximité",
        desc: "Nous privilégions une relation directe, fondée sur l'écoute, la compréhension de vos besoins et l'adaptation à votre réalité terrain. Vous bénéficiez d’un point d’entrée clair, avec une prise en charge sérieuse et réactive. L’objectif est de vous apporter des réponses utiles, sans multiplier les intermédiaires ni compliquer inutilement la relation.",
        image: "/images/a-propos/engagements/proximite.jpg"
    },
    {
        title: "Réactivité",
        desc: "Chaque minute compte. Notre helpdesk est disponible du lundi au vendredi, de 8h30 à 18h, pour répondre rapidement à vos demandes et vous aider à résoudre les incidents du quotidien. Vous bénéficiez d’un point d’entrée clair, avec une prise en charge sérieuse et réactive pour limiter au maximum l'impact sur votre activité.",
        image: "/images/a-propos/engagements/reactivite.jpg"
    },
    {
        title: "Transparence",
        desc: "Des relations simples et honnêtes. Vous savez ce qui est prévu et dans quel cadre nous intervenons. Pas de promesses floues, pas de mauvaises surprises. Chez Trinexta, l’accompagnement informatique repose sur l’échange, l’écoute et l’adaptation en toute transparence.",
        image: "/images/a-propos/engagements/transparence.jpg"
    },
    {
        title: "Expertise partagée",
        desc: "Trinexta s’appuie sur un collectif de professionnels expérimentés, sélectionnés pour leur savoir-faire technique et leur capacité d’intervention. Cette logique de réseau nous permet de mobiliser les bonnes compétences selon les besoins, tout en gardant une approche souple et opérationnelle. Notre force réside dans cette expertise mutualisée au sein de notre réseau indépendant, vous assurant un support technique d’excellence pour toutes vos problématiques IT.",
        image: "/images/a-propos/engagements/expertise.jpg"
    },
    {
        title: "Engagement",
        desc: "Votre satisfaction est notre ligne directrice. Nous nous engageons à fournir un accompagnement sérieux, avec des interventions de qualité, des délais respectés et une attention constante portée à l’efficacité des actions menées. Notre objectif n’est pas seulement d’intervenir, mais de construire une relation utile dans la durée.",
        image: "/images/a-propos/engagements/engagement.jpg"
    },
    {
        title: "Agilité",
        desc: "Votre structure évolue, vos outils changent, vos besoins aussi. Nous faisons évoluer notre accompagnement en fonction de votre réalité, qu’il s’agisse de renforcer votre support, de sécuriser votre environnement ou de faire grandir votre organisation informatique. Cette souplesse fait partie intégrante de notre manière de travailler.",
        image: "/images/a-propos/engagements/agilite.jpg"
    },
    {
        title: "L'humain au centre",
        desc: "Derrière chaque demande, il y a un dirigeant, un collaborateur, une équipe, une organisation à faire fonctionner. Chez Trinexta, nous sommes convaincus qu’une bonne informatique commence toujours par une bonne compréhension des personnes, des usages et des besoins. C’est pour cela que nous plaçons l’écoute, la confiance et la relation humaine au centre de notre accompagnement.",
        image: "/images/a-propos/engagements/humain.jpg"
    }
]

export function OurValues() {
    const [active, setActive] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const safeActive = active % values.length
    const scrollToActive = useCallback((idx: number) => {
        const container = scrollRef.current
        if (!container) return
        const btn = container.children[idx] as HTMLElement
        if (!btn) return

        const containerCenter = container.offsetWidth / 2
        const btnCenter = btn.offsetLeft + btn.offsetWidth / 2

        container.scrollTo({
            left: btnCenter - containerCenter,
            behavior: "smooth"
        })
    }, [])

    const startInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setActive(prev => (prev + 1) % values.length)
        }, AUTOPLAY_DELAY)
    }, [])
    useEffect(() => {
        scrollToActive(safeActive)
    }, [safeActive, scrollToActive])

    useEffect(() => {
        startInterval()
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [startInterval])

    const handleClick = (idx: number) => {
        setActive(idx)

        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setTimeout(() => {
            startInterval()
        }, PAUSE_AFTER_CLICK) as unknown as ReturnType<typeof setInterval>
    }

    return (
        <Section id="valeurs-approfondies" className="py-16 md:py-24 bg-primary">
            <Container>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

                    <div className="p-4 md:p-6 bg-black/30 border-b border-white/10">
                        <Text className="text-white/50 text-xs md:text-sm uppercase tracking-widest font-bold mb-4 ml-2">
                            Découvrez nos engagements
                        </Text>

                        <div className="h-0.5 bg-white/10 rounded-full mb-4 overflow-hidden">
                            <motion.div
                                key={safeActive}
                                className="h-full bg-secondary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                            />
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                        >
                            {values.map((val, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleClick(idx)}
                                    className={`group relative shrink-0 w-[160px] md:w-[200px] h-[90px] md:h-[110px] rounded-xl overflow-hidden transition-all duration-300 ${safeActive === idx
                                        ? "ring-2 ring-secondary opacity-100 scale-95"
                                        : "border border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                                        }`}
                                >
                                    <Image
                                        src={val.image}
                                        alt={`Miniature ${val.title}`}
                                        fill
                                        sizes="200px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary/60 flex items-center justify-center p-3 text-center transition-colors group-hover:bg-primary/40 group">
                                        <span className="text-white font-bold text-sm drop-shadow-md">
                                            {val.title}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={safeActive}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col"
                        >
                            <div className="relative h-[250px] md:h-[400px] w-full">
                                <Image
                                    src={values[safeActive].image}
                                    alt={values[safeActive].title}
                                    fill
                                    className="object-cover object-[center_25%]"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                                    <Heading as="h2" className="text-4xl md:text-6xl text-white font-black drop-shadow-lg">
                                        {values[safeActive].title}
                                    </Heading>
                                </div>
                            </div>

                            <div className="p-6 md:p-12 min-h-[180px] bg-primary/30">
                                <Text className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl font-medium">
                                    {values[safeActive].desc}
                                </Text>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </Container>
        </Section>
    )
}