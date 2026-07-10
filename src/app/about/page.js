"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTerminal,
  FiUser,
  FiZap,
} from "react-icons/fi";

import { SiMalt } from "react-icons/si";

import Mockup from "../../../public/icons/mockup.webp";

const HARD_SKILLS = [
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
  "Tailwind CSS",
  "Bootstrap",
];

const SOFT_SKILLS = [
  "Créativité",
  "Autonomie",
  "Résilience",
  "Écoute active",
  "Minutie",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Comprendre",
    description:
      "Analyser le besoin, les objectifs et les contraintes afin de construire une vision claire avant de commencer.",
  },
  {
    number: "02",
    title: "Concevoir",
    description:
      "Transformer les idées en interfaces cohérentes, intuitives et alignées avec l’identité du projet.",
  },
  {
    number: "03",
    title: "Développer",
    description:
      "Créer une architecture solide et des fonctionnalités utiles, performantes et maintenables.",
  },
  {
    number: "04",
    title: "Optimiser",
    description:
      "Améliorer les performances, les détails et l’expérience pour obtenir un produit réellement durable.",
  },
];

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

/*
 * Valeurs déterministes pour éviter les erreurs
 * d’hydratation provoquées par Math.random().
 */
const PARTICLES = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 61 + 5) % 98}%`,
  size: 1 + (index % 3),
  duration: 9 + (index % 8) * 1.35,
  delay: -(index % 13) * 0.7,
  driftX: -35 + (index % 8) * 10,
  driftY: -25 - (index % 6) * 9,
}));

export default function AboutPage() {
  const stageRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

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
        `${normalizedX * 13}px`
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
    stage.style.setProperty("--mouse-y", "20%");
    stage.style.setProperty("--scene-x", "0px");
    stage.style.setProperty("--scene-y", "0px");
  };

  return (
    <main
      ref={stageRef}
      className="about-stage relative min-h-screen overflow-hidden bg-[#05020A] text-white"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
    >
      {/* Arrière-plan */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="about-cursor-glow absolute inset-0" />

        <div className="about-aurora about-aurora-one" />
        <div className="about-aurora about-aurora-two" />
        <div className="about-aurora about-aurora-three" />

        <div className="about-grid absolute inset-0" />
        <div className="about-perspective-grid" />
        <div className="about-scan-beam" />

        <div className="absolute inset-0">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="about-particle absolute block rounded-full"
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

        <div className="absolute inset-0 shadow-[inset_0_0_220px_65px_rgba(0,0,0,0.5)]" />
      </div>

      {/* Indication latérale */}
      <div
        className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="about-side-label text-[8px] font-bold uppercase tracking-[0.23em] text-white/20">
          About
        </span>

        <span className="about-side-line relative block h-24 w-px overflow-hidden bg-white/[0.08]">
          <span className="absolute left-0 h-10 w-full bg-gradient-to-b from-transparent via-[#C154F7] to-white" />
        </span>

        <strong className="font-mono text-[10px] font-normal text-white/30">
          03
        </strong>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid min-h-screen w-[calc(100%-28px)] max-w-[1420px] grid-cols-1 items-center gap-4 pb-20 pt-28 md:w-[calc(100%-52px)] lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.9fr)] lg:gap-12 lg:py-28 xl:w-[calc(100%-72px)] xl:gap-20">
        <div className="relative z-10 max-w-[790px]">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#E8D7F8]/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl md:text-[10px]">
            <span className="relative flex h-2 w-2 rounded-full bg-[#C154F7] shadow-[0_0_13px_#C154F7]">
              <span className="about-badge-ping absolute inset-0 rounded-full bg-[#C154F7]" />
            </span>

            À propos / Profil développeur
          </div>

          <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#CFB1EC]/40 md:text-[10px]">
            Développeur full-stack
          </p>

          <h1 className="text-[clamp(3.4rem,15vw,5rem)] font-medium leading-[0.91] tracking-[-0.075em] md:text-[clamp(4rem,9vw,6rem)] xl:text-[7.1rem]">
            Créatif dans
            <span className="block text-[#F1E5FD]/50">
              l’approche.
            </span>

            <span className="mt-2 block">
              Carré dans
            </span>

            <strong className="about-gradient-title block font-medium">
              l’exécution.
            </strong>
          </h1>

          <p className="mt-8 max-w-[680px] text-[15px] leading-7 tracking-[-0.02em] text-[#D9CBE7]/60 md:text-[17px] md:leading-8">
            Je m’appelle{" "}
            <strong className="font-medium text-white/90">
              Mattéo Padalino
            </strong>
            . Je conçois des applications modernes en réunissant
            développement, expérience utilisateur et sens du détail. Mon
            objectif est de transformer une idée en un produit{" "}
            <strong className="font-medium text-white/90">
              solide, élégant et utile
            </strong>
            .
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              href="/contact"
              className="group relative flex w-full items-center overflow-hidden rounded-full border border-[#DAB0FF]/25 bg-gradient-to-br from-[#C154F7]/20 to-[#6A00FF]/10 p-1.5 text-white shadow-[0_17px_50px_rgba(106,0,255,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-1 hover:border-[#DCB0FF]/50 hover:shadow-[0_25px_70px_rgba(106,0,255,0.27)] sm:w-auto"
            >
              <span className="about-button-shine absolute -top-full h-[300%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <span className="relative z-10 flex w-full items-center justify-between gap-4 pl-4 text-sm font-semibold">
                Me contacter

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#160323] transition duration-300 group-hover:rotate-45">
                  <FiArrowUpRight />
                </span>
              </span>
            </a>

            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-white/40">
              <span className="h-2 w-2 rounded-full bg-[#62E6A5] shadow-[0_0_12px_#62E6A5]" />
              Disponible pour de nouveaux projets
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <HeroStat
              value="Full"
              label="Vision du produit"
            />

            <StatDivider />

            <HeroStat
              value="Stack"
              label="Front-end et back-end"
            />

            <StatDivider />

            <HeroStat
              value="100%"
              label="Impliqué"
            />
          </div>
        </div>

        {/* Visuel orbital */}
        <div className="relative min-h-[480px] md:min-h-[620px] lg:min-h-[690px]">
          <div className="about-parallax absolute inset-0">
            <div className="absolute left-1/2 top-1/2 aspect-square w-[min(108vw,520px)] -translate-x-1/2 -translate-y-1/2 md:w-[min(88vw,590px)] lg:w-[min(41vw,630px)]">
              <div className="about-orbital-aura absolute inset-[10%] rounded-full" />

              <div className="about-orbit about-orbit-one absolute inset-[1%] rounded-full border border-[#D9BBFF]/15">
                <span className="about-orbit-node absolute left-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white/90 bg-[#C154F7] shadow-[0_0_12px_#C154F7,0_0_28px_rgba(193,84,247,0.75)]" />
              </div>

              <div className="about-orbit about-orbit-two absolute inset-[14%] rounded-full border border-[#C154F7]/20">
                <span className="about-orbit-node absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-white bg-white shadow-[0_0_12px_white]" />
              </div>

              <div className="about-orbit about-orbit-three absolute inset-[29%] rounded-full border border-[#8B2EFF]/25">
                <span className="about-orbit-node absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#956FFF] shadow-[0_0_12px_#956FFF]" />
              </div>

              <div className="about-diagonal-orbit about-diagonal-one absolute left-1/2 top-1/2 h-[29%] w-[80%] rounded-full border border-[#C154F7]/15" />
              <div className="about-diagonal-orbit about-diagonal-two absolute left-1/2 top-1/2 h-[24%] w-[68%] rounded-full border border-[#C154F7]/15" />

              <div className="about-profile-core absolute left-1/2 top-1/2 h-[185px] w-[185px] -translate-x-1/2 -translate-y-1/2 md:h-[230px] md:w-[230px]">
                <div className="about-core-radiation absolute -inset-[22%] rounded-full border border-[#C154F7]/10" />
                <div className="about-core-radiation about-core-radiation-delay absolute -inset-[22%] rounded-full border border-[#C154F7]/10" />

                <div className="about-core-border absolute inset-0 rounded-full p-px">
                  <div className="about-core-content relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full">
                    <div className="absolute inset-[15%] animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C154F7]/20" />

                    <span className="relative z-10 mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_14px_30px_rgba(0,0,0,0.25)] md:h-12 md:w-12">
                      <FiUser />
                    </span>

                    <span className="relative z-10 text-[6px] font-bold uppercase tracking-[0.18em] text-[#DEC8F4]/40 md:text-[7px]">
                      Developer profile
                    </span>

                    <strong className="relative z-10 mt-1 text-3xl font-medium tracking-[-0.07em] md:text-4xl">
                      MP
                    </strong>

                    <span className="relative z-10 mt-1 text-[6px] font-semibold uppercase tracking-[0.13em] text-white/35 md:text-[7px]">
                      Full-stack engineer
                    </span>

                    <span className="relative z-10 mt-4 flex items-center gap-2 text-[6px] font-bold uppercase tracking-[0.09em] text-white/30 md:text-[7px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#62E6A5] shadow-[0_0_8px_#62E6A5]" />
                      System ready
                    </span>
                  </div>
                </div>
              </div>

              <FloatingInfo
                className="about-floating-one left-0 top-[17%]"
                Icon={FiCode}
                label="Développement"
                value="Clean code"
                number="01"
              />

              <FloatingInfo
                className="about-floating-two right-0 top-[29%]"
                Icon={FiCpu}
                label="Architecture"
                value="Scalable"
                number="02"
              />

              <FloatingInfo
                className="about-floating-three bottom-[12%] left-[3%] hidden sm:flex"
                Icon={FiDatabase}
                label="Données"
                value="Structured"
                number="03"
              />

              <div className="about-terminal-float absolute bottom-[7%] right-0 z-20 w-[155px] overflow-hidden rounded-2xl border border-white/10 bg-[#07020D]/85 shadow-[0_25px_70px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl md:bottom-[12%] md:w-[195px]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6C86]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFD166]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#65E5A5]" />
                  </div>

                  <span className="text-[7px] tracking-wider text-white/30">
                    about.ts
                  </span>
                </div>

                <div className="p-3 font-mono text-[6px] leading-4 text-white/60 md:p-4 md:text-[8px] md:leading-4">
                  <p>
                    <span className="text-[#D996FF]">
                      const
                    </span>{" "}
                    <span className="text-[#8EBAFF]">
                      matteo
                    </span>{" "}
                    =
                    <span className="text-[#6FE6B1]">
                      {" {"}
                    </span>
                  </p>

                  <p className="pl-3">
                    role:
                    <span className="text-[#F5B77E]">
                      {' "full-stack"'}
                    </span>
                    ,
                  </p>

                  <p className="pl-3">
                    creative:
                    <span className="text-[#D996FF]">
                      {" true"}
                    </span>
                    ,
                  </p>

                  <p className="pl-3">
                    limits:
                    <span className="text-[#D996FF]">
                      {" null"}
                    </span>
                  </p>

                  <p>
                    <span className="text-[#6FE6B1]">
                      {"}"}
                    </span>
                    ;
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-white/[0.05] px-3 py-2 text-[6px] font-bold uppercase tracking-wider text-white/25 md:text-[7px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#62E5A4] shadow-[0_0_8px_#62E5A4]" />
                  Ready to build
                </div>
              </div>

              <div className="about-energy-float absolute right-[12%] top-[5%] z-20 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0B0314]/70 px-3 py-2 text-[7px] font-semibold text-[#ECDafa]/60 backdrop-blur-xl md:top-[9%] md:text-[8px]">
                <FiZap className="text-[#C154F7]" />
                Creative mode
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionTransition
        number="01"
        label="Identity system"
      />

      {/* Ce qui me définit */}
      <section className="relative z-10 mx-auto w-[calc(100%-28px)] max-w-[1180px] py-16 md:w-[calc(100%-52px)] md:py-24 xl:w-[calc(100%-72px)]">
        <SectionHeading
          overline="Profile overview"
          title="Ce qui me"
          mutedTitle=" définit."
          description="Un équilibre entre maîtrise technique, créativité et capacité à transformer un besoin concret en solution numérique cohérente."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Introduction */}
          <BentoCard className="min-h-[430px] p-6 md:col-span-12 md:p-8 lg:col-span-8">
            <CardIndex
              number="01"
              label="Introduction"
            />

            <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_210px]">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#D2B5ED]/45">
                  Full-stack developer
                </span>

                <h3 className="mt-3 text-[clamp(2.8rem,8vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.065em]">
                  Mattéo
                  <span className="text-[#EEDCFF]/45">
                    {" "}Padalino.
                  </span>
                </h3>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#DFCFED]/55">
                  Développeur full-stack et intégrateur, je conçois des
                  applications robustes, performantes et élégantes. Je peux
                  intervenir sur toute la chaîne d’un projet, de
                  l’architecture à l’interface finale.
                </p>
              </div>

              <div className="relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/[0.09] bg-[#05010A]/60 md:min-h-[220px]">
                <div className="absolute left-4 top-4 flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6C86]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD166]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65E5A5]" />
                </div>

                <div className="absolute inset-[20%] animate-[spin_16s_linear_infinite] rounded-full border border-dashed border-[#C154F7]/20" />

                <FiTerminal className="relative z-10 text-4xl text-[#D9A8FF]" />

                <strong className="relative z-10 mt-3 text-sm tracking-[0.1em]">
                  BUILDING
                </strong>

                <span className="relative z-10 mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-white/30">
                  Digital experiences
                </span>

                <div className="relative z-10 mt-4 flex h-5 items-end gap-1">
                  {[7, 13, 9, 17, 11].map((height, index) => (
                    <span
                      key={index}
                      className="about-terminal-bar w-[3px] rounded-full bg-gradient-to-t from-[#6A00FF] to-[#E0A2FF]"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${-index * 0.25}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/contact"
              className="relative z-10 mt-8 inline-flex w-fit items-center gap-2 text-xs font-semibold text-white"
            >
              Parlons de votre projet
              <FiArrowUpRight />
            </a>
          </BentoCard>

          {/* Philosophie */}
          <BentoCard className="min-h-[420px] p-6 md:col-span-12 md:p-8 lg:col-span-4 lg:row-span-2 lg:min-h-full">
            <CardIndex
              number="02"
              label="Approche"
            />

            <span className="pointer-events-none absolute right-7 top-6 font-serif text-8xl leading-none text-[#C154F7]/15">
              “
            </span>

            <h3 className="relative z-10 mt-12 text-3xl font-medium leading-tight tracking-[-0.045em]">
              Faire avancer les projets sans tourner en rond.
            </h3>

            <p className="relative z-10 mt-6 text-sm leading-7 text-[#DECEEC]/55">
              Je privilégie les décisions claires, une communication directe
              et des solutions adaptées au besoin réel plutôt qu’une
              accumulation inutile de fonctionnalités.
            </p>

            <div className="relative z-10 mt-9 space-y-3">
              {["Clarté", "Efficacité", "Exigence"].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 border-b border-white/[0.06] pb-3 text-xs text-white/65"
                >
                  <FiCheck className="text-[#C154F7]" />
                  {value}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Contact */}
          <BentoCard className="min-h-[300px] p-6 md:col-span-6 md:p-7 lg:col-span-4">
            <CardIndex
              number="03"
              label="Coordonnées"
            />

            <h3 className="relative z-10 mb-6 text-2xl font-medium tracking-[-0.04em]">
              Restons en contact.
            </h3>

            <div className="relative z-10 space-y-3">
              <ContactRow
                Icon={FiMail}
                label="E-mail"
                value="matteo.padalinoba@gmail.com"
                href="mailto:matteo.padalinoba@gmail.com"
              />

              <ContactRow
                Icon={FiPhone}
                label="Téléphone"
                value="06 67 72 75 57"
                href="tel:+33667727557"
              />

              <ContactRow
                Icon={FiMapPin}
                label="Localisation"
                value="Saint-Étienne, France"
              />
            </div>
          </BentoCard>

          {/* Réseaux */}
          <BentoCard className="min-h-[300px] p-6 md:col-span-6 md:p-7 lg:col-span-4">
            <CardIndex
              number="04"
              label="Réseaux"
            />

            <h3 className="relative z-10 mb-6 text-2xl font-medium tracking-[-0.04em]">
              Retrouvez-moi ailleurs.
            </h3>

            <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-[10px] font-semibold text-white/65 transition duration-300 hover:-translate-y-1 hover:border-[#C154F7]/30 hover:bg-[#C154F7]/10 hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] text-base text-white">
                    <Icon />
                  </span>

                  {label}

                  <FiArrowUpRight className="ml-auto text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Compétences */}
      <section className="relative z-10 mx-auto w-[calc(100%-28px)] max-w-[1180px] py-28 md:w-[calc(100%-52px)] xl:w-[calc(100%-72px)]">
        <span className="pointer-events-none absolute -right-5 -top-10 -z-10 text-[12rem] font-bold leading-none tracking-[-0.1em] text-white/[0.018] md:text-[20rem]">
          02
        </span>

        <SectionHeading
          overline="Technical arsenal"
          title="Compétences"
          mutedTitle=" principales."
          description="Des technologies et des méthodes choisies pour construire des produits modernes, rapides et maintenables."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <SkillPanel
            Icon={FiLayers}
            overline="Hard skills"
            title="Technologies"
            count={HARD_SKILLS.length}
          >
            <div className="relative z-10 flex flex-wrap gap-3">
              {HARD_SKILLS.map((skill, index) => (
                <span
                  key={skill}
                  className="about-skill-float inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-[10px] font-medium text-white/65 transition hover:border-[#C154F7]/35 hover:bg-[#C154F7]/10 hover:text-white"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C154F7] shadow-[0_0_8px_rgba(193,84,247,0.8)]" />
                  {skill}
                </span>
              ))}
            </div>
          </SkillPanel>

          <SkillPanel
            Icon={FiUser}
            overline="Soft skills"
            title="État d’esprit"
            count={SOFT_SKILLS.length}
          >
            <div className="relative z-10">
              {SOFT_SKILLS.map((skill, index) => (
                <div
                  key={skill}
                  className="grid grid-cols-[28px_1fr] gap-x-3 border-b border-white/[0.06] py-4 last:border-b-0"
                >
                  <span className="row-span-2 font-mono text-[8px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong className="text-xs font-medium text-white/70">
                    {skill}
                  </strong>

                  <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <span
                      className="about-skill-progress block h-full rounded-full bg-gradient-to-r from-[#6A00FF] via-[#C154F7] to-[#E7B9FF] shadow-[0_0_10px_rgba(193,84,247,0.55)]"
                      style={{
                        width: `${78 + index * 4}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SkillPanel>
        </div>
      </section>

      {/* Processus */}
      <section className="relative z-10 mx-auto w-[calc(100%-28px)] max-w-[1180px] py-28 md:w-[calc(100%-52px)] xl:w-[calc(100%-72px)]">
        <SectionHeading
          overline="Working process"
          title="Ma façon de"
          mutedTitle=" travailler."
          description="Un processus simple, structuré et flexible pour conserver une vision claire du projet à chaque étape."
        />

        <div className="relative h-px overflow-hidden bg-white/[0.08]">
          <span className="about-process-line absolute h-full w-1/5 bg-gradient-to-r from-transparent via-[#C154F7] to-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className="group relative min-h-[280px] border-l border-white/[0.07] px-6 py-9 transition duration-300 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#C154F7]/[0.07] hover:to-transparent xl:border-r xl:border-l-0 xl:first:border-l"
            >
              <span className="absolute -top-1 left-6 h-2 w-2 rounded-full bg-[#C154F7] shadow-[0_0_10px_#C154F7,0_0_22px_rgba(193,84,247,0.7)]" />

              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] font-mono text-[10px] text-white/45">
                {step.number}
              </span>

              <h3 className="mt-12 text-2xl font-medium tracking-[-0.045em]">
                {step.title}
              </h3>

              <p className="mt-4 text-xs leading-6 text-[#DCCC EA]/45">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Malt */}
      <section className="relative z-10 mx-auto w-[calc(100%-28px)] max-w-[1180px] py-28 md:w-[calc(100%-52px)] xl:w-[calc(100%-72px)]">
        <div className="pointer-events-none absolute left-[30%] top-[30%] -z-10 h-96 w-96 rounded-full bg-[#C154F7]/15 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[5%] -z-10 h-80 w-80 rounded-full bg-[#6A00FF]/15 blur-[110px]" />

        <SectionHeading
          overline="Freelance network"
          title="Mon profil"
          mutedTitle=" Malt."
          description="Un cadre professionnel permettant de centraliser les échanges, les contrats et les paiements autour de chaque mission."
        />

        <div className="grid min-h-[800px] grid-cols-1 items-center gap-7 lg:grid-cols-[1fr_360px_1fr]">
          <div className="order-2 space-y-6 lg:order-1">
            <MaltCard
              number="01"
              title="Malt, c’est quoi ?"
              Icon={FiLayers}
            >
              Malt est une plateforme française qui met en relation les
              freelances et les entreprises recherchant des compétences
              spécifiques. Les missions, contrats et paiements sont
              centralisés dans un même espace.
            </MaltCard>

            <MaltCard
              number="03"
              title="Une collaboration fluide"
              Icon={FiZap}
            >
              Les échanges, devis, contrats et paiements sont regroupés afin
              de permettre à chacun de se concentrer sur l’avancement réel du
              projet.
            </MaltCard>
          </div>

          <div className="relative order-1 flex min-h-[650px] items-center justify-center lg:order-2 lg:min-h-[760px]">
            <div className="about-device-orbit-one absolute left-1/2 top-1/2 h-[180px] w-[430px] rounded-full border border-[#C154F7]/15" />
            <div className="about-device-orbit-two absolute left-1/2 top-1/2 h-[145px] w-[350px] rounded-full border border-[#C154F7]/15" />

            <div className="absolute bottom-14 left-1/2 h-16 w-64 -translate-x-1/2 rounded-[50%] border border-[#C154F7]/20 bg-[radial-gradient(ellipse,rgba(193,84,247,0.2),rgba(106,0,255,0.04)_48%,transparent_72%)]" />

            <div className="about-device-float relative z-10">
              <div className="absolute -inset-x-12 inset-y-[10%] -z-10 rounded-full bg-[#6A00FF]/25 blur-[70px]" />

              <Image
                src={Mockup}
                alt="Aperçu du profil Malt de Mattéo Padalino"
                width={360}
                height={740}
                className="block h-auto w-[190px] drop-shadow-[0_35px_55px_rgba(0,0,0,0.55)] md:w-[230px]"
                unoptimized
              />
            </div>

            <div className="about-floating-two absolute right-0 top-[24%] z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0C0315]/80 p-3 shadow-[0_20px_55px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#63E7A6] shadow-[0_0_10px_#63E7A6]" />

              <div>
                <span className="block text-[7px] font-bold uppercase tracking-wider text-white/30">
                  Profil freelance
                </span>

                <strong className="text-[10px] font-semibold">
                  Disponible
                </strong>
              </div>

              <SiMalt className="text-lg" />
            </div>

            <div className="about-floating-one absolute bottom-[23%] left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0C0315]/80 p-3 shadow-[0_20px_55px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <FiCode className="text-xl text-[#D9A6FF]" />

              <div>
                <span className="block text-[7px] font-bold uppercase tracking-wider text-white/30">
                  Mission
                </span>

                <strong className="text-[10px] font-semibold">
                  Ready to start
                </strong>
              </div>
            </div>
          </div>

          <div className="order-3 space-y-6">
            <MaltCard
              number="02"
              title="Pourquoi passer par Malt ?"
              Icon={FiCheck}
            >
              Malt offre un cadre clair avec contrat numérique, paiement
              sécurisé et système d’évaluation. Cela renforce la transparence
              entre le client et le freelance.
            </MaltCard>

            <article className="group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[radial-gradient(circle_at_80%_20%,rgba(193,84,247,0.14),transparent_45%),linear-gradient(145deg,rgba(30,7,51,0.86),rgba(8,2,15,0.9))] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-[#C154F7]/25">
              <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#D1B3ED]/45">
                Profil vérifié
              </span>

              <h3 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.04em]">
                Découvrez mes services et démarrez une collaboration.
              </h3>

              <a
                href="https://www.malt.fr/profile/matteopadalino"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 text-xs font-semibold"
              >
                Voir mon profil Malt

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#160323] transition group-hover:rotate-45">
                  <FiArrowUpRight />
                </span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center overflow-hidden px-5 py-40 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[28%] -z-10 h-80 w-[650px] -translate-x-1/2 rounded-full bg-[#6A00FF]/25 blur-[135px]" />

        <div className="about-footer-orbit relative mb-7 h-20 w-20 rounded-full border border-[#C154F7]/25">
          <span className="absolute inset-4 rounded-full border border-white/10" />

          <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C154F7] shadow-[0_0_10px_#C154F7,0_0_25px_rgba(193,84,247,0.7)]" />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#DCC5F1]/40">
          Une idée à concrétiser ?
        </span>

        <h2 className="mt-5 max-w-5xl text-[clamp(3.4rem,14vw,5rem)] font-medium leading-[0.95] tracking-[-0.07em] md:text-[clamp(4rem,8vw,7rem)]">
          Construisons quelque chose
          <span className="text-[#C154F7] [text-shadow:0_0_30px_rgba(193,84,247,0.55)]">
            {" "}d’unique.
          </span>
        </h2>

        <p className="mt-7 max-w-xl text-sm leading-7 text-[#DACCE8]/50">
          Du premier échange jusqu’à la mise en ligne, je vous accompagne pour
          transformer votre idée en une expérience numérique complète.
        </p>

        <a
          href="/contact"
          className="group relative mt-9 inline-flex items-center overflow-hidden rounded-full border border-[#C154F7]/35 bg-gradient-to-br from-[#C154F7]/20 to-[#6A00FF]/10 p-1.5 shadow-[0_20px_60px_rgba(106,0,255,0.18),inset_0_1px_0_rgba(255,255,255,0.13)] transition duration-300 hover:-translate-y-1 hover:border-[#DBA6FF]/60 hover:shadow-[0_27px_75px_rgba(106,0,255,0.3)]"
        >
          <span className="about-button-shine absolute -top-full h-[300%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <span className="relative z-10 flex items-center gap-4 pl-4 text-sm font-semibold">
            Démarrer un projet

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#160423] transition group-hover:rotate-45">
              <FiArrowUpRight />
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

        .about-stage {
          --mouse-x: 50%;
          --mouse-y: 20%;
          --scene-x: 0px;
          --scene-y: 0px;

          isolation: isolate;

          background:
            radial-gradient(
              circle at 72% 15%,
              rgba(106, 0, 255, 0.13),
              transparent 31%
            ),
            radial-gradient(
              circle at 10% 36%,
              rgba(193, 84, 247, 0.08),
              transparent 25%
            ),
            linear-gradient(
              145deg,
              #040107 0%,
              #08020e 46%,
              #030105 100%
            );
        }

        .about-cursor-glow {
          background: radial-gradient(
            circle 450px at var(--mouse-x) var(--mouse-y),
            rgba(145, 45, 255, 0.16),
            rgba(193, 84, 247, 0.04) 40%,
            transparent 72%
          );

          transition: background 120ms linear;
        }

        .about-aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(115px);
          opacity: 0.27;
          will-change: transform;
        }

        .about-aurora-one {
          top: -8%;
          right: -8%;
          width: 650px;
          height: 520px;
          background: rgba(106, 0, 255, 0.48);
          animation: aboutAuroraOne 17s ease-in-out infinite alternate;
        }

        .about-aurora-two {
          top: 34%;
          left: -15%;
          width: 620px;
          height: 650px;
          background: rgba(193, 84, 247, 0.24);
          animation: aboutAuroraTwo 21s ease-in-out infinite alternate;
        }

        .about-aurora-three {
          top: 70%;
          right: -8%;
          width: 580px;
          height: 700px;
          background: rgba(76, 42, 226, 0.2);
          animation: aboutAuroraThree 19s ease-in-out infinite alternate;
        }

        .about-grid {
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
            transparent 80%
          );

          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 80%
          );
        }

        .about-perspective-grid {
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

          animation: aboutGridMovement 14s linear infinite;
        }

        .about-scan-beam {
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

          animation: aboutScanBeam 16s linear infinite;
        }

        .about-particle {
          background: rgba(239, 221, 255, 0.92);

          box-shadow:
            0 0 8px rgba(193, 84, 247, 0.85),
            0 0 18px rgba(106, 0, 255, 0.5);

          animation:
            aboutParticleFloat
            var(--duration)
            ease-in-out
            var(--delay)
            infinite;
        }

        .about-side-label {
          writing-mode: vertical-rl;
        }

        .about-side-line > span {
          animation: aboutSideLine 3s ease-in-out infinite;
        }

        .about-badge-ping {
          animation: aboutBadgePing 2s ease-out infinite;
        }

        .about-gradient-title {
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

          animation: aboutTitleGradient 8s linear infinite;
        }

        .about-button-shine {
          left: -40%;
          animation: aboutButtonShine 4.8s ease-in-out infinite;
        }

        .about-parallax {
          transform: translate3d(
            var(--scene-x),
            var(--scene-y),
            0
          );

          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-orbital-aura {
          background: radial-gradient(
            circle,
            rgba(140, 43, 255, 0.25),
            rgba(106, 0, 255, 0.08) 43%,
            transparent 72%
          );

          filter: blur(24px);
          animation: aboutAuraPulse 5.5s ease-in-out infinite;
        }

        .about-orbit-one {
          animation: aboutOrbitOne 24s linear infinite;
        }

        .about-orbit-two {
          animation: aboutOrbitTwo 18s linear infinite reverse;
        }

        .about-orbit-three {
          animation: aboutOrbitThree 11s linear infinite;
        }

        .about-diagonal-one {
          transform: translate(-50%, -50%) rotate(66deg);
          animation: aboutDiagonalOne 14s ease-in-out infinite alternate;
        }

        .about-diagonal-two {
          transform: translate(-50%, -50%) rotate(-59deg);
          animation: aboutDiagonalTwo 17s ease-in-out infinite alternate;
        }

        .about-profile-core {
          animation: aboutCoreFloat 5s ease-in-out infinite;
        }

        .about-core-radiation {
          animation: aboutCoreRadiation 3.5s ease-out infinite;
        }

        .about-core-radiation-delay {
          animation-delay: 1.75s;
        }

        .about-core-border {
          background: conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.1),
            #8a2eff,
            rgba(255, 255, 255, 0.12),
            #c154f7,
            rgba(255, 255, 255, 0.1)
          );

          box-shadow:
            0 0 90px rgba(106, 0, 255, 0.28),
            0 30px 90px rgba(0, 0, 0, 0.55);

          animation: aboutCoreBorder 15s linear infinite;
        }

        .about-core-content {
          background:
            radial-gradient(
              circle at 32% 22%,
              rgba(255, 255, 255, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at center,
              rgba(38, 7, 62, 0.99),
              rgba(7, 2, 13, 1)
            );

          animation: aboutCoreContent 15s linear infinite reverse;
        }

        .about-floating-one {
          animation: aboutFloatingOne 6.5s ease-in-out infinite;
        }

        .about-floating-two {
          animation: aboutFloatingTwo 7.5s -2s ease-in-out infinite;
        }

        .about-floating-three {
          animation: aboutFloatingThree 8s -4s ease-in-out infinite;
        }

        .about-terminal-float {
          animation: aboutTerminalFloat 7s ease-in-out infinite;
        }

        .about-energy-float {
          animation: aboutEnergyFloat 6s ease-in-out infinite;
        }

        .about-transition-line {
          left: -25%;
          animation: aboutTransitionLine 4s ease-in-out infinite;
        }

        .about-terminal-bar {
          animation: aboutTerminalBar 1.5s ease-in-out infinite alternate;
        }

        .about-skill-float {
          animation: aboutSkillFloat 5s ease-in-out infinite;
        }

        .about-skill-progress {
          animation: aboutSkillProgress 3s ease-in-out infinite alternate;
          transform-origin: left;
        }

        .about-process-line {
          left: -20%;
          animation: aboutProcessLine 5s linear infinite;
        }

        .about-device-orbit-one {
          transform: translate(-50%, -50%) rotate(64deg);
          animation: aboutDeviceOrbitOne 13s ease-in-out infinite alternate;
        }

        .about-device-orbit-two {
          transform: translate(-50%, -50%) rotate(-59deg);
          animation: aboutDeviceOrbitTwo 16s ease-in-out infinite alternate;
        }

        .about-device-float {
          animation: aboutDeviceFloat 5s ease-in-out infinite;
        }

        .about-footer-orbit {
          animation: aboutFooterOrbit 10s linear infinite;
        }

        @keyframes aboutAuroraOne {
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

        @keyframes aboutAuroraTwo {
          from {
            transform: translate3d(-50px, 30px, 0) scale(1);
          }

          to {
            transform: translate3d(100px, -70px, 0) scale(1.2);
          }
        }

        @keyframes aboutAuroraThree {
          from {
            transform: translate3d(40px, -70px, 0);
          }

          to {
            transform: translate3d(-80px, 80px, 0) scale(1.16);
          }
        }

        @keyframes aboutGridMovement {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 58px;
          }
        }

        @keyframes aboutScanBeam {
          from {
            transform: translateY(-20vh);
          }

          to {
            transform: translateY(690vh);
          }
        }

        @keyframes aboutParticleFloat {
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

        @keyframes aboutSideLine {
          from {
            top: -45%;
          }

          to {
            top: 115%;
          }
        }

        @keyframes aboutBadgePing {
          from {
            opacity: 0.7;
            transform: scale(1);
          }

          to {
            opacity: 0;
            transform: scale(2.8);
          }
        }

        @keyframes aboutTitleGradient {
          to {
            background-position: 200% center;
          }
        }

        @keyframes aboutButtonShine {
          0%,
          55% {
            left: -40%;
          }

          80%,
          100% {
            left: 125%;
          }
        }

        @keyframes aboutAuraPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(0.93);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes aboutOrbitOne {
          from {
            transform: rotateX(68deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes aboutOrbitTwo {
          from {
            transform: rotateY(66deg) rotateZ(0deg);
          }

          to {
            transform: rotateY(66deg) rotateZ(360deg);
          }
        }

        @keyframes aboutOrbitThree {
          from {
            transform: rotateX(70deg) rotateY(32deg) rotateZ(0deg);
          }

          to {
            transform:
              rotateX(70deg)
              rotateY(32deg)
              rotateZ(360deg);
          }
        }

        @keyframes aboutDiagonalOne {
          from {
            transform:
              translate(-50%, -50%)
              rotate(61deg)
              scale(0.94);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(72deg)
              scale(1.05);
          }
        }

        @keyframes aboutDiagonalTwo {
          from {
            transform:
              translate(-50%, -50%)
              rotate(-66deg)
              scale(1.05);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(-54deg)
              scale(0.94);
          }
        }

        @keyframes aboutCoreFloat {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              translateY(-6px);
          }

          50% {
            transform:
              translate(-50%, -50%)
              translateY(8px);
          }
        }

        @keyframes aboutCoreRadiation {
          from {
            opacity: 0.65;
            transform: scale(0.65);
          }

          to {
            opacity: 0;
            transform: scale(1.4);
          }
        }

        @keyframes aboutCoreBorder {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes aboutCoreContent {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes aboutFloatingOne {
          0%,
          100% {
            transform:
              translate3d(-3px, -6px, 0)
              rotate(-1deg);
          }

          50% {
            transform:
              translate3d(8px, 9px, 0)
              rotate(1deg);
          }
        }

        @keyframes aboutFloatingTwo {
          0%,
          100% {
            transform:
              translate3d(3px, 6px, 0)
              rotate(1deg);
          }

          50% {
            transform:
              translate3d(-9px, -8px, 0)
              rotate(-1deg);
          }
        }

        @keyframes aboutFloatingThree {
          0%,
          100% {
            transform:
              translate3d(-2px, 5px, 0)
              rotate(1deg);
          }

          50% {
            transform:
              translate3d(10px, -8px, 0)
              rotate(-2deg);
          }
        }

        @keyframes aboutTerminalFloat {
          0%,
          100% {
            transform:
              translate3d(0, 5px, 0)
              rotate(1deg);
          }

          50% {
            transform:
              translate3d(-8px, -8px, 0)
              rotate(-1deg);
          }
        }

        @keyframes aboutEnergyFloat {
          0%,
          100% {
            transform: translateY(-4px);
          }

          50% {
            transform: translateY(8px);
          }
        }

        @keyframes aboutTransitionLine {
          from {
            left: -25%;
          }

          to {
            left: 115%;
          }
        }

        @keyframes aboutTerminalBar {
          from {
            transform: scaleY(0.45);
          }

          to {
            transform: scaleY(1);
          }
        }

        @keyframes aboutSkillFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes aboutSkillProgress {
          from {
            opacity: 0.65;
            transform: scaleX(0.94);
          }

          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes aboutProcessLine {
          from {
            left: -20%;
          }

          to {
            left: 120%;
          }
        }

        @keyframes aboutDeviceOrbitOne {
          from {
            transform:
              translate(-50%, -50%)
              rotate(60deg)
              scale(0.94);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(70deg)
              scale(1.05);
          }
        }

        @keyframes aboutDeviceOrbitTwo {
          from {
            transform:
              translate(-50%, -50%)
              rotate(-65deg)
              scale(1.05);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(-54deg)
              scale(0.94);
          }
        }

        @keyframes aboutDeviceFloat {
          0%,
          100% {
            transform: translateY(-8px) rotate(-1deg);
          }

          50% {
            transform: translateY(10px) rotate(1deg);
          }
        }

        @keyframes aboutFooterOrbit {
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

          .about-parallax {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <strong className="text-lg font-medium tracking-[-0.04em]">
        {value}
      </strong>

      <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-white/30">
        {label}
      </span>
    </div>
  );
}

function StatDivider() {
  return (
    <span className="hidden h-9 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:block" />
  );
}

function FloatingInfo({
  className,
  Icon,
  label,
  value,
  number,
}) {
  return (
    <div
      className={`absolute z-20 hidden min-w-[145px] items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0E0419]/75 p-2.5 shadow-[0_20px_55px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:flex md:min-w-[165px] md:p-3 ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#C154F7]/20 bg-[#C154F7]/10 text-[#DCAEFF]">
        <Icon />
      </span>

      <div>
        <span className="block text-[7px] font-bold uppercase tracking-wider text-white/35">
          {label}
        </span>

        <strong className="block whitespace-nowrap text-[9px] font-semibold">
          {value}
        </strong>
      </div>

      <small className="ml-auto text-[8px] text-white/20">
        {number}
      </small>
    </div>
  );
}

function SectionTransition({
  number,
  label,
}) {
  return (
    <div className="relative z-10 mx-auto flex w-[calc(100%-28px)] max-w-[1300px] items-center gap-4 pb-12 md:w-[calc(100%-52px)] md:pb-20 xl:w-[calc(100%-72px)]">
      <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-white/25">
        {number}
      </span>

      <div className="relative h-px flex-1 overflow-hidden bg-white/[0.07]">
        <span className="about-transition-line absolute h-full w-1/4 bg-gradient-to-r from-transparent via-[#C154F7] to-white" />
      </div>

      <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-white/25">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({
  overline,
  title,
  mutedTitle,
  description,
}) {
  return (
    <div className="mb-14 flex flex-col items-start justify-between gap-7 md:mb-20 lg:flex-row lg:items-end">
      <div>
        <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#CEB0EB]/40">
          {overline}
        </span>

        <h2 className="text-[clamp(3rem,13vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.065em] md:text-[clamp(3.4rem,7vw,6rem)]">
          {title}
          <span className="text-[#EEDCFF]/40">
            {mutedTitle}
          </span>
        </h2>
      </div>

      <p className="max-w-[430px] text-sm leading-7 text-[#DACCE8]/50">
        {description}
      </p>
    </div>
  );
}

function BentoCard({
  children,
  className = "",
}) {
  return (
    <article
      className={[
        "group relative flex h-full min-w-0 flex-col overflow-hidden",
        "rounded-[26px] border border-white/[0.09]",
        "bg-[radial-gradient(circle_at_85%_10%,rgba(193,84,247,0.08),transparent_32%),linear-gradient(145deg,rgba(31,8,51,0.84),rgba(10,3,18,0.88))]",
        "shadow-[0_30px_90px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]",
        "backdrop-blur-xl transition duration-500",
        "hover:-translate-y-1.5 hover:border-[#C154F7]/25",
        "hover:shadow-[0_40px_110px_rgba(0,0,0,0.46),0_0_50px_rgba(106,0,255,0.08),inset_0_1px_0_rgba(255,255,255,0.11)]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(193,84,247,0.16),transparent_44%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute -left-[30%] -top-full z-[1] h-[350%] w-1/4 rotate-[22deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-all duration-1000 group-hover:left-[130%]" />

      {children}
    </article>
  );
}

function CardIndex({
  number,
  label,
}) {
  return (
    <div className="relative z-10 mb-8 flex items-center gap-3">
      <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white/30">
        {number}
      </span>

      <span className="h-px w-8 bg-gradient-to-r from-[#C154F7]/80 to-transparent" />

      <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white/30">
        {label}
      </span>
    </div>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C154F7]/20 bg-[#C154F7]/10 text-[#D9A9FF]">
        <Icon />
      </span>

      <div className="min-w-0 flex-1">
        <span className="block text-[7px] font-bold uppercase tracking-[0.12em] text-white/30">
          {label}
        </span>

        <strong className="mt-1 block break-words text-[10px] font-medium leading-4 text-white/75">
          {value}
        </strong>
      </div>
    </>
  );

  const className =
    "flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition duration-300 hover:translate-x-1 hover:border-[#C154F7]/25 hover:bg-[#C154F7]/[0.07]";

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

function SkillPanel({
  Icon,
  overline,
  title,
  count,
  children,
}) {
  return (
    <article className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(30,7,50,0.82),rgba(9,3,16,0.9))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)] md:p-8">
      <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#6A00FF]/15 blur-[85px]" />

      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C154F7]/20 bg-[#C154F7]/10 text-lg text-[#D9A6FF]">
            <Icon />
          </span>

          <div>
            <span className="block text-[7px] font-bold uppercase tracking-[0.13em] text-white/30">
              {overline}
            </span>

            <strong className="mt-1 block text-sm font-medium">
              {title}
            </strong>
          </div>
        </div>

        <span className="font-mono text-xs text-white/20">
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {children}
    </article>
  );
}

function MaltCard({
  number,
  title,
  Icon,
  children,
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[linear-gradient(145deg,rgba(29,7,49,0.8),rgba(8,2,15,0.86))] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[#C154F7]/25">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/25">
          {number}
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C154F7]/20 bg-[#C154F7]/10 text-[#D8A6FF]">
          <Icon />
        </span>
      </div>

      <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-4 text-xs leading-6 text-[#DDCDEB]/50">
        {children}
      </p>
    </article>
  );
}