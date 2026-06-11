"use client"

import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { offresHeroSlides } from "@/data/heroes"

export function SereniteHero() {
  return (
    <HeroCarousel
      slides={offresHeroSlides}
      containerPadding="py-12 md:py-16 lg:py-20"
      slideMinHeight="min-h-[250px]"
      staticBackground={
        <Image
          src="/images/pricing/hero-offres.avif"
          alt="Offres Trinexta"
          fill
          fetchPriority="high"
          quality={50}
          className="object-cover object-center"
          sizes="100vw"
        />
      }
      overlays={<div className="absolute inset-0 bg-primary/90" />}
      renderSlide={(slide) => (
        <div>
          <Heading
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-xl"
          >
            <span className="text-white">{slide.part1}</span>{" "}
            <span className="text-secondary">{slide.part2}</span>
          </Heading>

          <Text className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md">
            {slide.subtitle}
          </Text>
        </div>
      )}
      footer={
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="#details" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-white">
              Voir les détails
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full text-white border-white hover:bg-white/10">
              Demander un devis
            </Button>
          </Link>
        </div>
      }
    />
  )
}
