import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const subscriber = vi.hoisted(() => ({ findMany: vi.fn() }));
const newsletterEnvoi = vi.hoisted(() => ({ create: vi.fn(), update: vi.fn(), delete: vi.fn() }));
vi.mock("@/lib/db", () => ({ prisma: { subscriber, newsletterEnvoi } }));

import { POST } from "./route";

const secret = "test-only-sanity-newsletter-secret";
const body = JSON.stringify({ title: "Article <b>test</b>", slug: { current: "article" } });
const fetchMock = vi.fn();

function request(payload = body, signature?: string) {
  return new Request("http://localhost/api/webhooks/sanity", {
    method: "POST",
    headers: signature ? { [SIGNATURE_HEADER_NAME]: signature } : {},
    body: payload,
  });
}

const signer = (payload = body, cle = secret) => encodeSignatureHeader(payload, Date.now(), cle);
const envois = () => fetchMock.mock.calls.filter(([url]) => String(url).includes("/sendMail"));

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("SANITY_WEBHOOK_SECRET", secret);
  vi.stubEnv("AZURE_TENANT_ID", "tenant-test");
  vi.stubEnv("AZURE_CLIENT_ID", "client-test");
  vi.stubEnv("AZURE_CLIENT_SECRET", "client-secret-test");
  vi.stubEnv("AZURE_FROM_EMAIL", "contact@trinexta.fr");
  vi.stubEnv("NEWSLETTER_FROM_EMAIL", "newsletter@trinexta.fr");
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  subscriber.findMany.mockResolvedValue([
    { email: "a@example.com", token: "t1" },
    { email: "b@example.com", token: "t2" },
  ]);
  newsletterEnvoi.create.mockResolvedValue({});
  newsletterEnvoi.update.mockResolvedValue({});
  newsletterEnvoi.delete.mockResolvedValue({});
  fetchMock.mockImplementation(async (url: string) =>
    url.includes("oauth2")
      ? Response.json({ access_token: "access-token-test" })
      : new Response(null, { status: 202 })
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Authentification du webhook Sanity", () => {
  it("refuse les envois sans secret serveur", async () => {
    const signature = await signer();
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "");
    expect((await POST(request(body, signature))).status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([undefined, "signature-mal-formee"])("refuse la signature %s", async (signature) => {
    expect((await POST(request(body, signature))).status).toBe(401);
    expect(subscriber.findMany).not.toHaveBeenCalled();
  });

  it("refuse une signature créée avec un autre secret", async () => {
    expect((await POST(request(body, await signer(body, "autre-secret")))).status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuse un corps modifié après signature", async () => {
    const signature = await signer();
    expect((await POST(request(body.replace("Article", "Modifié"), signature))).status).toBe(401);
  });

  it("refuse un JSON signé sans slug", async () => {
    const payload = JSON.stringify({ title: "Article" });
    expect((await POST(request(payload, await signer(payload)))).status).toBe(400);
    expect(newsletterEnvoi.create).not.toHaveBeenCalled();
  });
});

describe("Annonce d'un article", () => {
  it("envoie à chaque abonné actif depuis la boîte newsletter", async () => {
    const res = await POST(request(body, await signer()));
    expect(res.status).toBe(200);
    expect(envois()).toHaveLength(2);
    expect(envois().every(([url]) => url === "https://graph.microsoft.com/v1.0/users/newsletter@trinexta.fr/sendMail")).toBe(true);
    expect(newsletterEnvoi.update).toHaveBeenCalledWith({ where: { slug: "article" }, data: { destinataires: 2 } });
  });

  it("accepte le champ titre de Sanity et échappe le HTML", async () => {
    const payload = JSON.stringify({ titre: "<script>x</script>", slug: "article" });
    expect((await POST(request(payload, await signer(payload)))).status).toBe(200);
    const contenu = JSON.parse(envois()[0][1].body).message.body.content as string;
    expect(contenu).not.toContain("<script>");
    expect(contenu).toContain("&lt;script&gt;");
  });

  it("n'annonce pas deux fois le même article", async () => {
    newsletterEnvoi.create.mockRejectedValue(Object.assign(new Error("unique"), { code: "P2002" }));
    const res = await POST(request(body, await signer()));
    expect(res.status).toBe(200);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(envois()).toHaveLength(0);
  });

  it("libère l'article si aucun envoi n'aboutit", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("oauth2") ? Response.json({ error: "x" }, { status: 401 }) : new Response(null, { status: 202 })
    );
    expect((await POST(request(body, await signer()))).status).toBe(502);
    expect(newsletterEnvoi.delete).toHaveBeenCalledWith({ where: { slug: "article" } });
  });

  it("refuse de revenir à la boîte contact si l'expéditeur newsletter manque", async () => {
    vi.stubEnv("NEWSLETTER_FROM_EMAIL", "");
    expect((await POST(request(body, await signer()))).status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
