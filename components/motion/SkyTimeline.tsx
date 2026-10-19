"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

export default function SkyTimeline() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      // In reduced motion, avoid scroll-driven background interpolation
      document.documentElement.style.setProperty("--sky", "#0E1512");
      document.documentElement.style.setProperty("--foreground", "#F6F1E7");
      return;
    }

    // Act triggers:
    // Act I: Hero + Intro (Night -> Deep Ink)
    // Act II: Services + Why Us (Dawn -> Warm Amber)
    // Act III: Conditions + Team + Testimonials + Insurance + Facilities + FAQ (Daylight -> Paper White)
    // Act IV: Booking CTA + Footer (Evening -> Deep Night/Ink)

    const ctx = gsap.context(() => {
      // Transition to Act II (Dawn) when entering Services
      ScrollTrigger.create({
        trigger: "#services",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#F2D9B8",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.16)",
            duration: 1.2,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#0E1512",
            "--foreground": "#F6F1E7",
            "--subtle": "rgba(246, 241, 231, 0.70)",
            "--hairline": "rgba(246, 241, 231, 0.14)",
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });

      // Transition to Act III (Daylight) when entering Conditions
      ScrollTrigger.create({
        trigger: "#conditions",
        start: "top 60%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#F6F1E7",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.14)",
            duration: 1.2,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#F2D9B8",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.16)",
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });

      // Transition to Act IV (Evening) when entering Booking CTA
      ScrollTrigger.create({
        trigger: "#booking",
        start: "top 60%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#121A1F",
            "--foreground": "#F6F1E7",
            "--subtle": "rgba(246, 241, 231, 0.70)",
            "--hairline": "rgba(246, 241, 231, 0.14)",
            duration: 1.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#F6F1E7",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.14)",
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return null;
}
