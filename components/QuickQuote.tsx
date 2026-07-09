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
 * réponse au clic → étape suivante. Pour l'instant, l'envoi ouvre
 * l'application email du visiteur pré-remplie (comme /devis).
 * TODO plus tard : brancher un service d'envoi (Formspree / Resend).
 */
export default function QuickQuote() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const pick = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    // petite pause pour voir la sélection avant de passer à la suite
    window.setTimeout(() => setStep((s) => s + 1), 200);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lignes = [
      `Nuisible : ${answers.nuisible}`,
      `Lieu : ${answers.lieu}`,
      `Urgence : ${answers.urgence}`,
      `Nom : ${data.get("nom")}`,
      `Téléphone : ${data.get("tel")}`,
      `Ville / code postal : ${data.get("ville")}`,
    ];
    const subject = encodeURIComponent(
      `Devis express — ${answers.nuisible} — ${answers.lieu}`
    );
    const body = encodeURIComponent(lignes.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="qq-card" role="status">
        <div className="qq-done">
          <span className="qq-done-ico">
            <IconCheck size={28} />
          </span>
          <h3>Merci, c&apos;est presque envoyé !</h3>
          <p>
            Votre application email s&apos;est ouverte avec votre demande
            pré-remplie : il ne reste qu&apos;à appuyer sur « Envoyer ». Un
            technicien vous rappelle rapidement.
          </p>
          <p style={{ marginTop: 14 }}>Encore plus rapide :</p>
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
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 20 }}>
            Recevoir mon devis gratuit
          </button>
          <p className="qq-note">
            Réponse rapide d&apos;un technicien — sans engagement. Vos données ne
            sont jamais revendues.
          </p>
        </form>
      )}
    </div>
  );
}
