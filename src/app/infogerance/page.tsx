import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Maintenance informatique en Essonne",
  description: "Postes lents, mises à jour en retard, pannes répétées : découvrez le suivi préventif de TRINEXTA pour les TPE et PME en Essonne.",
  alternates: {
    canonical: "/infogerance",
  },
  openGraph: {
    title: "Maintenance informatique en Essonne | TRINEXTA",
    description: "Postes lents, mises à jour en retard, pannes répétées : découvrez le suivi préventif de TRINEXTA pour les TPE et PME en Essonne.",
    url: "/infogerance",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance informatique en Essonne | TRINEXTA",
    description: "Postes lents, mises à jour en retard, pannes répétées : découvrez le suivi préventif de TRINEXTA pour les TPE et PME en Essonne.",
    images: ["/images/og-default.png"],
  },
};

export default async function InfogerancePage() {
  const data = await getServiceData("infogerance");
  return <ServicePage {...data} />;
}
