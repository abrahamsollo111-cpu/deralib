# SEO-CHECKLIST — deralib.com

Bilan de la refonte crédibilité + SEO (juillet 2026). Conforme au guide
officiel Google « Bien débuter en référencement naturel ».

## ✅ Fait

### Technique
- [x] Title unique ≤ 60 caractères par page, format « [Service] [Lieu] — 24h/24 | Deralib »
- [x] Meta description unique ≤ 155 caractères avec appel à l'action
- [x] Un seul H1 par page (mot-clé principal + localisation), H2/H3 logiques
- [x] Canonical sur chaque page ; redirections 308 apex/http → https://www
- [x] sitemap.xml automatique (27 URL) soumis dans robots.txt
- [x] Données structurées JSON-LD : PestControl (LocalBusiness) avec
      openingHoursSpecification 24h/24, areaServed = 8 départements,
      priceRange ; Service par page service et département ; FAQPage ;
      BreadcrumbList ; Article sur les conseils ; Organization + WebSite
- [x] Image Open Graph 1200×630 générée au build
- [x] Fil d'Ariane visible sur toutes les pages internes
- [x] Ancres de liens descriptives (« Dératisation Hauts-de-Seine (92) »,
      jamais « en savoir plus »)
- [x] Police système (zéro téléchargement de police), images compressées,
      pages 100 % statiques (SSG)
- [x] Pages légales en noindex ; aucun cookie nécessitant un consentement

### Contenu
- [x] 8 pages départements uniques (75, 92, 93, 94, 77, 78, 91, 95),
      1 000-1 260 mots chacune, spécificités locales réelles (Grand Paris,
      canaux, Rungis, Roissy, bords de Marne, forêt de Fontainebleau…)
- [x] 4 pages services enrichies à 1 600-1 750 mots : signes, protocole
      avec durées, méthodes, prix 2026 en tableau, 8 questions de FAQ
- [x] Section /conseils : 4 articles de 1 400-1 700 mots sur les requêtes
      informationnelles (punaises, rat vs souris, prix 2026, nid de guêpes)
      avec CTA vers la page service correspondante
- [x] FAQ accueil : 10 questions ciblant les « People Also Ask »
      (locataire/propriétaire, mairie, durée traitement, récidive…)
- [x] Maillage interne complet : accueil ↔ services ↔ départements ↔
      conseils, footer avec les 8 départements
- [x] Purge du ton « IA » : vocabulaire métier réel, aucun placeholder
      visible, histoire d'entreprise factuelle (20 ans de métier)

### E-E-A-T / confiance
- [x] Footer légal conditionnel (raison sociale, SIRET, adresse, RC pro,
      Certibiocide — s'affichent dès que renseignés dans lib/config.ts)
- [x] Page /contact avec NAP cohérent, horaires 7j/7 — 24h/24
- [x] Composant avis clients — n'affiche RIEN tant qu'il n'y a pas de
      vrais avis (content/avis.json) ; aggregateRating conditionnel
- [x] Emplacements photos avec noms SEO français (public/images/README.md)
- [x] Mentions légales (biocides TP14/TP18, médiation) + politique RGPD

## ⚠️ TODO restants (données réelles à fournir par l'entreprise)

1. **lib/config.ts** : téléphone réel (remplace 01 23 45 67 89 partout),
   raison sociale + SIRET + adresse du siège (activera address/geo dans le
   JSON-LD), nom du dirigeant, année de création de la société, nombre de
   techniciens, n° Certibiocide, assureur RC pro + n° de contrat
2. **content/avis.json** : recopier les vrais avis Google dès qu'ils
   existent (JAMAIS de faux avis)
3. **public/images/** : vraies photos (dirigeant, équipe, véhicule siglé,
   interventions avant/après) — liste dans le README du dossier
4. **Google Business Profile** : créer la fiche (levier n°1 des appels),
   catégorie « Service de dératisation », zone Île-de-France, même NAP
   que le site au caractère près
5. **Google Search Console** : créer le compte, soumettre
   https://www.deralib.com/sitemap.xml, suivre l'indexation
6. **Tarifs** : ajuster les fourchettes 2026 avec les prix réels
   (content/nuisibles/*.json, clé "prix")
7. **Mentions légales** : capital social, RCS, TVA, médiateur consommation
8. **Formulaires** : brancher un service d'envoi (Formspree/Resend) à la
   place du mailto actuel
9. **À propos** : compléter l'histoire avec les dates réelles (création,
   embauches) quand le dirigeant les fournit
10. **Lighthouse mobile ≥ 90** : re-mesurer après ajout des vraies photos

## 🎯 20 mots-clés prioritaires, page par page

| # | Mot-clé | Page |
|---|---------|------|
| 1 | dératisation île-de-france | / |
| 2 | entreprise anti-nuisibles île-de-france | / |
| 3 | dératisation paris | /deratisation/paris |
| 4 | dératisation hauts-de-seine / 92 | /deratisation/hauts-de-seine |
| 5 | dératisation seine-saint-denis / 93 | /deratisation/seine-saint-denis |
| 6 | dératisation val-de-marne / 94 | /deratisation/val-de-marne |
| 7 | dératisation seine-et-marne / 77 | /deratisation/seine-et-marne |
| 8 | dératisation yvelines / 78 | /deratisation/yvelines |
| 9 | dératisation essonne / 91 | /deratisation/essonne |
| 10 | dératisation val-d'oise / 95 | /deratisation/val-d-oise |
| 11 | traitement punaises de lit île-de-france | /punaises-de-lit |
| 12 | punaise de lit traitement 2 passages | /punaises-de-lit |
| 13 | traitement cafards / blattes appartement | /cafards |
| 14 | destruction nid de guêpes | /guepes-frelons |
| 15 | frelon asiatique nid intervention | /guepes-frelons |
| 16 | prix dératisation 2026 | /conseils/prix-deratisation-2026 |
| 17 | comment savoir si j'ai des punaises de lit | /conseils/reconnaitre-punaises-de-lit |
| 18 | rat ou souris différence | /conseils/rat-ou-souris-differences |
| 19 | nid de guêpes que faire | /conseils/nid-de-guepes-ne-pas-detruire-soi-meme |
| 20 | dératisation restaurant / copropriété | /deratisation + fiches départements |

## Rappels de conduite

- Ne JAMAIS inventer : avis, chiffres clients, ancienneté de société,
  certifications. « 20 ans de métier » (expérience du fondateur) est le
  seul fait d'ancienneté autorisé.
- Une seule fiche Google Business Profile pour toute l'Île-de-France.
- NAP identique au caractère près : site = fiche Google = annuaires.
- Ne pas créer de nouvelles pages villes sans vraie matière locale
  (qualité > quantité, règle anti-spam de Google).
