"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const wordTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordTrackRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.to(wordTrackRef.current, {
      y: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
    })
      .to({}, { duration: 1.5 })

      .to(wordTrackRef.current, {
        y: "-200%",
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to({}, { duration: 1.5 })

      .to(wordTrackRef.current, {
        y: "-300%",
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to({}, { duration: 1.5 })

      .set(wordTrackRef.current, {
        y: 0,
      });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        ".hero-line",
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          clearProps: "all",
        }
      )

        .fromTo(
          ".hero-divider",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.8,
            transformOrigin: "left center",
          },
          "-=0.45"
        )

        .fromTo(
          ".hero-text",
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.35"
        )

        .fromTo(
          ".hero-button",
          {
            y: 30,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "-=0.25"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[url('/heroBg.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

      <div className="relative z-10 max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl space-y-8 text-white">
          <h1 className="text-5xl font-light leading-tight tracking-wide md:text-6xl">
            <div className="overflow-hidden">
              <span className="hero-line block">
                Designs That Breathes Life
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="hero-line">
                Into Every{" "}
              </span>

              <span className="relative inline-flex h-[1em] min-w-[7ch] overflow-hidden align-baseline">
                <div ref={wordTrackRef} className="flex flex-col text-red-500">
                  <span className="h-[1em]">Corner</span>
                  <span className="h-[1em]">Home</span>
                  <span className="h-[1em]">Office</span>
                  <span className="h-[1em]">Corner</span> {/* duplicate */}
                </div>
              </span>
            </div>
          </h1>

          <div className="hero-divider h-1 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

          <p className="hero-text text-lg leading-relaxed text-slate-400">
            Step into a world where elegance meets comfort. We craft interiors
            that balance modern aesthetics with timeless warmth{" "}
            <span className="font-semibold text-gray-300">
              transforming ordinary spaces into
            </span>{" "}
            reflections of your personality, lifestyle, and dreams.
          </p>

          <button className="hero-button group relative h-14 w-3/4 overflow-hidden border border-white/35 px-10 transition-all duration-300 hover:border-white hover:shadow-2xl md:px-16">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex h-full items-center justify-center text-slate-100">
              VIEW OUR PROJECTS
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;