import { afterEach, describe, expect, it, vi } from "vitest";
import { AuditUrlError } from "./assert-public-url";
import { AuditFetchError, fetchTargetHtml } from "./fetch";

// Résolveur qui rend tout domaine public (les cibles privées testées ici sont
// des IP littérales, vérifiées sans DNS).
const publicResolve = async () => ["93.184.216.34"];

function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function redirectResponse(location: string, status = 301): Response {
  return new Response(null, { status, headers: { location } });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchTargetHtml", () => {
  it("récupère le HTML d'une cible publique", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(htmlResponse("<html><title>Ok</title></html>"));
    const result = await fetchTargetHtml("https://exemple.fr", { resolve: publicResolve });
    expect(result.html).toContain("<title>Ok</title>");
    expect(result.status).toBe(200);
  });

  it("re-vérifie l'adresse après une redirection et rejette un saut vers une IP privée", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      redirectResponse("http://169.254.169.254/latest/meta-data")
    );
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditUrlError);
  });

  it("suit une redirection vers une cible publique", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(redirectResponse("https://exemple.fr/final"))
      .mockResolvedValueOnce(htmlResponse("<html><title>Final</title></html>"));
    const result = await fetchTargetHtml("https://exemple.fr", { resolve: publicResolve });
    expect(result.finalUrl).toBe("https://exemple.fr/final");
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("rejette au-delà de la limite de redirections", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(redirectResponse("https://exemple.fr/boucle"));
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditFetchError);
  });

  it("rejette une réponse non-HTML", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
    );
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditFetchError);
  });

  it("rejette un site injoignable (erreur réseau)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("fetch failed"));
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditFetchError);
  });

  it("rejette une page trop volumineuse (content-length)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("x", {
        status: 200,
        headers: { "content-type": "text/html", "content-length": String(6 * 1024 * 1024) },
      })
    );
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditFetchError);
  });

  it("rejette une réponse 4xx/5xx", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("nope", { status: 503, headers: { "content-type": "text/html" } })
    );
    await expect(
      fetchTargetHtml("https://exemple.fr", { resolve: publicResolve })
    ).rejects.toBeInstanceOf(AuditFetchError);
  });
});
