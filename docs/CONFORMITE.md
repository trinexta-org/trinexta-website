# Dossier de conformité : trinexta.fr

> Dossier tenu selon l'ADR 0002 de `trinexta-org/trinexta-fondations` (modèle : `docs/conformite/MODELE.md`). Il décrit l'état réel du site, preuves à l'appui. Toute PR qui ajoute ou modifie un formulaire, une route API, un script tiers, un traceur, un sous-traitant ou un texte juridique met ce dossier à jour. Aucun secret ni donnée client ici ; ce qui n'a pas été vérifié est écrit « non vérifié ».

- Dernière revue complète : 25/10/2026 (audit en 5 axes, puis PR #355, #356, #357, #359)
- Prochaine revue au plus tard : 25/01/2027
- Version du socle `@trinexta/core` : avant socle (protections dans `src/lib/security/`)

## 1. Identité

| Élément | Valeur |
|---|---|
| Domaine de production | https://trinexta.fr (branche `main`) |
| Préproduction | https://staging.trinexta.fr (branche `dev`, `noindex`) |
| Dépôt Git | `trinexta-org/trinexta-website` |
| Éditeur du site | TRUSTECH IT SUPPORT, SASU, marque TRINEXTA, RCS Évry 942 020 082 |
| Directeur de la publication | Valoux Prince, Président |
| Hébergement | VPS OVH (France), Nginx + PM2 |
| Base de données | PostgreSQL 17 sur le VPS, via Prisma 7 |
| CMS | Sanity, projet `93ztl6y7`, dataset `production` (blog) |
| Responsable technique | Hyosua (relecture), Claude (rédaction des correctifs) |
| Contact données personnelles | contact@trinexta.fr |

## 2. Textes obligatoires

| Texte | URL | Fichier source | Dernière mise à jour | Conforme |
|---|---|---|---|---|
| Mentions légales | /mentions-legales | `src/data/mentions-legales.tsx` | 25/10/2026 (#356) | Oui : directeur de la publication nommé, « RCS Évry 942 020 082 », hébergeur, disponibilité en moyens raisonnables |
| Politique de confidentialité | /confidentialite | `src/data/confidentialite.tsx` | 25/10/2026 (#356) | Oui : tableau finalité / base / durée, sous-traitants nommés avec pays, transferts, mesure d'audience |
| Politique cookies | /cookies | `src/data/cookies.tsx` | 25/10/2026 (#356) | Oui : liste des traceurs réels, outils non utilisés retirés |
| CGV | /cgv | `src/data/cgv.tsx` | 25/10/2026 | Oui pour les professionnels : pénalités taux BCE + 10 points, indemnité 40 €. Particuliers : acceptés sur devis dédié, Code de la consommation prévalant (relecture juriste à prévoir, écart E4) |
| Engagements de service, plan de réponse aux incidents, accord de traitement des données | /niveau-de-service, /plan-reponse-incidents-securite, /accord-traitement-donnees | `src/data/sla.tsx`, `plan-reponse-incidents.tsx`, `dpa.tsx` | 25/10/2026 (#356) | Oui : plus de tarif public, plus d'adresse support@, plus de « garantir » |

## 3. Registre des traitements

| Collecte | Données | Finalité | Base légale | Durée annoncée | Suppression réelle | Destinataires | Route et table |
|---|---|---|---|---|---|---|---|
| Formulaire de contact | Profil, besoin, prénom, nom, e-mail, téléphone, entreprise, SIRET, ville, taille du parc, message, créneau | Répondre à la demande, suivi dans le CRM | Mesures précontractuelles | 3 ans après le dernier contact | **Non appliquée** (E1) | Équipe TRINEXTA (e-mail Microsoft 365), LeadSynch par capture du widget | `POST /api/contact`, table `ContactForm` |
| Newsletter (pied de page, blog, fenêtre du blog) | E-mail | Envoi de la newsletter | Consentement, double opt-in | Jusqu'à la désinscription | Désinscription par lien ; adresses désinscrites conservées sans durée (E2) | Microsoft 365 (envoi) | `POST /api/newsletter`, `POST /api/newsletter/confirm`, `GET /api/newsletter/unsubscribe`, table `Subscriber` |
| Simulateur d'estimation (anonyme) | Réponses au questionnaire, description libre | Estimation, statistiques | Intérêt légitime | 12 mois puis suppression | Script `scripts/purge-estimates.mjs` existant, **planification non vérifiée** (E3) | Anthropic (analyse IA de la description) | `POST /api/estimation`, `/events`, `/analyze`, table `Estimate` |
| Demande de rappel après estimation | Prénom, nom, e-mail, téléphone, entreprise, consentement horodaté | Recontacter le prospect, envoyer l'estimation détaillée | Consentement (case à cocher) | 3 ans après le dernier contact | **Non appliquée** (E1) | Équipe TRINEXTA, Microsoft 365 | `POST /api/estimation/lead`, table `Estimate` |
| Widget LeadSynch (chat et capture des formulaires) | Messages du chat, champs des formulaires soumis | Gestion de la relation client | Mesures précontractuelles | 3 ans après le dernier contact | Gérée dans LeadSynch, non vérifiée | LeadSynch (Vercel, Render, base sur notre VPS OVH) | Script `leadsynch-api.onrender.com/.../chat.js` dans `src/app/layout.tsx` |

## 4. Traceurs

Source : `src/data/cookies.tsx` et `src/components/seo/CookieBanner.tsx` (tarteaucitron 1.17).

| Traceur | Émetteur | Finalité | Durée | Consentement requis | Chargé avant accord |
|---|---|---|---|---|---|
| `trinexta_cookie_consent` | TRINEXTA | Mémoriser le choix cookies | 6 mois | Non (exempté) | Oui, normal |
| Stockage de session du chat | LeadSynch | Garder la conversation ouverte | Fermeture de l'onglet | Non (fonctionnel) | Oui, normal |
| `trinexta_newsletter_seen` (stockage local) | TRINEXTA | Ne pas réafficher la fenêtre newsletter | Jusqu'à effacement | Non (fonctionnel) | Oui, normal |
| `_ga`, `_ga_*` | Google Analytics 4 | Mesure d'audience | 13 mois au plus | Oui | **Non** depuis #356 (Consent Mode de base) ; contrôle navigateur T11 à faire |
| `_gcl_au` | Google Ads | Mesure des conversions | 13 mois au plus | Oui | **Non** depuis #356 ; contrôle T11 à faire |

## 5. Sous-traitants et transferts

| Prestataire | Rôle | Données concernées | Pays | Garantie de transfert |
|---|---|---|---|---|
| OVH | Hébergement du site et des bases | Toutes | France | Sans objet |
| Microsoft (Microsoft 365) | Envoi des e-mails | Coordonnées, contenu des demandes | Union européenne (non vérifié) | Sans objet si UE |
| Sanity | Contenus et images du blog | Aucune donnée de visiteur | Norvège et États-Unis (non vérifié) | Non vérifiée |
| Google | Mesure d'audience et publicité, avec accord | Identifiants de navigation | Irlande et États-Unis | Data Privacy Framework |
| Anthropic | Analyse IA de la description du simulateur | Texte saisi | États-Unis | Clauses contractuelles types (à confirmer) |
| Vercel et Render | Hébergement de l'application LeadSynch | Messages du chat, formulaires capturés | États-Unis | Clauses contractuelles types des accords de traitement (à confirmer) |
| jsDelivr | Diffusion du script du bandeau cookies | Adresse IP | Réseau mondial | Non vérifiée ; auto-hébergement prévu (E5) |

## 6. Sécurité

### En-têtes HTTP

Déclarés dans `next.config.ts`. Vérifiés sur staging le 25/10/2026 avant #355 ; directives ajoutées par #355 vérifiées en local.

| En-tête | Valeur | Vérifié le |
|---|---|---|
| Content-Security-Policy | `default-src 'self'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'`, domaines tiers commentés (Google, Sanity, LeadSynch, jsDelivr) ; `'unsafe-inline'` encore présent (E6) | 25/10/2026 |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` | 25/10/2026 |
| X-Frame-Options | `DENY` | 25/10/2026 |
| X-Content-Type-Options | `nosniff` | 25/10/2026 |
| Referrer-Policy | `strict-origin-when-cross-origin` | 25/10/2026 |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | 25/10/2026 |
| X-Powered-By absent | `poweredByHeader: false` | 25/10/2026 (local) |

### Routes publiques

IP lue sur `X-Real-IP` puis la dernière entrée de `X-Forwarded-For` (`src/lib/estimation/rate-limit.ts`). Limites en mémoire, fenêtre de 10 minutes.

| Route | Envoie un e-mail | Limite par IP | Limite par e-mail | Piège à robots | JSON strict | Validation serveur |
|---|---|---|---|---|---|---|
| `POST /api/contact` | Oui (équipe + accusé au prospect) | 5 | 3 | Oui | Oui | zod, longueurs bornées |
| `POST /api/newsletter` | Oui (confirmation) | 3 | 2 | Oui | Oui | zod |
| `POST /api/newsletter/confirm` | Non | Non | Non | Sans objet | Formulaire | Jeton |
| `GET /api/newsletter/unsubscribe` | Non | Non | Non | Sans objet | Sans objet | Jeton |
| `POST /api/estimation` | Non | Oui | Sans objet | Non | Non | zod |
| `POST /api/estimation/events` | Non | Oui | Sans objet | Non | Non | zod |
| `POST /api/estimation/analyze` | Non | Oui | Sans objet | Non | Non | zod, sortie IA bornée |
| `POST /api/estimation/lead` | Oui (estimation détaillée) | 5 | 3 | Oui | Oui | zod, estimation existante requise |

### Dépendances et secrets

| Contrôle | Résultat | Date |
|---|---|---|
| `npm audit --omit=dev` | 1 critique et 22 hautes, toutes dans l'outillage Sanity et Prisma installé en production (`next-sanity`) ; aucune dans Next.js (E7) | 25/10/2026 |
| Version de Next.js | 16.4.3 | 25/10/2026 |
| Secrets dans le dépôt | Aucun trouvé (audit du 25/10/2026) | 25/10/2026 |
| `.env.example` sans valeurs réelles | Oui | 25/10/2026 |

## 7. Règles internes TRINEXTA

| Règle | Contrôle | Résultat |
|---|---|---|
| Aucun « garanti », « zéro panne », « moins cher », « 24h/24 » | grep sur `src/` | Conforme dans le code (#356). Blog Sanity : un article non conforme reste publié (E8) |
| Aucun tarif hors /serenite | grep « € » | Conforme, sauf le simulateur /estimation (fourchettes conservées par décision de la direction) |
| Références clients autorisées seulement | relecture | Conforme |
| Charte navy #0A233E, bleu #5C92B8, blanc, jamais d'orange | grep couleurs + revue | Conforme depuis #357 (renard orange retiré) |
| Adresse support@trinexta.fr jamais publiée | grep | Conforme (#356) ; reste en variable interne de routage `SUPPORT_EMAIL` |
| Aucun chiffre sans source | relecture | Conforme dans le code (encart « 99,9 % / Zéro faille » retiré) ; article de blog E8 |
| Forme sociale SASU partout | grep « SAS » | Conforme (#359) |

## 8. Catalogue des tests

| # | Test | Type | Commande ou méthode | Fréquence | Dernier résultat | Date |
|---|---|---|---|---|---|---|
| T1 | Lint | Auto (CI) | `npm run lint` | Chaque PR | 0 erreur, 14 avertissements anciens | 25/10/2026 |
| T2 | Typage | Auto (CI) | `npm run typecheck` | Chaque PR | OK | 25/10/2026 |
| T3 | Règles de revue | Auto (CI) | `npm run check:review-rules` | Chaque PR | OK (règle `WHITE_ON_SECONDARY` ajoutée) | 25/10/2026 |
| T4 | Tests unitaires | Auto | `npx vitest run` | Chaque PR | 51 tests OK ; **pas lancés par la CI** (E9) | 25/10/2026 |
| T5 | Build | Auto (CI) | `npm run build` | Chaque PR | OK en CI | 25/10/2026 |
| T6 | Vulnérabilités | Manuel | `npm audit --omit=dev` | Chaque PR (à automatiser, E9) | voir section 6 | 25/10/2026 |
| T7 | En-têtes de sécurité | Manuel | `curl -sI https://trinexta.fr/` | Trimestriel | OK sur staging | 25/10/2026 |
| T8 | Lighthouse mobile | Manuel | Lighthouse 12, 12 pages | Trimestriel | Moyennes staging : perf 94, accessibilité 95,5, bonnes pratiques 95,5 ; accueil 88 en perf (vidéo du hero) | 25/10/2026 |
| T9 | Accessibilité axe | Manuel | axe-core, 375 et 1280 px | Trimestriel | 0 violation sur 16 pages (local, après #357) ; /blog non testé faute d'accès Sanity en local | 25/10/2026 |
| T10 | Liens internes | Manuel | crawl de staging | Trimestriel | 0 lien cassé sur environ 70 URL, redirections 301 directes | 25/10/2026 |
| T11 | Consentement en navigateur | Manuel | navigation privée, onglet Réseau, avant accord puis après refus : aucune requête vers googletagmanager.com, google-analytics.com, googleadservices.com | Trimestriel et à chaque changement de script | **À faire** après mise en production de #359 | |
| T12 | Formulaires : piège, limites, JSON strict | Tests + local | `src/lib/security/anti-abus.test.ts` ; serveur local : `text/plain` → 400, piège → 200 sans traitement, 6e requête même IP → 429 | Chaque changement de route | OK | 25/10/2026 |
| T13 | Parcours réels | Manuel | contact, inscription newsletter avec confirmation, demande de rappel | Trimestriel | **À faire** après mise en production | |
| T14 | Clavier et menu mobile | Manuel + Playwright | Tab, Échap, 375 px | Trimestriel | OK (Échap ferme, focus rendu au burger, sous-menus repliés hors tabulation) | 25/10/2026 |
| T15 | Données structurées | Manuel | test des résultats enrichis | Trimestriel | JSON-LD valides, FAQ visibles (82 questions) | 25/10/2026 |
| T16 | Règles internes | Manuel | section 7 | Trimestriel | voir section 7 | 25/10/2026 |

## 9. Écarts connus

| # | Écart | Gravité | Responsable | Échéance | Statut |
|---|---|---|---|---|---|
| E1 | Aucune purge des demandes de contact et de rappel alors que 3 ans sont annoncés | Important | Claude (script), Valoux (planification sur le VPS) | Novembre 2026 | Ouvert |
| E2 | Adresses désinscrites de la newsletter conservées sans durée | Mineur | Claude | Avec E1 | Ouvert |
| E3 | Purge des estimations : script présent, planification sur le VPS non vérifiée | Important | Valoux | Novembre 2026 | Ouvert |
| E4 | CGV : particuliers acceptés sur devis sans section consommateurs détaillée | Important | Valoux (juriste) | Avant toute vente à un particulier | Ouvert |
| E5 | Bandeau cookies servi par jsDelivr (IP des visiteurs transmise, CSP élargie) | Mineur | Claude | Décembre 2026 | Ouvert |
| E6 | `'unsafe-inline'` dans la CSP des scripts | Mineur | Hyosua (`@trinexta/core`, nonces) | Avec le socle | Ouvert |
| E7 | `next-sanity` installe l'outillage Sanity en production (vulnérabilités) | Important | Claude | Novembre 2026 | Ouvert |
| E8 | Article « Pourquoi externaliser votre support IT » (24/7, montants, cas fictif) encore publié ; redirection 301 dans la PR #354 | Bloquant (règle interne) | Valoux (dépublier dans Sanity, merger #354) | Dès que possible | Ouvert |
| E9 | La CI ne lance ni les tests, ni `npm audit`, ni Lighthouse, axe, en-têtes ; déploiement possible CI rouge, pas de retour arrière en production | Important | Claude (workflow commun), Hyosua | Novembre 2026 | Ouvert |
| E10 | Nginx : transmission de `X-Real-IP` à confirmer sur le VPS | Important | Valoux | 26/10/2026 | Ouvert |

## 10. Historique

| Date | Événement | Lien |
|---|---|---|
| 25/10/2026 | Audit complet en 5 axes (sécurité, SEO/GEO, ergonomie, conformité, qualité) | `trinexta-fondations/docs/audits/2026-10-25/` |
| 25/10/2026 | Sécurité des formulaires, Next.js 16.4.3 | PR #355 |
| 25/10/2026 | Conformité RGPD, cookies, mentions légales | PR #356, mise en production par #359 |
| 25/10/2026 | SEO, accessibilité, charte | PR #357, mise en production par #359 |
| 25/10/2026 | Forme sociale SASU, ligne particuliers des CGV, création de ce dossier | PR #359 et suivante |
