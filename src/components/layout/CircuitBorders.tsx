"use client"

export function CircuitBorders() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 hidden 2xl:flex justify-between overflow-hidden">
      <div className="w-40 h-full text-secondary opacity-50 mix-blend-screen">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100%" height="400" patternUnits="userSpaceOnUse">
              <path d="M 30 0 V 90 M 30 110 V 150 L 75 195 V 220 L 30 265 V 400" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="30" cy="100" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M 45 40 H 115 V 55 H 90 V 170 L 70 150 V 55 H 45 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="w-40 h-full text-secondary opacity-50 mix-blend-screen scale-x-[-1]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
    </div>
  )
}