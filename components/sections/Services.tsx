"use client";

import React, { useRef, useEffect } from "react";
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

      // Native sticky horizontal translation — zero DOM pin spacers, 100% React safe
      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
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

      // Clip path reveal on chapter images (keep first chapter open immediately)
      panels.forEach((panel, idx) => {
        const img = panel.querySelector(".chapter-image-wrap");
        if (img && idx > 0) {
          gsap.fromTo(
            img,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 90%",
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
      className="relative w-full md:h-[260vh] h-auto transition-colors duration-500 bg-[var(--sky)]"
      aria-label="Healthcare Services Chapters"
    >
      {/* Sticky Fullscreen Frame for Desktop (Native CSS sticky) */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Chapter Eyebrow Header */}
        <div className="pt-16 pb-6 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-end justify-between border-b border-hairline">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)] block mb-1">
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
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-chapter-panel w-full md:w-[85vw] lg:w-[75vw] h-auto md:h-[75vh] md:min-h-[580px] flex-shrink-0 flex flex-col justify-between p-6 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-hairline"
            >
              {/* Top row: Numeral + Eyebrow */}
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[var(--clay)] font-semibold">
                  {service.eyebrow}
                </span>
                <span className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-[var(--foreground)] opacity-20">
                  {service.numeral}
                </span>
              </div>

              {/* Middle Content: Asymmetrical Two-Column Editorial Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6 items-center">
                {/* Copy Side (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] tracking-tight leading-[1.1]">
                    {service.title}
                  </h3>

                  <p className="font-serif text-lg md:text-xl text-[var(--foreground)] font-normal leading-snug">
                    {service.lead}
                  </p>

                  <p className="text-sm md:text-base text-[var(--subtle)] leading-relaxed max-w-xl">
                    {service.body}
                  </p>

                  {/* Clinical Focus List */}
                  <div className="pt-3 border-t border-hairline">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--subtle)] block mb-2">
                      Clinical Focus:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[var(--foreground)]">
                      {service.clinicalFocus.map((item, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clay)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image Side (5 cols) with real photograph */}
                <div className="lg:col-span-5 h-[240px] sm:h-[300px] lg:h-[360px] relative w-full">
                  <div className="chapter-image-wrap absolute inset-0 overflow-hidden rounded-lg bg-[var(--foreground)]/5 shadow-md border border-hairline">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Text CTA */}
              <div className="pt-3 flex items-center justify-between border-t border-hairline">
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Book"
                  className="group inline-flex items-center gap-3 text-xs md:text-sm font-sans uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--clay)] transition-colors font-medium"
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
      </div>
    </section>
  );
};
