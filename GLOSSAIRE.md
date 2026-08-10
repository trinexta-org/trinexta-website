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

---

# Langage Ubiquitaire - Offre IA (carte #260)

Termes de l'**offre IA Trinexta**, vendue comme module d'un projet Trinexta Studio. Issus du grilling du ticket #265 (10 août 2026). Domaine commercial et produit, pas de code.

## L'offre et son véhicule

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Module IA** *(new)* | La prestation IA vendue comme ligne d'un devis Trinexta Studio, jamais comme produit autonome | Offre IA, produit IA, option IA |
| **Ligne Studio** *(new)* | Une des trois prestations de `/trinexta-studio` : sites sur mesure, applications web complexes, plateformes SaaS | Offre, service, catégorie |
| **Cas d'usage** *(new)* | Le problème métier unique que le Module IA résout, identique d'un client à l'autre | Fonctionnalité, feature, besoin |
| **Déploiement** *(new)* | Une installation du Module IA chez un client donné, numérotée dans l'ordre (déploiement 1, 2, 3) | Projet, installation, mission |
| **Pilote** *(new)* | Le déploiement 1, vendu à tarif dérogatoire en échange de contreparties (référence, témoignage) | POC, test, prototype |

## L'agent

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Agent outillé** *(new)* | Le Module IA en v1 : un LLM qui répond exclusivement à partir de ce que ses outils lui ont renvoyé depuis la base de l'application | Chatbot, assistant, IA, bot |
| **Outil** *(new)* | Une fonction typée exposée à l'Agent outillé, branchée sur la base de l'application construite par le Studio | Fonction, tool, API |
| **Écriture proposée** *(new)* | Toute action modifiant les données est préparée par l'Agent outillé puis exécutée seulement après validation humaine explicite | Action, automatisation, écriture |
| **Assistant documentaire** *(new)* | Variante RAG indexant les documents du client via pgvector - **hors v1**, reportée au premier client ayant un corpus réel | RAG, recherche documentaire |
| **Surface facturée** *(new)* | L'endroit où vit le Module IA vendu : interne à l'entreprise cliente, utilisé par ses salariés | Périmètre, scope |
| **Démo publique** *(new)* | L'agent exposé sur trinexta.fr, aux frais et aux risques de Trinexta, servant de preuve en rendez-vous | Vitrine, démonstrateur, POC |

## Fiabilité

| Terme | Définition | Alias à éviter |
|-------|-----------|----------------|
| **Jeu d'évaluation** *(new)* | Ensemble de questions réelles avec réponses attendues, rejoué à chaque changement de modèle ou de prompt, produisant un taux mesuré | Tests, benchmark, QA |
| **Refus par défaut** *(new)* | Comportement de l'Agent outillé quand ses Outils ne renvoient rien : il déclare ne pas savoir au lieu de combler | Fallback, garde-fou |
| **Donnée source** *(new)* | L'enregistrement précis renvoyé par un Outil et affiché à côté de chaque affirmation de l'Agent outillé | Citation, référence, preuve |
| **Engagement de moyens** *(new)* | La formulation contractuelle retenue : Refus par défaut, Donnée source, journalisation et Jeu d'évaluation, sans garantie d'exactitude | Garantie, SLA, promesse de fiabilité |

## Relations

- Un **Module IA** se greffe sur exactement une **Ligne Studio** : les **applications web complexes**.
- Un **Module IA** résout exactement un **Cas d'usage**, répété à l'identique sur chaque **Déploiement**.
- Un **Agent outillé** n'affirme rien qui ne provienne d'un **Outil** ; chaque affirmation porte sa **Donnée source**.
- Toute modification de données passe par une **Écriture proposée** ; aucune écriture autonome.
- Le **Jeu d'évaluation** matérialise l'**Engagement de moyens** ; il ne garantit pas l'exactitude, il la mesure.
- La **Démo publique** vit chez Trinexta ; la **Surface facturée** vit chez le client. Les deux ne se confondent jamais.

## Dialogue illustratif

> **Commercial :** « Le client demande si l'**Agent outillé** peut se tromper. Je réponds non ? »
> **Tech :** « Jamais. On vend un **Engagement de moyens** : **Refus par défaut**, **Donnée source** affichée, **Jeu d'évaluation** rejoué. Promettre zéro erreur, c'est promettre un litige. »
> **Commercial :** « Et s'il crée une fiche en double dans leur base ? »
> **Tech :** « Il ne crée rien. Il prépare, un humain valide : c'est l'**Écriture proposée**. Une réponse fausse s'ignore, une écriture fausse se répare. »
> **Commercial :** « Le prospect veut voir avant de signer. Je lui montre l'installation d'un autre client ? »
> **Tech :** « Non, ça c'est une **Surface facturée**, elle est interne et confidentielle. Tu montres la **Démo publique** sur trinexta.fr, elle est faite pour ça. »
> **Commercial :** « Il a 4 000 pages de procédures à interroger. On sait faire ? »
> **Tech :** « C'est l'**Assistant documentaire**, hors v1. On le note, et il devient un **Déploiement** ultérieur quand un corpus réel le justifie. »

## Ambiguïtés signalées

- **« Hallucination »** était utilisé comme un risque unique et supprimable. On distingue : l'énoncé faux, rendu détectable par la **Donnée source** et le **Refus par défaut**, et l'action fausse, rendue impossible par l'**Écriture proposée**. On n'« interdit » pas l'hallucination, on la rend sans conséquence.
- **« Interne / externe »** désignait à la fois l'utilisateur du Module IA et le propriétaire de l'installation. On tranche : **Surface facturée** (chez le client, ses salariés) vs **Démo publique** (chez Trinexta, tout public).
- **« Agent IA »** couvrait indistinctement le RAG documentaire et l'agent branché sur la base. On tranche : **Agent outillé** = v1 ; **Assistant documentaire** = hors périmètre v1.
- **« Pilote »** ne désigne pas un prototype jetable mais un **Déploiement** de production vendu, à tarif dérogatoire.
