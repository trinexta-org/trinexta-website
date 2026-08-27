import { FadeIn } from "@/components/ui/FadeIn"

const comparisonPoints = [
  {
    criterion: "Développement 100% Interne",
    market: "Sous-traitance opaque ou offshore fréquente.",
    trinexta: "Aucune sous-traitance. Vos outils, plateformes et sites internet sont intégralement pensés, designés et codés par nos équipes de développeurs en interne.",
  },
  {
    criterion: "Hébergement Souverain",
    market: "Serveurs étrangers ou non conformes.",
    trinexta: "Pour garantir sécurité et conformité RGPD totale, l'ensemble de nos réalisations est hébergé exclusivement sur nos serveurs sécurisés situés en France.",
  },
  {
    criterion: "Cohérence IT & Web",
    market: "Multiples interlocuteurs qui se renvoient la balle.",
    trinexta: "Votre site et votre infrastructure informatique sont gérés sous le même toit. Une synergie parfaite pour éviter les conflits techniques entre prestataires.",
  },
  {
    criterion: "Suivi & Maintenance",
    market: "Projets livrés sans engagement sur le long terme.",
    trinexta: "Nous ne livrons pas des projets pour ensuite disparaître. Nous assurons le suivi, les mises à jour de sécurité et l\u2019évolution technique continue pour garantir vos performances.",
  },
]

export function StudioDifferentiator() {
  return (
    <div className="w-full">
      <div className="border border-secondary/20 rounded-2xl overflow-hidden bg-[#dce7f2] shadow-xl">
        {/* Header Desktop */}
        <div className="hidden md:grid grid-cols-3 bg-secondary/10 border-b border-secondary/20 p-6 text-base font-bold tracking-wider uppercase text-primary/70">          <div>Critère</div>
          <div>Les agences web classiques</div>
          <div className="text-secondary-strong">L&apos;approche Trinexta</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-secondary/15">
          {comparisonPoints.map((point, index) => (
            <FadeIn
              key={index}
              direction="up"
              delay={index * 0.1}
              className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 md:gap-6 items-start hover:bg-secondary/5 transition-colors"
            >
              <div className="text-xl font-bold text-primary md:text-lg">
                {point.criterion}
              </div>

              <div className="space-y-1 md:space-y-0">
                <span className="inline-block md:hidden text-xs font-bold uppercase text-secondary-strong mr-2">Marché :</span>                 <span className="text-base text-primary/70 leading-relaxed">{point.market}</span>
              </div>

              <div className="space-y-1 md:space-y-0 bg-white/40 md:bg-transparent p-3 md:p-0 rounded-xl border border-secondary/15 md:border-none">
                <span className="inline-block md:hidden text-xs font-bold uppercase text-secondary-strong mr-2">Trinexta :</span>
                <span className="text-base font-medium text-primary/80 flex items-start gap-2 leading-relaxed">
                   <span className="text-secondary-strong shrink-0 hidden md:inline">→</span>                  {point.trinexta}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}