"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "services",
  "portfolio",
  "contact",
];

export function useNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openNavigation, setOpenNavigation] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 80);

      setScrollDirection(
        currentScrollY > lastScrollY ? "down" : "up"
      );

      lastScrollY = currentScrollY;

      let current = "home";

      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openNavigation
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openNavigation]);

  return {
    scrolled,
    activeSection,
    openNavigation,
    setOpenNavigation,
    scrollDirection,
  };
}