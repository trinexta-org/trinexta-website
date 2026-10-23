export type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue }

export function JsonLd({ data }: { data: { [key: string]: JsonLdValue } }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export const trinextaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TRINEXTA",
  "legalName": "TrusTech IT Support",
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

// Entité locale (bureau d'Évry). Pas d'aggregateRating ni de review : les avis
// auto-attribués ne sont pas éligibles aux extraits enrichis.
export const trinextaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TRINEXTA",
  "legalName": "TrusTech IT Support",
  "slogan": "L'humain avant les tickets.",
  "image": "https://trinexta.fr/images/og-default.png",
  "@id": "https://trinexta.fr",
  "url": "https://trinexta.fr",
  "telephone": "+33978250746",
  "email": "contact@trinexta.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7 rue Montespan",
    "addressLocality": "Évry-Courcouronnes",
    "postalCode": "91000",
    "addressRegion": "Essonne",
    "addressCountry": "FR"
  },
  "areaServed": ["Évry-Courcouronnes", "Essonne", "Île-de-France"],
  "knowsAbout": ["Infogérance", "Support informatique", "Maintenance informatique", "Cybersécurité des postes", "Microsoft 365"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "19:00"
    }
  ]
};
