"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiArrowUpRight,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiTerminal,
  FiZap,
} from "react-icons/fi";

import Malt from "../../public/icons/icon_malt.svg";
import IntroBurst from "../../component/IntroBurst";

/*
 * Particules générées de manière déterministe.
 * On évite Math.random() pour ne pas provoquer d’erreur d’hydratation Next.js.
 */
const PARTICLES = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 96}%`,
  size: 1 + (index % 3),
  duration: 8 + (index % 7) * 1.4,
  delay: -(index % 12) * 0.8,
  drift: -30 + (index % 7) * 10,
}));

const TECH_STACK = [
  "Next.js",
  "React",
  "Node.js",
  "Supabase",
  "UI Motion",
];

export default function Home() {
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

      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;

      const normalizedX = (relativeX - 0.5) * 2;
      const normalizedY = (relativeY - 0.5) * 2;

      stage.style.setProperty("--mouse-x", `${relativeX * 100}%`);
      stage.style.setProperty("--mouse-y", `${relativeY * 100}%`);

      stage.style.setProperty(
        "--visual-x",
        `${normalizedX * 14}px`
      );

      stage.style.setProperty(
        "--visual-y",
        `${normalizedY * 12}px`
      );
    });
  };

  const resetPointerPosition = () => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.style.setProperty("--mouse-x", "50%");
    stage.style.setProperty("--mouse-y", "45%");
    stage.style.setProperty("--visual-x", "0px");
    stage.style.setProperty("--visual-y", "0px");
  };

  return (
    <main
      ref={stageRef}
      className="home-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
    >
      <IntroBurst />

      {/* Arrière-plan interactif */}
      <div className="scene-background" aria-hidden="true">
        <div className="cursor-light" />

        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />

        <div className="matrix-lines" />

        <div className="particle-field">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                "--particle-duration": `${particle.duration}s`,
                "--particle-delay": `${particle.delay}s`,
                "--particle-drift": `${particle.drift}px`,
              }}
            />
          ))}
        </div>

        <div className="grid-plane" />
        <div className="scan-beam" />
        <div className="vignette" />
      </div>

      <section className="hero-shell">
        {/* Partie gauche */}
        <div className="hero-copy">
          <div className="availability-badge">
            <span className="availability-dot">
              <span className="availability-ping" />
            </span>

            <span>Disponible pour de nouveaux projets</span>
          </div>

          <div className="hero-heading">
            <span className="portfolio-index">
              Portfolio / Full-stack developer
            </span>

            <h1>
              <span className="title-line title-name">Mattéo.</span>

              <span className="title-line title-stack">
                Full Stack.
              </span>

              <span className="title-line title-control">
                Full Control.
              </span>
            </h1>
          </div>

          <p className="hero-description">
            Je transforme une idée en{" "}
            <strong>expérience numérique complète</strong> : une
            architecture solide, une interface mémorable et des
            interactions pensées dans les moindres détails.
          </p>

          <div className="hero-actions">
            <Link href="/projets" className="primary-cta">
              <span className="cta-light" />

              <span className="cta-content">
                Découvrir mes projets

                <span className="cta-icon">
                  <FiArrowUpRight />
                </span>
              </span>
            </Link>

            <div className="social-links">
              <a
                href="https://wa.me/33667727557"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Me contacter sur WhatsApp"
                className="social-link"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.linkedin.com/in/mattdev-padalino"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir mon profil LinkedIn"
                className="social-link"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.malt.fr/profile/matteopadalino"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir mon profil Malt"
                className="social-link"
              >
                <Image
                  src={Malt}
                  alt=""
                  width={20}
                  height={20}
                  className="malt-icon"
                />
              </a>

              <a
                href="https://github.com/MatteoLatoile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir mon profil GitHub"
                className="social-link"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="tech-stack">
            <span className="tech-label">Stack principale</span>

            <div className="tech-list">
              {TECH_STACK.map((technology) => (
                <span key={technology} className="tech-item">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Partie droite : système orbital */}
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-container">
            <div className="visual-background-glow" />

            <div className="orbit-stage">
              {/* Orbites */}
              <div className="orbit orbit-one">
                <span className="orbit-node orbit-node-one" />
              </div>

              <div className="orbit orbit-two">
                <span className="orbit-node orbit-node-two" />
              </div>

              <div className="orbit orbit-three">
                <span className="orbit-node orbit-node-three" />
              </div>

              <div className="orbit orbit-four">
                <span className="orbit-node orbit-node-four" />
              </div>

              {/* Lignes orbitales verticales */}
              <div className="vertical-orbit vertical-orbit-one" />
              <div className="vertical-orbit vertical-orbit-two" />

              {/* Noyau central */}
              <div className="developer-core">
                <div className="core-radiation core-radiation-one" />
                <div className="core-radiation core-radiation-two" />

                <div className="core-frame">
                  <div className="core-panel">
                    <div className="core-topline">
                      <span className="core-status-dot" />
                      Developer core
                    </div>

                    <div className="core-icon">
                      <FiTerminal />
                    </div>

                    <strong>FULL STACK</strong>

                    <span className="core-subtitle">
                      Interfaces / Systems / Data
                    </span>

                    <div className="core-bars">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments flottants */}
              <div className="floating-card floating-card-code">
                <div className="floating-icon">
                  <FiCode />
                </div>

                <div>
                  <span className="floating-label">Front-end</span>
                  <strong>UI Engineering</strong>
                </div>

                <span className="floating-value">01</span>
              </div>

              <div className="floating-card floating-card-data">
                <div className="floating-icon">
                  <FiDatabase />
                </div>

                <div>
                  <span className="floating-label">Back-end</span>
                  <strong>Data & API</strong>
                </div>

                <span className="floating-value">02</span>
              </div>

              <div className="floating-card floating-card-system">
                <div className="floating-icon">
                  <FiLayers />
                </div>

                <div>
                  <span className="floating-label">Architecture</span>
                  <strong>Scalable systems</strong>
                </div>

                <span className="floating-value">03</span>
              </div>

              {/* Petites capsules */}
              <div className="micro-chip micro-chip-performance">
                <FiZap />
                Performance
              </div>

              <div className="micro-chip micro-chip-logic">
                <FiCpu />
                Logic
              </div>

              {/* Fenêtre de code */}
              <div className="code-window">
                <div className="code-window-header">
                  <div className="window-controls">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span>matteo.dev</span>
                </div>

                <div className="code-content">
                  <p>
                    <span className="code-purple">const</span>{" "}
                    <span className="code-blue">developer</span>{" "}
                    <span className="code-white">=</span>{" "}
                    <span className="code-green">{"{"}</span>
                  </p>

                  <p className="code-indent">
                    craft: <span className="code-orange">"premium"</span>,
                  </p>

                  <p className="code-indent">
                    control: <span className="code-purple">true</span>,
                  </p>

                  <p className="code-indent">
                    limits: <span className="code-purple">null</span>
                  </p>

                  <p>
                    <span className="code-green">{"}"}</span>;
                  </p>
                </div>

                <div className="code-footer">
                  <span className="terminal-cursor" />
                  System ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indication de défilement */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-text">Scroll to explore</span>

        <span className="scroll-line">
          <span />
        </span>
      </div>

      <style jsx global>{`
        html {
          background: #05020a;
        }

        body {
          margin: 0;
          background: #05020a;
        }
      `}</style>

      <style jsx>{`
        .home-stage {
          --mouse-x: 50%;
          --mouse-y: 45%;
          --visual-x: 0px;
          --visual-y: 0px;

          position: relative;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          color: white;
          background:
            radial-gradient(
              circle at 70% 42%,
              rgba(106, 0, 255, 0.12),
              transparent 34%
            ),
            radial-gradient(
              circle at 18% 15%,
              rgba(193, 84, 247, 0.09),
              transparent 28%
            ),
            linear-gradient(135deg, #05020a 0%, #08030f 48%, #030106 100%);
        }

        .scene-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .cursor-light {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle 420px at var(--mouse-x) var(--mouse-y),
            rgba(138, 46, 255, 0.16),
            rgba(193, 84, 247, 0.045) 38%,
            transparent 72%
          );
          transition: background 120ms linear;
        }

        .matrix-lines {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(
              90deg,
              transparent 49.9%,
              rgba(255, 255, 255, 0.035) 50%,
              transparent 50.1%
            ),
            linear-gradient(
              rgba(255, 255, 255, 0.018) 1px,
              transparent 1px
            );
          background-size: 180px 100%, 100% 130px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 74%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 74%,
            transparent
          );
        }

        .aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(95px);
          opacity: 0.28;
          will-change: transform;
        }

        .aurora-one {
          top: -18%;
          right: 3%;
          width: 560px;
          height: 420px;
          background: rgba(106, 0, 255, 0.52);
          animation: auroraOne 15s ease-in-out infinite alternate;
        }

        .aurora-two {
          bottom: -30%;
          left: 8%;
          width: 600px;
          height: 500px;
          background: rgba(193, 84, 247, 0.28);
          animation: auroraTwo 18s ease-in-out infinite alternate;
        }

        .aurora-three {
          top: 40%;
          left: 45%;
          width: 360px;
          height: 360px;
          background: rgba(83, 45, 255, 0.22);
          animation: auroraThree 12s ease-in-out infinite alternate;
        }

        .particle-field {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: rgba(238, 222, 255, 0.92);
          box-shadow:
            0 0 7px rgba(193, 84, 247, 0.9),
            0 0 16px rgba(106, 0, 255, 0.55);
          animation: particleFloat var(--particle-duration) ease-in-out
            var(--particle-delay) infinite;
        }

        .grid-plane {
          position: absolute;
          left: 50%;
          bottom: -34%;
          width: 150%;
          height: 77%;
          transform: translateX(-50%) perspective(700px) rotateX(66deg);
          transform-origin: center top;
          background-image:
            linear-gradient(
              rgba(151, 77, 255, 0.16) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(151, 77, 255, 0.16) 1px,
              transparent 1px
            );
          background-size: 54px 54px;
          mask-image: linear-gradient(
            to bottom,
            transparent 2%,
            black 30%,
            transparent 92%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 2%,
            black 30%,
            transparent 92%
          );
          animation: gridMovement 13s linear infinite;
        }

        .scan-beam {
          position: absolute;
          top: -20%;
          left: 0;
          width: 100%;
          height: 18%;
          opacity: 0.28;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(193, 84, 247, 0.08),
            rgba(193, 84, 247, 0.16),
            transparent
          );
          animation: scanBeam 12s linear infinite;
        }

        .vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 180px 50px rgba(0, 0, 0, 0.56);
        }

        .hero-shell {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: minmax(0, 1.03fr) minmax(430px, 0.97fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 6rem);
          width: min(1440px, calc(100% - 64px));
          min-height: 100svh;
          margin: 0 auto;
          padding: 7rem 0 6rem;
        }

        .hero-copy {
          position: relative;
          z-index: 5;
          max-width: 780px;
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 30px;
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          color: rgba(242, 231, 255, 0.72);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.075),
              rgba(255, 255, 255, 0.025)
            );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 18px 60px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(14px);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .availability-dot {
          position: relative;
          display: inline-flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #63f5ad;
          box-shadow: 0 0 14px rgba(99, 245, 173, 0.95);
        }

        .availability-ping {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: #63f5ad;
          animation: availabilityPing 1.8s ease-out infinite;
        }

        .portfolio-index {
          display: block;
          margin-bottom: 17px;
          color: rgba(210, 180, 245, 0.46);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.23em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          font-size: clamp(4rem, 7.2vw, 7.4rem);
          font-weight: 580;
          line-height: 0.87;
          letter-spacing: -0.075em;
        }

        .title-line {
          display: block;
          width: fit-content;
        }

        .title-name {
          color: #ffffff;
          text-shadow: 0 15px 70px rgba(255, 255, 255, 0.07);
        }

        .title-stack {
          color: rgba(242, 232, 255, 0.66);
        }

        .title-control {
          position: relative;
          padding-right: 10px;
          color: transparent;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #e9c8ff 35%,
            #c154f7 68%,
            #8662ff 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          animation: titleGradient 7s linear infinite;
        }

        .title-control::after {
          content: "";
          position: absolute;
          right: -13px;
          bottom: 8%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #c154f7;
          box-shadow:
            0 0 14px #c154f7,
            0 0 28px rgba(193, 84, 247, 0.65);
          animation: titleDot 2.5s ease-in-out infinite;
        }

        .hero-description {
          max-width: 650px;
          margin: 34px 0 0;
          color: rgba(214, 204, 227, 0.62);
          font-size: clamp(1rem, 1.4vw, 1.12rem);
          line-height: 1.85;
          letter-spacing: -0.025em;
        }

        .hero-description strong {
          color: rgba(255, 255, 255, 0.92);
          font-weight: 550;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-top: 35px;
        }

        .primary-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          padding: 6px;
          border: 1px solid rgba(220, 180, 255, 0.24);
          border-radius: 999px;
          color: white;
          text-decoration: none;
          background:
            linear-gradient(
              135deg,
              rgba(193, 84, 247, 0.23),
              rgba(106, 0, 255, 0.1)
            );
          box-shadow:
            0 15px 45px rgba(106, 0, 255, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .primary-cta:hover {
          transform: translateY(-3px);
          border-color: rgba(222, 183, 255, 0.48);
          box-shadow:
            0 22px 65px rgba(106, 0, 255, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .cta-light {
          position: absolute;
          top: -100%;
          left: -35%;
          width: 30%;
          height: 300%;
          transform: rotate(22deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.33),
            transparent
          );
          animation: buttonShine 4.8s ease-in-out infinite;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 8px 8px 8px 17px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.015em;
        }

        .cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 37px;
          height: 37px;
          border-radius: 50%;
          color: #160324;
          background: white;
          font-size: 18px;
          transition: transform 300ms ease;
        }

        .primary-cta:hover .cta-icon {
          transform: rotate(45deg);
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .social-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 43px;
          height: 43px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: rgba(255, 255, 255, 0.72);
          background: rgba(255, 255, 255, 0.045);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          font-size: 19px;
          transition:
            transform 280ms ease,
            color 280ms ease,
            border-color 280ms ease,
            background 280ms ease,
            box-shadow 280ms ease;
        }

        .social-link::before {
          content: "";
          position: absolute;
          inset: auto 10% -50%;
          height: 50%;
          border-radius: 50%;
          background: #c154f7;
          filter: blur(14px);
          opacity: 0;
          transition: opacity 280ms ease;
        }

        .social-link:hover {
          transform: translateY(-5px) rotate(-3deg);
          color: white;
          border-color: rgba(193, 84, 247, 0.45);
          background: rgba(193, 84, 247, 0.12);
          box-shadow: 0 15px 40px rgba(106, 0, 255, 0.18);
        }

        .social-link:hover::before {
          opacity: 0.65;
        }

        .social-link :global(svg),
        .social-link :global(img) {
          position: relative;
          z-index: 2;
        }

        .social-link :global(.malt-icon) {
          filter: brightness(0) invert(1);
          opacity: 0.76;
        }

        .tech-stack {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 38px;
        }

        .tech-label {
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-item {
          padding: 7px 11px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 999px;
          color: rgba(237, 224, 250, 0.54);
          background: rgba(255, 255, 255, 0.025);
          font-size: 10px;
          letter-spacing: 0.035em;
          transition:
            color 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .tech-item:hover {
          color: white;
          border-color: rgba(193, 84, 247, 0.26);
          background: rgba(193, 84, 247, 0.07);
        }

        .hero-visual {
          position: relative;
          min-height: 690px;
        }

        .visual-container {
          position: absolute;
          inset: 0;
          transform: translate3d(
            var(--visual-x),
            var(--visual-y),
            0
          );
          transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .visual-background-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 75%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(149, 48, 255, 0.22),
            rgba(106, 0, 255, 0.075) 42%,
            transparent 70%
          );
          filter: blur(22px);
          animation: visualGlow 5s ease-in-out infinite;
        }

        .orbit-stage {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(40vw, 610px);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(217, 187, 255, 0.15);
          border-radius: 50%;
          box-shadow:
            inset 0 0 35px rgba(106, 0, 255, 0.025),
            0 0 25px rgba(106, 0, 255, 0.035);
          will-change: transform;
        }

        .orbit-one {
          inset: 3%;
          animation: orbitOne 23s linear infinite;
        }

        .orbit-two {
          inset: 14%;
          border-color: rgba(193, 84, 247, 0.2);
          animation: orbitTwo 17s linear infinite reverse;
        }

        .orbit-three {
          inset: 25%;
          border-color: rgba(138, 46, 255, 0.22);
          animation: orbitThree 12s linear infinite;
        }

        .orbit-four {
          inset: 36%;
          border-color: rgba(255, 255, 255, 0.14);
          animation: orbitFour 8s linear infinite reverse;
        }

        .orbit-node {
          position: absolute;
          top: 50%;
          left: -5px;
          width: 10px;
          height: 10px;
          transform: translateY(-50%);
          border: 2px solid rgba(255, 255, 255, 0.88);
          border-radius: 50%;
          background: #8a2eff;
          box-shadow:
            0 0 12px #c154f7,
            0 0 28px rgba(193, 84, 247, 0.8);
        }

        .orbit-node-two {
          width: 8px;
          height: 8px;
          background: #ffffff;
          box-shadow:
            0 0 10px white,
            0 0 24px rgba(193, 84, 247, 0.75);
        }

        .orbit-node-three {
          width: 7px;
          height: 7px;
          background: #ae72ff;
        }

        .orbit-node-four {
          width: 6px;
          height: 6px;
          background: #ffffff;
        }

        .vertical-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 32%;
          border: 1px solid rgba(193, 84, 247, 0.12);
          border-radius: 50%;
        }

        .vertical-orbit-one {
          transform: translate(-50%, -50%) rotate(68deg);
          animation: verticalOrbit 18s ease-in-out infinite alternate;
        }

        .vertical-orbit-two {
          width: 67%;
          height: 26%;
          transform: translate(-50%, -50%) rotate(-63deg);
          animation: verticalOrbitTwo 14s ease-in-out infinite alternate;
        }

        .developer-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 230px;
          height: 230px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: coreLevitation 5s ease-in-out infinite;
        }

        .core-radiation {
          position: absolute;
          inset: -18%;
          border: 1px solid rgba(193, 84, 247, 0.1);
          border-radius: 50%;
        }

        .core-radiation-one {
          animation: radiationPulse 3.2s ease-out infinite;
        }

        .core-radiation-two {
          animation: radiationPulse 3.2s 1.6s ease-out infinite;
        }

        .core-frame {
          position: absolute;
          inset: 0;
          padding: 1px;
          overflow: hidden;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.15),
            #8a2eff,
            rgba(255, 255, 255, 0.1),
            #c154f7,
            rgba(255, 255, 255, 0.15)
          );
          box-shadow:
            0 0 80px rgba(106, 0, 255, 0.26),
            0 30px 80px rgba(0, 0, 0, 0.55);
          animation: coreFrameRotate 14s linear infinite;
        }

        .core-panel {
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
              circle at 35% 25%,
              rgba(255, 255, 255, 0.12),
              transparent 32%
            ),
            radial-gradient(
              circle at center,
              rgba(39, 7, 65, 0.98),
              rgba(8, 2, 16, 0.99)
            );
          animation: coreContentCounterRotate 14s linear infinite reverse;
        }

        .core-panel::before {
          content: "";
          position: absolute;
          inset: 16%;
          border: 1px dashed rgba(193, 84, 247, 0.22);
          border-radius: 50%;
          animation: dashedRing 20s linear infinite;
        }

        .core-panel::after {
          content: "";
          position: absolute;
          left: 12%;
          right: 12%;
          top: 50%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(193, 84, 247, 0.35),
            transparent
          );
        }

        .core-topline {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          color: rgba(224, 200, 247, 0.48);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .core-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #65f5af;
          box-shadow: 0 0 8px #65f5af;
        }

        .core-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 53px;
          height: 53px;
          margin-bottom: 10px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 18px;
          color: white;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.1),
              rgba(193, 84, 247, 0.06)
            );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 10px 30px rgba(0, 0, 0, 0.25);
          font-size: 24px;
        }

        .core-panel strong {
          position: relative;
          z-index: 2;
          font-size: 17px;
          letter-spacing: 0.06em;
        }

        .core-subtitle {
          position: relative;
          z-index: 2;
          margin-top: 5px;
          color: rgba(224, 209, 239, 0.42);
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .core-bars {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 14px;
          margin-top: 12px;
        }

        .core-bars span {
          width: 3px;
          border-radius: 4px;
          background: linear-gradient(to top, #6a00ff, #dd9aff);
          animation: coreBar 1.5s ease-in-out infinite alternate;
        }

        .core-bars span:nth-child(1) {
          height: 5px;
        }

        .core-bars span:nth-child(2) {
          height: 11px;
          animation-delay: -0.8s;
        }

        .core-bars span:nth-child(3) {
          height: 8px;
          animation-delay: -0.3s;
        }

        .core-bars span:nth-child(4) {
          height: 14px;
          animation-delay: -1.1s;
        }

        .core-bars span:nth-child(5) {
          height: 7px;
          animation-delay: -0.5s;
        }

        .floating-card {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 170px;
          padding: 11px 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          background:
            linear-gradient(
              135deg,
              rgba(30, 8, 49, 0.82),
              rgba(10, 3, 18, 0.62)
            );
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
        }

        .floating-card-code {
          top: 15%;
          left: -1%;
          animation: floatingCardOne 6s ease-in-out infinite;
        }

        .floating-card-data {
          top: 27%;
          right: -5%;
          animation: floatingCardTwo 7.5s -2s ease-in-out infinite;
        }

        .floating-card-system {
          bottom: 14%;
          left: 1%;
          animation: floatingCardThree 8s -4s ease-in-out infinite;
        }

        .floating-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border: 1px solid rgba(193, 84, 247, 0.22);
          border-radius: 11px;
          color: #ddb1ff;
          background: rgba(193, 84, 247, 0.1);
          font-size: 16px;
        }

        .floating-card > div:nth-child(2) {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .floating-label {
          color: rgba(224, 207, 239, 0.38);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .floating-card strong {
          white-space: nowrap;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .floating-value {
          margin-left: auto;
          color: rgba(255, 255, 255, 0.17);
          font-size: 9px;
          font-weight: 700;
        }

        .micro-chip {
          position: absolute;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          color: rgba(236, 218, 250, 0.62);
          background: rgba(11, 3, 20, 0.64);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(15px);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .micro-chip svg {
          color: #c154f7;
        }

        .micro-chip-performance {
          top: 8%;
          right: 18%;
          animation: chipFloat 5.5s ease-in-out infinite;
        }

        .micro-chip-logic {
          bottom: 8%;
          right: 15%;
          animation: chipFloat 6.4s -3s ease-in-out infinite;
        }

        .code-window {
          position: absolute;
          right: -1%;
          bottom: 12%;
          z-index: 7;
          width: 190px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 17px;
          background: rgba(7, 2, 13, 0.82);
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.46),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(20px);
          animation: codeWindowFloat 7s -1.5s ease-in-out infinite;
        }

        .code-window-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 11px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.28);
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .window-controls {
          display: flex;
          gap: 4px;
        }

        .window-controls span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .window-controls span:nth-child(1) {
          background: #ff6b85;
        }

        .window-controls span:nth-child(2) {
          background: #ffd166;
        }

        .window-controls span:nth-child(3) {
          background: #64e5a3;
        }

        .code-content {
          padding: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-family: Consolas, Monaco, monospace;
          font-size: 8px;
          line-height: 1.7;
        }

        .code-content p {
          margin: 0;
        }

        .code-indent {
          padding-left: 13px;
        }

        .code-purple {
          color: #d692ff;
        }

        .code-blue {
          color: #8fbaff;
        }

        .code-white {
          color: rgba(255, 255, 255, 0.7);
        }

        .code-green {
          color: #6ce5ae;
        }

        .code-orange {
          color: #f4b77f;
        }

        .code-footer {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.25);
          font-size: 7px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .terminal-cursor {
          display: block;
          width: 5px;
          height: 8px;
          background: #c154f7;
          box-shadow: 0 0 8px rgba(193, 84, 247, 0.8);
          animation: terminalBlink 1s steps(1) infinite;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 27px;
          left: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 13px;
          transform: translateX(-50%);
        }

        .scroll-text {
          color: rgba(255, 255, 255, 0.22);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .scroll-line {
          position: relative;
          display: block;
          width: 60px;
          height: 1px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
        }

        .scroll-line span {
          position: absolute;
          top: 0;
          left: -50%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #c154f7,
            white
          );
          animation: scrollLine 2.4s ease-in-out infinite;
        }

        @keyframes auroraOne {
          from {
            transform: translate3d(-30px, -20px, 0) rotate(-5deg)
              scale(0.95);
          }

          to {
            transform: translate3d(70px, 50px, 0) rotate(12deg)
              scale(1.12);
          }
        }

        @keyframes auroraTwo {
          from {
            transform: translate3d(-60px, 40px, 0) scale(1);
          }

          to {
            transform: translate3d(80px, -50px, 0) scale(1.18);
          }
        }

        @keyframes auroraThree {
          from {
            transform: translate3d(-40px, -60px, 0);
          }

          to {
            transform: translate3d(60px, 70px, 0);
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0.18;
            transform: translate3d(0, 0, 0) scale(0.8);
          }

          45% {
            opacity: 0.9;
          }

          50% {
            transform: translate3d(
                var(--particle-drift),
                -34px,
                0
              )
              scale(1.35);
          }
        }

        @keyframes gridMovement {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 0 54px;
          }
        }

        @keyframes scanBeam {
          from {
            transform: translateY(-20vh);
          }

          to {
            transform: translateY(140vh);
          }
        }

        @keyframes availabilityPing {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }

          80%,
          100% {
            opacity: 0;
            transform: scale(2.7);
          }
        }

        @keyframes titleGradient {
          to {
            background-position: 200% center;
          }
        }

        @keyframes titleDot {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes buttonShine {
          0%,
          55% {
            left: -40%;
          }

          80%,
          100% {
            left: 125%;
          }
        }

        @keyframes visualGlow {
          0%,
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(0.92);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes orbitOne {
          from {
            transform: rotateX(68deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes orbitTwo {
          from {
            transform: rotateY(65deg) rotateZ(0deg);
          }

          to {
            transform: rotateY(65deg) rotateZ(360deg);
          }
        }

        @keyframes orbitThree {
          from {
            transform: rotateX(72deg) rotateY(35deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(72deg) rotateY(35deg) rotateZ(360deg);
          }
        }

        @keyframes orbitFour {
          from {
            transform: rotateX(58deg) rotateY(-45deg) rotateZ(0deg);
          }

          to {
            transform: rotateX(58deg) rotateY(-45deg)
              rotateZ(360deg);
          }
        }

        @keyframes verticalOrbit {
          from {
            transform: translate(-50%, -50%) rotate(64deg)
              scale(0.95);
          }

          to {
            transform: translate(-50%, -50%) rotate(74deg)
              scale(1.05);
          }
        }

        @keyframes verticalOrbitTwo {
          from {
            transform: translate(-50%, -50%) rotate(-69deg)
              scale(1.04);
          }

          to {
            transform: translate(-50%, -50%) rotate(-58deg)
              scale(0.94);
          }
        }

        @keyframes coreLevitation {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(-5px);
          }

          50% {
            transform: translate(-50%, -50%) translateY(7px);
          }
        }

        @keyframes radiationPulse {
          0% {
            opacity: 0.6;
            transform: scale(0.72);
          }

          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }

        @keyframes coreFrameRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes coreContentCounterRotate {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes dashedRing {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes coreBar {
          from {
            transform: scaleY(0.45);
          }

          to {
            transform: scaleY(1);
          }
        }

        @keyframes floatingCardOne {
          0%,
          100% {
            transform: translate3d(0, -7px, 0) rotate(-2deg);
          }

          50% {
            transform: translate3d(9px, 9px, 0) rotate(1deg);
          }
        }

        @keyframes floatingCardTwo {
          0%,
          100% {
            transform: translate3d(0, 4px, 0) rotate(2deg);
          }

          50% {
            transform: translate3d(-10px, -10px, 0) rotate(-1deg);
          }
        }

        @keyframes floatingCardThree {
          0%,
          100% {
            transform: translate3d(-3px, 5px, 0) rotate(1deg);
          }

          50% {
            transform: translate3d(10px, -8px, 0) rotate(-2deg);
          }
        }

        @keyframes chipFloat {
          0%,
          100% {
            transform: translateY(-4px);
          }

          50% {
            transform: translateY(8px);
          }
        }

        @keyframes codeWindowFloat {
          0%,
          100% {
            transform: translate3d(0, 5px, 0) rotate(1deg);
          }

          50% {
            transform: translate3d(-8px, -8px, 0) rotate(-1deg);
          }
        }

        @keyframes terminalBlink {
          0%,
          49% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0.15;
          }
        }

        @keyframes scrollLine {
          0% {
            left: -50%;
          }

          100% {
            left: 120%;
          }
        }

        @media (max-width: 1180px) {
          .hero-shell {
            grid-template-columns: minmax(0, 1fr) minmax(390px, 0.85fr);
            width: min(1200px, calc(100% - 48px));
          }

          .orbit-stage {
            width: min(44vw, 550px);
          }

          .floating-card {
            min-width: 150px;
          }

          .floating-card-data {
            right: -2%;
          }

          .code-window {
            right: 0;
          }
        }

        @media (max-width: 930px) {
          .home-stage {
            overflow-y: auto;
          }

          .hero-shell {
            grid-template-columns: 1fr;
            gap: 1rem;
            width: min(760px, calc(100% - 36px));
            padding-top: 8rem;
            padding-bottom: 8rem;
          }

          .hero-copy {
            max-width: 720px;
          }

          h1 {
            font-size: clamp(4rem, 14vw, 6.5rem);
          }

          .hero-description {
            max-width: 610px;
          }

          .hero-visual {
            min-height: 620px;
            margin-top: -20px;
          }

          .orbit-stage {
            width: min(88vw, 590px);
          }

          .scroll-indicator {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .hero-shell {
            width: min(100% - 28px, 590px);
            padding-top: 7rem;
            padding-bottom: 4rem;
          }

          .availability-badge {
            margin-bottom: 24px;
            padding: 9px 12px;
            font-size: 10px;
          }

          .portfolio-index {
            margin-bottom: 14px;
            font-size: 9px;
          }

          h1 {
            font-size: clamp(3.65rem, 17vw, 5.4rem);
            line-height: 0.9;
          }

          .title-control::after {
            right: -8px;
            width: 7px;
            height: 7px;
          }

          .hero-description {
            margin-top: 26px;
            font-size: 15px;
            line-height: 1.75;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-top: 28px;
          }

          .primary-cta {
            width: 100%;
          }

          .cta-content {
            justify-content: space-between;
            width: 100%;
          }

          .social-links {
            width: 100%;
          }

          .social-link {
            width: 48px;
            height: 48px;
            font-size: 21px;
          }

          .tech-stack {
            align-items: flex-start;
            flex-direction: column;
            gap: 11px;
            margin-top: 30px;
          }

          .hero-visual {
            min-height: 500px;
            margin-top: 5px;
          }

          .orbit-stage {
            width: min(108vw, 520px);
          }

          .developer-core {
            width: 190px;
            height: 190px;
          }

          .core-icon {
            width: 44px;
            height: 44px;
            border-radius: 15px;
            font-size: 20px;
          }

          .core-panel strong {
            font-size: 14px;
          }

          .floating-card {
            min-width: auto;
            padding: 9px 10px;
          }

          .floating-icon {
            width: 31px;
            height: 31px;
          }

          .floating-card strong {
            font-size: 8px;
          }

          .floating-card-code {
            top: 12%;
            left: 1%;
          }

          .floating-card-data {
            top: 25%;
            right: 0;
          }

          .floating-card-system {
            bottom: 12%;
            left: 0;
          }

          .floating-value {
            display: none;
          }

          .code-window {
            right: 0;
            bottom: 7%;
            width: 155px;
          }

          .code-content {
            padding: 11px;
            font-size: 6.5px;
          }

          .micro-chip-performance {
            top: 5%;
            right: 13%;
          }

          .micro-chip-logic {
            display: none;
          }

          .grid-plane {
            bottom: -25%;
            width: 210%;
          }
        }

        @media (max-width: 410px) {
          h1 {
            font-size: clamp(3.2rem, 16.4vw, 4.2rem);
          }

          .hero-visual {
            min-height: 455px;
          }

          .floating-card-system {
            display: none;
          }

          .code-window {
            bottom: 4%;
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

          .visual-container {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}