"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem("pervaiz_preloader_seen");
    if (hasSeen || prefersReduced) {
      return;
    }

    setIsVisible(true);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("pervaiz_preloader_seen", "true");
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => setIsVisible(false),
          });
        }
      },
    });

    // 1. Single thin line draws across (0.5s)
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.5, ease: "power3.inOut" }
    );

    // 2. Slow "inhale" scale of the logo word (0.5s)
    tl.fromTo(
      wordRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1.04, duration: 0.5, ease: "power2.out" },
      "-=0.1"
    );

    // 3. Exhale and fade (0.3s)
    tl.to(wordRef.current, {
      scale: 1,
      opacity: 0.8,
      duration: 0.25,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [prefersReduced]);

  const handleSkip = () => {
    sessionStorage.setItem("pervaiz_preloader_seen", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--ink)] text-[#F6F1E7]"
      role="dialog"
      aria-label="Loading animation"
    >
      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full px-8">
        <div
          ref={wordRef}
          className="font-serif text-2xl md:text-3xl tracking-tight opacity-0 select-none text-center"
        >
          Pervaiz Medical Group
        </div>

        {/* Hairline progress bar */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-[#F6F1E7] origin-left"
          />
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 text-[11px] font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors"
          tabIndex={0}
        >
          [ Skip ]
        </button>
      </div>
    </div>
  );
}
