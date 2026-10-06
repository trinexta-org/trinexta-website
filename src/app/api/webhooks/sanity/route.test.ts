import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const subscriber = vi.hoisted(() => ({
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
}));
vi.mock("@/lib/db", () => ({ prisma: { subscriber } }));

import { POST } from "./route";
import { POST as subscribe } from "@/app/api/newsletter/route";

const secret = "test-only-sanity-newsletter-secret";
const body = JSON.stringify({ title: "Article", slug: { current: "article" } });
const fetchMock = vi.fn();

function request(payload = body, signature?: string) {
  return new Request("http://localhost/api/webhooks/sanity", {
    method: "POST",
    headers: signature ? { [SIGNATURE_HEADER_NAME]: signature } : {},
    body: payload,
  });
}

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
  subscriber.findMany.mockResolvedValue([{ email: "subscriber@example.com", token: "token" }]);
  subscriber.findUnique.mockResolvedValue(null);
  subscriber.create.mockResolvedValue({ token: "token" });
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
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "");
    const signature = await encodeSignatureHeader(body, Date.now(), secret);
    expect((await POST(request(body, signature))).status).toBe(500);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([undefined, "signature-mal-formee"])("refuse la signature %s", async (signature) => {
    expect((await POST(request(body, signature))).status).toBe(401);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuse une signature créée avec un autre secret", async () => {
    const signature = await encodeSignatureHeader(body, Date.now(), "autre-secret");
    expect((await POST(request(body, signature))).status).toBe(401);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuse un corps modifié après signature", async () => {
    const signature = await encodeSignatureHeader(body, Date.now(), secret);
    expect((await POST(request(body.replace("Article", "Modifié"), signature))).status).toBe(401);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuse un JSON signé dont le schéma est invalide", async () => {
    const payload = JSON.stringify({ title: "Article" });
    const signature = await encodeSignatureHeader(payload, Date.now(), secret);
    expect((await POST(request(payload, signature))).status).toBe(400);
    expect(subscriber.findMany).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("Expéditeur des newsletters", () => {
  it("envoie un article signé depuis la boîte newsletter", async () => {
    const signature = await encodeSignatureHeader(body, Date.now(), secret);
    expect((await POST(request(body, signature))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://graph.microsoft.com/v1.0/users/newsletter@trinexta.fr/sendMail",
      expect.objectContaining({ method: "POST" })
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("envoie la confirmation depuis la boîte newsletter", async () => {
    expect((await subscribe(request(JSON.stringify({ email: "subscriber@example.com" })))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://graph.microsoft.com/v1.0/users/newsletter@trinexta.fr/sendMail",
      expect.objectContaining({ method: "POST" })
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("utilise l'expéditeur configuré pour les deux types d'envoi", async () => {
    vi.stubEnv("NEWSLETTER_FROM_EMAIL", "custom@example.com");
    const signature = await encodeSignatureHeader(body, Date.now(), secret);
    await POST(request(body, signature));
    await subscribe(request(JSON.stringify({ email: "subscriber@example.com" })));
    const sends = fetchMock.mock.calls.filter(([url]) => url.includes("/sendMail"));
    expect(sends).toHaveLength(2);
    expect(sends.every(([url]) => url === "https://graph.microsoft.com/v1.0/users/custom@example.com/sendMail")).toBe(true);
  });

  it("refuse de revenir à la boîte contact si l'expéditeur newsletter manque", async () => {
    vi.stubEnv("NEWSLETTER_FROM_EMAIL", "");
    const signature = await encodeSignatureHeader(body, Date.now(), secret);
    expect((await POST(request(body, signature))).status).toBe(500);
    expect((await subscribe(request(JSON.stringify({ email: "subscriber@example.com" })))).status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
