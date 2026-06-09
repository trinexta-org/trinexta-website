"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const targets = [
    {
        role: "Indépendants & TPE",
        spec: "Dès 1 poste",
        image: "/images/nos-offres/targets/target-tpe.jpg"
    },
    {
        role: "Cabinets professionnels",
        spec: "Comptables, avocats, consultants...",
        image: "/images/nos-offres/targets/target-cabinets.jpg"
    },
    {
        role: "Commerces & Boutiques",
        spec: "Outils métier (caisse, stock, planning)",
        image: "/images/nos-offres/targets/target-commerces.jpg"
    },
    {
        role: "PME en développement",
        spec: "Anticipation des pannes et sécurité",
        image: "/images/nos-offres/targets/target-croissance.jpg"
    },
    {
        role: "Dirigeants pragmatiques",
        spec: "Accompagnement simple, sans jargon",
        image: "/images/nos-offres/targets/target-dirigeants.jpg"
    },
]

export function SereniteTargets() {
    return (
        <div className="relative w-full overflow-hidden py-12">
            <div className="flex w-full overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...targets, ...targets].map((target, i) => (
                        <TargetCard key={i} {...target} />
                    ))}
                </motion.div>
            </div>

            <div className="mt-16 text-center px-6">
                <p className="text-white/60 text-lg">
                    Vous avez un doute sur l'éligibilité de votre structure ?{" "}
                    <Link
                        href="/contact"
                        className="text-secondary font-bold hover:underline transition-all"
                    >
                        Contactez-nous pour une étude personnalisée.
                    </Link>
                </p>
            </div>
        </div>
    )
}

function TargetCard({ role, spec, image }: { role: string; spec: string; image: string }) {
    return (
        <div className="w-72 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-xl">
            <div className="h-40 w-full relative">
                <Image
                    src={image}
                    alt={role}
                    fill
                    className="object-cover grayscale-[20%] brightness-90 contrast-110"
                    sizes="(max-width: 768px) 100vw, 288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </div>
            <div className="p-6 pt-4">
                <h4 className="font-bold text-white text-lg mb-1">{role}</h4>
                <p className="text-secondary text-sm font-medium leading-relaxed">{spec}</p>
            </div>
        </div>
    )
}