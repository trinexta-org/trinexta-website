import { afterEach, describe, expect, it, vi } from "vitest"
import { checkRateLimit, getClientIp } from "@/lib/estimation/rate-limit"
import { estRobot, limiteParEmail, lireCorpsJson } from "@/lib/security/anti-abus"

const requete = (headers: Record<string, string>, body?: string) =>
  new Request("https://trinexta.fr/api/test", { method: "POST", headers, body })

describe("getClientIp", () => {
  it("préfère X-Real-IP, posé par Nginx", () => {
    expect(getClientIp(requete({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "1.2.3.4, 203.0.113.7" }))).toBe("203.0.113.7")
  })

  it("ignore les entrées de X-Forwarded-For forgées par le client", () => {
    expect(getClientIp(requete({ "x-forwarded-for": "1.2.3.4, 5.6.7.8, 203.0.113.7" }))).toBe("203.0.113.7")
  })

  it("renvoie unknown sans en-tête", () => {
    expect(getClientIp(requete({}))).toBe("unknown")
  })
})

describe("estRobot", () => {
  it("détecte le champ piège rempli", () => {
    expect(estRobot({ email: "a@b.fr", site_web: "http://spam.example" })).toBe(true)
  })

  it("laisse passer un humain", () => {
    expect(estRobot({ email: "a@b.fr", site_web: "" })).toBe(false)
    expect(estRobot({ email: "a@b.fr" })).toBe(false)
    expect(estRobot(null)).toBe(false)
  })
})

describe("lireCorpsJson", () => {
  it("lit un corps JSON", async () => {
    expect(await lireCorpsJson(requete({ "content-type": "application/json" }, '{"a":1}'))).toEqual({ a: 1 })
  })

  it("refuse un Content-Type non JSON (soumission depuis un site tiers)", async () => {
    expect(await lireCorpsJson(requete({ "content-type": "text/plain" }, '{"a":1}'))).toBeNull()
  })

  it("refuse un JSON invalide sans lever d'erreur", async () => {
    expect(await lireCorpsJson(requete({ "content-type": "application/json" }, "{mauvais"))).toBeNull()
  })
})

describe("limiteParEmail", () => {
  it("bloque au-delà du quota, sans tenir compte de la casse", () => {
    expect(limiteParEmail("Test@Exemple.fr", "test-quota", 2)).toBe(true)
    expect(limiteParEmail("test@exemple.fr", "test-quota", 2)).toBe(true)
    expect(limiteParEmail("TEST@exemple.fr", "test-quota", 2)).toBe(false)
  })
})

describe("checkRateLimit : fenêtre propre à chaque clé", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("garde un quota sur 24 h au-delà des 10 minutes par défaut", () => {
    vi.useFakeTimers()
    const jour = 24 * 60 * 60 * 1000
    expect(checkRateLimit("test-fenetre:a", 1, jour)).toBe(true)
    vi.advanceTimersByTime(60 * 60 * 1000)
    expect(checkRateLimit("test-fenetre:a", 1, jour)).toBe(false)
    vi.advanceTimersByTime(jour)
    expect(checkRateLimit("test-fenetre:a", 1, jour)).toBe(true)
  })

  it("conserve la fenêtre de 10 minutes par défaut", () => {
    vi.useFakeTimers()
    expect(checkRateLimit("test-fenetre:b", 1)).toBe(true)
    expect(checkRateLimit("test-fenetre:b", 1)).toBe(false)
    vi.advanceTimersByTime(11 * 60 * 1000)
    expect(checkRateLimit("test-fenetre:b", 1)).toBe(true)
  })
})
