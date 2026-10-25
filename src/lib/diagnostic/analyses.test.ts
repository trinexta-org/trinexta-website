import { describe, expect, it } from "vitest";
import {
  analyserDmarc,
  analyserEntetes,
  analyserSpf,
  compter,
  cookiesDeposes,
  detecterConsentement,
  detecterLogiciels,
  detecterTraceurs,
  estCleDkim,
  estExpose,
  evaluerCertificat,
  evaluerConnexion,
  evaluerEntetes,
  evaluerFichiers,
  evaluerMessagerie,
  evaluerTraceurs,
  evaluerVersions,
  FICHIERS_SENSIBLES,
  lireEntete,
  sembleExpose,
  trierResultats,
  COOKIE_NON_STANDARD,
  OUTILS_CONSENTEMENT,
  TRACEURS,
  VALEUR_NON_AFFICHEE,
  type EtatSonde,
} from "./analyses";
import type { ResultatTxt } from "./reseau";

const txt = (...enregistrements: string[]): ResultatTxt => ({ etat: "trouve", enregistrements });
const ABSENT: ResultatTxt = { etat: "absent" };
const ERREUR: ResultatTxt = { etat: "erreur" };
const octets = (texte: string) => new TextEncoder().encode(texte);
const signatureGit = (() => {
  const f = FICHIERS_SENSIBLES.find((x) => x.chemin === "/.git/HEAD");
  if (!f || f.mode !== "contenu") throw new Error("/.git/HEAD doit être lu en mode contenu");
  return f.signature;
})();
const typesDe = (chemin: string) => {
  const f = FICHIERS_SENSIBLES.find((x) => x.chemin === chemin);
  if (!f || f.mode !== "entete") throw new Error(`${chemin} doit être sondé en HEAD seulement`);
  return f.types;
};

describe("analyserSpf", () => {
  it("reconnaît un SPF correct", () => {
    expect(analyserSpf(txt("google-site-verification=abc", "v=spf1 include:spf.protection.outlook.com -all"))).toBe("ok");
    expect(analyserSpf(txt("v=spf1 include:_spf.google.com ~all"))).toBe("ok");
  });

  it("signale +all et all sans qualificatif comme permissifs", () => {
    expect(analyserSpf(txt("v=spf1 +all"))).toBe("permissif");
    expect(analyserSpf(txt("v=spf1 a mx all"))).toBe("permissif");
  });

  it("distingue ?all, plusieurs SPF, absence et erreur DNS", () => {
    expect(analyserSpf(txt("v=spf1 mx ?all"))).toBe("neutre");
    expect(analyserSpf(txt("v=spf1 mx -all", "v=spf1 a -all"))).toBe("multiple");
    expect(analyserSpf(txt("autre chose"))).toBe("absent");
    expect(analyserSpf(ABSENT)).toBe("absent");
    expect(analyserSpf(ERREUR)).toBe("erreur");
  });

  it("ne confond pas v=spf10 avec un SPF", () => {
    expect(analyserSpf(txt("v=spf10 -all"))).toBe("absent");
  });
});

describe("analyserDmarc", () => {
  it("lit la politique", () => {
    expect(analyserDmarc(txt("v=DMARC1; p=reject; rua=mailto:x@exemple.fr"))).toBe("ok");
    expect(analyserDmarc(txt("v=DMARC1;p=quarantine"))).toBe("ok");
    expect(analyserDmarc(txt("v=DMARC1; p=none"))).toBe("observation");
  });

  it("signale l'absence et les enregistrements mal formés", () => {
    expect(analyserDmarc(ABSENT)).toBe("absent");
    expect(analyserDmarc(txt("v=DMARC1; rua=mailto:x@exemple.fr"))).toBe("invalide");
    expect(analyserDmarc(txt("v=DMARC1; p=reject", "v=DMARC1; p=none"))).toBe("invalide");
    expect(analyserDmarc(ERREUR)).toBe("erreur");
  });

  it("ne prend pas sp= pour p=", () => {
    expect(analyserDmarc(txt("v=DMARC1; sp=reject"))).toBe("invalide");
  });
});

describe("estCleDkim", () => {
  it("reconnaît une clé publiée et refuse une clé vide (révoquée)", () => {
    expect(estCleDkim(txt("v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC"))).toBe(true);
    expect(estCleDkim(txt("v=DKIM1; p="))).toBe(false);
    expect(estCleDkim(ABSENT)).toBe(false);
    expect(estCleDkim(ERREUR)).toBeNull();
  });
});

