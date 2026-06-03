"use client"

import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { contactHeroSlides } from "@/data/heroes"

export function ContactHero() {
  return (
    <HeroCarousel
      slides={contactHeroSlides}
      containerPadding="py-12 md:py-16 lg:py-20"
      slideMinHeight="min-h-[250px]"
      renderBackground={() => (
        <Image
          src="/images/services/support-informatique/hero.jpg"
          alt="Contact Trinexta"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
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
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="#formulaire" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-white shadow-lg hover:shadow-xl transition-all">
              Remplir le formulaire
            </Button>
          </Link>
          <Link href="tel:+33978250746" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full text-white border-white hover:bg-white/10 backdrop-blur-sm transition-all">
              Appeler le 09 78 25 07 46
            </Button>
          </Link>
        </div>
      }
    />
  )
}
