import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"
import { getServiceData } from "@/data/services"

const TITLE = "Microsoft 365 pour PME : migration et sécurité"
const DESCRIPTION =
  "Migration vers Microsoft 365, double authentification, gestion des comptes et des licences pour TPE et PME en Essonne et Île-de-France."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/microsoft-365",
  },
  openGraph: {
    title: `${TITLE} | TRINEXTA`,
    description: DESCRIPTION,
    url: "/microsoft-365",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | TRINEXTA`,
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
}

export default async function Microsoft365Page() {
  const data = await getServiceData("microsoft-365")
  return <ServicePage {...data} />
}
