"use client";

import { forwardRef } from "react";

const FloatingIndicator = forwardRef<HTMLSpanElement>((_, ref) => {
  return (
    <span
      ref={ref}
      className="
        pointer-events-none
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        rounded-full
        border
        border-white/10
        bg-white/8
        backdrop-blur-xl
        shadow-[0_10px_35px_rgba(0,0,0,.25)]
      "
    />
  );
});

FloatingIndicator.displayName = "FloatingIndicator";

export default FloatingIndicator;