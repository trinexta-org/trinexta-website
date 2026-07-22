"use client"

import React, { useEffect, useState } from "react"
import { preload } from "react-dom"
import Link from "next/link"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { homeHeroSlides } from "@/data/heroes"

export function HeroSection() {
  preload("/hero-poster.webp", {
    as: "image",
    fetchPriority: "high",
    type: "image/webp",
  })

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true)

    if (document.readyState === "complete") {
      loadVideo()
      return
    }

    window.addEventListener("load", loadVideo, { once: true })
    return () => window.removeEventListener("load", loadVideo)
  }, [])

  return (
    <HeroCarousel
      slides={homeHeroSlides}
      containerPadding="py-8 pb-16 md:py-12"
      slideMinHeight="min-h-[220px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[260px]"
      staticBackground={
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          src={shouldLoadVideo ? "/hero.mp4" : undefined}
          poster="/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        />
      }
      overlays={<div className="absolute inset-0 bg-primary/40 lg:bg-primary/70" />}
      
      renderSlide={(slide, index, isActive) => (
        <div>
          <Heading
            as={isActive ? "h1" : "h2"} 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-normal drop-shadow-xl text-white text-balance"
          >
            {slide.title.split(" ").map((word, i) => {
              const targetKeywords = ["informatique", "support", "fiable", "quotidien", "souplesse", "suivie"]
              const isItalic = word.startsWith("*") && word.endsWith("*") && word.length > 2
              const rawWord = isItalic ? word.slice(1, -1) : word
              const cleanWord = rawWord.toLowerCase().replace(/[,.]/g, "")
              const isHighlighted = targetKeywords.includes(cleanWord)

              return (
                <React.Fragment key={i}>
                  <span
                    className={
                      isHighlighted
                        ? "text-secondary inline-block mr-2 sm:mr-3"
                        : "text-white inline-block mr-2 sm:mr-3"
                    }
                  >
                    {isItalic ? <em>{rawWord}</em> : rawWord}
                  </span>
                  {" "}
                </React.Fragment>
              )
            })}
          </Heading>
          <Text className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md text-white/90 text-balance">
            {slide.subtitle}
          </Text>
        </div>
      )}
      footer={
        <>
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
        </>
      }
    />
  )
}
