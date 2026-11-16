import Image from "next/image"
import { Package } from "lucide-react"
import { baseApi } from "@/lib/boutique/constantes"
import { urlImage } from "@/lib/boutique/format"
import type { ImageArticle } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

/** Photos des produits d'un kit : la principale en grand, deux autres à côté. Pictogramme si aucune. */
export function MosaiqueKit({
  photos,
  alt,
  priorite = false,
  sizes = "(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw",
  className,
}: {
  photos: ImageArticle[]
  alt: string
  priorite?: boolean
  sizes?: string
  className?: string
}) {
  const base = baseApi()
  const srcs = photos.map((p) => urlImage(p.moyenne, base)).filter((s): s is string => s !== null)
  if (srcs.length === 0) {
    return (
      <div className={cn("flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-accent", className)}>
        <Package aria-hidden="true" className="h-1/3 w-1/3 text-secondary-strong" strokeWidth={1.25} />
      </div>
    )
  }
  const [principale, ...autres] = srcs
  return (
    <div
      className={cn(
        "grid aspect-[3/2] w-full gap-2 overflow-hidden rounded-xl bg-white",
        autres.length > 0 ? "grid-cols-3 grid-rows-2" : "grid-cols-1",
        className,
      )}
    >
      <div className={cn("relative", autres.length > 0 && "col-span-2 row-span-2")}>
        <Image src={principale} alt={alt} fill priority={priorite} sizes={sizes} className="object-contain p-2" />
      </div>
      {autres.slice(0, 2).map((src) => (
        <div key={src} className={cn("relative rounded-lg bg-accent/40", autres.length === 1 && "row-span-2")}>
          <Image src={src} alt="" fill sizes="140px" className="object-contain p-2" />
        </div>
      ))}
    </div>
  )
}
