# Recadrage conversion — audit SEO — plan d'implémentation

Issu de la session `/grill-me` du 2026-07-15. Complète `plans/audit-seo.md` (ADR) et `plans/audit-seo-implementation.md`. À exécuter par un agent d'implémentation. Le fast-follow GEO est un chantier séparé : voir `plans/audit-seo-geo.md`, **ne pas l'embarquer ici**.

## Problème à résoudre

Un prospect dont la page score haut (>80) repart en se disant "pas la peine". L'audit doit capitaliser sur les défauts (et sur les angles morts) pour amener le prospect vers une prestation (idéalement refonte), **sans mensonge ni fausse alarme**. La crédibilité du barème est l'arme : on ne gonfle rien.

## Principe directeur

Le résultat vend le **RDV**, pas la refonte directe. Échelle unique : audit gratuit → **audit approfondi payant déduit** (390€, placeholder) → refonte. Une seule offre, seul le **narratif** varie selon le palier de score. Un bloc honnête "ce que cet audit ne mesure pas" sert de pont permanent.

## Décisions actées (grill)

1. **Objectif CTA** : convertir vers le RDV/contact, refonte = issue du RDV, pas argument sur le score.
2. **Offre unique** : audit approfondi payant déduit de la refonte. Prix ferme **390€ déduit** (placeholder à valider Valoux, constante unique, jamais hardcodé JSX).
3. **Narratif par palier** (bas <50 / moyen 50-79 / haut >=80), offre identique :
   - Bas : "votre page perd des visiteurs aujourd'hui, l'audit approfondi cadre les travaux (déduit)."
   - Moyen : "base correcte, plafond bas, l'audit approfondi montre où sont les gains."
   - Haut : "techniquement votre page tient, justement le levier est ailleurs. Ce qu'un audit gratuit d'une page ne voit pas (conversion, SEO local, concurrence, reste du site) + angle **GEO** : trop maigre pour être citée par une réponse IA. La technique ne suffit plus."
4. **Bloc "Ce que cet audit ne mesure pas"** : constant quel que soit le score, 4 dimensions : SEO local, Conversion, Concurrence, Reste du site.
5. **Destination CTA** : `/contact` pré-rempli (URL auditée + score). Réutiliser le parcours existant, pas de nouveau tunnel.
6. **Placement** : le bloc CTA + le bloc "non mesuré" vont sur le **teaser (écran) ET dans l'email** du rapport.

## Changements barème (score)

Invariant à préserver : somme des poids d'un axe = 100. Score global = moyenne pondérée des axes mesurés. Moteur déterministe, IA hors calcul.

### a. Gating par constat critique (nouveau)

Un constat *critique* qui casse l'**accès** à la page plafonne le score global (le plus bas gagne) :

| Check | Plafond global |
|---|---|
| `robots-noindex` | **30** (page invisible, le reste est théorique) |
| `https-missing` | **55** (grave mais page fonctionnelle) |
| `title-missing` | **pas de gate** (son poids 20 suffit, page accessible) |

Implémentation : ajouter un champ optionnel `scoreCap?: number` sur `CheckDefinition` (`src/data/audit-seo/types.ts`), le renseigner sur les deux checks dans `catalog.ts`. Dans `score.ts`, après `computeGlobal`, appliquer `scoreGlobal = min(scoreGlobal, ...caps des checks échoués)`. Fonction pure, garder testable.

### b. Recalibrage `content-thin` (majeur assumé, angle GEO)

