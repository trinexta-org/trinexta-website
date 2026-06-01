# Registre de Tests Cross-Browser (Issue #37)

**Environnement de test :** staging.trinexta.com
**Date de l'audit :** Juin 2026

## 1. Périmètre de Test

### Navigateurs Cibles
- [x] **Chrome** (Desktop & Mobile)
- [x] **Firefox** (Desktop)
- [x] **Safari** (Desktop & iOS)
- [x] **Edge** (Desktop)

### Pages à Valider
- [x] Accueil
- [x] Page d'un Service (ex: Infogérance)
- [x] Blog (Liste des articles)
- [x] Blog (Article individuel)
- [x] Tarifs
- [x] Contact (avec soumission de formulaire)

---

## 2. Checklist Technique par Navigateur

| Critère de validation | Chrome | Firefox | Safari | Edge |
| :--- | :---: | :---: | :---: | :---: |
| Mise en page (polices, couleurs, marges) | 🟢 | 🟢 | 🟢 | 🟢 |
| Images WebP affichées correctement | 🟢 | 🟢 | 🟢 | 🟢 |
| Animations CSS fluides et fonctionnelles | 🟢 | 🟢 | 🟢 | 🟢 |
| Menu burger mobile fonctionnel | 🟢 | N/A | 🟢 | N/A |
| Liens et boutons (CTA) cliquables | 🔴 | 🔴 | 🔴 | 🔴 |
| Soumission réussie du formulaire de Contact | 🟢 | 🟢 | 🟢 | 🟢 |

*(Légende : ⏳ À tester / 🟢 Validé / 🔴 Anomalie détectée)*

---

## 3. Registre des Anomalies

Ce tableau répertorie les bugs spécifiques à certains moteurs de rendu (Blink, Gecko, WebKit) ainsi que les bugs fonctionnels globaux.

| ID | Navigateur | Version / OS | Page concernée | Description de l'anomalie | Statut |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **#CB-01** | *Tous* | *Tous* | *Footer* | Le lien "Tarifs" doit rediriger vers `/offres`. Les listes "Nos Services" et "Légal" ne possèdent pas de href valides. | 🔴 À corriger |
| **#CB-02** | *Tous* | *Tous* | *Footer* | Icônes de réseaux sociaux obsolètes (Twitter/Github à supprimer) et manquants (Instagram/TikTok à ajouter). Lier vers Linkedin, Insta, TikTok, Facebook. | 🔴 À corriger |
| **#CB-03** | *Tous* | *Tous* | *Nos Offres* | Les boutons des cartes de tarification n'ont aucune redirection. Ils doivent pointer vers `/contact`. | 🔴 À corriger |

---

## 4. Notes et Résolutions
*(Espace réservé pour détailler les correctifs CSS appliqués, comme l'ajout de préfixes webkit spécifiques ou de fallbacks).*