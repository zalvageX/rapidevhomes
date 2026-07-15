"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type NavItem = {
  key: string;
  label: string;
};

type Props = {
  links: NavItem[];
  activeSection: string;
};

export default function NavLinks({
  links,
  activeSection,
}: Props) {
  const containerRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const [hovered, setHovered] = useState(activeSection);

  useEffect(() => {
    setHovered(activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (!containerRef.current || !indicatorRef.current) return;

    const activeLink = containerRef.current.querySelector(
      `[data-key="${hovered}"]`
    ) as HTMLElement | null;

    if (!activeLink) return;

    gsap.to(indicatorRef.current, {
      x: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [hovered]);

  return (
    <ul
      ref={containerRef}
      className="relative hidden items-center rounded-full md:flex"
      onMouseLeave={() => setHovered(activeSection)}
    >
      {/* Sliding Glass Pill */}
      {/* <span
        ref={indicatorRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-11 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl"
      /> */}
      <span
        ref={indicatorRef}
        className="
        absolute
        left-0
        top-1/2
        h-11
        -translate-y-1/2
        rounded-full
        border
        border-white/10
        bg-white/8
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        "
        />

      {links.map((link) => (
        <li
          key={link.key}
          data-key={link.key}
          onMouseEnter={() => setHovered(link.key)}
          className="relative z-10"
        >
          <Link
            href={`#${link.key}`}
            className={`block px-6 py-3 text-sm font-medium transition-colors duration-300 ${
              hovered === link.key
                ? "text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}