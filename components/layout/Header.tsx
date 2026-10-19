"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/content/site";
import { MenuOverlay } from "./MenuOverlay";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if user has scrolled past hero top
      setIsScrolled(currentScrollY > 50);

      // Auto-hide on scroll-down, show on scroll-up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Content for WCAG 2.2 AA accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--clay)] focus:text-[#F6F1E7] focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[var(--sky)]/85 backdrop-blur-md border-b border-hairline py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] rounded"
          >
            <span className="font-serif text-lg md:text-xl font-normal tracking-tight text-[var(--foreground)] group-hover:opacity-80 transition-opacity">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[var(--subtle)]">
              Pulmonary & Sleep Medicine
            </span>
          </a>

          {/* Quick Nav Links (Desktop) */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 text-xs font-sans tracking-widest uppercase text-[var(--subtle)]">
            <a href="#services" className="hover:text-[var(--foreground)] transition-colors">
              Services
            </a>
            <a href="#conditions" className="hover:text-[var(--foreground)] transition-colors">
              Conditions
            </a>
            <a href="#why-us" className="hover:text-[var(--foreground)] transition-colors">
              Philosophy
            </a>
            <a href="#team" className="hover:text-[var(--foreground)] transition-colors">
              Physicians
            </a>
            <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider bg-[var(--foreground)] text-[var(--sky)] hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              Book a Visit
            </a>

            <button
              onClick={() => setIsMenuOpen(true)}
              type="button"
              aria-label="Open Navigation Menu"
              aria-expanded={isMenuOpen}
              className="p-2 text-xs font-mono uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--clay)] transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">[ Index ]</span>
              <span className="flex flex-col gap-1 w-5" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-current transition-all" />
                <span className="h-[1.5px] w-3/4 bg-current transition-all self-end" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
