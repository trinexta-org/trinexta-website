import Image from "next/image"
import Link from "next/link"
import { SERENITE_DEVIS_HREF, SERENITE_POUR_QUI } from "@/data/serenite"

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
        <div className="relative w-full overflow-hidden">
            <div className="flex w-full overflow-hidden py-4">
                <ul
                    className="flex gap-6 animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full"
                    style={{ animationDuration: "30s" }}
                >
                    {targets.map((target) => (
                        <TargetCard key={target.role} {...target} />
                    ))}
                    {/* Copie pour la boucle du défilant : masquée aux lecteurs d'écran et sans animation */}
                    {targets.map((target) => (
                        <TargetCard key={`${target.role}-copie`} {...target} duplicate />
                    ))}
                </ul>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                <p className="rounded-2xl border border-secondary/20 bg-surface-strong p-5 text-primary/80 leading-relaxed">{SERENITE_POUR_QUI.essentiel}</p>
                <p className="rounded-2xl border border-secondary/20 bg-surface-strong p-5 text-primary/80 leading-relaxed">{SERENITE_POUR_QUI.complete}</p>
            </div>

            <div className="mt-8 text-center">
                <p className="text-primary/75 text-lg">
                    Un doute sur l&apos;éligibilité de votre structure ?{" "}
                    <Link
                        href={SERENITE_DEVIS_HREF}
                        className="text-primary font-bold underline decoration-secondary underline-offset-4 hover:decoration-primary transition-colors"
                    >
                        Demander mon devis Sérénité
                    </Link>
                </p>
            </div>
        </div>
    )
}

function TargetCard({ role, spec, image, duplicate = false }: { role: string; spec: string; image: string; duplicate?: boolean }) {
    return (
        <li
            aria-hidden={duplicate || undefined}
            className={`w-72 shrink-0 rounded-2xl border border-secondary/20 bg-surface-strong overflow-hidden shadow-lg ${duplicate ? "motion-reduce:hidden" : ""}`}
        >
            <div className="h-40 w-full relative">
                <Image
                    src={image}
                    alt={duplicate ? "" : role}
                    fill
                    className="object-cover grayscale-[20%] brightness-90 contrast-110"
                    sizes="(max-width: 768px) 100vw, 288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </div>
            <div className="p-6 pt-4">
                <h3 className="font-bold text-primary text-lg mb-1">{role}</h3>
                <p className="text-primary/75 text-sm font-medium leading-relaxed">{spec}</p>
            </div>
        </li>
    )
}