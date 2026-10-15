import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

const TITLE = "Zone d'intervention informatique en Essonne (91)";
const DESCRIPTION =
  "TRINEXTA, prestataire informatique basé à Évry-Courcouronnes, accompagne les TPE et PME de l'Essonne et d'Île-de-France : communes couvertes et interventions sur site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/zone-intervention",
  },
  openGraph: {
    title: `${TITLE} | TRINEXTA`,
    description: DESCRIPTION,
    url: "/zone-intervention",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | TRINEXTA`,
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
};

export default async function ZoneInterventionPage() {
  const data = await getServiceData("zone-intervention");
  return <ServicePage {...data} />;
}
