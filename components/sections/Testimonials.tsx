"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { testimonialsData } from "@/content/testimonials";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils";

export const Testimonials: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);
  const prefersReduced = useReducedMotion();

  const total = testimonialsData.length;
  const activeItem = testimonialsData[currentIdx];

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  // Keyboard arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay timer with progress update (7s interval)
  useEffect(() => {
    if (isPaused || prefersReduced) return;

    const interval = 50; // ms
    const step = (interval / 7000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, prefersReduced, handleNext]);

  // Touch swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
  };

  return (
    <section
      id="testimonials"
      className="py-28 md:py-40 px-6 md:px-12 max-w-5xl mx-auto transition-colors duration-500"
      aria-label="Patient Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Chapter Eyebrow */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          [ Act III · Experiences ]
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 06
        </span>
      </div>

      {/* Single Large Quote (Cross-fading) */}
      <div className="min-h-[280px] sm:min-h-[220px] flex flex-col justify-center">
        <blockquote
          key={activeItem.id}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] tracking-tight leading-[1.25] transition-opacity duration-500 ease-out"
        >
          {activeItem.quote}
        </blockquote>
      </div>

      {/* Author & Context */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-baseline justify-between border-t border-hairline pt-6 gap-4">
        <div>
          <cite className="font-serif text-lg not-italic text-[var(--foreground)] font-medium block">
            {activeItem.author}
          </cite>
          <span className="text-xs text-[var(--subtle)] font-sans">
            {activeItem.context} · {activeItem.date}
          </span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous quote"
              className="p-2 border border-hairline rounded-full hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--clay)]"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next quote"
              className="p-2 border border-hairline rounded-full hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--clay)]"
            >
              →
            </button>
          </div>

          <span className="font-mono text-xs text-[var(--subtle)]">
            {currentIdx + 1} / {total}
          </span>
        </div>
      </div>

      {/* Slow progress line */}
      <div className="mt-6 w-full h-[1.5px] bg-hairline relative overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-[var(--clay)] transition-[width] ease-linear duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Required Consent & Privacy Disclosure */}
      <div className="mt-6 text-[11px] font-mono text-[var(--subtle)] uppercase tracking-wider">
        {activeItem.consentFlag}
      </div>
    </section>
  );
};
