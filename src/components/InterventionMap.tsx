"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const operationalZones = [
    { id: "75", name: "Paris", x: 45, y: -15 },
    { id: "92", name: "Hauts-de-Seine", x: -55, y: 10 },
    { id: "93", name: "Seine-Saint-Denis", x: 50, y: -50 },
    { id: "94", name: "Val-de-Marne", x: 60, y: 40 },
    { id: "95", name: "Val-d'Oise", x: -50, y: -65 },
    { id: "77", name: "Seine-et-Marne", x: 80, y: 5 },
]

export function InterventionMap() {
    const [step, setStep] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setStep((s) => (s + 1) % 3), 6000)
        return () => clearInterval(timer)
    }, [])

    const narrative = [
        {
            id: "CMD_HQ",
            title: "Siège Stratégique 91",
            text: "Notre centre de commandement est basé en Essonne (91), garantissant une liaison directe avec les axes majeurs d'Île-de-France."
        },
        {
            id: "DEP_IDF",
            title: "Réactivité Régionale",
            text: "Déploiement des flux d'intervention vers les 7 départements clés. Support technique sur site garanti en moins de 4 heures."
        },
        {
            id: "EXP_NAT",
            title: "Projection Nationale",
            text: "Au-delà de la capitale, notre onde de service s'étend à l'ensemble du territoire français pour vos besoins critiques."
        }
    ]

    const multiplier = isMobile ? 1.5 : 3.2

    const createOperationalPath = (x: number, y: number) => {
        const startX = 50
        const startY = 50
        const controlX = 50 + (x * multiplier) / 4
        const controlY = 30 + (y * multiplier) / 4
        const endX = 50 + (x * multiplier) / 2
        const endY = 50 + (y * multiplier) / 2

        return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
    }

    return (
        <Section container={false} className="relative bg-primary py-12 md:py-32 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(30deg, var(--secondary) 1px, transparent 1px), linear-gradient(-30deg, var(--secondary) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                    transform: 'rotateX(45deg) translateY(200px)'
                }}
            />

            <Container>
                <div className="relative z-10">
                    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 md:gap-20 items-center">

                    <div className="w-full lg:col-span-2 space-y-4 md:space-y-8 order-1">
                        <div className="relative h-16 md:h-32 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={step}
                                    initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }}
                                    className="absolute bottom-0 left-0 text-[60px] md:text-[150px] font-black leading-none opacity-5 font-mono text-secondary"
                                >
                                    0{step + 1}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-3xl shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-2 md:space-y-4"
                                >
                                    <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                        {narrative[step].title}
                                    </h3>
                                    <p className="text-white/60 text-sm md:text-xl leading-relaxed font-light italic">
                                        &ldquo;{narrative[step].text}&rdquo;
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-6 flex gap-4 h-1">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex-1 bg-white/5 rounded-full overflow-hidden">
                                        {step === i && (
                                            <motion.div
                                                initial={{ width: "0%" }} animate={{ width: "100%" }}
                                                transition={{ duration: 6, ease: "linear" }}
                                                className="h-full bg-secondary"
                                            />
                                        )}
                                        {step > i && <div className="h-full w-full bg-secondary/30" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:col-span-3 relative h-[320px] md:h-[700px] flex items-center justify-center perspective-[2000px] order-2 -mt-8 md:mt-0">
                        <motion.div
                            animate={{ rotateX: 20, rotateY: -10 }}
                            className="relative w-full h-full flex items-center justify-center"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <AnimatePresence>
                                {step === 2 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[1, 2, 3].map((i) => (
                                            <motion.div
                                                key={`wave-${i}`}
                                                initial={{ scale: 0.1, opacity: 1 }}
                                                animate={{ scale: 3.5, opacity: 0 }}
                                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                                                className="absolute w-32 h-32 md:w-40 md:h-40 border-2 border-secondary rounded-full"
                                            />
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                animate={{ translateZ: 50, y: [0, -10, 0] }}
                                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                                className="relative z-50 w-32 h-32 md:w-64 md:h-64 drop-shadow-2xl"
                            >
                                <Image
                                    src="/images/map/isometric-hq.png"
                                    alt="HQ"
                                    fill
                                    sizes="(max-width: 768px) 256px, 512px"
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                            >
                                <defs>
                                    <marker id="arrow-tip" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--secondary)" />
                                    </marker>
                                </defs>
                                {operationalZones.map((d, i) => (
                                    <AnimatePresence key={`path-${d.id}`}>
                                        {step >= 1 && (
                                            <motion.path
                                                d={createOperationalPath(d.x, d.y)}
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                exit={{ pathLength: 0, opacity: 0 }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                stroke="var(--secondary)" strokeWidth="2" fill="none" markerEnd="url(#arrow-tip)"
                                            />
                                        )}
                                    </AnimatePresence>
                                ))}
                            </svg>

                            {operationalZones.map((d, i) => (
                                <motion.div
                                    key={`badge-${d.id}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: step >= 1 ? 1 : 0,
                                        scale: step >= 1 ? 1 : 0,
                                        x: step >= 1 ? d.x * multiplier : 0,
                                        y: step >= 1 ? d.y * multiplier : 0,
                                        translateZ: 80
                                    }}
                                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 100 }}
                                    className="absolute z-40 bg-white/10 backdrop-blur-xl border border-white/20 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center shadow-2xl"
                                >
                                    <span className="text-[10px] md:text-sm font-black text-white">{d.id}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
                </div>
            </Container>
        </Section>
    )
}