"use client"

import { User, Briefcase, ShoppingBag, TrendingUp, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"

const targets = [
    {
        id: 1,
        tags: ["AUTONOMIE", "EFFICACITÉ"],
        tagColors: ["bg-secondary text-white", "bg-primary border border-border text-white"],
        title: "Indépendants & Freelances",
        description: "Libérez-vous des contraintes techniques. Nous gérons votre infrastructure, vos sauvegardes et votre sécurité pour que vous restiez concentré sur votre cœur de métier et vos clients.",
        buttonText: "En savoir plus",
        backgroundImage: "/images/for-who/freelance.avif",
        icon: User,
    },  
    {
        id: 2,
        tags: ["SÉCURITÉ", "CONFIDENTIALITÉ"],
        tagColors: ["bg-primary border border-border text-white", "bg-secondary text-white"],
        title: "Cabinets Professionnels",
        description: "Avocats, comptables ou santé : protégez vos données sensibles. Nous mettons en place des solutions de chiffrement et de continuité d'activité conformes aux exigences de votre profession.",
        buttonText: "En savoir plus",
        backgroundImage: "/images/for-who/cabinets.avif",
        icon: Briefcase,
    },
    {
        id: 3,
        tags: ["RÉACTIVITÉ", "PROXIMITÉ"],
        tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
        title: "Commerces & Points de Vente",
        description: "Un incident informatique ne doit jamais stopper vos ventes. Notre support ultra-réactif assure la maintenance de vos terminaux et de votre réseau pour une disponibilité totale.",
        buttonText: "En savoir plus",
        backgroundImage: "/images/for-who/commerces.avif",
        icon: ShoppingBag,
    },
    {
        id: 4,
        tags: ["CROISSANCE", "STRATÉGIE"],
        tagColors: ["bg-secondary text-white", "bg-accent text-primary"],
        title: "PME en Expansion",
        description: "Scalez votre entreprise sans friction technique. Nous concevons une architecture SI évolutive et robuste, capable de supporter votre croissance et vos nouveaux collaborateurs en toute sérénité.",
        buttonText: "En savoir plus",
        backgroundImage: "/images/for-who/pme.avif",
        icon: TrendingUp,
    },
]

function FloatingTag({ tag, color, index }: { tag: string; color: string; index: number }) {
    return (
        <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: index * 0.3 }}
            className={`${color} px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wide shadow-lg`}
        >
            {tag}
        </motion.span>
    )
}

function LightSweepText({ children, delay = 0 }: { children: string; delay?: number }) {
    const text = children.toString()
    const letters = text.split("")

    return (
        <span className="inline">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
                    animate={{
                        color: [
                            "var(--primary-foreground)",
                            "var(--primary-foreground)",
                            "var(--secondary)",
                            "var(--secondary)",
                            "var(--secondary)",
                            "var(--primary-foreground)",
                            "var(--primary-foreground)",
                        ],
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: delay + i * 0.05,
                        times: [0, 0.2, 0.3, 0.5, 0.7, 0.8, 1],
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    )
}

function AnimatedButton({ text }: { text: string }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 group flex items-center justify-center sm:justify-start gap-3 bg-background hover:bg-background/90 transition-all duration-300 rounded-full sm:pl-5 pr-2 py-1.5 sm:py-2 pl-2 shadow-lg w-full sm:w-auto mt-3 sm:mt-0"
        >
            <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap ml-3 sm:ml-0">
                {text}
            </span>
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className="w-7 h-7 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center ml-auto sm:ml-0"
            >
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
            </motion.div>
        </motion.button>
    )
}

export function ForWhoSection() {
    return (
        <Section container={false} className="relative bg-primary">
            <Container>
                {targets.map((target, index) => {
                    const stackOffsetDesktop = index * 40
                    const stackOffsetMobile = index * 15

                    return (
                        <div
                            key={target.id}
                            className="sticky top-0 w-full h-[75vh] md:h-[100dvh] pb-8 md:pb-16"
                            style={{
                                zIndex: index + 1,
                                paddingTop: `calc(70px + ${stackOffsetMobile}px)`,
                                ['--pt-desktop' as string]: `calc(120px + ${stackOffsetDesktop}px)`,
                            }}
                        >
                            <div
                                className="relative w-full h-full overflow-hidden rounded-[24px] md:rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-border/10 md:[padding-top:var(--pt-desktop)]"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={target.backgroundImage}
                                        alt={target.title}
                                        fill
                                        className="object-cover"
                                        priority={index < 2}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10" />
                                </div>

                                <div className="absolute top-5 left-5 md:top-8 md:left-8 flex flex-wrap gap-2 z-10 max-w-[70%] md:max-w-none">
                                    {target.tags.map((tag, tagIndex) => (
                                        <FloatingTag
                                            key={tag}
                                            tag={tag}
                                            color={target.tagColors[tagIndex]}
                                            index={tagIndex}
                                        />
                                    ))}
                                </div>

                                <div className="absolute top-5 right-5 md:top-8 md:right-8 z-10">
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-[14px] md:rounded-2xl flex items-center justify-center border border-white/20">
                                        <target.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                                    </div>
                                </div>

                                <div className="absolute bottom-5 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="backdrop-blur-xl bg-primary-foreground/10 rounded-[20px] md:rounded-3xl p-4 md:p-6 border border-border/20 shadow-2xl"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 md:gap-4">
                                            <div className="flex-1">
                                                <Heading as="h3" className="text-lg md:text-3xl font-bold mb-1 md:mb-2 leading-tight text-balance text-white drop-shadow-sm">
                                                    <LightSweepText delay={index * 0.5}>{target.title}</LightSweepText>
                                                </Heading>
                                                <Text className="text-[11px] md:text-base leading-relaxed max-w-lg text-white/90 mt-2 drop-shadow-sm">
                                                    {target.description}
                                                </Text>
                                            </div>

                                            <AnimatedButton text={target.buttonText} />
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </Container>
        </Section>
    )
}