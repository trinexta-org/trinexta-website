
const comparisonPoints = [
  {
    criterion: "Relation & Contact Humain",
    market: "Des clients souvent renvoyés vers des chatbots IA, des serveurs vocaux ou des systèmes de tickets déshumanisés.",
    trinexta: "Zéro chatbot IA face à nos clients. Un interlocuteur humain dédié qui comprend votre métier, votre réalité et vos contraintes du quotidien.",
  },
  {
    criterion: "Modèle & Agilité",
    market: "Des structures classiques et figées, limitées à un seul type de prestation informatique (infogérance pure ou simple placement).",
    trinexta: "Modèle hybride inédit fusionnant services managés (Sérénité), support en régie (Technicien sous régie) et édition de solutions SaaS (Talentero).",
  },
  {
    criterion: "Flexibilité & Réactivité",
    market: "Des processus de recrutement lourds et des lenteurs administratives propres aux ESN traditionnelles face aux urgences.",
    trinexta: "Réseau qualifié de plus de 40 techniciens freelances sélectionnés rigoureusement pour garantir un renfort et une réactivité immédiate sur le terrain.",
  },
  {
    criterion: "Approche de Maintenance",
    market: "Des interventions souvent réactives qui attendent la panne pour agir, alimentant un climat anxiogène pour le dirigeant.",
    trinexta: "Maintenance proactive via notre approche globale « Fondations ». Une surveillance constante et une transparence absolue sur nos interventions.",
  },
]

export function SereniteDifferentiator() {
  return (
    <div className="w-full">
      <div className="border border-secondary/20 rounded-2xl overflow-hidden bg-surface-strong shadow-xl">
        <div className="hidden md:grid grid-cols-3 bg-secondary/10 border-b border-secondary/20 p-6 text-base font-bold tracking-wider uppercase text-primary/70">

          <div>Critère</div>
          <div>Une ESN classique</div>
          <div className="text-secondary-strong">L&apos;approche Trinexta</div>
        </div>

        <div className="divide-y divide-secondary/15">
          {comparisonPoints.map((point, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 md:gap-6 items-start hover:bg-secondary/5 transition-colors"
            >
              <div className="text-xl font-bold text-primary md:text-lg">
                {point.criterion}
              </div>

              <div className="space-y-1 md:space-y-0">
                <span className="inline-block md:hidden text-sm font-bold uppercase text-secondary-strong mr-2">Marché :</span>

                <span className="text-base text-primary/70 leading-relaxed">{point.market}</span>
              </div>

              <div className="space-y-1 md:space-y-0 bg-white/40 md:bg-transparent p-3 md:p-0 rounded-xl border border-secondary/15 md:border-none">
                <span className="inline-block md:hidden text-sm font-bold uppercase text-secondary-strong mr-2">Trinexta :</span>

                <span className="text-base font-medium text-primary/80 flex items-start gap-2 leading-relaxed">
                  <span className="text-secondary-strong shrink-0 hidden md:inline">→</span>                  {point.trinexta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}