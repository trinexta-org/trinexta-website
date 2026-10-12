"use client";

import React, { useEffect, useState } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { homeHeroSlides } from "@/data/heroes";
import { CoffeeShield } from "@/components/serenite/CoffeeShield";

export function HeroSection() {
  preload("/hero-poster.webp", {
    as: "image",
    fetchPriority: "high",
    type: "image/webp",
  });

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true);

    if (document.readyState === "complete") {
      loadVideo();
      return;
    }

    window.addEventListener("load", loadVideo, { once: true });
    return () => window.removeEventListener("load", loadVideo);
  }, []);

  return (
    <HeroCarousel
      slides={homeHeroSlides}
      containerPadding="py-8 pb-16 md:py-12"
      slideMinHeight="min-h-[270px] md:min-h-[260px] lg:min-h-[340px]"
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
      overlays={<div className="hero-scrim" aria-hidden="true" />}
      renderSlide={(slide, index, isActive) => (
        <div className="flex items-center gap-8 lg:gap-12">
        <div className="min-w-0 flex-1">
          {slide.badge && (
            <span className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
              {slide.badge}
            </span>
          )}
          <Heading
            as={isActive ? "h1" : "h2"}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-normal drop-shadow-xl text-white text-balance"
          >
            {slide.title.split(" ").map((word, i) => {
              const targetKeywords = [
                "informatique",
                "support",
                "fiable",
                "quotidien",
                "souplesse",
                "suivie",
                "café",
              ];
              const isItalic =
                word.startsWith("*") && word.endsWith("*") && word.length > 2;
              const rawWord = isItalic ? word.slice(1, -1) : word;
              const cleanWord = rawWord.toLowerCase().replace(/[,.]/g, "");
              const isHighlighted = targetKeywords.includes(cleanWord);

              return (
                <React.Fragment key={i}>
                  <span
                    className={
                      isHighlighted
                        ? "text-secondary-soft inline-block mr-2 sm:mr-3"
                        : "text-white inline-block mr-2 sm:mr-3"
                    }
                  >
                    {isItalic ? <em>{rawWord}</em> : rawWord}
                  </span>{" "}
                </React.Fragment>
              );
            })}
          </Heading>
          <Text className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-md text-white/90 text-balance">
            {slide.subtitle}
          </Text>
          {slide.cta && (
            <Link
              href={slide.cta.href}
              tabIndex={isActive ? undefined : -1}
              className="mt-4 inline-flex items-center gap-2 font-bold text-secondary-soft underline underline-offset-4 drop-shadow-md hover:text-white transition-colors"
            >
              {slide.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        {slide.visual === "coffee-shield" && (
          <CoffeeShield className="hidden md:block w-44 lg:w-56 xl:w-64 shrink-0 drop-shadow-2xl" />
        )}
        </div>
      )}
      footer={
        <>
          <div className="mt-6 md:mt-10 glass-panel rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:w-fit">
            <Link href="/nos-offres" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all bg-secondary hover:bg-secondary/90"
              >
                Découvrir l&apos;offre Sérénité
              </Button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-center text-white border-white hover:bg-white/10 cursor-pointer"
              >
                Demandez à être rappelé
              </Button>
            </Link>
          </div>

          <div className="mt-10 md:mt-12 pt-6">
            <Text className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-md text-balance">
              Arrêtez de perdre du temps et de l&apos;argent avec une
              informatique mal suivie. Découvrez Trinexta et avancez avec des
              solutions simples, fiables et adaptées à votre entreprise.
            </Text>

            <div className="mt-4 flex w-fit max-w-full items-center gap-2 glass-panel rounded-lg px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <Text
                variant="small"
                className="font-bold tracking-wider uppercase text-white"
              >
                Sans engagement · Réponse sous 24h
              </Text>
            </div>
          </div>
        </>
      }
    />
  );
}
