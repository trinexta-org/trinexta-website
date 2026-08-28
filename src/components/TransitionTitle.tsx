import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"
import { FadeIn } from "@/components/ui/FadeIn"
import { SectionBackground } from "@/components/ui/SectionBackground"

export function TransitionTitle({
  surtitle,
  line1,
  line2,
  background = "bg-surface",
  tone = "light",
}: {
  surtitle?: string
  line1: string
  line2: string
  background?: string
  tone?: "light" | "dark"
}) {
  const isDark = tone === "dark"

  return (
    <Section
      container={false}
      className={`
        relative overflow-hidden
        flex flex-col items-center justify-center
        py-12 md:py-20
        ${isDark ? "!bg-primary" : background}
      `}
    >
      {/* Le background décoratif reste uniquement sur les TransitionTitle clairs */}
      {!isDark && (
        <SectionBackground tone="light" intensity="low" />
      )}

      <Container className="relative z-10 text-center px-4">
        {surtitle && (
          <FadeIn
            direction="up"
            className={`
              text-secondary-strong
              text-sm md:text-base
              font-bold tracking-[0.2em]
              mb-4 md:mb-6
              block
            `}
          >
            {surtitle}
          </FadeIn>
        )}

        <FadeIn direction="up" delay={0.1}>
          <Heading
            as="h2"
            className={`
              text-4xl md:text-6xl lg:text-7xl
              font-black
              tracking-normal
              leading-none
              ${isDark ? "!text-white" : "text-primary"}
            `}
          >
            {line1}
            <br />
            <span className="text-secondary-strong">
              {line2}
            </span>
          </Heading>
        </FadeIn>

        <style>{`
          @keyframes bar-reveal {
            from {
              opacity: 0;
              transform: scaleX(0);
            } 

            to {
              opacity: 1;
              transform: scaleX(1);
            }
          }

          @supports (animation-timeline: view()) {
            .bar-reveal {
              animation: bar-reveal linear both;
              animation-timeline: view();
              animation-range: entry 5% cover 25%;
            }
          }

          @supports not (animation-timeline: view()) {
            .bar-reveal {
              animation: bar-reveal 0.8s
                cubic-bezier(0.16, 1, 0.3, 1)
                0.3s forwards;
            }
          }
        `}</style>

        <div
          className="
            bar-reveal
            origin-center
            h-1.5 md:h-2
            w-20 md:w-32
            bg-secondary
            mx-auto
            mt-10 md:mt-14
            rounded-full
            shadow-[0_0_20px_rgba(92,146,184,0.5)]
          "
        />
      </Container>
    </Section>
  )
}