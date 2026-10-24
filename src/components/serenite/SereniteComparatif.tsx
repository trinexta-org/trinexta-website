import { Heading } from "@/components/ui/Typography"
import { Reveal } from "@/components/ui/Reveal"
import { SERENITE_COMPARATIF, SERENITE_SOCLE } from "@/data/serenite"

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="5 12.5 10 17.5 19 7" />
    </svg>
  )
}

function Valeur({ value }: { value: string }) {
  if (value === "inclus") {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-primary">
        <CheckIcon className="h-5 w-5 shrink-0 text-secondary-strong" />
        Inclus
      </span>
    )
  }
  if (value === "sur-devis") {
    return <span className="font-medium text-primary/70">Sur devis</span>
  }
  return <span className="font-semibold text-primary">{value}</span>
}

export function SereniteComparatif() {
  return (
    <Reveal>
      <div id="comparatif" className="space-y-6 scroll-mt-32">
        <Heading as="h3" emphasis={false} className="text-center text-primary">
          Essentiel ou Complète : le comparatif
        </Heading>

        <div className="rounded-2xl border border-secondary/20 bg-surface-strong p-5 md:p-6">
          <p className="text-sm font-bold text-primary mb-3">Socle commun aux deux formules</p>
          <ul className="flex flex-wrap gap-2">
            {SERENITE_SOCLE.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm font-medium text-primary">
                <CheckIcon className="h-4 w-4 shrink-0 text-secondary-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile : un bloc par critère, les deux formules côte à côte */}
        <ul className="sm:hidden divide-y divide-secondary/15 rounded-2xl border border-secondary/20 bg-surface-strong">
          {SERENITE_COMPARATIF.map((ligne) => (
            <li key={ligne.critere} className="p-4 space-y-3">
              <div>
                <p className="font-bold text-primary">{ligne.critere}</p>
                {ligne.detail && <p className="mt-1 text-sm text-primary/70 leading-relaxed">{ligne.detail}</p>}
              </div>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-background p-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-primary/70 mb-1">Essentiel</dt>
                  <dd><Valeur value={ligne.essentiel} /></dd>
                </div>
                <div className="rounded-xl bg-primary/5 p-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-primary mb-1">Complète</dt>
                  <dd><Valeur value={ligne.complete} /></dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Desktop : tableau, en-tête collé sous le header du site */}
        <div className="hidden sm:block overflow-clip rounded-2xl border border-secondary/20 bg-surface-strong shadow-xl">
          <table className="w-full text-left text-base">
            <caption className="sr-only">Différences entre Sérénité Essentiel et Sérénité Complète</caption>
            <thead>
              <tr className="text-sm font-bold uppercase tracking-wider">
                <th scope="col" className="sticky top-16 lg:top-[7.5rem] z-10 bg-surface-strong border-b border-secondary/20 p-5 text-primary/70">Prestations</th>
                <th scope="col" className="sticky top-16 lg:top-[7.5rem] z-10 bg-surface-strong border-b border-secondary/20 p-5 text-primary w-1/4">Essentiel</th>
                <th scope="col" className="sticky top-16 lg:top-[7.5rem] z-10 bg-primary border-b border-primary p-5 text-white w-1/4">Complète</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/15">
              {SERENITE_COMPARATIF.map((ligne) => (
                <tr key={ligne.critere}>
                  <th scope="row" className="px-5 py-4 align-top">
                    <span className="block font-bold text-primary">{ligne.critere}</span>
                    {ligne.detail && <span className="block mt-1 text-sm font-normal text-primary/70 leading-relaxed max-w-xl">{ligne.detail}</span>}
                  </th>
                  <td className="px-5 py-4 align-top"><Valeur value={ligne.essentiel} /></td>
                  <td className="bg-primary/5 px-5 py-4 align-top"><Valeur value={ligne.complete} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  )
}
