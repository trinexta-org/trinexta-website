"use client"

interface WaveSectionTransitionProps {
  flip?: boolean
  variant?: "dark" | "light"
  className?: string
}

export function WaveSectionTransition({
  flip = false,
  variant = "dark",
  className = "",
}: WaveSectionTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className={`wave-transition wave-transition--${variant} ${
        flip ? "wave-transition--flip" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 340"
        preserveAspectRatio="xMidYMid slice"
        className="wave-transition__svg"
      >
        <defs>
          <linearGradient id={`waveGradientA-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {variant === "dark" ? (
              <>
                <stop offset="0%" stopColor="var(--primary-elevated)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="var(--surface-strong)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`waveGradientB-${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
            {variant === "dark" ? (
              <>
                <stop offset="0%" stopColor="var(--secondary-strong)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--surface)" />
              </>
            )}
          </linearGradient>
        </defs>

        <path fill={`url(#waveGradientA-${variant})`} opacity="0.9">
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="M0,150 C200,80 350,220 600,150 C850,80 1000,220 1200,150 L1200,340 L0,340 Z;
                    M0,170 C220,240 380,100 600,170 C820,240 980,100 1200,170 L1200,340 L0,340 Z;
                    M0,150 C200,80 350,220 600,150 C850,80 1000,220 1200,150 L1200,340 L0,340 Z"
          />
        </path>
        <path fill={`url(#waveGradientB-${variant})`} opacity="0.55">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="M0,220 C250,160 400,280 650,220 C900,160 1050,280 1200,220 L1200,340 L0,340 Z;
                    M0,200 C270,270 420,150 650,200 C880,270 1030,150 1200,200 L1200,340 L0,340 Z;
                    M0,220 C250,160 400,280 650,220 C900,160 1050,280 1200,220 L1200,340 L0,340 Z"
          />
        </path>

        <circle cx="180" cy="90" r="3" className="wave-transition__dot">
          <animate attributeName="cy" values="90;70;90" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="60" r="2.5" className="wave-transition__dot">
          <animate attributeName="cy" values="60;85;60" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="80" r="3" className="wave-transition__dot">
          <animate attributeName="cy" values="80;55;80" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="1050" cy="120" r="2" className="wave-transition__dot">
          <animate attributeName="cy" values="120;100;120" dur="6.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}