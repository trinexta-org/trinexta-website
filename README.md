# trinexta-website

Refonte du site Trinexta — Next.js 16 + Sanity + PostgreSQL + Prisma 7.

> Pour contribuer : lire [CONTRIBUTING.md](./CONTRIBUTING.md)
> Architecture et fonctionnement : voir [docs/](./docs/)

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Sanity (CMS headless)
- PostgreSQL 17 + Prisma 7
- PM2 + Nginx (VPS OVH)

## Prerequis

- Node.js >= 22 ([nvm](https://github.com/nvm-sh/nvm) recommande)
- PostgreSQL >= 17
- Git

Windows : utiliser [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/install) (Ubuntu), les commandes ci-dessous s'appliquent dans WSL.

## Installation

```bash
git clone https://github.com/trinexta-org/trinexta-website.git
cd trinexta-website
git checkout dev
npm install
```

## Variables d'environnement

```bash
cp .env.example .env.local
```

Remplir `.env.local` :

```env
DATABASE_URL=postgresql://trinexta:dev_password@localhost:5432/trinexta
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=93ztl6y7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_DATASET=     # vide par defaut, le Studio utilisera alors production
SANITY_API_TOKEN=          # optionnel en dev, requis pour les drafts
```

Par defaut :

- le site utilise `production`
- le Studio utilise `production`
- `staging` reste disponible mais n'est pas active

Pour utiliser le dataset de preproduction plus tard :

```env
NEXT_PUBLIC_SANITY_DATASET=staging
SANITY_STUDIO_DATASET=staging
```

Si vous voulez garder le frontend sur `production` mais lancer uniquement le Studio sur `staging`, laissez `NEXT_PUBLIC_SANITY_DATASET=production` dans `.env.local`, ne renseignez pas `SANITY_STUDIO_DATASET`, et demarrez le Studio avec :

```bash
cd studio
npm run dev:staging
```

## Base de donnees

### Mac

```bash
brew install postgresql@17
brew services start postgresql@17
psql postgres
```

### Linux

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo -u postgres psql
```

### Creer le user et la base (Mac et Linux)

```sql
CREATE USER trinexta WITH PASSWORD 'dev_password';
CREATE DATABASE trinexta OWNER trinexta;
GRANT ALL PRIVILEGES ON DATABASE trinexta TO trinexta;
\q
```

### Initialiser la base (premiere fois)

```bash
npx prisma migrate dev --name init
```

Cette commande cree le dossier `prisma/migrations/`, applique le schema, et genere le client Prisma.

> **Runs suivants** (schema inchange) : la commande est idempotente, vous pouvez la relancer sans risque.  
> Si vous modifiez `prisma/schema.prisma`, creez une nouvelle migration :  
> `npx prisma migrate dev --name nom-de-la-migration`

## Lancer le projet

Deux terminaux :

```bash
# Terminal 1 - Next.js (http://localhost:3000)
npm run dev

# Terminal 2 - Sanity Studio (http://localhost:3333)
cd studio && npm run dev
```

Se connecter au Studio avec son compte Google ou GitHub sur [sanity.io](https://sanity.io). Demander un acces au tech lead si besoin.

## Branches

| Branche | Environnement |
|---|---|
| `dev` | local uniquement |
| `staging` | staging.trinexta.fr |
| `main` | trinexta.com |

Workflow : `dev` -> `staging` -> `main` via pull requests.
