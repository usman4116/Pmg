/**
 * Pervaiz Medical Group — Motion Design System Tokens
 * Strict GSAP & Motion configurations adhering to editorial cinematography rules.
 */

export const motionTokens = {
  durations: {
    fast: 0.4,
    base: 0.8,
    slow: 1.4,
    cinema: 2.2,
  },
  eases: {
    out: "power4.out",
    inOut: "power3.inOut",
    soft: "expo.out",
    smooth: "sine.inOut",
    reveal: "power4.out",
  },
  stagger: {
    text: 0.08,
    list: 0.12,
    grid: 0.15,
  },
  reveal: {
    y: 40,
    blur: 8,
    opacity: 0,
  },
} as const;

export const BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  desktop: "(min-width: 768px)",
  large: "(min-width: 1280px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
