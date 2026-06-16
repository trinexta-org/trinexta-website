"use client"

export function SerenitePricing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
        <div className="flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Mensuel</span>
          <span className="text-xl font-black text-secondary">79€ HT <span className="text-xs font-normal text-white/50">/ poste / mois</span></span>
        </div>
        <ul className="text-sm text-white/70 space-y-3">
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
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl">Économique</div>
        <div className="flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Annuel</span>
          <span className="text-xl font-black text-secondary">869€ HT <span className="text-xs font-normal text-white/50">/ poste / an</span></span>
        </div>
        <ul className="text-sm text-white/70 space-y-3">
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