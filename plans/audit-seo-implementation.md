# Plan : Module audit SEO

> PRD source : `plans/audit-seo.md` (13 ADR) + `GLOSSAIRE.md`

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Routes** : page `/audit-seo` ; **une seule** route API `POST /api/audit-seo` (flux synchrone : valide → fetch → PageSpeed → score → IA → persiste → mail → renvoie Teaser).
- **Schéma** : modèle Prisma **`SeoAudit`** unique (pas de table d'events). Champs : `prenom, nom, email, entreprise, telephone?, consentAt`, `url, domain`, `scoreGlobal, sousScores(Json), findings(Json), pagespeed(Json), aiSummary(text?)`, `status` (`pending`/`done`/`failed`/`lead`), `createdAt, ipHash`. Migration Prisma obligatoire.
- **Data** (source de vérité) : `src/data/audit-seo/` — barème (poids + seuils), catalogue de constats, config des 4 axes.
- **Lib** : `src/lib/audit-seo/` — `assertPublicUrl` + fetch bridé, checks on-page, crawlabilité, pagespeed, moteur de score déterministe, emails.
- **4 axes de score** : Référencement on-page · Performance · Technique/crawlabilité · Contenu & SEO local. Score **/100 mécanique**, IA hors calcul.
- **IA** : Sonnet 5 (Haiku 4.5 fallback), bornée — ne fabrique jamais un chiffre, texte de la page = donnée non fiable (anti-injection). Réutilise le pattern `src/app/api/estimation/analyze/route.ts`.
- **Mail** : `sendMail` (Microsoft Graph) existant. Lead + notification équipe (`AZURE_FROM_EMAIL`). CTA RDV via `NEXT_PUBLIC_BOOKINGS_URL`.
- **Sécurité** : anti-SSRF maison, fetch bridé (timeout ~8 s, ≤ 5 Mo, HTML only, ≤ 3 redirects, UA `TrinextaAuditBot`), rate-limit via `checkRateLimit` existant.
- **Env** : ajouter `PAGESPEED_API_KEY` à `.env.example`. Réutilise `ANTHROPIC_API_KEY`, `AZURE_*`, `NEXT_PUBLIC_BOOKINGS_URL`.
- **Conventions** : Next.js 16 (Server Components par défaut), Tailwind v4 tokens, `<Section>`/`<Container>`, apostrophes `&apos;` en JSX, pas d'em dash. Précédent à calquer : module `estimation`.

## Stratégie de test

TDD ciblé sur la **logique pure et déterministe**, vérification en conditions réelles pour la **glue I/O** (fetch externe, PageSpeed, IA, mail). Le repo n'a pas encore d'infra de test : la Phase 1 pose le runner.

| Phase | Approche | Cibles TDD (logique pure) |
|---|---|---|
| **1** | **TDD fort** | `assertPublicUrl` (rejet IP privée/loopback/link-local v4+v6, re-check post-redirect). Reste (form, route, Prisma) : vérif réelle. |
| **2** | **TDD fort** | Moteur de score (findings → score déterministe) + checks on-page (HTML fixture → constats). |
| **3** | Partiel | Logique de dégradation (axe manquant → recalcul du global). Appel PageSpeed : vérif réelle. |
| **4** | Partiel | Garde-fou borné (IA ne modifie pas le score, filtrage ids hors liste). Qualité synthèse : éval manuelle. |
| **5** | Faible | Builder HTML snapshot optionnel. Envoi mail : vérif réelle. |
| **6** | Partiel | Logique rate-limit (email/domaine). Cas limites réseau : intégration. |

---

## Phase 1 : Tracer bullet end-to-end

**User stories** : en tant que prospect, je saisis une URL + mon identité sur `/audit-seo` et j'obtiens un score à l'écran ; le résultat est persisté.

### À développer

Tranche verticale minimale traversant toutes les couches. Page `/audit-seo` avec formulaire (URL + `email/prenom/nom/entreprise` obligatoires, `telephone` optionnel). Route `POST /api/audit-seo` qui : valide les entrées (Zod), applique `assertPublicUrl` (anti-SSRF) + fetch bridé, exécute **un seul check trivial** (présence du `<title>`), calcule un **score stub**, persiste un `SeoAudit`, renvoie le Teaser. UI : écran de progression puis Teaser (score + placeholder de constats). Rate-limit IP basique réutilisé. Pas de PageSpeed, pas d'IA, pas de mail.

### Critères d'acceptation

- [ ] Migration Prisma `SeoAudit` créée et appliquée en local
- [ ] `assertPublicUrl` rejette IP privée/loopback/link-local (v4+v6) et re-vérifie après redirection, avec tests
- [ ] Fetch bridé respecté (timeout, taille max, HTML only, max redirects, UA)
- [ ] `/audit-seo` affiche le formulaire, refuse une URL invalide côté client et serveur
- [ ] Un audit valide persiste un enregistrement et affiche un score stub à l'écran
- [ ] Rate-limit IP actif sur la route
- [ ] `npm run build` + typecheck OK

---

## Phase 2 : Moteur on-page + crawlabilité

**User stories** : en tant que prospect, mon score reflète de vrais problèmes de référencement on-page et techniques, et je vois les 3 plus graves.

### À développer

Barème réel et catalogue de constats dans `src/data/audit-seo/`. Checks on-page maison (title, meta description, Hn, alt manquants, canonical, Open Graph, JSON-LD, robots meta, nombre de mots, liens) et crawlabilité (`/robots.txt`, sitemap déclaré, HTTPS, mobile viewport). Moteur de score déterministe pour 2 axes réels (Référencement on-page, Technique/crawlabilité). Teaser = score + 3 constats les plus graves réels (symptôme + impact + gravité, jamais la méthode).

### Critères d'acceptation

- [ ] Barème et catalogue de constats centralisés dans `src/data/audit-seo/`
- [ ] Score des 2 axes déterministe (même page = même score), avec tests du moteur
- [ ] Constats formulés en symptôme + impact + gravité, sans correctif actionnable
- [ ] Teaser affiche le score global + les 3 constats les plus graves
- [ ] `npm run build` + typecheck OK

---

## Phase 3 : Axe Performance (PageSpeed)

**User stories** : en tant que prospect, mon score intègre la performance mobile réelle de ma page.

### À développer

Intégration Google PageSpeed Insights (stratégie `mobile`) → 3e axe (Performance). Extraction LCP/CLS/INP + scores Lighthouse. Dégradation propre : en cas d'échec/timeout, l'axe est marqué « non mesuré » et le score global se calcule sur les axes disponibles (jamais un faux chiffre). `PAGESPEED_API_KEY`.

### Critères d'acceptation

- [ ] Appel PageSpeed mobile intégré, données stockées dans `pagespeed(Json)`
- [ ] 3e axe intégré au score global
- [ ] Échec/timeout PageSpeed → axe « non mesuré », pas de crash, score recalculé sur les autres axes
- [ ] `PAGESPEED_API_KEY` documentée dans `.env.example`
- [ ] `npm run build` + typecheck OK

---

## Phase 4 : Synthèse IA (Sonnet 5)

**User stories** : en tant que prospect, je reçois un diagnostic priorisé, lisible et contextualisé localement, sans qu'on me donne les correctifs.

### À développer

Appel Sonnet 5 (pattern `estimation/analyze`) : reçoit `{ score, sousScores, findings[] }` + le texte visible de la page. Produit la Synthèse IA (priorisation + verbalisation ton `TONE.md` + angle SEO local) et alimente le narratif du 4e axe (Contenu & SEO local). Contraintes de prompt : jamais toucher un chiffre, jamais donner de méthode/correctif/snippet, texte de la page traité comme donnée non fiable (anti-injection). Dégradation propre si l'IA échoue (rapport factuel sans narratif). `aiSummary` persisté.

### Critères d'acceptation

- [ ] Synthèse IA générée et persistée dans `aiSummary`
- [ ] L'IA ne modifie jamais score ni sous-scores (vérifié)
- [ ] Prompt interdit explicitement la méthode/correctif et neutralise l'injection
- [ ] Échec IA → dégradation propre, l'audit aboutit sans narratif
- [ ] Haiku 4.5 configurable en fallback
- [ ] `npm run build` + typecheck OK

---

## Phase 5 : Livrable email

**User stories** : en tant que prospect, je reçois par mail un rapport complet ; en tant qu'équipe, je suis notifié de chaque lead.

### À développer

Email HTML autoportant via `sendMail` (Graph) : en-tête score /100 + 4 sous-scores, Synthèse IA, tous les constats groupés par axe (symptôme/impact/gravité, sans méthode), CTA RDV (`NEXT_PUBLIC_BOOKINGS_URL`). Notification interne vers `AZURE_FROM_EMAIL` (lead + score + constats). Le lead est exploitable même si l'envoi au prospect échoue (pattern `estimation/lead`). `status` passe à `lead`, `consentAt` enregistré.

### Critères d'acceptation

- [ ] Rapport HTML complet envoyé au prospect, autoportant, sans méthode de correction
- [ ] Notification équipe envoyée même si le mail prospect échoue
- [ ] Échec d'envoi mail géré proprement (log, statut cohérent)
- [ ] CTA RDV présent et fonctionnel
- [ ] `npm run build` + typecheck OK

---

## Phase 6 : Durcissement

**User stories** : en tant qu'exploitant, le module résiste aux abus et aux sites problématiques ; en tant que visiteur, je trouve des points d'entrée vers l'audit.

### À développer

Rate-limit additionnel par email et par domaine analysé (anti-boucle). CTAs d'entrée sur le site (nav / hero / footer / pages services concernées, selon `DESIGN_SYSTEM.md`). Robustesse des cas limites : site down, réponse non-HTML, page très lourde, redirections, contenu JS-only. Vérification finale `.env.example`.

### Critères d'acceptation

- [ ] Rate-limit par email et par domaine actifs
- [ ] Cas limites gérés sans crash ni faux score (site down, non-HTML, trop gros)
- [ ] Au moins un CTA d'entrée intégré au site, conforme au design system
- [ ] `.env.example` complet
- [ ] `npm run build` + typecheck OK
