"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"

function RibbonBackground() {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none mix-blend-screen"
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
            <stop offset="30%" stopColor="var(--secondary)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.8" />
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

export function TransitionTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <Section container={false} className="relative py-20 md:py-40 overflow-hidden flex flex-col items-center justify-center z-20 bg-primary">
      <RibbonBackground />

      <Container className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading as="h2" className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
            {line1} <br className="hidden sm:block" /> <span className="text-secondary">{line2}</span>
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="origin-center"
        >
          <div className="h-1.5 md:h-2 w-20 md:w-32 bg-secondary mx-auto mt-6 md:mt-8 rounded-full shadow-[0_0_20px_var(--secondary)]" />
        </motion.div>
      </Container>
    </Section>
  )
}