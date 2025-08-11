"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FlechePetit from "../public/icons/fleche-petit.svg";

const BtnGlass = ({ href = "#", text }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: "2px solid rgba(255,255,255,0.4)",
        background: hover
          ? "linear-gradient(80deg,rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 91%)"
          : "linear-gradient(80deg,rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 91%)",
        transition: "background 0.3s ease",
      }}
      className="text-white mt-7 w-fit backdrop-blur-2xl inline-flex items-center gap-4 md:hover:gap-6 transition-[gap] duration-300 py-4 px-12 rounded-full"
    >
      {text}
      <Image src={FlechePetit} alt="" />
    </Link>
  );
};
export default BtnGlass;
