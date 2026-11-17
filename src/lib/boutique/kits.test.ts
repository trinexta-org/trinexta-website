import { describe, expect, it } from "vitest"
import { photosKit } from "./kits"
import type { CodeCategorie, Kit } from "./types"

const img = (id: string) => ({ miniature: `/i/${id}?l=160`, moyenne: `/i/${id}?l=480`, grande: `/i/${id}?l=960` })
const ligne = (code: CodeCategorie, id: string | null) => ({
  nom: id ?? "sans photo", quantite: 1, offert: false, categorie: { code, libelle: code }, slug: id ?? "x", image: id ? img(id) : null,
})

describe("photosKit", () => {
  it("met le poste puis l'écran en tête, sans doublon ni ligne sans photo, 3 au plus", () => {
    const kit = {
      variantes: [
        {
          composition: [
            ligne("accessoire", "sacoche"),
            ligne("ecran", "ecran"),
            ligne("ecran", "ecran"),
            ligne("peripherique", null),
            ligne("portable", "portable"),
            ligne("peripherique", "souris"),
          ],
        },
      ],
    } as unknown as Pick<Kit, "variantes">
    expect(photosKit(kit).map((p) => p.moyenne)).toEqual(["/i/portable?l=480", "/i/ecran?l=480", "/i/souris?l=480"])
  })

  it("renvoie une liste vide sans composition", () => {
    expect(photosKit({ variantes: [] })).toEqual([])
  })
})
