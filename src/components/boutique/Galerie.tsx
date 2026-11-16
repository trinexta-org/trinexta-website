"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Galerie de la fiche produit : photo principale, vignettes, et visionneuse plein écran au clic
 * avec loupe (clic pour grossir, déplacement de la souris pour parcourir la photo).
 * Adresses déjà résolues côté serveur.
 */
export function Galerie({ images, alt }: { images: { grande: string; miniature: string }[]; alt: string }) {
  const [actif, setActif] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [origine, setOrigine] = useState("50% 50%")
  const dialogue = useRef<HTMLDialogElement>(null)
  const courante = images[actif] ?? images[0]
  const plusieurs = images.length > 1

  const ouvrir = () => {
    setZoom(false)
    dialogue.current?.showModal()
  }
  const changer = (pas: number) => {
    setZoom(false)
    setActif((i) => (i + pas + images.length) % images.length)
  }

  useEffect(() => {
    const d = dialogue.current
    if (!d) return
    const clavier = (e: KeyboardEvent) => {
      if (!d.open || !plusieurs) return
      if (e.key === "ArrowRight") changer(1)
      if (e.key === "ArrowLeft") changer(-1)
    }
    window.addEventListener("keydown", clavier)
    return () => window.removeEventListener("keydown", clavier)
  })

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={ouvrir}
        aria-label="Agrandir la photo"
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-white"
      >
        <Image
          src={courante.grande}
          alt={alt}
          width={960}
          height={960}
          priority
          sizes="(min-width: 1024px) 560px, 92vw"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
          <ZoomIn aria-hidden="true" className="h-4 w-4" />
          Agrandir
        </span>
      </button>

      {plusieurs && (
        <ul className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <li key={img.miniature}>
              <button
                type="button"
                onClick={() => setActif(i)}
                aria-label={`Afficher la photo ${i + 1}`}
                aria-pressed={i === actif}
                className={cn(
                  "block aspect-square w-full overflow-hidden rounded-lg border bg-white",
                  i === actif ? "border-primary" : "border-border hover:border-secondary-strong",
                )}
              >
                <Image src={img.miniature} alt="" width={160} height={160} sizes="96px" className="h-full w-full object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogue}
        aria-label={`Photo : ${alt}`}
        onClick={(e) => {
          if (e.target === dialogue.current) dialogue.current?.close()
        }}
        className="m-auto h-[92vh] w-[94vw] max-w-5xl rounded-2xl bg-white p-0 backdrop:bg-primary/80"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className={cn("h-full w-full overflow-hidden", zoom ? "cursor-zoom-out" : "cursor-zoom-in")}
            onClick={() => setZoom((z) => !z)}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              setOrigine(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
            }}
          >
            <Image
              src={courante.grande}
              alt={alt}
              width={960}
              height={960}
              sizes="94vw"
              style={{ transformOrigin: origine }}
              className={cn("h-full w-full object-contain p-6 transition-transform duration-200", zoom && "scale-[2.2]")}
            />
          </div>

          <button
            type="button"
            onClick={() => dialogue.current?.close()}
            aria-label="Fermer"
            className="absolute right-3 top-3 rounded-full bg-primary p-2 text-white hover:bg-primary/90"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          {plusieurs && (
            <>
              <button
                type="button"
                onClick={() => changer(-1)}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white p-2 text-primary shadow-sm hover:border-primary"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => changer(1)}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white p-2 text-primary shadow-sm hover:border-primary"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                {actif + 1} / {images.length}
              </p>
            </>
          )}
          <p className="absolute bottom-3 right-3 hidden text-xs text-muted-foreground md:block">
            Cliquez sur la photo pour zoomer
          </p>
        </div>
      </dialog>
    </div>
  )
}
