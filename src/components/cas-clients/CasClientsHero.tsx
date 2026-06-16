"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { HeroCarousel } from "@/components/ui/HeroCarousel"
import { Badge } from "@/components/ui/Badge"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { caseClients } from "@/data/cas-clients"

const highlightedWords = ["bases", "pro", "transformés", "silence", "modernisés", "vitesse", "supérieure"]

export function CasClientsHero() {
  return (
    <HeroCarousel
      slides={caseClients}
      slideMinHeight="min-h-[300px] sm:min-h-[280px] md:min-h-[320px]"
      renderBackground={(slide, i) => (
        <Image
          src={slide.heroImage}
          alt={slide.clientName}
          fill
          fetchPriority={i <= 2 ? "high" : "auto"}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      overlays={
        <>
          <div className="absolute inset-0 bg-primary/75" />
          <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/65 to-transparent" />
        </>
      }
      renderSlide={(slide, index, isActive) => (
        <div className="space-y-4 md:space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: slide.label, className: "border-secondary/30 bg-secondary/15 text-white" },
              { label: slide.sectorLabel, className: "border-white/10 bg-white/10 text-white" },
              { label: slide.size, className: "border-white/10 bg-white/10 text-white" },
            ].map(({ label, className }, i) => (
              <span
                key={label}
                className="animate-badge-pop"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Badge className={className}>{label}</Badge>
              </span>
            ))}
          </div>

          <Heading
            as={isActive ? "h1" : "h2"}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-xl text-white"
          >
            {slide.title.split(" ").map((word, i) => {
              const isItalic = word.startsWith("*") && word.endsWith("*") && word.length > 2
              const rawWord = isItalic ? word.slice(1, -1) : word
              const clean = rawWord.toLowerCase().replace(/[,.:]/g, "")
              return (
                <React.Fragment key={i}>
                  <span
                    className={`inline-block mr-2 sm:mr-3 ${highlightedWords.includes(clean) ? "text-secondary" : "text-white"}`}
                  >
                    {isItalic ? <em>{rawWord}</em> : rawWord}
                  </span>
                  {" "}
                </React.Fragment>
              )
            })}
          </Heading>

          <Text variant="lead" className="max-w-3xl text-white/80">
            {slide.cardChallenge}
          </Text>

          <Button asChild variant="secondary" size="lg">
            <Link href={`/cas-clients/${slide.slug}`}>
              Découvrir ce cas client
            </Link>
          </Button>
        </div>
      )}
    />
  )
}