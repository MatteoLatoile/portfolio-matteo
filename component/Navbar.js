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
  }, [isOpen]);

  // Classe dynamique pour les liens
  const linkClass = (path) =>
    `tracking-[-6%] transition-colors text-2xl md:text-[14px] ${
      pathname === path ? "text-white" : "text-[#B0A9C2] hover:text-white"
    }`;

  return (
    <nav
      style={{
        borderBottom: "4px solid transparent",
        borderImage:
          "linear-gradient(80deg,rgba(255, 255, 255, 0.55) 18%, rgba(193, 84, 247, 0.61) 50%, rgba(255, 255, 255, 1) 87%",
        padding: "10px",
      }}
      className="px-6 py-3 fixed z-50 backdrop-blur-2xl top-0 w-full flex items-center justify-between"
    >
      {/* Logo */}
      <div className="flex items-center z-50">
        <Image src={Logo} alt="Logo" width={24} height={24} />
      </div>

      {/* Menu burger (mobile) */}
      <button
        className="md:hidden flex flex-col justify-between w-6 h-5 z-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`block h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Navigation Links */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center space-y-8 pt-24 bg-[#2A003F] 
        md:space-y-0 md:space-x-8 md:flex-row md:static md:bg-transparent md:pt-0 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Link
          href="/"
          className={linkClass("/")}
          onClick={() => setIsOpen(false)}
        >
          01. Accueil
        </Link>
        <Link
          href="/projets"
          className={linkClass("/projets")}
          onClick={() => setIsOpen(false)}
        >
          02. Projets
        </Link>
        <Link
          href="/about"
          className={linkClass("/about")}
          onClick={() => setIsOpen(false)}
        >
          03. About
        </Link>
        <Link
          href="/contact"
          className={linkClass("/contact")}
          onClick={() => setIsOpen(false)}
        >
          04. Contact
        </Link>

        {/* CV Button */}
        <a
          href="/cv_matteo_padalino_stage.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white cursor-pointer text-black px-12 tracking-[-6%] py-4 rounded-full mt-3 font-medium text-[14px] hover:bg-purple-100 transition-colors flex items-center space-x-2 md:mt-0"
          onClick={() => setIsOpen(false)}
        >
          <span>Voir mon CV</span>
          <Image src={Open} alt="Ouvrir" width={16} height={16} />
        </a>
      </div>
    </nav>
  );
}
