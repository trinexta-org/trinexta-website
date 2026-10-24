import Link from "next/link"
import { SA_PARTENAIRES, SA_SUIVI } from "@/data/services-annexes"

export function ServicesPartners() {
    return (
        <div className="p-6 md:p-8 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SA_PARTENAIRES.map((partner) => (
                    <div key={partner.name} className="p-6 rounded-xl border border-border bg-surface flex flex-col items-center text-center space-y-1 hover:border-secondary/40 transition-all">
                        <div className="font-bold text-foreground text-lg">{partner.name}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{partner.role}</p>
                    </div>
                ))}
            </div>
            <p className="text-sm text-muted-foreground text-center pt-3 border-t border-secondary/20">
                Nous préparons le matériel avant livraison pour qu&apos;il soit prêt à l&apos;emploi dès son arrivée. {SA_SUIVI.texte}{" "}
                <Link href={SA_SUIVI.lien.href} className="font-semibold text-secondary-strong underline underline-offset-2">
                    {SA_SUIVI.lien.label}
                </Link>
            </p>
        </div>
    )
}
