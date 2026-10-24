"use client"

import { useRef, useState } from "react"

/**
 * Vidéo de présentation TRINEXTA : affiche, bouton de lecture, puis lecteur natif.
 * Rien n'est chargé avant le clic (preload="none") pour ne pas alourdir la page.
 */
export function VideoPresentation({
  src,
  poster,
  titre,
  duree,
}: {
  src: string
  poster: string
  titre: string
  duree: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [lancee, setLancee] = useState(false)

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary shadow-xl">
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={lancee}
          onPlay={() => setLancee(true)}
          className="h-full w-full object-cover"
        >
          Votre navigateur ne lit pas la vidéo.
        </video>

        {!lancee && (
          <button
            type="button"
            onClick={() => {
              setLancee(true)
              void ref.current?.play()
            }}
            aria-label={`Lire la vidéo : ${titre} (${duree})`}
            className="group absolute inset-0 flex items-end justify-between gap-4 bg-primary/30 p-5 text-left transition-colors hover:bg-primary/15 md:p-8"
          >
            <span className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">Vidéo · {duree}</span>
              <span className="text-2xl font-extrabold text-white md:text-4xl">{titre}</span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:scale-105 md:h-20 md:w-20"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 md:h-8 md:w-8" fill="currentColor">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </figure>
  )
}
