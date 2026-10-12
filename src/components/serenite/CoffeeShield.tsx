import { cn } from "@/lib/utils"

// Tasse dont la vapeur dessine un bouclier : visuel de l'offre Sérénité Essentielle.
// Pensé pour un fond sombre (bg-primary). Décoratif : le texte voisin porte le message.
export function CoffeeShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
    >
      {/* Halo derrière le bouclier */}
      <circle cx="120" cy="88" r="74" className="fill-secondary/15" />

      {/* Bouclier formé par la vapeur */}
      <g className="motion-safe:animate-[pulse_4s_ease-in-out_infinite]">
        <path
          d="M120 28 L168 44 V86 C168 116 148 134 120 146 C92 134 72 116 72 86 V44 Z"
          strokeWidth="5"
          strokeLinejoin="round"
          className="stroke-secondary-soft fill-white/5"
        />
        <path
          d="M100 88 L114 102 L142 72"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-white"
        />
      </g>

      {/* Vapeur qui monte de la tasse et s'ouvre sur les flancs du bouclier */}
      <g strokeWidth="4" strokeLinecap="round" className="stroke-secondary-soft/70">
        <path d="M108 182 C98 170 116 164 106 152 C100 145 95 139 91 132" />
        <path d="M132 182 C142 170 124 164 134 152 C140 145 145 139 149 132" />
        <path d="M120 180 C114 172 126 166 120 158" className="stroke-secondary-soft/40" />
      </g>

      {/* Tasse */}
      <path
        d="M66 190 H174 V204 C174 236 152 254 120 254 C88 254 66 236 66 204 Z"
        strokeWidth="5"
        strokeLinejoin="round"
        className="stroke-white fill-white/10"
      />
      <ellipse cx="120" cy="190" rx="54" ry="8" className="fill-secondary/40" />
      <path
        d="M174 202 C196 200 200 228 174 232"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-white"
      />

      {/* Soucoupe */}
      <path
        d="M44 262 C70 274 170 274 196 262"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-secondary-soft"
      />
    </svg>
  )
}
