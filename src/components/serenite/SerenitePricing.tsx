"use client"

export function SerenitePricing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 rounded-2xl bg-surface-strong border border-secondary/20 space-y-6">
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-bold text-primary">Mensuel</span>
          <span className="text-2xl font-black text-secondary-strong">79€ HT <span className="text-sm font-normal text-primary/70">/ poste / mois</span></span>
        </div>
        <ul className="text-base text-primary/70 space-y-3">
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span>Sans aucun engagement</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span>Résiliable à tout moment</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span>Mise en place rapide dès le démarrage</span>
          </li>
        </ul>
      </div>
      <div className="p-8 rounded-2xl bg-surface-strong border border-secondary/20 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-black uppercase px-4 py-1 rounded-bl-xl">Économique</div>
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-bold text-primary">Annuel</span>
          <span className="text-2xl font-black text-secondary-strong">869€ HT <span className="text-sm font-normal text-muted-foreground">/ poste / an</span></span>
        </div>
        <ul className="text-base text-primary/70 space-y-3">
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span>1 mois offert par poste</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span>Budget lisible sur l&apos;année</span>
          </li>
        </ul>
      </div>
    </div>
  )
}