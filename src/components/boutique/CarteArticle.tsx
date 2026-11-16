import Link from "next/link"
import { BlocPrix } from "./BlocPrix"
import { Disponibilite } from "./Disponibilite"
import { ImageProduit } from "./ImageProduit"
import type { ArticleResume } from "@/lib/boutique/types"

export function CarteArticle({ article, priorite = false }: { article: ArticleResume; priorite?: boolean }) {
  return (
    <Link
      href={`/boutique/produit/${article.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-strong"
    >
      <ImageProduit
        image={article.image}
        alt={article.nom}
        categorie={article.categorie.code}
        priorite={priorite}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
      />
      <div className="flex flex-1 flex-col gap-2">
        {article.marque && (
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-strong">{article.marque.libelle}</span>
        )}
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-primary group-hover:underline">{article.nom}</h3>
        <Disponibilite valeur={article.disponibilite} />
      </div>
      <BlocPrix prix={article.prix} />
    </Link>
  )
}
