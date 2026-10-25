"use client"

import { useEffect, useRef, useState } from "react"
import { REGIE_PILIERS } from "@/data/technicien-sous-regie"

const pillars = REGIE_PILIERS


export function TechnicienPillars() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative pt-12 pb-0 overflow-hidden bg-surface">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pb-12">
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className={`
              group relative flex flex-col p-8 rounded-3xl border border-border bg-surface-strong
              hover:border-secondary/40 transition-all duration-500 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${i === 2 ? "md:col-span-2" : ""} 
            `}
            style={{ transitionDelay: `${100 + i * 150}ms` }}
          >
            <div className="mb-6">
              <h3 className="font-bold text-3xl text-foreground mb-2 group-hover:text-secondary-strong transition-colors">
                {pillar.title}
              </h3>
              <span className="text-secondary-strong text-base font-medium uppercase tracking-wider">
                {pillar.subtitle}
              </span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-grow">
              {pillar.desc}
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {pillar.detail}
              </p>
            </div>

            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-secondary/5 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}