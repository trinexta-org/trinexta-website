// Pré-chauffe le cache d'optimisation d'images de Next.
//
// L'encodage AVIF d'un fond de hero coûte 1,5 à 3 s. Sans pré-chauffage, c'est
// le premier visiteur après chaque déploiement qui paie cette attente, sur
// l'image LCP de la page. Le script parcourt les pages du sitemap, récupère les
// images marquées `preload` (donc les LCP) et rejoue chaque variante pour
// qu'elle soit déjà en cache.
//
// On passe par le serveur plutôt que par le HTML prérendu : les pages
// dynamiques (/blog, /blog/[slug]) n'ont pas de fichier .html sur disque.
//
// Usage : node scripts/prewarm-images.mjs [baseUrl]

const BASE_URL = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const ACCEPT_IMAGE = "image/avif,image/webp,image/apng,*/*";

const decodeHtml = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");

// pm2 startOrReload rend la main avant que le process Next n'accepte des
// connexions ; sans ça le premier fetch échoue et `|| true` masque tout le
// pré-chauffage au lieu de juste l'absence d'images LCP en cache.
async function waitForServer(maxAttempts = 15, delayMs = 2000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/sitemap.xml`);
      if (res.ok) return;
      console.warn(`  serveur pas pret (HTTP ${res.status}), tentative ${attempt}/${maxAttempts}`);
    } catch (err) {
      console.warn(`  serveur pas pret (${err.message}), tentative ${attempt}/${maxAttempts}`);
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`serveur indisponible sur ${BASE_URL} apres ${maxAttempts} tentatives`);
}

async function getRoutes() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml : HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeHtml(m[1]));
  // Le sitemap porte l'URL publique ; on ne garde que le chemin pour taper
  // sur le serveur local qu'on vient de démarrer.
  return [...new Set(locs.map((u) => new URL(u).pathname))];
}

function extractPreloadedImages(html) {
  const urls = [];
  const links = html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g) ?? [];
  for (const link of links) {
    const srcSet = link.match(/imageSrcSet="([^"]+)"/i)?.[1];
    if (srcSet) {
      for (const candidate of srcSet.split(",")) {
        const path = candidate.trim().split(/\s+/)[0];
        if (path?.startsWith("/_next/image")) urls.push(decodeHtml(path));
      }
      continue;
    }
    const href = link.match(/href="([^"]+)"/i)?.[1];
    if (href?.startsWith("/_next/image")) urls.push(decodeHtml(href));
  }
  return urls;
}

await waitForServer();
const routes = await getRoutes();
console.log(`${routes.length} pages à inspecter sur ${BASE_URL}`);

const variants = new Set();
for (const route of routes) {
  try {
    const res = await fetch(BASE_URL + route);
    if (!res.ok) {
      console.warn(`  ${res.status} ${route}`);
      continue;
    }
    for (const url of extractPreloadedImages(await res.text())) variants.add(url);
  } catch (err) {
    console.warn(`  échec ${route} : ${err.message}`);
  }
}

if (variants.size === 0) {
  console.log("Aucune image preload trouvée - rien à pré-chauffer.");
  process.exit(0);
}

console.log(`Pré-chauffage de ${variants.size} variantes`);

let ok = 0;
let failed = 0;
const started = Date.now();

// Séquentiel : l'encodage AVIF sature le CPU, le paralléliser sur un VPS
// modeste ralentirait le site pendant le pré-chauffage.
for (const path of variants) {
  try {
    const res = await fetch(BASE_URL + path, { headers: { Accept: ACCEPT_IMAGE } });
    if (res.ok) {
      await res.arrayBuffer();
      ok++;
    } else {
      failed++;
      console.warn(`  ${res.status} ${path}`);
    }
  } catch (err) {
    failed++;
    console.warn(`  échec ${path} : ${err.message}`);
  }
}

console.log(
  `Terminé en ${((Date.now() - started) / 1000).toFixed(1)}s - ${ok} en cache, ${failed} en échec`
);
