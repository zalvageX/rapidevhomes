"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { backgrounds } from "@/constants";
import HeroScroll from "./navbar/HeroScroll";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const wordTrackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentBg, setCurrentBg] = useState(0);

  // Auto‑rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Animate progress bar
  useEffect(() => {
    gsap.killTweensOf(".hero-progress");
    gsap.fromTo(
      ".hero-progress",
      { scaleX: 0 },
      { scaleX: 1, duration: 8, ease: "none" }
    );
  }, [currentBg]);

  // Fade transition between backgrounds
  useEffect(() => {
    const bg = document.querySelectorAll(".hero-background")[currentBg];
    gsap.fromTo(
      bg,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }, [currentBg]);

  // Word track animation
  useEffect(() => {
    if (!wordTrackRef.current) return;
    const words = gsap.timeline({
      repeat: -1,
      defaults: { duration: 0.6, ease: "power2.inOut" },
    });

    words
      .to(wordTrackRef.current, { yPercent: -100 })
      .to({}, { duration: 1.8 })
      .to(wordTrackRef.current, { yPercent: -200 })
      .to({}, { duration: 1.8 })
      .to(wordTrackRef.current, { yPercent: -300 })
      .to(wordTrackRef.current, { yPercent: 0, duration: 0 });

    return () => { words.kill(); };
  }, []);

  // Divider shine + scroll effects
  useEffect(() => {
    const shine = gsap.to(".hero-divider div", {
      x: "300%",
      repeat: -1,
      duration: 2.5,
      ease: "none",
    });
    const scrollTween = gsap.to(".scroll-line", {
      y: 56,
      duration: 1.4,
      repeat: -1,
      ease: "power1.inOut",
    });
    gsap.to(".hero-background", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-line",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: { each: 0.15 } }
      )
        .fromTo(
          ".hero-divider",
          { scaleX: 0, xPercent: -66 },
          {
            xPercent: 0,
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "left center",
          },
          "-=0.45"
        )
        .fromTo(
          ".hero-text",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(
          ".hero-button",
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: { each: 0.15 },
            ease: "back.out(1.5)",
          },
          "-=0.25"
        );
    }, heroRef);

    return () => {
      scrollTween.kill();
      shine.kill();
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  // Mouse parallax (throttled with rAF)
  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    let frame: number;
    const move = (e: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

        gsap.to(contentRef.current, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".hero-background", {
          x: -x * 0.35,
          y: -y * 0.35,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    section.addEventListener("mousemove", move);
    return () => {
      section.removeEventListener("mousemove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);


  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`hero-background will-change-transform absolute inset-0 bg-cover bg-center
          ${currentBg === index ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${bg.image})`,
          }}
        />
      ))}
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/99" /> */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

      <div
        ref={contentRef}
       className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-24 sm:px-8 sm:py-28 md:px-12 md:py-32 lg:px-16 lg:py-36">
        <div
          className="absolute right-14 top-36 hidden rounded-full border border-white/10
          bg-white/5 px-7 py-4 backdrop-blur-xl lg:flex items-center gap-4 z-30"
          >
          <div className="h-3 w-3 rounded-full bg-red-500 animate-bounce" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Studio
            </p>
            <p className="text-sm">
              Rapidev Homes
            </p>
          </div>
        </div>
        <div className="absolute bottom-14 left-14 hidden lg:flex items-end gap-5 z-30">
          <span className="text-7xl font-thin text-white/20">
            0{currentBg + 1}
          </span>
          <div>

          <div className="h-px w-16 bg-white/15" />

          <p className="mt-3 text-xs tracking-[0.35em] uppercase text-white/45">
            Featured Project
          </p>

          </div>

        </div>
        <div className="max-w-3xl space-y-6 text-white">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-red-300 ">
            INTERIOR ARCHITECTURE
            </p>
          <h1 className="text-[44px] font-extralight leading-[0.95] tracking-[-0.04em] md:leading-[1.02] w-full">
            <div className="overflow-hidden">
              <div className="hero-line will-change-transform">
                <span className="block opacity-20">Designs That </span>
              </div>
            </div>

            <div className="mt-3 overflow-hidden sm:mt-4">
             <div className="hero-line will-change-transform">
                <span className="block">Breathes Life Into Every </span>
                <span className="relative inline-flex h-[1em] min-w-[7ch] overflow-hidden align-baseline">
                  <div ref={wordTrackRef} className="flex flex-col tracking-normal text-red-500">
                    <span className="h-[1em]">Corner</span>
                    <span className="h-[1em]">Home</span>
                    <span className="h-[1em]">Office</span>
                    <span className="h-[1em]">Corner</span>
                  </div>
                </span>
             </div>
            </div>
          </h1>

            {/* Animated Divider */}
          <div className="relative hero-divider h-[2px] w-[300%] max-w-xl overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500  via-pink-500 to-indigo-500"/>
          </div>

          <p className="hero-text will-change-transform max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Step into a world where elegance meets comfort. We craft interiors
            that balance modern aesthetics with timeless warmth{" "}
            <span className="font-semibold text-gray-300">
              transforming ordinary spaces into
            </span>{" "}
            reflections of your personality, lifestyle, and dreams.
          </p>
          <div className="flex gap-5 pt-2">
            <button className="hero-button will-change-transform group relative mt-2 h-14 w-1/2 max-w-xl  overflow-hidden border border-white/35 px-8 transition-all duration-300 hover:border-white hover:shadow-2xl sm:px-10 md:px-16">
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex h-full items-center justify-center text-slate-100">
                BOOK CONSULTATION
              </span>
            </button>
            <button className="hero-button group relative mt-2 h-14 w-1/2 max-w-xl overflow-hidden border border-white/35 bg-red-500/20 px-8 transition-all duration-300 hover:border-white hover:shadow-2xl sm:px-10 md:px-16">
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex h-full items-center justify-center text-slate-100">
                VIEW PORTFOLIO →
              </span>
            </button>

          </div>

        </div>
      </div>

      
      <div
        className="absolute bottom-10 right-10 z-30 hidden w-[380px]
        border border-white/10 bg-black/10 p-6 backdrop-blur-xs
        lg:block"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-red-400">
          Featured Design
        </p>

        <h3 className="mt-2 text-2xl font-light">
          {backgrounds[currentBg].title}
        </h3>

        <p className="mt-3 leading-7 text-white/60">
          {backgrounds[currentBg].description}
        </p>

        <div className="hero-progress mt-6 h-[2px] origin-left rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500" />
      </div>
      <HeroScroll />
    </section>
  );
};

export default Hero;
