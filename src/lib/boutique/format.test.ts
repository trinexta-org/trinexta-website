import { describe, expect, it } from "vitest"
import { canonicalListe, euros, lienListe, lireCriteres, montantSchema, urlImage } from "./format"

describe("format de la boutique", () => {
  it("affiche les centimes en euros, sans recalcul", () => {
    expect(euros(129600).replace(/\s/g, " ")).toBe("1 296,00 €")
    expect(montantSchema(129600)).toBe("1296.00")
  })

  it("préfixe seulement les images de l'API", () => {
    expect(urlImage("/api/public/boutique/images/abc?l=480", "https://api.test/")).toBe("https://api.test/api/public/boutique/images/abc?l=480")
    expect(urlImage("https://ailleurs.test/x.png", "https://api.test")).toBeNull()
    expect(urlImage("/api/public/boutique/catalogue", "https://api.test")).toBeNull()
  })

  it("ignore les paramètres mal formés et convertit les prix en centimes HT", () => {
    const c = lireCriteres({ marque: "Lenovo<script>", prixMin: "500", prixMax: "abc", tri: "hasard", page: "-2", q: "  thinkpad  " }, "portable")
    expect(c).toMatchObject({ categorie: "portable", marque: undefined, prixMin: 50000, prixMax: undefined, tri: undefined, page: 1, q: "thinkpad" })
  })

  it("donne une adresse canonique sans tri ni filtre", () => {
    const base = lireCriteres({ tri: "prix", page: "2" }, "ecran")
    expect(canonicalListe("/boutique/ecran", base)).toBe("/boutique/ecran?page=2")
    expect(canonicalListe("/boutique/ecran", lireCriteres({ marque: "dell", page: "2" }, "ecran"))).toBe("/boutique/ecran")
    expect(canonicalListe("/boutique/ecran", lireCriteres({}, "ecran"))).toBe("/boutique/ecran")
  })

  it("revient à la page 1 quand un filtre change", () => {
    const c = lireCriteres({ marque: "dell", page: "3" }, "ecran")
    expect(lienListe("/boutique/ecran", c, { tri: "prix" })).toBe("/boutique/ecran?marque=dell&tri=prix")
    expect(lienListe("/boutique/ecran", c, { page: "4" })).toBe("/boutique/ecran?marque=dell&page=4")
  })
})
