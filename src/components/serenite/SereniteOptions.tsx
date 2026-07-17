import { FadeIn } from "@/components/ui/FadeIn"

const options = [
  {
    title: "Sauvegarde cloud avancée",
    price: "+10€ HT / poste / mois",
    desc: "Protection renforcée pour vos données sensibles et vos fichiers essentiels.",
  },
  {
    title: "Pilotage stratégique",
    price: "Sur devis",
    desc: "Un point régulier pour faire évoluer votre informatique avec votre activité.",
  },
  {
    title: "Gestion serveur / NAS / réseau",
    price: "Sur devis",
    desc: "Une prise en charge adaptée aux infrastructures plus complètes ou plus spécifiques.",
  },
]

export function SereniteOptions() {
  return (
    <FadeIn
      direction="up"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <div className="md:row-span-2 bg-white/[0.03] rounded-[32px] p-8 md:p-12 border border-white/5 flex flex-col justify-between min-h-[300px] hover:bg-white/[0.04] transition-colors">
        <div className="space-y-4">
          <h4 className="text-white font-bold text-2xl md:text-3xl leading-snug">
            {options[0].title}
          </h4>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            {options[0].desc}
          </p>
        </div>
        <div className="text-xl md:text-2xl font-black text-secondary mt-12">
          {options[0].price}
        </div>
      </div>

      <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5 flex flex-col justify-between hover:bg-white/[0.04] transition-colors">
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xl leading-snug">
            {options[1].title}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed">
            {options[1].desc}
          </p>
        </div>
        <div className="text-lg font-black text-secondary mt-6">
          {options[1].price}
        </div>
      </div>

      <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5 flex flex-col justify-between hover:bg-white/[0.04] transition-colors">
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xl leading-snug">
            {options[2].title}
          </h4>
          <p className="text-white/60 text-sm leading-relaxed">
            {options[2].desc}
          </p>
        </div>
        <div className="text-lg font-black text-secondary mt-6">
          {options[2].price}
        </div>
      </div>
    </FadeIn>
  )
}