describe("evaluerMessagerie", () => {
  const dkim = (trouve: boolean | null) => [
    { selecteur: "selector1", trouve },
    { selecteur: "google", trouve: false },
  ];

  it("à corriger sans DMARC, comme la maquette", () => {
    const r = evaluerMessagerie({ domaine: "exemple.fr", spf: txt("v=spf1 -all"), dmarc: ABSENT, dkim: dkim(false) });
    expect(r.statut).toBe("a-corriger");
    expect(r.constat).toContain("SPF est présent");
    expect(r.constat).toContain("Aucune politique DMARC");
  });

  it("ne dit jamais que DKIM est absent : non trouvé parmi les sélecteurs courants", () => {
    const r = evaluerMessagerie({
      domaine: "exemple.fr",
      spf: txt("v=spf1 -all"),
      dmarc: txt("v=DMARC1; p=reject"),
      dkim: dkim(false),
    });
    expect(r.statut).toBe("a-surveiller");
    expect(r.constat).toContain("non trouvé parmi les sélecteurs courants");
    expect(r.constat).not.toMatch(/DKIM (est )?absent/);
  });

  it("p=none : à surveiller", () => {
    const r = evaluerMessagerie({
      domaine: "exemple.fr",
      spf: txt("v=spf1 -all"),
      dmarc: txt("v=DMARC1; p=none"),
      dkim: dkim(true),
    });
    expect(r.statut).toBe("a-surveiller");
  });

  it("tout en place : conforme", () => {
    const r = evaluerMessagerie({
      domaine: "exemple.fr",
      spf: txt("v=spf1 -all"),
      dmarc: txt("v=DMARC1; p=quarantine"),
      dkim: dkim(true),
    });
    expect(r.statut).toBe("conforme");
  });

  it("DNS muet : indéterminé, sans conclusion", () => {
    const r = evaluerMessagerie({ domaine: "exemple.fr", spf: ERREUR, dmarc: ERREUR, dkim: dkim(null) });
    expect(r.statut).toBe("indetermine");
  });
});

describe("évaluation de la connexion", () => {
  const maintenant = new Date("2026-10-25T12:00:00Z");
  const dans = (jours: number) => new Date(maintenant.getTime() + jours * 24 * 60 * 60 * 1000);

  it("calcule les jours restants", () => {
    expect(evaluerCertificat({ autorise: true, erreur: null, expireLe: dans(23.5) }, maintenant)).toEqual({
      etat: "valide",
      jours: 23,
    });
  });

  it("certificat valide, redirection en place : conforme", () => {
    const r = evaluerConnexion({
      certificat: { autorise: true, erreur: null, expireLe: dans(80) },
      httpsRepond: true,
      http: "redirige-https",
      maintenant,
    });
    expect(r.statut).toBe("conforme");
  });

  it("moins de 30 jours : à surveiller", () => {
    const r = evaluerConnexion({
      certificat: { autorise: true, erreur: null, expireLe: dans(23) },
      httpsRepond: true,
      http: "redirige-https",
      maintenant,
    });
    expect(r.statut).toBe("a-surveiller");
    expect(r.constat).toContain("expire dans 23 jours");
  });

  it("certificat expiré ou invalide : à corriger", () => {
    const expire = evaluerConnexion({
      certificat: { autorise: false, erreur: "CERT_HAS_EXPIRED", expireLe: dans(-3) },
      httpsRepond: false,
      http: "redirige-https",
      maintenant,
    });
    expect(expire.statut).toBe("a-corriger");
    const mauvaisNom = evaluerConnexion({
      certificat: { autorise: false, erreur: "ERR_TLS_CERT_ALTNAME_INVALID", expireLe: dans(60) },
      httpsRepond: false,
      http: "injoignable",
      maintenant,
    });
    expect(mauvaisNom.statut).toBe("a-corriger");
    expect(mauvaisNom.constat).toContain("ne correspond pas à l'adresse du site");
  });

  it("http:// qui ne redirige pas : à corriger", () => {
    const r = evaluerConnexion({
      certificat: { autorise: true, erreur: null, expireLe: dans(80) },
      httpsRepond: true,
      http: "reste-http",
      maintenant,
    });
    expect(r.statut).toBe("a-corriger");
  });

  it("rien ne répond : indéterminé, pas d'accusation", () => {
    const r = evaluerConnexion({ certificat: null, httpsRepond: false, http: "injoignable", maintenant });
    expect(r.statut).toBe("indetermine");
  });

  it("répond seulement en http:// : à corriger", () => {
    const r = evaluerConnexion({ certificat: null, httpsRepond: false, http: "reste-http", maintenant });
    expect(r.statut).toBe("a-corriger");
  });
});

