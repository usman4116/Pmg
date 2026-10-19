"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamData } from "@/content/team";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current.querySelectorAll(".team-member-card");

    cards.forEach((card, idx) => {
      // Parallax at staggered speeds
      const speed = teamData[idx]?.parallaxSpeed || 0.15;
      gsap.to(card, {
        y: -1 * speed * 250,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, [prefersReduced]);

  return (
    <section
      id="team"
      ref={containerRef}
      className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-500 overflow-hidden"
      aria-label="Medical Physicians and Specialists"
    >
      {/* Chapter Eyebrow */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          [ Act III · Physicians ]
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 05
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-hairline gap-6">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--foreground)]">
            Clinical Leadership
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--subtle)] max-w-lg">
            Physicians who practice diagnostic medicine as a discipline of
            thorough observation.
          </p>
        </div>

        <span className="font-mono text-xs text-[var(--subtle)] uppercase tracking-wider">
          All credentials independently verifiable
        </span>
      </div>

      {/* Offset Staggered Portraits Grid */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
        {teamData.map((doc, idx) => {
          // Asymmetric offsets for editorial rhythm
          const offsetClass =
            idx === 1
              ? "md:mt-16 lg:mt-24"
              : idx === 2
              ? "lg:mt-12"
              : "mt-0";

          return (
            <div
              key={doc.id}
              className={`team-member-card group relative ${offsetClass}`}
            >
              {/* Tall Portrait Aspect Ratio (3:4 or 4:5) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[var(--ink)]/10 shadow-sm border border-hairline">
                <Image
                  src={doc.image.src}
                  alt={doc.image.alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle Grain and Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                {/* Quiet Detail Reveal on Hover (never a flip card) */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-[var(--ink)]/90 backdrop-blur-sm text-[#F6F1E7] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--clay)] mb-1">
                    Clinical Focus
                  </p>
                  <p className="text-xs leading-relaxed text-[#F6F1E7]/90">
                    {doc.consultationNote}
                  </p>
                </div>
              </div>

              {/* Physician Info Under Photo */}
              <div className="mt-6 space-y-2">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--clay)] block">
                  {doc.title}
                </span>

                <h3 className="font-serif text-2xl text-[var(--foreground)] tracking-tight">
                  {doc.name}
                </h3>

                <p className="text-xs font-medium text-[var(--foreground)]/80">
                  {doc.specialty}
                </p>

                <p className="text-[11px] font-mono text-[var(--subtle)] tracking-wide">
                  {doc.credentials}
                </p>

                <p className="text-xs text-[var(--subtle)] leading-relaxed pt-2 border-t border-hairline">
                  {doc.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
