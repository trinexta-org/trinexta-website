import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata = {
  title: "Cybersécurité TPE/PME - Protection EDR & IA | Trinexta",
  description: "Protégez votre entreprise avec la cybersécurité TRINEXTA. EDR nouvelle génération, protection anti-ransomware, phishing et surveillance 24/7. Sécurité proactive et simple.",
};

export default async function CybersecuritePage() {
  const data = await getServiceData("cybersecurite");
  return <ServicePage {...data} />;
}
