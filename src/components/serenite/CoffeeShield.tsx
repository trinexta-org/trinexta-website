import { useId } from "react"
import { cn } from "@/lib/utils"

// Tasse dont la vapeur dessine un bouclier : visuel de l'offre Sérénité Essentielle.
// Pensé pour un fond sombre (bg-primary). Décoratif : le texte voisin porte le message.
// Couleurs via les variables de la charte (globals.css), jamais en dur.
export function CoffeeShield({ className }: { className?: string }) {
  // Identifiants de dégradés uniques si le visuel apparaît plusieurs fois dans la page
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const id = (name: string) => `cs-${name}-${uid}`
  const url = (name: string) => `url(#${id(name)})`

  return (
    <svg viewBox="0 0 320 340" fill="none" aria-hidden="true" className={cn("cs h-auto w-full", className)}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cs .cs-wisp { animation: cs-wisp 5s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
          .cs .cs-wisp-2 { animation-delay: -2.5s; }
          .cs .cs-glow { animation: cs-glow 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        }
        @keyframes cs-wisp {
          0%, 100% { opacity: 0.35; transform: translateY(4px) scaleY(0.96); }
          50% { opacity: 0.9; transform: translateY(-4px) scaleY(1.04); }
        }
        @keyframes cs-glow {
          0%, 100% { opacity: 0.7; transform: scale(0.97); }
          50% { opacity: 1; transform: scale(1.03); }
        }
      `}</style>

      <defs>
        <radialGradient id={id("halo")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--secondary)", stopOpacity: 0.6 }} />
          <stop offset="55%" style={{ stopColor: "var(--secondary)", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "var(--secondary)", stopOpacity: 0 }} />
        </radialGradient>
        {/* Un seul dégradé de la tasse au sommet du bouclier : la vapeur devient contour */}
        <linearGradient id={id("steam")} gradientUnits="userSpaceOnUse" x1="0" y1="222" x2="0" y2="30">
          <stop offset="0%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0.15 }} />
          <stop offset="25%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: "var(--primary-foreground)", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id={id("wisp")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0 }} />
          <stop offset="40%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={id("shieldFill")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--secondary)", stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: "var(--secondary)", stopOpacity: 0 }} />
        </linearGradient>
        {/* Volume de la tasse : reflet à gauche, ombre propre à droite */}
        <linearGradient id={id("cup")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: "var(--primary-foreground)", stopOpacity: 0.95 }} />
          <stop offset="45%" style={{ stopColor: "var(--primary-foreground)", stopOpacity: 0.85 }} />
          <stop offset="100%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id={id("saucer")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--secondary-soft)", stopOpacity: 0.55 }} />
          <stop offset="100%" style={{ stopColor: "var(--secondary)", stopOpacity: 0.25 }} />
        </linearGradient>
      </defs>

      {/* Halo */}
      <circle className="cs-glow" cx="160" cy="112" r="112" fill={url("halo")} />

      {/* Bouclier */}
      <path
        d="M160 30 L218 50 V104 C218 142 194 166 160 182 C126 166 102 142 102 104 V50 Z"
        fill={url("shieldFill")}
        stroke={url("steam")}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M134 104 L153 123 L188 86"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-white"
      />

      {/* Filet de vapeur central qui rejoint la pointe du bouclier */}
      <path
        d="M160 218 C150 208 170 198 160 190 C156 186 160 184 160 182"
        stroke={url("steam")}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Filets latéraux qui ondulent */}
      <path
        className="cs-wisp"
        d="M128 216 C116 200 140 190 128 172 C122 162 128 152 124 144"
        stroke={url("wisp")}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className="cs-wisp cs-wisp-2"
        d="M192 216 C204 200 180 190 192 172 C198 162 192 152 196 144"
        stroke={url("wisp")}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Soucoupe */}
      <ellipse cx="160" cy="302" rx="118" ry="22" fill={url("saucer")} />
      <ellipse cx="160" cy="298" rx="118" ry="22" strokeWidth="2" className="stroke-secondary-soft/70" />
      <ellipse cx="160" cy="298" rx="62" ry="10" className="fill-primary/60" />

      {/* Anse */}
      <path
        d="M226 238 C262 232 266 278 218 282"
        strokeWidth="12"
        strokeLinecap="round"
        className="stroke-white/85"
      />

      {/* Corps de la tasse */}
      <path d="M86 226 C86 268 114 296 160 296 C206 296 234 268 234 226 Z" fill={url("cup")} />
      {/* Reflet vertical */}
      <path d="M104 240 C106 262 116 276 128 284" strokeWidth="5" strokeLinecap="round" className="stroke-white/70" />

      {/* Bord et café */}
      <ellipse cx="160" cy="226" rx="74" ry="15" className="fill-white" />
      <ellipse cx="160" cy="227" rx="64" ry="10" className="fill-primary" />
      <path d="M118 225 C134 219 152 218 168 219" strokeWidth="2.5" strokeLinecap="round" className="stroke-secondary/70" />
    </svg>
  )
}
