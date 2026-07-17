# Suppression de framer-motion

Objectif : retirer framer-motion partout où c'est possible, en CSS pur, pour alléger le bundle JS (le chunk framer-motion ~136 Ko se chargeait sur presque toutes les pages via FinalCTA, TransitionTitle, etc.)

## Fait

- **FinalCTA.tsx** : ribbon SVG + cycle de couleur du titre → CSS keyframes (`ribbon-fiber`, `cta-word-1/2/3` dans globals.css)
- **Phase 1 (whileInView simples, marquees, compteurs, lignes de scroll)** — 16 fichiers convertis, tous via `FadeIn`/`Entrance` (existant) + nouvelles utilitaires CSS + 2 hooks :
  - `TransitionTitle.tsx`, `StudioDifferentiator.tsx`, `TechnicienAssurances.tsx`, `TechnicienProfiles.tsx`, `SereniteOptions.tsx`, `SereniteDifferentiator.tsx`, `SereniteTargets.tsx`, `OurNetwork.tsx`
  - `KpiSection.tsx`, `SereniteStats.tsx` (compteurs → `src/hooks/useCountUp.ts`)
  - `ApproachSection.tsx`, `ServicesProcess.tsx`, `TechnicienSteps.tsx` (ligne de progression scroll → `.scroll-progress-line` avec `animation-timeline: view()`)
  - `TechnicienPricing.tsx` (mockup téléphone flottant → keyframe locale `phone-float`)
  - `ProgressBar.tsx` (barre de lecture blog → `.scroll-progress-bar` avec `animation-timeline: scroll(root)`, masquée si non supporté)
  - `ServicesSection.tsx` (carrousel homepage : positions/rotateY/scale/opacity pilotées par transitions CSS sur inline style au lieu de `motion.div`, `useInView` maison au lieu de celui de framer)
- Nouveaux fichiers partagés : `src/hooks/useCountUp.ts`, `src/hooks/useInView.ts`
- Nouvelles classes utilitaires dans `globals.css` : `.ribbon-fiber`, `.cta-word-1/2/3`, `.animate-bar-grow`, `.scroll-progress-line`, `.animate-float-y`, `.scroll-progress-bar`, `.animate-arrow-fill-ltr/rtl`
- Supprimé `src/lib/motion.ts` (mort, plus aucun importeur)

Build + typecheck + eslint validés à chaque étape.

## Fait (Phase 2)

- `src/components/shared/FaqSection.tsx` + `src/components/contact/ContactFaq.tsx` — accordéons FAQ : `AnimatePresence` remplacé par un accordéon CSS pur (`grid-template-rows: 0fr/1fr` + opacité), contenu toujours monté, pas de hook nécessaire.
- `src/components/blog/NewsletterModal.tsx` + `src/components/studio/DemoModal.tsx` — modals : nouveau hook `src/hooks/usePresence.ts` (garde l'élément monté pendant l'animation de sortie CSS). DemoModal fige aussi `{url, title}` dans un state local (`content`) le temps de la sortie, car le parent nulle `url` dès la fermeture.
  - **Bug rencontré et corrigé** : la première version de `usePresence` dérivait son état via le pattern React "setState pendant le render" (recommandé pour les cas `props → state`). Ce pattern casse sous le double-rendu de StrictMode (actif en dev) : `shouldRender` retombait à `false` juste après l'ouverture, sans qu'aucun timer ne se déclenche — la modal ne s'affichait jamais et le scroll restait bloqué (l'effet de scroll-lock, lui, fonctionnait puisqu'indépendant). Diagnostiqué via logs dans le navigateur réel (le repro isolé en jsdom ne reproduisait pas le bug). Corrigé en réécrivant le hook avec uniquement des `useEffect` + `queueMicrotask` (aucune mutation de state pendant le render). Revalidé par clics répétés en conditions réelles.
