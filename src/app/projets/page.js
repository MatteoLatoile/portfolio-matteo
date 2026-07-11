"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowDown,
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMonitor,
  FiZap,
} from "react-icons/fi";

const ProjectCard = dynamic(() => import("../../../component/ProjectCard"), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

const ProjectModal = dynamic(() => import("../../../component/ProjectModal"), {
  ssr: false,
});

import Ukhtakaful from "../../../public/projets/ukhtakaful.png";
import SmPerformance from "../../../public/projets/sm_perf.png";
import Dehors from "../../../public/projets/dehors.webp";
import Irab from "../../../public/projets/projet_irab_master.webp";
import Klaxon from "../../../public/projets/touche_pas_au_klaxon.webp";
import Artisan from "../../../public/projets/trouve_ton_artisan.webp";

/*
 * Aucun Math.random() afin d’éviter les problèmes
 * d’hydratation avec Next.js.
 */
const PARTICLES = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 41 + 9) % 100}%`,
  top: `${(index * 67 + 5) % 98}%`,
  size: 1 + (index % 3),
  duration: 9 + (index % 8) * 1.3,
  delay: -(index % 14) * 0.75,
  driftX: -45 + (index % 10) * 9,
  driftY: -25 - (index % 5) * 11,
}));

const PROJECTS = [
  {
    title: "Ukhtakaful",
    subtitle: "Plateforme de formations",
    description:
      "Conception et développement d’une plateforme dédiée à l’accompagnement du sommeil des bébés et des jeunes enfants. Le site présente les formations et propose un espace structuré pour suivre différents modules audio.",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    image: Ukhtakaful,
    youtubeId: "nHSqTW0ywGI",
    videoDescription:
      "Présentation vidéo de la plateforme Ukhtakaful.",
    accent: "violet",
  },
  {
    title: "SM Performance",
    subtitle: "Coaching sportif",
    description:
      "Création d’une plateforme moderne de coaching sportif permettant de présenter les services, les programmes et l’identité du coach au sein d’une interface dynamique et responsive.",
    tags: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    image: SmPerformance,
    youtubeId: "xl7G28sHtkU",
    videoDescription:
      "Présentation vidéo de la plateforme SM Performance.",
    accent: "purple",
  },
  {
    title: "I'rab Master",
    subtitle: "Application éducative",
    description:
      "Design Figma d’une application éducative permettant aux étudiants en langue arabe de s’exercer à l’i‘rab grâce à l’intelligence artificielle.",
    tags: ["Figma", "Intelligence artificielle", "Mobile"],
    image: Irab,
    muxId: "vmlM7cG37G3971EPRdPkQtDqAjZjhEeB1ZAP4Amz02D00",
    videoDescription:
      "Vidéo de présentation du projet I'rab Master.",
    accent: "blue",
  },
  {
    title: "Touche pas au klaxon !",
    subtitle: "Plateforme de covoiturage",
    description:
      "Plateforme interne permettant de relier des collègues partout en France, de réduire les coûts de déplacement et de limiter l’empreinte carbone.",
    tags: ["PHP", "HTML5", "CSS3", "Développement web"],
    image: Klaxon,
    muxId: "iyQwz2lDTnUOpsR00lwo0200p9D00Wq2QRz2TpXrwLczQQw.m3u8",
    videoDescription:
      "Vidéo de présentation du projet de covoiturage interne.",
    accent: "pink",
  },
  {
    title: "Trouve ton artisan.",
    subtitle: "Rhône-Alpes Auvergne",
    description:
      "Annuaire régional permettant de rechercher des artisans, avec un design aligné sur l’identité visuelle de la région.",
    tags: ["React", "Node.js", "Express", "SQL"],
    image: Artisan,
    muxId: "8UiGzlnCaGkXJDYeFVj99kG02idtn9NVGo5NqAHmfiWY",
    videoDescription:
      "Présentation vidéo du projet Trouve ton artisan.",
    accent: "orange",
  },
  {
    title: "Dehors !",
    subtitle: "Site d'Escape Game",
    description:
      "Site d’escape game à Paris réalisé autour d’un exercice consistant à générer dynamiquement des cartes depuis une base de données JSON.",
    tags: ["HTML5", "CSS3", "JavaScript", "JSON"],
    image: Dehors,
    muxId: "aFFvpDk4REI9lCHdu1C00fkZJ02025Ig5ybYdaAEk014E5o",
    videoDescription:
      "Vidéo de présentation du site Dehors !",
    accent: "red",
  },
];

const ORBITAL_NODES = [
  {
    label: "UI",
    icon: FiMonitor,
    className: "orbital-node-ui",
  },
  {
    label: "API",
    icon: FiCode,
    className: "orbital-node-api",
  },
  {
    label: "DATA",
    icon: FiDatabase,
    className: "orbital-node-data",
  },
  {
    label: "SYSTEM",
    icon: FiCpu,
    className: "orbital-node-system",
  },
];

export default function ProjetPage() {
  const stageRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const closeModal = () => {
    setModalData(null);
  };

  const handlePointerMove = (event) => {
    const stage = stageRef.current;

    if (!stage) return;

    cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const bounds = stage.getBoundingClientRect();

      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;

      const normalizedX = (relativeX - 0.5) * 2;
      const normalizedY = (relativeY - 0.5) * 2;

      stage.style.setProperty("--mouse-x", `${relativeX * 100}%`);
      stage.style.setProperty("--mouse-y", `${relativeY * 100}%`);
      stage.style.setProperty("--scene-x", `${normalizedX * 15}px`);
      stage.style.setProperty("--scene-y", `${normalizedY * 12}px`);
    });
  };

  const resetPointerPosition = () => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.style.setProperty("--mouse-x", "50%");
    stage.style.setProperty("--mouse-y", "25%");
    stage.style.setProperty("--scene-x", "0px");
    stage.style.setProperty("--scene-y", "0px");
  };

  const openProjectModal = (project) => {
    setModalData({
      muxId: project.muxId,
      youtubeId: project.youtubeId,
      description: project.videoDescription,
    });
  };

  return (
    <main
      ref={stageRef}
      className="projects-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
    >
      {/* Fond global */}
      <div className="projects-background" aria-hidden="true">
        <div className="cursor-glow" />

        <div className="background-aurora aurora-primary" />
        <div className="background-aurora aurora-secondary" />
        <div className="background-aurora aurora-third" />

        <div className="background-grid" />
        <div className="perspective-grid" />
        <div className="moving-scanline" />

        <div className="particles-container">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="background-particle"
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

        <div className="global-vignette" />
      </div>

      {/* Décor fixe latéral */}
      <div className="side-navigation" aria-hidden="true">
        <span className="side-navigation-label">Selected works</span>

        <div className="side-navigation-line">
          <span />
        </div>

        <span className="side-navigation-number">
          {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Introduction */}
      <header className="projects-hero">
        <div className="projects-hero-copy">
          <div className="projects-eyebrow">
            <span className="eyebrow-dot">
              <span />
            </span>

            <span>Portfolio / Selected works</span>
          </div>

          <h1>
            <span className="hero-title-small">Des idées.</span>

            <span className="hero-title-large">
              Des expériences
              <span className="title-glow">.</span>
            </span>
          </h1>

          <p className="projects-introduction">
            Une sélection de projets où le{" "}
            <strong>design, le code et la stratégie</strong> travaillent
            ensemble pour créer des expériences numériques utiles, fluides et
            mémorables.
          </p>

          <div className="projects-summary">
            <div className="summary-item">
              <strong>{String(PROJECTS.length).padStart(2, "0")}</strong>
              <span>Projets sélectionnés</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-item">
              <strong>360°</strong>
              <span>Vision full-stack</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-item">
              <strong>∞</strong>
              <span>Créativité</span>
            </div>
          </div>

          <a href="#project-list" className="explore-projects">
            <span>Explorer les projets</span>

            <span className="explore-icon">
              <FiArrowDown />
            </span>
          </a>
        </div>

        {/* Visuel orbital */}
        <div className="projects-hero-visual" aria-hidden="true">
          <div className="visual-parallax-container">
            <div className="project-orbital-system">
              <div className="orbital-aura" />

              <div className="project-orbit orbit-external">
                <span className="orbit-light orbit-light-one" />
              </div>

              <div className="project-orbit orbit-middle">
                <span className="orbit-light orbit-light-two" />
              </div>

              <div className="project-orbit orbit-internal">
                <span className="orbit-light orbit-light-three" />
              </div>

              <div className="project-orbit orbit-diagonal-one" />
              <div className="project-orbit orbit-diagonal-two" />

              <div className="project-core">
                <div className="project-core-radiation radiation-one" />
                <div className="project-core-radiation radiation-two" />

                <div className="project-core-border">
                  <div className="project-core-content">
                    <div className="core-project-icon">
                      <FiLayers />
                    </div>

                    <span className="core-overline">Selected</span>

                    <strong>
                      {String(PROJECTS.length).padStart(2, "0")}
                    </strong>

                    <span className="core-caption">Digital experiences</span>

                    <div className="core-loader">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>

              {ORBITAL_NODES.map((node) => {
                const Icon = node.icon;

                return (
                  <div
                    key={node.label}
                    className={`orbital-information ${node.className}`}
                  >
                    <span className="orbital-information-icon">
                      <Icon />
                    </span>

                    <span>{node.label}</span>
                  </div>
                );
              })}

              <div className="floating-project-window">
                <div className="floating-window-header">
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>

                  <p>project.system</p>
                </div>

                <div className="floating-window-content">
                  <p>
                    <span className="syntax-purple">const</span>{" "}
                    <span className="syntax-blue">experience</span> =
                    <span className="syntax-green"> {"{"}</span>
                  </p>

                  <p className="code-indentation">
                    design: <span className="syntax-orange">
  &quot;premium&quot;
</span>,
                  </p>

                  <p className="code-indentation">
                    motion: <span className="syntax-purple">true</span>,
                  </p>

                  <p className="code-indentation">
                    limits: <span className="syntax-purple">null</span>
                  </p>

                  <p>
                    <span className="syntax-green">{"}"}</span>;
                  </p>
                </div>

                <div className="floating-window-footer">
                  <span />
                  Portfolio online
                </div>
              </div>

              <div className="floating-status-card">
                <span className="status-icon">
                  <FiZap />
                </span>

                <div>
                  <span>System status</span>
                  <strong>Creative mode</strong>
                </div>

                <span className="status-light" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Transition */}
      <div className="section-transition" aria-hidden="true">
        <span className="transition-number">01</span>

        <div className="transition-line">
          <span />
        </div>

        <span className="transition-label">Project archive</span>
      </div>

      {/* Liste des projets */}
      <section id="project-list" className="project-list">
        <div className="project-list-heading">
          <div>
            <span className="list-overline">Selected collection</span>

            <h2>
              Travaux
              <span> récents.</span>
            </h2>
          </div>

          <p>
            Chaque projet possède sa propre identité, mais conserve la même
            exigence : transformer une idée en expérience concrète.
          </p>
        </div>

        <div className="project-stack">
          {PROJECTS.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.title}
                className="project-entry sticky top-16 md:top-24"
                style={{
                  zIndex: 10 + index * 10,
                  marginTop: index === 0 ? "0" : "clamp(5rem, 10vw, 9rem)",
                }}
              >
                <div className={`project-halo halo-${project.accent}`} />

                <div className="project-entry-header">
                  <div className="project-number-wrapper">
                    <span className="project-number">{projectNumber}</span>

                    <span className="project-number-line" />
                  </div>

                  <div className="project-entry-meta">
                    <span>Digital experience</span>
                    <span>{project.tags[0]}</span>
                  </div>
                </div>

                <div className="project-card-frame">
                  <div className="project-frame-light" />

                  <ProjectCard
                    title={project.title}
                    subtitle={project.subtitle}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    priority={index === 0}
                    mediaFirstMobile={index % 2 === 0}
                    onOpenModal={() => openProjectModal(project)}
                    bgClass="bg-[linear-gradient(145deg,rgba(31,7,52,0.97)_0%,rgba(18,5,31,0.98)_52%,rgba(8,2,15,0.99)_100%)]"
                  />
                </div>

                <div className="project-bottom-data">
                  <span>MATTEO.DEV</span>

                  <div>
                    <span className="bottom-data-light" />
                    Case study available
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Fin de page */}
      <footer className="projects-footer">
        <div className="footer-orbit" aria-hidden="true">
          <div />
          <span />
        </div>

        <span className="footer-overline">End of collection</span>

        <h2>
          Une idée en tête
          <span> ?</span>
        </h2>

        <p>
          Créons ensemble une expérience qui ne ressemble pas à toutes les
          autres.
        </p>

        <a
          href="https://wa.me/33667727557"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-contact"
        >
          <span className="footer-contact-shine" />

          <span>Parlons de votre projet</span>

          <span className="footer-contact-icon">
            <FiBox />
          </span>
        </a>
      </footer>

      {modalData && (
        <ProjectModal
          isOpen={Boolean(modalData)}
          onClose={closeModal}
          muxId={modalData.muxId}
          youtubeId={modalData.youtubeId}
          description={modalData.description}
        />
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background: #05020a;
        }

        body {
          margin: 0;
          background: #05020a;
        }
      `}</style>

      <style jsx>{`
        .projects-stage {
          --mouse-x: 50%;
          --mouse-y: 25%;
          --scene-x: 0px;
          --scene-y: 0px;

          position: relative;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          color: white;
          background:
            radial-gradient(
              circle at 70% 18%,
              rgba(106, 0, 255, 0.14),
              transparent 32%
            ),
            radial-gradient(
              circle at 10% 42%,
              rgba(193, 84, 247, 0.08),
              transparent 27%
            ),
            linear-gradient(
              145deg,
              #040107 0%,
              #08020e 42%,
              #030105 100%
            );
        }

        .projects-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .cursor-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle 440px at var(--mouse-x) var(--mouse-y),
            rgba(149, 48, 255, 0.16),
            rgba(193, 84, 247, 0.04) 40%,
            transparent 72%
          );
          transition: background 120ms linear;
        }

        .background-aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(120px);
          opacity: 0.28;
          will-change: transform;
        }

        .aurora-primary {
          top: -7%;
          right: -6%;
          width: 650px;
          height: 500px;
          background: rgba(106, 0, 255, 0.5);
          animation: auroraPrimary 17s ease-in-out infinite alternate;
        }

        .aurora-secondary {
          top: 28%;
          left: -13%;
          width: 600px;
          height: 600px;
          background: rgba(193, 84, 247, 0.26);
          animation: auroraSecondary 21s ease-in-out infinite alternate;
        }

        .aurora-third {
          top: 64%;
          right: 0;
          width: 500px;
          height: 700px;
          background: rgba(70, 26, 220, 0.22);
          animation: auroraThird 18s ease-in-out infinite alternate;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          opacity: 0.18;
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
          background-size: 110px 110px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        .perspective-grid {
          position: absolute;
          top: 0;
          left: 50%;
          width: 175%;
          height: 720px;
          transform: translateX(-50%) perspective(850px) rotateX(68deg)
            translateY(-270px);
          transform-origin: center;
          background-image:
            linear-gradient(
              rgba(160, 86, 255, 0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(160, 86, 255, 0.18) 1px,
              transparent 1px
            );
          background-size: 58px 58px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 30%,
            transparent 92%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 30%,
            transparent 92%
          );
          animation: perspectiveGrid 14s linear infinite;
        }

        .moving-scanline {
          position: absolute;
          top: -15%;
          left: 0;
          width: 100%;
          height: 180px;
          opacity: 0.32;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(193, 84, 247, 0.08),
            rgba(193, 84, 247, 0.13),
            transparent
          );
          animation: scanPage 15s linear infinite;
        }

        .particles-container {
          position: absolute;
          inset: 0;
        }

        .background-particle {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: rgba(239, 221, 255, 0.9);
          box-shadow:
            0 0 8px rgba(193, 84, 247, 0.9),
            0 0 20px rgba(106, 0, 255, 0.5);
          animation: particleMovement var(--duration) ease-in-out
            var(--delay) infinite;
        }

        .global-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 220px 65px rgba(0, 0, 0, 0.5);
        }

        .side-navigation {
          position: fixed;
          top: 50%;
          right: 25px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .side-navigation-label {
          writing-mode: vertical-rl;
          color: rgba(255, 255, 255, 0.19);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .side-navigation-line {
          position: relative;
          width: 1px;
          height: 95px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
        }

        .side-navigation-line span {
          position: absolute;
          top: -45%;
          left: 0;
          width: 100%;
          height: 45%;
          background: linear-gradient(
            to bottom,
            transparent,
            #c154f7,
            white
          );
          animation: navigationLine 3s ease-in-out infinite;
        }

        .side-navigation-number {
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 10px;
        }

        .projects-hero {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(430px, 0.9fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 6rem);
          width: min(1420px, calc(100% - 72px));
          min-height: 100svh;
          margin: 0 auto;
          padding: 8rem 0 6rem;
        }

        .projects-hero-copy {
          position: relative;
          z-index: 5;
          max-width: 780px;
        }

        .projects-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          color: rgba(230, 214, 247, 0.63);
          background: rgba(255, 255, 255, 0.035);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            0 18px 55px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(15px);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .eyebrow-dot {
          position: relative;
          display: inline-flex;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c154f7;
          box-shadow: 0 0 14px #c154f7;
        }

        .eyebrow-dot span {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: inherit;
          animation: eyebrowPulse 2s ease-out infinite;
        }

        .projects-hero h1 {
          margin: 0;
          font-size: clamp(4rem, 7.5vw, 7.6rem);
          font-weight: 560;
          line-height: 0.9;
          letter-spacing: -0.075em;
        }

        .hero-title-small,
        .hero-title-large {
          display: block;
        }

        .hero-title-small {
          color: rgba(241, 231, 252, 0.56);
        }

        .hero-title-large {
          color: transparent;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #edd5ff 34%,
            #c154f7 67%,
            #8068ff 100%
          );
          background-size: 210% auto;
          background-clip: text;
          -webkit-background-clip: text;
          animation: heroGradient 8s linear infinite;
        }

        .title-glow {
          color: #c154f7;
          text-shadow:
            0 0 15px rgba(193, 84, 247, 0.9),
            0 0 40px rgba(106, 0, 255, 0.6);
          animation: titleGlow 2.7s ease-in-out infinite;
        }

        .projects-introduction {
          max-width: 680px;
          margin: 32px 0 0;
          color: rgba(217, 203, 231, 0.59);
          font-size: clamp(1rem, 1.4vw, 1.12rem);
          line-height: 1.85;
          letter-spacing: -0.02em;
        }

        .projects-introduction strong {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 550;
        }

        .projects-summary {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 38px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .summary-item strong {
          font-size: 20px;
          font-weight: 580;
          letter-spacing: -0.04em;
        }

        .summary-item span {
          color: rgba(255, 255, 255, 0.32);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .summary-divider {
          width: 1px;
          height: 35px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
        }

        .explore-projects {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: 38px;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        .explore-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 41px;
          height: 41px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;
          color: white;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            background 300ms ease;
          animation: exploreFloating 2.7s ease-in-out infinite;
        }

        .explore-projects:hover .explore-icon {
          transform: translateY(5px);
          border-color: rgba(193, 84, 247, 0.5);
          background: rgba(193, 84, 247, 0.13);
        }

        .projects-hero-visual {
          position: relative;
          min-height: 690px;
        }

        .visual-parallax-container {
          position: absolute;
          inset: 0;
          transform: translate3d(
            var(--scene-x),
            var(--scene-y),
            0
          );
          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .project-orbital-system {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(41vw, 630px);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
        }

        .orbital-aura {
          position: absolute;
          inset: 11%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(139, 43, 255, 0.25),
            rgba(106, 0, 255, 0.08) 43%,
            transparent 72%
          );
          filter: blur(25px);
          animation: orbitalAura 5.5s ease-in-out infinite;
        }

        .project-orbit {
          position: absolute;
          border: 1px solid rgba(218, 190, 255, 0.15);
          border-radius: 50%;
          box-shadow:
            inset 0 0 35px rgba(106, 0, 255, 0.025),
            0 0 30px rgba(106, 0, 255, 0.035);
        }

        .orbit-external {
          inset: 1%;
          animation: orbitExternal 25s linear infinite;
        }

        .orbit-middle {
          inset: 14%;
          border-color: rgba(193, 84, 247, 0.21);
          animation: orbitMiddle 18s linear infinite reverse;
        }

        .orbit-internal {
          inset: 29%;
          border-color: rgba(138, 46, 255, 0.24);
          animation: orbitInternal 11s linear infinite;
        }

        .orbit-diagonal-one {
          top: 50%;
          left: 50%;
          width: 79%;
          height: 28%;
          transform: translate(-50%, -50%) rotate(66deg);
          animation: diagonalOne 14s ease-in-out infinite alternate;
        }

        .orbit-diagonal-two {
          top: 50%;
          left: 50%;
          width: 68%;
          height: 24%;
          transform: translate(-50%, -50%) rotate(-59deg);
          animation: diagonalTwo 17s ease-in-out infinite alternate;
        }

        .orbit-light {
          position: absolute;
          top: 50%;
          left: -5px;
          width: 10px;
          height: 10px;
          transform: translateY(-50%);
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          background: #c154f7;
          box-shadow:
            0 0 12px #c154f7,
            0 0 28px rgba(193, 84, 247, 0.75);
        }

        .orbit-light-two {
          width: 8px;
          height: 8px;
          background: white;
        }

        .orbit-light-three {
          width: 7px;
          height: 7px;
          background: #9571ff;
        }

        .project-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 230px;
          height: 230px;
          transform: translate(-50%, -50%);
          animation: projectCoreFloat 5s ease-in-out infinite;
        }

        .project-core-radiation {
          position: absolute;
          inset: -22%;
          border: 1px solid rgba(193, 84, 247, 0.12);
          border-radius: 50%;
        }

        .radiation-one {
          animation: coreRadiation 3.5s ease-out infinite;
        }

        .radiation-two {
          animation: coreRadiation 3.5s 1.75s ease-out infinite;
        }

        .project-core-border {
          position: absolute;
          inset: 0;
          padding: 1px;
          overflow: hidden;
          border-radius: 50%;
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
          animation: coreBorderRotation 15s linear infinite;
        }

        .project-core-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 32% 22%,
              rgba(255, 255, 255, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at center,
              rgba(37, 7, 61, 0.99),
              rgba(7, 2, 13, 1)
            );
          animation: coreContentRotation 15s linear infinite reverse;
        }

        .project-core-content::before {
          content: "";
          position: absolute;
          inset: 15%;
          border: 1px dashed rgba(193, 84, 247, 0.21);
          border-radius: 50%;
          animation: innerRingRotation 18s linear infinite;
        }

        .core-project-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          margin-bottom: 9px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 17px;
          color: white;
          background: rgba(255, 255, 255, 0.06);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 14px 30px rgba(0, 0, 0, 0.25);
          font-size: 22px;
        }

        .core-overline {
          position: relative;
          z-index: 2;
          color: rgba(222, 200, 244, 0.4);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .project-core strong {
          position: relative;
          z-index: 2;
          margin-top: 2px;
          font-size: 35px;
          font-weight: 580;
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .core-caption {
          position: relative;
          z-index: 2;
          margin-top: 7px;
          color: rgba(224, 208, 239, 0.4);
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .core-loader {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 4px;
          margin-top: 14px;
        }

        .core-loader span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c154f7;
          box-shadow: 0 0 8px rgba(193, 84, 247, 0.8);
          animation: loaderDot 1.4s ease-in-out infinite;
        }

        .core-loader span:nth-child(2) {
          animation-delay: 0.18s;
        }

        .core-loader span:nth-child(3) {
          animation-delay: 0.36s;
        }

        .core-loader span:nth-child(4) {
          animation-delay: 0.54s;
        }

        .orbital-information {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          color: rgba(235, 218, 250, 0.66);
          background: rgba(10, 3, 18, 0.68);
          box-shadow:
            0 16px 45px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(15px);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .orbital-information-icon {
          display: inline-flex;
          color: #c154f7;
          font-size: 12px;
        }

        .orbital-node-ui {
          top: 10%;
          left: 9%;
          animation: nodeFloatOne 6s ease-in-out infinite;
        }

        .orbital-node-api {
          top: 17%;
          right: 8%;
          animation: nodeFloatTwo 7.5s -2s ease-in-out infinite;
        }

        .orbital-node-data {
          bottom: 13%;
          right: 13%;
          animation: nodeFloatOne 8s -4s ease-in-out infinite;
        }

        .orbital-node-system {
          bottom: 10%;
          left: 15%;
          animation: nodeFloatTwo 6.7s -3s ease-in-out infinite;
        }

        .floating-project-window {
          position: absolute;
          right: -2%;
          bottom: 18%;
          z-index: 7;
          width: 195px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 17px;
          background: rgba(7, 2, 13, 0.82);
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(20px);
          animation: projectWindowFloat 7s ease-in-out infinite;
        }

        .floating-window-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 11px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .floating-window-header div {
          display: flex;
          gap: 4px;
        }

        .floating-window-header div span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .floating-window-header div span:nth-child(1) {
          background: #ff6c86;
        }

        .floating-window-header div span:nth-child(2) {
          background: #ffd166;
        }

        .floating-window-header div span:nth-child(3) {
          background: #65e5a5;
        }

        .floating-window-header p {
          margin: 0;
          color: rgba(255, 255, 255, 0.28);
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .floating-window-content {
          padding: 14px;
          color: rgba(255, 255, 255, 0.58);
          font-family: Consolas, Monaco, monospace;
          font-size: 8px;
          line-height: 1.75;
        }

        .floating-window-content p {
          margin: 0;
        }

        .code-indentation {
          padding-left: 13px;
        }

        .syntax-purple {
          color: #d996ff;
        }

        .syntax-blue {
          color: #8ebaff;
        }

        .syntax-green {
          color: #6fe6b1;
        }

        .syntax-orange {
          color: #f5b77e;
        }

        .floating-window-footer {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.25);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .floating-window-footer span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #62e5a4;
          box-shadow: 0 0 8px #62e5a4;
        }

        .floating-status-card {
          position: absolute;
          top: 21%;
          left: -1%;
          z-index: 7;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 170px;
          padding: 11px 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          background: rgba(16, 4, 28, 0.72);
          box-shadow:
            0 20px 55px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(17px);
          animation: statusCardFloat 6.5s -2s ease-in-out infinite;
        }

        .status-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border: 1px solid rgba(193, 84, 247, 0.22);
          border-radius: 11px;
          color: #dcaeff;
          background: rgba(193, 84, 247, 0.1);
        }

        .floating-status-card > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .floating-status-card > div span {
          color: rgba(255, 255, 255, 0.34);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .floating-status-card strong {
          font-size: 9px;
          font-weight: 600;
        }

        .status-light {
          width: 6px;
          height: 6px;
          margin-left: auto;
          border-radius: 50%;
          background: #63e7a6;
          box-shadow: 0 0 10px #63e7a6;
        }

        .section-transition {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 16px;
          width: min(1300px, calc(100% - 72px));
          margin: 0 auto;
          padding: 1rem 0 5rem;
        }

        .transition-number,
        .transition-label {
          color: rgba(255, 255, 255, 0.23);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .transition-line {
          position: relative;
          flex: 1;
          height: 1px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.07);
        }

        .transition-line span {
          position: absolute;
          top: 0;
          left: -25%;
          width: 25%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #c154f7,
            white
          );
          animation: transitionMovement 4s ease-in-out infinite;
        }

        .project-list {
          position: relative;
          z-index: 4;
          width: min(1180px, calc(100% - 72px));
          margin: 0 auto;
          padding: 5rem 0 13rem;
        }

        .project-list-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 6rem;
        }

        .list-overline {
          display: block;
          margin-bottom: 13px;
          color: rgba(206, 176, 235, 0.4);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .project-list-heading h2 {
          margin: 0;
          font-size: clamp(3.4rem, 6vw, 6rem);
          font-weight: 560;
          line-height: 0.95;
          letter-spacing: -0.065em;
        }

        .project-list-heading h2 span {
          color: rgba(238, 220, 255, 0.42);
        }

        .project-list-heading p {
          max-width: 420px;
          margin: 0;
          color: rgba(218, 204, 232, 0.48);
          font-size: 14px;
          line-height: 1.8;
        }

        .project-stack {
          position: relative;
        }

        .project-entry {
          position: relative;
        }

        .project-halo {
          position: absolute;
          inset: 10% 8% -5%;
          z-index: -1;
          border-radius: 50%;
          filter: blur(95px);
          opacity: 0.19;
          pointer-events: none;
        }

        .halo-violet {
          background: #6a00ff;
        }

        .halo-purple {
          background: #c154f7;
        }

        .halo-blue {
          background: #536dfe;
        }

        .halo-pink {
          background: #d74ca2;
        }

        .halo-orange {
          background: #d17743;
        }

        .halo-red {
          background: #a92850;
        }

        .project-entry-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
          padding: 0 11px;
        }

        .project-number-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .project-number {
          color: rgba(255, 255, 255, 0.42);
          font-family: monospace;
          font-size: 11px;
        }

        .project-number-line {
          width: 47px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(193, 84, 247, 0.8),
            transparent
          );
        }

        .project-entry-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          color: rgba(255, 255, 255, 0.23);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .project-card-frame {
          position: relative;
          padding: 1px;
          overflow: hidden;
          border-radius: 25px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12),
            rgba(193, 84, 247, 0.34),
            rgba(255, 255, 255, 0.06)
          );
          box-shadow:
            0 35px 110px rgba(0, 0, 0, 0.53),
            0 0 65px rgba(106, 0, 255, 0.08);
        }

        .project-frame-light {
          position: absolute;
          top: -130%;
          left: -15%;
          z-index: 3;
          width: 25%;
          height: 350%;
          transform: rotate(22deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.12),
            transparent
          );
          pointer-events: none;
          animation: frameLight 7s ease-in-out infinite;
        }

        .project-card-frame :global(article) {
          border-radius: 24px;
          border-color: rgba(255, 255, 255, 0.08);
        }

        .project-bottom-data {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 12px 0;
          color: rgba(255, 255, 255, 0.18);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .project-bottom-data div {
          display: flex;
          align-items: center;
          gap: 7px;
          text-transform: uppercase;
        }

        .bottom-data-light {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #63e6a5;
          box-shadow: 0 0 8px #63e6a5;
        }

        .projects-footer {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          padding: 12rem 1.5rem 10rem;
          text-align: center;
        }

        .projects-footer::before {
          content: "";
          position: absolute;
          top: 27%;
          left: 50%;
          z-index: -1;
          width: 620px;
          height: 300px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(106, 0, 255, 0.22);
          filter: blur(130px);
        }

        .footer-orbit {
          position: relative;
          width: 82px;
          height: 82px;
          margin-bottom: 28px;
          border: 1px solid rgba(193, 84, 247, 0.25);
          border-radius: 50%;
          animation: footerOrbit 10s linear infinite;
        }

        .footer-orbit div {
          position: absolute;
          inset: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .footer-orbit span {
          position: absolute;
          top: 50%;
          left: -4px;
          width: 8px;
          height: 8px;
          transform: translateY(-50%);
          border-radius: 50%;
          background: #c154f7;
          box-shadow:
            0 0 10px #c154f7,
            0 0 25px rgba(193, 84, 247, 0.7);
        }

        .footer-overline {
          color: rgba(220, 197, 241, 0.4);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .projects-footer h2 {
          margin: 18px 0 0;
          font-size: clamp(3.7rem, 7vw, 7rem);
          font-weight: 560;
          line-height: 0.95;
          letter-spacing: -0.07em;
        }

        .projects-footer h2 span {
          color: #c154f7;
          text-shadow: 0 0 30px rgba(193, 84, 247, 0.6);
        }

        .projects-footer p {
          max-width: 480px;
          margin: 25px 0 0;
          color: rgba(218, 204, 232, 0.5);
          font-size: 15px;
          line-height: 1.8;
        }

        .footer-contact {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
          margin-top: 33px;
          padding: 7px 7px 7px 20px;
          border: 1px solid rgba(193, 84, 247, 0.34);
          border-radius: 999px;
          color: white;
          background: linear-gradient(
            135deg,
            rgba(193, 84, 247, 0.2),
            rgba(106, 0, 255, 0.09)
          );
          box-shadow:
            0 20px 60px rgba(106, 0, 255, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.13);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .footer-contact:hover {
          transform: translateY(-4px);
          border-color: rgba(219, 166, 255, 0.6);
          box-shadow:
            0 27px 75px rgba(106, 0, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .footer-contact-shine {
          position: absolute;
          top: -100%;
          left: -40%;
          width: 30%;
          height: 300%;
          transform: rotate(22deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: footerButtonShine 4.8s ease-in-out infinite;
        }

        .footer-contact > span:not(.footer-contact-shine) {
          position: relative;
          z-index: 2;
        }

        .footer-contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: #160423;
          background: white;
          font-size: 17px;
          transition: transform 300ms ease;
        }

        .footer-contact:hover .footer-contact-icon {
          transform: rotate(12deg) scale(1.05);
        }

        @keyframes auroraPrimary {
          from {
            transform: translate3d(-40px, -30px, 0) rotate(-8deg)
              scale(0.95);
          }

          to {
            transform: translate3d(80px, 70px, 0) rotate(12deg)
              scale(1.13);
          }
        }

        @keyframes auroraSecondary {
          from {
            transform: translate3d(-50px, 30px, 0) scale(1);
          }

          to {
            transform: translate3d(100px, -70px, 0) scale(1.2);
          }
        }

        @keyframes auroraThird {
          from {
            transform: translate3d(40px, -70px, 0);
          }

          to {
            transform: translate3d(-80px, 80px, 0) scale(1.16);
          }
        }

        @keyframes perspectiveGrid {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 58px;
          }
        }

        @keyframes scanPage {
          from {
            transform: translateY(-20vh);
          }

          to {
            transform: translateY(540vh);
          }
        }

        @keyframes particleMovement {
          0%,
          100% {
            opacity: 0.14;
            transform: translate3d(0, 0, 0) scale(0.75);
          }

          45% {
            opacity: 0.92;
          }

          50% {
            transform: translate3d(
                var(--drift-x),
                var(--drift-y),
                0
              )
              scale(1.3);
          }
        }

        @keyframes navigationLine {
          from {
            top: -45%;
          }

          to {
            top: 115%;
          }
        }

        @keyframes eyebrowPulse {
          from {
            opacity: 0.7;
            transform: scale(1);
          }

          to {
            opacity: 0;
            transform: scale(2.8);
          }
        }

        @keyframes heroGradient {
          to {
            background-position: 210% center;
          }
        }

        @keyframes titleGlow {
          0%,
          100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes exploreFloating {
          0%,
          100% {
            transform: translateY(-3px);
          }

          50% {
            transform: translateY(5px);
          }
        }

        @keyframes orbitalAura {
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

        @keyframes orbitExternal {
          from {
            transform: rotateX(68deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes orbitMiddle {
          from {
            transform: rotateY(66deg) rotateZ(0deg);
          }

          to {
            transform: rotateY(66deg) rotateZ(360deg);
          }
        }

        @keyframes orbitInternal {
          from {
            transform: rotateX(70deg) rotateY(32deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(70deg) rotateY(32deg)
              rotateZ(360deg);
          }
        }

        @keyframes diagonalOne {
          from {
            transform: translate(-50%, -50%) rotate(61deg)
              scale(0.94);
          }

          to {
            transform: translate(-50%, -50%) rotate(72deg)
              scale(1.05);
          }
        }

        @keyframes diagonalTwo {
          from {
            transform: translate(-50%, -50%) rotate(-66deg)
              scale(1.05);
          }

          to {
            transform: translate(-50%, -50%) rotate(-54deg)
              scale(0.94);
          }
        }

        @keyframes projectCoreFloat {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(-6px);
          }

          50% {
            transform: translate(-50%, -50%) translateY(8px);
          }
        }

        @keyframes coreRadiation {
          from {
            opacity: 0.65;
            transform: scale(0.65);
          }

          to {
            opacity: 0;
            transform: scale(1.4);
          }
        }

        @keyframes coreBorderRotation {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes coreContentRotation {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes innerRingRotation {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loaderDot {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }

          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        @keyframes nodeFloatOne {
          0%,
          100% {
            transform: translate3d(0, -5px, 0);
          }

          50% {
            transform: translate3d(9px, 8px, 0);
          }
        }

        @keyframes nodeFloatTwo {
          0%,
          100% {
            transform: translate3d(3px, 6px, 0);
          }

          50% {
            transform: translate3d(-9px, -7px, 0);
          }
        }

        @keyframes projectWindowFloat {
          0%,
          100% {
            transform: translate3d(0, 5px, 0) rotate(1deg);
          }

          50% {
            transform: translate3d(-8px, -8px, 0) rotate(-1deg);
          }
        }

        @keyframes statusCardFloat {
          0%,
          100% {
            transform: translate3d(-3px, -6px, 0) rotate(-1deg);
          }

          50% {
            transform: translate3d(8px, 9px, 0) rotate(1deg);
          }
        }

        @keyframes transitionMovement {
          from {
            left: -25%;
          }

          to {
            left: 115%;
          }
        }

        @keyframes frameLight {
          0%,
          55% {
            left: -30%;
          }

          80%,
          100% {
            left: 130%;
          }
        }

        @keyframes footerOrbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes footerButtonShine {
          0%,
          55% {
            left: -40%;
          }

          80%,
          100% {
            left: 125%;
          }
        }

        @media (max-width: 1100px) {
          .projects-hero {
            grid-template-columns: minmax(0, 1fr) minmax(390px, 0.8fr);
            width: min(1200px, calc(100% - 52px));
          }

          .project-orbital-system {
            width: min(47vw, 560px);
          }

          .project-list {
            width: min(1100px, calc(100% - 52px));
          }
        }

        @media (max-width: 930px) {
          .projects-hero {
            grid-template-columns: 1fr;
            gap: 1rem;
            width: min(760px, calc(100% - 36px));
            padding-top: 8rem;
            padding-bottom: 5rem;
          }

          .projects-hero h1 {
            font-size: clamp(4rem, 14vw, 6.5rem);
          }

          .projects-hero-visual {
            min-height: 630px;
          }

          .project-orbital-system {
            width: min(88vw, 590px);
          }

          .side-navigation {
            display: none;
          }

          .project-list-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 1.7rem;
          }

          .project-list-heading p {
            max-width: 580px;
          }
        }

        @media (max-width: 650px) {
          .projects-hero {
            width: min(100% - 28px, 590px);
            padding-top: 7rem;
          }

          .projects-eyebrow {
            margin-bottom: 23px;
            padding: 9px 12px;
            font-size: 8px;
          }

          .projects-hero h1 {
            font-size: clamp(3.5rem, 16.5vw, 5.1rem);
          }

          .projects-introduction {
            margin-top: 26px;
            font-size: 15px;
            line-height: 1.75;
          }

          .projects-summary {
            flex-wrap: wrap;
            gap: 17px;
            margin-top: 30px;
          }

          .summary-divider {
            height: 29px;
          }

          .summary-item strong {
            font-size: 17px;
          }

          .summary-item span {
            font-size: 6.5px;
          }

          .projects-hero-visual {
            min-height: 510px;
          }

          .project-orbital-system {
            width: min(108vw, 520px);
          }

          .project-core {
            width: 185px;
            height: 185px;
          }

          .core-project-icon {
            width: 43px;
            height: 43px;
            font-size: 19px;
          }

          .project-core strong {
            font-size: 27px;
          }

          .floating-project-window {
            right: 0;
            bottom: 11%;
            width: 155px;
          }

          .floating-window-content {
            padding: 11px;
            font-size: 6.5px;
          }

          .floating-status-card {
            top: 16%;
            left: 0;
            min-width: 145px;
            padding: 9px 10px;
          }

          .status-icon {
            width: 31px;
            height: 31px;
          }

          .orbital-information {
            padding: 6px 8px;
            font-size: 6px;
          }

          .section-transition {
            width: calc(100% - 28px);
            padding-bottom: 3rem;
          }

          .project-list {
            width: calc(100% - 28px);
            padding-top: 3rem;
          }

          .project-list-heading {
            margin-bottom: 4rem;
          }

          .project-list-heading h2 {
            font-size: clamp(3rem, 14vw, 4.5rem);
          }

          .project-entry {
            top: 64px;
          }

          .project-entry-meta {
            gap: 10px;
            font-size: 6px;
          }

          .project-card-frame {
            border-radius: 22px;
          }

          .project-card-frame :global(article) {
            border-radius: 21px;
          }

          .project-bottom-data {
            font-size: 6px;
          }

          .projects-footer {
            padding-top: 9rem;
          }

          .projects-footer h2 {
            font-size: clamp(3.4rem, 15vw, 5rem);
          }
        }

        @media (max-width: 430px) {
          .projects-summary {
            gap: 12px;
          }

          .summary-divider {
            display: none;
          }

          .summary-item {
            width: calc(50% - 8px);
          }

          .projects-hero-visual {
            min-height: 460px;
          }

          .orbital-node-system,
          .orbital-node-data {
            display: none;
          }

          .floating-status-card {
            transform: scale(0.9);
            transform-origin: left center;
          }

          .floating-project-window {
            transform-origin: right center;
          }

          .project-entry-meta span:first-child {
            display: none;
          }

          .projects-footer {
            padding-right: 14px;
            padding-left: 14px;
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

          .visual-parallax-container {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div className="h-64 rounded-2xl bg-white/[0.06] md:col-span-6" />

        <div className="flex flex-col justify-center md:col-span-6">
          <div className="h-3 w-20 rounded bg-white/10" />
          <div className="mt-4 h-10 w-4/5 rounded bg-white/10" />
          <div className="mt-3 h-8 w-3/5 rounded bg-white/[0.07]" />

          <div className="mt-6 h-4 w-full rounded bg-white/[0.06]" />
          <div className="mt-3 h-4 w-5/6 rounded bg-white/[0.06]" />
          <div className="mt-3 h-4 w-4/6 rounded bg-white/[0.06]" />

          <div className="mt-7 flex gap-2">
            <span className="h-7 w-16 rounded-full bg-white/[0.07]" />
            <span className="h-7 w-20 rounded-full bg-white/[0.07]" />
            <span className="h-7 w-14 rounded-full bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}