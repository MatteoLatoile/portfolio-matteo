"use client";

import Image from "next/image";
import BtnGlass from "../../component/BtnGlass";
import Ellipse from "../../public/icons/ellipse-2.svg";
// ⬇️ REMPLACÉ: on vire les imports d’images pour ces 3 icônes
// import Github from "../../public/icons/icon_git.svg";
// import Linkedin from "../../public/icons/icon_linkedin.svg";
// import Whatsapp from "../../public/icons/icon_wat.svg";
import Malt from "../../public/icons/icon_malt.svg";

// React Icons (Font Awesome)
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import IntroBurst from "../../component/IntroBurst";

export default function Home() {
  return (
    <div className="relative min-h-screen pb-20 p-4 body-page flex items-center justify-center">
      <IntroBurst />
      {/* Image en arrière-plan */}
      <Image
        className="absolute md:top-9 md:left-2/12 inset-0 z-0"
        src={Ellipse}
        alt=""
      />

      {/* Contenu texte */}
      <div className="relative md:w-1/2 z-10 md:m-auto">
        <h1 className="text-7xl leading-[60px] mt-[100px] tracking-[-0.06em] mb-7 text-white font-medium md:text-8xl md:leading-[80px]">
          Mattéo. <br /> Full Stack. <br /> Full Control.
        </h1>
        <p className="text-[#B0A9C2] tracking-[-0.06em]">
          Développeur <strong>full stack</strong>, je conçois des{" "}
          <strong>applications</strong> complètes — du <strong>back-end</strong>{" "}
          solide à l’
          <strong>interface</strong> raffinée.
        </p>

        <div className="md:flex md:gap-8 md:items-center">
          <BtnGlass href="/projets" text="Découvrir mes projets" />
          <div className="flex gap-10 mt-7">
            {/* WhatsApp */}
            <a
              href="https://wa.me/33667727557"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110 hover:opacity-80"
            >
              <FaWhatsapp className="w-[44px] h-[44px] md:w-[24px] md:h-[24px] text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mattdev-padalino"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110 hover:opacity-80"
            >
              <FaLinkedinIn className="w-[44px] h-[44px] md:w-[24px] md:h-[24px] text-white" />
            </a>

            {/* Malt */}
            <a
              href="https://www.malt.fr/profile/matteopadalino"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110 hover:opacity-80"
            >
              <Image
                src={Malt}
                alt="Profil Malt"
                width={44}
                height={44}
                className="w-[44px] h-[44px] md:w-[24px] md:h-[24px]"
              />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/MatteoLatoile"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110 hover:opacity-80"
            >
              <FaGithub className="w-[44px] h-[44px] md:w-[24px] md:h-[24px] text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
