"use client"

import { motion } from "framer-motion"

const comparisonPoints = [
  {
    criterion: "Relation & Contact Humain",
    market: "Des clients souvent renvoyés vers des chatbots IA, des serveurs vocaux ou des systèmes de tickets déshumanisés.",
    trinexta: "Zéro chatbot IA face à nos clients. Un interlocuteur humain dédié qui comprend votre métier, votre réalité et vos contraintes du quotidien.",
  },
  {
    criterion: "Modèle & Agilité",
    market: "Des structures classiques et figées, limitées à un seul type de prestation informatique (infogérance pure ou simple placement).",
    trinexta: "Modèle hybride inédit fusionnant services managés (Sérénité), support en régie (Impulsion) et édition de solutions SaaS (Talentero).",
  },
  {
    criterion: "Flexibilité & Réactivité",
    market: "Des processus de recrutement lourds et des lenteurs administratives propres aux ESN traditionnelles face aux urgences.",
    trinexta: "Réseau qualifié de plus de 40 techniciens freelances sélectionnés rigoureusement pour garantir un renfort et une réactivité immédiate sur le terrain.",
  },
  {
    criterion: "Approche de Maintenance",
    market: "Des interventions souvent réactives qui attendent la panne pour agir, alimentant un climat anxiogène pour le dirigeant.",
    trinexta: "Maintenance proactive via notre approche globale « Fondations ». Une surveillance constante et une transparence absolue sur nos interventions.",
  },
]

export function DifferentiatorSection() {
  return (
    <div className="w-full">
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-sm shadow-2xl">
        <div className="hidden md:grid grid-cols-3 bg-white/[0.03] border-b border-white/10 p-6 text-sm font-bold tracking-wider uppercase text-white/50">
          <div>Critère</div>
          <div>Une ESN classique</div>
          <div className="text-secondary">L&apos;approche Trinexta</div>
        </div>

        <div className="divide-y divide-white/10">
          {comparisonPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 md:gap-6 items-start hover:bg-white/[0.01] transition-colors"
            >
              <div className="text-lg font-bold text-white md:text-base">
                {point.criterion}
              </div>

              <div className="space-y-1 md:space-y-0">
                <span className="inline-block md:hidden text-xs font-bold uppercase text-secondary/80 mr-2">Marché :</span>
                <span className="text-sm text-white/50 leading-relaxed">{point.market}</span>
              </div>

              <div className="space-y-1 md:space-y-0 bg-secondary/5 md:bg-transparent p-3 md:p-0 rounded-xl border border-secondary/10 md:border-none">
                <span className="inline-block md:hidden text-xs font-bold uppercase text-secondary mr-2">Trinexta :</span>
                <span className="text-sm font-medium text-white flex items-start gap-2 leading-relaxed">
                  <span className="text-secondary shrink-0 hidden md:inline">→</span>
                  {point.trinexta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}