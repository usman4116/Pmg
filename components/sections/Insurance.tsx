"use client";

import React from "react";
import { insuranceData } from "@/content/insurance";
import { Marquee } from "@/components/ui/Marquee";
import { siteConfig } from "@/content/site";

export const Insurance: React.FC = () => {
  return (
    <section
      id="insurance"
      className="py-24 md:py-36 border-t border-b border-hairline overflow-hidden transition-colors duration-500"
      aria-label="Insurance and Coverage Network"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        {/* Chapter Eyebrow */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
            [ Act III · Coverage ]
          </span>
          <span className="w-12 h-[1px] bg-hairline" />
          <span className="font-mono text-xs text-[var(--subtle)]">
            Chapter 07
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] tracking-tight leading-[1.12]">
              {insuranceData.title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--subtle)] leading-relaxed">
              {insuranceData.body}
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-sans uppercase tracking-widest bg-[var(--foreground)] text-[var(--sky)] hover:opacity-90 transition-all font-medium"
            >
              <span>{insuranceData.ctaText}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Typographic Wall: Dual Opposite-Direction Marquees */}
      <div className="space-y-4 my-8">
        {/* Row 1: Leftward drift */}
        <Marquee direction="left" speed={35} className="border-t border-b border-hairline py-4">
          {insuranceData.rowOne.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] tracking-tight opacity-75 hover:opacity-100 transition-opacity">
                {item.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--clay)] px-2 py-0.5 border border-[var(--clay)]/30 rounded">
                {item.status}
              </span>
              <span className="text-[var(--subtle)] opacity-40 font-serif text-xl" aria-hidden="true">
                /
              </span>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Rightward drift */}
        <Marquee direction="right" speed={45} className="border-b border-hairline py-4">
          {insuranceData.rowTwo.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] tracking-tight opacity-75 hover:opacity-100 transition-opacity">
                {item.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--clay)] px-2 py-0.5 border border-[var(--clay)]/30 rounded">
                {item.status}
              </span>
              <span className="text-[var(--subtle)] opacity-40 font-serif text-xl" aria-hidden="true">
                /
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Coverage Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <p className="text-xs text-[var(--subtle)] max-w-3xl leading-relaxed font-mono">
          {insuranceData.disclaimer}
        </p>
      </div>
    </section>
  );
};
