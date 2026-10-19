"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const BookingCta: React.FC = () => {
  return (
    <section
      id="booking"
      className="relative min-h-[80vh] py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center bg-[#EFE7DC] text-[#0E1512] transition-colors duration-500 overflow-hidden border-t border-hairline"
      aria-label="Appointment Consultation and Booking"
    >
      {/* Subtle Warm Atmospheric Evening Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200, 107, 74, 0.14) 0%, rgba(239, 231, 220, 0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
        {/* Act IV Indicator */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)] font-semibold">
            [ Act IV · Dusk to Stillness ]
          </span>
          <span className="w-12 h-[1px] bg-[var(--hairline)]" />
          <span className="font-mono text-xs text-[var(--subtle)]">
            Chapter 10 · The Consultation
          </span>
        </div>

        {/* Giant Serif Statement */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0E1512] font-light leading-[1.05] max-w-3xl">
          A good night’s sleep begins with an unhurried morning.
        </h2>

        <p className="font-sans text-base sm:text-lg md:text-xl text-[#0E1512]/75 max-w-xl leading-relaxed">
          Begin with a comprehensive intake. We review your complete history,
          airflow dynamics, and sleep telemetry in a single collaborative visit.
        </p>

        {/* Desktop Magnetic Hover Button */}
        <div className="pt-4">
          <MagneticButton
            href={siteConfig.bookingUrl}
            strength={0.4}
            dataCursor="Book"
          >
            <span className="inline-flex items-center justify-center px-10 py-5 rounded-full text-xs md:text-sm font-sans uppercase tracking-[0.2em] bg-[var(--clay)] text-[#F6F1E7] hover:bg-[#B35838] transition-colors duration-300 shadow-md font-medium">
              Schedule Your Consultation
            </span>
          </MagneticButton>
        </div>

        {/* Reassurance Lines */}
        <div className="pt-8 flex flex-col sm:flex-row items-center gap-6 text-xs text-[var(--subtle)] font-mono">
          <span>Direct telephone intake: {siteConfig.phone}</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>In-network with major commercial plans & Medicare</span>
        </div>
      </div>
    </section>
  );
};
