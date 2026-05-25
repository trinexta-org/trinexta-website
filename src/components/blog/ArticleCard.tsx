import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";
import { 
  urlForImage, 
  LIBELLES_CATEGORIES, 
  formatDatePublication, 
  getArticles
} from "@/lib/sanity";

interface ArticleCardProps {
  article: any; 
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden p-0 transition-all hover:shadow-md">
      <div className="grid md:grid-cols-[350px_1fr]">
        {article.imageUne?.asset?._ref ? (
          <div className="relative min-h-[250px] w-full">
            <Image
              src={urlForImage(article.imageUne)
                .width(800)
                .height(600)
                .fit("crop")
                .url()}
              alt={article.imageUne.alt ?? article.titre}
              fill
              sizes="(min-width: 768px) 350px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent">
            <Text className="text-muted-foreground">Image indisponible</Text>
          </div>
        )}

        <div className="flex flex-col justify-center p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge>{LIBELLES_CATEGORIES[article.categorie as keyof typeof LIBELLES_CATEGORIES] ?? "Non classé"}</Badge>
            <Text variant="small" className="text-muted-foreground">
              {formatDatePublication(article.datePublication)}
            </Text>
          </div>

          <Heading as="h3" className="mb-3">
            {article.titre}
          </Heading>
          
          <Text className="mb-6 line-clamp-3 text-muted-foreground">
            {article.extrait}
          </Text>

          <Link
            href={`/blog/${article.slug.current}`}
            className="inline-flex items-center text-sm font-bold text-secondary underline underline-offset-4 hover:text-primary"
          >
            Lire l'article
          </Link>
        </div>
      </div>
    </Card>
  );
}