"use client"

import { NAV_LINKS } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react"
import MenuSvg from "../Menu"

const Navbar = () => {

  const [openNavigation, setOpenNavigation] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const toggleNavigation = () => setOpenNavigation((prev) => !prev)

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = openNavigation ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [openNavigation])

  // Scroll background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "contact"]
      let current = "home"

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id
          }
        }
      })

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 z-50 border-b border-white/10 transition-all duration-500 ${scrolled ? "bg-black/20 backdrop-blur-md" : ""}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        <Link href="#home">
          <div className="text-2xl font-bold flex-1">
            <span className="text-white">
              RAPID<span className="text-red-600">E</span>V
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`#${link.key}`}
                className={`relative pb-1 text-sm transition-colors 
                  ${activeSection === link.key ? "text-red-500 after:w-full" : "text-white after:w-0"} 
                  hover:text-red-500 hover:after:w-full
                  after:block after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="py-2 px-5 rounded-md bg-white/70 text-black/80 font-semibold hover:bg-white hover:text-black transition">
            GET IN TOUCH
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleNavigation} className="md:hidden ml-auto z-50">
          <MenuSvg openNavigation={openNavigation} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out
          ${openNavigation 
            ? "opacity-100 visible pointer-events-auto translate-y-0" 
            : "opacity-0 -translate-y-10 invisible pointer-events-none"}
          bg-[url('/dropdown.png')] bg-cover bg-center`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`#${link.key}`}
              onClick={() => setOpenNavigation(false)}
              className={`text-2xl font-bold transition 
                ${activeSection === link.key ? "text-red-500" : "text-white"} 
                hover:text-red-500`}
            >
              {link.label}
            </Link>
          ))}
          <button className="py-2 px-5 rounded-md bg-white/70 text-black/80 font-semibold hover:bg-white hover:text-black transition">
            GET IN TOUCH
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


// "use client"

// import { NAV_LINKS } from "@/constants"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import MenuSvg from "./Menu"

// const Navbar = () => {
//   const [openNavigation, setOpenNavigation] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")

//   const toggleNavigation = () => setOpenNavigation(prev => !prev)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 80)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
//       ${scrolled ? "bg-black/70 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         <Link href="#home" className="text-2xl font-bold text-white">
//           RAPID<span className="text-red-600">E</span>V
//         </Link>

//         {/* Desktop nav */}
//         <ul className="hidden md:flex gap-12">
//           {NAV_LINKS.map(link => (
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

//         {/* Mobile menu button */}
//         <button onClick={toggleNavigation} className="md:hidden ml-auto z-50">
//           <MenuSvg openNavigation={openNavigation} />
//         </button>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