describe("en-têtes de sécurité", () => {
  it("compte les protections et liste les manquantes", () => {
    const presence = analyserEntetes(
      new Headers({
        "strict-transport-security": "max-age=31536000",
        "x-content-type-options": "nosniff",
      })
    );
    const r = evaluerEntetes(presence);
    expect(r.constat).toMatch(/^2 protections sur 6 sont actives\./);
    expect(r.constat).toContain("Content-Security-Policy");
    expect(r.statut).toBe("a-corriger");
  });

  it("accepte frame-ancestors à la place de X-Frame-Options", () => {
    const presence = analyserEntetes(new Headers({ "content-security-policy": "default-src 'self'; frame-ancestors 'none'" }));
    expect(presence.cadre).toBe(true);
    expect(presence.csp).toBe(true);
  });

  it("ignore un HSTS à max-age=0 et un nosniff mal écrit", () => {
    const presence = analyserEntetes(
      new Headers({ "strict-transport-security": "max-age=0", "x-content-type-options": "sniff" })
    );
    expect(presence.hsts).toBe(false);
    expect(presence.nosniff).toBe(false);
  });

  it("six sur six : conforme ; quatre ou cinq : à surveiller", () => {
    const toutes = analyserEntetes(
      new Headers({
        "content-security-policy": "default-src 'self'",
        "strict-transport-security": "max-age=63072000; includeSubDomains",
        "x-frame-options": "DENY",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
        "permissions-policy": "camera=()",
      })
    );
    expect(evaluerEntetes(toutes).statut).toBe("conforme");
    expect(evaluerEntetes({ ...toutes, csp: false, permissions: false }).statut).toBe("a-surveiller");
    expect(evaluerEntetes({ ...toutes, csp: false, permissions: false }).constat).toMatch(/^4 protections sur 6/);
  });
});

describe("traceurs et consentement", () => {
  const GTM = `<script>(function(w,d,s,l,i){j.src='https://www.googletagmanager.com/gtm.js?id='+i})(window,document,'script','dataLayer','GTM-ABC1234');</script>`;
  const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XYZ123"></script>`;
  const META = `<script>!function(f,b,e,v,n,t,s){t.src='https://connect.facebook.net/en_US/fbevents.js'}(); fbq('init', '123');</script>`;
  const CLARITY = `<script>(function(c,l,a,r,i,t,y){})(window, document, "clarity", "script", "abc");</script>`;
  const TARTEAUCITRON = `<script src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.17.0/tarteaucitron.min.js"></script>`;
  const AXEPTIO = `<script>window.axeptioSettings = { clientId: "x" };</script>`;

  it("détecte les outils de mesure et de publicité connus", () => {
    expect(detecterTraceurs(GTM + GA + META + CLARITY)).toEqual([
      "Google Tag Manager",
      "Google Analytics",
      "Meta Pixel",
      "Microsoft Clarity",
    ]);
    expect(detecterTraceurs(`<script src="https://www.googletagmanager.com/gtag/js?id=AW-1234"></script>`)).toEqual([
      "Google Ads",
    ]);
    expect(detecterTraceurs(`<script>_linkedin_partner_id = "1";</script><script src="https://static.hotjar.com/c/hotjar-1.js"></script>`)).toEqual([
      "LinkedIn Insight",
      "Hotjar",
    ]);
  });

  it("ne voit rien sur une page sans traceur", () => {
    expect(detecterTraceurs("<html><body><h1>Bonjour</h1><p>GTM est un sigle.</p></body></html>")).toEqual([]);
  });

  it("détecte les outils de consentement", () => {
    expect(detecterConsentement(TARTEAUCITRON)).toEqual(["tarteaucitron"]);
    expect(detecterConsentement(AXEPTIO)).toEqual(["Axeptio"]);
    expect(detecterConsentement(`<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>`)).toEqual(["Cookiebot"]);
  });

  it("traceurs sans outil de consentement : à corriger", () => {
    expect(evaluerTraceurs(GTM, []).statut).toBe("a-corriger");
  });

  it("traceurs avec outil de consentement : à surveiller, conclusion prudente", () => {
    const r = evaluerTraceurs(GTM + TARTEAUCITRON, []);
    expect(r.statut).toBe("a-surveiller");
    expect(r.action).toContain("Vérifiez qu'ils attendent l'accord");
  });

  it("aucun traceur : conforme", () => {
    expect(evaluerTraceurs("<html></html>", ["PHPSESSID"]).statut).toBe("conforme");
  });

  it("cookie de mesure déposé par le serveur dès l'arrivée : à corriger", () => {
    const entetes = new Headers();
    entetes.append("set-cookie", "_ga=GA1.1.1; Path=/");
    entetes.append("set-cookie", "PHPSESSID=abc; HttpOnly");
    const cookies = cookiesDeposes(entetes);
    expect(cookies).toEqual(["_ga", "PHPSESSID"]);
    expect(evaluerTraceurs("<html></html>", cookies).statut).toBe("a-corriger");
  });
});

