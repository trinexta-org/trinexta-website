import { describe, expect, it } from "vitest"
import { creerClient } from "./api"
import { routesBoutique } from "./sitemap"

describe("sitemap de la boutique", () => {
  it("liste catégories non vides, produits et kits, avec leur date de mise à jour", async () => {
    const routes = await routesBoutique("https://trinexta.fr", creerClient({ simuler: true }))
    const urls = routes.map((r) => r.url)
    expect(urls).toContain("https://trinexta.fr/boutique")
    expect(urls).toContain("https://trinexta.fr/boutique/portable")
    expect(urls).not.toContain("https://trinexta.fr/boutique/licence")
    const produit = routes.find((r) => r.url.includes("/boutique/produit/"))
    expect(produit?.lastModified).toEqual(new Date("2026-11-16T02:10:00.000Z"))
    expect(urls.some((u) => u.includes("/boutique/kits/"))).toBe(true)
  })

  it("garde les pages fixes si l'API ne répond pas", async () => {
    const api = creerClient({ base: "https://api.test", simuler: false, fetch: async () => new Response("", { status: 500 }) })
    const original = console.error
    console.error = () => {}
    const routes = await routesBoutique("https://trinexta.fr", api)
    console.error = original
    expect(routes.map((r) => r.url)).toEqual(["https://trinexta.fr/boutique", "https://trinexta.fr/boutique/kits"])
  })
})
