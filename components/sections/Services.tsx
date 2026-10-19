"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "@/content/services";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { siteConfig } from "@/content/site";

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeNumeralRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-chapter-panel");
      const totalPanels = panels.length;

      // Pin track horizontally
      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            // Update active numeral directly without triggering React re-renders
            if (activeNumeralRef.current) {
              const current = Math.min(
                totalPanels,
                Math.max(1, Math.floor(self.progress * totalPanels) + 1)
              );
              activeNumeralRef.current.textContent = current < 10 ? `0${current}` : `${current}`;
            }
          },
        },
      });

      // Clip path reveal on chapter images as they come into view
      panels.forEach((panel) => {
        const img = panel.querySelector(".chapter-image-wrap");
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "center center",
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full overflow-hidden transition-colors duration-500"
      aria-label="Healthcare Services Chapters"
    >
      {/* Chapter Eyebrow Header */}
      <div className="pt-20 pb-8 px-6 md:px-12 max-w-7xl mx-auto flex items-end justify-between border-b border-hairline">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)] block mb-2">
            [ Act II · First Breath of Dawn ]
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-[var(--foreground)]">
            Healthcare Services
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-3 font-mono text-xs text-[var(--subtle)]">
          <span>CHAPTER</span>
          <span ref={activeNumeralRef} className="font-bold text-[var(--foreground)]">
            01
          </span>
          <span>/ 08</span>
        </div>
      </div>

      {/* Horizontal Track for Desktop, Stacked for Mobile */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:w-fit w-full"
      >
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            className="service-chapter-panel w-full md:w-[85vw] lg:w-[75vw] h-auto md:h-[82vh] md:min-h-[620px] flex-shrink-0 flex flex-col justify-between p-6 md:p-14 lg:p-16 border-b md:border-b-0 md:border-r border-hairline"
          >
            {/* Top row: Numeral + Eyebrow */}
            <div className="flex items-baseline justify-between border-b border-hairline pb-4">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--clay)]">
                {service.eyebrow}
              </span>
              <span className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-[var(--foreground)] opacity-25">
                {service.numeral}
              </span>
            </div>

            {/* Middle Content: Asymmetrical Two-Column Editorial Layout (NOT cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8 items-center">
              {/* Copy Side (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--foreground)] tracking-tight leading-[1.08]">
                  {service.title}
                </h3>

                <p className="font-serif text-xl md:text-2xl text-[var(--foreground)] font-normal leading-snug">
                  {service.lead}
                </p>

                <p className="text-sm md:text-base text-[var(--subtle)] leading-relaxed max-w-xl">
                  {service.body}
                </p>

                {/* Clinical Focus List */}
                <div className="pt-4 border-t border-hairline">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--subtle)] block mb-2">
                    Clinical Protocols:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-[var(--foreground)]">
                    {service.clinicalFocus.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--clay)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Side (5 cols) with clip-path mask */}
              <div className="lg:col-span-5 h-[260px] sm:h-[340px] lg:h-[420px] relative w-full">
                <div className="chapter-image-wrap absolute inset-0 overflow-hidden rounded-lg bg-[var(--ink)]/10 shadow-lg">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Text CTA */}
            <div className="pt-4 flex items-center justify-between border-t border-hairline">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Book"
                className="group inline-flex items-center gap-3 text-xs md:text-sm font-sans uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--clay)] transition-colors"
              >
                <span>{service.ctaText}</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </a>

              <span className="font-mono text-xs text-[var(--subtle)]">
                {service.numeral} / 08
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator at bottom (Desktop) */}
      <div className="hidden md:block w-full h-[2px] bg-hairline relative">
        <div
          ref={progressBarRef}
          className="h-full bg-[var(--clay)] origin-left transform scale-x-0 will-change-transform transition-transform duration-75"
        />
      </div>
    </section>
  );
};
