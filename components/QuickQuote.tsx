"use client";

import { useState } from "react";
import { site } from "@/lib/config";
import {
  IconPhone,
  IconCheck,
  IconAlert,
  IconClock,
  IconSearch,
  IconHome,
  IconBuilding,
  IconStore,
  IconTeam,
  IconRat,
  IconBedbug,
  IconRoach,
  IconWasp,
} from "./Icons";

type Option = { v: string; icon: React.ReactElement; tile: string };
type Choice = { key: string; question: string; options: Option[] };

const CHOICES: Choice[] = [
  {
    key: "nuisible",
    question: "Quel est votre problème ?",
    options: [
      { v: "Rats / souris", icon: <IconRat />, tile: "tile-bleu" },
      { v: "Punaises de lit", icon: <IconBedbug />, tile: "tile-indigo" },
      { v: "Cafards", icon: <IconRoach />, tile: "tile-cyan" },
      { v: "Guêpes / frelons", icon: <IconWasp />, tile: "tile-teal" },
      { v: "Autre / je ne sais pas", icon: <IconSearch />, tile: "tile-bleu" },
    ],
  },
  {
    key: "lieu",
    question: "Où se situe le problème ?",
    options: [
      { v: "Appartement", icon: <IconBuilding />, tile: "tile-bleu" },
      { v: "Maison", icon: <IconHome />, tile: "tile-teal" },
      { v: "Commerce / restaurant", icon: <IconStore />, tile: "tile-cyan" },
      { v: "Copropriété / bureaux", icon: <IconTeam />, tile: "tile-indigo" },
    ],
  },
  {
    key: "urgence",
    question: "C'est urgent ?",
    options: [
      { v: "Oui, au plus vite", icon: <IconAlert />, tile: "tile-bleu" },
      { v: "Cette semaine", icon: <IconClock />, tile: "tile-cyan" },
      { v: "Je me renseigne", icon: <IconSearch />, tile: "tile-teal" },
    ],
  },
];

const TOTAL = CHOICES.length + 1; // + l'étape coordonnées

/**
 * Formulaire de devis express en 4 étapes : une question à la fois,
 * réponse au clic → étape suivante. La demande est enregistrée
 * directement sur le site et consultable dans /admin.
 */
export default function QuickQuote() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const pick = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    // petite pause pour voir la sélection avant de passer à la suite
    window.setTimeout(() => setStep((s) => s + 1), 200);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.get("nom"),
          tel: data.get("tel"),
          ville: data.get("ville"),
          nuisible: answers.nuisible,
          lieu: answers.lieu,
          urgence: answers.urgence,
          societe: data.get("societe"), // piège à robots
          source: "devis-express",
          page: window.location.pathname,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.erreur || "Envoi impossible");
      setSent(true);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Envoi impossible");
      setEnvoi(false);
    }
  }

  if (sent) {
    return (
      <div className="qq-card" role="status">
        <div className="qq-done">
          <span className="qq-done-ico">
            <IconCheck size={28} />
          </span>
          <h3>Demande envoyée</h3>
          <p>
            Merci, votre demande est bien enregistrée. Un technicien vous
            rappelle au plus vite — nous répondons {site.horaires}.
          </p>
          <p style={{ marginTop: 14 }}>C&apos;est urgent ? Appelez :</p>
          <a href={site.telephoneHref} className="btn btn-primary btn-call" style={{ marginTop: 10 }}>
            <IconPhone /> {site.telephone}
          </a>
        </div>
      </div>
    );
  }

  const isContact = step >= CHOICES.length;
  const choice = CHOICES[Math.min(step, CHOICES.length - 1)];

  return (
    <div className="qq-card">
      <div className="qq-head">
        {step > 0 ? (
          <button type="button" className="qq-back" onClick={() => setStep(step - 1)}>
            ‹ Retour
          </button>
        ) : (
          <span className="qq-kicker">Devis express</span>
        )}
        <span className="qq-count">
          Étape {step + 1}/{TOTAL}
        </span>
      </div>
      <div className="qq-progress" aria-hidden>
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} className={i <= step ? "done" : ""} />
        ))}
      </div>

      {!isContact ? (
        <div className="qq-step" key={step}>
          <p className="qq-question">{choice.question}</p>
          <div className="qq-options">
            {choice.options.map((o) => (
              <button
                key={o.v}
                type="button"
                className={`qq-option${answers[choice.key] === o.v ? " selected" : ""}`}
                onClick={() => pick(choice.key, o.v)}
              >
                <span className={`qq-ico ${o.tile}`}>{o.icon}</span>
                {o.v}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form className="qq-step" key="contact" onSubmit={handleSubmit}>
          <p className="qq-question">Où peut-on vous rappeler ?</p>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="qq-nom">Votre nom *</label>
              <input id="qq-nom" name="nom" required autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="qq-tel">Téléphone *</label>
              <input id="qq-tel" name="tel" type="tel" required autoComplete="tel" />
            </div>
            <div className="form-field full">
              <label htmlFor="qq-ville">Ville / code postal *</label>
              <input id="qq-ville" name="ville" required placeholder="Ex. Paris 11e" />
            </div>
          </div>
          {/* champ piège : invisible pour les humains, rempli par les robots */}
          <input
            type="text"
            name="societe"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
          />
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: 20 }}
            disabled={envoi}
          >
            {envoi ? "Envoi en cours…" : "Recevoir mon devis gratuit"}
          </button>
          {erreur && (
            <p className="form-erreur">
              {erreur}. Appelez-nous au{" "}
              <a href={site.telephoneHref}>{site.telephone}</a>.
            </p>
          )}
          <p className="qq-note">
            Réponse rapide d&apos;un technicien — sans engagement. Vos données ne
            sont jamais revendues.
          </p>
        </form>
      )}
    </div>
  );
}
