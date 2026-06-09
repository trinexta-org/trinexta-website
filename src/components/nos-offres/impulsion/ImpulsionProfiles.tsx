"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const profiles = [
    { role: "Support utilisateur", spec: "Helpdesk N1/N2", image: "/images/nos-offres/profiles/profile-support.jpg" },
    { role: "Gestion de parc", spec: "De proximité", image: "/images/nos-offres/profiles/profile-parc.jpg" },
    { role: "Systèmes et réseaux", spec: "Architecture & maintenance", image: "/images/nos-offres/profiles/profile-reseau.jpg" },
    { role: "Microsoft 365", spec: "Azure · Intune", image: "/images/nos-offres/profiles/profile-m365.jpg" },
    { role: "Déploiement", spec: "Postes, logiciels, matériel", image: "/images/nos-offres/profiles/profile-deploiement.jpg" },
    { role: "Cybersécurité", spec: "Sensibilisation, audit, remédiation", image: "/images/nos-offres/profiles/profile-cyber.jpg" },
]

export function ImpulsionProfiles() {
    return (
        <div className="relative w-full overflow-hidden py-20 bg-primary">
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
                    {[...profiles, ...profiles].map((profile, i) => (
                        <ChainLink key={i} {...profile} />
                    ))}
                </motion.div>
            </div>

            <div className="mt-16 text-center px-6">
                <p className="text-white/60 text-lg">
                    Vous ne savez pas exactement quel profil il vous faut ?{" "}
                    <Link
                        href="/contact"
                        className="text-secondary font-bold hover:underline transition-all"
                    >
                        Décrivez votre situation, on vous oriente.
                    </Link>
                </p>
            </div>
        </div>
    )
}

function ChainLink({ role, spec, image }: { role: string; spec: string; image: string }) {
    return (
        <div className="w-72 shrink-0 rounded-2xl border border-white/10 bg-primary/90 backdrop-blur-sm overflow-hidden shadow-xl">
            <div className="h-40 w-full relative">
                <Image
                    src={image}
                    alt={role}
                    fill
                    className="object-cover grayscale-[20%] brightness-90 contrast-110"
                />
            </div>
            <div className="p-6">
                <h4 className="font-bold text-white text-lg mb-1">{role}</h4>
                <p className="text-secondary text-sm font-medium">{spec}</p>
            </div>
        </div>
    )
}