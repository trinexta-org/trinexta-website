import { Heading } from "@/components/ui/Typography"
import { Reveal } from "@/components/ui/Reveal"
import { SERENITE_COMPARATIF } from "@/data/serenite"

function Valeur({ value }: { value: string }) {
  if (value === "inclus") {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary-strong">
          <polyline points="5 12.5 10 17.5 19 7" />
        </svg>
        <span className="sr-only sm:not-sr-only">Inclus</span>
      </span>
    )
  }
  if (value === "sur-devis") {
    return <span className="font-medium text-primary/60">Sur devis</span>
  }
  return <span className="font-semibold text-primary">{value}</span>
}

export function SereniteComparatif() {
  return (
    <Reveal>
      <div className="space-y-6">
        <Heading as="h3" className="text-center text-primary">
          Comparatif des *offres* Sérénité
        </Heading>
        <div className="overflow-x-auto rounded-2xl border border-secondary/20 bg-surface-strong shadow-xl">
          <table className="w-full min-w-[480px] text-left text-sm sm:text-base">
            <caption className="sr-only">Comparatif des offres Sérénité Essentiel et Sérénité Complète</caption>
            <thead>
              <tr className="border-b border-secondary/20 bg-secondary/10 text-xs font-bold uppercase sm:text-sm sm:tracking-wider">
                <th scope="col" className="p-4 text-primary/70 md:p-5">Prestations</th>
                <th scope="col" className="p-4 text-primary md:p-5">Essentiel</th>
                <th scope="col" className="bg-secondary/15 p-4 text-secondary-strong md:p-5">Complète</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/15">
              {SERENITE_COMPARATIF.map((ligne) => (
                <tr key={ligne.critere}>
                  <th scope="row" className="p-4 font-bold text-primary md:px-5 md:py-4">{ligne.critere}</th>
                  <td className="px-3 py-4 sm:p-4 md:px-5"><Valeur value={ligne.essentiel} /></td>
                  <td className="bg-secondary/5 px-3 py-4 sm:p-4 md:px-5"><Valeur value={ligne.complete} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  )
}
