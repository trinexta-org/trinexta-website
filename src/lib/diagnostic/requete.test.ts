import { describe, expect, it, vi } from "vitest";
import { UrlRefuseeError } from "./assert-public-url";
import { RequeteError, requeteBridee } from "./requete";

const resolve = async () => ["93.184.216.34"];
const redirection = (location: string) => new Response(null, { status: 301, headers: { location } });

describe("requeteBridee", () => {
  it("re-vérifie chaque redirection et refuse un saut vers une IP interne", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValueOnce(redirection("http://169.254.169.254/latest/meta-data"));
    await expect(requeteBridee("https://exemple.fr/", { resolve, fetchImpl })).rejects.toBeInstanceOf(UrlRefuseeError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("refuse un port non web dans une redirection", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValueOnce(redirection("http://exemple.fr:6379/"));
    await expect(requeteBridee("https://exemple.fr/", { resolve, fetchImpl })).rejects.toThrow("Port non autorisé");
  });

  it("suit les redirections publiques et rend l'adresse finale", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(redirection("https://www.exemple.fr/"))
      .mockResolvedValueOnce(new Response("<html></html>", { status: 200 }));
    const r = await requeteBridee("http://exemple.fr/", { resolve, fetchImpl });
    expect(r.urlFinale).toBe("https://www.exemple.fr/");
    expect(r.statut).toBe(200);
  });

  it("rend la réponse 3xx telle quelle quand les redirections sont coupées", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(redirection("https://exemple.fr/login"));
    const r = await requeteBridee("https://exemple.fr/.env", { resolve, fetchImpl, maxRedirections: 0 });
    expect(r.statut).toBe(301);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("ne lit que les premiers octets demandés", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("x".repeat(5000), { status: 200 }));
    const r = await requeteBridee("https://exemple.fr/backup.zip", { resolve, fetchImpl, maxOctets: 512 });
    expect(r.corps.byteLength).toBe(512);
    expect(r.tronque).toBe(true);
  });

  it("transforme une erreur réseau en RequeteError", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("fetch failed"));
    await expect(requeteBridee("https://exemple.fr/", { resolve, fetchImpl })).rejects.toBeInstanceOf(RequeteError);
  });
});
