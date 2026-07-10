"use client";

import { useEffect, useRef, useState } from "react";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FiAlertCircle,
  FiArrowUpRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiTag,
  FiTerminal,
  FiUser,
  FiZap,
} from "react-icons/fi";

import { SiMalt } from "react-icons/si";

const INPUT_CLASS = [
  "peer w-full rounded-2xl border border-white/[0.09]",
  "bg-white/[0.035] px-4 py-4 text-sm text-white",
  "placeholder:text-white/25",
  "outline-none transition duration-300",
  "hover:border-white/[0.16] hover:bg-white/[0.05]",
  "focus:border-[#C154F7]/50 focus:bg-[#C154F7]/[0.055]",
  "focus:shadow-[0_0_0_4px_rgba(193,84,247,0.08),0_15px_45px_rgba(0,0,0,0.2)]",
].join(" ");

const TEXTAREA_CLASS = [
  INPUT_CLASS,
  "min-h-[170px] resize-y leading-7",
].join(" ");

const PARTICLES = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 43 + 9) % 100}%`,
  top: `${(index * 67 + 7) % 98}%`,
  size: 1 + (index % 3),
  duration: 9 + (index % 8) * 1.35,
  delay: -(index % 14) * 0.75,
  driftX: -40 + (index % 9) * 10,
  driftY: -20 - (index % 6) * 10,
}));

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/33667727557",
    Icon: FaWhatsapp,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mattdev-padalino",
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/MatteoLatoile",
    Icon: FaGithub,
  },
  {
    label: "Malt",
    href: "https://www.malt.fr/profile/matteopadalino",
    Icon: SiMalt,
  },
];

export default function ContactPage() {
  const stageRef = useRef(null);
  const animationFrameRef = useRef(null);
  const notificationTimerRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(notificationTimerRef.current);
    };
  }, []);

  const showNotification = (type, title, message) => {
    clearTimeout(notificationTimerRef.current);

    setNotification({
      type,
      title,
      message,
    });

    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handlePointerMove = (event) => {
    const stage = stageRef.current;

    if (!stage) return;

    cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const bounds = stage.getBoundingClientRect();

      const relativeX =
        (event.clientX - bounds.left) / bounds.width;

      const relativeY =
        (event.clientY - bounds.top) / bounds.height;

      const normalizedX = (relativeX - 0.5) * 2;
      const normalizedY = (relativeY - 0.5) * 2;

      stage.style.setProperty(
        "--mouse-x",
        `${relativeX * 100}%`
      );

      stage.style.setProperty(
        "--mouse-y",
        `${relativeY * 100}%`
      );

      stage.style.setProperty(
        "--scene-x",
        `${normalizedX * 12}px`
      );

      stage.style.setProperty(
        "--scene-y",
        `${normalizedY * 10}px`
      );
    });
  };

  const resetPointerPosition = () => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.style.setProperty("--mouse-x", "50%");
    stage.style.setProperty("--mouse-y", "30%");
    stage.style.setProperty("--scene-x", "0px");
    stage.style.setProperty("--scene-y", "0px");
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullname: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      entreprise: formData.get("company") || null,
      objet: formData.get("subject"),
      message: formData.get("message"),
    };

    setSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("La requête a échoué.");
      }

      form.reset();

      showNotification(
        "success",
        "Message envoyé",
        "Merci pour votre message. Je reviendrai vers vous dès que possible."
      );
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);

      showNotification(
        "error",
        "Échec de l’envoi",
        "Le message n’a pas pu être envoyé. Réessayez ou contactez-moi directement par e-mail."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      ref={stageRef}
      className="contact-stage relative min-h-screen overflow-hidden text-white"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
    >
      {/* Arrière-plan */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="contact-cursor-glow absolute inset-0" />

        <div className="contact-aurora contact-aurora-one" />
        <div className="contact-aurora contact-aurora-two" />
        <div className="contact-aurora contact-aurora-three" />

        <div className="contact-grid absolute inset-0" />
        <div className="contact-perspective-grid" />
        <div className="contact-scan-beam" />

        <div className="absolute inset-0">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="contact-particle absolute block rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                "--duration": `${particle.duration}s`,
                "--delay": `${particle.delay}s`,
                "--drift-x": `${particle.driftX}px`,
                "--drift-y": `${particle.driftY}px`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 shadow-[inset_0_0_220px_65px_rgba(0,0,0,0.52)]" />
      </div>

      {/* Index latéral */}
      <div
        className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="contact-side-label text-[8px] font-bold uppercase tracking-[0.23em] text-white/20">
          Contact
        </span>

        <span className="contact-side-line relative block h-24 w-px overflow-hidden bg-white/[0.08]">
          <span className="absolute left-0 h-10 w-full bg-gradient-to-b from-transparent via-[#C154F7] to-white" />
        </span>

        <strong className="font-mono text-[10px] font-normal text-white/30">
          04
        </strong>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className="contact-notification fixed right-4 top-24 z-[100] w-[calc(100%-32px)] max-w-[390px]"
          role="status"
          aria-live="polite"
        >
          <div
            className={[
              "relative overflow-hidden rounded-2xl border p-4",
              "shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
              notification.type === "success"
                ? "border-emerald-400/20 bg-[#071811]/90"
                : "border-red-400/20 bg-[#1A080D]/90",
            ].join(" ")}
          >
            <div
              className={[
                "absolute inset-y-0 left-0 w-1",
                notification.type === "success"
                  ? "bg-emerald-400"
                  : "bg-red-400",
              ].join(" ")}
            />

            <div className="flex items-start gap-3">
              <span
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                  notification.type === "success"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    : "border-red-400/20 bg-red-400/10 text-red-300",
                ].join(" ")}
              >
                {notification.type === "success" ? (
                  <FiCheckCircle />
                ) : (
                  <FiAlertCircle />
                )}
              </span>

              <div className="min-w-0">
                <strong className="block text-sm font-semibold text-white">
                  {notification.title}
                </strong>

                <p className="mt-1 text-xs leading-5 text-white/55">
                  {notification.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotification(null)}
                aria-label="Fermer la notification"
                className="ml-auto text-lg text-white/30 transition hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero et formulaire */}
      <section className="relative z-10 mx-auto grid min-h-screen w-[calc(100%-28px)] max-w-[1420px] grid-cols-1 items-center gap-14 pb-24 pt-32 md:w-[calc(100%-52px)] lg:grid-cols-[minmax(360px,0.82fr)_minmax(560px,1.18fr)] lg:gap-16 lg:py-32 xl:w-[calc(100%-72px)]">
        {/* Partie gauche */}
        <div className="relative">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#E8D7F8]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl md:text-[10px]">
            <span className="relative flex h-2 w-2 rounded-full bg-[#62E6A5] shadow-[0_0_13px_#62E6A5]">
              <span className="contact-badge-ping absolute inset-0 rounded-full bg-[#62E6A5]" />
            </span>

            Disponible pour de nouveaux projets
          </div>

          <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#CFB1EC]/40">
            Contact / Démarrer un projet
          </span>

          <h1 className="text-[clamp(3.8rem,15vw,5.5rem)] font-medium leading-[0.89] tracking-[-0.075em] md:text-[clamp(4.6rem,8vw,7rem)]">
            Parlons de
            <span className="block text-[#F0E0FF]/45">
              votre idée.
            </span>

            <strong className="contact-gradient-title block font-medium">
              Faisons-la vivre.
            </strong>
          </h1>

          <p className="mt-8 max-w-[610px] text-[15px] leading-7 tracking-[-0.02em] text-[#D9CBE7]/60 md:text-[17px] md:leading-8">
            Vous avez un projet, un besoin ou simplement une idée à explorer ?
            Présentez-moi votre objectif et construisons une solution{" "}
            <strong className="font-medium text-white/90">
              cohérente, performante et mémorable
            </strong>
            .
          </p>

          {/* Contacts directs */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ContactMethod
              href="mailto:matteo.padalinoba@gmail.com"
              Icon={FiMail}
              label="E-mail"
              value="matteo.padalinoba@gmail.com"
            />

            <ContactMethod
              href="tel:+33667727557"
              Icon={FiPhone}
              label="Téléphone"
              value="06 67 72 75 57"
            />

            <ContactMethod
              Icon={FiMapPin}
              label="Localisation"
              value="Saint-Étienne, France"
            />

            <ContactMethod
              Icon={FiClock}
              label="Réponse moyenne"
              value="Sous 24 à 48 heures"
            />
          </div>

          {/* Réseaux */}
          <div className="mt-8">
            <span className="mb-3 block text-[8px] font-bold uppercase tracking-[0.18em] text-white/25">
              Me retrouver ailleurs
            </span>

            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-lg text-white/60 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#C154F7]/35 hover:bg-[#C154F7]/10 hover:text-white hover:shadow-[0_15px_40px_rgba(106,0,255,0.2)]"
                >
                  <Icon className="transition duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Mini système orbital */}
          <div
            className="contact-visual-parallax relative mt-12 hidden h-[230px] lg:block"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-1/2 h-[210px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <div className="contact-mini-aura absolute inset-[18%] rounded-full" />

              <div className="contact-mini-orbit contact-mini-orbit-one absolute left-1/2 top-1/2 h-[105px] w-[340px] rounded-[50%] border border-[#C154F7]/20">
                <span className="absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C154F7] shadow-[0_0_12px_#C154F7]" />
              </div>

              <div className="contact-mini-orbit contact-mini-orbit-two absolute left-1/2 top-1/2 h-[90px] w-[275px] rounded-[50%] border border-white/10">
                <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_white]" />
              </div>

              <div className="contact-message-core absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#C154F7]/25">
                <FiMessageSquare className="text-2xl text-[#DCAEFF]" />

                <strong className="mt-2 text-[9px] tracking-[0.12em]">
                  CONNECT
                </strong>

                <span className="mt-1 text-[6px] uppercase tracking-[0.13em] text-white/30">
                  Channel open
                </span>
              </div>

              <div className="contact-code-chip absolute left-0 top-5 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0B0314]/80 px-3 py-2 text-[8px] font-semibold text-white/55 backdrop-blur-xl">
                <FiCode className="text-[#C154F7]" />
                Build
              </div>

              <div className="contact-zap-chip absolute bottom-5 right-0 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0B0314]/80 px-3 py-2 text-[8px] font-semibold text-white/55 backdrop-blur-xl">
                <FiZap className="text-[#C154F7]" />
                Create
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-[#6A00FF]/15 blur-[100px]" />

          <div className="contact-form-shell relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[linear-gradient(145deg,rgba(31,8,51,0.88),rgba(9,3,16,0.94))] p-1 shadow-[0_40px_130px_rgba(0,0,0,0.55),0_0_80px_rgba(106,0,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#C154F7] to-transparent opacity-80" />

            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#C154F7]/10 blur-[90px]" />

            {/* Header du formulaire */}
            <div className="relative flex items-center justify-between border-b border-white/[0.07] px-5 py-5 md:px-8 md:py-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl text-[#DCAEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <FiTerminal />

                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#170522] bg-[#62E6A5] shadow-[0_0_8px_#62E6A5]" />
                </span>

                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-[0.18em] text-[#D4B5F0]/40">
                    New transmission
                  </span>

                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] md:text-2xl">
                    Formulaire de contact
                  </h2>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[7px] font-bold uppercase tracking-[0.12em] text-white/30 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#62E6A5] shadow-[0_0_8px_#62E6A5]" />
                Secure channel
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 px-5 py-6 md:px-8 md:py-8"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  id="name"
                  label="Nom complet"
                  Icon={FiUser}
                  required
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Votre nom et prénom"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field
                  id="email"
                  label="Adresse e-mail"
                  Icon={FiMail}
                  required
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="exemple@email.com"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field
                  id="phone"
                  label="Téléphone"
                  hint="Facultatif"
                  Icon={FiPhone}
                >
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+33 6 00 00 00 00"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field
                  id="company"
                  label="Entreprise"
                  hint="Facultatif"
                  Icon={FiBriefcase}
                >
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nom de votre entreprise"
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>

              <Field
                id="subject"
                label="Objet du message"
                Icon={FiTag}
                required
              >
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Exemple : création d’un site vitrine"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field
                id="message"
                label="Votre projet"
                Icon={FiMessageSquare}
                required
              >
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  required
                  placeholder="Présentez-moi votre besoin, vos objectifs, vos délais ou toute information utile..."
                  className={TEXTAREA_CLASS}
                />
              </Field>

              {/* Résumé */}
              <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.06] bg-black/[0.12] p-4 sm:grid-cols-3">
                <FormAdvantage
                  Icon={FiCheck}
                  title="Sur mesure"
                  text="Une réponse adaptée"
                />

                <FormAdvantage
                  Icon={FiClock}
                  title="Réactif"
                  text="Retour sous 48 h"
                />

                <FormAdvantage
                  Icon={FiZap}
                  title="Direct"
                  text="Sans intermédiaire"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[10px] leading-5 text-white/25">
                  En envoyant ce formulaire, vous acceptez d’être recontacté
                  au sujet de votre demande.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative inline-flex w-full cursor-pointer items-center overflow-hidden rounded-full border border-[#DAB0FF]/25 bg-gradient-to-br from-[#C154F7]/20 to-[#6A00FF]/10 p-1.5 text-white shadow-[0_17px_50px_rgba(106,0,255,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-1 hover:border-[#DCB0FF]/50 hover:shadow-[0_25px_70px_rgba(106,0,255,0.27)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                >
                  <span className="contact-button-shine absolute -top-full h-[300%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <span className="relative z-10 flex w-full items-center justify-between gap-4 pl-4 text-sm font-semibold sm:w-auto">
                    {submitting
                      ? "Transmission..."
                      : "Envoyer le message"}

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#160323] transition duration-300 group-hover:rotate-45">
                      {submitting ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#160323]/25 border-t-[#160323]" />
                      ) : (
                        <FiSend />
                      )}
                    </span>
                  </span>
                </button>
              </div>
            </form>

            <div className="h-px w-full bg-gradient-to-r from-[#6A00FF] via-[#C154F7] to-[#8A2EFF] opacity-60" />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative z-10 flex flex-col items-center overflow-hidden px-5 pb-36 pt-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[25%] -z-10 h-72 w-[620px] -translate-x-1/2 rounded-full bg-[#6A00FF]/20 blur-[130px]" />

        <div className="contact-footer-orbit relative mb-7 h-20 w-20 rounded-full border border-[#C154F7]/25">
          <span className="absolute inset-4 rounded-full border border-white/10" />

          <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C154F7] shadow-[0_0_10px_#C154F7,0_0_25px_rgba(193,84,247,0.7)]" />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#DCC5F1]/40">
          Une question rapide ?
        </span>

        <h2 className="mt-5 max-w-4xl text-[clamp(3.3rem,14vw,5rem)] font-medium leading-[0.95] tracking-[-0.07em] md:text-[clamp(4rem,7vw,6.7rem)]">
          Échangeons directement
          <span className="text-[#C154F7] [text-shadow:0_0_30px_rgba(193,84,247,0.55)]">
            {" "}sur WhatsApp.
          </span>
        </h2>

        <p className="mt-7 max-w-xl text-sm leading-7 text-[#DACCE8]/50">
          Un premier échange suffit souvent pour clarifier votre besoin et
          déterminer la meilleure direction pour votre projet.
        </p>

        <a
          href="https://wa.me/33667727557"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-9 inline-flex items-center overflow-hidden rounded-full border border-[#C154F7]/35 bg-gradient-to-br from-[#C154F7]/20 to-[#6A00FF]/10 p-1.5 shadow-[0_20px_60px_rgba(106,0,255,0.18),inset_0_1px_0_rgba(255,255,255,0.13)] transition duration-300 hover:-translate-y-1 hover:border-[#DBA6FF]/60 hover:shadow-[0_27px_75px_rgba(106,0,255,0.3)]"
        >
          <span className="contact-button-shine absolute -top-full h-[300%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <span className="relative z-10 flex items-center gap-4 pl-4 text-sm font-semibold">
            Discuter sur WhatsApp

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#160423] transition group-hover:rotate-45">
              <FaWhatsapp />
            </span>
          </span>
        </a>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background: #05020a;
        }

        body {
          margin: 0;
          background: #05020a;
        }

        .contact-stage {
          --mouse-x: 50%;
          --mouse-y: 30%;
          --scene-x: 0px;
          --scene-y: 0px;

          isolation: isolate;

          background:
            radial-gradient(
              circle at 72% 18%,
              rgba(106, 0, 255, 0.14),
              transparent 31%
            ),
            radial-gradient(
              circle at 8% 44%,
              rgba(193, 84, 247, 0.08),
              transparent 27%
            ),
            linear-gradient(
              145deg,
              #040107 0%,
              #08020e 46%,
              #030105 100%
            );
        }

        .contact-cursor-glow {
          background: radial-gradient(
            circle 460px at var(--mouse-x) var(--mouse-y),
            rgba(145, 45, 255, 0.17),
            rgba(193, 84, 247, 0.04) 40%,
            transparent 72%
          );

          transition: background 120ms linear;
        }

        .contact-aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(120px);
          opacity: 0.27;
          will-change: transform;
        }

        .contact-aurora-one {
          top: -8%;
          right: -7%;
          width: 660px;
          height: 520px;
          background: rgba(106, 0, 255, 0.5);
          animation: contactAuroraOne 17s ease-in-out infinite alternate;
        }

        .contact-aurora-two {
          top: 38%;
          left: -14%;
          width: 620px;
          height: 650px;
          background: rgba(193, 84, 247, 0.23);
          animation: contactAuroraTwo 21s ease-in-out infinite alternate;
        }

        .contact-aurora-three {
          bottom: -18%;
          right: 8%;
          width: 550px;
          height: 580px;
          background: rgba(76, 42, 226, 0.2);
          animation: contactAuroraThree 19s ease-in-out infinite alternate;
        }

        .contact-grid {
          opacity: 0.16;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );

          background-size: 115px 115px;

          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 88%
          );

          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 88%
          );
        }

        .contact-perspective-grid {
          position: absolute;
          top: -20px;
          left: 50%;
          width: 175%;
          height: 720px;

          transform:
            translateX(-50%)
            perspective(850px)
            rotateX(69deg)
            translateY(-300px);

          transform-origin: center;

          background-image:
            linear-gradient(
              rgba(155, 81, 255, 0.17) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(155, 81, 255, 0.17) 1px,
              transparent 1px
            );

          background-size: 58px 58px;

          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 30%,
            transparent 94%
          );

          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 30%,
            transparent 94%
          );

          animation: contactGridMovement 14s linear infinite;
        }

        .contact-scan-beam {
          position: absolute;
          top: -12%;
          left: 0;
          width: 100%;
          height: 170px;
          opacity: 0.28;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(193, 84, 247, 0.08),
            rgba(193, 84, 247, 0.13),
            transparent
          );

          animation: contactScanBeam 16s linear infinite;
        }

        .contact-particle {
          background: rgba(239, 221, 255, 0.92);

          box-shadow:
            0 0 8px rgba(193, 84, 247, 0.85),
            0 0 18px rgba(106, 0, 255, 0.5);

          animation:
            contactParticleFloat
            var(--duration)
            ease-in-out
            var(--delay)
            infinite;
        }

        .contact-side-label {
          writing-mode: vertical-rl;
        }

        .contact-side-line > span {
          animation: contactSideLine 3s ease-in-out infinite;
        }

        .contact-badge-ping {
          animation: contactBadgePing 2s ease-out infinite;
        }

        .contact-gradient-title {
          color: transparent;

          background: linear-gradient(
            90deg,
            #ffffff,
            #eed7ff 35%,
            #c154f7 69%,
            #8168ff
          );

          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;

          animation: contactTitleGradient 8s linear infinite;
        }

        .contact-button-shine {
          left: -40%;
          animation: contactButtonShine 4.8s ease-in-out infinite;
        }

        .contact-visual-parallax {
          transform: translate3d(
            var(--scene-x),
            var(--scene-y),
            0
          );

          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-mini-aura {
          background: radial-gradient(
            circle,
            rgba(193, 84, 247, 0.22),
            rgba(106, 0, 255, 0.05) 48%,
            transparent 72%
          );

          filter: blur(20px);
          animation: contactMiniAura 5s ease-in-out infinite;
        }

        .contact-mini-orbit {
          transform: translate(-50%, -50%);
        }

        .contact-mini-orbit-one {
          animation: contactMiniOrbitOne 17s linear infinite;
        }

        .contact-mini-orbit-two {
          animation: contactMiniOrbitTwo 13s linear infinite reverse;
        }

        .contact-message-core {
          background:
            radial-gradient(
              circle at 35% 25%,
              rgba(255, 255, 255, 0.1),
              transparent 35%
            ),
            radial-gradient(
              circle,
              rgba(37, 7, 61, 0.98),
              rgba(7, 2, 13, 1)
            );

          box-shadow:
            0 0 65px rgba(106, 0, 255, 0.25),
            0 24px 60px rgba(0, 0, 0, 0.4);

          animation: contactCoreFloat 5s ease-in-out infinite;
        }

        .contact-code-chip {
          animation: contactChipOne 6s ease-in-out infinite;
        }

        .contact-zap-chip {
          animation: contactChipTwo 7s -2s ease-in-out infinite;
        }

        .contact-form-shell::before {
          content: "";
          position: absolute;
          top: -150%;
          left: -30%;
          z-index: 5;
          width: 20%;
          height: 400%;
          transform: rotate(22deg);
          pointer-events: none;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.045),
            transparent
          );

          animation: contactFormReflection 9s ease-in-out infinite;
        }

        .contact-notification {
          animation: contactNotification 450ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-footer-orbit {
          animation: contactFooterOrbit 10s linear infinite;
        }

        @keyframes contactAuroraOne {
          from {
            transform:
              translate3d(-40px, -30px, 0)
              rotate(-8deg)
              scale(0.95);
          }

          to {
            transform:
              translate3d(80px, 70px, 0)
              rotate(12deg)
              scale(1.13);
          }
        }

        @keyframes contactAuroraTwo {
          from {
            transform: translate3d(-50px, 30px, 0) scale(1);
          }

          to {
            transform: translate3d(100px, -70px, 0) scale(1.2);
          }
        }

        @keyframes contactAuroraThree {
          from {
            transform: translate3d(40px, -70px, 0);
          }

          to {
            transform: translate3d(-80px, 80px, 0) scale(1.16);
          }
        }

        @keyframes contactGridMovement {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 58px;
          }
        }

        @keyframes contactScanBeam {
          from {
            transform: translateY(-20vh);
          }

          to {
            transform: translateY(300vh);
          }
        }

        @keyframes contactParticleFloat {
          0%,
          100% {
            opacity: 0.14;
            transform: translate3d(0, 0, 0) scale(0.75);
          }

          45% {
            opacity: 0.9;
          }

          50% {
            transform:
              translate3d(
                var(--drift-x),
                var(--drift-y),
                0
              )
              scale(1.3);
          }
        }

        @keyframes contactSideLine {
          from {
            top: -45%;
          }

          to {
            top: 115%;
          }
        }

        @keyframes contactBadgePing {
          from {
            opacity: 0.7;
            transform: scale(1);
          }

          to {
            opacity: 0;
            transform: scale(2.8);
          }
        }

        @keyframes contactTitleGradient {
          to {
            background-position: 200% center;
          }
        }

        @keyframes contactButtonShine {
          0%,
          55% {
            left: -40%;
          }

          80%,
          100% {
            left: 125%;
          }
        }

        @keyframes contactMiniAura {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(0.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes contactMiniOrbitOne {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes contactMiniOrbitTwo {
          from {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotate(360deg);
          }
        }

        @keyframes contactCoreFloat {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              translateY(-5px);
          }

          50% {
            transform:
              translate(-50%, -50%)
              translateY(7px);
          }
        }

        @keyframes contactChipOne {
          0%,
          100% {
            transform: translate3d(-3px, -5px, 0) rotate(-1deg);
          }

          50% {
            transform: translate3d(8px, 7px, 0) rotate(1deg);
          }
        }

        @keyframes contactChipTwo {
          0%,
          100% {
            transform: translate3d(3px, 5px, 0) rotate(1deg);
          }

          50% {
            transform: translate3d(-8px, -7px, 0) rotate(-1deg);
          }
        }

        @keyframes contactFormReflection {
          0%,
          58% {
            left: -30%;
          }

          78%,
          100% {
            left: 130%;
          }
        }

        @keyframes contactNotification {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contactFooterOrbit {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }

          .contact-visual-parallax {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}

function Field({
  id,
  label,
  hint,
  Icon,
  required = false,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 flex items-center justify-between gap-3"
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/75">
          <Icon
            className="text-[#D8A6FF]"
            size={16}
            aria-hidden="true"
          />

          {label}

          {required && (
            <span className="text-[#C154F7]">
              *
            </span>
          )}
        </span>

        {hint && (
          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/20">
            {hint}
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function ContactMethod({
  Icon,
  label,
  value,
  href,
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C154F7]/20 bg-[#C154F7]/10 text-lg text-[#D9A9FF]">
        <Icon />
      </span>

      <span className="min-w-0">
        <span className="block text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
          {label}
        </span>

        <strong className="mt-1 block break-words text-[10px] font-medium leading-4 text-white/70">
          {value}
        </strong>
      </span>

      {href && (
        <FiArrowUpRight className="ml-auto shrink-0 text-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
      )}
    </>
  );

  const className = [
    "group flex min-w-0 items-center gap-3 rounded-2xl",
    "border border-white/[0.07] bg-white/[0.025] p-3",
    "backdrop-blur-xl transition duration-300",
    href
      ? "hover:-translate-y-1 hover:border-[#C154F7]/25 hover:bg-[#C154F7]/[0.07]"
      : "",
  ].join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}

function FormAdvantage({
  Icon,
  title,
  text,
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C154F7]/15 bg-[#C154F7]/[0.07] text-sm text-[#D6A4FA]">
        <Icon />
      </span>

      <span>
        <strong className="block text-[9px] font-semibold text-white/65">
          {title}
        </strong>

        <span className="mt-0.5 block text-[7px] text-white/25">
          {text}
        </span>
      </span>
    </div>
  );
}