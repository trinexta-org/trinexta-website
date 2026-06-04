import Link from "next/link";
import Image from "next/image";
import { ResumeArticle, urlForImage } from "@/lib/sanity";

export function RelatedPostCard({ article }: { article: ResumeArticle }) {
  return (
    <Link href={`/blog/${article.slug.current}`} className="group block">
      <div className="relative h-60 w-full rounded-3xl overflow-hidden mb-6 bg-white/5">
        {article.imageUne && (
          <Image
            src={urlForImage(article.imageUne).width(600).height(400).url()}
            alt={article.titre}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
      </div>
      <h3 className="text-xl font-bold leading-tight group-hover:text-secondary transition-colors">
        {article.titre}
      </h3>
      <p className="text-white/50 text-sm mt-3 line-clamp-2">{article.extrait}</p>
    </Link>
  );
}