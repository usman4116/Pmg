"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { facilitiesData } from "@/content/facilities";
import { cn } from "@/lib/utils";

export const Facilities: React.FC = () => {
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const activeRoom = facilitiesData[activeRoomIdx];

  return (
    <section
      id="facilities"
      className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-500"
      aria-label="Clinical Facilities and Architectural Environment"
    >
      {/* Chapter Eyebrow Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          [ Act III · Architecture ]
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 08 · The Clinical Space
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-hairline gap-6">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--foreground)]">
            Designed for Stillness
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--subtle)] max-w-lg">
            A medical environment constructed with natural acoustics, HEPA H14 air exchange,
            and circadian daylight balance.
          </p>
        </div>

        {/* Room Tab Selectors */}
        <div className="flex flex-wrap gap-2">
          {facilitiesData.map((room, idx) => {
            const isActive = activeRoomIdx === idx;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveRoomIdx(idx)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)]",
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--sky)] font-bold shadow-sm"
                    : "bg-transparent text-[var(--subtle)] border border-hairline hover:border-[var(--foreground)]"
                )}
              >
                <span>{room.numeral} · {room.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Suite Showcase Grid (Asymmetric Editorial Two-Column) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Interactive Large Image Frame */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[var(--foreground)]/5 border border-hairline shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeRoom.image.src}
                  alt={activeRoom.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky)]/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Room Numeral Badge */}
            <div className="absolute top-4 left-4 z-10 font-mono text-xs uppercase tracking-widest px-3 py-1 bg-[var(--sky)]/90 backdrop-blur-md rounded-full text-[var(--foreground)] border border-hairline">
              Room {activeRoom.numeral} / 03
            </div>
          </div>
        </div>

        {/* Right: Suite Narrative & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)] block mb-1">
                  {activeRoom.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] tracking-tight leading-snug">
                  {activeRoom.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-[var(--subtle)] leading-relaxed">
                {activeRoom.caption}
              </p>

              {/* Technical Specifications Pills */}
              <div className="pt-4 border-t border-hairline space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--subtle)] block">
                  Acoustic & Environmental Standards:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRoom.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="font-mono text-xs text-[var(--foreground)] bg-[var(--foreground)]/5 px-3 py-1 rounded-md border border-hairline"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Room Pager Buttons */}
          <div className="pt-6 flex items-center justify-between border-t border-hairline text-xs font-mono text-[var(--subtle)]">
            <span>SUITE SPECIFICATIONS</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveRoomIdx((prev) =>
                    prev === 0 ? facilitiesData.length - 1 : prev - 1
                  )
                }
                className="p-2 rounded-full border border-hairline hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--clay)]"
                aria-label="Previous facility room"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveRoomIdx((prev) => (prev + 1) % facilitiesData.length)
                }
                className="p-2 rounded-full border border-hairline hover:border-[var(--foreground)] text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--clay)]"
                aria-label="Next facility room"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
