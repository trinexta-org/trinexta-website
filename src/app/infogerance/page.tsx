import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Infogérance à Évry-Courcouronnes pour PME",
  description: "Infogérance informatique à Évry-Courcouronnes pour TPE et PME : supervision, maintenance proactive, support et sécurité du parc en Essonne.",
  alternates: {
    canonical: "/infogerance",
  },
  openGraph: {
    title: "Infogérance à Évry-Courcouronnes pour PME | Trinexta",
    description: "Infogérance informatique à Évry-Courcouronnes pour TPE et PME : supervision, maintenance proactive, support et sécurité du parc en Essonne.",
    url: "/infogerance",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infogérance à Évry-Courcouronnes pour PME | Trinexta",
    description: "Infogérance informatique à Évry-Courcouronnes pour TPE et PME : supervision, maintenance proactive, support et sécurité du parc en Essonne.",
    images: ["/images/og-default.png"],
  },
};

export default async function InfogerancePage() {
  const data = await getServiceData("infogerance");
  return <ServicePage {...data} />;
}
