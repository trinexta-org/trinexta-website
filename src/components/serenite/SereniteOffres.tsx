import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Typography"
import { Reveal } from "@/components/ui/Reveal"
import { CoffeeShield } from "@/components/serenite/CoffeeShield"
import { SERENITE_OFFRES, SERENITE_OFFRES_NOTE } from "@/data/serenite"

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="5 12.5 10 17.5 19 7" />
    </svg>
  )
}

export function SereniteOffres() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {SERENITE_OFFRES.map((offre, idx) => {
          const dark = offre.highlighted
          return (
            <Reveal key={offre.id} delay={idx * 0.1}>
              <article
                id={offre.id === "essentiel" ? "essentiel" : undefined}
                className={`relative h-full scroll-mt-32 overflow-hidden rounded-[2rem] border p-6 md:p-10 flex flex-col gap-6 ${
                  dark ? "bg-primary border-primary shadow-2xl" : "bg-surface-strong border-secondary/25 shadow-xl"
                }`}
              >
                {offre.id === "essentiel" && (
                  <CoffeeShield className="pointer-events-none absolute -right-6 -top-4 w-28 md:w-36 opacity-90" />
                )}

                <div className="space-y-3 pr-20 md:pr-28">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest ${
                      dark ? "bg-white text-primary" : "bg-background text-primary"
                    }`}
                  >
                    {offre.id === "essentiel" ? "Protégez" : "Déléguez"}
                  </span>
                  <Heading as="h3" emphasis={false} className={`text-3xl md:text-4xl ${dark ? "text-white" : "text-primary"}`}>
                    {offre.nom}
                  </Heading>
                  <p className={`text-lg font-semibold ${dark ? "text-secondary-soft" : "text-primary"}`}>
                    {offre.accroche}
                  </p>
                </div>

                <div>
                  <span className={`text-5xl md:text-6xl font-black ${dark ? "text-white" : "text-primary"}`}>{offre.prix}</span>{" "}
                  <span className={`text-base ${dark ? "text-white/70" : "text-primary/70"}`}>{offre.unite}</span>
                  <p className={`mt-3 text-base leading-relaxed ${dark ? "text-white/80" : "text-primary/80"}`}>{offre.pitch}</p>
                </div>

                <ul className="space-y-2.5">
                  {offre.points.map((point) => (
                    <li key={point} className={`flex items-start gap-3 text-base ${dark ? "text-white" : "text-primary"}`}>
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-secondary-soft" : "text-secondary-strong"}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className={`flex flex-wrap gap-2 border-t pt-5 ${dark ? "border-white/15" : "border-secondary/20"}`}>
                  {offre.conditions.map((condition) => (
                    <li
                      key={condition}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        dark ? "bg-white/10 text-white/90" : "bg-secondary/10 text-primary/80"
                      }`}
                    >
                      {condition}
                    </li>
                  ))}
                </ul>

                <p className={`text-sm leading-relaxed ${dark ? "text-white/70" : "text-primary/70"}`}>
                  <strong className={dark ? "text-white" : "text-primary"}>Idéal pour : </strong>
                  {offre.pourQui}
                </p>

                <Button asChild variant={dark ? "secondary" : "primary"} size="lg" className={`mt-auto w-full ${dark ? "text-white" : ""}`}>
                  <Link href={offre.cta.href}>{offre.cta.label}</Link>
                </Button>
              </article>
            </Reveal>
          )
        })}
      </div>
      <p className="text-sm text-primary/70 text-center max-w-3xl mx-auto">{SERENITE_OFFRES_NOTE}</p>
    </div>
  )
}
