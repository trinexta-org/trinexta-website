"use client"

import { motion } from "framer-motion"

const assurances = [
  {
    title: "Pas de frais cachés, pas de lourdeur inutile",
    desc: "Aucun frais de mise en place. Aucun montage compliqué. La collaboration démarre simplement et s'adapte à votre besoin réel.",
  },
  {
    title: "Un budget défini avec vous",
    desc: "Vous nous indiquez votre budget cible ou votre TJM souhaité. Nous recherchons ensuite le profil le plus cohérent avec vos attentes, vos enjeux et votre cadre financier.",
  },
  {
    title: "Une facturation lisible et logique",
    desc: "Vous payez uniquement le temps réellement mobilisé. Autrement dit : uniquement les jours où le technicien intervient pour votre entreprise.",
  },
  {
    title: "Une réponse rapide et concrète",
    desc: "Basés en Île-de-France, nous sommes en mesure de réagir rapidement. Vous nous exposez votre besoin, nous vous présentons des profils qualifiés dans les meilleurs délais.",
  },
]

export function TechnicienAssurances() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <div className="md:row-span-2 bg-white/[0.03] rounded-[32px] p-8 md:p-12 border border-white/5 flex flex-col justify-center">
        <h4 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-snug">
          {assurances[0].title}
        </h4>
        <p className="text-white/60 text-[15px] leading-relaxed">
          {assurances[0].desc}
        </p>
      </div>

      <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5 flex flex-col justify-center">
        <h4 className="text-white font-bold text-xl mb-3 leading-snug">
          {assurances[1].title}
        </h4>
        <p className="text-white/60 text-[14px] leading-relaxed">
          {assurances[1].desc}
        </p>
      </div>

      <div className="bg-white/[0.03] rounded-[32px] p-8 border border-white/5 flex flex-col justify-center">
        <h4 className="text-white font-bold text-xl mb-3 leading-snug">
          {assurances[2].title}
        </h4>
        <p className="text-white/60 text-[14px] leading-relaxed">
          {assurances[2].desc}
        </p>
      </div>

      <div className="md:col-span-2 bg-white/[0.03] rounded-[32px] p-8 md:p-12 border border-white/5">
        <h4 className="text-white font-bold text-2xl mb-4 leading-snug">
          {assurances[3].title}
        </h4>
        <p className="text-white/60 text-[15px] leading-relaxed md:max-w-3xl">
          {assurances[3].desc}
        </p>
      </div>
    </motion.div>
  )
}