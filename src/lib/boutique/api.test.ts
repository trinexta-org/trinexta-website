import { describe, expect, it, vi } from "vitest"
import { creerClient, parametresCatalogue, slugValide } from "./api"

const ARTICLE = {
  slug: "lenovo-thinkpad-e14-gen-6-21m7001afr",
  nom: "Lenovo ThinkPad E14 Gen 6",
  designation: "Portable 14\" Intel Core i5 16 Go 512 Go SSD",
  marque: { code: "lenovo", libelle: "Lenovo" },
  categorie: { code: "portable", libelle: "Ordinateur portable" },
  prix: { devise: "EUR", tauxTva: 20, ht: 108000, ttc: 129600, barreHt: null, barreTtc: null, promotion: null, pourcentage: null, finPromotion: null, operation: null, avantages: [], ecoParticipationHt: 50, ecoParticipationTtc: 60 },
  disponibilite: "en stock",
  image: null,
  miseAJour: "2026-11-16T02:10:00.000Z",
}

function reponse(status: number, corps: unknown = {}) {
  return new Response(JSON.stringify(corps), { status, headers: { "Content-Type": "application/json" } })
}

function client(fetch: (url: string, init: RequestInit) => Promise<Response>, delaiMs = 8000) {
  return creerClient({ base: "https://api.test", fetch, delaiMs, simuler: false })
}

describe("client de l'API boutique", () => {
  it("lit une réponse et l'appelle côté serveur avec le cache de 300 s", async () => {
    const fetch = vi.fn(async () => reponse(200, { ...ARTICLE, lies: [], images: [], caracteristiques: [] }))
    const res = await client(fetch).article(ARTICLE.slug)
    expect(res.ok).toBe(true)
    if (res.ok) expect(res.data.prix.ttc).toBe(129600)
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit & { next: { revalidate: number } }]
    expect(url).toBe(`https://api.test/api/public/boutique/articles/${ARTICLE.slug}`)
    expect(init.next.revalidate).toBe(300)
    expect(init.signal).toBeInstanceOf(AbortSignal)
  })

  it("traduit un 404 en « introuvable »", async () => {
    const res = await client(async () => reponse(404, { erreur: "Introuvable" })).article("inconnu")
    expect(res).toEqual({ ok: false, raison: "introuvable" })
  })

  it("traduit un 429 en « indisponible », sans exposer l'erreur", async () => {
    const espion = vi.spyOn(console, "error").mockImplementation(() => {})
    const res = await client(async () => reponse(429, { erreur: "Trop de requêtes" })).catalogue()
    expect(res).toEqual({ ok: false, raison: "indisponible" })
    espion.mockRestore()
  })

  it("abandonne après le délai d'attente", async () => {
    const espion = vi.spyOn(console, "error").mockImplementation(() => {})
    const lent = (_url: string, init: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => reject(init.signal?.reason))
      })
    const res = await client(lent, 20).kits()
    expect(res).toEqual({ ok: false, raison: "indisponible" })
    espion.mockRestore()
  })

  it("n'appelle pas l'API pour une adresse mal formée", async () => {
    const fetch = vi.fn(async () => reponse(200))
    expect(await client(fetch).article("../admin")).toEqual({ ok: false, raison: "introuvable" })
    expect(await client(fetch).kit("Kit Majuscules")).toEqual({ ok: false, raison: "introuvable" })
    expect(fetch).not.toHaveBeenCalled()
  })

  it("transmet les critères du catalogue sans paramètre vide", () => {
    const p = parametresCatalogue({ categorie: "portable", marque: "lenovo", prixMin: 50000, tri: "-prix", page: 1, parPage: 24 })
    expect(p.toString()).toBe("categorie=portable&marque=lenovo&prixMin=50000&tri=-prix&parPage=24")
  })

  it("reconnaît les adresses lisibles", () => {
    expect(slugValide("lenovo-thinkpad-e14-gen-6-21m7001afr")).toBe(true)
    expect(slugValide("a--b")).toBe(false)
    expect(slugValide("")).toBe(false)
  })
})

describe("réponses simulées", () => {
  it("ne s'activent jamais en production", async () => {
    vi.stubEnv("BOUTIQUE_SIMULATION", "1")
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://trinexta.fr")
    vi.resetModules()
    const mod = await import("./api")
    expect(mod.simulationActive()).toBe(false)
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it("servent un catalogue filtrable hors production", async () => {
    const res = await creerClient({ simuler: true }).catalogue({ categorie: "ecran" })
    expect(res.ok).toBe(true)
    if (res.ok) expect(res.data.articles.every((a) => a.categorie.code === "ecran")).toBe(true)
  })
})
