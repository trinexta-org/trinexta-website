# Design System TRINEXTA (v5)

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
| `text-secondary-strong` `bg-secondary` | Bleu clair - liens actifs, accents     |
| `text-muted-foreground`     | Gris - descriptions, texte secondaire      |
| `bg-accent`                 | Fond tres clair - cartes, hover            |
| `bg-background`             | Blanc - fond de page                       |
| `border-border`             | Bordures                                   |
| `text-primary-foreground` `text-secondary-strong-foreground` | Blanc - texte sur fond colore |
| `text-white/70`             | Texte secondaire sur fond sombre (footer, dark sections) |
| `text-secondary-soft`       | Accent sur fond sombre - `text-secondary` y tombe sous AA |
| `bg-surface` `bg-primary`   | Les deux tons de la partition clair/sombre |

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

#### Regles typo sur les headings

`tracking-normal` par defaut sur tous les titres — ne pas utiliser `tracking-tighter` ni `tracking-tight`.

#### Emphase italique dans les titres

Par defaut, le dernier mot d'un titre de plus de 2 mots est mis en italique automatiquement.

Pour choisir un mot specifique, utiliser `*mot*` dans la string — cela prend le dessus sur l'automatique.

```tsx
<Heading as="h2">Infogérance sans surprise</Heading>
// rendu automatique : "Infogérance sans <em>surprise</em>"

<Heading as="h2">Infogérance sans *surprise* garantie</Heading>
// override explicite : "Infogérance sans <em>surprise</em> garantie"

<Heading as="h2" emphasis={false}>Titre sans emphase</Heading>
// desactiver l'emphase entierement
```

Regle editoriale : quand le dernier mot n'est pas le mot fort (preposition, article, adjectif faible), utiliser `*mot*` pour pointer le bon mot.

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

### SectionBackground + SectionFade + WaveDivider

`SectionBackground` : fond decoratif des sections. Server Component, zero JS, mesh de degrades radiaux en CSS pur (aucun filtre SVG, rien d'anime). A poser en premier enfant de toute section a fond colore. `tone` : `"light"` | `"dark"` (obligatoire, doit s'accorder a la couleur que porte la Section). `intensity` : `"low"` | `"mid"` (defaut) | `"high"`.

La primitive ne peint PAS la couleur de fond, elle module celle de la Section. Un `tone` qui ne correspond pas a la classe `bg-*` se lit comme un voile.

Le mesh s'eteint sur les bords de la section : deux sections de meme ton se raccordent sans couture, et un raccord clair/sombre retombe sur l'aplat exact que peint le `WaveDivider`.

`SectionFade` : fondu `bg-primary` sur le bord d'une section pour raccorder deux sections sombres sans ligne de demarcation. `edge` : `"bottom"` (defaut) | `"top"` | `"both"`.

`WaveDivider` : raccord en vague entre deux sections de couleurs differentes. A poser ENTRE les deux sections, dans le flux. `from` = couleur du dessus, `to` = couleur du dessous. `amplitude` : `"ample"` (defaut) sur les raccords structurants, `"low"` ailleurs. La courbe derive au scroll (`animation-timeline: view()`), jamais en boucle permanente, et reste statique sous `prefers-reduced-motion`. `crossing={N}` designe un raccord ou le circuit des marges traverse la page : N est le rang du raccord traversant dans l'ordre de lecture (1, 2, 3...), impair = vers la droite, pair = retour vers la gauche. Sa vague ne derive plus (voir CircuitBorders).

**Prerequis** : la Section doit avoir `relative overflow-hidden`. Ordre dans la Section : `SectionBackground` → `SectionFade` → contenu en `relative z-10`.

```tsx
<Section container={false} className="relative bg-primary overflow-hidden">
  <SectionBackground tone="dark" intensity="mid" />
  <Container className="relative z-10">...</Container>
</Section>

<WhyChooseUs />                                              {/* bg-surface */}
<WaveDivider from="surface" to="primary" amplitude="low" />
<InterventionMap />                                          {/* bg-primary */}
```

---

### CircuitBorders (marges de page)