describe("fichiers sensibles : pas de faux positif", () => {
  const PAGE_HTML = octets("<!doctype html><html><head><title>Accueil</title></head><body>Bienvenue</body></html>");

  it("seul /.git/HEAD est lu ; .env, wp-config, .DS_Store et backup.zip sont sondés en HEAD", () => {
    expect(FICHIERS_SENSIBLES.filter((f) => f.mode === "contenu").map((f) => f.chemin)).toEqual(["/.git/HEAD"]);
  });

  it("reconnaît un vrai .git/HEAD", () => {
    expect(estExpose(signatureGit, { statut: 200, debut: octets("ref: refs/heads/main\n") }, null)).toBe(true);
  });

  it("un site qui répond 200 partout avec sa page d'accueil n'expose pas .git", () => {
    expect(estExpose(signatureGit, { statut: 200, debut: PAGE_HTML }, { statut: 200, debut: PAGE_HTML })).toBe(false);
  });

  it("une réponse identique au témoin n'est pas comptée", () => {
    const ref = octets("ref: refs/heads/main\n");
    expect(estExpose(signatureGit, { statut: 200, debut: ref }, { statut: 200, debut: ref })).toBe(false);
  });

  it("un 403 ou un 404 n'expose rien", () => {
    expect(estExpose(signatureGit, { statut: 403, debut: octets("ref: refs/heads/main") }, null)).toBe(false);
    expect(sembleExpose(typesDe("/.env"), { statut: 404, type: "text/plain", taille: 20 }, null)).toBe(false);
  });

  it(".env : semble exposé seulement si 200, type attendu, taille non nulle et différent du témoin", () => {
    const types = typesDe("/.env");
    expect(sembleExpose(types, { statut: 200, type: "text/plain", taille: 120 }, null)).toBe(true);
    expect(sembleExpose(types, { statut: 200, type: "application/octet-stream", taille: 120 }, null)).toBe(true);
    // Page HTML de repli, taille absente ou nulle : non.
    expect(sembleExpose(types, { statut: 200, type: "text/html", taille: 120 }, null)).toBe(false);
    expect(sembleExpose(types, { statut: 200, type: "text/plain", taille: null }, null)).toBe(false);
    expect(sembleExpose(types, { statut: 200, type: "text/plain", taille: 0 }, null)).toBe(false);
    // Le site renvoie la même réponse pour une adresse inexistante : non.
    const temoin = { statut: 200, type: "text/plain", taille: 120 };
    expect(sembleExpose(types, { statut: 200, type: "text/plain", taille: 120 }, temoin)).toBe(false);
  });

  it("lit le type et la taille dans les en-têtes", () => {
    expect(lireEntete(200, new Headers({ "content-type": "Text/Plain; charset=utf-8", "content-length": "42" }))).toEqual({
      statut: 200,
      type: "text/plain",
      taille: 42,
    });
    expect(lireEntete(200, new Headers({ "content-length": "abc" })).taille).toBeNull();
  });

  it("synthèse : exposé (à corriger), probable (à surveiller), conforme, indéterminé", () => {
    const tous = (etat: EtatSonde) => FICHIERS_SENSIBLES.map((f) => ({ chemin: f.chemin, etat }));
    expect(evaluerFichiers(tous("non")).statut).toBe("conforme");
    expect(evaluerFichiers(tous(null)).statut).toBe("indetermine");
    const git = evaluerFichiers(tous("non").map((x) => (x.chemin === "/.git/HEAD" ? { ...x, etat: "expose" as const } : x)));
    expect(git.statut).toBe("a-corriger");
    const env = evaluerFichiers(tous("non").map((x) => (x.chemin === "/.env" ? { ...x, etat: "probable" as const } : x)));
    expect(env.statut).toBe("a-surveiller");
    expect(env.constat).toContain("Semble accessible publiquement");
    expect(env.constat).toContain("nous n'en avons pas lu le contenu");
  });
});

