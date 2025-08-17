"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ProjectCard = dynamic(() => import("../../../component/ProjectCard"), {
  ssr: false,
  loading: () => <SkeletonCard />,
});
const ProjectModal = dynamic(() => import("../../../component/ProjectModal"), {
  ssr: false,
});

import Dehors from "../../../public/projets/dehors.webp";
import Irab from "../../../public/projets/projet_irab_master.webp";
import Klaxon from "../../../public/projets/touche_pas_au_klaxon.webp";
import Artisan from "../../../public/projets/trouve_ton_artisan.webp";

export default function ProjetPage() {
  const stackRef = useRef(null);
  const [modalData, setModalData] = useState(null);
  const closeModal = () => setModalData(null);

  return (
    <div className="body-page">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-3xl md:text-6xl tracking-[-0.06em] pt-20 font-semibold text-white">
          02. Projets
        </h3>
        <p className="mt-2 text-sm md:text-base text-[#B0A9C2] max-w-2xl">
          Sélection de projets. Chevauchement sticky propre (les suivantes
          passent AU-DESSUS).
        </p>
      </div>

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
              onOpenModal={() =>
                setModalData({
                  muxId: "vmlM7cG37G3971EPRdPkQtDqAjZjhEeB1ZAP4Amz02D00",
                  description: "Vidéo de présentation du projet I'rab Master.",
                })
              }
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
              onOpenModal={() =>
                setModalData({
                  muxId: "iyQwz2lDTnUOpsR00lwo0200p9D00Wq2QRz2TpXrwLczQQw.m3u8",
                  description: "Vidéo du projet covoiturage interne.",
                })
              }
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
              onOpenModal={() =>
                setModalData({
                  muxId: "8UiGzlnCaGkXJDYeFVj99kG02idtn9NVGo5NqAHmfiWY",
                  description: "Présentation du projet 'Trouve ton artisan'.",
                })
              }
            />
          </div>

          {/* 4 */}
          <div className="mt-16 md:mt-28 stack-item sticky top-16 md:top-24 z-40 will-change-transform">
            <ProjectCard
              title="Dehors !"
              subtitle="Site d'Escape Game"
              description="Site d'escape game à Paris, avec pour exercice : générer des cards d'une DB JSON."
              tags={[
                "Développement web",
                "HTML5",
                "CSS3",
                "Javascript",
                "JSON",
              ]}
              image={Dehors}
              onOpenModal={() =>
                setModalData({
                  muxId: "aFFvpDk4REI9lCHdu1C00fkZJ02025Ig5ybYdaAEk014E5o",
                  description: "Vidéo du site Dehors !",
                })
              }
            />
          </div>
        </div>
      </section>

      {modalData && (
        <ProjectModal
          isOpen={!!modalData}
          onClose={closeModal}
          muxId={modalData.muxId}
          description={modalData.description}
        />
      )}
    </div>
  );
}

/* ———————————————————— */
/* Skeleton minimal pour fallback */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8 animate-pulse">
      <div className="h-6 w-48 bg-white/10 rounded" />
      <div className="h-4 w-40 bg-white/10 rounded mt-3" />
      <div className="h-24 bg-white/10 rounded mt-5" />
      <div className="flex gap-2 mt-5">
        <span className="h-7 w-16 bg-white/10 rounded-full" />
        <span className="h-7 w-20 bg-white/10 rounded-full" />
        <span className="h-7 w-14 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
