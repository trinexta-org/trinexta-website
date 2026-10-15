import { FadeIn } from "@/components/ui/FadeIn"
import { SERENITE_OPTIONS as options } from "@/data/serenite"


export function SereniteOptions() {
  return (
    <FadeIn
      direction="up"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <div className="md:row-span-2 bg-surface-strong rounded-[32px] p-8 md:p-12 border border-secondary/20 flex flex-col justify-between min-h-[300px] hover:bg-accent transition-colors">
        <div className="space-y-4">
          <h3 className="text-primary font-bold text-2xl md:text-3xl leading-snug">
            {options[0].title}
          </h3>
          <p className="text-primary/70 text-base md:text-lg leading-relaxed">
            {options[0].desc}
          </p>
        </div>
        <div className="text-xl md:text-2xl font-black text-secondary-strong mt-12">
          {options[0].price}
        </div>
      </div>

      <div className="bg-surface-strong rounded-[32px] p-8 border border-secondary/20 flex flex-col justify-between hover:bg-accent transition-colors">
        <div className="space-y-2">
          <h3 className="text-primary font-bold text-xl leading-snug">
            {options[1].title}
          </h3>
          <p className="text-primary/70 text-sm leading-relaxed">
            {options[1].desc}
          </p>
        </div>
        <div className="text-lg font-black text-secondary-strong mt-6">
          {options[1].price}
        </div>
      </div>

      <div className="bg-surface-strong rounded-[32px] p-8 border border-secondary/20 flex flex-col justify-between hover:bg-accent transition-colors">
        <div className="space-y-2">
          <h3 className="text-primary font-bold text-xl leading-snug">
            {options[2].title}
          </h3>
          <p className="text-primary/70 text-sm leading-relaxed">
            {options[2].desc}
          </p>
        </div>
        <div className="text-lg font-black text-secondary-strong mt-6">
          {options[2].price}
        </div>
      </div>
    </FadeIn>
  )
}