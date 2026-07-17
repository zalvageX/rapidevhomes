"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Concepts = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".concept-line",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="concepts"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left side: Text */}
          <div className="space-y-6 text-white">
            <h2 className="concept-line text-4xl font-light tracking-tight leading-tight">
              EXPLORE DESIGN CONCEPTS <br /> THAT INSPIRE
            </h2>

            <p className="concept-line text-slate-400 leading-relaxed max-w-md">
              We believe your home should be a reflection of who you are —
              <span className="font-semibold text-white">
                a
                space that balances creativity with warmth,
              </span>
               transforming ordinary
              rooms into functional living environments that inspire art and
              comfort.
            </p>

            <div className="concept-line flex gap-4 pt-4">
              <button className="group relative h-12 w-40 overflow-hidden border border-white/35 bg-white text-black font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(239,68,68,.28)]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex h-full items-center justify-center">
                  VIEW PROJECTS
                </span>
              </button>

              <button className="group relative h-12 w-40 overflow-hidden border border-white/35 bg-transparent text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(239,68,68,.28)]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex h-full items-center justify-center">
                  ABOUT US
                </span>
              </button>
            </div>
          </div>

          {/* Right side: Cards */}
          <div className="concept-line flex flex-col sm:flex-row gap-6 justify-center">
            {/* Card 1 */}
            <div className="relative w-full sm:w-1/2 rounded-lg overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/explore1.png"
                alt="Design concept"
                className="w-full h-[420px] object-cover opacity-90"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-6">
                <h3 className="text-lg font-medium text-white">Design</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Premium interior design concepts that elevate spaces.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full sm:w-1/2 rounded-lg overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/explore2.png"
                alt="Concept showcase"
                className="w-full h-[420px] object-cover opacity-90"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-6">
                <h3 className="text-lg font-medium text-white">Concept</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Creative approaches that redefine modern living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concepts;
