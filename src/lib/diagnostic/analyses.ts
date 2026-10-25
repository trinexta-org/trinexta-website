import { STATUTS, TITRES_VERIFICATION } from "@/data/diagnostic";
import type { InfoCertificat, ResultatTxt } from "./reseau";
import type { Compteurs, IdVerification, ResultatVerification, StatutDiagnostic } from "./types";

// Logique pure du diagnostic : à partir de ce qui a été observé, le statut et
// les textes. Aucun accès réseau ici, tout est testable sur des exemples.
// Règle : jamais d'affirmation non prouvée. Ce qu'on ne peut pas savoir est
// « indetermine », avec un constat honnête.

const PRIORITE: Record<StatutDiagnostic, number> = {
  "a-corriger": 0,
  "a-surveiller": 1,
  indetermine: 2,
  conforme: 3,
};

function pire(statuts: StatutDiagnostic[]): StatutDiagnostic {
  return statuts.reduce<StatutDiagnostic>((a, b) => (PRIORITE[b] < PRIORITE[a] ? b : a), "conforme");
}

function resultat(
  id: IdVerification,
  statut: StatutDiagnostic,
  constat: string,
  risque: string,
  action: string
): ResultatVerification {
  return { id, titre: TITRES_VERIFICATION[id], statut, constat, risque, action };
}

/** Résultat d'une vérification qui n'a pas pu aboutir. */
export function nonVerifiable(id: IdVerification, constat: string): ResultatVerification {
  return resultat(
    id,
    "indetermine",
    constat,
    "Nous ne pouvons rien conclure sur ce point à partir de l'extérieur.",
    "Relancez l'analyse plus tard, ou demandez à un technicien de vérifier ce point avec vous."
  );
}

const listeFr = (elements: string[]): string =>
  elements.length <= 1 ? (elements[0] ?? "") : `${elements.slice(0, -1).join(", ")} et ${elements[elements.length - 1]}`;

const pluriel = (n: number, singulier: string, plurielForme: string) => (n > 1 ? plurielForme : singulier);

// ---------------------------------------------------------------------------
// 1. Connexion sécurisée
// ---------------------------------------------------------------------------

const JOUR_MS = 24 * 60 * 60 * 1000;
export const SEUIL_EXPIRATION_JOURS = 30;

export type EtatCertificat =
  | { etat: "valide"; jours: number }
  | { etat: "chaine-incomplete"; jours: number }
  | { etat: "expire"; depuis: Date | null }
  | { etat: "invalide"; motif: string };

const MOTIFS_CERTIFICAT: Record<string, string> = {
  ERR_TLS_CERT_ALTNAME_INVALID: "il ne correspond pas à l'adresse du site",
  DEPTH_ZERO_SELF_SIGNED_CERT: "il est auto-signé",
  SELF_SIGNED_CERT_IN_CHAIN: "il est auto-signé",
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY: "l'autorité qui l'a émis n'est pas reconnue",
  CERT_NOT_YET_VALID: "sa période de validité n'a pas commencé",
  CERT_REVOKED: "il a été révoqué",
};

export function evaluerCertificat(info: InfoCertificat, maintenant: Date): EtatCertificat {
  if (info.erreur === "CERT_HAS_EXPIRED" || (info.expireLe && info.expireLe.getTime() <= maintenant.getTime())) {
    return { etat: "expire", depuis: info.expireLe };
  }
  if (!info.autorise && info.erreur === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" && info.expireLe) {
    // Chaîne intermédiaire non envoyée par le serveur : les navigateurs la
    // complètent souvent, d'autres outils (messageries, API) non.
    return {
      etat: "chaine-incomplete",
      jours: Math.floor((info.expireLe.getTime() - maintenant.getTime()) / JOUR_MS),
    };
  }
  if (!info.autorise) {
    return {
      etat: "invalide",
      motif: (info.erreur && MOTIFS_CERTIFICAT[info.erreur]) || "il n'est pas reconnu par les navigateurs",
    };
  }
  if (!info.expireLe) return { etat: "invalide", motif: "sa date d'expiration est illisible" };
  return { etat: "valide", jours: Math.floor((info.expireLe.getTime() - maintenant.getTime()) / JOUR_MS) };
}

export interface EntreeConnexion {
  /** Certificat lu sur le port 443, null si la poignée de main TLS a échoué. */
  certificat: InfoCertificat | null;
  /** La page d'accueil a répondu en HTTPS. */
  httpsRepond: boolean;
  /** Comportement de l'adresse http:// après redirections. */
  http: "redirige-https" | "reste-http" | "injoignable";
  maintenant: Date;
}

const dateFr = (d: Date) =>
  d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });

