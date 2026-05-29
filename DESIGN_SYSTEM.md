# Design System TRINEXTA (v4)

> Copie-colle ce fichier au debut de ta session LLM avant de coder une page ou section.

---

## Regles absolues

- Couleurs : toujours via les classes token (`text-primary`, `bg-secondary`) - jamais de HEX directs
- Mise en page : toujours `<Section>` comme bloc racine - jamais de `<div className="px-4 max-w-7xl mx-auto">`
- `"use client"` seulement si le composant utilise un hook React (useState, useEffect...)
- Textes UI en francais, pas d'emojis

---

## Tokens de couleur (`src/app/globals.css`)

| Classe Tailwind             | Usage                                      |
|-----------------------------|--------------------------------------------|
| `text-primary` `bg-primary` | Bleu fonce - titres, header, footer        |
| `text-secondary` `bg-secondary` | Bleu clair - liens actifs, accents     |
| `text-muted-foreground`     | Gris - descriptions, texte secondaire      |
| `bg-accent`                 | Fond tres clair - cartes, hover            |
| `bg-background`             | Blanc - fond de page                       |
| `border-border`             | Bordures                                   |
| `text-primary-foreground` `text-secondary-foreground` | Blanc - texte sur fond colore |
| `text-white/70`             | Texte secondaire sur fond sombre (footer, dark sections) |

---

## Layout

### Structure type d'une page

```tsx
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { ViewportHero } from "@/components/layout/ViewportHero"

// Section standard (Container inclus automatiquement)
<Section id="services">
  <Heading as="h2">Nos services</Heading>
</Section>

// Section pleine largeur avec fond colore
<Section container={false} className="bg-primary">
  <Container>
    <Heading as="h2" className="text-white">...</Heading>
  </Container>
</Section>

// Hero plein viewport disponible sous le header sticky
<ViewportHero>
  <div className="absolute inset-0 bg-primary" />
  <Container className="relative z-10 py-12 md:py-16 lg:py-20">
    <Heading as="h1" className="text-white">...</Heading>
  </Container>
</ViewportHero>
```

`<Section>` accepte : `id`, `className`, `container` (bool, defaut `true`).
`<Container>` accepte : `className`, `as` (balise HTML, defaut `div`).
`<ViewportHero>` accepte les props natives d'une `section`, dont `className`, `id`, `aria-*`.

### Regle hero

Utiliser `<ViewportHero>` pour les heros de haut de page qui doivent occuper exactement l'espace visible restant sous le menu.

Le header est `sticky` et reste dans le flux du document. Ne pas utiliser `h-[100dvh]`, `min-h-[100dvh]`, `min-h-[80dvh]` ou `min-h-[70dvh]` directement pour un hero de page : `100dvh` ajoute la hauteur du header et force un scroll, tandis que `70/80dvh` cree des heros trop courts selon les pages.

`<ViewportHero>` applique la hauteur standard :

```tsx
min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-7.5rem)]
```

Ces valeurs correspondent aux hauteurs du header mobile (`4rem`) et desktop (`7.5rem`). Garder les paddings internes sur le `Container`, typiquement `py-12 md:py-16 lg:py-20`, pour respirer sans casser la hauteur globale.

### Sections reutilisables 

```tsx
import { GridCards } from "@/components/layout/GridCards"
import { SplitContent } from "@/components/layout/SplitContent"
import { FinalCTA } from "@/components/FinalCTA"
import { TransitionTitle } from "@/components/TransitionTitle"

// Grille responsive (s'adapte auto ou via props)
// columns: 1 | 2 | 3 | 4 (defaut 3)
// mobileColumns: 1 | 2 | 3 | 4 (defaut 1)
<GridCards columns={3} mobileColumns={1} gap="gap-6 md:gap-8">
  <Card>1</Card>
  <Card>2</Card>
</GridCards>

// Image + Texte cote a cote
// imagePosition: "left" | "right" (defaut "left")
<SplitContent
  imageSrc="/images/photo.jpg"
  imageAlt="Description SEO"
  imagePosition="right"
>
  <Heading as="h2">Notre expertise</Heading>
  <Text>Description...</Text>
</SplitContent>

// Section d'appel a l'action finale (premium, avec fibres animees au scroll/fond)
// Toutes les props sont optionnelles
<FinalCTA
  line1="Prêt à ne plus"
  line2="subir votre"
  line3="informatique ?"
  description="Reprenez le contrôle avec un partenaire qui transforme vos défis en opportunités stratégiques."
  ctaLabel="Prendre RDV gratuit"
  ctaHref="/contact"
/>

// Section de transition textuelle premium (avec vagues de fibres de fond)
<TransitionTitle
  surtitle="Nos resultats"
  line1="Des chiffres clairs"
  line2="sans blabla"
/>
```

