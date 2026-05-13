# Scripts de migration Trinexta

## Import des articles WordPress vers Sanity

Ce script permet d'importer les articles existants depuis l'API REST de WordPress vers la base de données Sanity, en convertissant le HTML en blocs Portable Text et en téléchargeant les images à la volée.

### Prérequis

1. Avoir Node.js installé (v20+ recommandé pour le support natif de `--env-file`).
2. Avoir un fichier `.env` ou `.env.local` à la racine du projet contenant :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (Ce token doit avoir les droits d'écriture/éditeur).
3. Placer le fichier d'export JSON de WordPress dans le dossier `scripts/data/` sous le nom `export-wp.json`.

### Exécution

Pour lancer l'import complet de tous les articles :
\`\`\`bash
node --env-file=.env scripts/import-articles.js
\`\`\`

Pour lancer un test limité sur un sous-ensemble d'articles (par exemple, les 3 premiers) :
\`\`\`bash
node --env-file=.env scripts/import-articles.js --limit=3
\`\`\`