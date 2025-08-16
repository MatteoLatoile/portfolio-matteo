"use client";

import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiMalt } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#2a003f] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-6">
        {/* Nom */}
        <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          Matteo PADALINO
        </h3>

        {/* Réseaux sociaux */}
        <div className="flex gap-5 text-white">
          <a
            href="https://www.linkedin.com/in/mattdev-padalino"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://github.com/MatteoLatoile"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://wa.me/33667727557"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://www.malt.fr/profile/matteopadalino"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <SiMalt size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center">
        <p className="text-white opacity-50 text-sm">
          © 2025 Mattéo. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
