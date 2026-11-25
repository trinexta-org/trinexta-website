"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Vidéo de présentation TRINEXTA : affiche, bouton de lecture, puis lecteur natif.
 * Rien n'est chargé avant le clic (preload="none") pour ne pas alourdir la page.
 */
export function VideoPresentation({
  src,
  poster,
  titre,
  duree,
  ancre,
}: {
  src: string
  poster: string
  titre: string
  duree: string
  /**
   * Ancre de la section (lien des e-mails : trinexta.fr/#video). Arrivée par cette ancre : la vidéo est amenée à l'écran
   * et lancée ; si le navigateur refuse la lecture automatique avec le son, le bouton de lecture reste affiché.
   */
  ancre?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [lancee, setLancee] = useState(false)
  const [sansSon, setSansSon] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || !ancre || window.location.hash !== `#${ancre}`) return
    v.scrollIntoView({ block: "center" })
    // Avec le son d'abord ; les navigateurs le refusent souvent à la première visite : la vidéo part alors sans le son,
    // avec un bouton « Activer le son » bien visible.
    v.play()
      .then(() => setLancee(true))
      .catch(() => {
        v.muted = true
        return v.play().then(() => {
          setLancee(true)
          setSansSon(true)
        })
      })
      .catch(() => {})
  }, [ancre])

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
          onVolumeChange={(e) => {
            if (!e.currentTarget.muted) setSansSon(false)
          }}
          className="h-full w-full object-cover"
        >
          Votre navigateur ne lit pas la vidéo.
        </video>

        {sansSon && (
          <button
            type="button"
            onClick={() => {
              const v = ref.current
              if (!v) return
              v.muted = false
              v.currentTime = 0
              void v.play()
              setSansSon(false)
            }}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-extrabold md:gap-3 md:px-6 md:py-4 text-primary shadow-xl transition-transform hover:scale-105 md:text-lg"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zm-2.5-8.8v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
            </svg>
            Activer le son
          </button>
        )}

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
