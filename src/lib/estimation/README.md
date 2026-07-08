# Module estimation

Tunnel d'estimation de `/estimation` : un wizard de questions en langage client, un moteur de calcul déterministe alimenté par les grilles tarifaires officielles, et une capture de lead par email.

## Vue d'ensemble

```
Visiteur répond (max 7 questions + champ libre)
        │
        ▼
flow.ts ── detectServices : réponses -> services (jamais choisis directement)
        │
        ▼
engine.ts ── computeEstimate : (réponses + grilles) -> fourchettes par service
        │                       ▲
        │                       └── analyze/route.ts : l'IA lit le champ libre et
        │                           coche des modificateurs bornés (jamais un prix)
        ▼
ResultScreen ── affichage + EmailCapture -> emails.ts (lead + notification équipe)
```

| Fichier | Rôle |
|---|---|
| `src/data/estimation/types.ts` | Types des questions et des grilles (source de vérité des formes de pricing) |
| `src/data/estimation/questions.ts` | Arbre de questions, plafond `MAX_QUESTIONS = 7` |
| `src/data/estimation/grids/*.ts` | Une grille par service : la seule source de prix du site |
| `src/lib/estimation/flow.ts` | Séquence adaptative des questions + détection des services |
| `src/lib/estimation/engine.ts` | Moteur de calcul pur et déterministe |
| `src/lib/estimation/emails.ts` | Emails HTML (lead + notification interne), types en miroir du moteur |
| `src/app/api/estimation/*` | Persistance (Prisma `Estimate`), analyse IA, envoi email |

## Principes non négociables

1. **Le prix est mécanique.** Mêmes réponses = même fourchette. Le serveur recalcule tout : les montants envoyés par le client ne sont jamais repris.
2. **L'IA ne fixe jamais un prix.** Elle ne peut que sélectionner des `aiModifiers` déclarés dans les grilles, avec des pourcentages bornés. Sans analyse IA, la fourchette est élargie (`widenedSpreadPercent`), jamais fausse.
3. **On n'affiche pas de chiffre qu'on ne sait pas tenir.** Volume au-delà du dernier palier, Cloud & PRA : carte "sur devis", exclue des totaux.
4. **Toujours une fourchette, jamais un prix ferme** (exception : les calculs exacts type M365 mise en place, affichés en montant unique).

## Les 5 formes de pricing (`pricing.kind`)

### `recurring` : volume × tarif dégressif

Ex. infogérance, 10 postes : palier `upTo: 15` -> 74 €/poste -> 740 €/mois, puis modificateurs multiplicatifs (+15 % serveur = 851 €), puis fourchette ±10 % (IA) ou ±20 % (sans IA).

Pas de socle fixe. Si aucun palier ne couvre le volume (ex. 55 postes, dernier palier 40), le service bascule en `kind: "quote"` avec la ligne "Au-delà de 40 postes, sur devis".

### `one-shot` : palier de complexité

Ex. Trinexta Studio : la réponse `projet-envergure` sélectionne un palier `{min, max}`, les modificateurs s'appliquent en multiplicatif. Pas d'élargissement sans IA pour ce kind.

### `one-shot-formula` : calcul exact

Ex. M365 mise en place : `490 € + nb boîtes × 250 €` (nb boîtes = effectif). `min === max`, affiché en montant unique.

### `range` : curseur borné dans une fourchette native (régie)

Une grille par catégorie (Support & Infra 350-780, Développement 350-950, Cybersécurité 450-1000, Pilotage 500-850 €/jour).

1. Curseur à 0.5, décalé par l'effectif (`RANGE_EFFECTIF_DELTAS` : solo/petite -0.15, grande +0.15)
2. Chaque modificateur décale le curseur de `percent/100` (interprétation **additive en position**, pas multiplicative : un profil expert se situe plus haut dans la fourchette, il ne coûte pas "+20 % du milieu")
3. Clamp dans [0, 1] -> `dayRate = low + position × (high - low)`
4. Mode B : profil régulier/plein + `renfort-duree` répondue -> décote -5 % (6 mois) ou -10 % (12 mois), plancher `low × 0.85`
5. × jours/mois du profil (`renfort-profil` : ponctuel 2, régulier 10, plein 20), ±5 % d'affichage
6. Agrégé dans le total mensuel (`kind: "recurring"`)

### `quote` : toujours sur devis

Ex. Cloud & PRA. Aucun calcul, une ligne explicative, un CTA rendez-vous. Exclu des totaux `monthlyMin/Max` et `oneShotMin/Max`.

## Règles de détection (flow.ts)

- `lenteurs` -> infogérance ; `securite` seul (sans `lenteurs`) -> cybersécurité (déjà incluse dans l'infogérance, pas de doublon)
- `sauvegarde` -> sauvegarde managée ; + serveurs "plusieurs" -> + Cloud & PRA (sur devis)
- `collaboration` -> M365 gestion ; + mise en place sauf si M365 déjà en place (question tronquée = mise en place prévue, hypothèse prudente)
- `renfort` -> une des 4 régies selon `renfort-categorie` (fallback Support & Infra si tronquée)
- `depannage` sans `lenteurs` -> support à la carte
- `projet` -> Studio ou Solutions métier selon `projet-type`

Le plafond de 7 questions tronque les questions de suivi les moins prioritaires : chaque grille porte des `fallbackUnits` / `fallbackTierOptionId` pour rester calculable avec des réponses manquantes.

## Modifier une grille tarifaire

1. Éditer le fichier dans `src/data/estimation/grids/` (jamais de prix ailleurs : ni composant, ni moteur, ni email).
2. Les `percent` des `answerAdjustments`/`aiModifiers` s'interprètent selon le kind (multiplicatif partout, additif en position pour `range`) : voir `types.ts`.
3. Nouveau service : ajouter l'id à `EstimationServiceId` (types.ts), la grille, l'entrée dans `ESTIMATION_GRIDS` (index.ts), et la règle de détection (flow.ts).
4. Vérifier : `npx tsc --noEmit`, `npm run lint`, parcours manuel sur `/estimation`.

Les estimations persistées (`Estimate.breakdown` en JSON) gardent les montants de l'époque : un changement de grille ne réécrit pas l'historique.
