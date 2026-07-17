
const HeroScroll = () => {
  return (
    <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 
        flex-col items-center gap-3 lg:flex"
      >
        <span
          className="text-[11px] uppercase tracking-[0.35em] text-white/45 "
        >
          Scroll
        </span>

        <div
          className="relative h-14 w-[1px] overflow-hidden bg-white/15"
        >
          <div className="scroll-line absolute inset-x-0 top-0 h-6 bg-red-500" />
        </div>
      </div>
  )
}

export default HeroScroll


{/* Glassy card */}
      {/* <div className="flex items-center md:left-12 z-20 backdrop-blur-xs bg-black/20 border border-white/10 p-4 w-[90%] max-w-md text-white transition-all duration-700">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {backgrounds[currentBg].title}
          </h3>
          <p className="text-sm text-gray-300">
            {backgrounds[currentBg].description}
          </p>
          
          <div className="hero-progress mt-4 h-[3px] w-full origin-left bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full" />
        </div>

        
        <button
          onClick={() =>
            setCurrentBg((prev) => (prev + 1) % backgrounds.length)
          }
          className="group relative mt-2 h-24 overflow-hidden border border-white/35 px-8 transition-all duration-300 hover:border-white hover:shadow-2xl sm:px-10 md:px-16"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex h-full items-center justify-center text-slate-100">
            →
          </span>
        </button>
      </div> */}