- `src/components/a-propos/OurValues.tsx` — switch d'onglet : nouveau hook `src/hooks/useCrossfade.ts` (dérivé purement par `useEffect`+`queueMicrotask`, même précaution que `usePresence`). Barre de progression (`motion.div` width 0→100%) → `.animate-progress-fill` (nouvelle classe globals.css, durée pilotée par `--progress-duration`, redémarre via remount `key={safeActive}`).
- `src/components/services/ServicePage.tsx` :
  - Cartes flottantes (problème) → `.animate-float-y` existant, amplitude/durée via `--float-from/--float-to/--float-duration` inline.
  - Grille bento (crossfade par cellule au changement de `bentoOrder`) → extrait en sous-composant `BentoCell` qui appelle `useCrossfade` (impossible d'appeler un hook directement dans le `.map()`).
  - Modal mobile (bento) → `usePresence`, même pattern que NewsletterModal/DemoModal.
  - Bloc bénéfices (accordéon flex + spring `layout`) → transition CSS pure sur `flex` (`transition-[flex,...] ease-[cubic-bezier(0.34,1.56,0.64,1)]`, pas de FLIP nécessaire car pas de réordonnancement DOM) ; badge numéro toujours monté avec opacity togglée (plus besoin d'AnimatePresence, contenu non interactif) ; légende active en `transition-all` + `delay-100`.
- Build + typecheck + eslint validés, vérifié en navigateur réel par l'utilisateur.

### Nouvelle consigne utilisateur (en cours de Phase 2)
Si une animation framer est trop complexe/théâtrale à répliquer fidèlement en CSS, ne pas forcer une réplique exacte : proposer une version simplifiée (plus courte, moins chorégraphiée) et **demander validation avant d'implémenter**.

- `src/components/contact/ContactCards.tsx` et `src/components/a-propos/TrinextaMeaning.tsx` (variants + stagger, chorégraphie multi-étapes ~5-8s) : simplifiés sur validation utilisateur en un fade+translateY classique, stagger 100ms/carte, durée 700ms. Opacité finale de l'image de fond (0.4, `mix-blend-screen` sur TrinextaMeaning) conservée en className statique, ce n'était pas juste un état d'entrée.
  - **Bug rencontré et corrigé** : première implémentation avec le composant partagé `FadeIn` (`.animate-fade-in-scroll`, `animation-timeline: view()`) — invisible à l'usage réel. Cause : cette animation est **pilotée par la distance de scroll, pas le temps** (`animation-range: entry 5% cover 25%`) ; un scroll normal (molette/trackpad) traverse ce range en un seul geste, donc rien n'est perceptible. Tenté d'élargir le range (`entry 0% cover 40%`) → toujours pas assez pour un scroll rapide réel, car le problème est structurel (proportionnel à la distance, pas au temps), pas un problème de réglage. **Solution retenue** : abandon de `FadeIn`/`animation-timeline: view()` pour ces deux fichiers, remplacé par le hook maison `useInView` (IntersectionObserver, `once: true`) + transition CSS classique (`transitionDuration: 700ms`, stagger via `transitionDelay: index * 100ms`) — garantit une animation qui joue sur sa durée complète une fois l'élément détecté, indépendamment de la vitesse de scroll. Même pattern que `ServicesSection.tsx` (Phase 1). Gestion `prefers-reduced-motion` via `useSyncExternalStore` (même pattern que l'ancien `isMobile` de ContactCards), pas de `useEffect`+`setState` (lint `react-hooks/set-state-in-effect`).
  - **Point de vigilance pour la suite** : si un futur composant a besoin d'un fade au scroll, préférer `useInView` + transition CSS (time-based, fiable) plutôt que `FadeIn`/`.animate-fade-in-scroll` (scroll-linked, imperceptible sur les sections courtes/scroll rapide). `FadeIn` reste en l'état pour les 16 fichiers Phase 1 (non retouché, pas de régression signalée dessus), mais ne pas le réutiliser tel quel sans vérifier en scroll réel (pas juste par étapes de molette simulées) que l'effet est visible.
  - Validé : `npx tsc --noEmit`, `eslint`, `npm run build`, vérifié en navigateur réel (Chrome via extension) avec scroll réel (pas de scrollTo() JS — ne fonctionne pas sur onglet en arrière-plan/non focus, halte-là si un futur test JS de scroll semble ne rien faire).

## Fait (Phase 3 — derniers fichiers)

- `src/components/WhyChooseUs.tsx` — `layout`/FLIP en fait un simple changement de `flex-grow` entre onglets (pas de réordonnancement DOM) → `transition-all` CSS pure sur `style={{flex}}`. Badge numéro et panneau info : `AnimatePresence` remplacé par opacity/scale togglés en CSS, contenu toujours monté.
- `src/components/blog/blogMarquee.tsx` — largeur de carte au survol déjà pilotée par classes Tailwind conditionnelles (le `layout` framer était redondant) → simple `div` + `transition-all`. Révélation de l'extrait au survol → accordéon CSS `grid-template-rows` (même pattern que `FaqSection.tsx`/`ContactFaq.tsx`).
- `src/components/blog/BlogInteractiveCarousel.tsx` — position/scale/opacity des cartes du carrousel pilotées par `transform`/`opacity` inline + `transition-all` (même pattern que `ServicesSection.tsx` Phase 1). Excerpt au survol → accordéon CSS grid-rows. Mockup téléphone (`AnimatePresence` avec y/opacity/rotate) → toujours monté quand la carte est centrale, visibilité togglée en CSS (`translate-y`/`opacity`), limite l'exit-animation manquante à un cas d'interaction quasi impossible à déclencher (cf. détail dans le code).
- `src/components/InterventionMap.tsx` — le plus dur du lot, converti en 5 étapes :
  - Balayage radar (`useAnimationFrame` + état React par frame) → forme SVG statique dessinée à angle=0, tournée en continu par `<animateTransform>` natif SVG (même technique que les anneaux d'engrenage déjà présents dans ce fichier). Zéro boucle JS pour le rendu.
  - Détection de croisement département → la vitesse de rotation étant désormais constante et déterministe, remplacée par un `setTimeout`/`setInterval` précalculé par département (horaire de passage exact = `(angle/360) * période`), au lieu d'un polling par frame.
  - Pulses "lock"/"flash" au croisement → `@keyframes` CSS (`radar-lock-draw`, `radar-flash` dans `globals.css`), rejoués gratuitement via remount de `key` React (React key change), aucun état JS d'animation nécessaire.
  - Texte d'étape (`AnimatePresence mode="wait"`), panneau "cibles actives", pastilles département, icône QG flottante → CSS (`fade-in-up`, `fade-in-scale` nouvelles classes ; `.animate-progress-fill` et `.animate-float-y` existantes réutilisées). Simplification validée par l'utilisateur : l'orchestration "wait" (sortie avant entrée) et l'animation de sortie du panneau/pastilles sont abandonnées au profit d'une disparition instantanée — seule l'entrée reste animée.
  - Les marqueurs de département sur la carte n'avaient déjà aucune animation de sortie côté framer (pas de `AnimatePresence`) → conversion directe, sans perte.
- Nouvelles classes CSS globales : `.animate-fade-in-up` (`--y-from`), `.animate-fade-in-scale` (`--scale-from`), `.animate-radar-lock`, `.animate-radar-flash`.
- Validé : `tsc --noEmit`, `eslint`, `npm run build` (tous propres) pour les 4 fichiers. Vérification visuelle faite par l'utilisateur directement (pas via l'extension Chrome cette fois, indisponible en session).

## Fait (Phase 4 — dernier fichier)

- `src/components/layout/MobileMenuPanel.tsx` — panneau menu mobile : `AnimatePresence` (overlay + slide-in `aside`) remplacé par `usePresence` (même pattern que `NewsletterModal`/`DemoModal`) + `transition-opacity`/`transition-transform` CSS. Accordéon sous-menu → `grid-template-rows` (même pattern que `FaqSection`/`ContactFaq`).
- `framer-motion` retiré de `package.json` (plus aucun importeur dans `src/`).
- Validé : `tsc --noEmit`, `eslint`, `npm run build` (tous propres).

## Terminé

Suppression de framer-motion complète — plus aucun fichier du projet ne l'utilise, dépendance désinstallée.
