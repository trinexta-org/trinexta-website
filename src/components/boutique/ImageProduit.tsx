import Image from "next/image"
import { Laptop, Monitor, Package, Cable, Keyboard, Network, Printer, Phone, KeyRound, AppWindow, PcCase } from "lucide-react"
import { baseApi } from "@/lib/boutique/constantes"
import { urlImage } from "@/lib/boutique/format"
import type { CodeCategorie, ImageArticle } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

const ICONES: Record<CodeCategorie, typeof Laptop> = {
  portable: Laptop,
  poste: PcCase,
  ecran: Monitor,
  accessoire: Cable,
  peripherique: Keyboard,
  reseau: Network,
  impression: Printer,
  telephonie: Phone,
  licence: KeyRound,
  logiciel: AppWindow,
  kit: Package,
  autre: Package,
}

/** Photo de l'API (via next/image), ou pictogramme de la catégorie si l'article n'en a pas. */
export function ImageProduit({
  image,
  alt,
  categorie,
  taille = "moyenne",
  priorite = false,
  className,
  sizes,
}: {
  image: ImageArticle | null
  alt: string
  categorie: CodeCategorie
  taille?: "miniature" | "moyenne" | "grande"
  priorite?: boolean
  className?: string
  sizes?: string
}) {
  const src = urlImage(image?.[taille], baseApi())
  const cote = taille === "miniature" ? 160 : taille === "moyenne" ? 480 : 960
  if (!src) {
    const Icone = ICONES[categorie]
    return (
      <div className={cn("flex aspect-square w-full items-center justify-center rounded-xl bg-accent", className)}>
        <Icone aria-hidden="true" className="h-1/3 w-1/3 text-secondary-strong" strokeWidth={1.25} />
      </div>
    )
  }
  return (
    <div className={cn("relative aspect-square w-full overflow-hidden rounded-xl bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        width={cote}
        height={cote}
        priority={priorite}
        sizes={sizes ?? `${cote}px`}
        className="h-full w-full object-contain p-3"
      />
    </div>
  )
}