`CircuitBorders` est monte une fois dans `src/app/layout.tsx`. Server Component, zero JS : deux bandes fixes de `8rem` dans les gouttieres, visibles a partir de `2xl` seulement (en dessous, la gouttiere n'existe pas).

Le trace n'a pas de couleur propre. C'est un masque pose sur un `backdrop-filter: invert grayscale`, donc il prend en continu le contraste inverse de ce qui defile derriere : clair sur `bg-primary`, sombre sur `bg-surface`, et il bascule au milieu d'un `WaveDivider` en suivant la courbe. Ne pas lui donner de classe de couleur.

Un seul element porte l'effet : empiler deux calques a `backdrop-filter` inverserait deux fois et annulerait le contraste. L'intensite se module donc par l'alpha du masque, jamais par des couches successives.

**Les deux marges ne sont jamais allumees en meme temps.** Il n'y a qu'un courant : il descend la marge gauche, traverse la page en empruntant l'arete d'un `WaveDivider`, repart dans la marge droite, retraverse au raccord suivant, et alterne ainsi jusqu'au bas de page. C'est le seul moment anime fort de la page.

Les raccords qui portent une traversee sont marques `crossing={N}`, numerotes de 1 en 1 dans l'ordre de la page (landing : entree du bloc sombre, sortie du bloc sombre, entree de la carte d'intervention, entree du CTA final). Le sens decoule du rang : impair vers la droite, pair vers la gauche — le retour rejoue le meme balayage en `animation-direction: reverse`. Chaque raccord publie sa `view-timeline` `--circuit-crossing-N`, rendue visible aux marges par le `timeline-scope` pose sur `body`. Les relais sont donc cales sur les vagues elles-memes, pas sur des pourcentages de scroll : on peut ajouter ou retirer des sections au-dessus sans les decaler. Sur un raccord traversant la vague ne derive plus — une arete qui glisse pendant qu'un courant la parcourt donne deux vitesses pour un seul trait.

**Une marge s'allume et s'eteint plusieurs fois, donc sa presence n'est pas une animation.** Deux animations d'`opacity` sur un meme element ne se composent pas : la derniere gagne. Le courant est donc decoupe en segments, un par passage sur une marge (classes `--seg-N`, alignees sur la table `SEGMENTS` de `CircuitBorders`), et chaque segment porte deux vannes : `--circuit-gate-in` (relais d'entree) et `--circuit-gate-out` (relais de sortie). Ce sont deux proprietes distinctes, donc deux animations sur deux timelines les pilotent sans se marcher dessus, et l'opacite du trace est leur produit. Un segment n'existe qu'entre ses deux relais. Les segments d'une meme marge sont superposes et partagent le meme trace anime : le courant qui revient reprend la cadence de celui qui etait parti.

**Les vannes vivent sur le trace, jamais sur un parent.** C'est la raison d'etre du montage en custom properties, et pas une preference de style : un ancetre qui anime `opacity` ouvre un backdrop root, et le `backdrop-filter: invert` n'echantillonne alors plus la page qui defile mais le contenu du groupe — le trace perd son contraste et devient fantomatique. Regle generale ici : ne jamais interposer de boite entre la page et un element a `backdrop-filter`.

Chaque marge porte donc : le trace et l'impulsion sur `scroll(root)`, ses vannes sur les traversees qui l'encadrent.

**L'arete s'allume, rien ne la parcourt.** C'est le point de doctrine du raccord : aucun objet ne se deplace le long de la courbe. L'arete est doublee sur toute sa longueur par deux lignes de lumiere immobiles — la nappe (`halo`, large, floutee) et le coeur (`core`, un filament blanc fin) — et c'est un masque qui decide de ce qui est allume. Le masque est une bande large, degradee sur ses deux bords, translatee par `--circuit-head` (une variable enregistree en `@property`, heritee depuis le raccord, qui vaut donc directement l'abscisse du coeur de la lumiere en unites de courbe).

Consequence recherchee : la transition s'illumine progressivement d'un bout a l'autre, comme un eclairage qui balaie. Tout ce qui redonne a la lumiere une tete, une queue ou un contour la fait retomber en objet qui glisse — c'est l'echec a eviter, et la seule chose qui l'empeche est la largeur de la bande et le fondu de ses bords. La demi-largeur (470 unites, cote `WaveDivider`) est donc un reglage structurel, pas un detail : elle fixe la course et les deux relais de marges.

Le flou de la nappe est declare en filtre SVG et non en `filter: blur()` CSS : la region d'un filtre CSS sur un element SVG est sa boite elargie de 10 %, ce qui couperait la nappe aux cretes et aux creux, exactement la ou elle touche le bord de la boite. Le raccord `crossing` est le seul a lever le rognage (`overflow: visible`), sans quoi la nappe serait coupee net en haut et en bas : c'est possible parce qu'il porte la version courte du remplissage, qui tient dans la boite du SVG.

