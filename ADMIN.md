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

## 2. Enregistrement durable des demandes — ✅ déjà configuré

Le stockage utilise **Vercel Blob** (service natif Vercel, aucun compte
tiers) : store privé `deralib-donnees`, région Francfort, variable
`BLOB_READ_WRITE_TOKEN` connectée aux trois environnements.

- Une demande = un fichier indépendant : aucune demande ne peut en
  écraser une autre, même en cas d'envois simultanés.
- Accès **privé** : les données personnelles ne sont jamais lisibles par
  URL, même en connaissant l'adresse exacte (vérifié : HTTP 403).
- Volume négligeable (quelques Ko), très loin des quotas inclus.

En cas de bascule vers un autre hébergement, le code accepte aussi
Upstash Redis : il suffit de définir `UPSTASH_REDIS_REST_URL` et
`UPSTASH_REDIS_REST_TOKEN` (elles prennent le relais automatiquement).

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
