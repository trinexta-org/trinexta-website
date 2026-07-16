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

## Reste à faire

### Phase 2 — AnimatePresence (modals/accordéons), risque modéré
Nécessite un petit hook de montage/démontage CSS (garder l'élément monté pendant l'animation de sortie, via `transitionend` ou un délai, à la place de `AnimatePresence`).

- `src/components/shared/FaqSection.tsx` — accordéon FAQ
- `src/components/contact/ContactFaq.tsx` — accordéon FAQ (même pattern)
- `src/components/blog/NewsletterModal.tsx` — modal
- `src/components/studio/DemoModal.tsx` — modal
- `src/components/layout/MobileMenuPanel.tsx` — panneau menu mobile (déjà lazy-loadé au clic, donc moins urgent)
- `src/components/a-propos/OurValues.tsx` — switch d'onglet (`AnimatePresence mode="wait"`)
- `src/components/services/ServicePage.tsx` — mélange : cartes flottantes (simple, cf. Phase 1 `.animate-float-y`) + `AnimatePresence` pour le switch d'onglet et la modal

### Décidé : gardés en framer-motion (cas complexes, dynamiquement importés si besoin)
- `src/components/InterventionMap.tsx` — `useAnimationFrame` + SVG animé
- `src/components/blog/BlogInteractiveCarousel.tsx` — carrousel blog
- `src/components/a-propos/TrinextaMeaning.tsx` — variants + stagger
- `src/components/contact/ContactCards.tsx` — variants + stagger
- `src/components/WhyChooseUs.tsx` — `layout` (FLIP) + `AnimatePresence`, pas encore tranché explicitement, probablement à garder aussi (même profil de risque que TrinextaMeaning/ContactCards)
- `src/components/blog/blogMarquee.tsx` — `layout` + `AnimatePresence`, idem, pas encore tranché

## Pour reprendre

Relire ce fichier, proposer à l'utilisateur de continuer par la Phase 2 (accordéons/modals d'abord, c'est le sous-groupe le plus homogène), fichier par fichier avec build/typecheck après chaque conversion.
