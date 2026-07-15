"use client";

import Link from "next/link";

export default function NavLogo() {
  return (
    <Link
      href="#home"
      className="group relative flex items-center gap-2"
    >
      <div className="flex items-center text-2xl font-semibold tracking-[0.18em] uppercase">

        <span className="text-white transition-all duration-500 group-hover:tracking-[0.22em]">
          RAPID
        </span>

        <span className="relative flex h-3 w-3 items-center justify-center">

          {/* Glow */}

          <span className="absolute h-full w-full rounded-full bg-red-500 blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[2]" />

          {/* Dot */}

          <span className="relative h-2.5 w-2.5 rounded-full bg-red-500 transition-all duration-500 group-hover:scale-125" />

        </span>

        <span className="text-white transition-all duration-500 group-hover:tracking-[0.22em]">
          EV
        </span>

      </div>
    </Link>
  );
}