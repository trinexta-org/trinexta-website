import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// Test d'intégration des routes rapport et rappel, sur une vraie base PostgreSQL
// (Prisma n'est pas simulé). Lancé seulement si TEST_DATABASE_URL est défini,
// base migrée au préalable (`npx prisma migrate deploy`) :
//   TEST_DATABASE_URL=postgresql://... npx vitest run src/lib/diagnostic/rapport.integration.test.ts
// Seul l'envoi d'e-mail est remplacé (aucun compte Microsoft en test).

const URL_BASE = process.env.TEST_DATABASE_URL;

const envois = vi.hoisted(() => [] as { to: string; html: string }[]);
vi.mock("@/lib/mail", async (original) => ({
  ...(await original<typeof import("@/lib/mail")>()),
  sendMail: async (m: { to: string; html: string }) => {
    envois.push(m);
    return true;
  },
}));

describe.skipIf(!URL_BASE)("routes rapport et rappel (base réelle)", () => {
  let prisma: typeof import("@/lib/db").prisma;
  let rapport: typeof import("@/app/api/diagnostic/rapport/route").POST;
  let rappel: typeof import("@/app/api/diagnostic/rappel/route").POST;
  let creerJeton: typeof import("./jeton").creerJeton;
  let ip = 0;

  const demande = (corps: unknown) =>
    rapport(
      new Request("https://trinexta.fr/api/diagnostic/rapport", {
        method: "POST",
        headers: { "content-type": "application/json", "x-real-ip": `198.51.100.${++ip}` },
        body: JSON.stringify(corps),
      })
    );

  const creer = async () => {
    const { jeton, hash } = creerJeton();
    const d = await prisma.diagnosticSecurite.create({
      data: {
        domaine: "exemple.fr",
        statut: "termine",
        jetonHash: hash,
        resultats: [
          { id: "versions", titre: "Logiciels", statut: "conforme", constat: "Rien.", risque: "r", action: "a" },
        ],
      },
    });
    return { id: d.id, jeton };
  };

  beforeAll(async () => {
    process.env.DATABASE_URL = URL_BASE;
    process.env.NEXT_PUBLIC_SITE_URL = "https://trinexta.fr";
    ({ prisma } = await import("@/lib/db"));
    ({ POST: rapport } = await import("@/app/api/diagnostic/rapport/route"));
    ({ POST: rappel } = await import("@/app/api/diagnostic/rappel/route"));
    ({ creerJeton } = await import("./jeton"));
  });

  afterAll(async () => {
    await prisma.diagnosticSecurite.deleteMany({ where: { domaine: "exemple.fr" } });
    await prisma.$disconnect();
  });

  it("refuse un jeton absent ou faux, sans rien envoyer", async () => {
    const { id } = await creer();
    const avant = envois.length;
    expect((await demande({ diagnosticId: id, email: "a@exemple.fr" })).status).toBe(404);
    expect((await demande({ diagnosticId: id, jeton: creerJeton().jeton, email: "b@exemple.fr" })).status).toBe(404);
    expect(envois.length).toBe(avant);
    const d = await prisma.diagnosticSecurite.findUnique({ where: { id } });
    expect(d?.email).toBeNull();
    expect(d?.rapportEnvoyeAt).toBeNull();
  });

  it("envoie une seule fois ; le jeton réutilisé est refusé ; aucun accord au recontact", async () => {
    const { id, jeton } = await creer();
    const avant = envois.length;
    const [r1, r2] = await Promise.all([
      demande({ diagnosticId: id, jeton, email: "c@exemple.fr" }),
      demande({ diagnosticId: id, jeton, email: "d@exemple.fr" }),
    ]);
    expect([r1.status, r2.status].sort()).toEqual([200, 409]);
    expect(envois.length - avant).toBe(1);
    expect((await demande({ diagnosticId: id, jeton, email: "e@exemple.fr" })).status).toBe(409);
    const d = await prisma.diagnosticSecurite.findUnique({ where: { id } });
    expect(d?.rapportEnvoyeAt).not.toBeNull();
    expect(d?.consentAt).toBeNull();
    expect(d?.jetonHash).toBeNull();
    expect(envois.at(-1)?.html).toContain("/diagnostic-securite/rappel?jeton=");
  });

  it("le bouton « Être rappelé » horodate l'accord et prévient l'équipe, une seule fois", async () => {
    const { id, jeton } = await creer();
    expect((await demande({ diagnosticId: id, jeton, email: "f@exemple.fr" })).status).toBe(200);
    const lien = /rappel\?jeton=([A-Za-z0-9_-]{43})/.exec(envois.at(-1)!.html)![1];
    const clic = () => {
      const form = new FormData();
      form.set("jeton", lien);
      return rappel(new Request("https://trinexta.fr/api/diagnostic/rappel", { method: "POST", body: form }));
    };
    const avant = envois.length;
    const r = await clic();
    expect(r.status).toBe(303);
    expect(r.headers.get("location")).toContain("status=ok");
    expect(envois.length - avant).toBe(1);
    expect((await prisma.diagnosticSecurite.findUnique({ where: { id } }))?.consentAt).not.toBeNull();
    await clic();
    expect(envois.length - avant).toBe(1);
  });
});
