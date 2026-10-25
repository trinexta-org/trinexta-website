"use client"

import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Typography"
import { contactHeroH1, contactHeroSlides } from "@/data/heroes"

export function ContactHero() {
  return (
    <HeroCarousel
      slides={contactHeroSlides}
      containerPadding="py-12 md:py-16 lg:py-20"
      slideMinHeight="min-h-[250px]"
      staticBackground={
        <Image
          src="/images/services/support-informatique/hero-v2.avif"
          alt="Contact Trinexta"
          fill
          preload
          quality={50}
          className="object-cover object-center"
          sizes="100vw"
        />
      }
      overlays={<div className="absolute inset-0 bg-primary/90" />}
      label="Comment nous joindre"
      header={
        <h1 className="mb-4 text-sm md:text-base font-bold uppercase tracking-widest text-secondary-soft drop-shadow-md text-balance">
          {contactHeroH1}
        </h1>
      }
      renderSlide={(slide) => (
        <div>
          <p className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-xl">
            <span className="text-white">{slide.part1}</span>{" "}
            <em className="text-secondary-soft">{slide.part2}</em>
          </p>

          <Text className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md">
            {slide.subtitle}
          </Text>
        </div>
      )}
      footer={
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
            <Link href="#formulaire">Remplir le formulaire</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10 backdrop-blur-sm transition-all">
            <Link href="tel:+33978250746">Appeler le 09 78 25 07 46</Link>
          </Button>
        </div>
      }
    />
  )
}
