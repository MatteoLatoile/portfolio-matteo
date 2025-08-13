"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../public/icons/Logo.svg";
import Open from "../public/icons/icon_see.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" px-6 py-4 fixed z-50 backdrop-blur-2xl top-0 w-full flex items-center justify-between">
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
        className={`fixed inset-0 flex flex-col items-center justify-center space-y-8 text-[#fff] md:text-[#B0A9C2] bg-[#2A003F] transform transition-transform duration-300 md:static md:flex-row md:space-y-0 md:space-x-8 md:bg-transparent ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Link
          href="/"
          className="hover:text-white  tracking-[-6%] transition-colors text-6xl md:text-[16px]"
          onClick={() => setIsOpen(false)}
        >
          01. Accueil
        </Link>
        <Link
          href="/projets"
          className="hover:text-white tracking-[-6%] transition-colors text-6xl md:text-[16px]"
          onClick={() => setIsOpen(false)}
        >
          02. Projets
        </Link>
        <Link
          href="/about"
          className="hover:text-white tracking-[-6%] transition-colors text-6xl md:text-[16px]"
          onClick={() => setIsOpen(false)}
        >
          03. About
        </Link>
        <Link
          href="/contact"
          className="hover:text-white tracking-[-6%] transition-colors text-6xl md:text-[16px]"
          onClick={() => setIsOpen(false)}
        >
          04. Contact
        </Link>

        {/* CV Button */}
        <button
          className="bg-white cursor-pointer text-black px-12 tracking-[-6%] py-4 rounded-full mt-3 font-medium text-sm hover:bg-purple-100 transition-colors flex items-center space-x-2 md:mt-0 "
          onClick={() => setIsOpen(false)}
        >
          <span>Voir mon CV</span>
          <Image src={Open} alt="Ouvrir" width={16} height={16} />
        </button>
      </div>
    </nav>
  );
}
