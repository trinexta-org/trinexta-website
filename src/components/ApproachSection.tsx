import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { FadeIn } from "@/components/ui/FadeIn"

const steps = [
  {
    num: "01",
    title: "Audit",
    description: "Analyse approfondie de votre infrastructure actuelle pour identifier les failles de sécurité et les opportunités d'optimisation matérielle ou logicielle.",
  },
  {
    num: "02",
    title: "Conception",
    description: "Élaboration d'une architecture informatique sur mesure, parfaitement alignée avec vos objectifs stratégiques, vos contraintes métiers et votre budget.",
  },
  {
    num: "03",
    title: "Déploiement",
    description: "Intégration fluide et sécurisée de vos nouvelles solutions, planifiée avec précision pour garantir zéro interruption de votre activité quotidienne.",
  },
  {
    num: "04",
    title: "Suivi continu",
    description: "Supervision proactive 24/7, maintenance préventive et support technique ultra-réactif pour vous assurer une sérénité numérique totale.",
  },
]

export function ApproachSection() {
  return (
    <Section container={false} dark className="py-20 md:py-40">
      <div>
        <Container>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-1/3">
              <FadeIn
                direction="right"
                className="text-secondary text-xs md:text-sm font-bold tracking-widest mb-4 block"
              >
                Notre Méthodologie
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <Heading as="h2" className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-normal leading-tight">
                  Une approche <br /> en <span className="text-secondary">4 étapes</span>
                </Heading>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <Text className="mt-6 text-white/70 text-base md:text-lg max-w-md leading-relaxed">
                  Nous ne nous contentons pas de résoudre des problèmes informatiques. Nous construisons une base solide pour votre croissance.
                </Text>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-7 relative mt-12 lg:mt-0 pl-8 lg:pl-20">

            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 rounded-full" />

            <div className="scroll-progress-line absolute left-0 top-0 w-1 bg-secondary rounded-full shadow-[0_0_15px_var(--secondary)]" />

            <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-32">
              {steps.map((step) => (
                <FadeIn
                  key={step.num}
                  direction="up"
                  className="relative group"
                >
                  <div className="absolute -left-[37.5px] lg:-left-[85px] top-3 md:top-4 w-4 h-4 rounded-full bg-primary border-4 border-secondary group-hover:scale-150 group-hover:bg-secondary transition-all duration-300 z-10 shadow-[0_0_10px_var(--secondary)]" />

                  <div className="absolute -top-10 md:-top-16 -left-4 md:-left-8 text-[80px] md:text-[150px] font-black text-white/[0.03] select-none pointer-events-none leading-none tracking-normal transition-colors duration-500 group-hover:text-white/[0.06]">
                    {step.num}
                  </div>

                  <div className="relative z-10 pt-2">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <span className="text-lg md:text-xl font-bold text-secondary font-mono">
                        {step.num}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white tracking-normal group-hover:text-secondary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm md:text-xl leading-relaxed max-w-2xl font-light">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>
        </Container>
      </div>
    </Section>
  )
}