`content-thin` est déclaré `majeur` mais pèse 6 (comme un mineur). Le passer à **14** (bande majeure). Rééquilibrer -8 sur des mineurs on-page sur-pondérés pour garder somme = 100. Répartition proposée (l'implémenteur peut ajuster tant que la somme reste 100 et `content-thin` = 14) :

- `structured-data-missing` 6 → 4
- `title-length` 6 → 4
- `meta-description-length` 6 → 4
- `open-graph-missing` 5 → 4
- `canonical-missing` 5 → 4

Vérification : 20+4+15+4+14+5+12+4+4+4+14 = 100. **Ne pas** toucher aux autres poids majeurs/mineurs (pas d'inflation).

## Centralisation du palier (hygiène)

Les seuils de palier sont aujourd'hui dupliqués : `AuditTeaser.tsx` (`scoreTone`), `emails.ts` (`scoreColor`), `page.tsx` (exemple). Créer un helper unique, ex. `src/data/audit-seo/bands.ts` :

- `type ScoreBand = "bas" | "moyen" | "haut"`
- `getScoreBand(score): ScoreBand` (bas <50, moyen 50-79, haut >=80)
- copie narrative par palier (conclusion + accroche CTA) centralisée ici, source de vérité unique consommée par teaser + email + prompt IA.

## Offre / prix

`src/data/audit-seo/offer.ts` (nouveau) :

```ts
// Prix de l'audit approfondi payant, déduit si les travaux sont confiés.
// PLACEHOLDER à valider par Valoux — changer ici uniquement, jamais en JSX.
export const DEEP_AUDIT_PRICE_EUR = 390;
```

Messaging associé : "Audit approfondi (390€, entièrement déduit si vous nous confiez les travaux)". Centraliser le libellé ici aussi.

## Changements UI / email

### Teaser (`src/components/audit-seo/AuditTeaser.tsx`)

Après la liste des constats, ajouter dans l'ordre :
1. Bloc **"Ce que cet audit ne mesure pas"** (4 dims constantes).
2. Bloc **conclusion + CTA** piloté par `getScoreBand(teaser.scoreGlobal)` : texte du palier + offre audit approfondi 390€ déduit + bouton vers `/contact` pré-rempli (URL auditée + score en query).
- Remplacer `scoreTone` local par le helper centralisé.
- Respecter DESIGN_SYSTEM (tokens, `text-secondary`, pas de HEX ; `<Section>`/`<Container>` non requis ici car composant interne, garder le style existant du teaser). Apostrophes JSX en `&apos;`.

### Email (`src/lib/audit-seo/emails.ts`)

- Section "Et maintenant ?" existante : la rendre **band-aware** (texte du palier via le helper) et intégrer l'offre 390€ déduit.
- Ajouter le bloc "Ce que cet audit ne mesure pas" (mêmes 4 dims), en HTML inline (contrainte email).
- CTA : conserver le bouton, pointer vers `/contact` pré-rempli (ou `NEXT_PUBLIC_BOOKINGS_URL` si défini, comportement actuel conservé). Remplacer `scoreColor` par le helper si mutualisable.
- Règle inchangée : symptôme + impact, jamais la méthode.

### Contact pré-rempli (`/contact`)

Vérifier que la route contact accepte un pré-remplissage via query (sujet/message avec URL + score). Si non supporté, l'ajouter a minima (pré-remplir le message). Ne pas créer de nouveau formulaire.

## Prompt IA (`src/lib/audit-seo/ai-synthesis.ts` + `src/data/audit-seo/ai-prompt.ts`)

- Passer le **palier** au prompt (dérivable de `scoreGlobal` déjà reçu) pour orienter le narratif : palier haut → reconnaître la solidité technique puis ouvrir vers conversion / SEO local / concurrence / reste du site + angle GEO, **sans inventer de défaut absent**.
- Renforcer l'interdiction existante : ne jamais fabriquer un constat, rester sur les constats calculés + les angles morts génériques (jamais présentés comme mesurés). Toujours pas de chiffre, pas de méthode.
- Le gating ne change pas le contrat IA (elle ne calcule rien).

## Tests (Vitest)

- `score.test.ts` : cas gating (`robots-noindex` → 30, `https-missing` → 55, plus bas gagne, `title-missing` sans effet) ; nouveau poids `content-thin` = 14 ; invariant somme axe on-page = 100.
- `bands` : table de vérité `getScoreBand`.
- `emails.test.ts` : présence du bloc "non mesuré", du CTA offre, du texte de palier.
- Ne pas casser les tests existants (115). Lancer `npm test` + typecheck/build.

## Hors périmètre (ne pas faire ici)

- **Mini-axe GEO mesuré** → `plans/audit-seo-geo.md` (chantier + calibrage séparés, rééquilibrage des `globalWeight`).
- Vue comparative avant/après du re-test (v1 = re-test simple suffit).
- Prix définitif (décision Valoux, on livre le placeholder).