describe("logiciels et versions affichées", () => {
  it("détecte une version dans Server, X-Powered-By et generator", () => {
    const logiciels = detecterLogiciels(
      new Headers({ server: "nginx/1.18.0", "x-powered-by": "PHP/8.1.2" }),
      `<head><meta content="WordPress 6.4.2" name="generator"></head>`
    );
    expect(logiciels).toEqual([
      { source: "Server", valeur: "nginx/1.18.0", version: true },
      { source: "X-Powered-By", valeur: "PHP/8.1.2", version: true },
      { source: "generator", valeur: "WordPress 6.4.2", version: true },
    ]);
    expect(evaluerVersions(logiciels).statut).toBe("a-corriger");
  });

  it("un nom sans version est conforme", () => {
    const logiciels = detecterLogiciels(new Headers({ server: "cloudflare", "x-powered-by": "Next.js" }), "<html></html>");
    expect(logiciels.every((l) => !l.version)).toBe(true);
    expect(evaluerVersions(logiciels).statut).toBe("conforme");
  });

  it("rien d'affiché : conforme", () => {
    expect(evaluerVersions(detecterLogiciels(new Headers(), "<html></html>")).statut).toBe("conforme");
  });
});

describe("tri et compteurs", () => {
  it("trie à corriger, à surveiller, non vérifiable, conforme", () => {
    const base = { titre: "", constat: "", risque: "", action: "" };
    const resultats = trierResultats([
      { ...base, id: "versions", statut: "conforme" },
      { ...base, id: "entetes", statut: "indetermine" },
      { ...base, id: "connexion", statut: "a-surveiller" },
      { ...base, id: "messagerie", statut: "a-corriger" },
    ]);
    expect(resultats.map((r) => r.statut)).toEqual(["a-corriger", "a-surveiller", "indetermine", "conforme"]);
    expect(compter(resultats)).toEqual({ "a-corriger": 1, "a-surveiller": 1, indetermine: 1, conforme: 1 });
  });
});

describe("aucun texte libre du site analysé dans le résultat", () => {
  it("Server et generator au texte long ou piégé : valeur non affichée, version tout de même signalée", () => {
    const html = `<meta name="generator" content="Visitez http://arnaque.example pour gagner 1.0">`;
    const logiciels = detecterLogiciels(
      new Headers({ server: "Apache/2.4.1 ".repeat(30), "x-powered-by": "<script>alert(1)</script>" }),
      html
    );
    expect(logiciels.map((l) => l.valeur)).toEqual([VALEUR_NON_AFFICHEE, VALEUR_NON_AFFICHEE, VALEUR_NON_AFFICHEE]);
    expect(logiciels[0].version).toBe(true);
    const r = evaluerVersions(logiciels);
    expect(r.constat).not.toContain("arnaque");
    expect(r.constat).not.toContain("<script>");
  });

  it("lit toutes les balises generator", () => {
    const html = `<meta name="generator" content="WordPress 6.4"><meta name="generator" content="WooCommerce 8.1">`;
    expect(detecterLogiciels(new Headers(), html).map((l) => l.valeur)).toEqual(["WordPress 6.4", "WooCommerce 8.1"]);
  });

  it("Set-Cookie au nom long ou piégé : remplacé, jamais recopié", () => {
    const entetes = new Headers();
    entetes.append("set-cookie", `${"x".repeat(5000)}=1`);
    entetes.append("set-cookie", "<img src=x>=1");
    entetes.append("set-cookie", "session_id=abc");
    const cookies = cookiesDeposes(entetes);
    expect(cookies).toEqual([COOKIE_NON_STANDARD, "session_id"]);
    const r = evaluerTraceurs("<html></html>", cookies);
    expect(r.constat).not.toContain("<img");
    expect(r.constat).not.toContain("xxxxxxxxxx");
  });

  it("IDE : nom exact seulement", () => {
    const avec = (nom: string) => {
      const e = new Headers();
      e.append("set-cookie", `${nom}=1`);
      return evaluerTraceurs("<html></html>", cookiesDeposes(e)).statut;
    };
    expect(avec("IDE")).toBe("a-corriger");
    expect(avec("IDENTITE")).toBe("conforme");
  });
});

