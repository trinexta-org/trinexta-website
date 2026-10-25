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
  trierResultats,
} from "./analyses";
import type { ResultatTxt } from "./reseau";

const txt = (...enregistrements: string[]): ResultatTxt => ({ etat: "trouve", enregistrements });
const ABSENT: ResultatTxt = { etat: "absent" };
const ERREUR: ResultatTxt = { etat: "erreur" };
const octets = (texte: string) => new TextEncoder().encode(texte);
const signature = (chemin: string) => FICHIERS_SENSIBLES.find((f) => f.chemin === chemin)!.signature;

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

  it("reconnaît un vrai .git/HEAD", () => {
    expect(estExpose(signature("/.git/HEAD"), { statut: 200, debut: octets("ref: refs/heads/main\n") }, null)).toBe(true);
  });

  it("un site qui répond 200 partout avec sa page d'accueil n'expose rien", () => {
    const temoin = { statut: 200, debut: PAGE_HTML };
    for (const f of FICHIERS_SENSIBLES) {
      expect(estExpose(f.signature, { statut: 200, debut: PAGE_HTML }, temoin)).toBe(false);
    }
  });

  it("une page HTML contenant « DB_NAME » n'est pas un wp-config", () => {
    const page = octets("<html><body>Erreur : DB_NAME manquant</body></html>");
    expect(estExpose(signature("/wp-config.php.bak"), { statut: 200, debut: page }, null)).toBe(false);
  });

  it("une réponse identique au témoin n'est pas comptée, même si elle ressemble à la signature", () => {
    const envFactice = octets("APP_ENV=production\n");
    expect(estExpose(signature("/.env"), { statut: 200, debut: envFactice }, { statut: 200, debut: envFactice })).toBe(false);
  });

  it("reconnaît .env, .DS_Store et une archive zip par leur contenu", () => {
    expect(estExpose(signature("/.env"), { statut: 200, debut: octets("DB_PASSWORD=secret\n") }, null)).toBe(true);
    const dsStore = new Uint8Array([0, 0, 0, 1, 0x42, 0x75, 0x64, 0x31, 0, 0]);
    expect(estExpose(signature("/.DS_Store"), { statut: 200, debut: dsStore }, null)).toBe(true);
    const zip = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0]);
    expect(estExpose(signature("/backup.zip"), { statut: 200, debut: zip }, null)).toBe(true);
  });

  it("un 403 ou un 404 n'expose rien", () => {
    expect(estExpose(signature("/.git/HEAD"), { statut: 403, debut: octets("ref: refs/heads/main") }, null)).toBe(false);
    expect(estExpose(signature("/.env"), { statut: 404, debut: octets("A=1") }, null)).toBe(false);
  });

  it("synthèse : exposé, conforme, indéterminé", () => {
    const tous = (expose: boolean | null) => FICHIERS_SENSIBLES.map((f) => ({ chemin: f.chemin, expose }));
    expect(evaluerFichiers(tous(false)).statut).toBe("conforme");
    expect(evaluerFichiers(tous(null)).statut).toBe("indetermine");
    const unExpose = tous(false).map((s) => (s.chemin === "/.env" ? { ...s, expose: true } : s));
    const r = evaluerFichiers(unExpose);
    expect(r.statut).toBe("a-corriger");
    expect(r.constat).toContain("/.env");
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