export function evaluerConnexion(e: EntreeConnexion): ResultatVerification {
  if (!e.certificat && !e.httpsRepond) {
    if (e.http === "reste-http") {
      return resultat(
        "connexion",
        "a-corriger",
        "Le site répond en http:// mais pas en https:// : aucune connexion chiffrée n'est proposée.",
        "Tout ce que vos visiteurs saisissent, formulaire ou mot de passe, circule en clair et peut être lu ou modifié sur le réseau. Les navigateurs affichent « Non sécurisé ».",
        "Installer un certificat (gratuit chez la plupart des hébergeurs), puis rediriger toutes les adresses http:// vers https://."
      );
    }
    return nonVerifiable("connexion", "Le site n'a pas répondu en HTTPS pendant l'analyse.");
  }

  const constats: string[] = [];
  const statuts: StatutDiagnostic[] = [];
  const risques: string[] = [];
  const actions: string[] = [];

  constats.push(e.httpsRepond ? "Le site est servi en HTTPS." : "Le certificat a été lu, mais la page d'accueil n'a pas répondu en HTTPS.");

  if (e.certificat) {
    const cert = evaluerCertificat(e.certificat, e.maintenant);
    if (cert.etat === "expire") {
      statuts.push("a-corriger");
      constats.push(cert.depuis ? `Le certificat a expiré le ${dateFr(cert.depuis)}.` : "Le certificat a expiré.");
      risques.push("Un certificat expiré déclenche une alerte de sécurité dans le navigateur : la plupart des visiteurs repartent.");
      actions.push("Renouveler le certificat sans attendre, puis activer le renouvellement automatique.");
    } else if (cert.etat === "invalide") {
      statuts.push("a-corriger");
      constats.push(`Le certificat n'est pas valide : ${cert.motif}.`);
      risques.push("Le navigateur affiche une alerte de sécurité : la plupart des visiteurs repartent, et ceux qui continuent ne peuvent plus vérifier qu'ils sont bien sur votre site.");
      actions.push("Faire émettre un certificat valide pour cette adresse, chaîne de certification complète comprise.");
    } else if (cert.etat === "chaine-incomplete") {
      statuts.push("a-surveiller");
      constats.push(
        "Le serveur n'envoie pas la chaîne de certification complète. Certains navigateurs la complètent d'eux-mêmes, d'autres outils non."
      );
      risques.push("Selon le navigateur ou l'outil utilisé, une alerte de sécurité peut s'afficher ou la connexion être refusée.");
      actions.push("Configurer le serveur pour qu'il envoie aussi le certificat intermédiaire de l'autorité.");
    } else if (cert.jours < SEUIL_EXPIRATION_JOURS) {
      statuts.push("a-surveiller");
      constats.push(`Le certificat expire dans ${cert.jours} ${pluriel(cert.jours, "jour", "jours")}.`);
      risques.push("Un certificat expiré affiche une alerte qui fait fuir les visiteurs.");
      actions.push("Vérifier que le renouvellement automatique est actif, ou planifier le renouvellement.");
    } else {
      constats.push(`Le certificat est valide encore ${cert.jours} jours.`);
    }
  } else {
    statuts.push("indetermine");
    constats.push("Le certificat n'a pas pu être lu.");
  }

  if (e.http === "redirige-https") {
    constats.push("L'adresse en http:// renvoie bien vers https://.");
  } else if (e.http === "reste-http") {
    statuts.push("a-corriger");
    constats.push("L'adresse en http:// ne renvoie pas vers https://.");
    risques.push("Les visiteurs qui tapent votre adresse sans https:// naviguent sans chiffrement.");
    actions.push("Rediriger toutes les adresses http:// vers https:// dans la configuration du serveur.");
  } else {
    constats.push("Le site ne répond pas en http:// ; les navigateurs récents essaient d'abord https://.");
  }

  const statut = pire(statuts);
  if (statut === "conforme") {
    return resultat(
      "connexion",
      "conforme",
      constats.join(" "),
      "Les échanges avec vos visiteurs sont chiffrés et le navigateur affiche le cadenas.",
      "Aucune action nécessaire. Gardez le renouvellement automatique du certificat."
    );
  }
  if (statut === "indetermine") {
    return resultat(
      "connexion",
      "indetermine",
      constats.join(" "),
      "Nous ne pouvons pas confirmer la validité du certificat depuis l'extérieur.",
      "Ouvrez le site dans un navigateur et vérifiez le cadenas, ou demandez-nous de le vérifier avec vous."
    );
  }
  return resultat("connexion", statut, constats.join(" "), risques.join(" "), actions.join(" "));
}

// ---------------------------------------------------------------------------
// 2. Messagerie : SPF, DKIM, DMARC
// ---------------------------------------------------------------------------

export const SELECTEURS_DKIM = ["selector1", "selector2", "google", "default", "k1", "s1", "mail"] as const;

export type EtatSpf = "ok" | "absent" | "multiple" | "permissif" | "neutre" | "sans-fin" | "erreur";

