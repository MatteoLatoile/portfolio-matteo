"use client";

import { useState } from "react";
import {
  FiBriefcase,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiTag,
  FiUser,
} from "react-icons/fi";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      fullname: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      entreprise: formData.get("company") || null,
      objet: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Message envoyé ✅");
        e.target.reset();
      } else {
        alert("Erreur ❌");
      }
    } catch {
      alert("Erreur réseau ❌");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="body-page pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="reveal delay-0 text-3xl md:text-6xl font-semibold text-white pt-20">
          04. Contactez-moi
        </h3>
        <p className="reveal delay-100 mt-3 text-sm md:text-base text-[#B0A9C2] max-w-2xl">
          Chaque projet est une solution sur-mesure, pensée pour l’utilisateur
          et bâtie avec rigueur. Dites-moi ce dont vous avez besoin — on avance.
        </p>
      </div>

      {/* Form */}
      <section className="reveal delay-200 max-w-3xl mx-auto px-4 md:px-6 mt-10 md:mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8 pb-20">
          <div className="flex items-center gap-3 text-white/90 mb-6">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded border border-white/20" />
            <h2 className="text-xl md:text-2xl font-semibold">
              Formulaire de contact
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="name" label="Nom complet" Icon={FiUser}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Tapez votre nom ici."
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            <Field id="email" label="Adresse e-mail" Icon={FiMail}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Tapez votre adresse e-mail ici."
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            <Field
              id="phone"
              label="N° de téléphone"
              hint="(facultatif)"
              Icon={FiPhone}
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Tapez votre numéro de téléphone ici."
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            <Field
              id="company"
              label="Entreprise"
              hint="(facultatif)"
              Icon={FiBriefcase}
            >
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Tapez le nom de votre entreprise ici."
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            <Field id="subject" label="Objet du message" Icon={FiTag}>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Quel est l’objet de votre message ?"
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            <Field id="message" label="Message" Icon={FiMessageSquare}>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tapez votre message ici."
                className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30 resize-y"
              />
            </Field>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-black px-6 md:px-8 py-3 font-medium transition-transform transition-colors duration-300 hover:bg-purple-100 hover:scale-[1.03] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                ) : (
                  <FiSend className="inline-block" />
                )}
                {submitting ? "Envoi..." : "Envoyer le message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ id, label, hint, Icon, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-white/90 text-sm font-medium mb-2"
      >
        <span className="inline-flex items-center gap-2">
          <Icon className="text-white/80" size={18} aria-hidden />
          {label}
          {hint && <span className="text-white/50 font-normal">{hint}</span>}
        </span>
      </label>
      {children}
    </div>
  );
}
