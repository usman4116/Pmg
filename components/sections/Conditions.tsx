"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { conditionsData } from "@/content/conditions";
import { cn } from "@/lib/utils";

export const Conditions: React.FC = () => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>("pulmonary");

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="conditions"
      className="py-28 md:py-36 px-6 md:px-12 max-w-6xl mx-auto transition-colors duration-500"
      aria-label="Conditions Index"
    >
      {/* Chapter Eyebrow */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          [ Act III · Full Daylight ]
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 03 · Clinical Index
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-hairline gap-6">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--foreground)]">
          Conditions Treated
        </h2>
        <p className="max-w-md text-sm text-[var(--subtle)] leading-relaxed">
          Structured like an editorial index. Select any discipline to review
          diagnostic pathways, biomarker criteria, and therapeutic focus.
        </p>
      </div>

      {/* Editorial Table of Contents Index */}
      <div className="divide-y divide-hairline">
        {conditionsData.map((cat) => {
          const isOpen = openCategoryId === cat.id;
          const headerId = `condition-header-${cat.id}`;
          const panelId = `condition-panel-${cat.id}`;

          return (
            <div key={cat.id} className="py-8 group">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(cat.id)}
                className="w-full text-left flex flex-col md:flex-row md:items-baseline justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] rounded p-2 -m-2"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-xs md:text-sm text-[var(--clay)] tracking-wider">
                    {cat.index}
                  </span>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[var(--foreground)] group-hover:text-[var(--clay)] transition-colors duration-200">
                      {cat.category}
                    </span>
                    <p className="text-xs md:text-sm text-[var(--subtle)] mt-1 font-sans">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-baseline">
                  <span className="font-mono text-xs tracking-wider text-[var(--subtle)] uppercase">
                    {cat.conditions.length} conditions
                  </span>
                  <span
                    className={cn(
                      "font-mono text-base transition-transform duration-300",
                      isOpen ? "rotate-45 text-[var(--clay)]" : "text-[var(--foreground)]"
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Moving underline effect */}
              <div
                className={cn(
                  "h-[1.5px] bg-[var(--clay)] origin-left transition-all duration-500 mt-4",
                  isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-25 group-hover:opacity-40"
                )}
              />

              {/* In-line Expanded Conditions */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 pl-0 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {cat.conditions.map((item, cIdx) => (
                        <div
                          key={cIdx}
                          className="border-l border-hairline pl-5 space-y-2 hover:border-[var(--clay)] transition-colors duration-200"
                        >
                          <h4 className="font-serif text-lg md:text-xl text-[var(--foreground)]">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm text-[var(--subtle)] leading-relaxed">
                            {item.description}
                          </p>
                          {item.clinicalNote && (
                            <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[var(--clay)] bg-[var(--clay)]/10 px-2 py-0.5 rounded">
                              {item.clinicalNote}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
