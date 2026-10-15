export const PRODUCTION_URL = "https://trinexta.fr";

// Seule la production doit etre indexee : staging et local partagent le meme code
// et seraient sinon vus par Google comme des copies concurrentes de trinexta.fr.
export const isIndexable =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") === PRODUCTION_URL;
