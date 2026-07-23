"use client"

import React, { useEffect, useState } from "react"
import { preload } from "react-dom"
import Link from "next/link"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { homeHeroSlides } from "@/data/heroes"

const HIGHLIGHT_KEYWORDS = ["informatique", "support", "fiable", "quotidien", "souplesse", "suivie"]

function SlideTitle({ title, isActive }: { title: string; isActive: boolean }) {
  return (
    <Heading
      as={isActive ? "h1" : "h2"}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-normal text-primary text-balance"
    >
      {title.split(" ").map((word, i) => {
        const isItalic = word.startsWith("*") && word.endsWith("*") && word.length > 2
        const rawWord = isItalic ? word.slice(1, -1) : word
        const cleanWord = rawWord.toLowerCase().replace(/[,.]/g, "")
        const isHighlighted = HIGHLIGHT_KEYWORDS.includes(cleanWord)

        return (
          <React.Fragment key={i}>
            <span className={isHighlighted ? "text-secondary inline-block mr-2 sm:mr-3" : "inline-block mr-2 sm:mr-3"}>
              {isItalic ? <em>{rawWord}</em> : rawWord}
            </span>{" "}
          </React.Fragment>
        )
      })}
    </Heading>
  )
}

export function HeroSection() {
  preload("/hero-poster.webp", {
    as: "image",
    fetchPriority: "high",
    type: "image/webp",
  })

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true)
    if (document.readyState === "complete") {
      loadVideo()
      return
    }
    window.addEventListener("load", loadVideo, { once: true })
    return () => window.removeEventListener("load", loadVideo)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % homeHeroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ViewportHero fade={false} className="bg-background">
      <Container className="relative z-10 w-full py-8 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Texte */}
          <div className="order-2 lg:order-1">
            <div className="relative min-h-[170px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
              {homeHeroSlides.map((slide, i) => {
                const isActive = i === current
                return (
                  <div
                    key={i}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                      isActive
                        ? "z-10 translate-y-0 opacity-100"
                        : "pointer-events-none z-0 translate-y-4 opacity-0"
                    }`}
                  >
                    <SlideTitle title={slide.title} isActive={isActive} />
                    <Text className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg md:mt-6 md:text-xl">
                      {slide.subtitle}
                    </Text>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {homeHeroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-secondary" : "w-4 bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link href="/nos-offres" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full cursor-pointer text-center text-white shadow-lg transition-all hover:shadow-xl">
                  Découvrir l&apos;offre Sérénité
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full cursor-pointer text-center">
                  Demandez à être rappelé
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              <Text variant="small" className="font-bold uppercase tracking-wider text-muted-foreground">
                Sans engagement · Réponse sous 24h
              </Text>
            </div>
          </div>

          {/* Visuel encadré */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-primary/10 shadow-2xl lg:aspect-square">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                src={shouldLoadVideo ? "/hero.mp4" : undefined}
                poster="/hero-poster.webp"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>

        </div>
      </Container>
    </ViewportHero>
  )
}
