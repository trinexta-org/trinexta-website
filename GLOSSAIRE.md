# Langage Ubiquitaire

Termes du module **audit SEO** (lead-magnet gratuit, route `/audit-seo`). Les termes de l'estimation restent définis dans `src/lib/estimation/README.md`.

## Le module et son livrable

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Audit SEO** | Analyse automatisée et gratuite d'**une seule page** publique, déclenchée par un prospect depuis `/audit-seo`, produisant un score et un rapport | Analyse, scan, diagnostic |
| **Cible** | L'URL publique unique fournie par le prospect et effectivement analysée | Site, page, lien |
| **Rapport** | Le livrable envoyé par email : score, sous-scores, ensemble des constats en symptôme/impact, CTA RDV | PDF, compte-rendu, résultat |
| **Teaser** | Ce qui s'affiche à l'écran en fin d'analyse : score global + les 3 constats les plus graves | Aperçu, preview, résumé |
| **Audit approfondi** | Prestation de conseil humaine, payante, vendue en RDV — **hors du module** ; le module ne la code pas, il l'amorce | Rapport premium, audit payant |

## Analyse et score

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Constat** (*finding*) | Un problème SEO détecté sur la Cible, exprimé en **symptôme + impact business + gravité**, jamais avec la méthode de correction | Erreur, recommandation, problème, issue |
| **Score global** | Note mécanique et déterministe sur 100 attribuée à la Cible | Note, grade |
| **Sous-score** | Note mécanique d'un des 4 **Axes** de la Cible | Catégorie de score |
| **Axe** | Une des 4 familles de constats : Référencement on-page · Performance · Technique/crawlabilité · Contenu & SEO local | Catégorie, section, pilier |
| **Barème** | Règles déterministes (poids + seuils) qui transforment les faits mesurés en Score, figées dans `src/data/audit-seo/` | Grille, config |
| **Synthèse IA** | Texte rédigé par Sonnet 5 : priorisation + verbalisation des Constats + jugement éditorial/sémantique local ; **ne modifie jamais un chiffre** | Résumé IA, analyse IA, narratif |
| **PageSpeed** | Appel à l'API Google PageSpeed Insights (**stratégie mobile**) fournissant les faits de l'Axe Performance | Lighthouse, perf, Core Web Vitals |
| **Dégradation propre** | Comportement quand une source échoue (PageSpeed ou IA down) : on n'affiche jamais un faux chiffre ; l'Axe concerné est marqué « non mesuré » | Fallback, mode dégradé |

## Personnes et captation

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Prospect** | Le visiteur qui lance un Audit SEO ; devient **Lead** dès qu'il fournit son identité | Visiteur, utilisateur, client |
| **Lead** | Le Prospect capté : identité (`email`, `prenom`, `nom`, `entreprise` obligatoires ; `telephone` optionnel) + consentement, persisté dans `SeoAudit` | Contact, inscrit |
| **Gate** | Le moment de captation de l'identité : **en amont**, avant le lancement de l'analyse | Formulaire, capture, mur |

## Sécurité

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **assertPublicUrl** | Garde-fou anti-SSRF maison : n'autorise que `http(s)` vers un domaine public, rejette toute IP privée/loopback/link-local, re-vérifie après redirection | Validation URL |
| **Fetch bridé** | Récupération du HTML de la Cible avec timeout court, taille plafonnée, HTML only, redirections limitées, user-agent `TrinextaAuditBot` | Fetch, requête |

## Relations

- Un **Audit SEO** porte sur exactement une **Cible** et produit exactement un **Rapport**.
- Un **Audit SEO** calcule un **Score global** à partir de 4 **Sous-scores** (un par **Axe**), via le **Barème** — sans intervention IA.
- Un **Audit SEO** contient plusieurs **Constats** ; le **Teaser** n'en montre que les 3 plus graves, le **Rapport** les montre tous.
- La **Synthèse IA** verbalise et priorise les **Constats** mais ne touche ni **Score global** ni **Sous-score**.
- Un **Prospect** devient **Lead** au **Gate** (en amont) ; un **Lead** est persisté dans un enregistrement `SeoAudit`.
- Un **Constat** énonce le symptôme et l'impact, **jamais** la méthode — celle-ci relève de l'**Audit approfondi** (RDV).

## Dialogue illustratif

> **Dev :** « Le **Teaser** affiche les 3 pires **Constats**. On y met le correctif exact ? »
> **Expert métier :** « Non. Un **Constat**, c'est symptôme + impact + gravité. Le *comment* est ce qu'on vend en **Audit approfondi**. Si on donne la méthode, le **Prospect** la colle dans une IA gratuite et on perd le **Lead**. »
> **Dev :** « Et le **Score global**, la **Synthèse IA** peut l'ajuster pour coller au ton du **Rapport** ? »
> **Expert métier :** « Jamais. Le **Score** sort du **Barème**, mécaniquement. Même **Cible** = même **Score**. L'IA priorise et rédige, elle ne calcule pas. »
> **Dev :** « Si **PageSpeed** tombe, on met 0 à l'**Axe** Performance ? »
> **Expert métier :** « Non, 0 serait un faux chiffre. **Dégradation propre** : l'**Axe** est "non mesuré", le **Score global** se calcule sur les autres axes. »

## Ambiguïtés signalées

- **« Audit »** désignait à la fois le lead-magnet gratuit automatisé et la prestation humaine payante. On tranche : **Audit SEO** = le module gratuit ; **Audit approfondi** = l'offre humaine en RDV, hors périmètre du module.
- **« Résultat »** était utilisé pour le Teaser (écran) comme pour le Rapport (mail). On distingue : **Teaser** (score + 3 constats à l'écran) vs **Rapport** (livrable complet par email).
- **« Recommandation »** est à bannir pour désigner un **Constat** : une recommandation implique la méthode, qu'on ne divulgue pas. Un **Constat** s'arrête au symptôme et à l'impact.
