import { JsonLd } from "./JsonLd";

interface BreadcrumbItem {
  name: string;
  url: string; // URL relative (ex: "/contact")
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      // Si l'URL commence déjà par http, on la laisse, sinon on la combine avec le domaine
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return <JsonLd data={schema} />;
}