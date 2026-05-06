@AGENTS.md

# Contexte projet — trinexta-website

Refonte from scratch du site trinexta.com. Abandon de WordPress vers Next.js 16 + Sanity + PostgreSQL. Hébergé sur VPS OVH, géré via PM2 + Nginx. Public cible : PME en Île-de-France cherchant un prestataire IT/infogérance.

## Objectifs métier

1. Crédibilité (logos partenaires, témoignages réels, labels officiels)
2. Conversion visiteur → prospect (CTA clairs, formulaire de contact)
3. SEO local (infogérance Évry, prestataire informatique Essonne)
4. Maintenance autonome par l'équipe non-technique via Sanity Studio

## Workflow de déploiement

```
dev (local) → staging (staging.trinexta.com) → main (trinexta.com)
```

Chaque transition se fait via pull request. Le deploy est automatique via `.github/workflows/deploy.yml` sur push `staging` et `main`.

## Commandes utiles

```bash
npm run dev          # Next.js sur http://localhost:3000
cd studio && npm run dev   # Sanity Studio sur http://localhost:3333
npx prisma migrate dev --name nom   # créer une migration
npx prisma studio    # UI base de données locale
```

## Points d'attention

- PostgreSQL doit tourner localement avant `npm run dev` (sinon Prisma crashe)
- Node.js >= 22 requis (VPS encore sur v20 en attente de mise à jour admin)
- Ne pas committer `.env.local` — les valeurs sont dans `.env.example`
- Accès Sanity Studio : demander au tech lead (hyosua) si pas d'accès au projet `93ztl6y7`
