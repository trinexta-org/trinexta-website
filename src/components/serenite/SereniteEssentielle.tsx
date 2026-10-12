import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Typography"
import { Reveal } from "@/components/ui/Reveal"
import { CoffeeShield } from "@/components/serenite/CoffeeShield"
import {
  COMPARATIF_ESSENTIELLE,
  SERENITE_ESSENTIELLE as offre,
  type ComparatifValeur,
} from "@/data/serenite-essentielle"

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="5 12.5 10 17.5 19 7" />
    </svg>
  )
}

function Valeur({ value }: { value: ComparatifValeur }) {
  if (value === "inclus") {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-primary">
        <CheckIcon className="h-5 w-5 shrink-0 text-secondary-strong" />
        <span className="sr-only sm:not-sr-only">Inclus</span>
      </span>
    )
  }
  if (value === "sur-devis") {
    return <span className="font-medium text-primary/70">Sur devis</span>
  }
  return <span className="font-semibold text-primary">{value}</span>
}

export function SereniteEssentielle() {
  return (
    <div className="space-y-12">
      {/* Encart d'accroche */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
          />
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:p-16">
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-secondary px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary">
                {offre.badge}
              </span>

              <div className="space-y-4">
                <Heading as="h2" className="text-white [&_em]:text-secondary-soft">
                  {offre.title}
                </Heading>
                <p className="text-xl text-white/85 md:text-2xl">{offre.subtitle}</p>
                <p className="text-sm text-white/70">{offre.priceNote}</p>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {offre.inclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary-soft" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild variant="secondary" size="lg">
                  <Link href={offre.ctaHref}>{offre.ctaLabel}</Link>
                </Button>
                <p className="text-sm text-white/70">
                  {offre.engagement}
                  <br />
                  {offre.horsForfait}
                </p>
              </div>
            </div>

            <div className="order-first mx-auto w-full max-w-[160px] sm:max-w-[240px] lg:order-none lg:max-w-[340px]">
              <CoffeeShield />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Comparatif Essentielle / Sérénité */}
      <Reveal delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-secondary/20 bg-surface-strong shadow-xl">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Comparatif des offres Sérénité Essentielle et Sérénité</caption>
            <thead>
              <tr className="border-b border-secondary/20 bg-secondary/10 text-xs font-bold uppercase sm:text-sm sm:tracking-wider">
                <th scope="col" className="p-4 text-primary/70 md:p-6">
                  <span className="hidden sm:inline">Prestation</span>
                </th>
                <th scope="col" className="bg-secondary/15 p-4 text-secondary-strong md:p-6">Essentielle</th>
                <th scope="col" className="p-4 text-primary/70 md:p-6">Sérénité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/15">
              {COMPARATIF_ESSENTIELLE.map((ligne) => (
                <tr key={ligne.critere}>
                  <th scope="row" className="hyphens-auto p-4 font-bold text-primary md:p-6">{ligne.critere}</th>
                  <td className="bg-secondary/5 px-3 py-4 sm:p-4 md:p-6"><Valeur value={ligne.essentielle} /></td>
                  <td className="px-3 py-4 sm:p-4 md:p-6"><Valeur value={ligne.serenite} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  )
}
