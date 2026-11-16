import type { ClientBoutique } from "./api"
import type { CodeCategorie, ImageArticle, Kit, KitResume } from "./types"

// La liste des kits (`GET /kits`) ne porte pas de photo : celles-ci viennent de la composition,
// donnée par `GET /kits/{slug}` (même cache de 300 s que les autres appels).

const ORDRE: CodeCategorie[] = ["portable", "poste", "ecran", "peripherique", "accessoire"]

/** Photos des produits du kit, sans doublon : poste d'abord, puis écran, puis le reste. */
export function photosKit(kit: Pick<Kit, "variantes">, max = 3): ImageArticle[] {
  const composition = kit.variantes[0]?.composition ?? []
  const rang = (c: CodeCategorie) => {
    const i = ORDRE.indexOf(c)
    return i === -1 ? ORDRE.length : i
  }
  const vues = new Set<string>()
  const photos: ImageArticle[] = []
  for (const l of [...composition].sort((a, b) => rang(a.categorie.code) - rang(b.categorie.code))) {
    if (!l.image || vues.has(l.image.moyenne)) continue
    vues.add(l.image.moyenne)
    photos.push(l.image)
    if (photos.length === max) break
  }
  return photos
}

/** Kits de la liste complétés de leurs photos ; un kit dont le détail ne répond pas garde son pictogramme. */
export async function kitsAvecPhotos(api: ClientBoutique, kits: KitResume[]): Promise<(KitResume & { photos: ImageArticle[] })[]> {
  const details = await Promise.all(kits.map((k) => api.kit(k.slug)))
  return kits.map((k, i) => {
    const d = details[i]
    return { ...k, photos: d.ok ? photosKit(d.data) : [] }
  })
}
