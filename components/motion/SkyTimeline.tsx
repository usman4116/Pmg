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
      document.documentElement.style.setProperty("--sky", "#F8F5F0");
      document.documentElement.style.setProperty("--foreground", "#0E1512");
      document.documentElement.style.setProperty("--subtle", "#2F4A3C");
      document.documentElement.style.setProperty("--hairline", "rgba(14, 21, 18, 0.12)");
      return;
    }

    // Four subtle light act transitions:
    // Act I: Hero + Intro → #F8F5F0 (Morning Alabaster)
    // Act II: Services + Why Us → #F2EADF (Warm Soft Amber/Linen)
    // Act III: Conditions + Team + Testimonials + Insurance + Facilities + FAQ → #FAF7F2 (Pure Paper Daylight)
    // Act IV: Booking CTA + Footer → #EFE7DC (Warm Golden Dusk Parchment)

    const ctx = gsap.context(() => {
      // Transition to Act II (Warm Linen) when entering Services
      ScrollTrigger.create({
        trigger: "#services",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#F2EADF",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.14)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#F8F5F0",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.12)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
      });

      // Transition to Act III (Luminous Paper Daylight) when entering Conditions
      ScrollTrigger.create({
        trigger: "#conditions",
        start: "top 60%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#FAF7F2",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.12)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#F2EADF",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.14)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
      });

      // Transition to Act IV (Warm Dusk Parchment) when entering Booking CTA
      ScrollTrigger.create({
        trigger: "#booking",
        start: "top 60%",
        onEnter: () => {
          gsap.to("html", {
            "--sky": "#EFE7DC",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.14)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to("html", {
            "--sky": "#FAF7F2",
            "--foreground": "#0E1512",
            "--subtle": "#2F4A3C",
            "--hairline": "rgba(14, 21, 18, 0.12)",
            duration: 1.0,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return null;
}
