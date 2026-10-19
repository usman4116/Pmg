"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/content/site";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !footerRef.current || !wordmarkRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Curtain reveal effect for oversized wordmark
    gsap.fromTo(
      wordmarkRef.current,
      {
        yPercent: 30,
        opacity: 0.1,
      },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );
  }, [prefersReduced]);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[var(--ink)] text-[#F6F1E7] pt-24 pb-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Navigation & Clinical Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/10 text-sm">
          {/* Practice Overview */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">
              {siteConfig.name}
            </h4>
            <p className="text-white/60 leading-relaxed pr-4">
              {siteConfig.tagline}
            </p>
            <div className="mt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--clay)] block mb-1">
                Direct Line
              </span>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                className="text-base text-white hover:text-[var(--clay)] transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Navigation Chapters */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-xs text-white/30 mr-2">
                      {item.chapter}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Hours & Address */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              The Clinic
            </h4>
            <address className="not-italic text-white/70 space-y-1 mb-6 leading-relaxed">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.suite}</p>
              <p>
                {siteConfig.address.city}, {siteConfig.address.state}{" "}
                {siteConfig.address.zip}
              </p>
            </address>

            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">
              Hours of Care
            </h4>
            <div className="text-white/70 space-y-1 text-xs">
              <p>{siteConfig.hours.weekdays}</p>
              <p>{siteConfig.hours.saturday}</p>
              <p>{siteConfig.hours.sunday}</p>
            </div>
          </div>

          {/* Emergency & Disclaimers */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              Clinical Notice
            </h4>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              {siteConfig.emergencyNotice}
            </p>
            <div className="p-3 bg-white/5 border border-white/10 rounded text-[11px] text-white/60 leading-normal">
              [HIPAA & PRIVACY NOTICE PLACEHOLDER: Electronic communication through this website is intended for general administrative inquiries only and does not establish a physician-patient relationship.]
            </div>
          </div>
        </div>

        {/* Oversized Brand Curtain Wordmark */}
        <div
          ref={wordmarkRef}
          className="pt-16 pb-8 text-center select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="block font-serif tracking-tighter leading-none text-white/10 hover:text-white/15 transition-colors text-[clamp(2.5rem,8vw,8rem)]">
            PERVAIZ MEDICAL
          </span>
        </div>

        {/* Bottom Legal Hairline */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              [Privacy Policy]
            </a>
            <a href="#hipaa" className="hover:text-white transition-colors">
              [HIPAA Notice]
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              [Terms of Service]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
