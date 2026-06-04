import { cn } from "@/lib/utils"

type AnimatedTechnicalBackgroundVariant = "hero" | "section" | "cta"

interface AnimatedTechnicalBackgroundProps {
  variant?: AnimatedTechnicalBackgroundVariant
  className?: string
}

function HeroPattern() {
  return (
    <svg
      className="technical-background__svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="technical-background__line technical-background__line--subtle" fill="none">
        <path d="M0 120H1200 M0 240H1200 M0 360H1200 M0 480H1200 M0 600H1200 M0 720H1200" />
        <path d="M120 0V800 M240 0V800 M360 0V800 M480 0V800 M600 0V800 M720 0V800 M840 0V800 M960 0V800 M1080 0V800" />
      </g>
      <g className="technical-background__line technical-background__line--accent" fill="none">
        <path d="M80 130H320V310H520V120H760V430H980" />
        <path d="M1120 690H880V520H680V700H450V390H240" />
        <path className="hidden md:block" d="M100 430C210 350 310 510 420 430S640 350 760 430 980 510 1100 430" />
      </g>
      <g className="technical-background__nodes" fill="var(--secondary)" fillOpacity="0.2">
        <circle cx="320" cy="130" r="3" />
        <circle cx="520" cy="310" r="3" />
        <circle cx="760" cy="120" r="2.5" />
        <circle cx="680" cy="520" r="3" />
        <circle cx="880" cy="690" r="3" />
      </g>
    </svg>
  )
}

function SectionPattern() {
  return (
    <svg
      className="technical-background__svg technical-background__svg--still"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="technical-background__line technical-background__line--subtle technical-background__line--slow" fill="none">
        <path d="M0 80H1440 M0 160H1440 M0 240H1440 M0 320H1440" />
      </g>
      <g className="technical-background__line technical-background__line--accent" fill="none">
        <path d="M180 80V120H350V80H520" />
        <path d="M1260 320V280H1090V320H920" />
        <path className="hidden md:block" d="M560 160H660 M780 240H920 M1020 160H1120" />
      </g>
      <g className="technical-background__nodes hidden md:block" fill="var(--secondary)" fillOpacity="0.2">
        <circle cx="350" cy="80" r="2.5" />
        <circle cx="1090" cy="320" r="2.5" />
        <circle cx="660" cy="160" r="2" />
        <circle cx="920" cy="240" r="2" />
      </g>
    </svg>
  )
}

function CtaPattern() {
  return (
    <svg
      className="technical-background__svg technical-background__svg--still"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="technical-background__line technical-background__line--subtle technical-background__line--slow" fill="none">
        <path d="M0 0L500 250M1000 0L500 250M0 500L500 250M1000 500L500 250" />
        <path d="M500 0V500M0 250H1000" />
      </g>
      <g className="technical-background__line technical-background__line--accent technical-background__line--fast" fill="none">
        <circle cx="500" cy="250" r="100" fill="none" />
        <circle cx="500" cy="250" r="150" fill="none" />
        <path className="hidden md:block" d="M250 125L350 175M750 125L650 175M250 375L350 325M750 375L650 325" />
      </g>
      <g className="technical-background__nodes" fill="var(--secondary)" fillOpacity="0.2">
        <circle cx="500" cy="250" r="4" />
      </g>
    </svg>
  )
}

export function AnimatedTechnicalBackground({
  variant = "section",
  className,
}: AnimatedTechnicalBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "technical-background",
        `technical-background--${variant}`,
        className
      )}
    >
      {variant === "hero" && <HeroPattern />}
      {variant === "section" && <SectionPattern />}
      {variant === "cta" && <CtaPattern />}
    </div>
  )
}
