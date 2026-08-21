---
name: review-pr-trinexta
description: Review a pull request following TRINEXTA conventions — branch naming, French commit messages, feat/fix/chore prefixes, no credentials, Prisma migrations tested, Next.js 16 / Sanity / Prisma 7 stack rules, no direct push to main/staging/dev. Use when reviewing a PR on the trinexta-website project, or before merging any branch.
---

# Revue PR TRINEXTA

## Le prior

Le code soumis a déjà passé `eslint`, `tsc --noEmit`, `next build` et
`check:review-rules`. **L'hypothèse par défaut est qu'il est correct.** La revue n'a pas
à démontrer qu'il l'est ; elle n'a à remonter que ce qu'elle peut réfuter.

Ce prior n'est pas une politesse. Un modèle à qui on demande de détecter un défaut et de
le justifier dans le même mouvement s'engage sur un verdict puis fabrique la
justification qui le rend cohérent - la surcorrection. Sur des implémentations
correctes, le taux de rejet à tort est majoritaire (Jin & Chen, 2026). Le protocole en
deux passes existe uniquement pour couper ce mécanisme : la passe 1 ne justifie rien, la
passe 2 ne voit pas ce qui a produit le candidat.

Rappel `AGENTS.md` : le site n'est pas encore live. Ne pas classer en bloquant une
précaution qui ne concerne que le trafic réel ou l'exploitation production future.

## Processus

### 1. Identifier la PR

Si le numéro ou le nom de branche n'est pas fourni, demander : "Quelle branche ou quel
numéro de PR veux-tu que je review ?"

### 2. Récupérer le diff

```bash
git fetch origin dev
git log origin/dev..HEAD --oneline
git diff origin/dev...HEAD
```

Si un numéro de PR GitHub est fourni (préférer `gh api`, `gh pr view` échoue sur ce
repo) :

```bash
gh api repos/trinexta-org/trinexta-website/pulls/<number>
gh pr diff <number>
```

### 3. Laisser la machine parler d'abord

```bash
node scripts/check-review-rules.mjs --base origin/dev --branch "$(git branch --show-current)"
```

Deux niveaux de sortie :

- **Bloquant** (code de sortie 1) : violations certaines, à remonter telles quelles sans
  passer par le protocole - elles n'ont pas besoin d'être adjugées.
- **Indicatif** (conventions git) : nom de branche, préfixe de commit, commit de merge
  parasite. Ne bloque pas, parce que ça ne se corrige qu'en réécrivant l'historique.
  À mentionner dans le rapport, jamais en bloquant.

Ce que le script couvre ne doit **plus jamais** être remonté par la revue (voir « Ce que
la revue ne regarde plus »).

### 4. Passe 1 - Détection

- Produire des **candidats**, pas des verdicts.
- Un candidat = `fichier:ligne` + une phrase. **Aucun correctif, aucune justification
  développée, aucun extrait de code réécrit.** Écrire le patch d'un candidat qui sera
  écarté est du travail perdu et ancre le raisonnement sur un défaut supposé.
- **Budget : 10 candidats maximum.** Ce plafond est une sécurité, pas un quota - ne pas
  le remplir. Ce qui compte est de classer par gravité et de jeter tout ce dont on n'est
  pas convaincu. C'est la porte de falsifiabilité qui décide ce qui passe, sur preuve et
  non sur rang : un budget qui mord est le seul endroit du protocole où un défaut réel
  peut disparaître pour une raison étrangère à sa validité.
- **Une liste vide est un résultat valide et attendu.**

Où regarder :

| Axe | Ce qui mérite un coup d'œil sur ce projet |
| --- | --- |
| Correctness | Cas limites, chemins d'erreur, régressions sur le périmètre déjà livré |
| Sécurité | Secret en dur, IP ou identifiant SSH exposé, input d'API non validé (Zod), route protégée sans vérification d'auth, XSS/injection |
| Base de données | Migration au nom explicite et cohérente avec le diff de `schema.prisma` ; migration destructive |
| Sanity | `studio/schemaTypes/` cohérent avec le code Next.js quand les deux bougent |
| Architecture | Donnée partagée définie dans un composant au lieu de `src/data/` ; `"use client"` là où un Server Component suffirait |
| Performance | N+1, requête non bornée, gestion d'erreur absente sur un appel externe (Sanity, Stripe, SMTP) |
| Contenu | Textes UI en français, pas d'emoji dans l'interface, ton conforme à `TONE.md` |

### 5. Passe 2 - Adjudication

Lancer un **sous-agent au contexte neuf** (`Agent`, `general-purpose`).

Ce qu'il reçoit : la liste des candidats, l'accès au code, `AGENTS.md`.
Ce qu'il ne reçoit **jamais** : le raisonnement de la passe 1. S'il voit la
justification, il s'y ancre et confirme.

