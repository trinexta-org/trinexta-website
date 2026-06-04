

CAHIER DES CHARGES 

Refonte du site web 

trinexta.com 

 

Refonte complète from scratch abandon de WordPress 

Analyse concurrentielle, arborescence, contenus et spécifications techniques 

 

 

Document interne TRINEXTA 

Version 1.0  ·  Avril 2026 

 

1\. Contexte et objectifs 

1.1 Pourquoi refaire le site 

Le site actuel trinexta.com est sous WordPress et accumule les difficultés techniques : performances limitées par les plugins, dépendance à des thèmes/builders rigides, dette technique croissante, et image peu cohérente avec le positionnement d'une société d'ingénierie digitale. La décision est prise de quitter WordPress et de reconstruire le site from scratch sur une stack moderne, hébergée sur l'infrastructure TRINEXTA. 

L'analyse comparative menée avec trois acteurs de référence (Easy Service Informatique, Addictt et IPE) met en évidence par ailleurs un déficit de crédibilité et de profondeur de contenu qui freine la conversion des prospects. La refonte doit donc traiter simultanément le sujet technique ET le sujet éditorial. 

Les principaux écarts identifiés : 

Aucune certification ou logo de partenaire technologique affiché (Microsoft, Apple, Sophos, OVH, etc.) 

Aucune adhésion ou label officiel (Cybermalveillance.gouv.fr, Clusif, ExpertCyber, France Cybersecurity) 

