import Image from "next/image"
import Link from "next/link"
import { REGIE_PROFILS } from "@/data/technicien-sous-regie"

const profiles = REGIE_PROFILS


export function TechnicienProfiles() {
    return (
        <div className="relative w-full overflow-hidden py-20 bg-surface">
            <div className="flex w-full overflow-hidden">
                <div
                    className="flex gap-6 animate-marquee"
                    style={{ animationDuration: "30s" }}
                >
                    {[...profiles, ...profiles].map((profile, i) => (
                        <ChainLink key={i} {...profile} />
                    ))}
                </div>
            </div>

            <div className="mt-16 text-center px-6">
                <p className="text-muted-foreground text-lg">
                    Vous ne savez pas exactement quel profil il vous faut ?{" "}
                    <Link
                        href="/contact#formulaire"
                        className="text-secondary-strong font-bold hover:underline transition-all"
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
        <div className="w-72 shrink-0 rounded-2xl border border-border bg-surface-strong overflow-hidden shadow-xl">
            <div className="h-40 w-full relative">
                <Image
                    src={image}
                    alt={role}
                    fill
                    className="object-cover grayscale-[20%] brightness-90 contrast-110"
                />
            </div>
            <div className="p-6">
                <h3 className="font-bold text-foreground text-lg mb-1">{role}</h3>
                <p className="text-secondary-strong text-sm font-medium">{spec}</p>
            </div>
        </div>
    )
}