Sa méthode est la **tentative de réfutation** : pour chaque candidat, lire le code cité
et son voisinage, et chercher ce qui rendrait le candidat faux - une garde en amont, un
type qui exclut le cas, un appelant qui ne peut pas produire cette entrée, une
convention documentée qui l'autorise.

**Réfuter est la méthode, pas l'objectif.** Le risque est symétrique à celui de la passe
1 : un agent à qui on dit de trouver quelque chose le trouve, qu'il existe ou non. Deux
garde-fous :

- **Un candidat qui survit à une tentative sérieuse est `CONFIRMÉ`**, et c'est un
  résultat aussi bon qu'une réfutation. Le sous-agent n'est pas là pour vider la liste.
- **Une réfutation doit être ancrée** : citer le fichier, la ligne ou l'extrait précis
  qui rend le candidat faux. « C'est probablement volontaire » est une impression, pas
  une réfutation. Sans ancrage, le verdict est `INDÉCIDABLE`, jamais `RÉFUTÉ`.

Verdict par candidat : `CONFIRMÉ` / `RÉFUTÉ` / `INDÉCIDABLE`.

### 6. La porte de falsifiabilité

Un candidat `CONFIRMÉ` n'est retenu que s'il porte un **scénario d'échec concret** : des
entrées ou un état précis, menant à une sortie fausse, une exception, une donnée
corrompue ou une régression observable.

- Pas de scénario reproductible → le candidat est **supprimé**.
- `INDÉCIDABLE` → **supprimé** aussi, mais compté à part. Un taux d'indécidables qui
  grimpe signale une passe 2 qui tranche au-delà de ce qu'elle peut établir.

Supprimé veut dire supprimé. Pas rétrogradé en « Suggestion », pas reformulé en question
(« est-ce que ce cas est géré ? »), pas glissé dans un paragraphe de contexte. Ces trois
échappatoires réintroduisent exactement le bruit que le protocole retire.

### 7. Ce que la revue ne regarde plus

Ces points sont tranchés par une machine. Les remonter est du bruit par construction.

| Point | Couvert par |
| --- | --- |
| Typage, `any`, imports inutilisés, formatage | `eslint`, `tsc --noEmit` |
| Second client Prisma | `check:review-rules` (PRISMA_SINGLETON) |
| `next/legacy/image` | `check:review-rules` (LEGACY_IMAGE) |
| Couleur HEX en dur dans une classe Tailwind | `check:review-rules` (HEX_TAILWIND) |
| Layout manuel, `max-w-7xl` hors `Container` | `check:review-rules` (MANUAL_LAYOUT) |
| Fichiers `*-backup.*`, `*-old.*`, `*-temp.*`, `*-copy.*` | `check:review-rules` (BACKUP_FILE) |
| `schema.prisma` modifié sans migration | `check:review-rules` (MIGRATION_MISSING) |
| Fichier `.env` committé | `check:review-rules` (ENV_COMMITTED) |
| Nom de branche, préfixe de commit, merge parasite | `check:review-rules`, indicatif |
| `src/generated/prisma/` modifié à la main | impossible, le dossier est gitignoré |

Corollaire : dès qu'une règle devient décidable par une machine, elle **quitte** cette
checklist pour rejoindre `scripts/check-review-rules.mjs`. Une règle ne doit jamais
vivre aux deux endroits.

### 8. Rédiger le rapport

```
## Revue PR — [nom de branche]
**Auteur :** [prénom]
**Date :** [date]

### Violations machine (check:review-rules)
[sortie bloquante du script, ou "aucune"]
[conventions git indicatives, le cas échéant]

### Findings retenus
[uniquement les CONFIRMÉS avec scénario d'échec]
[si aucun : "Aucun finding. N candidats levés, tous réfutés en passe 2."]

### Verdict
**APPROUVÉ** / **APPROUVÉ AVEC RÉSERVES** / **CHANGEMENTS REQUIS**

*N candidats levés, M écartés (dont J indécidables), K retenus.*
```

### 9. Note sur la revue automatique de CI

`.github/workflows/ai-review.yml` applique le même protocole sur chaque PR vers `dev`
(`.github/scripts/ai-review.py`), avec `AGENTS.md` injecté comme contexte faisant
autorité et une garde contre l'injection via le titre, la description ou le diff.

Les deux dispositifs sont indépendants et leurs périmètres doivent rester alignés :
toute règle retirée d'ici doit l'être aussi de `HORS_PERIMETRE` dans le script, et
inversement.

### 10. Poster le commentaire (si PR GitHub et si l'utilisateur le demande)

```bash
gh pr review <number> --comment --body "<rapport>"
gh pr review <number> --approve
gh pr review <number> --request-changes --body "<rapport>"
```
