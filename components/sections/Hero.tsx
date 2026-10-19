"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/content/site";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motionTokens } from "@/lib/motion";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Check Save-Data or slow connection
    interface NetworkInfo {
      saveData?: boolean;
      effectiveType?: string;
    }
    const navConn = (navigator as unknown as { connection?: NetworkInfo }).connection;
    const isSaveData = navConn?.saveData === true;
    const isSlowConn = navConn?.effectiveType === "2g" || navConn?.effectiveType === "slow-2g";

    if (!prefersReduced && !isSaveData && !isSlowConn) {
      setShouldLoadVideo(true);
    }
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !videoWrapperRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Pinned scrubbed scale-down of the cinematic video into a rounded frame
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Text fades and gently drifts upward
      tl.to(
        textContentRef.current,
        {
          opacity: 0,
          y: -60,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Video scales down into rounded frame
      tl.to(
        videoWrapperRef.current,
        {
          scale: 0.88,
          borderRadius: "28px",
          ease: "power2.inOut",
        },
        0
      );
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[var(--ink)]"
      aria-label="Hero Scene: A Day of Breath"
    >
      {/* Scalable Video Frame */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform origin-center transition-shadow duration-700"
      >
        {shouldLoadVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/video/poster.jpg"
            className="w-full h-full object-cover select-none"
            aria-hidden="true"
          >
            <source
              src="/video/hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src="/video/hero.webm" type="video/webm" />
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/video/poster.jpg"
            alt="Warm morning light softly illuminating calm linen bedsheets in a serene bedroom"
            fill
            priority
            className="object-cover select-none"
            sizes="100vw"
          />
        )}

        {/* Video Gradient Mask (natural blend into ink background) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(14,21,18,0.96) 0%, rgba(14,21,18,0.65) 35%, rgba(14,21,18,0.2) 70%, rgba(14,21,18,0.4) 100%)",
          }}
        />
      </div>

      {/* Hero Content (Line-by-line Masked Headline) */}
      <div
        ref={textContentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center pt-16"
      >
        {/* Eyebrow Chapter */}
        <div className="overflow-hidden mb-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#F6F1E7]/70">
            [ Act I · Night to Dawn ]
          </p>
        </div>

        {/* Masked Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F6F1E7] font-normal leading-[1.08] max-w-4xl">
          <span className="block overflow-hidden">
            <span className="inline-block animate-hero-line-1">
              The first breath of morning
            </span>
          </span>
          <span className="block overflow-hidden mt-1">
            <span className="inline-block animate-hero-line-2">
              should never feel like work.
            </span>
          </span>
        </h1>

        {/* Lead Subtitle */}
        <p className="mt-8 max-w-2xl font-sans text-base sm:text-lg md:text-xl text-[#F6F1E7]/80 leading-relaxed font-light">
          Board-certified pulmonary, sleep, and restorative primary care.
          Unhurried medicine in a clinical space built for quiet precision.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Book"
            className="px-8 py-4 rounded-full text-xs font-sans uppercase tracking-widest bg-[#F6F1E7] text-[var(--ink)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 font-medium shadow-lg"
          >
            Book a visit
          </a>

          <a
            href="#services"
            className="text-xs font-sans tracking-widest uppercase text-[#F6F1E7]/75 hover:text-[#F6F1E7] transition-colors underline underline-offset-8"
          >
            See what we treat ↓
          </a>
        </div>
      </div>

      {/* Quiet bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#F6F1E7]">
          Scroll to breathe
        </span>
        <div className="w-[1px] h-6 bg-[#F6F1E7]/30 overflow-hidden relative">
          <div className="w-full h-full bg-[#F6F1E7] animate-pulse" />
        </div>
      </div>
    </section>
  );
};
