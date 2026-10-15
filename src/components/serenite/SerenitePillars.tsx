import Image from "next/image"
import { SERENITE_PILIERS as pillars } from "@/data/serenite"

export function SerenitePillars() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {pillars.map((p) => (
        <article
          key={p.title}
          className="group flex flex-col h-full overflow-hidden rounded-2xl border border-secondary/20 bg-surface-strong transition-all duration-300 hover:border-secondary/35 hover:shadow-xl hover:shadow-secondary/5"
        >
          <div className="relative h-40 overflow-hidden">
            <Image
              src={p.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/40 to-primary" />
            <span className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              {p.num}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
            <h3 className="text-xl font-bold leading-snug text-primary">{p.title}</h3>
            <p className="text-[15px] text-primary/75 leading-relaxed">{p.desc}</p>

            <ul className="space-y-2">
              {p.inclusions.map((inc) => (
                <li key={inc} className="flex items-start gap-3 text-sm text-primary/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-3 border-t border-secondary/15 text-sm italic text-primary/70">{p.note}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
