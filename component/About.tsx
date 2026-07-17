"use client";

const About = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left side: Image / visual */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
            <img
              src="/aboutUs1.png"
              alt="Interior design showcase"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Right side: Text */}
          <div className="space-y-6 text-white">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              About <span className="text-red-500">Rapidev Homes</span>
            </h2>

            <p className="text-slate-300 leading-relaxed">
              At Rapidev Homes, we believe that every space tells a story. Our
              mission is to craft interiors that balance modern aesthetics with
              timeless warmth — transforming ordinary rooms into extraordinary
              experiences.
            </p>

            <p className="text-slate-400 leading-relaxed">
              With a passion for detail and a commitment to comfort, we design
              environments that reflect your personality, lifestyle, and dreams.
              From concept to completion, our team ensures elegance meets
              functionality in every corner.
            </p>

            {/* CTA */}
            <button className="group relative mt-4 h-14 w-full max-w-xs overflow-hidden border border-white/35 px-8 transition-all duration-300 hover:border-white hover:shadow-2xl">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex h-full items-center justify-center text-slate-100">
                Learn More →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
