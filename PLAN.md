# PLAN.md — deralib.com (v3 — vraie entreprise de dératisation)

## 1. Le projet en une phrase
deralib.com est le site de [NOM SOCIÉTÉ], une entreprise de dératisation et de lutte anti-nuisibles opérant en Île-de-France, dirigée par un expert diplômé et certifié, avec une équipe de 15 techniciens certifiés qui réalisent eux-mêmes les interventions. Ce n'est PAS un portail de mise en relation : ce sont nos techniciens qui interviennent. deralib.com est le site de l'entreprise opérante elle-même (même société), ce qui rend la fiche Google Business Profile éligible.

## 2. Positionnement & règles d'or
1. On assume l'entreprise réelle : on peut dire "nos techniciens", "notre équipe", "nos interventions". Mettre en avant le dirigeant expert (nom + diplômes), l'équipe de 15 techniciens, les certifications Certibiocide, l'assurance, les vraies photos.
2. Prix : fourchettes indicatives 2026 + devis gratuit.
3. Honnêteté stricte : uniquement de vrais avis, vraies notes, vraies photos.
4. Conversion : numéro de téléphone unique cliquable + formulaire /devis.
5. Confiance affichée partout : équipe certifiée Certibiocide, intervention rapide, devis gratuit, couverture Île-de-France, dirigeant expert nommé.

## 3. Principes Google officiels (priment sur tout)
3.1 Ligne rouge : ne jamais générer beaucoup de pages sans valeur réelle (= spam Google). Qualité > quantité. On n'ouvre une page ville que si on a de la vraie matière locale.
3.2 People-first : écrire pour l'humain, contenu spécifique local (pas générique).
3.3 E-E-A-T : page À propos avec dirigeant expert (nom, diplômes, certifs) + équipe de 15 ; info exacte et sourcée ; pas de conseil dangereux sur les biocides.
3.4 Ne PAS perdre de temps sur : llms.txt, balisage spécial IA, découpage de contenu. Données structurées utiles mais non obligatoires pour l'IA.
3.5 Images : vraies photos d'interventions et d'équipe, texte alternatif descriptif.

## 4. Google Business Profile (levier local n°1)
UNE seule fiche pour l'entreprise (jamais une par ville = spam = suspension). Type établissement de service, zone d'intervention = Île-de-France. Catégorie "Service de dératisation", remplie à 100 %, vraies photos, vrais avis. Même nom/coordonnées que le site.

## 5. Stack technique
Next.js (App Router) + TypeScript, déployé sur Vercel. Contenu dans des fichiers JSON/MDX. Toutes les pages en génération statique (SSG).

## 6. Architecture des URL
/ (accueil), /a-propos, /deratisation, /punaises-de-lit, /cafards, /guepes-frelons, /deratisation/[ville], /punaises-de-lit/[ville], /cafards/[ville], /guepes-frelons/[ville], /guides/[slug], /devis, /mentions-legales, /politique-de-confidentialite. Les 4 familles de nuisibles sont couvertes.

## 7. Modèle de données
Fichiers : /content/villes/*.json, /content/nuisibles/*.json, /content/guides/*.mdx. Une page ville × nuisible = fiche ville + fiche nuisible + un bloc unique à la ville. Ne pas créer la page si pas de vraie matière locale.

## 8. Checklist SEO technique
title / meta description / h1 uniques par page ; canonical ; réduire le contenu dupliqué. JSON-LD : Organization + WebSite + LocalBusiness (areaServed = IDF) ; aggregateRating seulement si vrais avis ; FAQPage si FAQ ; BreadcrumbList. sitemap.xml auto + robots.txt. Maillage interne. Bouton Appeler collant en mobile (tel:) + /devis partout. next/image, alt descriptif. Mobile-first, langue fr, Open Graph.

## 9. Design
Propre, rassurant, urgence + confiance. Numéro visible en haut partout. Bandeau de réassurance (équipe certifiée Certibiocide, intervention rapide IDF, devis gratuit). Mobile-first.

## 10. Session 0 à réaliser maintenant
Construire : squelette Next.js prêt pour Vercel, accueil, /a-propos, les 4 pages piliers, /devis (formulaire simple), pages légales, + toute la technique du §8 (sitemap, robots, JSON-LD, maillage, bouton d'appel). Créer aussi les fiches de données de départ pour les 4 nuisibles et la ville paris.

Avant de coder, montre-moi ton plan de fichiers et pose-moi tes questions. Ensuite construis, puis explique-moi comment lancer en local et déployer sur Vercel.
