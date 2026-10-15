import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

const TITLE = "Maintenance informatique PME à Évry et en Essonne";
const DESCRIPTION =
  "Contrat de maintenance informatique pour TPE et PME à Évry-Courcouronnes et en Essonne : maintenance préventive, dépannage à distance et sur site, suivi du parc.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/maintenance-informatique",
  },
  openGraph: {
    title: `${TITLE} | TRINEXTA`,
    description: DESCRIPTION,
    url: "/maintenance-informatique",
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

export default async function MaintenanceInformatiquePage() {
  const data = await getServiceData("maintenance-informatique");
  return <ServicePage {...data} />;
}
