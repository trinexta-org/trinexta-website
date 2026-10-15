"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heading } from "@/components/ui/Typography"
import { SERENITE_SUPPORT as support } from "@/data/serenite"

// Fonctionnement du support illimité de Sérénité Complète
export function SereniteConcret() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section className="py-12 lg:py-16 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl bg-primary flex items-center">
          <Image
            src="/images/nos-offres/impulsion_concret.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-primary/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-primary lg:via-primary/90 lg:to-primary/20" />

          <div className="relative z-10 w-full lg:w-[60%] p-8 md:p-12 lg:p-20 flex flex-col justify-center gap-8">
            <div className="space-y-5">
              <Heading as="h2" className="text-3xl md:text-5xl font-extrabold text-white leading-tight [&_em]:text-secondary-soft">
                {support.title}
              </Heading>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">{support.intro}</p>
            </div>

            <div className="space-y-2">
              {support.items.map((item, index) => {
                const isActive = activeIndex === index
                return (
                  <div key={item.label} className="border-b border-white/10 last:border-0">
                    <button
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      aria-expanded={isActive}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left group"
                    >
                      <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                        {item.label}
                      </span>
                      <svg
                        className={`w-6 h-6 shrink-0 transform transition-transform duration-500 ${isActive ? "rotate-180 text-secondary-soft" : "text-white/40"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                      <p className="text-white/75 text-base leading-relaxed pr-8">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-sm text-white/70 border-l-2 border-secondary-soft/60 pl-4">{support.note}</p>

            <Link href={support.link.href} className="inline-flex items-center gap-2 text-secondary-soft font-bold hover:underline">
              {support.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
