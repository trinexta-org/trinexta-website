import { FALLBACK_DATA } from "@/lib/google-places"

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue }

export function JsonLd({ data }: { data: { [key: string]: JsonLdValue } }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const trinextaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TRINEXTA",
  "url": "https://trinexta.fr",
  "logo": "https://trinexta.fr/images/trinexta-logo.png",
  "image": "https://trinexta.fr/images/trinexta-logo.png",
  "telephone": "+33978250746",
  "email": "contact@trinexta.fr",
  "taxID": "942 020 082 00015",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "74 B Boulevard Henri Dunant",
    "addressLocality": "Corbeil-Essonnes",
    "postalCode": "91100",
    "addressCountry": "FR"
  },
  "sameAs": [
    "https://www.linkedin.com/company/trinexta",
    "https://www.instagram.com/trinexta/",
    "https://www.tiktok.com/@trinexta",
    "https://www.facebook.com/Trinexta/"
  ]
};

export const trinextaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Trinexta",
  "image": "https://trinexta.fr/images/hero.jpg",
  "@id": "https://trinexta.fr",
  "url": "https://trinexta.fr",
  "telephone": "+33978250746",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7 Rue Montespan",
    "addressLocality": "Évry-Courcouronnes",
    "postalCode": "91000",
    "addressCountry": "FR"
  },
  "areaServed": ["Île-de-France", "Essonne", "Évry-Courcouronnes", "Corbeil-Essonnes"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": String(FALLBACK_DATA.rating),
    "reviewCount": String(FALLBACK_DATA.userRatingCount)
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:30",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "08:30",
      "closes": "18:30"
    }
  ]
};