export function analyserSpf(txt: ResultatTxt): EtatSpf {
  if (txt.etat === "erreur") return "erreur";
  if (txt.etat === "absent") return "absent";
  const spf = txt.enregistrements.filter((r) => /^v=spf1(\s|$)/i.test(r.trim()));
  if (spf.length === 0) return "absent";
  if (spf.length > 1) return "multiple";
  const termes = spf[0].trim().toLowerCase().split(/\s+/);
  // « all » sans qualificatif vaut « +all » : tout serveur est autorisé.
  if (termes.includes("+all") || termes.includes("all")) return "permissif";
  if (termes.includes("?all")) return "neutre";
  if (termes.some((t) => /^[-~]all$/.test(t))) return "ok";
  // Sans « all » ni « redirect= », le SPF ne dit rien des serveurs non listés.
  if (termes.some((t) => t.startsWith("redirect="))) return "ok";
  return "sans-fin";
}

export type EtatDmarc = "ok" | "observation" | "absent" | "invalide" | "erreur";

export function analyserDmarc(txt: ResultatTxt): EtatDmarc {
  if (txt.etat === "erreur") return "erreur";
  if (txt.etat === "absent") return "absent";
  const dmarc = txt.enregistrements.filter((r) => /^v=DMARC1\s*(;|$)/i.test(r.trim()));
  if (dmarc.length === 0) return "absent";
  if (dmarc.length > 1) return "invalide";
  const politique = /(?:^|;)\s*p\s*=\s*([a-z]+)/i.exec(dmarc[0])?.[1]?.toLowerCase();
  if (politique === "reject" || politique === "quarantine") return "ok";
  if (politique === "none") return "observation";
  return "invalide";
}

/** true si l'enregistrement est une clé DKIM publiée (clé non vide). */
export function estCleDkim(txt: ResultatTxt): boolean | null {
  if (txt.etat === "erreur") return null;
  if (txt.etat === "absent") return false;
  return txt.enregistrements.some((r) => /(?:^|;)\s*p\s*=\s*[A-Za-z0-9+/]{16,}/.test(r));
}

export interface EntreeMessagerie {
  domaine: string;
  /** Domaine dont la politique DMARC a été lue (parent pour un sous-domaine). */
  domaineDmarc?: string;
  spf: ResultatTxt;
  dmarc: ResultatTxt;
  /** Résultat par sélecteur testé. */
  dkim: { selecteur: string; trouve: boolean | null }[];
}

