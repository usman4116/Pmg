"use client";

import React from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
      style={{
        ["--duration" as string]: `${speed}s`,
      }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-12 py-3",
          prefersReduced ? "animate-none" : "animate-marquee",
          direction === "right" && !prefersReduced && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-around gap-12 py-3",
          prefersReduced ? "hidden" : "animate-marquee",
          direction === "right" && !prefersReduced && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
