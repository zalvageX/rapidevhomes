

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type NavItem = {
  key: string;
  label: string;
};

type Props = {
  open: boolean;
  links: NavItem[];
  activeSection: string;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  links,
  activeSection,
  onClose,
}: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (open) {
      gsap.killTweensOf(".mobile-link");
      gsap.killTweensOf(".mobile-cta");

      gsap.fromTo(
        ".mobile-link",
        {
          opacity: 0,
          y: 40,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".mobile-cta",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.45,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-50 transition-all duration-500 md:hidden
      ${
        open
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* Background */}

      <div className="absolute inset-0 bg-black/75 backdrop-blur-2xl" />

      {/* Background image */}

      <div className="absolute inset-0 bg-[url('/dropdown.png')] bg-cover bg-center opacity-20" />

      {/* Content */}

      <div className="relative flex h-full flex-col items-center justify-center">

        <div className="space-y-8">

          {links.map((link) => (
            <Link
              key={link.key}
              href={`#${link.key}`}
              onClick={onClose}
              className={`mobile-link block text-center text-4xl font-light tracking-wide transition-colors duration-300

              ${
                activeSection === link.key
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }
              `}
            >
              {link.label}
            </Link>
          ))}

        </div>

        <Link
          href="#contact"
          onClick={onClose}
          className="mobile-cta mt-16 rounded-full border border-white/15 bg-white px-8 py-4 font-medium text-black transition-all hover:scale-105"
        >
          Let's Talk →
        </Link>

      </div>
    </div>
  );
}

