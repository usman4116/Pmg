"use client";

import React, { useState } from "react";
import { faqData, FaqItem } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { siteConfig } from "@/content/site";

export const Faq: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Intake", "Pulmonary & Sleep", "Billing"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="faq"
      className="py-28 md:py-36 px-6 md:px-12 max-w-5xl mx-auto transition-colors duration-500"
      aria-label="Frequently Asked Clinical Questions"
    >
      {/* Chapter Eyebrow */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--clay)]">
          [ Act III · Clarity ]
        </span>
        <span className="w-12 h-[1px] bg-hairline" />
        <span className="font-mono text-xs text-[var(--subtle)]">
          Chapter 09
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-hairline gap-6">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--foreground)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--subtle)] max-w-lg">
            Direct clinical and administrative clarity before your appointment.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--foreground)] text-[var(--sky)] font-bold"
                  : "bg-transparent text-[var(--subtle)] border border-hairline hover:border-[var(--foreground)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Accordion Component */}
      <div className="mt-8">
        <Accordion items={filteredFaqs} allowMultiple={false} />
      </div>

      {/* Direct Intake Question Contact */}
      <div className="mt-16 p-8 border border-hairline rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl text-[var(--foreground)]">
            Have a question regarding specific clinical telemetry?
          </h3>
          <p className="text-xs md:text-sm text-[var(--subtle)] mt-1">
            Our clinical intake coordinator is available during business hours.
          </p>
        </div>

        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
          className="px-6 py-3 rounded-full text-xs font-sans uppercase tracking-widest border border-hairline text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors whitespace-nowrap"
        >
          Call {siteConfig.phone}
        </a>
      </div>
    </section>
  );
};
