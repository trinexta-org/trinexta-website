# Registre Global des Anomalies Responsives (Issue #35)

Ce registre centralise toutes les anomalies détectées sur l'environnement de staging sur les 5 breakpoints cibles (320px, 768px, 1024px, 1440px, 1920px).

---

## 1. Page d'Accueil

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#01** | Déploiement Régional | Desktop (1440px / 1920px) | L'effet de grillage en arrière-plan nuit au design global. Grand espace vide indésirable sur la droite. Contraste de couleur du texte insuffisant. | Esthétique & Lisibilité | 🟢 Corrigé |
| **#02** | Badges de Confiance | Mobile & Desktop | Les logos de réassurance (Cybermalveillance, CLUSIF...) ne sont pas les versions officielles. Le style global de la ligne est à réusiner. | Image de marque / Assets | 🟢 Corrigé |
| **#03** | Grille des Services | Tablettes (iPad Mini 768px / iPad Air 820px) | Le titre de la carte *"INFOGÉRANCE"* subit un overflow/tronquage : les lettres "GÉ" sont coupées ou masquées. | Bug UI / Débordement | 🟢 Corrigé |
| **#04** | Impact Réel (Colonnes) | Tablettes (iPad Mini 768px / iPad Air 820px) | Les différentes colonnes de statistiques se chevauchent et s'entrecroisent de manière désordonnée. | Bug Structurel / Grid-Flex | 🟢 Corrigé |
| **#05** | Impact Réel (Titres) | Tablettes (iPad Mini 768px / iPad Air 820px) | Le point d'interrogation *"?"* est isolé tout seul à la ligne. Les lignes décoratives de fibres en arrière-plan ne sont pas centrées par rapport au grand titre. | UI / Typographie & Alignement | 🟢 Corrigé |
| **#06** | Impact Réel | Tablettes (iPad Pro 1024px / Surface Pro 912x1368) | Le bloc *"100%"* et le bloc *"7j/7"* se percutent par manque d'espacement horizontal. | UI / Espacement | 🟢 Corrigé |
| **#07** | Global Tablettes | Tablettes (iPad Pro 1024px & Surface Pro 912x1368) | Des lignes de séparation parasites (traits sombres) apparaissent horizontalement entre certaines sections majeures. | Bug UI / Éléments parasites | 🟢 Corrigé |

---

## 2. Page Nos Offres

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#08** | Structure Générale | Desktop (1440px / 1920px) | Les sections d'offres manquent d'aération. Les phrases d'accroche comme *"Comment ça se passe, du premier appel au premier jour ?"* et *"Des experts du support à votre service"* sont trop collées au contenu supérieur. Nécessite l'ajout d'un espace vertical pour descendre chaque bloc. | UI / Marges & Espacements | 🟢 Corrigé |
| **#09** | Offre Sérénité | Desktop (1440px / 1920px) | Le sous-bloc contenant *"100% illimité"* percute visuellement la section inférieure *"Ce qu'on fait que les autres ne font pas"*. Les paragraphes de texte qui suivent immédiatement sont également trop resserrés entre eux. | UI / Hauteur de ligne & Marges | 🟢 Corrigé |
| **#10** | Contenu & Textes | Mobile (320px / 375px) | Les compressions de blocs et les textes trop collés observés sur grand écran se répercutent à l'identique sur tous les terminaux mobiles. | UI / Consistance Mobile | 🟢 Corrigé |
| **#11** | Hero (Boutons CTA) | Mobile (320px / 375px) | Les boutons font 343x60px et 343x64px. L'étirement pleine largeur est trop massif et nuit à l'harmonie mobile. À rationaliser. | UI / Ajustement Mobile | 🟢 Corrigé |
| **#12** | Hero (Accroche) | Mobile (320px / 375px) | Le texte de réassurance *"SANS ENGAGEMENT - RÉPONSE SOUS 24H"* est trop collé contre la bordure inférieure du bloc Hero. | UI / Espacement | 🟢 Corrigé |
| **#13** | Onglets de Navigation | Tablettes (iPad Mini 768px / iPad Air 820px / iPad Pro 1024px / Surface Pro 912x1368) | La barre de navigation interne des différentes offres n'est pas correctement calée sous le header principal (logo/menu). Le texte des offres traverse et déborde graphiquement de la barre sur Chrome. | Bug Structurel / Alignement | 🟢 Corrigé |
| **#14** | Alignement Inter-sections | Tablettes (iPad Mini 768px / iPad Air 820px / iPad Pro 1024px / Surface Pro 912x1368) | Sur l'intégralité des formats tablettes testés via Chrome, les blocs d'offres s'empilent sans marge suffisante et se collent excessivement. | UI / Marges Tablettes | 🟢 Corrigé |

