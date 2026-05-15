<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Règles pour agents IA — trinexta-website

## Stack

- Next.js 16 (App Router, TypeScript strict, Tailwind v4)
- Sanity (CMS headless) — project ID `93ztl6y7`, dataset `production`
- PostgreSQL 17 + Prisma 7 (adapter pg, client généré dans `src/generated/prisma/`)
- PM2 + Nginx sur VPS OVH

## Specs et documentation projet

Les specs sont dans NotebookLM — utiliser le MCP `notebooklm` (outil `notebook_query`) au lieu de lire les fichiers `docs/`. Notebook ID : `f330bebc-87d4-46ab-a49b-26b484e0f448`.

## Avant d'écrire du code

1. Lire `node_modules/next/dist/docs/` pour toute question Next.js
2. Lire `prisma/schema.prisma` avant tout accès DB
3. Lire `studio/schemaTypes/` avant tout accès Sanity
4. Vérifier `src/lib/db/index.ts` pour l'instance Prisma (ne pas en créer une autre)

## Conventions

- Commits en français : `type: description courte` (`feat`, `fix`, `chore`, `docs`, `refactor`)
- Branches : `feat/...`, `fix/...`, `chore/...` depuis `dev`
- Jamais de push direct sur `staging` ou `main`
- Tout changement de `schema.prisma` doit avoir une migration : `npx prisma migrate dev --name nom`

## Structure

```
src/
  app/          # routes Next.js App Router
  lib/
    db/         # client Prisma (index.ts) — ne pas dupliquer
generated/
  prisma/       # client généré — ne pas éditer manuellement
studio/
  schemaTypes/  # schémas Sanity — source de vérité contenu
prisma/
  schema.prisma # source de vérité DB
```

## Variables d'environnement

Toujours vérifier `.env.example` pour la liste complète. Ne jamais committer `.env.local`.

## Style de réponse

- Être extrêmement concis — sacrifier la grammaire si nécessaire
- Pas de résumés en fin de réponse
- Pas de longs blocs introductifs ou explicatifs inutiles

## Interdictions

- Ne pas modifier `src/generated/prisma/` manuellement
- Ne pas créer de second client Prisma
- Ne pas utiliser `next/legacy/image` (déprécié)
- Ne pas écrire `"use client"` par défaut — préférer les Server Components