export function evaluerMessagerie(e: EntreeMessagerie): ResultatVerification {
  const spf = analyserSpf(e.spf);
  const dmarc = analyserDmarc(e.dmarc);
  const dkimTrouves = e.dkim.filter((d) => d.trouve === true).map((d) => d.selecteur);
  const dkimErreurs = e.dkim.filter((d) => d.trouve === null).length;

  if (spf === "erreur" && dmarc === "erreur") {
    return nonVerifiable("messagerie", `Les serveurs DNS de ${e.domaine} n'ont pas répondu pendant l'analyse.`);
  }

  const constats: string[] = [];
  const statuts: StatutDiagnostic[] = [];
  const actions: string[] = [];

  switch (spf) {
    case "ok":
      constats.push("SPF est présent.");
      break;
    case "absent":
      statuts.push("a-corriger");
      constats.push("Aucun enregistrement SPF n'est publié.");
      actions.push("Publier un enregistrement SPF qui liste vos serveurs d'envoi et se termine par ~all ou -all.");
      break;
    case "multiple":
      statuts.push("a-corriger");
      constats.push("Plusieurs enregistrements SPF sont publiés : les serveurs de réception les considèrent alors comme invalides.");
      actions.push("Fusionner les enregistrements SPF en un seul.");
      break;
    case "permissif":
      statuts.push("a-corriger");
      constats.push("L'enregistrement SPF se termine par +all : il autorise n'importe quel serveur à envoyer en votre nom.");
      actions.push("Remplacer +all par ~all ou -all dans l'enregistrement SPF.");
      break;
    case "sans-fin":
      statuts.push("a-surveiller");
      constats.push("L'enregistrement SPF ne se termine ni par « all » ni par une redirection : il ne dit rien des serveurs non autorisés.");
      actions.push("Terminer l'enregistrement SPF par ~all ou -all.");
      break;
    case "neutre":
      statuts.push("a-surveiller");
      constats.push("L'enregistrement SPF se termine par ?all : il ne demande aucun traitement aux messages non autorisés.");
      actions.push("Terminer l'enregistrement SPF par ~all ou -all.");
      break;
    case "erreur":
      statuts.push("indetermine");
      constats.push("SPF n'a pas pu être vérifié (DNS sans réponse).");
      break;
  }

  if (dkimTrouves.length > 0) {
    constats.push(`DKIM est présent (sélecteur ${dkimTrouves.join(", ")}).`);
  } else if (dkimErreurs === e.dkim.length) {
    statuts.push("indetermine");
    constats.push("DKIM n'a pas pu être vérifié (DNS sans réponse).");
  } else {
    statuts.push("a-surveiller");
    constats.push(
      "DKIM non trouvé parmi les sélecteurs courants. Votre messagerie peut en utiliser un autre : seul votre fournisseur peut le confirmer."
    );
    actions.push("Vérifier dans la console de votre messagerie que la signature DKIM est activée.");
  }

  switch (dmarc) {
    case "ok":
      constats.push("Une politique DMARC est publiée et appliquée.");
      break;
    case "observation":
      statuts.push("a-surveiller");
      constats.push("Une politique DMARC est publiée, mais en simple observation (p=none) : les faux messages ne sont pas bloqués.");
      actions.push("Après quelques semaines d'observation des rapports, passer la politique DMARC en quarantine puis reject.");
      break;
    case "absent":
      statuts.push("a-corriger");
      constats.push("Aucune politique DMARC n'est publiée.");
      actions.push("Publier une politique DMARC, d'abord en observation (p=none), puis la durcir.");
      break;
    case "invalide":
      statuts.push("a-corriger");
      constats.push("L'enregistrement DMARC est mal formé et ne sera pas appliqué.");
      actions.push("Corriger l'enregistrement DMARC (une seule entrée, avec une politique p= valide).");
      break;
    case "erreur":
      statuts.push("indetermine");
      constats.push("DMARC n'a pas pu être vérifié (DNS sans réponse).");
      break;
  }

  if (e.domaineDmarc && e.domaineDmarc !== e.domaine && (dmarc === "ok" || dmarc === "observation")) {
    constats.push(`La politique DMARC appliquée est celle du domaine parent ${e.domaineDmarc}.`);
  }

  const statut = pire(statuts);
  if (statut === "conforme") {
    return resultat(
      "messagerie",
      "conforme",
      constats.join(" "),
      "Les serveurs de réception peuvent reconnaître et écarter les faux e-mails envoyés en votre nom.",
      "Aucune action nécessaire. Lisez de temps en temps les rapports DMARC."
    );
  }
  if (statut === "indetermine") {
    return resultat(
      "messagerie",
      "indetermine",
      constats.join(" "),
      "Une partie des protections de votre messagerie n'a pas pu être vérifiée.",
      "Relancez l'analyse plus tard, ou demandez-nous de vérifier votre zone DNS avec vous."
    );
  }
  return resultat(
    "messagerie",
    statut,
    constats.join(" "),
    statut === "a-corriger"
      ? "N'importe qui peut envoyer un e-mail qui semble venir de votre entreprise : c'est la porte d'entrée des fraudes au virement et des fausses factures."
      : "Vos protections existent mais restent incomplètes : un faux e-mail à votre nom a plus de chances d'arriver chez vos clients.",
    actions.join(" ")
  );
}

// ---------------------------------------------------------------------------
// 3. En-têtes de sécurité
// ---------------------------------------------------------------------------

export const ENTETES_SECURITE = [
  { cle: "csp", libelle: "la politique de sécurité du contenu (Content-Security-Policy)" },
  { cle: "hsts", libelle: "l'obligation du HTTPS (Strict-Transport-Security)" },
  { cle: "cadre", libelle: "la protection contre l'intégration dans d'autres sites (X-Frame-Options)" },
  { cle: "nosniff", libelle: "le blocage de l'interprétation des types de fichiers (X-Content-Type-Options)" },
  { cle: "referrer", libelle: "le contrôle des informations transmises aux autres sites (Referrer-Policy)" },
  { cle: "permissions", libelle: "la restriction des fonctions du navigateur (Permissions-Policy)" },
] as const

export type CleEntete = (typeof ENTETES_SECURITE)[number]["cle"];

