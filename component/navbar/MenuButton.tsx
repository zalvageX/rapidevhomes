

"use client";

type MenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

export default function MenuButton({
  open,
  onClick,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle navigation"
      className="group relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 md:hidden"
    >
      <span className="relative h-5 w-6">
        {/* Top */}
        <span
          className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]
          ${
            open
              ? "top-2 rotate-45"
              : "rotate-0"
          }`}
        />

        {/* Middle */}
        <span
          className={`absolute left-0 top-2 h-[2px] w-full rounded-full bg-white transition-all duration-300
          ${
            open
              ? "opacity-0 scale-x-0"
              : "opacity-100 scale-x-100"
          }`}
        />

        {/* Bottom */}
        <span
          className={`absolute left-0 top-4 h-[2px] w-full rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]
          ${
            open
              ? "top-2 -rotate-45"
              : "rotate-0"
          }`}
        />
      </span>
    </button>
  );
}

