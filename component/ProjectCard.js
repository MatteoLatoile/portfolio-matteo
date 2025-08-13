import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags = [],
  image, // import statique (reco) OU string "/images/..."
  href = "#",
  mediaFirstMobile = true,
  reverseDesktop = false,
  imageFit = "cover", // "cover" | "contain"
  priority = false,
  sticky = false, // pour le chevauchement plus tard
  stickyTop = "top-24", // ex: "top-24" ou "top-32"
  overlapClass = "", // ex: "-mt-24" sur les cartes suivantes
  bgClass = "bg-[linear-gradient(180deg,#1A0032_0%,#2A003F_65%,#1A0032_100%)]",
}) {
  const mediaOrder = mediaFirstMobile
    ? "order-1 md:order-2"
    : "order-2 md:order-1";
  const textOrder = mediaFirstMobile
    ? "order-2 md:order-1"
    : "order-1 md:order-2";
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
  const stickyCls = sticky ? `sticky ${stickyTop}` : "";

  return (
    <article
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
        {/* Media */}
        <div className={`${mediaOrder} md:col-span-6`}>
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#6A00FF]/10 w-full"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              src={image}
              alt={`${title} – aperçu`}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              priority={priority}
              className={`${fitClass} transition-transform duration-500 will-change-transform group-hover:scale-[1.02]`}
            />
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(60%_60%_at_60%_50%,#8A2EFF22,transparent_60%)]" />
          </div>
        </div>

        {/* Texte */}
        <div className={`${textOrder} md:col-span-6`}>
          <p className="text-[#EADCFD]/80 text-sm mb-2 tracking-[-0.02em]">
            Projet
          </p>
          <h4
            id={`proj-${slugify(title)}`}
            className="text-white text-3xl md:text-5xl font-semibold leading-tight tracking-[-0.04em]"
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
            <p className="mt-5 text-[#EDE9F7]/80 leading-relaxed">
              {description}
            </p>
          ) : null}

          {!!tags.length && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8">
            <a
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white
                         bg-[linear-gradient(180deg,rgba(234,220,253,0.16),rgba(234,220,253,0))]
                         hover:border-white/30 hover:bg-white/10 transition-colors"
            >
              Voir le projet <FiArrowUpRight />
            </a>
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
