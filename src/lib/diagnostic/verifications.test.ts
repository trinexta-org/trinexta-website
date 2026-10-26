import { describe, expect, it } from "vitest";
import type { ResultatTxt } from "./reseau";
import type { OptionsRequete, ReponseBridee } from "./requete";
import { domainesDmarc, lancerDiagnostic, memeSite, type Dependances } from "./verifications";

// Site simulé, sans réseau : chaque adresse renvoie une réponse prédéfinie.

const ACCUEIL_HTML =
  '<!doctype html><html><head><meta name="generator" content="WordPress 6.4.2"></head><body>' +
  "<script src=\"https://www.googletagmanager.com/gtm.js?id=GTM-ABCD12\"></script></body></html>";

function reponse(url: string, statut: number, corps: string, entetes: Record<string, string> = {}): ReponseBridee {
  return { urlFinale: url, statut, entetes: new Headers(entetes), corps: new TextEncoder().encode(corps), tronque: false };
}

/** Site qui répond 200 avec sa page d'accueil à toute adresse (cas des faux positifs). */
function siteQuiRepond200Partout(): Dependances["requete"] {
  return async (url: string, options: OptionsRequete = {}) => {
    if (url.startsWith("http://")) return reponse("https://exemple.fr/", 200, "");
    const corps = options.methode === "HEAD" ? "" : ACCUEIL_HTML;
    return reponse(url, 200, options.maxOctets ? corps.slice(0, options.maxOctets) : corps, {
      "content-type": "text/html; charset=utf-8",
      server: "Apache",
      "strict-transport-security": "max-age=31536000",
      "x-content-type-options": "nosniff",
    });
  };
}

const TXT: Record<string, ResultatTxt> = {
  "exemple.fr": { etat: "trouve", enregistrements: ["v=spf1 include:spf.protection.outlook.com -all"] },
  "_dmarc.exemple.fr": { etat: "absent" },
};

const deps = (surcharge: Partial<Dependances> = {}): Dependances => ({
  requete: siteQuiRepond200Partout(),
  lireCertificat: async () => ({ autorise: true, erreur: null, expireLe: new Date("2027-01-01T00:00:00Z") }),
  lireTxt: async (nom: string) => TXT[nom] ?? { etat: "absent" },
  maintenant: () => new Date("2026-10-25T12:00:00Z"),
  ...surcharge,
});

