"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Heading } from "@/components/ui/Typography"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { SA_INTERVENTIONS } from "@/data/services-annexes"

const structuralServices = SA_INTERVENTIONS

export function ServicesGrid() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const goToSlide = (index: number) => {
        if (!scrollContainerRef.current) return
        const newIndex = (index + structuralServices.length) % structuralServices.length
        setCurrentIndex(newIndex)

        const slideWidth = scrollContainerRef.current.clientWidth
        scrollContainerRef.current.scrollTo({
            left: newIndex * slideWidth,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        if (isPaused) return

        intervalRef.current = setInterval(() => {
            goToSlide(currentIndex + 1)
        }, 6000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [currentIndex, isPaused])

    const handleManualNav = (direction: "prev" | "next") => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        goToSlide(direction === "prev" ? currentIndex - 1 : currentIndex + 1)
    }

    const togglePause = () => {
        setIsPaused((prev) => !prev)
    }

    return (
        <div className="relative px-0 md:px-20">
            <div
                ref={scrollContainerRef}
                className="relative overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth flex no-scrollbar"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {structuralServices.map((service, index) => {
                    const imageFirst = index % 2 === 0

                    return (
                        <div
                            key={index}
                            className="w-full flex-shrink-0 snap-start pt-20 md:pt-28"
                            style={{ scrollSnapAlign: "start" }}
                        >
                            <div
                                className={`relative bg-surface-strong rounded-[48px] flex flex-col ${imageFirst ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start gap-6 md:gap-12 p-6 md:p-10 pt-24 md:pt-32 md:min-h-[720px]`}
                            >
                                <div className="relative z-20 w-full md:w-[50%] -mt-32 md:-mt-48 flex-shrink-0 flex flex-col">
                                    <div className="relative w-full h-[280px] md:h-[480px] rounded-[32px] overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(min-width: 768px) 50vw, 90vw"
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-secondary/20 text-xs font-bold text-secondary-strong uppercase tracking-wider">
                                        Sur devis
                                    </div>
                                </div>

                                <div className="relative z-10 w-full p-2 md:p-4 self-stretch flex flex-col">
                                    <span className="text-secondary-strong text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">
                                        {String(index + 1).padStart(2, "0")} / {String(structuralServices.length).padStart(2, "0")}
                                    </span>

                                    <Heading
                                        as="h3"
                                        className="text-2xl md:text-3xl xl:text-4xl text-foreground mb-4 tracking-tight font-extrabold"
                                    >
                                        {service.title}
                                    </Heading>

                                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-2.5 pt-4 border-t border-secondary/20">
                                        {service.points.map((pt, k) => (
                                            <li key={k} className="text-sm text-foreground/80 flex items-start gap-2">
                                                <span className="text-secondary-strong shrink-0 mt-0.5">✓</span>
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Flèches mobile : sous la carte, jamais collées */}
            <div className="flex md:hidden justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => handleManualNav("prev")}
                    aria-label="Service précédent"
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </button>
                <button
                    onClick={togglePause}
                    aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    {isPaused ? (
                        <Play className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                    ) : (
                        <Pause className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                    )}
                </button>
                <button
                    onClick={() => handleManualNav("next")}
                    aria-label="Service suivant"
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </button>
            </div>

            {/* Flèches desktop : à l'extérieur de la carte, avec marge dédiée */}
            <button
                onClick={() => handleManualNav("prev")}
                aria-label="Service précédent"
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-14 h-14 rounded-full bg-background items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
            >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
            </button>

            <button
                onClick={() => handleManualNav("next")}
                aria-label="Service suivant"
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-14 h-14 rounded-full bg-background items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
            >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
            </button>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}