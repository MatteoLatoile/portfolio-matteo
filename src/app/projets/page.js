// app/projets/page.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import ProjectCard from "../../../component/ProjectCard";
import Russel from "../../../public/projets/catway.webp";
import Irab from "../../../public/projets/projet_irab_master.webp";
import Klaxon from "../../../public/projets/touche_pas_au_klaxon.webp";
import Artisan from "../../../public/projets/trouve_ton_artisan.webp";

export default function Page() {
  const stackRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = stackRef.current;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".stack-item");

      // Anim légère pendant la phase sticky
      items.forEach((card, i) => {
        gsap.to(card, {
          scale: 0.985,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top+=96",
            end: "bottom top+=96",
            scrub: true,
          },
        });

        if (i > 0) {
          const prev = items[i - 1];
          gsap.fromTo(
            prev,
            { opacity: 1, filter: "blur(0px)" },
            {
              opacity: 0.85,
              filter: "blur(0.4px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top center+=60",
                end: "top top+=96",
                scrub: true,
              },
            }
          );
        }
      });

      // ===== Padding dynamique pour éviter le "trou" avant le footer =====
      const setPad = () => {
        if (!el) return;
        const last = el.querySelector(".stack-item:last-child");
        if (!last) return;

        const styles = getComputedStyle(last);
        const topSticky = parseFloat(styles.top) || 0; // ex: 64/96px
        const lastH = last.getBoundingClientRect().height; // hauteur carte
        const vh = window.innerHeight;

        const pb = Math.max(0, vh - topSticky - lastH);
        el.style.paddingBottom = `${pb}px`;
        // recalcul ScrollTrigger quand la taille change
        ScrollTrigger.refresh();
      };

      setPad();
      // ajuster si resize/orientation ou assets chargés
      const onResize = () => setPad();
      window.addEventListener("resize", onResize);
      ScrollTrigger.addEventListener("refreshInit", setPad);
      // petit fallback après rendu images
      setTimeout(setPad, 150);

      return () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refreshInit", setPad);
      };
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="body-page">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-3xl md:text-6xl tracking-[-0.06em] pt-20 font-semibold text-white">
          02. Projets
        </h3>
        <p className="mt-2 text-sm md:text-base text-[#B0A9C2] max-w-2xl">
          Sélection de projets. Chevauchement sticky propre (les suivantes
          passent AU-DESSUS).
        </p>
      </div>

      {/* Stack sticky */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 md:mt-14">
        <div ref={stackRef} className="relative isolate">
          {/* 1 */}
          <div className="stack-item sticky top-16 md:top-24 z-10 will-change-transform">
            <ProjectCard
              title="I'rab Master"
              subtitle="Application éducative"
              description="Design Figma d'une application éducative visant à permettre aux étudiants en langue arabe de s'exercer à l’i‘rab à l’aide de l’IA."
              tags={["Figma", "IA", "Mobile"]}
              image={Irab}
              href="#"
              mediaFirstMobile={true}
              reverseDesktop={false}
              imageFit="cover"
              priority={false}
              sticky={false}
            />
          </div>

          {/* 2 */}
          <div className="mt-16 md:mt-28 stack-item sticky top-16 md:top-24 z-20 will-change-transform">
            <ProjectCard
              title="Touche pas au klaxon !"
              subtitle="Site de covoiturage"
              description="Plateforme interne pour relier collègues partout en France, réduire les coûts et l’empreinte carbone."
              tags={["Développement web", "PHP", "HTML5", "CSS3"]}
              image={Klaxon}
              href="#"
              mediaFirstMobile={true}
              reverseDesktop={false}
              imageFit="cover"
              priority={false}
              sticky={false}
            />
          </div>

          {/* 3 */}
          <div className="mt-16 md:mt-28 stack-item sticky top-16 md:top-24 z-30 will-change-transform">
            <ProjectCard
              title="Trouve ton artisan."
              subtitle="Rhône-Alpes Auvergne"
              description="Annuaire régional des artisans avec design aligné sur l’identité de la région."
              tags={["Développement web", "React", "Node.js", "Express", "SQL"]}
              image={Artisan}
              href="#"
              mediaFirstMobile={true}
              reverseDesktop={false}
              imageFit="cover"
              priority={false}
              sticky={false}
            />
          </div>

          {/* 4 */}
          <div className="mt-16 md:mt-28 stack-item sticky top-16 md:top-24 z-40 will-change-transform">
            <ProjectCard
              title="Russel Marina"
              subtitle="Réservation de catways"
              description="Réservation en ligne des postes d’amarrage, gestion en temps réel."
              tags={["Développement web", "React", "Node.js", "MongoDB"]}
              image={Russel}
              href="#"
              mediaFirstMobile={true}
              reverseDesktop={false}
              imageFit="cover"
              priority={false}
              sticky={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
