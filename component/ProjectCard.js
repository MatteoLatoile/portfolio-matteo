"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags = [],
  image, // import statique OU string "/images/..."
  href = "#",
  mediaFirstMobile = true,
  reverseDesktop = false,
  imageFit = "cover", // "cover" | "contain"
  priority = false,
  sticky = false,
  stickyTop = "top-24",
  overlapClass = "",
  bgClass = "bg-[linear-gradient(180deg,#1A0032_0%,#2A003F_65%,#1A0032_100%)]",
  onOpenModal = null,
}) {
  const mediaOrder = mediaFirstMobile
    ? "order-1 md:order-2"
    : "order-2 md:order-1";
  const textOrder = mediaFirstMobile
    ? "order-2 md:order-1"
    : "order-1 md:order-2";
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
  const stickyCls = sticky ? `sticky ${stickyTop}` : "";

  // refs internes à animer
  const cardRef = useRef(null);
  const mediaRef = useRef(null);

  const [revealed, setRevealed] = useState(false); // pour le stagger interne
  const activeRef = useRef(false);
  const rafRef = useRef(0);

  // Parallax image + reveal interne
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = cardRef.current;
    const media = mediaRef.current;
    if (!el || !media) return;

    // ---- Reveal interne (une fois)
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setRevealed(true);
          io.unobserve(el);
          // active parallax seulement quand l'élément est dans le viewport
          activeRef.current = !reduce;
        } else {
          activeRef.current = false;
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(el);

    // ---- Parallax léger (raf throttle)
    const onFrame = () => {
      if (!activeRef.current) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // position du centre de la carte vs centre viewport -> [-1..1]
      const delta = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      const move = Math.max(-1, Math.min(1, -delta)) * 16; // px, léger
      media.style.transform = `translateY(${move.toFixed(1)}px)`;
      rafRef.current = requestAnimationFrame(onFrame);
    };

    const onScroll = () => {
      if (!activeRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onFrame);
    };

    if (!reduce) {
      rafRef.current = requestAnimationFrame(onFrame);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10",
        "p-6 md:p-10",
        bgClass,
        stickyCls,
        overlapClass,
      ].join(" ")}
      aria-labelledby={`proj-${slugify(title)}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* Media (parallax léger) */}
        <div className={`${mediaOrder} md:col-span-6`}>
          <div
            ref={mediaRef}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#6A00FF]/10 w-full will-change-transform"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              src={image}
              alt={`${title} – aperçu`}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              placeholder="blur"
              loading="lazy"
              priority={priority}
              className={`${fitClass} transition-transform duration-500 group-hover:scale-[1.02]`}
            />
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(60%_60%_at_60%_50%,#8A2EFF22,transparent_60%)]" />
          </div>
        </div>

        {/* Texte (stagger interne) */}
        <div className={`${textOrder} md:col-span-6`}>
          <p
            className={[
              "text-[#EADCFD]/80 text-sm mb-2 tracking-[-0.02em]",
              "transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            ].join(" ")}
            style={{ transitionDelay: "0ms" }}
          >
            Projet
          </p>

          <h4
            id={`proj-${slugify(title)}`}
            className={[
              "text-white text-3xl md:text-5xl font-semibold leading-tight tracking-[-0.04em]",
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "80ms" }}
          >
            {title}
            <br className="hidden md:block" />
            {subtitle ? (
              <span className="opacity-70 text-2xl md:text-3xl">
                {" "}
                {subtitle}
              </span>
            ) : null}
          </h4>

          {description ? (
            <p
              className={[
                "mt-5 text-[#EDE9F7]/80 leading-relaxed",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                revealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: "160ms" }}
            >
              {description}
            </p>
          ) : null}

          {!!tags.length && (
            <div
              className={[
                "mt-6 flex flex-wrap gap-2",
                "transition-opacity duration-700",
                revealed ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{ transitionDelay: "220ms" }}
            >
              {tags.map((t) => (
                <span
                  key={t}
                  className={[
                    "text-xs text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-full",
                    "transition-transform duration-500",
                    revealed ? "translate-y-0" : "translate-y-2",
                  ].join(" ")}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div
            className={[
              "mt-8",
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "280ms" }}
          >
            {onOpenModal ? (
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white
               bg-[linear-gradient(180deg,rgba(234,220,253,0.16),rgba(234,220,253,0))] hover:border-white/30 hover:bg-white/10 transition-colors"
              >
                Voir le projet <FiArrowUpRight />
              </button>
            ) : (
              <a
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white
               bg-[linear-gradient(180deg,rgba(234,220,253,0.16),rgba(234,220,253,0))] hover:border-white/30 hover:bg-white/10 transition-colors"
              >
                Voir le projet <FiArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#6A00FF] via-[#C154F7] to-[#8A2EFF] opacity-50" />
    </article>
  );
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
