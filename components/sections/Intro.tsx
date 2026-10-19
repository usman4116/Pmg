"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const introText =
    "Most lung and sleep conditions do not begin in a hospital emergency room. They begin quietly — as a morning fatigue you dismissed, a shallow breath on the stairs, or a nocturnal cough you learned to ignore. We practice medicine that pauses to measure what others rush past: the mechanics of your airway, the neurology of your quiet hours, and the vital continuity between sleep and day.";

  const words = introText.split(" ");

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !textRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const wordSpans = textRef.current.querySelectorAll(".intro-word");

    gsap.fromTo(
      wordSpans,
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.8,
        },
      }
    );

    if (factsRef.current) {
      gsap.fromTo(
        factsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: factsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [prefersReduced]);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-6xl mx-auto transition-colors duration-500"
      aria-label="Clinical Introduction"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          Act I · The Baseline
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 01
        </span>
      </div>

      {/* Scrubbed Large Paragraph */}
      <p
        ref={textRef}
        className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-tight text-[var(--foreground)]"
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className={`intro-word inline-block mr-[0.28em] transition-opacity duration-150 ${
              prefersReduced ? "opacity-100" : "opacity-20"
            }`}
          >
            {word}
          </span>
        ))}
      </p>

      {/* One line of facts below with hairline rules */}
      <div
        ref={factsRef}
        className="mt-20 pt-8 border-t border-hairline grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--subtle)] block mb-1">
            Clinical Intake Protocol
          </span>
          <p className="font-serif text-lg text-[var(--foreground)]">
            [45–60 MIN UNHURRIED INTAKE]
          </p>
          <p className="text-xs text-[var(--subtle)] mt-1">
            Dedicated time for symptom chronology review before diagnosis.
          </p>
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--subtle)] block mb-1">
            Diagnostic Scope
          </span>
          <p className="font-serif text-lg text-[var(--foreground)]">
            [IN-OFFICE SPIROMETRY & SLEEP STUDY]
          </p>
          <p className="text-xs text-[var(--subtle)] mt-1">
            Precision pulmonary loop testing and home polysomnography telemetry.
          </p>
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--subtle)] block mb-1">
            Integrated Specialties
          </span>
          <p className="font-serif text-lg text-[var(--foreground)]">
            [INTERNAL · PULMONARY · SLEEP MEDICINE]
          </p>
          <p className="text-xs text-[var(--subtle)] mt-1">
            Triad care linking daylight energy to nocturnal respiratory health.
          </p>
        </div>
      </div>
    </section>
  );
};
