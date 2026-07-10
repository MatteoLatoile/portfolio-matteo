"use client";

import Link from "next/link";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FiArrowUpRight,
  FiMail,
} from "react-icons/fi";

import { SiMalt } from "react-icons/si";

const socialLinks = [
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
    label: "WhatsApp",
    href: "https://wa.me/33667727557",
    Icon: FaWhatsapp,
  },
  {
    label: "Malt",
    href: "https://www.malt.fr/profile/matteopadalino",
    Icon: SiMalt,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08020E] text-white">
      {/* Décoration légère */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#6A00FF]/15 blur-[100px]" />

        <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-[#C154F7]/10 blur-[110px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C154F7]/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        {/* Partie principale */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
                Mattéo
                <span className="text-white/45"> Padalino.</span>
              </h2>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
              Développeur full-stack, je conçois des sites et applications
              modernes, performants et pensés dans les moindres détails.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium transition hover:border-[#C154F7]/40 hover:bg-[#C154F7]/10"
            >
              Me contacter

              <FiArrowUpRight className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <div className="flex gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white/65 transition duration-300 hover:-translate-y-1 hover:border-[#C154F7]/35 hover:bg-[#C154F7]/10 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Séparation */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Partie basse */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-xs text-white/30">
            © {currentYear} Mattéo Padalino. Tous droits réservés.
          </p>

          <a
            href="mailto:matteo.padalinoba@gmail.com"
            className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-white"
          >
            <FiMail />

            matteo.padalinoba@gmail.com
          </a>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-white/35 transition hover:text-white"
          >
            Retour en haut

            <FiArrowUpRight className="-rotate-45 transition group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}