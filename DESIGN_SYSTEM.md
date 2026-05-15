# Design System Trinexta (v4)

Ce document répertorie les outils et composants mis en place pour assurer la cohérence visuelle du site.

## Design Tokens (Tailwind v4)
Les variables sont centralisées dans `src/app/globals.css`.
- **Primary** : `#0a233e` (Bleu foncé Trinexta)
- **Secondary** : `#5c92b8` (Bleu clair Trinexta)
- **Accent** : `#f0f5f9` (Fond léger pour cartes/hover)

## Layout Patterns
Utilisez ces composants pour structurer les pages :
- `<Container>` : Gère la largeur maximale (7xl) et les marges latérales.
- `<Section>` : Gère les espacements verticaux (py-16 à py-32).

## Primitives UI (`src/components/ui/`)
- `<Button>` : Supporte les variantes `primary`, `secondary`, `outline`, `ghost`.
- `<Heading>` : Niveaux `h1` à `h4` avec typographie Trinexta (Black/Bold).
- `<Text>` : Variantes `body`, `lead`, `small`.
- `<Card>` : Conteneur blanc avec ombre légère et arrondi 2xl.

## Règles d'usage technique
- **Structure** : Une `<Section>` est toujours le parent direct d'un `<Container>`.
- **Sémantique** : Utilisez les balises de titres (`h1` > `h2` > `h3`) dans l'ordre logique.
- **Tokens** : Utilisez les classes thématiques (`text-primary`, `bg-secondary`) au lieu des codes HEX.