"use client";

const PAGES = [
  { url: "/", label: "Accueil" },
  { url: "/deratisation", label: "Dératisation" },
  { url: "/punaises-de-lit", label: "Punaises de lit" },
  { url: "/cafards", label: "Cafards" },
  { url: "/guepes-frelons", label: "Guêpes & frelons" },
  { url: "/depigeonnage", label: "Dépigeonnage" },
  { url: "/deratisation/paris", label: "Dératisation Paris (75)" },
  { url: "/deratisation/hauts-de-seine", label: "Hauts-de-Seine (92)" },
  { url: "/deratisation/seine-saint-denis", label: "Seine-Saint-Denis (93)" },
  { url: "/deratisation/val-de-marne", label: "Val-de-Marne (94)" },
  { url: "/deratisation/seine-et-marne", label: "Seine-et-Marne (77)" },
  { url: "/deratisation/yvelines", label: "Yvelines (78)" },
  { url: "/deratisation/essonne", label: "Essonne (91)" },
  { url: "/deratisation/val-d-oise", label: "Val-d'Oise (95)" },
  { url: "/conseils", label: "Conseils (blog)" },
  { url: "/conseils/prix-deratisation-2026", label: "— Prix dératisation 2026" },
  { url: "/conseils/reconnaitre-punaises-de-lit", label: "— Reconnaître les punaises" },
  { url: "/conseils/rat-ou-souris-differences", label: "— Rat ou souris" },
  { url: "/conseils/nid-de-guepes-ne-pas-detruire-soi-meme", label: "— Nid de guêpes" },
  { url: "/professionnels", label: "Professionnels" },
  { url: "/a-propos", label: "À propos" },
  { url: "/contact", label: "Contact" },
  { url: "/devis", label: "Devis" },
  { url: "/mentions-legales", label: "Mentions légales" },
  { url: "/politique-de-confidentialite", label: "Confidentialité" },
];

const A_FOURNIR = [
  "Numéro de certificat Certibiocide (ne jamais l'inventer)",
  "Assureur RC professionnelle + numéro de contrat",
  "Année de création de la SAS et nombre de techniciens",
  "Capital social, n° de TVA, médiateur de la consommation (mentions légales)",
  "Vraies photos : dirigeant, équipe, véhicule siglé, interventions avant/après",
  "Vos tarifs réels (les fourchettes affichées sont indicatives)",
  "Confirmation que contact@deralib.com est bien relevée",
];

export default function SiteInfos({
  stockagePersistant,
  nbLeads,
}: {
  stockagePersistant: boolean;
  nbLeads: number;
}) {
  return (
    <section className="admin-grille2">
      <div className="admin-carte">
        <h2>État de la configuration</h2>
        <ul className="admin-etats">
          <li className="ok">
            <span>Site en ligne</span> www.deralib.com
          </li>
          <li className="ok">
            <span>Accès administrateur</span> protégé par mot de passe
          </li>
          <li className={stockagePersistant ? "ok" : "ko"}>
            <span>Enregistrement des demandes</span>
            {stockagePersistant
              ? `durable (${nbLeads} enregistrée${nbLeads > 1 ? "s" : ""})`
              : "temporaire — à configurer"}
          </li>
          <li className="ok">
            <span>Référencement</span> sitemap soumis, 23 pages
          </li>
        </ul>

        {!stockagePersistant && (
          <div className="admin-alerte" style={{ marginTop: 16 }}>
            <strong>Activer l&apos;enregistrement durable (5 min, gratuit)</strong>
            <ol className="admin-etapes">
              <li>
                Créez un compte sur{" "}
                <a href="https://upstash.com" target="_blank" rel="noreferrer">
                  upstash.com
                </a>{" "}
                puis une base <em>Redis</em> (région Europe).
              </li>
              <li>
                Dans l&apos;onglet REST API, copiez <code>UPSTASH_REDIS_REST_URL</code>{" "}
                et <code>UPSTASH_REDIS_REST_TOKEN</code>.
              </li>
              <li>
                Sur Vercel : projet deralib → Settings → Environment Variables →
                ajoutez ces deux variables.
              </li>
              <li>Redéployez (Deployments → ⋯ → Redeploy).</li>
            </ol>
          </div>
        )}
      </div>

      <div className="admin-carte">
        <h2>Informations encore attendues</h2>
        <p className="admin-mini">
          Ces éléments renforceront la crédibilité du site. Rien n&apos;est
          inventé : tant qu&apos;une donnée manque, elle n&apos;est pas affichée.
        </p>
        <ul className="admin-todo">
          {A_FOURNIR.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="admin-carte admin-carte-large">
        <h2>Toutes les pages du site ({PAGES.length})</h2>
        <div className="admin-pages">
          {PAGES.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noreferrer">
              {p.label}
              <span>{p.url}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="admin-carte">
        <h2>Coordonnées publiées</h2>
        <dl className="admin-def">
          <div>
            <dt>Téléphone</dt>
            <dd>01 72 68 21 30</dd>
          </div>
          <div>
            <dt>Société</dt>
            <dd>SAS Deralib</dd>
          </div>
          <div>
            <dt>SIRET</dt>
            <dd>917 410 011 00014</dd>
          </div>
          <div>
            <dt>Siège</dt>
            <dd>45 rue Boursault, 75017 Paris</dd>
          </div>
          <div>
            <dt>Horaires</dt>
            <dd>7j/7 — 24h/24</dd>
          </div>
        </dl>
        <p className="admin-mini" style={{ marginTop: 12 }}>
          Ces informations doivent être <strong>strictement identiques</strong> sur
          la fiche Google et les annuaires. Pour les modifier, demandez la mise à
          jour du fichier de configuration du site.
        </p>
      </div>

      <div className="admin-carte">
        <h2>Liens utiles</h2>
        <ul className="admin-liens">
          <li>
            <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">
              Vercel (hébergement) ↗
            </a>
            <span>Déploiements, factures, variables d&apos;environnement.</span>
          </li>
          <li>
            <a href="https://github.com/abrahamsollo111-cpu/deralib" target="_blank" rel="noreferrer">
              Code source GitHub ↗
            </a>
            <span>Historique complet des modifications du site.</span>
          </li>
          <li>
            <a href="https://www.deralib.com/sitemap.xml" target="_blank" rel="noreferrer">
              Sitemap ↗
            </a>
            <span>La liste des pages transmise à Google.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
