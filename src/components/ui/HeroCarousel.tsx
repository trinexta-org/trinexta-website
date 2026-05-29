"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Container } from "@/components/layout/Container"

interface HeroCarouselProps<T> {
  slides: T[]
  interval?: number
  renderBackground: (slide: T, index: number) => ReactNode
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
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {renderBackground(slide, i)}
        </div>
      ))}

      {overlays}

      <Container className={`relative z-10 w-full ${containerPadding}`}>
        <div className="max-w-5xl">
          <div className={`${slideMinHeight} flex flex-col justify-center`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {renderSlide(slides[current], current)}
              </motion.div>
            </AnimatePresence>
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
