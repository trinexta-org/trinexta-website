---
name: review-pr-trinexta
description: Review a pull request following TRINEXTA conventions — branch naming, French commit messages, feat/fix/chore prefixes, no credentials, Prisma migrations tested, Next.js 16 / Sanity / Prisma 7 stack rules, no direct push to main/staging/dev. Use when reviewing a PR on the trinexta-website project, or before merging any branch.
---

# Review PR TRINEXTA

Effectue une revue de code complète d'une Pull Request en appliquant les conventions trinexta-website. Retourne un rapport structuré avec les points bloquants, les avertissements et les validations.

## Processus

### 1. Identifier la PR

Si le numéro ou le nom de branche n'est pas fourni, demande : "Quelle branche ou quel numéro de PR veux-tu que je review ?"

### 2. Récupérer le diff

```bash
git log dev..HEAD --oneline
git diff dev..HEAD
```

Si un numéro de PR GitHub est fourni :
```bash
gh pr view <number> --json title,body,author,commits,files
gh pr diff <number>
```

### 3. Checklist TRINEXTA — vérifier chaque point

#### Conventions Git
- [ ] La branche respecte le nommage : `feat/`, `fix/`, ou `chore/` suivi d'une description courte en kebab-case
- [ ] Les messages de commit sont **en français**
- [ ] Les messages de commit ont un préfixe Conventional Commits valide : `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `revert:`
- [ ] Aucun commit de merge parasite (`Merge branch 'dev'...`)
- [ ] La branche a été créée depuis `dev` (pas depuis `staging` ou `main`)

#### Sécurité & Credentials
- [ ] Aucune clé API, token, mot de passe ou secret en dur dans le code
- [ ] Aucun fichier `.env.local` commité
- [ ] Aucune IP, identifiant SSH ou URL de serveur exposée

#### Base de données (si applicable)
- [ ] Toute modification de `prisma/schema.prisma` est accompagnée d'un fichier de migration dans `prisma/migrations/`
- [ ] La migration a un nom explicite (pas générique)
- [ ] Le schéma `prisma/schema.prisma` est cohérent avec la migration
- [ ] `src/generated/prisma/` n'a pas été modifié manuellement (généré par `prisma generate` uniquement)
- [ ] Aucun second client Prisma créé — seul `src/lib/db/index.ts` doit être utilisé

#### Stack Next.js 16 / Sanity / TypeScript
- [ ] Pas de `"use client"` ajouté sans justification — préférer les Server Components
- [ ] Pas d'import `next/legacy/image` (déprécié)
- [ ] Les variables d'environnement sont lues depuis `.env.local` uniquement (jamais en dur)
- [ ] Si des schémas Sanity sont modifiés, `studio/schemaTypes/` est cohérent avec le code Next.js
- [ ] TypeScript strict respecté — pas de `any` non justifié

#### Qualité du code
- [ ] Le code ne casse aucune fonctionnalité existante (régressions)
- [ ] Le code et les messages UI sont en français
- [ ] Pas d'emojis dans l'interface utilisateur
- [ ] Les couleurs respectent la charte TRINEXTA (Navy #1A2744, Bleu #5B8DB8, Orange #E8500A) si du CSS est modifié

#### PR elle-même
- [ ] La description de la PR explique ce qui a été fait et comment tester
- [ ] La PR ne merge pas sa propre branche (auteur ≠ merger)
- [ ] La PR cible bien la branche `dev` (jamais `staging` ou `main` directement)

### 4. Explorer le code modifié

Pour chaque fichier modifié dans le diff :
- Vérifier la logique métier et les cas limites
- Vérifier l'absence de vulnérabilités (injection, XSS, exposition de données)
- Vérifier que les nouveaux endpoints API ont une validation des inputs (Zod ou équivalent)
- Vérifier que les routes protégées vérifient l'authentification

### 5. Rédiger le rapport

Structure du rapport :

---
## Review PR — [nom de branche]
**Auteur :** [prénom]
**Date :** [date]

### Bloquants (MUST FIX avant merge)
- 🔴 [point bloquant]

### Avertissements (SHOULD FIX)
- 🟡 [avertissement]

### Suggestions (NICE TO HAVE)
- 🔵 [suggestion]

### Checklist TRINEXTA
✅ Convention branche
✅ Commits en français avec préfixe
⚠️ Migration Prisma — [détail si problème]
✅ Pas de credentials
✅ Pas de `"use client"` injustifié
...

### Verdict
**APPROUVÉ** / **APPROUVÉ AVEC RÉSERVES** / **CHANGEMENTS REQUIS**

> [Commentaire général sur la qualité du travail]
---

### 6. Poster le commentaire (si PR GitHub)

Si un numéro de PR est fourni et que l'utilisateur le demande :
```bash
gh pr review <number> --comment --body "<rapport>"
# ou
gh pr review <number> --approve
# ou
gh pr review <number> --request-changes --body "<rapport>"
```
