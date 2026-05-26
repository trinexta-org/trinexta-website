"use client"

import { JsonLd } from "@/components/seo/JsonLd";
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/ui/FadeIn"
import { TransitionTitle } from "@/components/TransitionTitle"
import { GridCards } from "@/components/layout/GridCards"

export interface ServicePageProps {
    serviceSlug: string
    hero: { titlePart1: string; titlePart2: string; description: string; ctaText: string; ctaHref: string }
    problem: { subtitle: string; title: string; description: string; painPoints: string[] }
    offer: { subtitle: string; title: string; description: string; features: Array<{ title: string; desc: string }> }
    benefits: { subtitle: string; title: string; items: Array<{ title: string; desc: string }> }
    faq: Array<{ question: string; answer: string }>
    cta: { title: string; description: string; buttonText: string; buttonHref: string }
}

export function ServicePage({ serviceSlug, hero, problem, offer, benefits, faq, cta }: ServicePageProps) {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
    const [activeBenefit, setActiveBenefit] = useState(0)

    const [bentoOrder, setBentoOrder] = useState([0, 1, 2, 3, 4])
    useEffect(() => {
        const interval = setInterval(() => {
            setBentoOrder((prev) => {
                const newOrder = [...prev]
                const first = newOrder.shift()
                if (first !== undefined) newOrder.push(first)
                return newOrder
            })
        }, 15000)
        return () => clearInterval(interval)
    }, [])
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer },
        })),
    }

    return (
        <div className="bg-primary min-h-screen text-white">
            <JsonLd data={jsonLd} />

            {/* 1. HERO */}
            <section className="relative z-10 min-h-[70dvh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`/images/services/${serviceSlug}/hero.jpg`}
                        alt={`${hero.titlePart1} ${hero.titlePart2}`}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-primary/90" />
                </div>
                <Container className="relative z-10 py-16 md:py-20">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Heading as="h1" className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-tight drop-shadow-xl">
                                <span className="text-white">{hero.titlePart1}</span> <span className="text-secondary">{hero.titlePart2}</span>
                            </Heading>
                            <div className="mt-4 md:mt-6 max-w-2xl max-h-[30vh] overflow-y-auto pr-4 
    [&::-webkit-scrollbar]:w-1.5 
    [&::-webkit-scrollbar-thumb]:bg-secondary/40 
    [&::-webkit-scrollbar-track]:bg-transparent 
    hover:[&::-webkit-scrollbar-thumb]:bg-secondary/80 
    transition-colors duration-300">

                                <Text className="text-base md:text-xl text-white/90 drop-shadow-md">
                                    {hero.description}
                                </Text>
                            </div>
                        </motion.div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link href={hero.ctaHref} className="w-full sm:w-auto">
                                <Button variant="secondary" className="w-full sm:w-auto text-white h-auto py-3.5 px-6 md:py-5 md:px-8 text-sm md:text-base font-bold whitespace-normal text-center">
                                    {hero.ctaText}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* TRANSITION */}
            <TransitionTitle surtitle={problem.subtitle} line1="Ce qui freine" line2="votre activité" />

            {/* 2. PROBLÈMES */}
            <Section id="probleme" className="bg-primary pb-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    <div className="space-y-6 md:space-y-10">
                        <div className="space-y-3 md:space-y-4">
                            <Heading as="h2" className="text-white text-3xl md:text-4xl">{problem.title}</Heading>
                            <Text className="text-white/80 text-base md:text-lg leading-relaxed">{problem.description}</Text>
                        </div>

                        <GridCards columns={2} gap="gap-2 md:gap-5">
                            {problem.painPoints.map((point, index) => (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div className="group relative p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full flex flex-col justify-center items-center text-center overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Text className="text-white/90 font-medium text-[10px] md:text-sm leading-tight md:leading-snug">
                                            {point}
                                        </Text>
                                    </div>
                                </FadeIn>
                            ))}
                        </GridCards>
                    </div>

                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-auto lg:aspect-square max-w-[500px] mx-auto lg:max-w-none mt-4 lg:mt-0">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-[75%] h-[75%] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
                        >
                            <Image src={`/images/services/${serviceSlug}/problem-1.jpg`} alt="Problème IT" fill sizes="(min-width: 1024px) 38vw, (min-width: 640px) 56vw, 75vw" className="object-cover" />
                            <div className="absolute inset-0 bg-primary/20" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-20"
                        >
                            <Image src={`/images/services/${serviceSlug}/problem-2.jpg`} alt="Frustration IT" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 60vw" className="object-cover" />
                            <div className="absolute inset-0 bg-secondary/20" />
                        </motion.div>
                    </div>

                </div>
            </Section>

            {/* TRANSITION */}
            <TransitionTitle surtitle={offer.subtitle} line1="Notre" line2="Périmètre" />

            {/* 3. OFFRE */}
            <Section id="offre" className="bg-primary/95 pb-16 md:pb-24">
                <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-10 md:mb-16">
                    <Heading as="h2" className="text-white text-3xl md:text-4xl">{offer.title}</Heading>
                    <Text variant="lead" className="text-white/80 text-base md:text-lg">{offer.description}</Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(220px,auto)]">
                    {[0, 1, 2, 3, 4].map((gridPositionIndex) => {

                        const currentDataIndex = bentoOrder[gridPositionIndex];
                        const feat = offer.features[currentDataIndex];

                        const isLargeWithImage = gridPositionIndex === 0 || gridPositionIndex === 4;
                        const bentoClass = gridPositionIndex === 0 ? "md:col-span-2 md:row-span-2"
                            : gridPositionIndex === 4 ? "md:col-span-2 md:row-span-1"
                                : "md:col-span-1 md:row-span-1";

                        const imageIndex = gridPositionIndex === 0 ? 1 : 2;
                        return (
                            <motion.div
                                layout
                                key={`bento-slot-${gridPositionIndex}`}
                                className={`relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 group ${bentoClass} ${!isLargeWithImage ? 'bg-white/[0.02]' : ''}`}
                            >
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={`content-${currentDataIndex}`}
                                        layoutId={`bento-item-${currentDataIndex}`}
                                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        {isLargeWithImage && (
                                            <>
                                                <Image src={`/images/services/${serviceSlug}/bento-${imageIndex}.jpg`} alt={feat.title} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 md:to-transparent" />
                                            </>
                                        )}

                                        <div className={`relative z-10 h-full flex flex-col justify-end p-5 md:p-8 ${!isLargeWithImage ? 'justify-start' : ''}`}>
                                            <Heading as="h3" className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3">
                                                {feat.title}
                                            </Heading>

                                            <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary/30 scrollbar-track-transparent">
                                                <Text className="text-white/80 text-sm md:text-base leading-relaxed">
                                                    {feat.desc}
                                                </Text>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </Section>

            {/* TRANSITION */}
            <TransitionTitle surtitle={benefits.subtitle} line1="Vos" line2="Bénéfices" />

            {/* 4. BÉNÉFICES */}
            <Section id="benefices" className="bg-primary pb-16 md:pb-32">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                    <Heading as="h2" className="text-white text-3xl md:text-4xl">{benefits.title}</Heading>
                </div>

                <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] w-full gap-2 md:gap-4">
                    {benefits.items.map((benefit, index) => {
                        const isActive = activeBenefit === index;
                        return (
                            <motion.div
                                key={index}
                                layout onClick={() => setActiveBenefit(index)}
                                initial={false}
                                animate={{ flex: isActive ? 12 : 1 }}
                                transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
                                className={`relative overflow-hidden cursor-pointer rounded-xl md:rounded-3xl shadow-2xl transition-all duration-500 ${isActive ? "border-2 border-secondary" : "border border-white/10 opacity-70 md:opacity-100"}`}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <Image src={`/images/services/${serviceSlug}/benefit-${index + 1}.jpg`} alt={benefit.title} fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover" priority={index === 0} />
                                    <motion.div animate={{ opacity: isActive ? 0.7 : 0.3 }} className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                                </div>

                                <AnimatePresence>
                                    {!isActive && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-white/60 font-bold text-lg md:text-3xl md:-rotate-90 whitespace-nowrap tracking-widest">0{index + 1}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: 0.1 }} className="absolute bottom-3 md:bottom-10 left-3 right-3 md:left-10 md:right-10 z-10">
                                            <div className="backdrop-blur-xl bg-primary/40 md:bg-white/10 border border-white/20 p-4 md:p-8 rounded-lg md:rounded-2xl shadow-2xl max-w-2xl">
                                                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                                                    <span className="flex items-center justify-center w-6 h-6 md:w-12 md:h-12 rounded-full bg-secondary text-white font-bold text-xs md:text-xl shrink-0">0{index + 1}</span>
                                                    <Heading as="h3" className="text-lg md:text-3xl font-black text-white uppercase tracking-tight line-clamp-1 md:line-clamp-none">{benefit.title}</Heading>
                                                </div>
                                                <Text className="text-white/90 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">{benefit.desc}</Text>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </Section>

            {/* 5. FAQ */}
            <Section id="faq" className="bg-primary/95 pb-16 md:pb-24 border-t border-white/5 pt-12 md:pt-16">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 md:mb-10 text-center">
                        <span className="text-secondary text-xs font-mono font-bold uppercase tracking-widest block mb-2">Des réponses à vos interrogations</span>
                        <Heading as="h2" className="text-white text-3xl md:text-4xl">Questions Fréquentes</Heading>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        {faq.map((item, index) => {
                            const isOpen = openFaqIndex === index;
                            return (
                                <div key={index} className="bg-white/[0.02] border border-white/10 rounded-lg md:rounded-xl overflow-hidden transition-colors hover:border-white/20">
                                    <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex justify-between items-center gap-3 md:gap-4 group">
                                        <span className="font-bold text-white/90 text-sm md:text-base group-hover:text-white transition-colors">{item.question}</span>
                                        <span className={`text-secondary font-mono font-black text-lg md:text-xl transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                                            <p className="text-white/70 text-sm md:text-base leading-relaxed border-t border-white/5 pt-3 md:pt-4">{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Section>

            {/* 6. CTA FINAL */}
            <Section className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src={`/images/services/${serviceSlug}/cta-footer.jpg`} alt="Contact Trinexta" fill sizes="100vw" className="object-cover object-center" />
                    <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />
                </div>
                <Container className="relative z-10 text-center max-w-3xl px-4">
                    <Heading as="h2" className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                        {cta.title}
                    </Heading>
                    <Text className="text-white/80 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">
                        {cta.description}
                    </Text>
                    <Link href={cta.buttonHref} className="block w-full sm:w-auto">
                        <Button variant="secondary" className="w-full sm:w-auto text-white font-bold px-6 py-3.5 md:px-8 md:py-6 text-sm md:text-lg h-auto whitespace-normal hover:scale-105 transition-transform">
                            {cta.buttonText}
                        </Button>
                    </Link>
                </Container>
            </Section>
        </div>
    )
}