describe("correctifs mineurs de la relecture", () => {
  it("SPF sans all ni redirect : à surveiller ; redirect= accepté", () => {
    expect(analyserSpf(txt("v=spf1 include:_spf.google.com"))).toBe("sans-fin");
    expect(analyserSpf(txt("v=spf1 redirect=_spf.exemple.fr"))).toBe("ok");
    const r = evaluerMessagerie({
      domaine: "exemple.fr",
      spf: txt("v=spf1 mx"),
      dmarc: txt("v=DMARC1; p=reject"),
      dkim: [{ selecteur: "selector1", trouve: true }],
    });
    expect(r.statut).toBe("a-surveiller");
  });

  it("DMARC hérité du domaine parent : mentionné", () => {
    const r = evaluerMessagerie({
      domaine: "boutique.exemple.fr",
      domaineDmarc: "exemple.fr",
      spf: txt("v=spf1 -all"),
      dmarc: txt("v=DMARC1; p=reject"),
      dkim: [{ selecteur: "selector1", trouve: true }],
    });
    expect(r.statut).toBe("conforme");
    expect(r.constat).toContain("domaine parent exemple.fr");
  });

  it("chaîne de certification incomplète : à surveiller, pas à corriger", () => {
    const maintenant = new Date("2026-10-25T12:00:00Z");
    const r = evaluerConnexion({
      certificat: { autorise: false, erreur: "UNABLE_TO_VERIFY_LEAF_SIGNATURE", expireLe: new Date("2027-03-01T00:00:00Z") },
      httpsRepond: true,
      http: "redirige-https",
      maintenant,
    });
    expect(r.statut).toBe("a-surveiller");
    expect(r.constat).toContain("Certains navigateurs");
  });

  it("en-têtes dupliqués : la première valeur compte", () => {
    const presence = analyserEntetes(
      new Headers({ "x-content-type-options": "nosniff, nosniff", "x-frame-options": "SAMEORIGIN, SAMEORIGIN" })
    );
    expect(presence.nosniff).toBe(true);
    expect(presence.cadre).toBe(true);
  });
});

describe("expressions régulières : pas de temps quadratique (ReDoS)", () => {
  const DEUX_MO = 2 * 1024 * 1024;
  const hostile = (motif: string) => motif.repeat(Math.ceil(DEUX_MO / motif.length)).slice(0, DEUX_MO);
  const ENTREES = [
    "<meta ",
    "<meta name=generator content=\"",
    "<meta name=\"generator\" content='",
    "connect.facebook.net/",
    "gtag(",
    "gtag( 'config' , ",
    "(window, document, ",
    "( ",
    "'GTM-",
    "'GTM-AAAA",
    "googletagmanager.com/gtag/js?id=",
    "fbq( ",
    " ",
    "a",
  ].map(hostile);

  const chrono = (f: () => unknown) => {
    const debut = performance.now();
    f();
    return performance.now() - debut;
  };

  it.each([...TRACEURS, ...OUTILS_CONSENTEMENT].map((t) => [t.nom, t.motif] as const))(
    "motif %s : moins de 200 ms sur 2 Mo hostiles",
    (_nom, motif) => {
      for (const entree of ENTREES) {
        expect(chrono(() => motif.test(entree))).toBeLessThan(200);
      }
    }
  );

  it("balises generator : moins de 200 ms sur 2 Mo hostiles", () => {
    for (const entree of ENTREES) {
      expect(chrono(() => detecterLogiciels(new Headers(), entree))).toBeLessThan(200);
    }
  });

  it("en-têtes : moins de 200 ms sur une valeur hostile", () => {
    const valeur = hostile("; frame-ancestors").slice(0, 64 * 1024);
    const entetes = new Headers({ "content-security-policy": valeur, "strict-transport-security": hostile("max-age=").slice(0, 64 * 1024) });
    expect(chrono(() => analyserEntetes(entetes))).toBeLessThan(200);
  });
});
