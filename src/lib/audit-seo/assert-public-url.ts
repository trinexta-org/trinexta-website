import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

// Garde-fou anti-SSRF maison. N'autorise qu'une URL http(s) dont le domaine
// résout vers une adresse publique. Rejette toute IP privée, loopback ou
// link-local (v4 et v6), et re-vérifie l'adresse après chaque redirection
// (le fetch bridé rappelle assertPublicUrl sur chaque saut).

/** Erreur d'URL refusée par le garde-fou. Message affichable côté prospect. */
export class AuditUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuditUrlError";
  }
}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const n = Number(part);
    if (n > 255) return null;
    result = result * 256 + n;
  }
  return result >>> 0;
}

function inRange(value: number, base: string, bits: number): boolean {
  const b = ipv4ToInt(base)!;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (value & mask) === (b & mask);
}

function isPrivateIpv4Int(n: number): boolean {
  return (
    inRange(n, "0.0.0.0", 8) || // "ce" réseau
    inRange(n, "10.0.0.0", 8) || // privé
    inRange(n, "100.64.0.0", 10) || // CGNAT
    inRange(n, "127.0.0.0", 8) || // loopback
    inRange(n, "169.254.0.0", 16) || // link-local
    inRange(n, "172.16.0.0", 12) || // privé
    inRange(n, "192.0.0.0", 24) || // IETF
    inRange(n, "192.0.2.0", 24) || // documentation
    inRange(n, "192.168.0.0", 16) || // privé
    inRange(n, "198.18.0.0", 15) || // benchmarking
    inRange(n, "198.51.100.0", 24) || // documentation
    inRange(n, "203.0.113.0", 24) || // documentation
    inRange(n, "224.0.0.0", 4) || // multicast
    inRange(n, "240.0.0.0", 4) // réservé
  );
}

/** Décompose une adresse IPv6 en 8 groupes de 16 bits, ou null si invalide. */
function parseIpv6Groups(ip: string): number[] | null {
  let s = ip;
  const zone = s.indexOf("%");
  if (zone !== -1) s = s.slice(0, zone);

  // IPv4 embarquée en queue (ex. ::ffff:192.168.0.1) : on la convertit en
  // deux groupes hexadécimaux pour uniformiser l'analyse.
  if (s.includes(".")) {
    const lastColon = s.lastIndexOf(":");
    if (lastColon === -1) return null;
    const v4 = ipv4ToInt(s.slice(lastColon + 1));
    if (v4 === null) return null;
    const hi = ((v4 >>> 16) & 0xffff).toString(16);
    const lo = (v4 & 0xffff).toString(16);
    s = s.slice(0, lastColon + 1) + hi + ":" + lo;
  }

  const halves = s.split("::");
  if (halves.length > 2) return null;

  const toGroups = (part: string): number[] | null => {
    if (part === "") return [];
    const out: number[] = [];
    for (const g of part.split(":")) {
      if (!/^[0-9a-fA-F]{1,4}$/.test(g)) return null;
      out.push(parseInt(g, 16));
    }
    return out;
  };

  const head = toGroups(halves[0]);
  if (head === null) return null;

  if (halves.length === 1) {
    return head.length === 8 ? head : null;
  }

  const tail = toGroups(halves[1]);
  if (tail === null) return null;
  const fill = 8 - head.length - tail.length;
  if (fill < 1) return null; // "::" représente au moins un groupe nul
  return [...head, ...new Array<number>(fill).fill(0), ...tail];
}

function embeddedIpv4IsPrivate(g: number[]): boolean {
  return isPrivateIpv4Int((((g[6] << 16) | g[7]) >>> 0));
}

function isPrivateIpv6(g: number[]): boolean {
  const firstSixZero = g[0] === 0 && g[1] === 0 && g[2] === 0 && g[3] === 0 && g[4] === 0;
  // :: (non spécifiée)
  if (firstSixZero && g[5] === 0 && g[6] === 0 && g[7] === 0) return true;
  // ::1 (loopback)
  if (firstSixZero && g[5] === 0 && g[6] === 0 && g[7] === 1) return true;
  // ::ffff:x.x.x.x (IPv4-mapped) → on juge l'IPv4 embarquée
  if (firstSixZero && g[5] === 0xffff) return embeddedIpv4IsPrivate(g);
  // ::x.x.x.x (IPv4-compatible, dépréciée) → idem
  if (firstSixZero && g[5] === 0) return embeddedIpv4IsPrivate(g);
  // 64:ff9b::/96 (NAT64) → idem
  if (g[0] === 0x64 && g[1] === 0xff9b && g[2] === 0 && g[3] === 0 && g[4] === 0 && g[5] === 0) {
    return embeddedIpv4IsPrivate(g);
  }
  if ((g[0] & 0xfe00) === 0xfc00) return true; // fc00::/7 ULA
  if ((g[0] & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((g[0] & 0xff00) === 0xff00) return true; // ff00::/8 multicast
  return false;
}

/**
 * true si l'adresse IP est privée, loopback, link-local ou non routable.
 * Une entrée qui n'est pas une IP valide est considérée non sûre (true).
 */
export function isPrivateIp(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return isPrivateIpv4Int(ipv4ToInt(ip)!);
  if (kind === 6) {
    const groups = parseIpv6Groups(ip);
    return groups === null ? true : isPrivateIpv6(groups);
  }
  return true;
}

export interface AssertPublicUrlOptions {
  /** Résolveur DNS injectable pour les tests. Défaut : dns.lookup système. */
  resolve?: (hostname: string) => Promise<string[]>;
}

async function systemResolve(hostname: string): Promise<string[]> {
  const results = await lookup(hostname, { all: true });
  return results.map((r) => r.address);
}

/**
 * Valide une URL cible : schéma http(s), hôte public. Résout le domaine et
 * rejette si une seule des adresses résolues est privée/loopback/link-local.
 * Retourne l'URL parsée. Lève AuditUrlError si l'URL est refusée.
 */
export async function assertPublicUrl(
  rawUrl: string,
  options: AssertPublicUrlOptions = {}
): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new AuditUrlError("URL invalide");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new AuditUrlError("Seules les URL http(s) sont acceptées");
  }

  // hostname d'une IPv6 littérale est entre crochets dans une URL.
  const hostname = url.hostname.replace(/^\[/, "").replace(/\]$/, "");
  if (!hostname) throw new AuditUrlError("Hôte manquant");

  // IP littérale : contrôle direct, pas de DNS.
  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new AuditUrlError("Adresse IP non autorisée");
    return url;
  }

  const resolve = options.resolve ?? systemResolve;
  let addresses: string[];
  try {
    addresses = await resolve(hostname);
  } catch {
    throw new AuditUrlError("Domaine introuvable");
  }
  if (addresses.length === 0) throw new AuditUrlError("Domaine introuvable");
  for (const addr of addresses) {
    if (isPrivateIp(addr)) throw new AuditUrlError("Le domaine pointe vers une adresse non autorisée");
  }
  return url;
}
