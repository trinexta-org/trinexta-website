# Plan : Tunnel d'estimation de devis

> PRD source : session grill-me du 2026-07-02 (synthèse des décisions actées, pas de SFD formel)

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Routes** : page `/estimation` (tunnel en client component), API `POST /api/estimation` (complétion), `POST /api/estimation/events` (événements par étape), `POST /api/estimation/analyze` (analyse IA), `POST /api/estimation/email` (envoi du détail).
- **Schéma Prisma** : modèle `Estimate` (réponses JSONB, services détectés, fourchette min/max, email nullable, consentement, statut) et `EstimateEvent` (estimateId nullable ou sessionId, étape, timestamp). Aucune PII sans consentement, IP uniquement hashée pour le rate limit.
- **Grille tarifaire** : fichiers TypeScript dans `src/data/estimation/` (source de vérité, conformément à la règle src/data). Récurrent = prix par unité/mois avec dégressivité par tranches ; one-shot = paliers de complexité ; modificateurs bornés (± %) déclarés dans la grille. Valeurs placeholder tant que Valoux n'a pas validé : pas de merge vers main avant validation.
- **Moteur de calcul** : purement déterministe, fonction pure (réponses + grille -> fourchette). L'IA ne fixe jamais un prix : elle sélectionne des modificateurs prédéfinis parmi la liste bornée.
- **IA** : Claude Haiku 4.5 via API Anthropic côté serveur (`ANTHROPIC_API_KEY` déjà dans `.env.example`), sortie structurée (tool use). Champ libre optionnel : si vide ou API indisponible, calcul sans ajustement et fourchette élargie annoncée comme telle.
- **UX** : découverte du besoin d'abord (le tunnel déduit les services, bundles multi-services possibles), 5-7 questions adaptatives, une question par écran, cartes cliquables, révélation de la fourchette à la fin seulement. Respect de `DESIGN_SYSTEM.md` et `TONE.md` (pas de em dash, `&apos;` en JSX).
- **Email et RDV** : email HTML détaillé via `src/lib/mail.ts` (Microsoft Graph existant), CTA RDV vers Microsoft Bookings (lien fourni plus tard, variable d'env).
- **Validation** : schémas zod dans `src/lib/validations/` (pattern du formulaire contact).

---

## Phase 1 : Squelette du tunnel (tracer bullet)

**User stories** : « En tant que prospect, je réponds à quelques questions simples et j'obtiens immédiatement une fourchette de prix pour mon besoin d'infogérance. »

### À développer

Le chemin complet le plus mince : page `/estimation` avec le moteur de wizard adaptatif (état, navigation avant/arrière, une question par écran, cartes cliquables, barre de progression), un arbre de découverte minimal qui ne route que vers l'infogérance, la grille placeholder `src/data/estimation/` pour ce seul service, le moteur de calcul déterministe, et l'écran de révélation finale avec la fourchette en euros/mois et le libellé « estimation indicative, non contractuelle ». Ni IA, ni base de données, ni email : tout est côté client sauf la grille importée.

### Critères d'acceptation

- [ ] `/estimation` est accessible et le tunnel se termine en moins de 7 questions pour un profil infogérance
- [ ] Les réponses modifient la fourchette calculée (volume de postes, criticité) de façon déterministe et reproductible
- [ ] La fourchette n'apparaît qu'à l'écran final, avec décomposition et libellé non contractuel
- [ ] Retour arrière possible à chaque étape sans perte des réponses
- [ ] Parcours complet fonctionnel au clavier et sur mobile
- [ ] `npm run build` et typecheck passent

---

## Phase 2 : Persistance et événements

**User stories** : « En tant que membre de l'équipe Trinexta, je vois en base les estimations réalisées et les étapes où les visiteurs abandonnent. »

### À développer

Modèles Prisma `Estimate` et `EstimateEvent` avec migration. Le tunnel émet un événement à chaque étape franchie (fire-and-forget, jamais bloquant pour l'UX) et enregistre l'estimation complète à la révélation. Les parcours anonymes ne contiennent aucune donnée identifiante. Un identifiant de session éphémère relie les événements d'un même parcours.

### Critères d'acceptation

- [ ] Migration Prisma créée via `npx prisma migrate dev` et schéma cohérent avec `schema.prisma`
- [ ] Chaque étape franchie crée un `EstimateEvent` rattaché à la session
- [ ] Une complétion crée un `Estimate` avec réponses, services détectés et fourchette
- [ ] Aucune PII ni IP en clair dans les deux tables pour un parcours anonyme
- [ ] Une panne de l'API d'événements ne bloque ni ne ralentit le tunnel côté visiteur

---

## Phase 3 : Catalogue complet et bundles

**User stories** : « En tant que prospect qui ne connaît pas le catalogue Trinexta, je décris ma situation et le tunnel identifie seul le ou les services pertinents, y compris un projet ponctuel. »

### À développer

Arbre de découverte complet : les premières questions portent sur la situation (taille, parc, problème à résoudre) et déduisent le ou les services parmi tout le catalogue (infogérance, cybersécurité, cloud-sauvegarde, Microsoft 365, support, régie, solutions métier, Trinexta Studio). Grilles tarifaires placeholder pour chaque service : unitaire dégressif pour le récurrent, paliers de complexité pour le one-shot. Restitution finale décomposée par service, avec récurrent (euros/mois) et one-shot (euros) présentés séparément quand un bundle est détecté.

### Critères d'acceptation

- [ ] Aucune question ne demande de choisir un service dans une liste : la détection découle des réponses
- [ ] Chaque service du catalogue est atteignable par au moins un chemin de réponses
- [ ] Un profil mixte (ex : infogérance + site web) produit une restitution bundle avec les deux fourchettes distinctes
- [ ] L'adaptativité tient la promesse : jamais plus de 7 questions quel que soit le chemin
- [ ] Les grilles de tous les services vivent dans `src/data/estimation/` et sont typées

---

## Phase 4 : Analyse IA du champ libre

**User stories** : « En tant que prospect, je décris mon contexte en texte libre et l'estimation s'affine ; si je saute cette étape, j'obtiens quand même une fourchette. »

### À développer

Étape champ libre optionnelle avant la révélation, avec incitation « décrivez votre contexte pour affiner l'estimation ». Route `POST /api/estimation/analyze` : appel Claude Haiku 4.5 en sortie structurée qui sélectionne des modificateurs parmi la liste bornée déclarée dans la grille, jamais un prix. État d'attente assumé côté UX (« analyse en cours »). Dégradation propre : champ vide, API en erreur ou timeout -> calcul sans ajustement et fourchette élargie, annoncée comme telle. Anti-abus : rate limit par IP hashée et cap de longueur du texte en entrée.

### Critères d'acceptation

- [ ] Un texte décrivant un contexte complexe resserre ou déplace la fourchette via des modificateurs bornés uniquement
- [ ] Champ vide ou API coupée : le tunnel aboutit quand même, fourchette plus large et annoncée comme telle
- [ ] La sortie IA est validée côté serveur : un modificateur hors liste est rejeté
- [ ] Rate limit effectif par IP hashée et longueur du champ plafonnée côté client et serveur
- [ ] Timeout de l'appel IA borné, l'utilisateur n'attend jamais indéfiniment
- [ ] Les modificateurs appliqués sont persistés dans l'`Estimate`

---

## Phase 5 : Conversion (email détaillé, notification, RDV)

**User stories** : « En tant que prospect convaincu, je reçois le détail par email ou je prends rendez-vous ; en tant que commercial Trinexta, je suis notifié dès qu'un lead laisse son email. »

### À développer

Écran final enrichi de deux CTA : « Recevoir l'estimation détaillée par email » (champ email + case de consentement explicite, envoi d'un email HTML via `src/lib/mail.ts` : récapitulatif des réponses, décomposition par service, prochaines étapes, lien RDV) et « Prendre RDV » (lien Microsoft Bookings via variable d'env). L'email laissé est rattaché à l'`Estimate` avec le consentement horodaté, et déclenche une notification équipe (email interne via Graph, pattern du formulaire contact).

### Critères d'acceptation

- [ ] L'envoi email exige la case de consentement cochée, refus sinon (client et serveur)
- [ ] L'email HTML reçu contient récapitulatif, décomposition par service et lien RDV, dans le ton `TONE.md`
- [ ] L'`Estimate` anonyme devient identifié uniquement après consentement
- [ ] L'équipe reçoit une notification avec le contexte du lead à chaque email laissé
- [ ] Le CTA Bookings pointe vers l'URL configurée en variable d'env
- [ ] Un échec d'envoi email est signalé au visiteur sans perdre son estimation affichée

---

## Phase 6 : Entrées, conformité et finitions

**User stories** : « En tant que visiteur de n'importe quelle page, j'accède au tunnel en un clic ; en tant que responsable, le traitement des données est documenté et purgé à 12 mois. »

### À développer

CTA « Estimer mon projet » dans le header global. Script de purge des estimations sans suite (plus de 12 mois, sans email) exécuté par cron système sur le VPS, avec commande npm dédiée. Mise à jour de `/confidentialite` (nouveau traitement : finalité, durée de rétention, consentement). Metadata SEO de `/estimation` (title, description, OG image, sitemap).

### Critères d'acceptation

- [ ] Le CTA header est visible sur tout le site et mène à `/estimation`
- [ ] La commande de purge supprime uniquement les estimations anonymes de plus de 12 mois (et leurs événements), testée sur données de seed
- [ ] Documentation d'installation du cron VPS ajoutée (README ou doc deploy)
- [ ] `/confidentialite` décrit le traitement, la rétention 12 mois et le consentement
- [ ] `/estimation` a title, description, OG image et figure dans le sitemap
- [ ] Rappel bloquant en tête de PR vers main : grille tarifaire validée par Valoux requise
