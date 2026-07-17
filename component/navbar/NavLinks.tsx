

"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import FloatingIndicator from "./FloatingIndicator";

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

  const [current, setCurrent] = useState(activeSection);

  useEffect(() => {
    setCurrent(activeSection);
  }, [activeSection]);

  const moveIndicator = (key: string) => {
    if (!containerRef.current || !indicatorRef.current) return;

    const target = containerRef.current.querySelector(
      `[data-key="${key}"]`
    ) as HTMLElement | null;

    if (!target) return;

    gsap.to(indicatorRef.current, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => {
    moveIndicator(current);
  }, []);

  useEffect(() => {
    moveIndicator(current);
  }, [current]);

  return (
    <ul
      ref={containerRef}
      className="relative flex items-center gap-2 md:gap-6"
      onMouseLeave={() => setCurrent(activeSection)}
    >
      <FloatingIndicator ref={indicatorRef} />

      {links.map((link) => (
        <li
          key={link.key}
          data-key={link.key}
          className="relative z-10"
          onMouseEnter={() => setCurrent(link.key)}
        >
          <Link
            href={`#${link.key}`}
            className={`
              block rounded-full px-4 py-3 text-sm font-medium transition-colors duration-300 md:px-6
              ${
                current === link.key
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }
            `}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

