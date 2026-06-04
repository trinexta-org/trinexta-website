"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Container } from "@/components/layout/Container"

interface HeroCarouselProps<T> {
  slides: T[]
  interval?: number
  renderBackground?: (slide: T, index: number) => ReactNode
  staticBackground?: ReactNode
  overlays?: ReactNode
  renderSlide: (slide: T, index: number) => ReactNode
  footer?: ReactNode
  containerPadding?: string
  slideMinHeight?: string
}

export function HeroCarousel<T>({
  slides,
  interval = 5000,
  renderBackground,
  staticBackground,
  overlays,
  renderSlide,
  footer,
  containerPadding = "py-10 md:py-14 lg:py-16",
  slideMinHeight = "min-h-[280px] sm:min-h-[260px] md:min-h-[300px]",
}: HeroCarouselProps<T>) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      interval
    )
    return () => clearInterval(timer)
  }, [slides.length, interval])

  return (
    <ViewportHero>
      {staticBackground && (
        <div className="absolute inset-0">
          {staticBackground}
        </div>
      )}

      {!staticBackground && renderBackground && slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {renderBackground(slide, i)}
        </div>
      ))}

      {overlays}

      <Container className={`relative z-10 w-full ${containerPadding}`}>
        <div className="max-w-5xl">
          <div className={`${slideMinHeight} relative w-full`}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                  i === current
                    ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                    : "opacity-0 translate-y-4 z-0 pointer-events-none"
                }`}
              >
                {renderSlide(slide, i)}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-secondary"
                    : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {footer}
        </div>
      </Container>
    </ViewportHero>
  )
}