import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type CaseClient } from "@/data/cas-clients";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";

// "Cas client : intervention..." -> "Intervention..." (le surtitre dit déjà « Cas client »)
function shortTitle(title: string) {
  const short = title.replace(/^Cas client\s*:\s*/, "");
  return short.charAt(0).toUpperCase() + short.slice(1);
}

/*
 * Carte pleine largeur du cas client en vedette : image + récit court + avant/après.
 * `headingAs` permet de l'insérer sous un h2 de page (h3) ou comme titre de section (h2).
 */
export function CasClientFeatured({
  item,
  headingAs = "h2",
}: {
  item: CaseClient;
  headingAs?: "h2" | "h3";
}) {
  if (!item.featured) return null;

  return (
    <article className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-primary text-white shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary/30 via-primary/50 to-primary" />
          <span className="absolute left-5 top-5 md:left-8 md:top-8 rounded-full bg-secondary-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-lg">
            {item.featured.badge}
          </span>
        </div>

        <div className="relative p-6 md:p-10 lg:p-12 flex flex-col gap-6">
          <div className="space-y-4">
            <span className="text-secondary-soft text-xs font-mono font-bold uppercase tracking-widest block">
              Cas client · {item.clientName}
            </span>
            <Heading as={headingAs} emphasis={false} className="text-white text-2xl md:text-3xl lg:text-4xl leading-tight">
              {shortTitle(item.title)}
            </Heading>
            <Text className="text-white/80 text-base md:text-lg leading-relaxed">
              {item.featured.teaser}
            </Text>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {item.metrics.map((metric) => (
              <div key={metric.indicator} className="rounded-xl border border-white/15 bg-white/5 p-4">
                <dt className="text-white/70 text-xs font-bold uppercase tracking-wider">{metric.indicator}</dt>
                <dd className="mt-2 text-white text-lg font-black leading-tight">{metric.after}</dd>
                <dd className="mt-1 text-white/60 text-xs">avant : {metric.before}</dd>
              </div>
            ))}
          </dl>

          <Button asChild variant="secondary" size="lg" className="self-start text-white">
            <Link href={`/cas-clients/${item.slug}`}>
              Lire le cas client
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
