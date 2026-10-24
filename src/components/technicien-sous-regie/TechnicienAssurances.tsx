import { FadeIn } from "@/components/ui/FadeIn"
import { REGIE_ALTERNATIVES } from "@/data/technicien-sous-regie"

const assurances = REGIE_ALTERNATIVES.items


export function TechnicienAssurances() {
  return (
    <FadeIn
      direction="up"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <div className="md:row-span-2 bg-surface-strong rounded-[32px] p-8 md:p-12 border border-border flex flex-col justify-center">
        <h3 className="text-foreground font-bold text-3xl md:text-4xl mb-5 leading-snug">
          {assurances[0].title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {assurances[0].desc}
        </p>
      </div>

      <div className="bg-surface-strong rounded-[32px] p-8 border border-border flex flex-col justify-center">
        <h3 className="text-foreground font-bold text-2xl mb-4 leading-snug">
          {assurances[1].title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          {assurances[1].desc}
        </p>
      </div>

      <div className="bg-surface-strong rounded-[32px] p-8 border border-border flex flex-col justify-center">
        <h3 className="text-foreground font-bold text-2xl mb-4 leading-snug">
          {assurances[2].title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          {assurances[2].desc}
        </p>
      </div>

      <div className="md:col-span-2 bg-surface-strong rounded-[32px] p-8 md:p-12 border border-border">
        <h3 className="text-foreground font-bold text-3xl mb-5 leading-snug">
          {assurances[3].title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed md:max-w-3xl">
          {assurances[3].desc}
        </p>
      </div>
    </FadeIn>
  )
}