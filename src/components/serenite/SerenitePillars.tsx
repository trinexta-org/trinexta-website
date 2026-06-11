"use client"

import Image from "next/image"

const pillars = [
  {
    num: "PILIER 1",
    title: "Support & Assistance illimité",
    desc: "Quand un problème survient, vous avez besoin d'une réponse rapide, claire et efficace. Pas d'un parcours compliqué. Vous échangez avec une personne qui comprend votre situation et vous aide à la résoudre par téléphone, par e-mail ou à distance.",
    inclusions: [
      "Support par téléphone et par e-mail", 
      "Portail de ticketing", 
      "Assistance à distance", 
      "Gestion des échanges éditeurs"
    ],
    image: "/images/nos-offres/pilier-support.jpg" 
  },
  {
    num: "PILIER 2",
    title: "Maintenance & Supervision proactive",
    desc: "Une bonne maintenance ne consiste pas seulement à réparer après une panne, mais à l'éviter. Un agent de supervision sur chaque poste détecte les anomalies en amont, limite les interruptions et garde vos postes performants.",
    inclusions: [
      "Alertes automatiques", 
      "Mises à jour OS et logiciels", 
      "Optimisation des postes", 
      "Maintenance préventive"
    ],
    image: "/images/nos-offres/pilier_maintenance.jpg"
  },
  {
    num: "PILIER 3",
    title: "Cybersécurité EDR + IA",
    desc: "Les petites entreprises sont aussi exposées aux cybermenaces. Vos postes bénéficient d'une protection avancée capable de surveiller, détecter et bloquer les comportements suspects en temps réel selon les recommandations de l'ANSSI.",
    inclusions: [
      "Antivirus nouvelle génération", 
      "Anti-ransomware & Anti-phishing", 
      "Détection comportementale", 
      "Gestion des correctifs de sécurité"
    ],
    image: "/images/nos-offres/pilier-cyber.jpg"
  },
]

export function SerenitePillars() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {pillars.map((p, i) => (
        <article 
          key={i} 
          className="group flex flex-col h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-secondary/35 hover:shadow-xl hover:shadow-secondary/5"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/40 to-[#0B1221]" />

            <span className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-secondary/30">
              {p.num}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
            <h3 className="text-lg font-bold leading-snug text-white">
              {p.title}
            </h3>
            
            <p className="text-sm text-white/60 leading-relaxed">
              {p.desc}
            </p>

            <div className="flex flex-1 flex-col gap-4 mt-auto pt-4">
              <div className="flex items-center gap-2.5">
                <div className="h-px flex-1 bg-gradient-to-r from-secondary/40 to-transparent" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-secondary/80 whitespace-nowrap">
                  Ce qui est inclus
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-secondary/40 to-transparent" />
              </div>

              <ul className="space-y-2.5">
                {p.inclusions.map((inc, k) => (
                  <li key={k} className="flex items-start gap-3 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5 shadow-[0_0_8px_rgba(var(--color-secondary),0.5)]" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}