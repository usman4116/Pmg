"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/content/site";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import gsap from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Staggered reveal animation
  useEffect(() => {
    if (!isOpen || !overlayRef.current || prefersReduced) return;

    const links = linksContainerRef.current?.querySelectorAll(".nav-line-inner");

    if (links && links.length > 0) {
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.15,
        }
      );
    }
  }, [isOpen, prefersReduced]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
      className="fixed inset-0 z-[5000] flex flex-col justify-between bg-[#FAF7F2] text-[#0E1512] p-6 md:p-12 lg:p-16 overflow-y-auto"
    >
      {/* Top Bar inside Menu */}
      <div className="flex items-center justify-between border-b border-black/10 pb-6">
        <a
          href="#hero"
          onClick={onClose}
          className="font-serif text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          {siteConfig.name}
        </a>

        <div className="flex items-center gap-6">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 text-xs font-sans uppercase tracking-widest bg-[var(--clay)] text-[#F6F1E7] rounded-full hover:bg-[#b35838] transition-colors"
          >
            Book Visit
          </a>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-xs font-mono uppercase tracking-widest text-[#0E1512]/70 hover:text-[var(--clay)] transition-colors"
            aria-label="Close Navigation Menu"
          >
            [ Close × ]
          </button>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div
        ref={linksContainerRef}
        className="my-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-5xl"
      >
        {siteConfig.navigation.map((item) => (
          <div key={item.href} className="overflow-hidden">
            <a
              href={item.href}
              onClick={onClose}
              className="nav-line-inner group flex items-baseline gap-4 py-2 border-b border-transparent hover:border-black/20 transition-all duration-200"
            >
              <span className="font-mono text-xs text-[#0E1512]/40 group-hover:text-[var(--clay)] transition-colors">
                {item.chapter}
              </span>
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Footer Info inside Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10 text-xs text-[#0E1512]/70">
        <div>
          <p className="font-mono uppercase tracking-wider text-[#0E1512]/40 mb-1">Clinic</p>
          <p>{siteConfig.address.street}</p>
          <p>{siteConfig.address.suite}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
        </div>
        <div>
          <p className="font-mono uppercase tracking-wider text-[#0E1512]/40 mb-1">Hours</p>
          <p>{siteConfig.hours.weekdays}</p>
          <p>{siteConfig.hours.saturday}</p>
        </div>
        <div>
          <p className="font-mono uppercase tracking-wider text-[#0E1512]/40 mb-1">Emergency</p>
          <p>{siteConfig.emergencyNotice}</p>
        </div>
      </div>
    </div>
  );
};
