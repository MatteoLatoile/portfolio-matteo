// app/about/page.jsx
import Image from "next/image";
import BtnGlass from "../../../component/BtnGlass";
import Mockup from "../../../public/icons/mockup.webp";

// React Icons (blanc)
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SiMalt } from "react-icons/si";

const hard = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "Node.js",
  "Express",
  "Git",
  "MongoDB",
  "Figma",
  "Next.js",
  "React",
  "TailwindCSS",
  "Bootstrap",
];
const soft = [
  "Créativité",
  "Autonomie",
  "Résilience",
  "Écoute active",
  "Minutie",
];

export default function AboutPage() {
  return (
    <div className="body-page">
      {/* Header */}
      <div className="max-w-6xl mx-auto  px-4 md:px-6">
        <h3 className="text-3xl tracking-[-6%] md:text-4xl pt-20 font-semibold text-white">
          03. A&nbsp;propos
        </h3>
        <p className="mt-2 text-sm md:text-base [content-visibility:auto] [contain-intrinsic-size:1px_600px] text-[#B0A9C2]">
          Un peu de contexte, un peu de parcours, et ce qui me définit dans mon
          travail.
        </p>
      </div>

      {/* BENTO — 4 BOÎTES */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-8 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1) Intro (8 cols) */}
          <Card className="md:col-span-8 min-h-[320px]">
            <h4 className="text-4xl md:text-5xl font-semibold text-white/90 tracking-tight">
              <span className="opacity-90">Mattéo</span>
              <span className="opacity-60"> PADALINO</span>
            </h4>
            <p className="mt-4 text-sm md:text-base [content-visibility:auto] [contain-intrinsic-size:1px_600px] text-[#EDE9F7]/80 leading-relaxed">
              Développeur Fullstack et intégrateur, je conçois des applications
              robustes, performantes et élégantes.
            </p>
            <BtnGlass href="/contact" text="Me contacter" />
          </Card>

          {/* 2) Me concernant (4 cols, SPAN 2 ROWS à droite) */}
          <Card className="md:col-span-4 md:row-span-2">
            <h5 className="text-white text-xl font-semibold">Me concernant,</h5>
            <p className="mt-3 text-sm [content-visibility:auto] [contain-intrinsic-size:1px_600px] text-[#EDE9F7]/80 leading-relaxed">
              Créatif, polyvalent, organisé. Mon objectif : faire avancer les
              projets efficacement.
            </p>

            <div className="mt-5">
              <p className="text-white/90 [content-visibility:auto] [contain-intrinsic-size:1px_600px] font-medium">
                Hardskills
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {hard.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-white/90 [content-visibility:auto] [contain-intrinsic-size:1px_600px] font-medium">
                Softskills
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {soft.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* 3) Contact (4 cols) — rangée 2, gauche */}
          <Card className="md:col-span-4 min-h-[220px]">
            <div className="space-y-4">
              <ContactRow
                Icon={FiMail}
                label="E-mail"
                value="matteo.padalinoba@gmail.com"
              />
              <ContactRow
                Icon={FiPhone}
                label="Téléphone"
                value="06.67.72.75.57"
              />
              <ContactRow
                Icon={FiMapPin}
                label="Entreprise"
                value="Saint-Étienne"
              />
            </div>
          </Card>

          {/* 4) Voir aussi (4 cols) — rangée 2, centre */}
          <Card className="md:col-span-4 min-h-[220px]">
            <p className="text-white/90 [content-visibility:auto] [contain-intrinsic-size:1px_600px] font-medium mb-4">
              Voir aussi
            </p>
            <div className="flex items-center gap-6">
              <FaWhatsapp
                size={24}
                className="text-white opacity-90 hover:opacity-100 transition"
                aria-hidden
              />
              <FaLinkedinIn
                size={24}
                className="text-white opacity-90 hover:opacity-100 transition"
                aria-hidden
              />
              <FaGithub
                size={24}
                className="text-white opacity-90 hover:opacity-100 transition"
                aria-hidden
              />
              <SiMalt
                size={24}
                className="text-white opacity-90 hover:opacity-100 transition"
                aria-hidden
              />
            </div>
          </Card>
        </div>
      </section>

      {/* section mon profil malt */}
      <section className="px-4 md:mt-40 md:px-20">
        <h3 className="text-3xl tracking-[-6%] md:text-4xl mt-20 mb-20 font-semibold text-white">
          Mon profil Malt
        </h3>
        <div className="relative h-[1700px]">
          <p className="absolute tracking-[-6%] [content-visibility:auto] [contain-intrinsic-size:1px_600px] top-0 w-1/3 text-[#B0A9C2]">
            <span className="bold text-white tracking-[-6%] text-2xl">
              Malt, c’est quoi ?
            </span>{" "}
            <br />
            <br /> Malt est une plateforme qui connecte les freelances aux
            entreprises, de manière simple, transparente et sécurisée. Elle
            permet de collaborer efficacement sur des missions variées, en toute
            confiance, grâce à un cadre professionnel pensé pour les
            indépendants et les clients.
          </p>
          <p className="absolute tracking-[-6%] [content-visibility:auto] [contain-intrinsic-size:1px_600px] md:top-[500px] md:left-[700px] w-1/3 text-[#B0A9C2]">
            <span className="bold text-white tracking-[-6%] text-2xl">
              Pourquoi passer par Malt ?
            </span>{" "}
            <br />
            <br />
            ravailler via Malt, c’est bénéficier d’un système clair : contrat,
            paiement sécurisé, assurance, et historique des missions. Vous avez
            accès aux avis de mes précédents clients, à mes tarifs, à mes
            compétences détaillées, et vous pouvez lancer une mission en
            quelques clics, sans friction administrative.
          </p>
          <p className="absolute [content-visibility:auto] [contain-intrinsic-size:1px_600px] tracking-[-6%] top-[1000px] w-1/3 text-[#B0A9C2]">
            <span className="bold text-white tracking-[-6%] text-2xl">
              Un cadre pro, une collaboration fluide
            </span>{" "}
            <br />
            <br /> En passant par Malt, vous vous assurez une collaboration
            cadrée, rapide à mettre en place, avec la garantie d’un
            accompagnement sérieux. C’est la manière la plus simple de lancer
            une mission avec moi, tout en gardant un suivi clair du projet.
          </p>
          {/* phone sticky — centré + taille maîtrisée */}
          <div className="sticky top-20 z-10 w-full">
            <Image
              src={Mockup}
              alt=""
              width={360}
              height={740}
              sizes="140px, (min-width:640px) 180px, (min-width:768px) 200px, (min-width:1024px) 220px"
              className="block mx-auto h-auto w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
            />
          </div>
        </div>
        <div className="mt-20 flex justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="bg-white tracking-[-6%] text-black px-8 md:px-10 py-3 md:py-4 rounded-full font-medium text-sm hover:bg-purple-100 transition-colors inline-flex items-center gap-2"
          >
            Voir mon profil Malt
            <SiMalt size={20} className="text-2xl text-white" aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}

/* UI helpers */
function Card({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white" +
        "p-6 md:p-8 flex flex-col " +
        className
      }
    >
      {children}
    </div>
  );
}

// prend un composant d’icône React, blanc, taille 20
function ContactRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={20} className="mt-0.5 text-white opacity-90" aria-hidden />
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm text-white/90">{value}</p>
      </div>
    </div>
  );
}
