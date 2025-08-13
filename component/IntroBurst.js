"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LS_KEY = "introPlayed_v1";

export default function IntroBurst() {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const played =
      typeof window !== "undefined" && localStorage.getItem(LS_KEY);
    if (!played) setShow(true);
  }, [prefersReduced]);

  if (!show) return null;

  const finish = () => {
    localStorage.setItem(LS_KEY, "1");
    setShow(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 0.6, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={finish}
      style={{
        background:
          "radial-gradient(1200px 800px at 50% 60%, rgba(138,46,255,0.20), transparent 60%), linear-gradient(180deg,#1A0032 0%, #2A003F 40%, #6A00FF 100%)",
      }}
    >
      {/* léger grain CSS, cheap */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0px, rgba(255,255,255,.06) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Contenu centré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center select-none"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
          }}
        >
          <Line>Mattéo.</Line>
          <Line>Full&nbsp;Stack.</Line>
          <Line>Full&nbsp;Control.</Line>
        </motion.div>
      </div>

      {/* Sweep */}
      <motion.div
        className="absolute top-0 left-0 h-full w-[22%] pointer-events-none"
        initial={{ x: "-130%" }}
        animate={{ x: ["-130%", "130%"] }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(234,220,253,0.25) 50%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />

      {/* Anneau radial */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ scale: 0.5, opacity: 0.35 }}
        animate={{ scale: 4.2, opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
        style={{
          width: 180,
          height: 180,
          boxShadow:
            "0 0 0 2px rgba(234,220,253,0.25), 0 0 80px 40px rgba(193,84,247,0.25)",
        }}
      />

      {/* Flash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.35, times: [0, 0.5, 1], delay: 2.35 }}
        style={{
          background:
            "radial-gradient(circle at 50% 55%, #EADCFD, transparent 50%)",
        }}
      />
    </motion.div>
  );
}

function Line({ children }) {
  return (
    <motion.div
      className="text-white font-medium leading-[0.9] tracking-[-0.06em]"
      variants={{
        hidden: { y: 60, opacity: 0, filter: "blur(8px)" },
        show: {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <span className="text-[9vw] md:text-[7vw]">{children}</span>
    </motion.div>
  );
}
