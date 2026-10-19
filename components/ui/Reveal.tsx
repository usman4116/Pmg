"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = motionTokens.reveal.y,
  duration = motionTokens.durations.base,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    const tween = gsap.fromTo(
      el,
      {
        y: y,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: motionTokens.eases.reveal,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [prefersReduced, delay, y, duration]);

  return (
    <div ref={ref} className={cn("will-change-[transform,opacity]", className)}>
      {children}
    </div>
  );
};
