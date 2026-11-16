import type {
  Article,
  ArticleResume,
  CodeCategorie,
  CriteresCatalogue,
  Facettes,
  Kit,
  KitResume,
  Prix,
  ReponseCatalogue,
  ReponseKits,
  ReponsePlan,
} from "./types"

// Réponses simulées, construites sur les exemples du contrat (`docs/api-boutique.md`), pour développer et
// recetter les pages tant que l'API n'est pas déployée. Utilisées seulement si `BOUTIQUE_SIMULATION=1`
// hors production (voir `simulationActive`). Articles, prix et kits sont FICTIFS : chaque page l'annonce.

const MAJ = "2026-11-16T02:10:00.000Z"

function prix(ht: number, eco = 0, barreHt: number | null = null, promotion: string | null = null): Prix {
  const ttc = (c: number) => Math.round(c * 1.2)
  return {
    devise: "EUR",
    tauxTva: 20,
    ht,
    ttc: ttc(ht),
    barreHt,
    barreTtc: barreHt === null ? null : ttc(barreHt),
    promotion,
    ecoParticipationHt: eco,
    ecoParticipationTtc: ttc(eco),
  }
}

const CAT: Record<CodeCategorie, string> = {
  poste: "Ordinateur fixe",
  portable: "Ordinateur portable",
  ecran: "Écran",
  peripherique: "Périphérique",
  accessoire: "Accessoire",
  telephonie: "Téléphonie",
  reseau: "Réseau",
  impression: "Impression",
  licence: "Licence",
  logiciel: "Logiciel",
  kit: "Kit",
  autre: "Autre",
}

type Brut = [slug: string, nom: string, marque: string | null, categorie: CodeCategorie, prix: Prix, stock: boolean]

const BRUTS: Brut[] = [
  ["lenovo-portable-demo-14-a1", "Portable 14 pouces (démonstration)", "Lenovo", "portable", prix(108000, 50), true],
  ["dell-portable-demo-15-b2", "Portable 15 pouces (démonstration)", "Dell", "portable", prix(96000, 50, 104000, "Rentrée"), true],
  ["hp-portable-demo-14-c3", "Portable 14 pouces léger (démonstration)", "HP", "portable", prix(124000, 50), false],
  ["asus-portable-demo-16-d4", "Portable 16 pouces (démonstration)", "ASUS", "portable", prix(135000, 50), false],
  ["dell-fixe-demo-e5", "Unité centrale compacte (démonstration)", "Dell", "poste", prix(78000, 100), true],
  ["dell-ecran-demo-24-f6", "Écran 24 pouces (démonstration)", "Dell", "ecran", prix(17900, 200), true],
  ["lenovo-ecran-demo-27-g7", "Écran 27 pouces (démonstration)", "Lenovo", "ecran", prix(26900, 200), false],
  ["lenovo-station-demo-h8", "Station d'accueil USB-C (démonstration)", "Lenovo", "accessoire", prix(18900, 10), true],
  ["hp-sacoche-demo-i9", "Sacoche 15 pouces (démonstration)", "HP", "accessoire", prix(3900), true],
  ["logitech-clavier-souris-demo-j1", "Clavier et souris sans fil (démonstration)", "Logitech", "peripherique", prix(5900, 5), true],
  ["jabra-casque-demo-k2", "Casque filaire USB (démonstration)", "Jabra", "peripherique", prix(6900, 5), false],
]

function marque(libelle: string | null) {
  return libelle ? { code: libelle.toLowerCase(), libelle } : null
}

const RESUMES: ArticleResume[] = BRUTS.map(([slug, nom, m, categorie, p, stock]) => ({
  slug,
  nom,
  marque: marque(m),
  categorie: { code: categorie, libelle: CAT[categorie] },
  prix: p,
  disponibilite: stock ? "en stock" : "sur commande",
  image: null,
  miseAJour: MAJ,
}))

const SANS_ACCENTS = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

function facettes(articles: ArticleResume[]): Facettes {
  const cats = new Map<CodeCategorie, number>()
  const marques = new Map<string, { libelle: string; nombre: number }>()
  for (const a of articles) {
    cats.set(a.categorie.code, (cats.get(a.categorie.code) ?? 0) + 1)
    if (a.marque) {
      const m = marques.get(a.marque.code) ?? { libelle: a.marque.libelle, nombre: 0 }
      m.nombre += 1
      marques.set(a.marque.code, m)
    }
  }
  const hts = articles.map((a) => a.prix.ht)
  const ttcs = articles.map((a) => a.prix.ttc)
  return {
    categories: [...cats].map(([code, nombre]) => ({ code, libelle: CAT[code], nombre })),
    marques: [...marques].map(([code, m]) => ({ code, libelle: m.libelle, nombre: m.nombre })),
    prix: articles.length
      ? { minHt: Math.min(...hts), maxHt: Math.max(...hts), minTtc: Math.min(...ttcs), maxTtc: Math.max(...ttcs) }
      : null,
  }
}

