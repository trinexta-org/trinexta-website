"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

/** Galerie de la fiche produit : photo principale et vignettes. Adresses déjà résolues côté serveur. */
export function Galerie({ images, alt }: { images: { grande: string; miniature: string }[]; alt: string }) {
  const [actif, setActif] = useState(0)
  const courante = images[actif] ?? images[0]
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src={courante.grande}
          alt={alt}
          width={960}
          height={960}
          priority
          sizes="(min-width: 1024px) 560px, 92vw"
          className="h-full w-full object-contain p-6"
        />
      </div>
      {images.length > 1 && (
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
    </div>
  )
}
