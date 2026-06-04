"use client";

import { motion, TargetAndTransition } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { HaloBackground } from "@/components/ui/HaloBackground";
import { SectionFade } from "@/components/ui/SectionFade";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { pushGtmEvent } from "@/lib/gtm";

function EnhancedRibbonBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70 pointer-events-none overflow-hidden w-full">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] w-full h-full">
        <svg
          className="w-[120%] h-full -ml-[10%]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="grad-fiber-primary"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop
                offset="50%"
                stopColor="var(--secondary)"
                stopOpacity="0.6"
              />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="grad-fiber-white"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop
                offset="50%"
                stopColor="var(--primary-foreground)"
                stopOpacity="0.4"
              />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {Array.from({ length: 40 }).map((_, i) => (
            <motion.path
              key={`bg-fiber-${i}`}
              d={`M-100,${50 + i * 18} Q 600,${400 + (i - 20) * 12} 1300,${150 + i * 14}`}
              fill="none"
              stroke="url(#grad-fiber-primary)"
              strokeWidth="0.2"
              initial={{ strokeDashoffset: 3000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 35 + (i % 8),
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ strokeDasharray: 3000, opacity: 0.15 }}
            />
          ))}

          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={`energy-fiber-${i}`}
              d={`M-100,${100 + i * 45} C 300,${50 + i * 25} 900,${750 - i * 25} 1300,${350 + i * 15}`}
              fill="none"
              stroke="url(#grad-fiber-white)"
              strokeWidth="0.6"
              initial={{ strokeDashoffset: 3000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 18 + (i % 4),
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ strokeDasharray: 3000, opacity: 0.3 }}
            />
          ))}

          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={`master-fiber-${i}`}
              d={`M-100,${200 + i * 70} C 400,${900} 800,${-100} 1300,${600 - i * 50}`}
              fill="none"
              stroke="url(#grad-fiber-primary)"
              strokeWidth="1.2"
              initial={{ strokeDashoffset: 3000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 25 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ strokeDasharray: 3000, opacity: 0.4 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

interface FinalCTAProps {
  line1?: string;
  line2?: string;
  line3?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function FinalCTA({
  line1 = "Prêt à ne plus",
  line2 = "subir votre",
  line3 = "informatique ?",
  description = "Reprenez le contrôle avec un partenaire qui transforme vos défis en opportunités stratégiques.",
  ctaLabel = "Prendre RDV gratuit",
  ctaHref = "/contact",
}: FinalCTAProps) {
  const sec = "var(--secondary)";
  const white = "var(--primary-foreground)";

  const part1Animation: TargetAndTransition = {
    color: [sec, sec, sec, white],
    transition: {
      duration: 8,
      times: [0, 0.5, 0.75, 1],
      repeat: Infinity,
      ease: "linear",
    },
  };

  const part2Animation: TargetAndTransition = {
    color: [white, sec, sec, white],
    transition: {
      duration: 8,
      times: [0, 0.25, 0.75, 1],
      repeat: Infinity,
      ease: "linear",
    },
  };

  const part3Animation: TargetAndTransition = {
    color: [white, white, sec, white],
    transition: {
      duration: 8,
      times: [0, 0.5, 0.75, 1],
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <Section
      container={false}
      className="relative bg-primary overflow-hidden py-24 md:py-48"
    >
      <HaloBackground intensity="low" />

      <EnhancedRibbonBackground />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[900px] h-full md:h-[900px] bg-secondary/5 blur-[160px] rounded-full pointer-events-none z-0" />

      <SectionFade edge="both" />

      <Container className="relative z-10 text-center">
        <div className="space-y-8 md:space-y-16">
          <Heading
            as="h2"
            className="text-3xl sm:text-5xl md:text-8xl text-white tracking-normal leading-[0.9] lowercase flex flex-col items-center"
          >
            <motion.span animate={part1Animation}>{line1}</motion.span>
            <motion.span animate={part2Animation}>{line2}</motion.span>
            <motion.span animate={part3Animation}>{line3}</motion.span>
          </Heading>

          <Text className="text-white/70 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {description}
          </Text>

          <div className="pt-4 md:pt-6">
            <Link
              href={ctaHref}
              onClick={() => {
                pushGtmEvent("cta_click", {
                  cta_name: ctaLabel,
                  cta_url: ctaHref,
                });
              }}
              className="group relative inline-flex items-center gap-4 md:gap-6 bg-transparent border border-white/20 px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:border-secondary"
            >
              <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

              <span className="relative z-10 text-white group-hover:text-primary font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] transition-colors duration-500">
                {ctaLabel}
              </span>

              <div className="relative z-10 text-secondary group-hover:text-primary transition-colors duration-500">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
