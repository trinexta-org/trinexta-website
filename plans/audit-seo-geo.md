# Mini-axe GEO — note de cadrage (fast-follow)

Fast-follow décidé en `/grill-me` du 2026-07-15, à traiter **en session séparée** (ne pas polluer le contexte du recadrage conversion). Prérequis : le recadrage `plans/audit-seo-conversion.md` doit être implémenté d'abord (il réserve la place en additif, notamment `content-thin` renforcé).

## But

Ajouter un axe **GEO** (Generative Engine Optimization : être repris/cité par les réponses IA et les moteurs génératifs) mesuré et déterministe, pour matérialiser dans le *score* l'argument déjà porté par le narratif du palier haut. Ne concerne que des checks **défendables aujourd'hui**, jamais le flou.

## Pourquoi ce n'est pas qu'une implémentation

Le code est court (l'archi supporte déjà les axes ; l'axe `contenu-local` existe dans `axes.ts`, globalWeight 15, sans aucun check). Le vrai travail est le **calibrage défendable** :

- Le GEO résiste au déterministe (l'archi interdit un score jugé par IA). On ne mesure que des proxies solides, jamais "autorité" ou "clarté d'entité".
- Le consensus GEO bouge : avant de figer les poids, fonder le barème sur des **sources externes récentes** (recherche web / articles de référence sur le GEO), pas sur la mémoire d'entraînement. Ne pas s'appuyer sur NotebookLM ici : il porte les specs internes du projet, pas l'état de l'art GEO.
- Ajouter un axe *mesuré* force un **rééquilibrage des `globalWeight`** (aujourd'hui on-page 30 / perf 30 / technique 25 / contenu-local 15 non mesuré) : c'est une décision de barème qui rejoue le score global. À trancher dans un mini-grill dédié.

## Checks candidats (déterministes, défendables)

1. Profondeur de contenu (déjà = `content-thin` renforcé à 14 — décider s'il migre vers l'axe GEO ou reste on-page).
2. Données structurées `FAQPage` / `Article` (format réponse).
3. Hiérarchie de titres exploitable (H2/H3 en questions).
4. Paragraphe définitionnel en tête (réponse directe).
5. Listes / tableaux (formats repris par les réponses IA).

Écarter : "clarté d'entité", "autorité", tout jugement non mesurable sur une seule page.

## Décisions à prendre en session GEO

- Nouvel axe `geo` **ou** réutiliser l'axe `contenu-local` existant (vide).
- Poids de chaque check (somme axe = 100) + `globalWeight` de l'axe et **rééquilibrage** des autres axes.
- Sort de `content-thin` (reste on-page ou bascule GEO — pas les deux).
- Tests déterministes par check + non-régression du global.
