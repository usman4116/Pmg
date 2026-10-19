"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  children,
  as: Component = "h2",
  className,
  delay = 0,
  triggerOnScroll = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Split lines on newline or render as word spans
  const lines = children.split("\n");

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current.querySelectorAll(".split-line-inner");

    if (triggerOnScroll) {
      gsap.fromTo(
        elements,
        {
          yPercent: 115,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: motionTokens.durations.slow,
          ease: motionTokens.eases.reveal,
          stagger: motionTokens.stagger.text,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      gsap.fromTo(
        elements,
        {
          yPercent: 115,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: motionTokens.durations.slow,
          ease: motionTokens.eases.reveal,
          stagger: motionTokens.stagger.text,
          delay: delay,
        }
      );
    }
  }, [prefersReduced, delay, triggerOnScroll]);

  return (
    // @ts-expect-error dynamic component ref
    <Component ref={containerRef} className={cn("font-display", className)}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1 -mb-1">
          <span className="split-line-inner inline-block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
};
