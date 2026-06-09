import { ImpulsionIntro } from "./ImpulsionIntro"
import { ImpulsionConcret } from "./ImpulsionConcret"
import { ImpulsionSteps } from "./ImpulsionSteps"
import { ImpulsionPillars } from "./ImpulsionPillars"
import { ImpulsionProfiles } from "./ImpulsionProfiles"
import { ImpulsionPricing } from "./ImpulsionPricing"
import { ImpulsionAssurances } from "./ImpulsionAssurances"
import { TransitionTitle } from "@/components/TransitionTitle"

export function ImpulsionDetails() {
  return (
    <div className="space-y-24 pb-24">
      
      <div className="max-w-[1400px] mx-auto px-6 space-y-24">
        <ImpulsionIntro />
        <ImpulsionConcret />
        <ImpulsionSteps />
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Périmètre d'intervention"
          line1="Des experts du support"
          line2="à votre service"
        />
        <div className="max-w-[1400px] mx-auto px-6">
          <ImpulsionPillars />
        </div>
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Profils mobilisés"
          line1="Les experts que"
          line2="nous envoyons"
        />
        <div className="max-w-[1400px] mx-auto px-6">
          <ImpulsionProfiles />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <ImpulsionPricing />
      </div>

      <div className="space-y-12">
        <TransitionTitle
          surtitle="Nos engagements"
          line1="Simple, souple"
          line2="sans surprises"
        />
        <div className="max-w-[1400px] mx-auto px-6">
          <ImpulsionAssurances />
        </div>
      </div>

    </div>
  )
}