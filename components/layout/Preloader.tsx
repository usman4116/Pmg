"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("pervaiz_preloader_seen");
    if (hasSeen || prefersReduced) {
      return;
    }
    setMounted(true);
    setIsVisible(true);
  }, [prefersReduced]);

  useEffect(() => {
    if (!isVisible || !lineRef.current || !wordRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("pervaiz_preloader_seen", "true");
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.35,
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
      { opacity: 1, scale: 1.03, duration: 0.45, ease: "power2.out" },
      "-=0.1"
    );

    // 3. Exhale and fade (0.25s)
    tl.to(wordRef.current, {
      scale: 1,
      opacity: 0.8,
      duration: 0.25,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  const handleSkip = () => {
    sessionStorage.setItem("pervaiz_preloader_seen", "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F8F5F0] text-[#0E1512]"
      role="dialog"
      aria-label="Loading animation"
    >
      <div className="relative flex flex-col items-center gap-6 max-w-sm w-full px-8">
        <div
          ref={wordRef}
          className="font-serif text-2xl md:text-3xl tracking-tight opacity-0 select-none text-center text-[#0E1512]"
        >
          Pervaiz Medical Group
        </div>

        {/* Hairline progress bar */}
        <div className="w-full h-[1.5px] bg-[var(--hairline)] relative overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-[var(--clay)] origin-left"
          />
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 text-[11px] font-mono tracking-widest text-[#0E1512]/50 hover:text-[#0E1512] uppercase transition-colors"
          tabIndex={0}
        >
          [ Skip ]
        </button>
      </div>
    </div>
  );
}