function catalogue(c: CriteresCatalogue): ReponseCatalogue {
  const mots = c.q ? SANS_ACCENTS(c.q).split(/\s+/).filter(Boolean) : []
  const parTexte = RESUMES.filter((a) => {
    const texte = SANS_ACCENTS(`${a.nom} ${a.marque?.libelle ?? ""} ${a.categorie.libelle}`)
    return mots.every((m) => texte.includes(m))
  })
  let liste = parTexte.filter(
    (a) =>
      (!c.categorie || a.categorie.code === c.categorie) &&
      (!c.marque || a.marque?.code === c.marque) &&
      (c.prixMin === undefined || a.prix.ht >= c.prixMin) &&
      (c.prixMax === undefined || a.prix.ht <= c.prixMax),
  )
  if (c.tri === "prix") liste = [...liste].sort((a, b) => a.prix.ht - b.prix.ht)
  if (c.tri === "-prix") liste = [...liste].sort((a, b) => b.prix.ht - a.prix.ht)
  const parPage = c.parPage ?? 24
  const page = c.page ?? 1
  return {
    articles: liste.slice((page - 1) * parPage, page * parPage),
    pagination: { page, parPage, total: liste.length, pages: Math.max(1, Math.ceil(liste.length / parPage)) },
    facettes: facettes(parTexte),
  }
}

function article(slug: string): { ok: true; data: Article } | { ok: false; raison: "introuvable" } {
  const r = RESUMES.find((a) => a.slug === slug)
  if (!r) return { ok: false, raison: "introuvable" }
  return {
    ok: true,
    data: {
      ...r,
      referenceFabricant: slug.split("-").pop()?.toUpperCase() ?? null,
      ean: "0000000000000",
      description: null,
      presentation:
        "Fiche de démonstration : sur le site en ligne, ce texte est la présentation Open Icecat du produit.",
      caracteristiques: [
        { groupe: "Général", nom: "Usage", valeur: "Démonstration" },
        { groupe: "Général", nom: "Garantie constructeur", valeur: "Selon la fiche du fabricant" },
      ],
      images: [],
      lies: RESUMES.filter((a) => a.slug !== slug && a.categorie.code === r.categorie.code).slice(0, 6),
    },
  }
}

const KIT_COMPOSITION = (memoire: 16 | 32, ecrans: 1 | 2) => [
  { nom: `Portable 14 pouces ${memoire} Go (démonstration)`, quantite: 1, offert: false, categorie: { code: "portable" as const, libelle: CAT.portable }, slug: "lenovo-portable-demo-14-a1", image: null },
  { nom: "Écran 24 pouces (démonstration)", quantite: ecrans, offert: false, categorie: { code: "ecran" as const, libelle: CAT.ecran }, slug: "dell-ecran-demo-24-f6", image: null },
  { nom: "Station d'accueil USB-C (démonstration)", quantite: 1, offert: false, categorie: { code: "accessoire" as const, libelle: CAT.accessoire }, slug: "lenovo-station-demo-h8", image: null },
  { nom: "Clavier et souris sans fil (démonstration)", quantite: 1, offert: false, categorie: { code: "peripherique" as const, libelle: CAT.peripherique }, slug: "logitech-clavier-souris-demo-j1", image: null },
  { nom: "Sacoche 15 pouces (démonstration)", quantite: 1, offert: true, categorie: { code: "accessoire" as const, libelle: CAT.accessoire }, slug: "hp-sacoche-demo-i9", image: null },
]

function variante(memoire: 16 | 32, ecrans: 1 | 2, ht: number) {
  const code = `${memoire}go-${ecrans === 1 ? "1ecran" : "2ecrans"}` as const
  return {
    code,
    libelle: `${memoire} Go · ${ecrans} écran${ecrans > 1 ? "s" : ""}`,
    memoireGo: memoire,
    ecrans,
    nom: `Kit poste bureautique (démonstration) · ${memoire} Go · ${ecrans} écran${ecrans > 1 ? "s" : ""}`,
    prix: prix(ht, 120),
    valeur: { ht: Math.round(ht * 1.05), ttc: Math.round(ht * 1.05 * 1.2) },
    remisePourcent: 5,
    disponibilite: "sur commande" as const,
    composition: KIT_COMPOSITION(memoire, ecrans),
  }
}

const KIT: Kit = {
  slug: "kit-poste-bureautique-demo",
  nom: "Kit poste bureautique (démonstration)",
  description: "Portable, écran, station d'accueil, clavier, souris et sacoche.",
  aPartirDe: { ht: 145000, ttc: 174000 },
  miseAJour: MAJ,
  variantes: [variante(16, 1, 145000), variante(16, 2, 162000), variante(32, 1, 158000), variante(32, 2, 175000)],
  aide: null,
}

function kitResume(k: Kit): KitResume {
  return {
    ...k,
    variantes: k.variantes.map((v) => ({
      code: v.code, libelle: v.libelle, memoireGo: v.memoireGo, ecrans: v.ecrans, nom: v.nom,
      prix: v.prix, valeur: v.valeur, remisePourcent: v.remisePourcent, disponibilite: v.disponibilite,
    })),
  }
}

export const simulation = {
  catalogue,
  article,
  kits(): ReponseKits {
    return { kits: [kitResume(KIT)] }
  },
  kit(slug: string): { ok: true; data: Kit } | { ok: false; raison: "introuvable" } {
    return slug === KIT.slug ? { ok: true, data: KIT } : { ok: false, raison: "introuvable" }
  },
  plan(): ReponsePlan {
    return {
      articles: RESUMES.map((a) => ({ slug: a.slug, miseAJour: a.miseAJour })),
      kits: [{ slug: KIT.slug, miseAJour: KIT.miseAJour }],
    }
  },
}
