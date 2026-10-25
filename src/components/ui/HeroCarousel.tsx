"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Pause, Play } from "lucide-react"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Container } from "@/components/layout/Container"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface HeroCarouselProps<T> {
  slides: T[]
  interval?: number
  renderBackground?: (slide: T, index: number) => ReactNode
  staticBackground?: ReactNode
  overlays?: ReactNode
  renderSlide: (slide: T, index: number, isActive: boolean) => ReactNode
  // Contenu fixe au-dessus des slides : porte le h1 de la page, qui ne tourne jamais
  // avec elles. Les titres de slides sont des accroches (p ou h2), jamais des h1.
  header?: ReactNode
  /** Nom du carrousel pour les lecteurs d'écran. */
  label?: string
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
  header,
  label = "Messages à la une",
  footer,
  containerPadding = "py-10 md:py-14 lg:py-16",
  slideMinHeight = "min-h-[280px] sm:min-h-[260px] md:min-h-[300px]",
}: HeroCarouselProps<T>) {
  const [current, setCurrent] = useState(0)
  const [enPause, setEnPause] = useState(false)
  const reducedMotion = useReducedMotion()

  // Une seule slide : message fixe, ni défilement ni pastilles.
  const defile = slides.length > 1
  // WCAG 2.2.2 : le défilement s'arrête sur demande (bouton) et ne démarre pas
  // si le visiteur a réduit les animations.
  const enLecture = defile && !enPause && !reducedMotion

  useEffect(() => {
    if (!enLecture) return
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      interval
    )
    return () => clearInterval(timer)
  }, [slides.length, interval, enLecture])

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
          aria-hidden={i !== current}
        >
          {renderBackground(slide, i)}
        </div>
      ))}

      {overlays}

      <Container className={`relative z-10 w-full ${containerPadding}`}>
        <div className="max-w-5xl">
          {header}
          <div
            // Slides empilées dans la même cellule de grille : la hauteur suit la plus
            // haute, aucune ne déborde sur le h1 ou les pastilles.
            className={`${slideMinHeight} relative grid w-full`}
            role={defile ? "region" : undefined}
            aria-roledescription={defile ? "carrousel" : undefined}
            aria-label={defile ? label : undefined}
          >
            {slides.map((slide, i) => {
              const isActive = i === current;
              return (
                <div
                  key={i}
                  aria-hidden={!isActive}
                  // inert : les liens d'une slide masquée ne reçoivent pas le focus clavier
                  inert={!isActive}
                  role={defile ? "group" : undefined}
                  aria-roledescription={defile ? "diapositive" : undefined}
                  aria-label={defile ? `${i + 1} sur ${slides.length}` : undefined}
                  className={`col-start-1 row-start-1 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                      : "opacity-0 translate-y-4 z-0 pointer-events-none"
                  }`}
                >
                  {renderSlide(slide, i, isActive)}
                </div>
              );
            })}
          </div>

          {defile && (
          <div className="relative z-20 mt-4 flex items-center gap-1">
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setEnPause((p) => !p)}
                aria-label={enPause ? "Reprendre le défilement" : "Mettre en pause le défilement"}
                className="mr-2 inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {enPause ? (
                  <Play aria-hidden="true" className="size-4" />
                ) : (
                  <Pause aria-hidden="true" className="size-4" />
                )}
              </button>
            )}
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Diapositive ${i + 1} sur ${slides.length}`}
                aria-current={i === current ? "true" : undefined}
                className="group inline-flex h-11 min-w-11 items-center justify-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-secondary"
                      : "w-4 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
          )}

          {footer}
        </div>
      </Container>
    </ViewportHero>
  )
}