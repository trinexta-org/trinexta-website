"use client"

import Image from "next/image"

const partnersList = [
    { name: "Microsoft", role: "Partenaire certifié.", src: "/images/partners/microsoft.png" },
    { name: "Dell", role: "PC professionnels.", src: "/images/partners/Dell.png" },
    { name: "Lenovo", role: "Postes de travail performants.", src: "/images/partners/Lenovo.jpg" },
];

export function ServicesPartners() {
    return (
        <div className="p-6 md:p-8 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partnersList.map((partner, index) => (
                    <div key={index} className="p-6 rounded-xl border border-border bg-surface flex flex-col items-center text-center space-y-4 hover:border-secondary/40 transition-all">
                        <div className="w-32 h-16 relative flex items-center justify-center">
                            <Image src={partner.src} alt={`Logo ${partner.name}`} fill className="object-contain" />
                        </div>
                        <div className="space-y-1">
                            <div className="font-bold text-foreground text-base">{partner.name}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{partner.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-muted-foreground text-center italic pt-3 border-t border-secondary/20">
                Nous négocions les meilleurs tarifs possibles pour vous et nous préparons le matériel avant livraison afin qu&apos;il soit prêt à l&apos;emploi dès son arrivée.
            </p>
        </div>
    )
}