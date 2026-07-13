# Module audit SEO — décisions d'architecture (ADR)

Issu de la session `/grill-with-docs` du 2026-07-13. Objectif : lead-magnet gratuit — un prospect obtient un audit SEO d'une page depuis `/audit-seo` et reçoit une synthèse par mail. But : capter des leads. Glossaire : `GLOSSAIRE.md`.

Précédent de référence : le module `estimation` (`src/lib/estimation/README.md`). Mêmes principes : faits mécaniques déterministes, IA bornée qui ne fabrique jamais un chiffre, persistance Prisma, capture lead + mail via Microsoft Graph, rate-limit par IP hashée.

## Décisions

### ADR-1 — Surface : une seule page
On analyse uniquement l'URL fournie (souvent la home), pas un crawl. Le différenciateur « faire mieux que les concurrents » n'est pas la profondeur de crawl (générique et coûteuse) mais la **qualité de la Synthèse IA** posée sur des faits fiables. Porte ouverte à un mini-crawl ultérieur, hors v1.

### ADR-2 — Trois sources de faits
On-page (parsing HTML maison) + crawlabilité (robots/sitemap, maison) + Performance via **Google PageSpeed Insights API** (gratuit, crédible). Ce sont des faits durs sur lesquels l'IA s'appuie.

### ADR-3 — Expérience synchrone
URL + identité → écran de progression 15-20 s → Teaser à l'écran + Rapport par mail. Pas de file de jobs (le VPS n'en a pas). Tient dans les timeouts. Dégradation propre si la Cible est trop lente.

### ADR-4 — IA = synthèse + priorisation + jugement éditorial (Sonnet 5)
L'IA reçoit `{ score, sousScores, findings[] }` + le texte visible de la page. Elle **priorise, verbalise (ton `TONE.md`, angle local), et juge la qualité sémantique/éditoriale** sous l'angle SEO local. Elle ne touche **jamais** aux chiffres. Texte de la page traité comme donnée non fiable (anti-injection, cf. `estimation/analyze`). Modèle **Sonnet 5** (la synthèse EST le produit) ; Haiku 4.5 en fallback de coût.

### ADR-5 — Révélation : symptôme + impact, pas la méthode
Règle maison `trinexta-docx-gen` (« symptôme et bénéfice oui, méthode non »). Chaque **Constat** = symptôme + impact business + gravité, terminé par la valeur d'un accompagnement. **Interdiction de prompt** : pas de correctif actionnable, pas de snippet, pas de checklist « faites A puis B ». Dosage : Teaser écran = score + 3 constats les plus graves ; Rapport mail = tous les constats (toujours sans méthode) ; le *comment* se débloque en RDV.

### ADR-6 — Gate en amont
Formulaire URL + identité **avant** lancement. Le Teaser ayant de la valeur en soi, on capte le Lead avant de l'offrir. L'attente de l'analyse est la contrepartie du mail. Champs : `email`, `prenom`, `nom`, `entreprise` obligatoires ; `telephone` **optionnel** (données : tél obligatoire = -5 à -37 % de conversions ; en B2B l'écart est atténué mais jamais positif — on capte le tél au moment fort du RDV).

### ADR-7 — Sécurité anti-SSRF (maison)
`assertPublicUrl` : `http(s)` + domaine public uniquement, résolution DNS + rejet IP privée/loopback/link-local (v4 et v6), re-check après redirection (max 3). Fetch bridé : timeout ~8 s, taille ≤ 5 Mo, HTML only, user-agent `TrinextaAuditBot`. Rate-limit (`checkRateLimit` réutilisé) : ~3 audits / 10 min / IP, + plafond par email et par domaine.

### ADR-8 — Score mécanique /100 + 4 axes
Axes : Référencement on-page · Performance · Technique/crawlabilité · Contenu & SEO local. Barème (poids + seuils) figé dans `src/data/audit-seo/`. Global = moyenne pondérée. **L'IA est hors du calcul** (même Cible = même Score). L'axe Contenu a une part mécanique + un jugement IA qui nourrit le **narratif**, pas la **note**.

### ADR-9 — Persistance : modèle `SeoAudit` unique
Champs : identité lead + `consentAt`, `url`/`domain`, `scoreGlobal`, `sousScores` (Json), `findings` (Json), `pagespeed` (Json), `aiSummary` (nullable), `status` (`pending`/`done`/`failed`/`lead`), `createdAt`, `ipHash`. Pas de table d'events séparée. Rétention alignée estimation (pas de TTL au lancement). Migration Prisma requise.

### ADR-10 — Emplacement
Route page `/audit-seo`. **Une seule** route API `src/app/api/audit-seo/route.ts` (POST synchrone : valide → fetch → PageSpeed → score → IA → persiste → mail → renvoie Teaser). `src/data/audit-seo/` (barèmes, poids, catalogue de constats, seuils). `src/lib/audit-seo/` (`fetch.ts` + `assertPublicUrl`, `checks.ts`, `pagespeed.ts`, `score.ts`, `emails.ts`).

### ADR-11 — Livrable
Email HTML (via `sendMail`/Graph) : en-tête score /100 + 4 sous-scores, Synthèse IA, tous les Constats groupés par axe (symptôme/impact/gravité), CTA RDV (`NEXT_PUBLIC_BOOKINGS_URL`). Mail autoportant (repris à plat). Notification interne équipe vers `AZURE_FROM_EMAIL`. **Pas de PDF** en v1.

### ADR-12 — PageSpeed mobile seul
Stratégie `mobile` (mobile-first indexing), 1 appel. Échec/timeout → Axe Performance « non mesuré », score sur les autres axes.

### ADR-13 — Audit approfondi payant = hors périmètre v1
Le payant est une **prestation humaine** vendue en RDV (option B), pas un produit self-service. Le module gratuit l'**amorce** via le CTA RDV. Un produit payant automatisé (Stripe + crawl + async) serait un module séparé, pas dans ce périmètre. Préserve le positionnement (gratuit = teaser auto, payant = expertise humaine), zéro cannibalisation.

## Variables d'environnement (à ajouter à `.env.example`)
- `PAGESPEED_API_KEY` (clé Google PageSpeed Insights)
- Réutilisés : `ANTHROPIC_API_KEY`, `AZURE_*` / `AZURE_FROM_EMAIL`, `NEXT_PUBLIC_BOOKINGS_URL`

## Hors périmètre (v2 / plus tard)
- Mini-crawl multi-pages (ADR-1)
- PDF joint (ADR-11)
- Produit payant automatisé self-service (ADR-13)
- Table d'events analytics (ADR-9)
