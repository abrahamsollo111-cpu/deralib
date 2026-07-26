# Espace d'administration — deralib.com/admin

Tableau de bord privé : demandes reçues, statistiques, balises de suivi,
inventaire du site et plan de prospection.

## 1. Activer l'accès (obligatoire)

Sans mot de passe défini, l'accès est **refusé** (aucune ouverture par
défaut). Sur Vercel :

1. Projet **deralib** → **Settings** → **Environment Variables**
2. Ajouter :

   | Nom | Valeur | Environnements |
   |---|---|---|
   | `ADMIN_PASSWORD` | un mot de passe long, unique | Production, Preview, Development |

3. **Deployments** → dernier déploiement → ⋯ → **Redeploy**

Conseil : au moins 16 caractères, mémorisé dans un gestionnaire de mots
de passe. Ne jamais l'écrire dans le code (le dépôt GitHub est public).

Pour changer de mot de passe : modifier la variable puis redéployer.
Toutes les sessions ouvertes sont alors invalidées.

## 2. Activer l'enregistrement durable des demandes (fortement recommandé)

Sans cette étape, les demandes sont conservées de façon **temporaire** et
disparaissent au redéploiement du site. Configuration gratuite, 5 minutes :

1. Créer un compte sur [upstash.com](https://upstash.com)
2. **Create Database** → type *Redis* → région **Europe (Frankfurt)** →
   plan **Free**
3. Onglet **REST API** : copier `UPSTASH_REDIS_REST_URL` et
   `UPSTASH_REDIS_REST_TOKEN`
4. Les ajouter dans Vercel (mêmes étapes qu'au point 1)
5. Redéployer

Le bandeau orange du dashboard disparaît une fois la configuration active.

Volumes du plan gratuit : 10 000 commandes par jour — très largement
suffisant (une demande = 1 commande).

## 3. Utilisation

**Demandes** — chaque envoi de formulaire du site arrive ici. Filtres par
statut, recherche, fiche dépliable (message, origine, page), appel en un
clic, note interne, export CSV.

Statuts : Nouveau → Rappelé → Devis envoyé → Client gagné / Perdu.

**Statistiques** — volumes par jour, par nuisible, par ville, par
formulaire, par urgence ; taux de conversion et de traitement.

**Suivi & balises** — coller un identifiant Google Analytics, Google Ads,
Meta Pixel ou une balise de vérification : la balise est ajoutée
automatiquement sur toutes les pages, sans intervention technique
(effectif en quelques minutes). C'est aussi ici qu'on enregistre le lien
d'avis Google.

**Site** — état de la configuration, informations encore attendues,
inventaire des pages, coordonnées publiées, liens utiles.

**Prospection** — message SMS de demande d'avis prêt à copier, et
check-list des actions d'acquisition (cochages conservés sur l'appareil).

## 4. Sécurité et données personnelles

- Cookie de session signé (HMAC-SHA256), httpOnly, 30 jours
- Limitation des tentatives de connexion (8 / 15 min par IP)
- Limitation des envois de formulaire (10 / heure par IP) + champ piège
  anti-robots
- `/admin` et `/api/` exclus des moteurs de recherche (robots.txt +
  balise noindex)
- Les demandes contiennent des données personnelles : ne les conserver
  que le temps utile (bouton Supprimer sur chaque fiche), conformément à
  la politique de confidentialité du site.

## 5. Développement local

Créer un fichier `.env.local` (jamais versionné) :

```
ADMIN_PASSWORD=un-mot-de-passe-de-test
```

Puis `npm run dev` et ouvrir http://localhost:3000/admin.
Sans Upstash configuré, les demandes sont écrites dans `.data/leads.json`.
