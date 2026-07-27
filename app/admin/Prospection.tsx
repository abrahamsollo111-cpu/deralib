"use client";

import { useEffect, useState } from "react";

const CLE_LOCALE = "deralib_prospection";

const ACTIONS = [
  {
    groupe: "Priorité — les avis clients",
    items: [
      "Envoyer le lien d'avis à 3-5 anciens clients satisfaits (1 à 2 par semaine, jamais tout d'un coup)",
      "Envoyer le lien d'avis le soir même de chaque nouvelle intervention",
      "Répondre à chaque avis reçu sous 24 h, même négatif",
    ],
  },
  {
    groupe: "Visibilité gratuite",
    items: [
      "Publier une annonce Leboncoin (Services → Autres services) et la remonter chaque semaine",
      "S'inscrire sur PagesJaunes, Yelp, 118000 avec exactement les mêmes coordonnées",
      "Répondre aux demandes dans les groupes Facebook et Nextdoor de quartier",
      "Ajouter 1 à 2 photos d'intervention par mois sur la fiche Google",
    ],
  },
  {
    groupe: "Prospection directe (contrats récurrents)",
    items: [
      "Démarcher les gardiens d'immeubles et syndics du secteur",
      "Passer voir les restaurants et commerces de bouche en fin de service (argument : registre sanitaire)",
      "Contacter les agences immobilières et conciergeries Airbnb (punaises de lit)",
      "Distribuer les flyers dans les quartiers anciens de Paris et petite couronne",
    ],
  },
  {
    groupe: "Suivi hebdomadaire",
    items: [
      "Consulter Google Search Console (positions, mots-clés)",
      "Vérifier les statistiques d'appels de la fiche Google",
      "Traiter toutes les demandes en statut « nouveau » de ce dashboard",
    ],
  },
];

export default function Prospection({ lienAvis }: { lienAvis: string }) {
  const [faits, setFaits] = useState<string[]>([]);
  const [copie, setCopie] = useState(false);

  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE_LOCALE);
      if (brut) setFaits(JSON.parse(brut) as string[]);
    } catch {
      /* stockage local indisponible */
    }
  }, []);

  function basculer(item: string) {
    const suivant = faits.includes(item)
      ? faits.filter((f) => f !== item)
      : [...faits, item];
    setFaits(suivant);
    try {
      localStorage.setItem(CLE_LOCALE, JSON.stringify(suivant));
    } catch {
      /* ignoré */
    }
  }

  // On guide la question, jamais la réponse : inviter le client à dire
  // QUELLE intervention et OÙ fait venir naturellement les mots-clés
  // (« dératisation », « punaises », sa ville) sans dicter le texte —
  // des avis variés et authentiques, ce que Google valorise.
  const modeleSms = lienAvis
    ? `Bonjour, c'est Deralib. Merci pour votre confiance ! Si vous êtes satisfait, un avis Google nous aiderait beaucoup. En 2 phrases : quelle intervention avons-nous faite chez vous, dans quelle ville, et comment ça s'est passé ? ${lienAvis}`
    : "";

  return (
    <section className="admin-grille2">
      <div className="admin-carte admin-carte-large">
        <h2>Demander un avis client</h2>
        {lienAvis ? (
          <>
            <p className="admin-mini">
              Message prêt à envoyer par SMS après chaque intervention réussie.
            </p>
            <div className="admin-sms">{modeleSms}</div>
            <div className="admin-form-bas">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigator.clipboard.writeText(modeleSms);
                  setCopie(true);
                  setTimeout(() => setCopie(false), 2500);
                }}
              >
                Copier le message
              </button>
              <a
                className="admin-btn-sec"
                href={`sms:?&body=${encodeURIComponent(modeleSms)}`}
              >
                Ouvrir dans Messages
              </a>
              {copie && <span className="admin-ok">✓ Copié</span>}
            </div>
          </>
        ) : (
          <p className="admin-mini">
            Renseignez votre lien d&apos;avis Google dans l&apos;onglet « Suivi
            &amp; balises » : un message SMS prêt à l&apos;emploi apparaîtra ici.
          </p>
        )}
        <p className="admin-avert">
          ⚠️ Un avis = une vraie intervention. Les faux avis (entourage non
          client, avis achetés) sont détectés par Google, peuvent faire
          suspendre la fiche, et constituent une pratique commerciale trompeuse
          sanctionnée par la loi.
        </p>
      </div>

      {ACTIONS.map((g) => (
        <div key={g.groupe} className="admin-carte">
          <h2>{g.groupe}</h2>
          <ul className="admin-checklist">
            {g.items.map((item) => (
              <li key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={faits.includes(item)}
                    onChange={() => basculer(item)}
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="admin-carte admin-carte-large">
        <h2>Réflexes qui transforment une demande en client</h2>
        <ul className="admin-conseils">
          <li>
            <strong>Rappeler dans l&apos;heure.</strong> Sur une urgence
            nuisibles, le premier professionnel qui décroche emporte
            l&apos;intervention.
          </li>
          <li>
            <strong>Annoncer un prix dès l&apos;appel.</strong> Une fourchette
            claire rassure ; le flou fait fuir vers le concurrent.
          </li>
          <li>
            <strong>Confirmer par SMS.</strong> Créneau + nom du technicien +
            prix annoncé : cela réduit fortement les rendez-vous manqués.
          </li>
          <li>
            <strong>Proposer un contrat annuel</strong> aux commerces et
            copropriétés : un client récurrent vaut dix urgences ponctuelles.
          </li>
        </ul>
      </div>
    </section>
  );
}
