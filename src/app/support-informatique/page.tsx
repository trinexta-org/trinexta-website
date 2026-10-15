import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"
import { supportInformatiqueData } from "@/data/services/support-informatique"

export const metadata: Metadata = {
  title: "Support informatique PME en Essonne (91)",
  description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne. Assistance à distance, dépannage, Microsoft 365 et suivi des incidents. Contactez TRINEXTA.",
  alternates: {
    canonical: "/support-informatique",
  },
  openGraph: {
    title: "Support informatique PME en Essonne (91) | TRINEXTA",
    description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne. Assistance à distance, dépannage, Microsoft 365 et suivi des incidents. Contactez TRINEXTA.",
    url: "/support-informatique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support informatique PME en Essonne (91) | TRINEXTA",
    description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne. Assistance à distance, dépannage, Microsoft 365 et suivi des incidents. Contactez TRINEXTA.",
    images: ["/images/og-default.png"],
  },
}

export default function SupportInformatiquePage() {
  return <ServicePage {...supportInformatiqueData} />
}