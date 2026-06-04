"use client"

import Image from "next/image"
import Link from "next/link"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { aproposHeroSlides } from "@/data/heroes"

const targetKeywords = ["simple,", "humaine", "utile", "humain", "centre", "simplifier", "soutenir"]

export function AProposHero() {
  return (
    <HeroCarousel
      slides={aproposHeroSlides}
      containerPadding="py-12 md:py-16 lg:py-20"
      slideMinHeight="min-h-[220px] sm:min-h-[180px] md:min-h-[240px] lg:min-h-[260px]"
      staticBackground={
        <Image
          src="/images/a-propos/hero-apropos.jpg"
          alt="L'équipe Trinexta by Trustech IT Support"
          fill
          fetchPriority="high"
          className="object-cover grayscale opacity-60"
          sizes="100vw"
        />
      }
      overlays={<div className="absolute inset-0 bg-primary/70 lg:bg-primary/80" />}
      renderSlide={(slide) => (
        <div>
          <Heading
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xl text-white text-balance"
          >
            {slide.title.split(" ").map((word, i) => {
              const isItalic = word.startsWith("*") && word.endsWith("*") && word.length > 2
              const rawWord = isItalic ? word.slice(1, -1) : word
              const cleanWord = rawWord.toLowerCase().replace(/[,.]/g, "")
              const isHighlighted =
                targetKeywords.includes(cleanWord) || rawWord === "simple,"
              return (
                <span
                  key={i}
                  className={
                    isHighlighted
                      ? "text-secondary inline-block mr-2 sm:mr-3"
                      : "text-white inline-block mr-2 sm:mr-3"
                  }
                >
                  {isItalic ? <em>{rawWord}</em> : rawWord}
                </span>
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
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("signification")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto text-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              Découvrir notre ADN
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-center text-white border-white hover:bg-white/10 backdrop-blur-sm cursor-pointer"
            >
              <Link href="/contact">Échanger avec nos experts</Link>
            </Button>
          </div>

          <div className="mt-10 md:mt-12 pt-6">
            <Text className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-md text-balance">
              Trinexta by Trustech IT Support simplifie et sécurise votre
              informatique pour vous offrir un accompagnement fiable, souple et
              adapté à la performance de votre entreprise.
            </Text>
            <div className="flex items-center gap-2 mt-4 opacity-90">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <Text
                variant="small"
                className="font-bold tracking-wider uppercase text-white"
              >
                Proximité · Réactivité · Expertise partagée
              </Text>
            </div>
          </div>
        </>
      }
    />
  )
}
