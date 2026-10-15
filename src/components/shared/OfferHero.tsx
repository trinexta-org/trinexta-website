"use client"

import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"

interface OfferHeroProps {
  part1: string
  part2: string
  subtitles: string[]
  imageSrc: string
  // Lien d'annonce sous les slides (ex. offre d'entrée plus bas dans la page)
  announcement?: { label: string; href: string }
}

export function OfferHero({ part1, part2, subtitles, imageSrc, announcement }: OfferHeroProps) {
  const slides = subtitles.map((subtitle) => ({ subtitle }))

  return (
    <HeroCarousel
      slides={slides}
      containerPadding="py-12 md:py-16 lg:py-20"
      slideMinHeight="min-h-[140px] sm:min-h-[110px]"
      staticBackground={
        <Image
          src={imageSrc}
          alt="Offre Trinexta"
          fill
          preload
          quality={50}
          className="object-cover object-center"
          sizes="100vw"
        />
      }
      overlays={<div className="absolute inset-0 bg-primary/90" />}
      // Le titre reste hors des slides : un seul h1, au lieu d'un h1 et de h2 dupliques
      header={
        <Heading
          as="h1"
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-xl"
        >
          <span className="text-white">{part1}</span>{" "}
          <span className="text-secondary-strong">{part2}</span>
        </Heading>
      }
      renderSlide={(slide) => (
        <Text className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md">
          {slide.subtitle}
        </Text>
      )}
      footer={
        <>
        {announcement && (
          <Link
            href={announcement.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-primary transition-colors hover:bg-white"
          >
            {announcement.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-white">
              Nous contacter
            </Button>
          </Link>
        </div>
        </>
      }
    />
  )
}