describe("lancerDiagnostic", () => {
  it("rend les six vérifications sans faux positif sur un site qui répond 200 partout", async () => {
    const resultats = await lancerDiagnostic("www.exemple.fr", deps());
    const parId = Object.fromEntries(resultats.map((r) => [r.id, r]));
    expect(resultats).toHaveLength(6);
    expect(parId.connexion.statut).toBe("conforme");
    expect(parId.messagerie.statut).toBe("a-corriger");
    expect(parId.entetes.constat).toMatch(/^2 protections sur 6/);
    expect(parId.traceurs.statut).toBe("a-corriger");
    expect(parId.fichiers.statut).toBe("conforme");
    expect(parId.versions.statut).toBe("a-corriger");
  });

  it("interroge le DNS de messagerie sans www.", async () => {
    const noms: string[] = [];
    await lancerDiagnostic(
      "www.exemple.fr",
      deps({
        lireTxt: async (nom) => {
          noms.push(nom);
          return { etat: "absent" };
        },
      })
    );
    expect(noms).toContain("exemple.fr");
    expect(noms).toContain("_dmarc.exemple.fr");
    expect(noms).toContain("selector1._domainkey.exemple.fr");
    expect(noms.some((n) => n.includes("www."))).toBe(false);
  });

  it("une vérification en erreur n'annule pas les autres", async () => {
    const resultats = await lancerDiagnostic(
      "exemple.fr",
      deps({
        lireTxt: async () => {
          throw new Error("panne");
        },
      })
    );
    const parId = Object.fromEntries(resultats.map((r) => [r.id, r]));
    expect(parId.messagerie.statut).toBe("indetermine");
    expect(parId.connexion.statut).toBe("conforme");
  });

  it("le délai global rend « indetermine » sans bloquer la réponse", async () => {
    const debut = Date.now();
    const resultats = await lancerDiagnostic(
      "exemple.fr",
      deps({ lireCertificat: () => new Promise(() => {}) }),
      50
    );
    expect(Date.now() - debut).toBeLessThan(2000);
    const connexion = resultats.find((r) => r.id === "connexion");
    expect(connexion?.statut).toBe("indetermine");
    expect(connexion?.constat).toContain("délai");
  });

  it("page d'accueil en erreur (pare-feu anti-robots) : pas de conclusion sur les en-têtes", async () => {
    const resultats = await lancerDiagnostic(
      "exemple.fr",
      deps({ requete: async (url) => reponse(url, 403, "Forbidden", { "content-type": "text/html" }) })
    );
    const entetes = resultats.find((r) => r.id === "entetes");
    expect(entetes?.statut).toBe("indetermine");
    expect(entetes?.constat).toContain("403");
  });

  it("accueil redirigé vers un autre domaine : aucune sonde de fichier envoyée à l'autre hôte", async () => {
    const appels: string[] = [];
    const resultats = await lancerDiagnostic(
      "exemple.fr",
      deps({
        requete: async (url, options = {}) => {
          appels.push(`${options.methode ?? "GET"} ${url}`);
          if (url === "https://exemple.fr/") {
            return reponse("https://autre-site.example.com/", 200, "<html></html>", { "content-type": "text/html" });
          }
          return reponse(url, 200, "");
        },
      })
    );
    const fichiers = resultats.find((r) => r.id === "fichiers");
    expect(fichiers?.statut).toBe("indetermine");
    expect(fichiers?.constat).toContain("redirige vers un autre domaine");
    expect(appels.some((a) => a.includes("/.git/HEAD") || a.includes("/.env") || a.includes("trinexta-diagnostic-"))).toBe(false);
  });

  it(".env n'est jamais lu : HEAD seulement", async () => {
    const appels: string[] = [];
    await lancerDiagnostic(
      "exemple.fr",
      deps({
        requete: async (url, options = {}) => {
          appels.push(`${options.methode ?? "GET"} ${new URL(url).pathname}`);
          return reponse(url, 404, "", { "content-type": "text/html" });
        },
      })
    );
    for (const chemin of ["/.env", "/wp-config.php.bak", "/.DS_Store", "/backup.zip"]) {
      expect(appels).toContain(`HEAD ${chemin}`);
      expect(appels).not.toContain(`GET ${chemin}`);
    }
  });

  it("accueil en 3xx final (trop de redirections) : non exploitable", async () => {
    const resultats = await lancerDiagnostic(
      "exemple.fr",
      deps({ requete: async (url) => reponse(url, 301, "", { location: "https://exemple.fr/boucle" }) })
    );
    for (const id of ["entetes", "traceurs", "versions"]) {
      expect(resultats.find((r) => r.id === id)?.statut).toBe("indetermine");
    }
  });

  it("DMARC d'un sous-domaine : interroge les parents tant qu'il reste deux labels", async () => {
    expect(domainesDmarc("a.b.exemple.fr")).toEqual(["a.b.exemple.fr", "b.exemple.fr", "exemple.fr"]);
    const noms: string[] = [];
    const resultats = await lancerDiagnostic(
      "boutique.exemple.fr",
      deps({
        lireTxt: async (nom) => {
          noms.push(nom);
          if (nom === "_dmarc.exemple.fr") return { etat: "trouve", enregistrements: ["v=DMARC1; p=reject"] };
          if (nom === "boutique.exemple.fr") return { etat: "trouve", enregistrements: ["v=spf1 -all"] };
          return { etat: "absent" };
        },
      })
    );
    expect(noms).toContain("_dmarc.boutique.exemple.fr");
    expect(noms).toContain("_dmarc.exemple.fr");
    expect(noms).not.toContain("_dmarc.fr");
    expect(resultats.find((r) => r.id === "messagerie")?.constat).toContain("domaine parent exemple.fr");
  });

  it("memeSite : domaine saisi avec ou sans www. seulement", () => {
    expect(memeSite("exemple.fr", "https://www.exemple.fr/")).toBe(true);
    expect(memeSite("www.exemple.fr", "https://exemple.fr/")).toBe(true);
    expect(memeSite("exemple.fr", "https://exemple.fr.attaquant.example/")).toBe(false);
    expect(memeSite("exemple.fr", "https://shop.exemple.fr/")).toBe(false);
  });
});