/** Protections présentes parmi les six, d'après les en-têtes de la page d'accueil. */
export function analyserEntetes(entetes: Headers): Record<CleEntete, boolean> {
  const csp = entetes.get("content-security-policy")?.trim() ?? "";
  const hsts = entetes.get("strict-transport-security") ?? "";
  const maxAge = Number(/max-age\s{0,10}=\s{0,10}"?(\d{1,12})/i.exec(hsts.slice(0, 500))?.[1] ?? "0");
  // En-têtes dupliqués (« nosniff, nosniff ») : on juge la première valeur.
  const premiere = (nom: string) => (entetes.get(nom) ?? "").split(",")[0].trim().toLowerCase();
  const xfo = premiere("x-frame-options");
  return {
    csp: csp !== "",
    hsts: maxAge > 0,
    cadre: xfo === "deny" || xfo === "sameorigin" || /(?:^|;)\s{0,20}frame-ancestors\s/i.test(csp),
    nosniff: premiere("x-content-type-options") === "nosniff",
    referrer: (entetes.get("referrer-policy")?.trim() ?? "") !== "",
    permissions: (entetes.get("permissions-policy")?.trim() ?? "") !== "",
  };
}

export function evaluerEntetes(presence: Record<CleEntete, boolean>): ResultatVerification {
  const manquantes = ENTETES_SECURITE.filter((e) => !presence[e.cle]).map((e) => e.libelle);
  const n = ENTETES_SECURITE.length - manquantes.length;
  if (manquantes.length === 0) {
    return resultat(
      "entetes",
      "conforme",
      "6 protections sur 6 sont actives.",
      "Le navigateur de vos visiteurs applique toutes les protections que le serveur peut lui demander.",
      "Aucune action nécessaire. Revérifiez après chaque changement d'hébergement ou de configuration."
    );
  }
  const statut: StatutDiagnostic = n >= 4 ? "a-surveiller" : "a-corriger";
  return resultat(
    "entetes",
    statut,
    `${n} ${pluriel(n, "protection", "protections")} sur 6 ${pluriel(n, "est active", "sont actives")}. ${pluriel(
      manquantes.length,
      "Manque",
      "Manquent"
    )} ${listeFr(manquantes)}.`,
    "Le site est plus exposé à l'injection de contenu malveillant et à l'usurpation de son affichage dans une page piégée.",
    "Ajouter les en-têtes manquants dans la configuration du serveur ou de l'hébergement : une intervention courte, à tester avant mise en ligne."
  );
}

// ---------------------------------------------------------------------------
// 4. Cookies et traceurs
// ---------------------------------------------------------------------------

// Toutes les expressions de ce fichier s'appliquent à du contenu fourni par le
// site analysé : quantificateurs bornés, jamais de classe ouverte qui puisse
// courir jusqu'à la fin du document (sinon temps quadratique, boucle bloquée).
export const TRACEURS: { nom: string; motif: RegExp }[] = [
  { nom: "Google Tag Manager", motif: /googletagmanager\.com\/gtm\.js|['"]GTM-[A-Z0-9]{4,12}['"]/ },
  {
    nom: "Google Analytics",
    motif: /googletagmanager\.com\/gtag\/js\?id=(?:G|UA)-|google-analytics\.com\/(?:analytics|ga)\.js|gtag\(\s{0,10}['"]config['"]\s{0,10},\s{0,10}['"](?:G|UA)-/,
  },
  {
    nom: "Google Ads",
    motif: /googletagmanager\.com\/gtag\/js\?id=AW-|gtag\(\s{0,10}['"]config['"]\s{0,10},\s{0,10}['"]AW-|googleadservices\.com|googlesyndication\.com|doubleclick\.net/,
  },
  {
    nom: "Meta Pixel",
    motif: /connect\.facebook\.net\/[^"'<>\s]{0,200}fbevents\.js|fbq\(\s{0,10}['"]init['"]/,
  },
  { nom: "LinkedIn Insight", motif: /snap\.licdn\.com\/li\.lms-analytics|_linkedin_partner_id/ },
  { nom: "Hotjar", motif: /static\.hotjar\.com|_hjSettings/ },
  {
    nom: "Microsoft Clarity",
    motif: /clarity\.ms\/tag|\(\s{0,10}window\s{0,10},\s{0,10}document\s{0,10},\s{0,10}["']clarity["']/,
  },
];

export const OUTILS_CONSENTEMENT: { nom: string; motif: RegExp }[] = [
  { nom: "tarteaucitron", motif: /tarteaucitron/i },
  { nom: "Axeptio", motif: /axept\.io|axeptioSettings/i },
  { nom: "Didomi", motif: /privacy-center\.org|didomiConfig|didomi/i },
  { nom: "Cookiebot", motif: /consent\.cookiebot\.(?:com|eu)|cookiebot/i },
  { nom: "OneTrust", motif: /cdn\.cookielaw\.org|optanon|onetrust/i },
  { nom: "CookieYes", motif: /cookieyes/i },
  { nom: "Complianz", motif: /complianz|cmplz/i },
];

/** Cookies connus de mesure ou de publicité (préfixes, ou nom exact pour IDE). */
const COOKIES_TRACEURS = /^(?:IDE$|_ga|_gid|_gat|_gcl_|_fbp|_fbc|_hj|_clck|_clsk|li_|lidc|bcookie|test_cookie)/;

/** Nom de cookie affichable tel quel ; tout le reste est remplacé. */
const NOM_COOKIE = /^[A-Za-z0-9_.-]{1,40}$/;
export const COOKIE_NON_STANDARD = "cookie au nom non standard";
const MAX_COOKIES = 50;

export function detecterTraceurs(html: string): string[] {
  return TRACEURS.filter((t) => t.motif.test(html)).map((t) => t.nom);
}

export function detecterConsentement(html: string): string[] {
  return OUTILS_CONSENTEMENT.filter((o) => o.motif.test(html)).map((o) => o.nom);
}

/**
 * Noms des cookies déposés par la réponse elle-même (en-têtes Set-Cookie).
 * Aucun texte libre du site analysé ne ressort : un nom hors liste blanche
 * devient « cookie au nom non standard ».
 */
export function cookiesDeposes(entetes: Headers): string[] {
  const valeurs = typeof entetes.getSetCookie === "function" ? entetes.getSetCookie().slice(0, MAX_COOKIES) : [];
  const noms = valeurs.map((v) => {
    const nom = v.slice(0, 200).split("=")[0]?.trim() ?? "";
    return NOM_COOKIE.test(nom) ? nom : COOKIE_NON_STANDARD;
  });
  return [...new Set(noms)];
}

export function evaluerTraceurs(html: string, cookies: string[]): ResultatVerification {
  const traceurs = detecterTraceurs(html);
  const consentement = detecterConsentement(html);
  const cookiesTraceurs = cookies.filter((c) => c !== COOKIE_NON_STANDARD && COOKIES_TRACEURS.test(c));

  const phraseCookies =
    cookies.length === 0
      ? "Le serveur ne dépose aucun cookie à l'arrivée sur la page."
      : `Le serveur dépose ${cookies.length} ${pluriel(cookies.length, "cookie", "cookies")} dès l'arrivée (${cookies
          .slice(0, 5)
          .join(", ")}${cookies.length > 5 ? "…" : ""}).`;

  if (cookiesTraceurs.length > 0) {
    return resultat(
      "traceurs",
      "a-corriger",
      `${phraseCookies} Parmi eux, ${listeFr(cookiesTraceurs)} ${pluriel(
        cookiesTraceurs.length,
        "est un cookie",
        "sont des cookies"
      )} de mesure ou de publicité, déposé${cookiesTraceurs.length > 1 ? "s" : ""} avant tout choix du visiteur.`,
      "C'est contraire aux règles de la CNIL : le consentement doit précéder tout traceur non indispensable.",
      "Ne déposer ces cookies qu'après l'accord du visiteur, et rendre le refus aussi simple que l'acceptation."
    );
  }

  if (traceurs.length === 0) {
    return resultat(
      "traceurs",
      "conforme",
      `Aucun outil de mesure ou de publicité connu n'apparaît dans le code de la page d'accueil. ${phraseCookies}`,
      "Rien à signaler sur ce point. Des outils chargés plus tard par un script ne sont pas visibles depuis l'extérieur.",
      "Aucune action nécessaire. À revérifier si vous ajoutez un outil de mesure ou de publicité."
    );
  }

  const constatTraceurs = `Le code de la page d'accueil fait appel à ${listeFr(traceurs)}.`;
  if (consentement.length === 0) {
    return resultat(
      "traceurs",
      "a-corriger",
      `${constatTraceurs} Nous n'y avons reconnu aucun outil de recueil du consentement. ${phraseCookies}`,
      "Si ces outils se déclenchent avant l'accord du visiteur, c'est contraire aux règles de la CNIL : le consentement doit précéder tout traceur non indispensable.",
      "Installer un outil de consentement et ne charger ces outils qu'après accord, avec un refus aussi simple que l'acceptation."
    );
  }
  return resultat(
    "traceurs",
    "a-surveiller",
    `${constatTraceurs} Un outil de consentement est présent (${listeFr(consentement)}). ${phraseCookies}`,
    "Sans exécuter le site, nous ne pouvons pas vérifier que ces outils attendent bien l'accord du visiteur.",
    "Vérifiez qu'ils attendent l'accord : en navigation privée, refusez les cookies et contrôlez qu'aucune requête ne part vers ces services."
  );
}

// ---------------------------------------------------------------------------
// 5. Fichiers sensibles exposés
// ---------------------------------------------------------------------------

const decodeur = new TextDecoder("utf-8", { fatal: false });
const debut = (octets: Uint8Array) => decodeur.decode(octets.subarray(0, 512));

/**
 * Fichiers testés. `contenu` : quelques octets lus pour confirmer le format
 * (seulement /.git/HEAD, dont le contenu n'est pas secret). `entete` : requête
 * HEAD uniquement, jamais de lecture ; jugement sur le type et la taille.
 */
export type FichierSensible =
  | { chemin: string; libelle: string; mode: "contenu"; signature: (octets: Uint8Array) => boolean }
  | { chemin: string; libelle: string; mode: "entete"; types: string[] };

export const FICHIERS_SENSIBLES: FichierSensible[] = [
  {
    chemin: "/.git/HEAD",
    libelle: "l'historique du code (/.git/)",
    mode: "contenu",
    signature: (o) => /^(?:ref:[ \t]{0,5}refs\/|[0-9a-f]{40}\s{0,4}$)/.test(debut(o)),
  },
  {
    chemin: "/.env",
    libelle: "le fichier de configuration /.env",
    mode: "entete",
    types: ["text/plain", "application/octet-stream"],
  },
  {
    chemin: "/wp-config.php.bak",
    libelle: "une copie de la configuration WordPress (/wp-config.php.bak)",
    mode: "entete",
    types: ["text/plain", "application/octet-stream"],
  },
  {
    chemin: "/.DS_Store",
    libelle: "un fichier d'index macOS (/.DS_Store), qui liste le contenu des dossiers",
    mode: "entete",
    types: ["application/octet-stream"],
  },
  {
    chemin: "/backup.zip",
    libelle: "une archive de sauvegarde (/backup.zip)",
    mode: "entete",
    types: ["application/zip", "application/x-zip-compressed", "application/octet-stream"],
  },
];

export interface ReponseSonde {
  statut: number;
  /** 512 premiers octets au plus (mode contenu), jamais conservés. */
  debut: Uint8Array;
}

export interface ReponseEntete {
  statut: number;
  /** Type MIME sans paramètres, en minuscules. */
  type: string;
  /** Content-Length, null s'il est absent ou illisible. */
  taille: number | null;
}

export function lireEntete(statut: number, entetes: Headers): ReponseEntete {
  const type = (entetes.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  const brut = (entetes.get("content-length") ?? "").trim();
  const taille = /^\d{1,15}$/.test(brut) ? Number(brut) : null;
  return { statut, type, taille };
}

function memesOctets(a: Uint8Array, b: Uint8Array): boolean {
  return a.byteLength === b.byteLength && a.every((v, i) => v === b[i]);
}

/**
 * Mode contenu : réponse 200, contenu conforme à la signature, et différent de
 * ce que renvoie une adresse inexistante (sites qui répondent 200 partout).
 */
export function estExpose(
  signature: (octets: Uint8Array) => boolean,
  reponse: ReponseSonde,
  temoin: ReponseSonde | null
): boolean {
  if (reponse.statut !== 200) return false;
  if (!signature(reponse.debut)) return false;
  if (temoin && temoin.statut === 200 && memesOctets(temoin.debut, reponse.debut)) return false;
  return true;
}

/**
 * Mode en-tête (sans lecture) : « semble exposé » si 200, type attendu, taille
 * non nulle, et réponse différente de celle d'une adresse inexistante.
 */
export function sembleExpose(types: string[], reponse: ReponseEntete, temoin: ReponseEntete | null): boolean {
  if (reponse.statut !== 200) return false;
  if (!types.includes(reponse.type)) return false;
  if (reponse.taille === null || reponse.taille <= 0) return false;
  if (temoin && temoin.statut === 200 && temoin.type === reponse.type && temoin.taille === reponse.taille) return false;
  return true;
}

export type EtatSonde = "expose" | "probable" | "non" | null;

export function evaluerFichiers(sondes: { chemin: string; etat: EtatSonde }[]): ResultatVerification {
  const libelles = (etat: EtatSonde) =>
    FICHIERS_SENSIBLES.filter((f) => sondes.some((s) => s.chemin === f.chemin && s.etat === etat)).map((f) => f.libelle);
  const exposes = libelles("expose");
  const probables = libelles("probable");
  const echecs = sondes.filter((s) => s.etat === null).length;

  if (exposes.length > 0 || probables.length > 0) {
    const constats: string[] = [];
    if (exposes.length > 0) {
      constats.push(`Accessible publiquement : ${listeFr(exposes)}.`);
    }
    if (probables.length > 0) {
      constats.push(
        `${pluriel(probables.length, "Semble accessible", "Semblent accessibles")} publiquement : ${listeFr(
          probables
        )}. Le serveur répond avec un fichier non vide du type attendu ; nous n'en avons pas lu le contenu.`
      );
    }
    constats.push("Rien n'a été conservé.");
    return resultat(
      "fichiers",
      exposes.length > 0 ? "a-corriger" : "a-surveiller",
      constats.join(" "),
      "Ces fichiers peuvent contenir des mots de passe, des clés d'accès ou le code complet du site : les robots les recherchent en permanence.",
      exposes.length > 0
        ? "Bloquer l'accès à ces fichiers sur le serveur dès aujourd'hui, puis changer les mots de passe et clés qu'ils contiennent : ils doivent être considérés comme connus."
        : "Vérifier sans attendre en ouvrant ces adresses. Si le fichier s'affiche ou se télécharge, bloquer son accès sur le serveur et changer les mots de passe et clés qu'il contient."
    );
  }
  if (echecs === sondes.length) {
    return nonVerifiable("fichiers", "Le site n'a pas répondu aux vérifications de fichiers pendant l'analyse.");
  }
  if (echecs > 0) {
    return nonVerifiable(
      "fichiers",
      `Aucun fichier sensible exposé parmi ${sondes.length - echecs} adresses vérifiées, mais ${echecs} ${pluriel(
        echecs,
        "vérification n'a",
        "vérifications n'ont"
      )} pas abouti.`
    );
  }
  return resultat(
    "fichiers",
    "conforme",
    "Aucun fichier de configuration, de sauvegarde ou d'historique de code n'est accessible parmi ceux que nous vérifions.",
    "Rien à signaler sur ce point.",
    "Aucune action nécessaire."
  );
}

// ---------------------------------------------------------------------------
// 6. Logiciels et versions affichées
// ---------------------------------------------------------------------------

export interface LogicielAffiche {
  source: "Server" | "X-Powered-By" | "generator";
  /** Valeur affichable (liste blanche de caractères), sinon VALEUR_NON_AFFICHEE. */
  valeur: string;
  version: boolean;
}

export const VALEUR_NON_AFFICHEE = "valeur non affichée";
const VALEUR_AFFICHABLE = /^[A-Za-z0-9 ._/()-]{1,40}$/;
const VERSION = /\d{1,6}\.\d{1,6}|\/\s{0,3}\d/;
const MAX_GENERATEURS = 5;

/** Contenu de toutes les balises <meta name="generator">. */
export function metaGenerators(html: string): string[] {
  const valeurs: string[] = [];
  for (const balise of html.match(/<meta\b[^<>]{0,2000}>/gi) ?? []) {
    if (!/\bname\s{0,10}=\s{0,10}["']?generator["'\s>/]/i.test(balise)) continue;
    const contenu = /\bcontent\s{0,10}=\s{0,10}(?:"([^"<>]{0,500})"|'([^'<>]{0,500})')/i.exec(balise);
    const valeur = (contenu?.[1] ?? contenu?.[2] ?? "").trim();
    if (valeur) valeurs.push(valeur);
    if (valeurs.length >= MAX_GENERATEURS) break;
  }
  return valeurs;
}

export function detecterLogiciels(entetes: Headers, html: string): LogicielAffiche[] {
  const sorties: LogicielAffiche[] = [];
  const ajouter = (source: LogicielAffiche["source"], brut: string | null) => {
    const v = brut?.trim().slice(0, 200);
    if (!v) return;
    sorties.push({
      source,
      valeur: VALEUR_AFFICHABLE.test(v) ? v : VALEUR_NON_AFFICHEE,
      version: VERSION.test(v),
    });
  };
  ajouter("Server", entetes.get("server"));
  ajouter("X-Powered-By", entetes.get("x-powered-by"));
  for (const g of metaGenerators(html)) ajouter("generator", g);
  return sorties;
}

const SOURCE_FR: Record<LogicielAffiche["source"], string> = {
  Server: "l'en-tête Server",
  "X-Powered-By": "l'en-tête X-Powered-By",
  generator: "la balise generator de la page",
};

const citer = (l: LogicielAffiche) => (l.valeur === VALEUR_NON_AFFICHEE ? `une ${VALEUR_NON_AFFICHEE}` : `« ${l.valeur} »`);

export function evaluerVersions(logiciels: LogicielAffiche[]): ResultatVerification {
  const avecVersion = logiciels.filter((l) => l.version);
  if (avecVersion.length > 0) {
    return resultat(
      "versions",
      "a-corriger",
      `Le site affiche publiquement des numéros de version : ${listeFr(
        avecVersion.map((l) => `${citer(l)} dans ${SOURCE_FR[l.source]}`)
      )}.`,
      "Les robots recherchent en permanence les versions qui ont des failles connues : un numéro affiché leur indique directement quoi tenter.",
      "Masquer les numéros de version dans la configuration du serveur et du site, et vérifier que ces logiciels sont à jour."
    );
  }
  if (logiciels.length > 0) {
    return resultat(
      "versions",
      "conforme",
      `Le site indique ${listeFr(logiciels.map(citer))}, sans numéro de version.`,
      "Le nom seul donne peu d'informations exploitables.",
      "Aucune action nécessaire. Gardez ces logiciels à jour."
    );
  }
  return resultat(
    "versions",
    "conforme",
    "Le site n'affiche ni logiciel ni numéro de version.",
    "Rien à signaler sur ce point.",
    "Aucune action nécessaire."
  );
}

// ---------------------------------------------------------------------------
// Synthèse
// ---------------------------------------------------------------------------

/** Tri d'affichage : à corriger, à surveiller, non vérifiable, conforme. */
export function trierResultats(resultats: ResultatVerification[]): ResultatVerification[] {
  return [...resultats].sort((a, b) => PRIORITE[a.statut] - PRIORITE[b.statut]);
}

export function compter(resultats: ResultatVerification[]): Compteurs {
  const compteurs = Object.fromEntries(STATUTS.map((s) => [s, 0])) as Compteurs;
  for (const r of resultats) compteurs[r.statut] += 1;
  return compteurs;
}
