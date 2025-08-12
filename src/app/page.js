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

export default function Home() {
  return (
    <div className="relative min-h-screen pb-20 p-4 body-page flex items-center justify-center">
      {/* Image en arrière-plan */}
      <Image
        className="absolute md:top-9 md:left-2/12 inset-0 z-0"
        src={Ellipse}
        alt=""
      />

      {/* Contenu texte */}
      <div className="relative md:w-1/2 z-10 md:m-auto">
        <h1 className="text-7xl leading-[60px] mt-[100px] tracking-[-0.06em] mb-7 text-white font-medium md:text-9xl md:leading-[100px]">
          Mattéo. <br /> Full Stack. <br /> Full Control.
        </h1>
        <p className="text-[#B0A9C2] tracking-[-0.06em]">
          Développeur full stack, je conçois des applications complètes — du
          back-end solide à l’interface raffinée.
        </p>

        <div className="md:flex md:gap-8 md:items-center">
          <BtnGlass href="/projets" text="Découvrir mes projets" />
          <div className="flex gap-10 mt-7">
            {/* ⬇️ Icônes remplacées par React Icons, classes INCHANGÉES */}
            <FaWhatsapp className="w-[44px] text-white h-[44px] md:w-[24px] md:h-[24px]" />
            <FaLinkedinIn className="w-[44px] text-white h-[44px] md:w-[24px] md:h-[24px]" />
            <Image
              src={Malt}
              alt=""
              className="w-[44px] h-[44px] text-white md:w-[24px] md:h-[24px]"
            />
            <FaGithub className="w-[44px] text-white h-[44px] md:w-[24px] md:h-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
