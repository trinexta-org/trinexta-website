# Contribuer à trinexta-website

## Prérequis

- Node.js >= 22 ([nvm](https://github.com/nvm-sh/nvm) recommandé)
- PostgreSQL >= 17
- Accès Sanity — demander au tech lead

## Démarrage rapide

```bash
git clone https://github.com/trinexta-org/trinexta-website.git
cd trinexta-website
git checkout dev
npm install
cp .env.example .env.local   # remplir les valeurs (voir README)
npx prisma migrate deploy
npm run dev                  # http://localhost:3000
# dans un second terminal :
cd studio && npm install && npm run dev   # http://localhost:3333
```

## Branches

| Branche   | Environnement        | Merge via       |
|-----------|----------------------|-----------------|
| `dev`     | local uniquement     | PR → staging    |
| `staging` | staging.trinexta.fr  | PR → main       |
| `main`    | trinexta.com         | PR approuvée    |

Règle : **jamais de push direct sur `staging` ou `main`**. Toujours passer par une PR.

## Nommer ses branches

```
feat/description-courte
fix/description-courte
chore/description-courte
docs/description-courte
```

Exemples : `feat/page-services`, `fix/contact-form-validation`, `chore/upgrade-prisma`

## Messages de commit

Format : `type: description courte en français`

| Type     | Quand l'utiliser                          |
|----------|-------------------------------------------|
| `feat`   | nouvelle fonctionnalité                   |
| `fix`    | correction de bug                         |
| `chore`  | tâche technique (deps, config, scripts)   |
| `docs`   | documentation uniquement                  |
| `style`  | formatage, pas de logique                 |
| `refactor` | refactoring sans changement de comportement |

Exemples :
```
feat: ajouter la page services
fix: corriger le formulaire de contact sur mobile
chore: mettre à jour prisma vers 7.9
```

## Ouvrir une PR

1. Créer sa branche depuis `dev` : `git checkout -b feat/ma-feature dev`
2. Committer et pousser : `git push origin feat/ma-feature`
3. Ouvrir une PR vers `dev` (ou `staging` si prête à déployer)
4. Remplir le template de PR
5. Assigner un reviewer (tech lead par défaut)
6. Ne pas merger soi-même — attendre l'approbation

## Variables d'environnement

Ne jamais committer `.env.local`. Contacter le tech lead pour obtenir les valeurs manquantes.

Les secrets de déploiement (SSH, DATABASE_URL en prod) sont gérés dans GitHub Secrets — accès tech lead uniquement.

## Base de données

Toujours créer une migration Prisma pour tout changement de schéma :

```bash
npx prisma migrate dev --name description-de-la-migration
```

Ne jamais modifier `schema.prisma` sans créer la migration correspondante.

## Accès Sanity Studio

Se connecter sur [sanity.io](https://sanity.io) avec son compte Google ou GitHub. Si tu n'as pas accès au projet `93ztl6y7`, contacter le tech lead.
