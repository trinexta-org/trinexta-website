// Constantes partagées par le client de l'API, les composants et `next.config.ts`.

export const API_URL_PAR_DEFAUT = "https://espace-client.trinexta.fr"
export const CHEMIN_API = "/api/public/boutique"
export const CHEMIN_IMAGES = `${CHEMIN_API}/images/`
/** Largeurs servies par l'API (`?l=`). */
export const LARGEURS_IMAGES = [160, 480, 960] as const

export function baseApi(): string {
  return (process.env.ESPACE_CLIENT_API_URL || API_URL_PAR_DEFAUT).replace(/\/+$/, "")
}
