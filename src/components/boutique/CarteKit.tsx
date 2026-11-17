import Link from "next/link"
import { MosaiqueKit } from "./MosaiqueKit"
import { euros } from "@/lib/boutique/format"
import type { ImageArticle, KitResume } from "@/lib/boutique/types"

export function CarteKit({ kit, photos = [], priorite = false }: { kit: KitResume; photos?: ImageArticle[]; priorite?: boolean }) {
  return (
    <Link
      href={`/boutique/kits/${kit.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <MosaiqueKit photos={photos} alt={kit.nom} priorite={priorite} />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-bold text-primary group-hover:underline">{kit.nom}</h3>
        {kit.description && <p className="text-sm leading-relaxed text-muted-foreground">{kit.description}</p>}
        <p className="text-sm text-muted-foreground">
          {kit.variantes.length} configuration{kit.variantes.length > 1 ? "s" : ""}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">À partir de</p>
        <p className="text-2xl font-black text-primary">
          {euros(kit.aPartirDe.ttc)} <span className="text-sm font-bold">TTC</span>
        </p>
        <p className="text-sm text-muted-foreground">{euros(kit.aPartirDe.ht)} HT</p>
      </div>
    </Link>
  )
}
