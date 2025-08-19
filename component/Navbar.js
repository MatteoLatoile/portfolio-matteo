"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../public/icons/Logo.svg";
import Open from "../public/icons/icon_see.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Bloque le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const linkClass = (path) =>
    `tracking-[-6%] transition-colors text-2xl md:text-[14px] ${
      pathname === path ? "text-white" : "text-[#B0A9C2] hover:text-white"
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      {/* Fond du header pour garantir le contraste du burger sur mobile */}
      <div
        className="mx-auto px-6 py-3 flex items-center justify-between border-b border-white/10
                      bg-[#0B0013]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0B0013]/40"
      >
        {/* Logo */}
        <div className="flex items-center z-[60]">
          <Image src={Logo} alt="Logo" width={24} height={24} />
        </div>

        {/* Bouton burger */}
        <button
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((s) => !s)}
          className="md:hidden relative z-[60] h-10 w-10 grid place-items-center rounded-lg
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          {/* Icône burger en 3 barres absolument positionnées */}
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-6 rounded bg-white transition-transform duration-300
                         ${isOpen ? "translate-y-[9px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-6 -translate-y-1/2 rounded bg-white transition-opacity duration-300
                         ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-[2px] w-6 rounded bg-white transition-transform duration-300
                         ${isOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
            />
          </span>
        </button>

        {/* Liens desktop */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/" className={linkClass("/")}>
            01. Accueil
          </Link>
          <Link href="/projets" className={linkClass("/projets")}>
            02. Projets
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            03. About
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            04. Contact
          </Link>
          <a
            href="/cv_matteo_padalino_stage.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white cursor-pointer text-black px-6 py-2 rounded-full font-medium text-[14px]
                       hover:bg-purple-100 transition-colors inline-flex items-center gap-2"
          >
            <span>Voir mon CV</span>
            <Image src={Open} alt="Ouvrir" width={16} height={16} />
          </a>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 pt-24
                    bg-[#2A003F] transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:hidden`}
        // évite de capter les clics quand fermé
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
      >
        <Link href="/" className={linkClass("/")}>
          01. Accueil
        </Link>
        <Link href="/projets" className={linkClass("/projets")}>
          02. Projets
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          03. About
        </Link>
        <Link href="/contact" className={linkClass("/contact")}>
          04. Contact
        </Link>
        <a
          href="/cv_matteo_padalino_stage.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white cursor-pointer text-black md:px-16 tracking-[-6%] md:py-8 rounded-full font-medium text-[14px]
                     hover:bg-purple-100 transition-colors inline-flex items-center gap-2"
        >
          <span>Voir mon CV</span>
          <Image src={Open} alt="Ouvrir" width={16} height={16} />
        </a>
      </div>
    </nav>
  );
}
