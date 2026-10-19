"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { siteConfig } from "@/content/site";

interface ReasonPoint {
  num: string;
  headline: string;
  description: string;
  detail: string;
}

const reasons: ReasonPoint[] = [
  {
    num: "01",
    headline: "We listen before we prescribe.",
    description:
      "Symptoms have a chronology. We reserve forty-five uninterrupted minutes to examine how your breathing shifts across the day, what breaks your sleep, and what prior tests revealed.",
    detail: "[INTAKE PROTOCOL: 45–60 MIN MINIMUM APPOINTMENT WINDOW]",
  },
  {
    num: "02",
    headline: "Diagnostics conducted under one roof.",
    description:
      "Precision spirometry, airflow loop analysis, and home sleep testing telemetry are managed in-house. You avoid waiting weeks between outsourced hospital centers.",
    detail: "[DIAGNOSTIC LAB: CALIBRATED IN-OFFICE PULMONARY TELEMETRY]",
  },
  {
    num: "03",
    headline: "Sleep treated as medical architecture.",
    description:
      "Disrupted rest is not an annoyance; it is physiological strain on your cardiovascular and pulmonary systems. We treat nocturnal hypoxia and sleep architecture with clinical rigor.",
    detail: "[BOARD CERTIFIED CLINICAL SLEEP SPECIALIZATION]",
  },
  {
    num: "04",
    headline: "Direct follow-through with your physician.",
    description:
      "When blood panels or pulmonary curves return, you review them directly with the physician who examined you — not through automated portal summaries or call centers.",
    detail: "[CONTINUITY OF CARE: DIRECT PHYSICIAN REVIEW]",
  },
];

export const WhyUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !pointsRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const svgLines = pointsRef.current.querySelectorAll(".connector-svg line");

    svgLines.forEach((line) => {
      gsap.fromTo(
        line,
        { strokeDashoffset: 120 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [prefersReduced]);

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-500"
      aria-label="Why Choose Us"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Sticky Left Statement Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
              [ Philosophy · Act II ]
            </span>
            <span className="w-8 h-[1px] bg-hairline" />
            <span className="font-mono text-xs text-[var(--subtle)]">
              Chapter 04
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)] tracking-tight leading-[1.08]">
            Care measured in minutes, not quotas.
          </h2>

          <p className="text-base md:text-lg text-[var(--subtle)] leading-relaxed">
            Standard clinical models schedule four patients every hour. We schedule
            one. When a physician has the time to examine subtle systemic shifts,
            subtle diagnoses stop slipping through the cracks.
          </p>

          <div className="pt-4 border-t border-hairline">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[var(--clay)] hover:text-[var(--foreground)] transition-colors font-medium"
            >
              <span>Schedule a comprehensive intake</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Scrolling Points with Line-Draw SVG Connectors */}
        <div ref={pointsRef} className="lg:col-span-7 space-y-16">
          {reasons.map((reason, idx) => (
            <div key={idx} className="relative">
              {/* Connector line between steps */}
              {idx > 0 && (
                <div className="h-12 w-8 mb-4 pl-3" aria-hidden="true">
                  <svg
                    className="connector-svg w-2 h-full overflow-visible"
                    viewBox="0 0 2 60"
                  >
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="60"
                      stroke="var(--clay)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeDashoffset={prefersReduced ? "0" : "120"}
                    />
                  </svg>
                </div>
              )}

              {/* Point Card */}
              <div className="border-t border-hairline pt-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-[var(--clay)] tracking-widest">
                    REASON {reason.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--subtle)]">
                    {reason.detail}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[var(--foreground)] tracking-tight">
                  {reason.headline}
                </h3>

                <p className="text-sm md:text-base text-[var(--subtle)] leading-relaxed max-w-xl">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
