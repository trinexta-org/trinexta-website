# Sanity — guide rapide

## C'est quoi Sanity ?

Sanity est un CMS (outil de gestion de contenu). Il sert à stocker les textes, images et données du site sans toucher au code.

Il y a deux parties :

- **Sanity Studio** — l'interface web où les rédacteurs écrivent et publient le contenu.
- **Sanity API** — l'interface que Next.js utilise pour récupérer ce contenu.

---

## Studio vs API

| | Studio | API |
|---|---|---|
| Qui l'utilise | Rédacteurs, admins | Next.js (le code) |
| Comment y accéder | `localhost:3333` en local | Requêtes GROQ dans le code |
| À quoi ça sert | Créer et modifier le contenu | Afficher le contenu sur le site |

---

## Datasets

Un dataset est une base de données Sanity. Ce projet en a deux :

- `production` — le contenu réel du site. C'est ce que voient les visiteurs.
- `staging` — disponible mais non activé pour l'instant.

En local et en staging, on utilise `production` pour éviter de doubler le contenu.

---

## Drafts et publication

Dans Sanity, tout document a deux états :

- **Brouillon (draft)** — visible uniquement dans le Studio, pas sur le site.
- **Publié** — visible sur le site.

Quand un rédacteur clique "Publish" dans le Studio, le contenu est immédiatement disponible sur le site.

---

## Schémas

Les schémas définissent la structure du contenu (quels champs, quels types). Ils sont dans `studio/schemaTypes/`.

Exemple : un schéma `article` peut avoir un champ `titre` (texte), un champ `contenu` (texte long) et un champ `image`.

Pour ajouter un nouveau type de contenu, ajouter un fichier dans `studio/schemaTypes/` et l'enregistrer dans `studio/schemaTypes/index.ts`.

---

## GROQ — récupérer du contenu dans Next.js

GROQ est le langage de requête de Sanity. Il ressemble à du SQL mais pour des données JSON.

### Exemple : récupérer tous les articles

```ts
// Dans un composant ou une page Next.js
import { client } from '@/lib/sanity'

const articles = await client.fetch(`*[_type == "article"]`)
```

### Exemple : récupérer un article par son slug

```ts
const article = await client.fetch(
  `*[_type == "article" && slug.current == $slug][0]`,
  { slug: 'mon-article' }
)
```

### Syntaxe de base

| Syntaxe | Signification |
|---|---|
| `*` | tous les documents |
| `[_type == "article"]` | filtrer par type |
| `{ titre, contenu }` | ne récupérer que ces champs |
| `[0]` | prendre le premier résultat |
| `order(createdAt desc)` | trier par date décroissante |

---

## Client Sanity dans Next.js

Le client Sanity (la connexion entre Next.js et l'API) sera dans `src/lib/sanity.ts`. Ce fichier sera créé lors du développement des premières pages.

Il utilise les variables d'environnement :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=93ztl6y7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...   # requis pour lire les drafts
```

---

## Accès au Studio

1. Lancer le Studio : `cd studio && npm run dev`
2. Ouvrir `http://localhost:3333`
3. Se connecter avec son compte Google ou GitHub
4. Si vous n'avez pas accès au projet `93ztl6y7`, contacter le tech lead.
