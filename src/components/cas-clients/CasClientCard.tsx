import Image from "next/image";
import Link from "next/link";
import { type CaseClient } from "@/data/cas-clients";
import { Button } from "@/components/ui/Button";
import { TrinextaGear } from "@/components/ui/TrinextaGear";
import { MetricRow } from "@/components/cas-clients/MetricRow";

export function CasClientCard({ item }: { item: CaseClient }) {
  return (
    <article className="group flex flex-col h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-secondary/35 hover:shadow-xl hover:shadow-secondary/5">
      {/* Image hero with client info overlay */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={item.cardImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/95" />

        {/* Label badge */}
        <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-secondary/30">
          {item.label}
        </span>

        {/* Client info overlaid at bottom */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <TrinextaGear size={14} />
          <span className="text-xs font-semibold text-white/90">
            {item.clientName}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-[11px] text-white/55">
            {item.sectorLabel} · {item.size}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">
          {item.title}
        </h3>

        <div className="flex flex-1 flex-col gap-3">
          {/* "Résultats obtenus" divider */}
          <div className="flex items-center gap-2.5">
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/40 to-transparent" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-secondary/80">
              Résultats obtenus
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-secondary/40 to-transparent" />
          </div>

          {/* Animated metric rows */}
          <div className="space-y-2">
            {item.metrics.map((metric, i) => (
              <MetricRow key={metric.indicator} metric={metric} rowIndex={i} />
            ))}
          </div>

          {/* Result quote */}
          <div className="rounded-r-xl border-l-2 border-secondary/50 bg-secondary/[0.06] py-2.5 pl-3.5 pr-3">
            <p className="line-clamp-2 text-[11px] italic leading-relaxed text-white/65">
              &ldquo;{item.cardResult}&rdquo;
            </p>
          </div>
        </div>

        <Button asChild variant="secondary" className="w-full mt-auto">
          <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
        </Button>
      </div>
    </article>
  );
}