---

## Composants UI

Tous dans `src/components/ui/`.

### Typographie

```tsx
import { Heading, Text } from "@/components/ui/Typography"

<Heading as="h1">Titre hero</Heading>          // h1 — font-black, tres grand
<Heading as="h2">Titre de section</Heading>    // h2 — font-black, grand (defaut)
<Heading as="h3">Sous-titre</Heading>          // h3 — font-bold, moyen
<Heading as="h4">Petit titre</Heading>         // h4 — font-bold, petit

<Text>Paragraphe standard</Text>               // variant="body" — defaut
<Text variant="lead">Accroche</Text>           // plus grand, mis en avant
<Text variant="small">Note</Text>              // petit, discret
```

### Button

```tsx
import { Button } from "@/components/ui/Button"

// variant : "primary" (defaut) | "secondary" | "outline" | "ghost"
// size    : "sm" | "md" (defaut) | "lg"

<Button variant="primary" size="lg">Demander un devis</Button>
<Button variant="outline">En savoir plus</Button>
```

### Card, Badge

```tsx
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

<Card>                           // fond blanc, ombre legere, arrondi 2xl
  <Badge>Nouveau</Badge>         // label discret fond accent / texte secondary
  <Heading as="h3">...</Heading>
  <Text>...</Text>
</Card>
```

### Input, Textarea

```tsx
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

<Input type="email" placeholder="votre@email.fr" required />
<Textarea placeholder="Votre message..." rows={5} />
```

### FadeIn (animation au scroll)

```tsx
import { FadeIn } from "@/components/ui/FadeIn"

// direction : "up" (defaut) | "down" | "left" | "right" | "none"
// delay     : secondes (utile pour staggers en grille)

<FadeIn delay={0.1} direction="up">
  <Card>...</Card>
</FadeIn>
```

### Entrance (animation d'apparition immediate au chargement)

```tsx
import { Entrance } from "@/components/ui/Entrance"

// direction : "up" (defaut) | "down" | "left" | "right" | "none"
// delay     : secondes (defaut 0)
// duration  : secondes (defaut 0.8)

<Entrance delay={0.2} direction="up">
  <Heading as="h1">...</Heading>
</Entrance>
```

### Reveal (animation fluide au scroll ultra-performante sans framer-motion)

```tsx
import { Reveal } from "@/components/ui/Reveal"

// delay : secondes (defaut 0)

<Reveal delay={0.15}>
  <Card>...</Card>
</Reveal>
```

### HeroCarousel (carousel hero generique avec transitions fluides)

```tsx
import { HeroCarousel } from "@/components/ui/HeroCarousel"

<HeroCarousel
  slides={data}
  interval={6000}
  renderBackground={(slide, idx) => <div className="absolute inset-0 bg-primary" />}
  renderSlide={(slide, idx) => <Heading as="h1">{slide.title}</Heading>}
/>
```

---

## A ne pas faire

```tsx
<p className="text-[#0a233e]">...</p>               // HEX en dur - utiliser text-primary
<div className="px-4 max-w-7xl">...</div>           // layout manuel - utiliser <Section>
<Heading as="h3">Titre</Heading>                    // h3 sans h1/h2 parent - respecter l'ordre
import Image from "next/legacy/image"               // deprecated - utiliser next/image
```

---

## Modifier les tokens

Un seul fichier : `src/app/globals.css`, bloc `:root`.

```css
:root {
  --primary: #0a233e;
  --secondary: #5c92b8;
}
```
