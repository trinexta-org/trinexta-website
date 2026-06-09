"use client"

import { useEffect, useRef, useState } from "react"
import { TrinextaGear } from "@/components/ui/TrinextaGear"

const pillars = [
  {
    title: "Support utilisateur",
    subtitle: "Helpdesk (N1/N2)",
    desc: "Prise en charge des demandes et incidents du quotidien rencontrés par vos collaborateurs : problèmes logiciels, difficultés de connexion, comptes utilisateurs, mots de passe, matériel ou lenteurs de poste.",
    detail: "L'objectif : apporter des réponses rapides, claires et efficaces pour éviter que l'activité ne ralentisse.",
  },
  {
    title: "Gestion de parc",
    subtitle: "De proximité",
    desc: "Préparation, installation, renouvellement et maintenance des postes de travail, ordinateurs portables, imprimantes et périphériques.",
    detail: "Un accompagnement concret pour garder un parc informatique propre, fonctionnel et bien suivi.",
  },
  {
    title: "Accompagnement de projets",
    subtitle: "Support & Déploiement",
    desc: "Renfort opérationnel pour vos projets de migration, de déploiement ou d'organisation du support : passage à Windows 11, migration Microsoft 365, installation de nouveaux équipements ou amélioration de votre outil de ticketing.",
    detail: "Vous bénéficiez d'un appui fiable pour avancer plus vite et plus sereinement.",
  },
]

export function ImpulsionPillars() {
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
    <div ref={ref} className="relative py-24 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <div className="animate-[spin_30s_linear_infinite]">
          <TrinextaGear size={800} />
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className={`
              group flex flex-col p-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] 
              hover:bg-white/[0.04] hover:border-secondary/30 transition-all duration-500 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              ${i === 2 ? "md:col-span-2" : ""} 
            `}
            style={{ transitionDelay: `${100 + i * 150}ms` }}
          >
            <div className="mb-6">
              <h4 className="font-bold text-2xl text-white mb-2 group-hover:text-secondary transition-colors">
                {pillar.title}
              </h4>
              <span className="text-secondary/80 text-sm font-medium uppercase tracking-wider">
                {pillar.subtitle}
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
              {pillar.desc}
            </p>

            <div className="pt-6 border-t border-white/[0.05]">
              <p className="text-white/40 text-xs leading-relaxed italic">
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