---

## 3. Pages Services

*(Concerne /infogerance, /cybersecurite, /support-informatique, /services-annexes)*

| ID | Page Spécifique | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#15** | Grille des Blocs (Contenu) | Tablettes (iPad Mini 768px / iPad Air 820px / iPad Pro 1024px / Surface Pro 912x1368) | Manque d'indicateur de cliquabilité. L'icône/bouton d'agrandissement présent sur écran mobile (iPhone SE) disparaît sur format tablette. Comme le `hover` est absent sur écran tactile, rien n'indique que les blocs sont cliquables. Il faut forcer l'affichage de l'icône d'agrandissement sur les breakpoints tablettes tout en conservant la structure actuelle. | UX / Affichage Conditionnel | 🟢 Corrigé |

---

## 4. Pages Blog

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#22** | Barre de recherche | Mobile (320px / 375px) | La barre de recherche ne fonctionne pas sur mobile (bouton/input inactif), alors qu'elle est parfaitement fonctionnelle sur les résolutions desktop et tablettes. | Fonctionnalité / UX Mobile | 🟢 Corrigé |

---

## 5. Pages Cas Clients

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#23** | Grille des Cartes | Tablettes (iPad 768px) | Les cartes de réussites clients n'ont pas une hauteur uniforme. Le premier bloc tout à gauche (Cas N°1) est légèrement plus long que les deux de droite, rompant l'alignement de la grille. | UI / Égalisation des hauteurs | 🟢 Corrigé |

---

## 6. Page À Propos

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#16** | Découvrez nos engagements | Tous breakpoints / Desktop | L'image mise en avant associée au bloc de contenu *"L'humain au centre"* subit un défaut de cadrage vertical important. La tête de l'homme est totalement tronquée et hors de l'écran, ce qui ne laisse visible que le bas de son corps. L'image doit être recentrée verticalement pour afficher correctement le visage. | UI / Cadrage Image | 🟢 Corrigé |

---

## 7. Page Contact

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#17** | Formulaire de Contact | Desktop (1440px / 1920px) | Le formulaire est trop long verticalement, occupe l'intégralité de la hauteur de la page sur desktop et déborde de manière excessive. Nécessité de restructurer le layout global (par exemple, passer sur une disposition sur deux colonnes : les coordonnées à gauche et le formulaire à droite). | UI / Layout & Encombrement | 🟢 Corrigé |
| **#18** | Informations de Contact | Tous breakpoints | L'intitulé *"Siège"* doit être remplacé par *"Bureau d'activité"*, et l'adresse physique associée doit être mise à jour avec la valeur exacte : `7 Rue Montespan, 91000 EVRY COURCOURONNES`. | Contenu / Texte Officiel | 🟢 Corrigé |
| **#19** | Section FAQ | Tous breakpoints | Il faut supprimer le bloc FAQ sur mesure actuel et réimporter le composant FAQ standardisé utilisé sur les pages offres et services. | UI / Harmonisation Composants | 🟢 Corrigé |
| **#20** | Section Équipement (Fond Windows) | Tous breakpoints / Desktop | La section avec l'image Windows n'est pas du tout responsive. Les blocs de texte explicatifs, les encadrés d'urgence et l'image de fond se chevauchent. Un réusinage complet est requis. | Bug Structurel Majeur / Responsivité | 🟢 Corrigé |

---

## 8. Éléments Globaux

| ID | Section | Breakpoint / Appareil | Description de l'anomalie | Impact / Critère d'acceptance | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#21** | Footer (Liens de navigation) | Tablettes / Mobiles | Manque flagrant de cohérence des liens en réduction d'écran. En mode desktop, les colonnes affichent l'intégralité des redirections. En version mobile/tablette, de nombreux liens sautent ou sont abrégés de manière arbitraire (ex: la colonne "SERVICES" passe de 6 à 3). Il faut synchroniser les tableaux de liens sur toutes les résolutions. | UI & UX / Cohérence des Liens | 🟢 Corrigé |