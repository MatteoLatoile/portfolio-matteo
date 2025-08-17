"use client";

import Image from "next/image";
// React Icons (blanc)
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SiMalt } from "react-icons/si";
import Mockup from "../../../public/icons/mockup.webp";

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
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="reveal delay-0 text-3xl md:text-6xl tracking-tighter pt-20 font-semibold text-white">
          03. A&nbsp;propos
        </h3>
        <p className="reveal delay-100 mt-2 text-sm md:text-base tracking-tighter text-[#B0A9C2]">
          Un peu de contexte, un peu de parcours, et ce qui me définit dans mon
          travail.
        </p>
      </div>

      {/* BENTO — 4 BOÎTES */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-8 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1) Intro (8 cols) */}
          <Card className="reveal delay-0 md:col-span-8 min-h-[320px]">
            <h4 className="text-4xl md:text-5xl font-semibold text-white/90 tracking-tight">
              <span className="opacity-90 tracking-tighter">Mattéo</span>
              <span className="opacity-60 tracking-tighter"> PADALINO</span>
            </h4>
            <p className="mt-4 text-sm md:text-base tracking-tighter text-[#EDE9F7]/80 leading-relaxed">
              Développeur Fullstack et intégrateur, je conçois des applications
              robustes, performantes et élégantes.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 hover:bg-white/20 transition"
            >
              Me contacter <span>➜</span>
            </a>
          </Card>

          {/* 2) Me concernant */}
          <Card className="reveal delay-100 md:col-span-4 md:row-span-2">
            <h5 className="text-white text-xl font-semibold">Me concernant,</h5>
            <p className="mt-3 text-sm tracking-tighter text-[#EDE9F7]/80 leading-relaxed">
              Créatif, polyvalent, organisé. Mon objectif : faire avancer les
              projets efficacement.
            </p>

            <div className="mt-5">
              <p className="text-white/90 font-medium">Hardskills</p>
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
              <p className="text-white/90 font-medium">Softskills</p>
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

          {/* 3) Contact */}
          <Card className="reveal delay-200 md:col-span-4 min-h-[220px]">
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
                label="Localisation"
                value="Saint-Étienne"
              />
            </div>
          </Card>

          {/* 4) Voir aussi */}
          <Card className="reveal delay-300 md:col-span-4 min-h-[220px]">
            <p className="text-white/90 font-medium mb-4">Voir aussi</p>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/33667727557" target="_blank">
                <FaWhatsapp
                  size={24}
                  className="text-white opacity-90 hover:opacity-100 transition"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/mattdev-padalino"
                target="_blank"
              >
                <FaLinkedinIn
                  size={24}
                  className="text-white opacity-90 hover:opacity-100 transition"
                />
              </a>
              <a href="https://github.com/MatteoLatoile" target="_blank">
                <FaGithub
                  size={24}
                  className="text-white opacity-90 hover:opacity-100 transition"
                />
              </a>
              <a
                href="https://www.malt.fr/profile/matteopadalino"
                target="_blank"
              >
                <SiMalt
                  size={24}
                  className="text-white opacity-90 hover:opacity-100 transition"
                />
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Profil Malt */}
      <section className="px-4 md:mt-40 md:px-20">
        <h3 className="reveal delay-0 text-3xl md:text-4xl mt-20 mb-20 font-semibold text-white">
          Mon profil Malt
        </h3>

        <div className="relative h-[1700px]">
          <p className="reveal delay-100 absolute top-80 md:top-0 md:w-1/3 text-[#B0A9C2]">
            <span className="bold text-white text-2xl">Malt, c’est quoi ?</span>
            <br />
            <br />
            Malt est une plateforme française qui connecte les freelances avec
            les entreprises en quête de compétences spécifiques. Elle facilite
            les collaborations en mettant à disposition un espace sécurisé pour
            publier des missions, gérer les contrats, et effectuer les
            paiements. Plus de 500 000 freelances y sont inscrits, ce qui en
            fait un acteur majeur du freelancing en Europe.
          </p>

          <p className="reveal delay-200 absolute top-[700px] md:top-[500px] md:left-[700px] md:w-1/3 text-[#B0A9C2]">
            <span className="bold text-white text-2xl">
              Pourquoi passer par Malt ?
            </span>
            <br />
            <br />
            Passer par Malt, c’est bénéficier d’un cadre professionnel clair.
            Toutes les missions sont encadrées par un contrat numérique, le
            paiement est sécurisé via un système d’entiercement, et vous
            bénéficiez d’une assurance en cas de problème. En tant que
            freelance, je suis noté à la fin de chaque mission, ce qui crée une
            vraie dynamique de confiance et de transparence.
          </p>

          <p className="reveal delay-300 absolute top-3/4 md:top-[1000px] md:w-1/3 text-[#B0A9C2]">
            <span className="bold text-white text-2xl">
              Un cadre pro, une collaboration fluide
            </span>
            <br />
            <br />
            En utilisant Malt, vous éliminez les frictions habituelles : pas
            besoin de gérer la paperasse, les devis, ou les relances de
            paiement. Tout est centralisé sur la plateforme. Résultat : vous
            gagnez du temps, vous évitez les erreurs, et vous vous concentrez
            sur l’essentiel — faire avancer votre projet. C’est une
            collaboration simple, rapide et efficace.
          </p>

          <div className="sticky top-20 z-10 w-full">
            <Image
              src={Mockup}
              alt="Mockup téléphone"
              width={360}
              height={740}
              className="block mx-auto w-[140px] sm:w-[180px] md:w-[200px] lg:w-[220px] animate-float-slow"
              unoptimized
            />
          </div>
        </div>

        <div className="reveal delay-200 mt-20 flex justify-center">
          <a
            href="https://www.malt.fr/profile/matteopadalino"
            target="_blank"
            rel="noopener"
            className="group bg-white mb-7 text-black px-14 md:px-10 py-4 md:py-4 
             rounded-full font-medium text-sm hover:bg-purple-100 transition-colors 
             inline-flex items-center gap-3"
          >
            Voir mon profil Malt
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ➜
            </span>
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
        "rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/5 " +
        "p-6 md:p-8 flex flex-col " +
        className
      }
    >
      {children}
    </div>
  );
}

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
