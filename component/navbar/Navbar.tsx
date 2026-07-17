// "use client"

// import { NAV_LINKS } from "@/constants"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import MenuSvg from "../Menu"

// const Navbar = () => {

//   const [openNavigation, setOpenNavigation] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")

//   const toggleNavigation = () => setOpenNavigation((prev) => !prev)

//   // Scroll lock
//   useEffect(() => {
//     document.body.style.overflow = openNavigation ? "hidden" : ""
//     return () => { document.body.style.overflow = "" }
//   }, [openNavigation])

//   // Scroll background
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 80)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Track active section
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["home", "about", "services", "portfolio", "contact"]
//       let current = "home"

//       sections.forEach((id) => {
//         const el = document.getElementById(id)
//         if (el) {
//           const rect = el.getBoundingClientRect()
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             current = id
//           }
//         }
//       })

//       setActiveSection(current)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <nav className={`fixed top-0 left-0 z-50 border-b border-white/10 transition-all duration-500 ${scrolled ? "bg-black/20 backdrop-blur-md" : ""}`}>
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
//         <Link href="#home">
//           <div className="text-2xl font-bold flex-1">
//             <span className="text-white">
//               RAPID<span className="text-red-600">E</span>V
//             </span>
//           </div>
//         </Link>

//         {/* DESKTOP NAV */}
//         <ul className="hidden md:flex gap-12">
//           {NAV_LINKS.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={`#${link.key}`}
//                 className={`relative pb-1 text-sm transition-colors 
//                   ${activeSection === link.key ? "text-red-500 after:w-full" : "text-white after:w-0"} 
//                   hover:text-red-500 hover:after:w-full
//                   after:block after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300`}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* CTA */}
//         <div className="hidden md:block">
//           <button className="py-2 px-5 rounded-md bg-white/70 text-black/80 font-semibold hover:bg-white hover:text-black transition">
//             GET IN TOUCH
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={toggleNavigation} className="md:hidden ml-auto z-50">
//           <MenuSvg openNavigation={openNavigation} />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out
//           ${openNavigation 
//             ? "opacity-100 visible pointer-events-auto translate-y-0" 
//             : "opacity-0 -translate-y-10 invisible pointer-events-none"}
//           bg-[url('/dropdown.png')] bg-cover bg-center`}
//       >
//         <div className="flex flex-col items-center justify-center h-full space-y-12">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.href}
//               href={`#${link.key}`}
//               onClick={() => setOpenNavigation(false)}
//               className={`text-2xl font-bold transition 
//                 ${activeSection === link.key ? "text-red-500" : "text-white"} 
//                 hover:text-red-500`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <button className="py-2 px-5 rounded-md bg-white/70 text-black/80 font-semibold hover:bg-white hover:text-black transition">
//             GET IN TOUCH
//           </button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { NAV_LINKS } from "@/constants";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavCTA from "./NavCTA";
import MobileMenu from "./MobileMenu";
import MenuButton from "./MenuButton";

import { useNavbar } from "../hooks/useNavbar";

export default function Navbar () {
  const {
    scrolled,
    activeSection,
    openNavigation,
    setOpenNavigation,
    scrollDirection,
  } = useNavbar();

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        duration: 0.45,
        ease: "power3.out",
      },
    });

    if (scrolled) {
      tl.to(navRef.current, {
        y: 18,
        width: "94%",
        maxWidth: 1220,
        borderRadius: 9999,
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(10,10,10,.55)",
        borderColor: "rgba(255,255,255,.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,.25)",
      });
    } else {
      tl.to(navRef.current, {
        y: 0,
        width: "100%",
        maxWidth: "100%",
        borderRadius: 0,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(255,255,255,0)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      });
    }
  }, [scrolled]);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      scale:
        scrolled && scrollDirection === "down"
          ? 0.97
          : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrollDirection, scrolled]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      {
        y: -80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="
        fixed
        left-1/2
        top-0
        z-100
        flex
        w-full
        -translate-x-1/2
        items-center
        border
        border-transparent
        transition-colors
        duration-300
        "
      >
        <div
          className="
          mx-auto
          flex
          h-20
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-6
          py-3
          sm:px-8
          lg:px-10
          lg:py-4
          "
        >
          {/* Logo */}

          <div className="shrink-0">
            <NavLogo />
          </div>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex">
            <NavLinks
              links={NAV_LINKS}
              activeSection={activeSection}
            />
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            <NavCTA />

            <MenuButton
              open={openNavigation}
              onClick={() =>
                setOpenNavigation((prev) => !prev)
              }
            />
          </div>
        </div>
      </nav>

      <MobileMenu
        open={openNavigation}
        links={NAV_LINKS}
        activeSection={activeSection}
        onClose={() => setOpenNavigation(false)}
      />
    </>
  );
}


