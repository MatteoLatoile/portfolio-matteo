// app/contact/page.jsx
import {
  FiBriefcase,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiTag,
  FiUser,
} from "react-icons/fi";

export default function Page() {
  return (
    <div className="body-page pb-20">
      <head>
        <title>Contact - Portfolio</title>
      </head>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-3xl md:text-6xl font-semibold text-white pt-20">
          04. Contactez-moi
        </h3>
        <p className="mt-3 text-sm md:text-base text-[#B0A9C2] max-w-2xl">
          Chaque projet est une solution sur-mesure, pensée pour l’utilisateur
          et bâtie avec rigueur. Dites-moi ce dont vous avez besoin — on avance.
        </p>
      </div>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-10 md:mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8 pb-20">
          <div className="flex items-center gap-3 text-white/90 mb-6">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded border border-white/20">
              {/* petit coin/repère visuel */}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold">
              Formulaire de contact
            </h2>
          </div>

          <form action="/api/contact" method="POST" className="space-y-5">
            {/* Nom */}
            <Field id="name" label="Nom complet" Icon={FiUser}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tapez votre nom ici."
                autoComplete="name"
                required
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            {/* Email */}
            <Field id="email" label="Adresse e-mail" Icon={FiMail}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Tapez votre adresse e-mail ici."
                autoComplete="email"
                required
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            {/* Téléphone (facultatif) */}
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
                placeholder="Tapez votre numéro de téléphone ici."
                autoComplete="tel"
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            {/* Entreprise (facultatif) */}
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
                placeholder="Tapez le nom de votre entreprise ici."
                autoComplete="organization"
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            {/* Objet */}
            <Field id="subject" label="Objet du message" Icon={FiTag}>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Quel est l’objet de votre message ?"
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/30"
              />
            </Field>

            {/* Message */}
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
                className="w-full md:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 md:px-8 py-3 font-medium hover:bg-purple-100 transition-colors"
              >
                <FiSend className="inline-block" />
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

/* --- UI sous-composant --- */
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
