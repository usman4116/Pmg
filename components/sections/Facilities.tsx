"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { facilitiesData } from "@/content/facilities";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export const Facilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !panelsRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const roomLayers = gsap.utils.toArray<HTMLElement>(".facility-room-layer");
      const captions = gsap.utils.toArray<HTMLElement>(".facility-caption-block");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Layer 1 is visible by default
      // Layer 2 wipes in from bottom
      if (roomLayers[1]) {
        tl.fromTo(
          roomLayers[1],
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" },
          0.5
        );
        if (captions[0] && captions[1]) {
          tl.to(captions[0], { opacity: 0, y: -30, ease: "power2.out" }, 0.4);
          tl.fromTo(captions[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.6);
        }
      }

      // Layer 3 wipes in from bottom
      if (roomLayers[2]) {
        tl.fromTo(
          roomLayers[2],
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut" },
          1.5
        );
        if (captions[1] && captions[2]) {
          tl.to(captions[1], { opacity: 0, y: -30, ease: "power2.out" }, 1.4);
          tl.fromTo(captions[2], { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "power2.out" }, 1.6);
        }
      }
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      id="facilities"
      ref={containerRef}
      className="relative w-full min-h-screen transition-colors duration-500 overflow-hidden bg-[var(--ink)] text-[#F6F1E7]"
      aria-label="Clinical Facilities and Architectural Environment"
    >
      {/* Desktop Pinned Fullscreen Scene */}
      <div className="hidden md:flex relative w-full h-screen flex-col justify-between p-12 lg:p-16">
        {/* Top Header */}
        <div className="relative z-20 flex items-baseline justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
              [ Act III · Architecture ]
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <h2 className="font-serif text-2xl tracking-tight text-white">
              The Clinical Space
            </h2>
          </div>
          <span className="font-mono text-xs text-white/50 uppercase">
            Designed for Stillness & Acoustic Isolation
          </span>
        </div>

        {/* Pinned Image Wipe Layers */}
        <div
          ref={panelsRef}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {facilitiesData.map((room, idx) => (
            <div
              key={room.id}
              className={`facility-room-layer absolute inset-0 w-full h-full ${
                idx === 0 ? "z-10" : idx === 1 ? "z-20" : "z-30"
              }`}
              style={{
                clipPath:
                  idx === 0
                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : undefined,
              }}
            >
              <Image
                src={room.image.src}
                alt={room.image.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Bottom Captions Overlay */}
        <div className="relative z-20 max-w-2xl mt-auto pt-8">
          {facilitiesData.map((room, idx) => (
            <div
              key={room.id}
              className={`facility-caption-block ${
                idx === 0 ? "opacity-100" : "opacity-0 absolute bottom-0 left-0"
              } transition-opacity duration-300 space-y-4`}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-[var(--clay)]">
                  ROOM {room.numeral}
                </span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  {room.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-3xl lg:text-4xl text-white tracking-tight">
                {room.title}
              </h3>

              <p className="text-sm lg:text-base text-white/80 leading-relaxed">
                {room.caption}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {room.specs.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-xs text-white/70 bg-white/10 px-3 py-1 rounded border border-white/15"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stacked Fallback */}
      <div className="md:hidden py-20 px-6 space-y-16">
        <div className="border-b border-white/15 pb-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)] block mb-2">
            [ Act III · Architecture ]
          </span>
          <h2 className="font-serif text-3xl text-white">The Clinical Space</h2>
        </div>

        {facilitiesData.map((room) => (
          <div key={room.id} className="space-y-6 border-b border-white/10 pb-12">
            <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={room.image.src}
                alt={room.image.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-[var(--clay)]">
                ROOM {room.numeral}
              </span>
              <h3 className="font-serif text-2xl text-white">{room.title}</h3>
              <p className="text-xs text-white/60">{room.subtitle}</p>
              <p className="text-sm text-white/80 leading-relaxed">
                {room.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
