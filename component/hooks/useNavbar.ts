

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

export function useNavbar() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("up");

  const [scrolled, setScrolled] = useState(false);

  const lastScroll = useRef(0);
  const ticking = useRef(false);

  const sections = [
    "home",
    "about",
    "services",
    "portfolio",
    "contact",
  ];

  const updateNavbar = useCallback(() => {
    const y = window.scrollY;

    setScrolled(y > 60);

    if (y > lastScroll.current + 5) {
      setScrollDirection("down");
    } else if (y < lastScroll.current - 5) {
      setScrollDirection("up");
    }

    lastScroll.current = y;

    let current = "home";

    for (const id of sections) {
      const section = document.getElementById(id);

      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom >= 120) {
        current = id;
        break;
      }
    }

    setActiveSection(current);

    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateNavbar();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateNavbar]);

  useEffect(() => {
    document.body.style.overflow = openNavigation ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openNavigation]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 1024) {
        setOpenNavigation(false);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenNavigation(false);
      }
    };

    window.addEventListener("keydown", escape);

    return () => window.removeEventListener("keydown", escape);
  }, []);

  return {
    scrolled,
    activeSection,
    scrollDirection,
    openNavigation,
    setOpenNavigation,
  };
}

