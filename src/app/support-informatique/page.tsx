import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"
import { supportInformatiqueData } from "@/data/services/support-informatique"

export const metadata: Metadata = {
  title: "Assistance informatique à Évry et en Essonne",
  description: "Messagerie bloquée, poste lent ou accès impossible ? Contactez TRINEXTA pour une assistance informatique professionnelle en Essonne, sur proposition.",
  alternates: {
    canonical: "/support-informatique",
  },
  openGraph: {
    title: "Assistance informatique à Évry et en Essonne | TRINEXTA",
    description: "Messagerie bloquée, poste lent ou accès impossible ? Contactez TRINEXTA pour une assistance informatique professionnelle en Essonne, sur proposition.",
    url: "/support-informatique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistance informatique à Évry et en Essonne | TRINEXTA",
    description: "Messagerie bloquée, poste lent ou accès impossible ? Contactez TRINEXTA pour une assistance informatique professionnelle en Essonne, sur proposition.",
    images: ["/images/og-default.png"],
  },
}

export default function SupportInformatiquePage() {
  return <ServicePage {...supportInformatiqueData} />
}