**Le relais est calcule, pas regle a l'oeil.** Le coeur de la lumiere va de -480 a 1680, soit 2160 unites de course. Les deux pistes sont a 32px du bord gauche et 24px du bord droit, soit x = 25 et x = 1181 en unites de courbe. Sur une traversee vers la droite, la marge de depart lache quand le coeur depasse sa piste (23,4 %), celle d'arrivee s'allume quand il atteint la sienne (76,9 %). Sur un retour, le balayage etant joue a l'envers, les memes instants tombent a 23,1 % et 76,6 % : les deux keyframes servent dans les deux sens, seul le cote auquel on les attache change. Ce sont deux passages du coeur et non des bords de bande : la bande est degradee, elle n'a pas d'arete a laquelle accrocher un instant. Entre les deux, aucune marge n'est tracee : le courant est en transit. Toute retouche de la course (`circuit-cross`) impose de recalculer `circuit-handoff-out` et `circuit-handoff-in`.

Sans raccord `crossing` sur la page, sans scroll-driven animations (Firefox) ou en `prefers-reduced-motion`, les vannes retombent a leur valeur declaree — les segments a relais d'entree gardent la leur fermee : seul le segment de tete subsiste — la marge gauche, figee et entierement tracee. C'est aussi ce qui empeche deux segments d'une meme marge de s'empiler, deux `backdrop-filter: invert` superposes s'annulant. La paire symetrique n'existe dans aucun etat.

Les deux dessins sont distincts, jamais un miroir : `circuit-trace.svg` (gauche, deux pistes tressees, tuile de 960px) et `circuit-trace-right.svg` (droite, une piste et une antenne morte, tuile de 720px). Les hauteurs de tuile different pour que les deux rythmes verticaux ne retombent jamais en phase. Deux lignes maximum par dessin, un halo latent revele par la crete d'impulsion. Toute retouche du dessin se fait dans le SVG, jamais dans le CSS.

Piege outil : dans les regles qui utilisent une timeline nommee, ecrire les longhands (`animation-name`, `animation-timing-function`...) et pas le raccourci `animation`. Lightning CSS recompose le raccourci et remplace alors `--circuit-crossing-N` par `view()`.

Deux vocabulaires de noeud, un par role. La **pastille** marque un point de la ligne : le trace est evide en disque autour d'elle, si bien qu'on lit ligne / anneau / vide / noyau. La **soudure** marque une jonction de deux pistes : elle ne coupe rien, goutte pleine et cercle de report. L'evidement est porte par un `<mask>` interne au SVG, jamais par un aplat de fond : le fichier est lui-meme un masque, seul son canal alpha est echantillonne, un disque noir y serait aussi opaque qu'un disque blanc.

---

### Surfaces vitrees

`.glass-panel` pose une surface `backdrop-filter` reglee par les tokens `--glass-bg`, `--glass-border` et `--glass-blur`.

**A ne poser que sur un fond qui a de la matiere a flouter** : le mesh d'une section sombre, ou une photo. Sur un aplat, le verre n'est que du flou decoratif, et une grille de cartes vitrees glisse tres vite vers le cliche.

Budget : au plus 3 surfaces vitrees visibles en meme temps, aucune au-dela de 40 % de la hauteur du viewport, `--glass-blur` plafonne a 16 px. Jamais derriere un `h1` de haut de page, qui est candidat LCP.

Ecart assume sur la landing : le bloc chiffres en compte 4 cote a cote. C'est le rendu valide par le PO ; toute surface vitree ajoutee ailleurs dans le meme ecran doit en retirer une ici.

---

### Contraste sur fond sombre

AA (4,5:1) sans exception. Deux regles issues de la refonte des fonds :

- `text-muted-foreground` est illisible sur les fonds sombres : utiliser `text-white/70`.
- `text-secondary` et `text-secondary-strong` tombent sous AA une fois le mesh sombre pose. L'accent sur fond sombre est `text-secondary-soft`.

---

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

  /* Fonds de section */
  --surface-tint: #f6fafd;
  --primary-tint: #24507d;

  /* Surfaces vitrees */
  --glass-bg: rgba(255, 255, 255, 0.07);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur: 16px;
}
```

`--glass-blur` est le premier curseur a bouger si le verre est juge trop ou pas assez marque.
