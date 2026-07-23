import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"
import { FadeIn } from "@/components/ui/FadeIn"

function RibbonBackground() {
  return (
    <div 
      className="absolute inset-0 z-0 flex items-center justify-center opacity-70 pointer-events-none"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
      }}
    >
      <style>{`
        @keyframes flow-ribbon {
          from { stroke-dashoffset: 3000; }
          to { stroke-dashoffset: 0; }
        }
        .ribbon-line {
          stroke-dasharray: 3000;
          animation: flow-ribbon 20s linear infinite;
        }
      `}</style>

      <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--secondary)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.45" />
            <stop offset="90%" stopColor="var(--secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {Array.from({ length: 60 }).map((_, i) => (
          <path
            key={`ribbon-${i}`}
            d={`M-200,${80 + i * 6} C 400,${350 - i * 4} 700,${200 - i * 0.5} 1400,${150 + i * 3}`}
            fill="none"
            stroke="url(#grad-ribbon)"
            strokeWidth={0.5 + (i % 3) * 0.3}
            className="ribbon-line"
            style={{
              opacity: 0.3 + (i % 4) * 0.15,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${15 + (i % 5)}s`
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function TransitionTitle({ 
  surtitle, 
  line1, 
  line2 
}: { 
  surtitle?: string; 
  line1: string; 
  line2: string 
}) {
  return (
    <Section 
      container={false} 
      className="bg-background relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-32"
    >
      <RibbonBackground />

      <Container className="relative z-10 text-center px-4">
        {surtitle && (
          <FadeIn
            direction="up"
            className="text-secondary text-xs md:text-sm font-bold tracking-[0.2em] mb-4 md:mb-6 block"
          >
            {surtitle}
          </FadeIn>
        )}

        <FadeIn direction="up" delay={0.1}>
          <Heading as="h2" className="text-4xl md:text-6xl lg:text-7xl font-black text-primary tracking-normal leading-none">
            {line1} <br /> <span className="text-secondary">{line2}</span>
          </Heading>
        </FadeIn>

        <style>{`
          @keyframes bar-reveal {
            from { opacity: 0; transform: scaleX(0); }
            to { opacity: 1; transform: scaleX(1); }
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
              animation: bar-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
            }
          }
        `}</style>
        <div className="bar-reveal origin-center h-1.5 md:h-2 w-20 md:w-32 bg-secondary mx-auto mt-10 md:mt-14 rounded-full shadow-[0_0_20px_var(--secondary)]" />
      </Container>
    </Section>
  )
}