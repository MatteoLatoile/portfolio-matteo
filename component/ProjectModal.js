"use client";

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { FiPlay, FiX } from "react-icons/fi";

export default function ProjectModal({
  isOpen,
  onClose,
  muxId,
  youtubeId,
  description,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedMuxId = muxId
    ? muxId
        .replace(/^https:\/\/stream\.mux\.com\//, "")
        .replace(/\.m3u8$/, "")
    : null;

  const videoTitle =
    description || "Présentation vidéo d’un projet du portfolio";

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "overflow-y-auto px-3 py-6 sm:px-6 sm:py-10",
        "bg-[#05010A]/90 backdrop-blur-xl",
        "transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label="Présentation du projet"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Halos lumineux de l’arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-140px] top-[-100px] h-[420px] w-[420px] rounded-full bg-[#6A00FF]/25 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-160px] right-[-100px] h-[460px] w-[460px] rounded-full bg-[#C154F7]/20 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8A2EFF]/10 blur-[150px]"
      />

      {/* Modal */}
      <div
        className={[
          "relative w-full max-w-5xl overflow-hidden",
          "rounded-[28px] border border-white/[0.14]",
          "bg-[linear-gradient(145deg,rgba(35,8,58,0.98),rgba(14,5,25,0.98))]",
          "shadow-[0_35px_120px_rgba(0,0,0,0.75)]",
          "transition-all duration-500 ease-out",
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-[0.96] opacity-0",
        ].join(" ")}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Ligne lumineuse supérieure */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C154F7] to-transparent opacity-90" />

        {/* Reflet décoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8A2EFF]/20 blur-[100px]"
        />

        {/* En-tête */}
        <div className="relative flex items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.14] bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C154F7]/20 to-transparent" />

              <FiPlay className="relative ml-0.5 text-lg text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C154F7] shadow-[0_0_12px_#C154F7]" />

                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D9BBF7] sm:text-xs">
                  Project showcase
                </p>
              </div>

              <p className="mt-1 truncate text-xs text-white/45 sm:text-sm">
                Présentation vidéo du projet
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className={[
              "group relative ml-4 flex h-11 w-11 shrink-0 items-center justify-center",
              "rounded-2xl border border-white/[0.12] bg-white/[0.06]",
              "text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              "transition-all duration-300",
              "hover:rotate-90 hover:border-[#C154F7]/50 hover:bg-[#C154F7]/15 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-[#C154F7]/60",
            ].join(" ")}
          >
            <FiX className="text-xl transition-transform duration-300" />
          </button>
        </div>

        {/* Zone vidéo */}
        <div className="relative p-3 sm:p-5 md:p-6">
          <div
            className={[
              "relative overflow-hidden rounded-[20px]",
              "border border-white/[0.12] bg-black",
              "shadow-[0_25px_70px_rgba(0,0,0,0.55)]",
            ].join(" ")}
          >
            {/* Badge */}
            <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/[0.14] bg-black/45 px-3 py-1.5 backdrop-blur-md sm:left-4 sm:top-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C154F7] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C154F7]" />
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/80">
                Présentation
              </span>
            </div>

            {/* Coins décoratifs */}
            <div className="pointer-events-none absolute left-3 top-3 z-10 h-8 w-8 border-l border-t border-white/25 sm:left-4 sm:top-4" />
            <div className="pointer-events-none absolute right-3 top-3 z-10 h-8 w-8 border-r border-t border-white/25 sm:right-4 sm:top-4" />
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-8 w-8 border-b border-l border-white/25 sm:bottom-4 sm:left-4" />
            <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-8 w-8 border-b border-r border-white/25 sm:bottom-4 sm:right-4" />

            <div className="aspect-video w-full">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
                  title={videoTitle}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : normalizedMuxId ? (
                <MuxPlayer
                  playbackId={normalizedMuxId}
                  streamType="on-demand"
                  autoPlay
                  className="h-full w-full"
                  style={{
                    "--media-object-fit": "contain",
                    "--media-object-position": "center",
                    "--controls-backdrop-color": "rgba(10, 4, 20, 0.65)",
                    "--media-accent-color": "#C154F7",
                  }}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,#26063E_0%,#08020D_70%)] px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                    <FiPlay className="ml-1 text-2xl text-white/40" />
                  </div>

                  <p className="text-sm text-white/50">
                    Aucune vidéo n’est disponible pour ce projet.
                  </p>
                </div>
              )}
            </div>

            {/* Reflet sur la vidéo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/[0.05] to-transparent" />
          </div>
        </div>

        {/* Pied du modal */}
        <div className="relative flex flex-col gap-4 border-t border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[#EDE9F7]/70 sm:text-[15px]">
              {description}
            </p>
          ) : (
            <p className="text-sm text-white/45">
              Découvrez la démonstration complète de ce projet.
            </p>
          )}

          <div className="flex shrink-0 items-center gap-2 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Vidéo haute qualité
          </div>
        </div>

        {/* Ligne lumineuse inférieure */}
        <div className="h-px w-full bg-gradient-to-r from-[#6A00FF] via-[#C154F7] to-[#8A2EFF] opacity-70" />
      </div>
    </div>
  );
}