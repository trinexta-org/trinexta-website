import { createServer, type Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { avecDispatcherPublic } from "./dispatcher";

// L'agent refait le contrôle d'adresse à la connexion : même si une requête
// passait le premier contrôle, une adresse locale est refusée au moment de se connecter.
describe("dispatcherPublic", () => {
  let serveur: Server;
  let port = 0;

  beforeAll(async () => {
    serveur = createServer((_req, res) => res.end("interne"));
    await new Promise<void>((resolve) => serveur.listen(0, "127.0.0.1", resolve));
    port = (serveur.address() as { port: number }).port;
  });

  afterAll(() => {
    serveur.close();
  });

  it("le serveur local répond sans l'agent (témoin)", async () => {
    const r = await fetch(`http://127.0.0.1:${port}/`);
    expect(await r.text()).toBe("interne");
  });

  it("refuse localhost à la connexion", async () => {
    await expect(fetch(`http://localhost:${port}/`, avecDispatcherPublic({}))).rejects.toThrow();
  });
});