Compteur de chiffres affiché à zéro (« 0+ années d'expérience ») 

Témoignages clients anonymes (prénoms uniquement, sans entreprise réelle ni photo) 

Aucune page tarifs publique (alors que Easy a une page « Nos offres » dans le menu principal) 

Aucune page « Cas clients » dédiée 

Aucun process visuel d'intervention type Audit → Conception → Déploiement → Suivi 

Aucun espace client (portail de ticketing visible) 

Aucune page « Rejoignez-nous » / recrutement 

Lien Contact du footer cassé (pointe vers /contac/ au lieu de /contact/) 

Pages services peu profondes, faible volume éditorial 

Absence de blog actif (peu d'articles ou non datés) 

1.2 Objectifs de la refonte 

Objectif 1 Crédibilité : atteindre le niveau d'image des concurrents établis (logos partenaires, labels officiels, témoignages avec photos et noms d'entreprise) 

Objectif 2 Conversion : doubler le taux de transformation visiteur → prospect qualifié grâce à un parcours clair et des CTA visibles 

Objectif 3 SEO local : se positionner sur les requêtes « infogérance Évry », « prestataire informatique Essonne », « support PME Grand Paris Sud » dans les 6 mois 

Objectif 4 Profondeur de contenu : atteindre un volume de pages comparable aux concurrents (30+ pages contre \~10 actuellement) 

Objectif 5 Maintenance autonome : permettre à l'équipe interne (marketing, direction) de mettre à jour textes, images, prix et articles via un CMS headless adapté, sans intervention technique 

Objectif 6 Vitrine technique : le site doit lui-même être un argument commercial performance \< 1,5s, design moderne, hébergé sur l'infrastructure TRINEXTA 

1.3 Stack technique retenue 

Décision stratégique : abandon complet de WordPress et refonte from scratch en stack moderne. Plusieurs raisons motivent ce choix. 

Pourquoi quitter WordPress 

Cohérence d'image : TRINEXTA est une société d'ingénierie digitale et d'infogérance. Une vitrine WordPress full Elementor envoie un signal contradictoire aux prospects techniques. Un site « maison » développé et hébergé sur l'infrastructure de l'entreprise renforce le pitch commercial. 

Performance native : un site statique compilé charge en \<500ms. WordPress \+ Elementor descend rarement sous 1,5s sans optimisations lourdes. 

Sécurité : pas de plugins à mettre à jour, pas de vecteurs d'attaque WordPress (XML-RPC, brute-force admin, plugins vulnérables). La maintenance sécurité passe de hebdomadaire à trimestrielle. 

Timing SEO favorable : le référencement vient de démarrer, le trafic est faible. Refaire maintenant minimise l'impact SEO. Dans 6 mois ce sera 10× plus coûteux. 

Évite le double travail : patcher WordPress aujourd'hui pour de toute façon migrer plus tard \= effort dupliqué. 

Stack cible 

Framework : Astro (recommandé) ou Next.js. Astro est optimal pour ce besoin (vitrine \+ blog, peu d'interactivité), génération statique native, SEO excellent par défaut, courbe d'apprentissage plus douce que Next.js. 

Langage : TypeScript strictement typé 

Styling : Tailwind CSS \+ design system custom basé sur la charte (\#0a233e, \#5c92b8) 

CMS contenu (édition par non-développeurs) : Decap CMS (gratuit, git-based, interface admin simple) OU Sanity (cloud, plus puissant) à arbitrer en interne 

Hébergement : VPS OVH (cohérent avec le pitch infogérance « hébergé sur notre infra »). Alternative : Vercel \+ OVH pour la BDD. 

Base de données : PostgreSQL si besoin de fonctionnalités dynamiques (formulaires, espace client). Sinon, contenu en fichiers Markdown versionnés Git. 

Email transactionnel : Resend (Microsoft) 

CDN et sécurité : Cloudflare (gratuit) protection DDoS, cache global, certificats SSL 

CI/CD : GitHub Actions, déploiement automatique sur push main 

Versioning : GitHub privé sous l'organisation TRINEXTA 

Monitoring : Uptime Kuma auto-hébergé \+ Sentry pour les erreurs 

Sauvegardes : Git (code \+ contenu si Markdown) \+ sauvegarde BDD quotidienne automatisée si Postgres utilisé 

Méthode de bascule 

Le WordPress actuel reste en ligne pendant toute la durée de la refonte 

Le nouveau site est développé sur un domaine de staging (ex. new.trinexta.com) 

Recette complète avant bascule 

Bascule DNS le jour J avec redirections 301 depuis l'ancienne arborescence 

Conservation des URLs principales et des meta-descriptions pour limiter l'impact SEO 

WordPress archivé puis désactivé après 30 jours de stabilité confirmée 

 

2\. Analyse concurrentielle détaillée 

Trois sites de référence analysés en profondeur (toutes pages principales visitées). L'objectif est de comprendre ce qui fait la solidité de leur image et d'identifier les éléments à reprendre, adapter ou dépasser. 

2.1 Easy Service Informatique 

URL : easyserviceinformatique.com 

Cible : PME parisiennes intra-muros 

Positionnement : « L'informatique ça ne tue pas, mais ça énerve bien quand même »  ton décalé, humain 

Architecture du site 

Accueil 

Nos offres / tarifs (page dédiée tarifs visible dans le menu principal) 

Nos services (mega menu structuré en 5 univers) 

Infogérance \+ Maintenance \+ Cybersécurité Paris \+ Prestataire Mac 

Cyberdéfense \+ SOC \+ Audit \+ Protection des données \+ DSI temps partagé \+ Formation \+ Protection des identités \+ Protection des périphériques 

Cloud \+ Hébergement Cloud \+ Sauvegarde Cloud 

Télécom \+ Teams Room \+ Yealink 

Digital Workplace \+ Google Workspace \+ Microsoft 365 

Qui sommes-nous \+ Nos engagements \+ Cas clients (sous-menu) 

Blog (publications datées 2025-2026) 

Contact \+ Espace client \+ Rejoignez-nous (en barre top) 

Points forts à reprendre 

Numéro de téléphone visible top-bar : 01 44 09 99 30, présent sur toutes les pages 

Espace client : lien direct vers itclientportal en haut à droite 

Page Recrutement : « Rejoignez-nous » signe que l'entreprise grandit 

4 univers de besoins métier : « Je veux assurer la sécurité de mes données », « Je dois protéger mon entreprise », etc. (7 cas d'usage explicites) 

Logos partenaires affichés : Microsoft, Apple, Sophos, Synology, 3CX, AvePoint, MFA, Watchguard, FFCYBER (8+ logos) 

Logos certifications : Apple Certified, Microsoft Certified, Sophos Certified, AvePoint Cloud Governance Advanced (visible sur 200×200 px) 

Labels officiels : Adhérent Clusif, ExpertCyber RVB, Référence Cybermalveillance.gouv.fr, Fédération Française Cybersécurité, France Cybersecurity (5 logos en bas de page) 

Témoignages : noms complets, fonction, entreprise réelle (Florence Duret Salzer, Maxime Barge, Christophe Blum, Bernard Grappe, Stella Molimbi) vérifiés via Trustindex/Google 

Score Trustindex : « EXCELLENT \- Basée sur 58 avis » Google 

Cas clients détaillés : Arnaud Bruillon (Finsburry), Francis Pinot (Villechenon), Philippe Montigny (IDS Ethic Intelligence), Thomas Kolodziej (Archery) — photo \+ nom \+ fonction \+ entreprise \+ témoignage long 

Webinaire : section « Save the date » avec compte à rebours dynamique « Les coulisses d'une cyberattaque » 

Blog actif : 4 derniers articles affichés sur la home (avril 2026, mars 2026, février 2026, janvier 2026  un par mois) 

Flux LinkedIn intégré : section « Nos dernières actualités LinkedIn » sur la home 

Page Infogérance structure complète 

Hero : titre, sous-titre, 4 bullets services \+ CTA téléphone 

« Qu'est-ce que l'infogérance » (3 paragraphes longs, 400 mots) 

Bloc « Des chiffres » : Postes infogérés / Collaborateurs / Années d'existence / Clients (4 KPI) 

« Les points forts d'Easy » : 5 sections avec icônes (Audit, Maintenance, Intervention sur site, Suivi, Équipe d'intervenants) 

« Vos objectifs sont aussi les nôtres » : 4 objectifs métier 

« Passez à l'infogérance avec Easy » : 6 sous-arguments (Sécurité, Prestations illimitées, Hotline, Réactivité, Interlocuteur unique, Tarification forfaitaire) 

« 50 certifications » : grille de logos partenaires \+ ingénieurs certifiés 

« Ces PME qui nous font confiance » : 4 témoignages détaillés clients 

« Nos autres solutions » : cross-sell vers les 4 autres pôles 

Bloc CTA contact final 

2.2 Addictt 

URL : addictt.fr 

Cible : TPE, PME et PMI 

Positionnement : « Solutions IT complètes pour TPE  Matériel, Sécurité, Logiciel » 

Architecture du site 

Accueil 

Solutions (mega menu visuel avec 4 cartes illustrées) 

Matériel informatique 

Cybersécurité 

Logiciel de gestion 

Support 

Qui sommes-nous 

Contact 

Points forts à reprendre 

Hero émotionnel : photo grand format d'un homme devant son PC \+ accroche personnelle directe (« Confiez votre infrastructure à notre équipe ») 

Mega menu visuel : chaque service est représenté par une carte avec illustration spécifique (pas juste du texte) 

Bloc « 6 bénéfices clés » : Maîtrise des coûts, Gestion des risques, Expertise technologique, Sensibilisation, Flexibilité, Continuité opérationnelle 

Process en 4 étapes visuelles : 01 Audit / 02 Conception / 03 Installation / 04 Suivi 

Histoire de l'entreprise : « Aide les entreprises depuis 2010 » fusion 2016 avec Arc Gestion → Groupe Addictt → ouverture agence Aquitaine 2018 → arrivée FI Conseils 2022 (storytelling de croissance) 

4 piliers de service : Complet, Personnalisé, Innovant, Réactif 

2 agences physiques affichées : Paris IDF (4 rue Camille Claudel, 91600 Savigny-sur-Orge — 01 85 120 250\) \+ Aquitaine (4 voie Romaine, 33610 Canéjan — 05 35 540 540\) 

Lien support direct : TeamViewer en accès rapide footer (get.teamviewer.com/addictt) 

Mascotte fusée : élément graphique récurrent qui personnalise la marque 

2.3 IPE Maintenance 

URL : ipe.fr 

Cible : PME, Administrations, Grands comptes 

Positionnement : « 20 ans d'expérience 96 % de clients satisfaits » 

Architecture du site 

Accueil 

Nos solutions (mega menu services) 

Infogérance 

Maintenance informatique 

Cybersécurité 

Sauvegarde de données 

Cloud 

Wi-Fi entreprise 

Microsoft 365 

Qu'est-ce que l'infogérance ? (page éducative SEO) 

Qui sommes-nous 

Blog (très actif, 1+ article par semaine) 

Contact 

Points forts à reprendre 

3 niveaux d'offres clairs : Contrat Essentiel / Contrat Sérénité / Contrat Platinum (gradation avec ajouts visibles à chaque palier) 

Page éducative SEO : « Qu'est-ce que l'infogérance ? » 1 500+ mots, capture le trafic informationnel 

Filiale d'un groupe : « filiale d'un groupe qui intervient auprès de professionnels depuis plus de 50 ans » 

Témoignages longs : Valérie Rondin (Directrice L'Étape) écrit un témoignage de 80 mots avec contexte précis 

Secteurs clients listés : banque, assurance, services, santé, éducation, formation, monde associatif, mode, transports, administration 

Blog très actif : articles sur Shadow IT, Migration Microsoft 365, Choix DSI vs prestataire 2026, IA en infogérance, Ransomware, etc. (sujets d'experts) 

Hotline mise en avant : « Le service Hotline est précieux car il permet de résoudre très rapidement les dysfonctionnements » 

2.4 Synthèse Ce qu'ils ont TOUS en commun 

Élément 

Présence sur les 3 sites concurrents 

Numéro de téléphone visible top-bar 

OUI sur les 3 Easy, Addictt, IPE 

Logos partenaires technologiques 

OUI sur les 3 (Microsoft, Apple, Sophos, etc.) 

Labels officiels (Cybermalveillance, Clusif…) 

OUI sur Easy (5 logos), partiellement IPE 

Témoignages avec photo \+ nom \+ entreprise 

OUI sur les 3 (vérifiés Google/Trustindex pour Easy) 

Page tarifs publique 

OUI Easy (« Nos offres ») partiellement IPE (3 niveaux) 

Page Cas clients dédiée 

OUI Easy \+ IPE (témoignages détaillés) 

Process en 4 étapes visuelles 

OUI Addictt (très visuel) \+ Easy (étapes implicites) 

Espace client (portail ticketing) 

OUI Easy (ITClientPortal) TeamViewer Addictt 

Page Recrutement / Carrières 

OUI Easy (« Rejoignez-nous ») 

Blog actif (publications mensuelles) 

OUI sur les 3 (IPE le plus actif) 

Page « Qu'est-ce que l'infogérance » 

OUI IPE (1 500+ mots SEO) 

Webinaire / événements 

OUI Easy (compte à rebours « Save the date ») 

Plusieurs adresses physiques 

OUI Addictt (IDF \+ Aquitaine) 

KPI / chiffres clés (postes, années…) 

OUI Easy \+ IPE (96 % satisfaction) 

2.5 Trinexta État actuel vs attendu 

Élément 

État actuel Trinexta 

Action 

Tél visible top-bar 

Oui (09 78 25 07 46\) 

Conserver 

Logos partenaires 

AUCUN 

À CRÉER (priorité 1\) 

Labels officiels 

AUCUN 

Inscriptions à lancer 

Témoignages crédibles 

4 anonymes, fictifs 

Recueillir vrais 

Page tarifs 

Pages Sérénité (79€) et Impulsion existent mais pas de page synthèse 

Créer page Tarifs 

Cas clients 

AUCUNE page 

Page à créer 

Process visuel 4 étapes 

Absent 

À ajouter sur home 

Espace client 

Absent 

À mettre en place 

Page Recrutement 

Absent 

À créer 

Blog actif 

Existe mais peu d'articles 

Plan éditorial 1 article/mois 

Compteur expérience 

« 0+ années » (vide) 

Renseigner 

Lien Contact footer 

Cassé (/contac/) 

Corriger 

 

3\. Positionnement et identité éditoriale 

3.1 Promesse principale 

« Votre informatique simplifiée, en toute sérénité. 

Un partenaire local et humain pour les TPE et PME d'Île-de-France. » 

3.2 Cibles principales 

Cible 1 TPE 1 à 20 postes : indépendants, professions libérales, cabinets, commerces avec outils métier 

Cible 2 PME 20 à 100 postes : structures en croissance avec besoin de structuration IT 

Cible 3 Zone géographique : Évry-Courcouronnes, Corbeil-Essonnes, Grand Paris Sud, 91 / 77 / 94 / 75 sud 

3.3 Différenciants à mettre en avant 

Proximité locale : implantation Évry-Courcouronnes (Pôle d'activité 505 place des Champs Élysées) 

Support illimité 79€ HT/poste : tarification claire et lisible (offre Sérénité) 

Approche 360° : support, infogérance, cybersécurité ET accompagnement sur logiciels métier (différenciant fort vs concurrents) 

Sans engagement (formule mensuelle) : à mettre en avant face aux contrats annuels rigides 

Zone d'intervention nationale : Île-de-France principalement mais déploiement national possible 

3.4 Ton éditorial 

Direct, sans jargon technique inutile 

Humain : « vous », « nous », pas « notre clientèle » 

Concret : exemples métier (caisse qui bloque, messagerie inaccessible) 

Rassurant : « simplement », « sereinement », « en toute tranquillité » 

Professionnel : pas de familiarité excessive, mais accessible 

3.5 Charte graphique (existante) 

Élément 

Valeur 

Bleu foncé (titres) 

\#0a233e 

Bleu clair (accents) 

\#5c92b8 

Blanc (fond) 

\#ffffff 

Police principale 

À confirmer (Inter, Poppins ou Calibri Web — sans serif) 

Logo 

Logo TRINEXTA existant  fichier .png haute résolution disponible 

Style général 

Moderne, épuré, professionnel, accents bleus, pas de surcharge 

4\. Arborescence cible du nouveau site 

Le site cible 30+ pages publiques \+ un blog actif. Structure inspirée des meilleures pratiques observées chez Easy Service Informatique et IPE, adaptée au positionnement Trinexta. 

4.1 Menu principal (top navigation) 

Entrée menu 

Sous-menus / Pages 

Accueil 

Page d'accueil refondue (cf. section 5\) 

Nos offres 

Page synthèse \+ sous-pages : Offre Sérénité (79€/poste) · Offre Impulsion · Comparateur d'offres · Tarifs 

Nos services 

Méga menu visuel : Infogérance · Support informatique · Cybersécurité · Cloud & Sauvegarde · Microsoft 365 · Solutions métier 

Cas clients 

Page liste \+ études de cas individuelles (3-5 au lancement) 

À propos 

Sous-menu : Notre histoire · L'équipe · Nos engagements · Certifications & partenaires · Zones d'intervention 

Ressources 

Sous-menu : Blog · Guides PDF · Webinaires · FAQ · Glossaire informatique 

Contact 

Page contact complète \+ formulaires segmentés 

4.2 Menu secondaire (top-bar) 

Téléphone cliquable : 09 78 25 07 46 

Email : contact@trinexta.com 

Bouton « Espace client » (lien vers portail ticketing) 

Bouton « Rejoignez-nous » (page recrutement) 

Sélecteur langue : FR (EN possible v2) 

4.3 Footer (4 colonnes) 

Colonne 1 À propos : présentation courte \+ logo \+ lien « Notre histoire » 

Colonne 2 Liens rapides : Accueil, Tarifs, Cas clients, Blog, Contact, Recrutement, Espace client 

Colonne 3 Services : Infogérance, Support, Cybersécurité, Cloud, Microsoft 365 

Colonne 4 Contact \+ légal : adresse, tél, email, mentions légales, CGV, politique confidentialité, cookies 

Bandeau bas : logos partenaires \+ labels officiels \+ copyright \+ année 

4.4 Plan complet du site (sitemap) 

N° 

Page 

Statut 

1 

Accueil 

À refondre intégralement 

2 

Offre Sérénité 

À enrichir et restructurer 

3 

Offre Impulsion 

À enrichir et restructurer 

4 

Page Tarifs (synthèse offres) 

À CRÉER 

5 

Comparateur d'offres 

À CRÉER 

6 

Infogérance 

À enrichir (1 500+ mots) 

7 

Support informatique 

À enrichir 

8 

Cybersécurité 

À enrichir 

9 

Cloud & Sauvegarde 

À CRÉER (page dédiée) 

10 

Microsoft 365 / Workspace 

À CRÉER 

11 

Solutions métier (logiciels) 

À CRÉER 

12 

Services annexes 

Conserver et enrichir 

13 

Cas clients (page liste) 

À CRÉER 

14 

Cas client : nom client \#1 

À CRÉER 

15 

Cas client : nom client \#2 

À CRÉER 

16 

Cas client : nom client \#3 

À CRÉER 

17 

Notre histoire 

À CRÉER (storytelling) 

18 

L'équipe 

À CRÉER (photos pros) 

19 

Nos engagements 

À CRÉER 

20 

Certifications & partenaires 

À renforcer 

21 

Zones d'intervention 

À refaire (carte interactive) 

22 

Qu'est-ce que l'infogérance ? 

À CRÉER (SEO 1 500 mots) 

23 

Qu'est-ce que la cybersécurité ? 

À CRÉER (SEO) 

24 

Glossaire informatique TPE/PME 

À CRÉER (SEO long tail) 

25 

Blog (page liste) 

À redynamiser 

26 

Articles de blog (10 minimum au lancement) 

À CRÉER 

27 

FAQ générale 

À CRÉER 

28 

Webinaires (page liste) 

À CRÉER 

29 

Guides PDF / livres blancs 

À CRÉER 

30 

Page recrutement / Rejoignez-nous 

À CRÉER 

31 

Contact 

À enrichir (formulaires segmentés) 

32 

Espace client (lien externe) 

À METTRE EN PLACE 

33 

Mentions légales 

Conserver 

34 

Politique de confidentialité 

Conserver 

35 

CGV / CGS 

À CRÉER 

36 

Politique cookies 

Conserver 

37 

Plan du site 

À CRÉER (sitemap HTML) 

 

Total : 37 pages publiques \+ \~10 articles de blog \= \~47 pages au lancement. 

5\. Spécifications page par page 

5.1 Page d'accueil 

Objectif : convertir le visiteur en lead qualifié en moins de 60 secondes. 

Sections (de haut en bas) 

Bandeau supérieur fixe (top-bar) 

Téléphone cliquable \+ email \+ Espace client \+ Rejoignez-nous 

Hero (premier écran) 

Vidéo de fond OU image grand format (équipe, ordi, ambiance bureau) 

Titre principal H1 : « Votre informatique, simplifiée. Votre activité, sereine. » 

Sous-titre : « Support illimité, maintenance proactive et cybersécurité incluse pour les TPE et PME d'Île-de-France. » 

2 CTA : « Découvrir l'offre Sérénité » (primaire) \+ « Demandez à être rappelé » (secondaire) 

Tag de réassurance sous CTA : « Sans engagement · Réponse sous 24h » 

Bandeau de réassurance immédiate 

4 logos labels officiels (Cybermalveillance.gouv.fr, Clusif, ExpertCyber, France Cybersecurity) \+ note Google « 4,9/5 sur X avis » 

Bloc « Pour qui » 

4 vignettes ciblées : Indépendants · Cabinets professionnels · Commerces · PME en croissance 

Chacune avec icône \+ titre \+ 1 ligne de description \+ bouton « En savoir plus » 

Bloc « Nos services » 

Grille de 6 cartes visuelles : Infogérance · Support · Cybersécurité · Cloud · Microsoft 365 · Solutions métier 

Chaque carte : icône \+ titre \+ 2 lignes \+ bouton « Découvrir » 

Bloc « Notre approche en 4 étapes » (inspiration Addictt) 

01 Audit · 02 Conception · 03 Déploiement · 04 Suivi continu 

Chaque étape avec numéro grand format \+ titre \+ 1 phrase descriptive 

Bloc KPI / chiffres clés 

4 compteurs animés : X postes infogérés · X années d'existence · X clients actifs · 99% taux de satisfaction 

Important : valeurs réelles, pas « 0+ » 

Bloc « Pourquoi choisir Trinexta » 

4 colonnes : Équipe experte · Solutions sur mesure · Interlocuteur unique · Transparence totale 

Conserver le contenu existant qui est bon 

Bloc « Cas clients » 

Carrousel ou grille de 3 études de cas avec photo \+ nom client \+ secteur \+ 1 phrase de résultat 

Bouton « Voir tous nos cas clients » 

Bloc « Témoignages clients vérifiés » 

Intégration widget Trustindex / avis Google (comme Easy) 

4 témoignages avec photo \+ nom complet \+ entreprise \+ texte 

Bloc « Logos partenaires technologiques » 

Bandeau scrollant ou grille de 8-12 logos : Microsoft, Apple, Google Workspace, Sophos, OVH, Bitdefender, etc. 

Bloc Blog / Actualités 

3 derniers articles de blog en cards (image, titre, date, extrait, bouton « Lire plus ») 

Bloc « Zone d'intervention » 

Carte Île-de-France interactive ou statique avec ombrage département 91, 77, 94, 75, 92, 93, 95 

Mention « Interventions nationales sur demande » 

Bloc CTA final 

Titre fort : « Prêt à ne plus subir votre informatique ? » 

Bouton « Prendre RDV gratuit » 

Footer 

4 colonnes (cf. section 4.3) 

Logos partenaires \+ labels en bandeau bas 

5.2 Page Offre Sérénité 

Conserver la structure actuelle qui est bonne, mais enrichir :  

Ajouter un comparateur visuel : Avant Trinexta vs Avec Trinexta 

Ajouter 2 témoignages clients spécifiques à cette offre 

Ajouter un bloc « Calculez votre budget mensuel » (slider nombre de postes × 79€) 

Ajouter une vidéo de présentation 60 secondes 

Ajouter section « Comment ça se passe » (6 étapes du onboarding client) 

5.3 Page Tarifs (NOUVELLE) 

Inspiration : page « Nos offres » d'Easy Service Informatique. 

Hero : « Des tarifs clairs, sans surprise. » 

Tableau comparatif des 3 offres : Sérénité (79€/poste) · Impulsion · Sur-mesure (sur devis) 

Pour chaque offre : prix HT/poste/mois · cible · ce qui est inclus (15-20 lignes) 

Différenciants Trinexta vs marché : sans engagement, support illimité, cybersécurité incluse 

FAQ tarifs : 8 questions 

CTA : « Recevoir un devis personnalisé » 

5.4 Page Infogérance (À ENRICHIR 1 500+ mots) 

Inspiration : page Infogérance d'Easy \+ page Infogérance d'IPE. 

Hero : titre \+ 4 bullets services \+ CTA téléphone 

« Qu'est-ce que l'infogérance ? » (3 paragraphes pédagogiques, 400 mots) 

« Les 5 piliers de notre infogérance » : Audit · Maintenance proactive · Intervention sur site · Suivi & transparence · Équipe d'intervenants dédiée 

« Vos objectifs » : 4 objectifs métier avec icônes 

« Pourquoi nous choisir » : 6 sous-arguments (Sécurité · Prestations illimitées · Hotline · Réactivité · Interlocuteur unique · Tarification forfaitaire) 

« Nos certifications » : grille logos partenaires 

Témoignages clients spécifiques infogérance 

Cross-sell vers les autres services 

CTA final 

5.5 Page Cas clients (NOUVELLE) 

Hero : « Ils nous font confiance pour leur informatique » 

Filtres par secteur : Cabinet · Commerce · Industrie · Service · Association 

Grille de 3-5 études de cas en cards (logo · nom · secteur · taille · 1 phrase défi · 1 phrase résultat · bouton « Lire l'étude ») 

Bandeau « Devenir notre prochain cas client » avec CTA 

Étude de cas individuelle (template) 

Hero : nom client, logo, secteur, taille, photo dirigeant 

Contexte : situation initiale (3 paragraphes) 

Défi : problèmes identifiés (3-5 bullets) 

Solution mise en place (paragraphes structurés par service) 

Résultats chiffrés : avant/après (KPI : nb tickets, downtime, satisfaction) 

Témoignage du dirigeant (avec photo \+ signature) 

Services Trinexta utilisés : tags renvoyant vers les pages services 

CTA « Discutons de votre projet » 

5.6 Page L'équipe (NOUVELLE) 

Hero : « L'équipe humaine derrière Trinexta » 

Photo grand format de l'équipe complète 

Pour chaque membre : photo cadrée · prénom · poste · 2 lignes parcours · spécialités · LinkedIn 

Section « Nos valeurs » : 3-4 valeurs avec illustrations 

CTA « Rejoignez-nous » 

Important : photos professionnelles uniformes (séance dédiée à prévoir) 

5.7 Page Notre histoire (NOUVELLE) 

Hero : « De TrusTech IT Support à Trinexta » 

Storytelling chronologique : création → premiers clients → évolution → aujourd'hui 

Frise temporelle visuelle (timeline) 

Photos d'époque ou ambiance 

Mission, vision, valeurs 

CTA contact 

5.8 Page Certifications & partenaires (À RENFORCER) 

Hero : « Nos partenaires technologiques et nos certifications » 

Section 1 : Logos partenaires éditeurs (Microsoft, Google, Apple, Sophos, Bitdefender, OVH, etc.)  8 à 12 logos en grille 

Section 2 : Certifications individuelles de l'équipe (badges techniques) 

Section 3 : Labels et adhésions officielles (Cybermalveillance.gouv.fr, Clusif, ExpertCyber, France Cybersecurity) 

Pour chaque label : logo \+ nom \+ brève explication \+ lien officiel 

Section 4 : Conformités (RGPD, normes ISO si applicables) 

5.9 Page « Qu'est-ce que l'infogérance ? » (NOUVELLE — page SEO) 

Inspiration : ipe.fr/quest-ce-que-linfogerance/  1 500+ mots. 

Définition complète 

Types d'infogérance (infrastructure, applicative, totale) 

Avantages pour TPE/PME 

Comment choisir un prestataire 

FAQ exhaustive (10+ questions) 

CTA vers les offres Trinexta 

5.10 Page Recrutement (NOUVELLE) 

Hero : « Rejoignez l'équipe Trinexta » 

Pourquoi nous rejoindre : 4-5 arguments (ambiance, formation, mobilité, sens du service) 

Postes ouverts (liste dynamique liée au CMS) ou « Candidature spontanée » 

Photos équipe au travail 

Process de recrutement en 4 étapes 

Formulaire de candidature avec upload CV 

5.11 Blog (À REDYNAMISER) 

Page liste avec filtres par catégorie : Cybersécurité · Infogérance · Cloud · Productivité · Actualités 

Pagination, recherche, articles populaires 

Articles avec : date · auteur · catégorie · temps de lecture · sommaire latéral · partage social 

Lead magnet en sidebar (newsletter, guide PDF gratuit) 

5.12 Page Contact (À ENRICHIR) 

Hero : « Discutons de votre projet » 

3 colonnes : Téléphone · Email · Adresse (avec carte Google embed) 

Formulaires segmentés (radio button) : 

« Je suis prospect je veux un devis » 

« Je suis client j'ai besoin de support » 

« Je veux postuler » 

« Autre demande » 

Champ formulaire selon segment (taille entreprise, secteur, urgence, etc.) 

Calendly intégré pour réservation directe (option) 

Horaires d'ouverture 

Numéro d'urgence dédié clients 

 

6\. Exigences techniques 

6.1 Stack frontend 

Framework recommandé : Astro (génération statique native, parfait pour vitrine \+ blog, performances exceptionnelles, SEO excellent par défaut) 

Alternative : Next.js (App Router) si besoin de fonctionnalités plus dynamiques (espace client riche, e-commerce futur) 

Langage : TypeScript strictement typé 

Styling : Tailwind CSS \+ design tokens custom basés sur la charte 

Composants : design system interne (atomic design : atoms, molecules, organisms) 

Animations : Framer Motion ou GSAP (utilisation modérée pour ne pas alourdir) 

Icônes : Lucide React ou Heroicons (kit cohérent) 

Formulaires : React Hook Form \+ validation Zod 

6.2 CMS pour l'édition de contenu 

Critère essentiel : permettre à l'équipe non-développeur (marketing, direction) de publier des articles, ajouter des cas clients, modifier les textes des pages, sans toucher au code. 

Option recommandée : Decap CMS 

Gratuit, open-source 

Interface admin web propre et simple 

Stockage des contenus dans le repo Git (versionning natif) 

Workflow éditorial avec brouillons et publication 

Authentification GitHub ou via fournisseur tiers (Netlify Identity, Auth.js) 

Adapté à Astro et Next.js 

Alternatives à considérer 

Sanity : cloud, plus puissant, dashboard temps réel, gratuit jusqu'à 3 utilisateurs (10€/mois au-delà) 

Strapi : auto-hébergé sur OVH, contrôle total, plus complexe à maintenir 

Payload CMS : open-source, TypeScript-first, alternative moderne 

6.3 Hébergement et infrastructure 

Hébergement principal : VPS OVH dédié (cohérence avec le pitch infogérance  « notre site est hébergé sur notre propre infrastructure, comme nos clients ») 

Configuration serveur : Ubuntu LTS \+ Nginx \+ Node.js (si Next.js) ou simple serveur statique (si Astro build statique) 

CDN : Cloudflare gratuit (cache global, protection DDoS, certificats SSL automatiques) 

Domaine : trinexta.com (existant)  pas de migration de domaine 

Sous-domaine staging : staging.trinexta.fr pendant la refonte 

Email transactionnel : Resend (tier gratuit 3 000 emails/mois) ou Brevo (tier gratuit 300/jour) 

Base de données (si nécessaire) : PostgreSQL hébergé sur OVH (formulaires, espace client) optionnel selon scope final 

6.4 CI/CD et déploiement 

Repository : GitHub privé sous organisation TRINEXTA 

CI/CD : GitHub Actions (build \+ tests \+ déploiement automatique sur push main) 

Environnements : développement local · staging · production 

Déploiement zéro-downtime (build static \+ atomic swap) 

Pré-commit hooks : ESLint, Prettier, type-checking TypeScript 

6.5 Performance 

Score PageSpeed Insights : ≥ 95 sur mobile et desktop (faisable avec stack statique moderne) 

LCP \< 1,5 s sur mobile 

CLS \< 0,05 

INP \< 200 ms 

First Byte \< 200 ms (CDN Cloudflare) 

Images optimisées : WebP/AVIF avec fallback, lazy loading, srcset responsive 

Polices : self-hosted ou via Cloudflare Fonts (pas de Google Fonts en CDN) 

Code splitting et tree-shaking automatiques 

Préchargement intelligent des routes critiques 

6.6 SEO technique 

Balises title et meta description sur toutes les pages (gérées via CMS) 

Open Graph et Twitter Cards configurés 

Schema.org JSON-LD : Organization, LocalBusiness, Service, Article, FAQPage, BreadcrumbList, Review 

URLs propres (slug optimisés, lowercase, tirets) 

Sitemap XML généré automatiquement et soumis à Google Search Console 

Fichier robots.txt avec exclusions appropriées 

Redirections 301 depuis l'ancienne arborescence WordPress (mapping URL à fournir) 

Hn structurés (1 H1 par page, hiérarchie claire) 

Alt sur toutes les images (champ obligatoire dans le CMS) 

Maillage interne dense entre pages services et cas clients 

Conservation des URLs principales existantes pour limiter l'impact SEO 

6.7 Sécurité 

HTTPS obligatoire (certificat SSL via Cloudflare ou Let's Encrypt) 

Headers de sécurité : CSP, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy 

Pare-feu applicatif Cloudflare WAF 

Protection DDoS native via Cloudflare 

Authentification 2FA sur le CMS et le serveur 

Limitation tentatives connexion (rate limiting CMS) 

Variables d'environnement sécurisées (jamais commit) 

Audit dépendances régulier (npm audit, Dependabot) 

Sauvegardes : Git (code \+ contenu) \+ snapshot serveur quotidien OVH 

6.8 RGPD et conformité 

Bandeau cookies conforme ePrivacy \+ RGPD (opt-in explicite) 

Politique de confidentialité à jour 

Mentions légales complètes 

CGV et CGS 

Page « Vos droits RGPD » avec procédure de demande 

Registre des traitements interne tenu à jour 

Aucun tracking avant consentement (GA4 chargé conditionnellement) 

Formulaires sécurisés (HTTPS, validation, anti-spam) 

Hébergement données personnelles en Europe (OVH conforme) 

6.9 Accessibilité 

Niveau AA WCAG 2.1 visé sur les parcours critiques 

Contrastes texte/fond conformes (vérification systématique) 

Navigation clavier complète (focus visible, ordre logique) 

Attributs ARIA sur les éléments interactifs 

Textes alternatifs sur toutes les images 

Labels explicites sur les formulaires 

Pas d'information transmise uniquement par la couleur 

Skip links pour navigation directe au contenu principal 

6.10 Compatibilité 

Navigateurs : Chrome, Firefox, Safari, Edge (2 dernières versions majeures) 

Mobile-first responsive à partir de 320 px 

Tests sur iOS, Android, Windows, macOS 

Tests sur réseaux lents (4G simulé) 

6.11 Tracking et analytics 

Google Analytics 4 (chargement après consentement cookies) 

Google Tag Manager (gestion des tags marketing) 

Google Search Console (indexation, performances SEO) 

Hotjar ou Microsoft Clarity (heatmap, optionnel) 

Plausible ou Umami en alternative à GA4 (privacy-first, sans cookies) 

Suivi conversions : appels téléphone, soumissions formulaires, clics CTA, prises de RDV 

6.12 Espace client 

Lien depuis le top-bar et le footer 

Solution : portail ticketing existant (à connecter via SSO si possible) 

Alternative : intégration GLPI / OS Ticket / Freshdesk / Jira Service Management 

Décision à prendre selon outil interne actuel 

Authentification sécurisée, déconnexion automatique 

6.13 Maintenance et autonomie 

Documentation technique complète remise à l'équipe interne 

Documentation utilisateur du CMS (PDF \+ vidéos courtes) 

Code commenté et structuré pour reprise par un autre développeur 

Tests automatisés sur les parcours critiques (Playwright ou Cypress) 

Monitoring uptime continu 

Mises à jour de dépendances trimestrielles 

 

7\. Contenus à produire 

7.1 Contenus rédactionnels 

Contenu 

Quantité 

Mots/unité 

Source 

Pages services principales (Infogérance, Support, Cybersécurité, Cloud, M365, Solutions métier) 

6 

1 500 

Rédaction interne ou freelance 

Pages offres (Sérénité, Impulsion, Tarifs) 

3 

800 

Existant \+ enrichissement 

Pages SEO éducatives (Qu'est-ce que…) 

3 

1 500 

Rédaction freelance SEO 

Page Cas clients (liste) 

1 

300 

Interne 

Études de cas individuelles (template) 

5 

800 

Interview clients 

Page L'équipe 

1 

500 

Interne 

Page Notre histoire 

1 

800 

Interne 

Page Engagements 

1 

600 

Interne 

Page Recrutement 

1 

500 

Interne 

Page Contact 

1 

200 

Interne 

FAQ générale 

1 

1 200 

Interne 

Glossaire 

1 

2 000 

Rédaction freelance 

Articles blog au lancement 

10 

800 

Mix interne \+ freelance 

Newsletter de bienvenue 

1 

500 

Interne 

TOTAL approximatif 

\~40 contenus 

\~32 000 mots 

 

7.2 Contenus visuels à produire 

Photos d'équipe pro : séance shoot dédiée portraits individuels uniformes \+ photo de groupe \+ ambiance bureau (\~500-800€ une journée) 

Photos cas clients : photos dirigeants clients (lors interviews) ou utilisation de photos officielles des clients 

Logos partenaires : récupération auprès des éditeurs (Microsoft Partner, Apple, etc.) ou banques de logos officielles 

Logos labels officiels : fournis par les organismes (Cybermalveillance.gouv.fr, Clusif…) 

Icônes services : kit cohérent (Lucide, Heroicons, ou pack premium Iconfinder) 

Illustrations : kit personnalisé OU générées via IA (Midjourney, Flux) avec retouche 

Vidéo de présentation hero : 60-90 secondes, plan large bureau \+ équipe \+ ambiance (\~800-1 500€ ou DIY) 

Carte zone d'intervention : carte personnalisée IDF avec zones colorées 

Infographies process 4 étapes : design dédié 

Bannières blog : 1 par catégorie (5 max) 

7.3 Liste des partenaires technologiques à afficher 

Suggestions à valider en interne en fonction des partenariats réels et des outils utilisés :  

Microsoft Partner / Microsoft 365 

Apple Authorized (si applicable) 

Google Workspace Partner 

OVH Cloud Partner 

Sophos Partner (cybersécurité) 

Bitdefender (alternative) 

Synology (NAS) 

Watchguard (firewall) 

3CX (téléphonie) 

Mailinblack (email security) 

Brevo / Mailjet (email transactionnel) 

Cloudflare 

7.4 Labels et adhésions à obtenir 

Label / Adhésion 

Coût annuel 

Délai 

Priorité 

Cybermalveillance.gouv.fr (référencement) 

Gratuit 

2 semaines 

PRIORITÉ 1 

ExpertCyber (label AFNOR) 

\~500€/an 

2-3 mois (audit) 

PRIORITÉ 1 

Clusif (Club de la Sécurité) 

\~500-1 000€/an 

1 mois 

Priorité 2 

France Cybersecurity 

\~500€/an 

Variable 

Priorité 2 

CCI Essonne (membre) 

Variable 

Immédiat 

Priorité 3 

Microsoft Partner Network 

Gratuit (niveau base) 

Inscription en ligne 

PRIORITÉ 1 

Google Cloud Partner Advantage 

Gratuit (niveau base) 

Inscription en ligne 

Priorité 2 

8\. Planning et livrables 

8.1 Planning macro 

Phase 

Nom 

Contenu 

Durée 

0 

Cadrage 

Validation cahier des charges, choix stack (Astro vs Next.js), choix CMS, setup repo GitHub, mise en place environnement de dev, recueil des accès existants 

1 semaine 

1 

Production contenus 

Rédaction des 40 contenus, recueil témoignages clients, photos équipe, récupération logos partenaires, démarches labels (Cybermalveillance, ExpertCyber) 

3 semaines (en parallèle) 

2 

Design & maquettes 

Wireframes basse fidélité, design system Figma, maquettes haute fidélité, validation interne 

3 semaines 

3 

Développement front 

Setup projet, design system code, intégration des composants, intégration des pages MVP (home \+ 6 pages services \+ blog) 

4 semaines 

4 

Intégration CMS \+ back-end 

Setup CMS headless, modélisation des collections (pages, articles, cas clients, témoignages), intégration des contenus, formulaires, espace client, infra OVH, CI/CD 

3 semaines 

5 

SEO & tracking 

Configuration SEO, schema.org JSON-LD, sitemap XML, redirections 301 depuis WordPress, GA4, GTM, tests Pagespeed 

1 semaine 

6 

Recette 

Tests fonctionnels, tests responsive, tests accessibilité, tests performance (Lighthouse), corrections, recette client interne sur staging 

2 semaines 

7 

Mise en ligne 

Bascule DNS, redirections 301 actives, surveillance trafic, monitoring 7 premiers jours, ajustements, archivage WordPress 

1 semaine 

 

TOTAL 

 

\~14 semaines 

8.2 Livrables attendus 

Livrables techniques 

Site complet en production sur trinexta.com (Astro ou Next.js, hébergé OVH) 

Site staging accessible pendant la durée du projet (staging.trinexta.fr) 

Repository GitHub privé sous organisation TRINEXTA (code source complet) 

Pipeline CI/CD GitHub Actions opérationnel 

Fichiers Figma maquettes \+ design system (cédés) 

Configuration CMS headless documentée 

Accès admin maître (CMS, hébergement, GitHub) transmis 

Configuration Cloudflare partagée 

Sauvegarde complète post-livraison (Git \+ snapshot serveur) 

Documentation des redirections 301 mises en place 

Livrables documentaires 

Documentation utilisateur pour mise à jour autonome (PDF \+ vidéo) 

Guide d'ajout d'un article de blog 

Guide d'ajout d'un cas client 

Guide de modification des prix sur la page Tarifs 

Procédure de sauvegarde et restauration 

Annuaire des accès (hébergeur, CMS, GA, GSC, etc.) 

Livrables formation 

1 session de formation 2h en visio sur l'utilisation du back-office 

1 session de 1h dédiée au plan éditorial blog 

8.3 Critères de validation et recette 

Critères techniques (recette) 

Score PageSpeed mobile ≥ 95 (objectif élevé permis par la stack statique) 

Score Lighthouse global ≥ 95 sur Performance, Accessibilité, SEO et Best Practices 

Toutes les pages prévues dans le sitemap sont présentes et fonctionnelles 

Tous les formulaires fonctionnent (test envoi réel) 

Aucun lien cassé (vérifié par Screaming Frog ou équivalent) 

Tous les CTA mènent à la bonne page 

Site responsive testé sur 5 résolutions (320, 768, 1024, 1440, 1920\) 

HTTPS actif sur toutes les pages avec headers de sécurité 

Bandeau cookies conforme 

Sitemap XML soumis à Google Search Console 

Redirections 301 depuis l'ancien WordPress validées (mapping testé) 

CMS fonctionnel et utilisable par un non-développeur (test équipe interne) 

Pipeline CI/CD opérationnel (push → déploiement automatique) 

Critères de contenu 

Tous les contenus rédactionnels sont publiés 

Au moins 8 logos partenaires affichés 

Au moins 3 labels officiels affichés (sous réserve d'obtention) 

Au moins 3 cas clients publiés 

Au moins 5 témoignages clients vérifiés 

Au moins 10 articles de blog publiés au lancement 

Tous les chiffres clés (KPI) sont renseignés (pas de « 0+ ») 

Critères de design 

Cohérence visuelle sur toutes les pages 

Charte graphique respectée (\#0a233e, \#5c92b8) 

Lisibilité (taille polices ≥ 16 px corps, contrastes AA) 

Hiérarchie visuelle claire (Hn structurés) 

8.4 Conditions de garantie post-livraison 

Garantie 30 jours sur les bugs et anomalies 

Maintenance corrective : incluse pendant 3 mois après mise en ligne 

Au-delà : contrat de maintenance dédié à proposer (mensuel) 

9\. Plan éditorial blog (12 premiers mois) 

Pour soutenir la stratégie SEO et nourrir la crédibilité, un rythme minimum de 1 article par mois est requis. Idéalement 2 par mois en croisière. Inspiration : IPE publie 1 article par semaine sur les thématiques infogérance/cybersécurité. 

9.1 Catégories d'articles 

Cybersécurité TPE/PME (40 % des articles) 

Infogérance et support (20 %) 

Cloud et productivité (15 %) 

Microsoft 365 / Google Workspace (10 %) 

Témoignages, cas clients, actualités Trinexta (15 %) 

9.2 Articles à rédiger en priorité (10 au lancement) 

N° 

Titre proposé 

Mot-clé cible 

Catégorie 

1 

Combien coûte vraiment l'infogérance pour une TPE en 2026 ? 

infogérance prix TPE 

Infogérance 

2 

Les 5 cybermenaces qui visent les TPE/PME en 2026 

cybermenaces TPE 2026 

Cybersécurité 

3 

Internaliser un DSI ou choisir un prestataire : guide pour PME 

DSI vs prestataire 

Infogérance 

4 

Microsoft 365 vs Google Workspace : lequel choisir pour ma TPE ? 

M365 vs Workspace 

M365 

5 

Sauvegarde cloud : pourquoi c'est urgent pour votre entreprise 

sauvegarde cloud entreprise 

Cloud 

6 

Que faire en cas de cyberattaque ? Plan de réponse en 7 étapes 

réagir cyberattaque 

Cybersécurité 

7 

Le vrai coût d'une heure d'arrêt informatique pour une TPE 

coût panne informatique 

Infogérance 

8 

Comment choisir son prestataire informatique en Île-de-France 

prestataire info IDF 

Infogérance 

9 

Phishing : comment former vos équipes en 4 étapes 

formation phishing PME 

Cybersécurité 

10 

Trinexta x \[Premier cas client\] : comment nous avons sécurisé leur SI 

cas client 

Témoignages 

9.3 Format type d'un article SEO 

Longueur : 800 à 1 500 mots 

H1 unique avec mot-clé principal 

H2 et H3 structurés 

Sommaire en début d'article (table des matières cliquable) 

Image en-tête optimisée (alt \+ WebP) 

3-5 illustrations/captures dans le corps 

Encadrés de mise en évidence (citations, conseils, statistiques) 

CTA milieu d'article (téléchargement PDF, audit gratuit, devis) 

Maillage interne : 3-5 liens vers d'autres pages du site 

CTA fin d'article : prise de RDV ou contact 

Section auteur 

Articles connexes en bas (3 suggestions) 

 

10\. Récapitulatif des priorités 

10.1 Quick wins immédiats (à faire avant même la refonte) 

Corriger le lien /contac/ dans le footer du WordPress actuel (5 minutes) 

Renseigner les compteurs « 0+ années » avec valeurs réelles (provisoire avant refonte) 

Supprimer les témoignages anonymes du site actuel 

S'inscrire sur Cybermalveillance.gouv.fr (référencement gratuit) 

Demander adhésion Microsoft Partner Network (gratuit niveau base) 

Lancer démarche ExpertCyber (audit AFNOR) 

Identifier 3-5 premiers clients pour études de cas 

Planifier séance photos équipe (\~500-800€) 

10.2 Priorités absolues du nouveau site 

\# 

Élément 

Pourquoi 

1 

Logos partenaires \+ labels officiels affichés 

Plus gros écart vs concurrents  crédibilité immédiate 

2 

Témoignages avec photo, nom, entreprise réelle 

Crédibilité  Easy a 4 témoignages vérifiés Trustindex 

3 

Page Tarifs publique 

Différenciation  Easy a une page « Nos offres » 

4 

Page Cas clients dédiée \+ 3-5 études 

Preuve par l'exemple  argument commercial fort 

5 

Process en 4 étapes visuelles sur la home 

Rassure le prospect (inspiration Addictt) 

6 

Espace client (lien portail ticketing) 

Image d'entreprise structurée 

7 

Pages services enrichies (1 500+ mots) 

SEO \+ démonstration d'expertise 

8 

Photos équipe professionnelles 

Humanise — différenciant fort 

9 

Page Recrutement / Rejoignez-nous 

Signal de croissance et stabilité 

10 

10 articles de blog au lancement \+ plan éditorial 

SEO long terme \+ autorité 

10.3 Décisions à prendre en interne avant démarrage 

Stack frontend : Astro (recommandé pour ce besoin) ou Next.js 

CMS headless : Decap CMS (gratuit, git-based) ou Sanity (cloud, plus puissant) ou Strapi (auto-hébergé) 

Hébergement final : VPS OVH dédié (recommandé pour le pitch infogérance) ou Vercel \+ OVH BDD 

Espace client : solution de ticketing à intégrer (existante ou nouvelle) 

Budget photos équipe : séance pro \~500-800€ 

Budget rédaction freelance SEO : \~1 500-2 500€ si externalisée 

Budget démarche ExpertCyber : \~500€/an \+ temps audit 

Identification partenaires technologiques : valider la liste des logos à afficher selon partenariats réels 

Identification cas clients : 3-5 premiers clients à interviewer 

Plan de gestion du WordPress actuel : garder en ligne pendant la refonte, archiver après 30 jours de stabilité du nouveau site 

 

 

Crédibiliser. Convertir. Grandir. 

TRINEXTA  Refonte 2026