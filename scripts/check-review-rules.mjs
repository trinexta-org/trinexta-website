/**
 * Verifie mecaniquement les regles de revue trinexta-website qui sont decidables sans
 * jugement (interdictions et conventions d'AGENTS.md). Ces regles sortent de la revue
 * par agent : une machine les tranche avec une precision de 100 %, un modele y produit
 * du bruit.
 *
 * Usage :
 *   node scripts/check-review-rules.mjs                       # regles statiques
 *   node scripts/check-review-rules.mjs --base origin/dev     # + regles sur le diff
 *   node scripts/check-review-rules.mjs --base origin/dev --branch feat/xxx
 *
 * Ajouter une regle ici plutot que dans la checklist de revue des qu'elle est decidable
 * par une machine. En retirer une des qu'elle produit un faux positif non corrigeable :
 * une regle imprecise coute plus cher que pas de regle du tout.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";

const SCAN_DIRS = ["src", "scripts", "studio", "prisma"];
const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".next", "generated", "migrations"]);
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".mjs", ".js"]);
const SELF = "scripts/check-review-rules.mjs";

const PREFIXES_COMMIT = /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)(\(.+\))?!?: /;
const NOM_BRANCHE = /^(feat|fix|chore|docs|refactor)\/.+/;

// Violations pre-existantes de HEX_TAILWIND sur dev, anterieures a l'introduction du
// check. A corriger separement : #0a1128 n'a pas d'equivalent exact parmi les tokens,
// le remplacer est un arbitrage design.
//
// La dette est comptee, pas exemptee : chaque fichier a droit a EXACTEMENT ce nombre
// d'occurrences. Une occurrence de plus est signalee, y compris dans un fichier deja
// endette. Exempter le fichier entier aurait desactive la regle pour tout code futur
// dans ces trois fichiers.
//
// Ces compteurs ne doivent que descendre. Retirer l'entree quand elle atteint 0.
const DETTE_HEX = new Map([
  ["src/components/blog/BlogInteractiveCarousel.tsx", 1],
  ["src/components/services-annexes/ServicesApproach.tsx", 2],
  ["src/components/technicien-sous-regie/TechnicienConcret.tsx", 2],
]);

// Deux niveaux. Bloquant : la violation se corrige en editant un fichier, la CI doit
// rougir. Indicatif : la violation porte sur l'historique git et ne se corrige qu'en le
// reecrivant - la signaler suffit. Bloquer la-dessus pousserait a contourner les
// verifications, ce qui coute plus cher que la violation elle-meme.
const violations = [];
const signaler = (fichier, ligne, regle, message, bloquant = true) =>
  violations.push({ fichier, ligne, regle, message, bloquant });

// --- Regles statiques -------------------------------------------------------

const REGLES = [
  {
    nom: "PRISMA_SINGLETON",
    exempt: (f) => f === "src/lib/db/index.ts",
    motif: /new PrismaClient\(/,
    message: "Un second client Prisma cree un pool separe. Importer prisma depuis @/lib/db.",
  },
  {
    nom: "LEGACY_IMAGE",
    motif: /next\/legacy\/image/,
    message: "next/legacy/image est deprecie. Utiliser next/image.",
  },
  {
    nom: "HEX_TAILWIND",
    dette: (f) => DETTE_HEX.get(f) ?? 0,
    motif: /\b(bg|text|border|fill|stroke|from|to|via|ring|shadow|outline|decoration|accent)-\[#[0-9a-fA-F]{3,8}\]/,
    message: "Couleur HEX en dur dans une classe Tailwind. Utiliser un token (text-primary, bg-secondary...).",
  },
  {
    nom: "MANUAL_LAYOUT",
    exempt: (f) => f === "src/components/layout/Container.tsx",
    motif: /\bmax-w-7xl\b/,
    message: "Layout ecrit a la main. Utiliser <Section> et <Container>.",
  },
];

const FICHIER_BACKUP = /-(backup|old|temp|copy)\.[a-z]+$/i;

function listerSources(dossier) {
  const sorties = [];
  for (const entree of readdirSync(dossier)) {
    if (EXCLUDED_DIR_NAMES.has(entree)) continue;
    const complet = join(dossier, entree);
    if (statSync(complet).isDirectory()) sorties.push(...listerSources(complet));
    else if (SOURCE_EXTENSIONS.has(extname(complet))) sorties.push(complet);
  }
  return sorties;
}

function verifierStatique() {
  for (const fichier of SCAN_DIRS.flatMap(listerSources)) {
    if (fichier === SELF) continue;
    if (FICHIER_BACKUP.test(basename(fichier))) {
      signaler(fichier, 0, "BACKUP_FILE", "Fichier de sauvegarde committe. Utiliser git stash ou une branche dediee.");
      continue;
    }
    const lignes = readFileSync(fichier, "utf8").split("\n");
    for (const regle of REGLES) {
      if (regle.exempt?.(fichier)) continue;
      const touches = [];
      lignes.forEach((ligne, i) => {
        if (regle.motif.test(ligne)) touches.push(i + 1);
      });
      // Les occurrences au-dela de la dette connue sont signalees : un fichier endette
      // ne devient pas une zone franche.
      for (const numero of touches.slice(regle.dette?.(fichier) ?? 0)) {
        signaler(fichier, numero, regle.nom, regle.message);
      }
    }
  }
}

// --- Regles qui dependent du diff ------------------------------------------

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

function verifierDiff(base, branche) {
  let modifies;
  try {
    modifies = git("diff", "--name-only", `${base}...HEAD`).split("\n").filter(Boolean);
  } catch {
    // Ref de base introuvable (clone superficiel, base supprimee). Les regles
    // statiques restent verifiees ; celles qui dependent du diff sont sautees.
    console.log(`Ref de base ${base} introuvable - regles sur le diff sautees.\n`);
    return;
  }

  if (modifies.includes("prisma/schema.prisma") && !modifies.some((f) => f.startsWith("prisma/migrations/"))) {
    signaler("prisma/schema.prisma", 0, "MIGRATION_MISSING",
      "schema.prisma modifie sans migration dans prisma/migrations/. Lancer npx prisma migrate dev --name <nom>.");
  }

  for (const fichier of modifies.filter((f) => basename(f).startsWith(".env") && basename(f) !== ".env.example")) {
    signaler(fichier, 0, "ENV_COMMITTED", "Fichier d'environnement committe. Seul .env.example doit l'etre.");
  }

  if (branche && branche !== "HEAD" && !NOM_BRANCHE.test(branche)) {
    signaler(branche, 0, "BRANCH_NAME",
      "Nom de branche hors convention : feat/, fix/, chore/, docs/ ou refactor/.", false);
  }

  const sujets = git("log", `${base}..HEAD`, "--format=%s").split("\n").filter(Boolean);
  for (const sujet of sujets) {
    if (sujet.startsWith("Merge branch") || sujet.startsWith("Merge remote-tracking")) {
      signaler("(commit)", 0, "MERGE_COMMIT", `Commit de merge parasite : "${sujet}". Rebaser sur dev.`, false);
    } else if (!PREFIXES_COMMIT.test(sujet)) {
      signaler("(commit)", 0, "COMMIT_PREFIX", `Commit sans prefixe Conventional Commits : "${sujet}".`, false);
    }
  }
}

// --- Entree ----------------------------------------------------------------

const argv = process.argv.slice(2);
const lireOption = (nom) => {
  const i = argv.indexOf(nom);
  return i === -1 ? undefined : argv[i + 1];
};

verifierStatique();
const base = lireOption("--base");
if (base) verifierDiff(base, lireOption("--branch"));

const bloquantes = violations.filter((v) => v.bloquant);
const indicatives = violations.filter((v) => !v.bloquant);
const ligne = (v) => `  ${v.ligne > 0 ? `${v.fichier}:${v.ligne}` : v.fichier} [${v.regle}] ${v.message}`;

if (indicatives.length > 0) {
  console.log(`${indicatives.length} convention(s) git non respectee(s) - indicatif, ne bloque pas :\n`);
  for (const v of indicatives) console.log(ligne(v));
  console.log("");
}

if (bloquantes.length === 0) {
  console.log("OK - aucune regle bloquante enfreinte.");
} else {
  console.error(`${bloquantes.length} regle(s) de revue enfreinte(s) :\n`);
  for (const v of bloquantes) console.error(ligne(v));
  process.exitCode = 1;
}
