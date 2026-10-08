import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"
import { supportInformatiqueData } from "@/data/services/support-informatique"

export const metadata: Metadata = {
  title: "Support informatique TPE & PME à Évry",
  description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne : helpdesk, maintenance, Microsoft 365, cybersécurité et assistance à distance.",
  alternates: {
    canonical: "/support-informatique",
  },
  openGraph: {
    title: "Support informatique TPE & PME à Évry | TRINEXTA",
    description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne : helpdesk, maintenance, Microsoft 365, cybersécurité et assistance à distance.",
    url: "/support-informatique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support informatique TPE & PME à Évry | TRINEXTA",
    description: "Support informatique pour TPE et PME à Évry-Courcouronnes et en Essonne : helpdesk, maintenance, Microsoft 365, cybersécurité et assistance à distance.",
    images: ["/images/og-default.png"],
  },
}

export default function SupportInformatiquePage() {
  return <ServicePage {...supportInformatiqueData} />
}