

"use client";

import Link from "next/link";

export default function NavCTA() {
  return (
    <Link
      href="#contact"
      className="group relative hidden overflow-hidden rounded-full md:flex
      items-center justify-center h-12 px-7 border border-white/10 bg-white
      text-black font-medium transition-all duration-500 
      hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(239,68,68,.28)]"
    >
      {/* Red glow */}

      <span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500
        via-red-400 to-red-500 opacity-0 blur-xl transition-opacity
        duration-500 group-hover:opacity-20"
      />

      {/* White sweep */}

      <span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent
        via-white/70 to-transparent transition-transform duration-700
        group-hover:translate-x-full"
      />

      <span className="relative flex items-center gap-2">

        Let's Talk

        <span
          className="
          transition-transform
          duration-300
          group-hover:translate-x-1
          "
        >
          →
        </span>

      </span>
    </Link>
  );
}

