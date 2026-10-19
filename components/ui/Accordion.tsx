"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-hairline border-t border-b border-hairline", className)}>
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="group py-6 transition-colors duration-200">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-baseline justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] focus-visible:ring-offset-4"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-xs text-[var(--subtle)] tracking-wider">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="font-serif text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-[var(--foreground)] group-hover:text-[var(--clay)] transition-colors duration-200">
                    {item.question}
                  </span>
                </div>

                {/* Plus / minus morphing line icon */}
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
                  <span className="absolute h-[1.5px] w-4 bg-[var(--foreground)] transition-transform duration-300" />
                  <span
                    className={cn(
                      "absolute h-4 w-[1.5px] bg-[var(--foreground)] transition-all duration-300",
                      isOpen ? "scale-y-0 rotate-90 opacity-0" : "scale-y-100 rotate-0 opacity-100"
                    )}
                  />
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2 pl-8 md:pl-14 pr-4 md:pr-16 text-sm md:text-base text-[var(--subtle)] leading-relaxed">
                    <p>{item.answer}</p>
                    {item.category && (
                      <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider text-[var(--clay)]">
                        {item.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
