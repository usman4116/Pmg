"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer || prefersReduced) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check if hovering over CTA or interactive element
      const target = e.target as HTMLElement | null;
      const ctaElement = target?.closest("[data-cursor], a, button");

      if (ctaElement) {
        const cursorText = ctaElement.getAttribute("data-cursor") || (ctaElement.textContent?.includes("Book") ? "Book" : "");
        if (cursorText) {
          gsap.to(cursor, {
            scale: 1.8,
            backgroundColor: "var(--clay)",
            borderColor: "transparent",
            duration: 0.25,
            ease: "power2.out",
          });
          if (textRef.current) {
            textRef.current.textContent = cursorText;
            gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.2 });
          }
        } else {
          gsap.to(cursor, {
            scale: 1.4,
            backgroundColor: "transparent",
            borderColor: "var(--foreground)",
            duration: 0.25,
            ease: "power2.out",
          });
          if (textRef.current) {
            gsap.to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
          }
        }
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "var(--foreground)",
          duration: 0.25,
          ease: "power2.out",
        });
        if (textRef.current) {
          gsap.to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [prefersReduced]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] flex items-center justify-center rounded-full border border-[var(--foreground)] w-8 h-8 transition-colors duration-150"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <span
        ref={textRef}
        className="text-[8px] font-sans font-medium uppercase tracking-widest text-[#F6F1E7] opacity-0 select-none"
      />
    </div>
  );
}
