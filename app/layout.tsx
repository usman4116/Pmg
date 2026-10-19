import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import { defaultMetadata, generateClinicJsonLd, generatePhysicianJsonLd, generateFaqJsonLd } from "@/lib/seo";
import SmoothScroll from "@/components/motion/SmoothScroll";
import SkyTimeline from "@/components/motion/SkyTimeline";
import Cursor from "@/components/layout/Cursor";
import Preloader from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinicJsonLd = generateClinicJsonLd();
  const physicianJsonLd = generatePhysicianJsonLd();
  const faqJsonLd = generateFaqJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geistSans.variable} h-full antialiased selection:bg-[var(--clay)] selection:text-[#F6F1E7]`}
    >
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--sky)] text-[var(--foreground)] font-sans"
      >
        {/* Subtle SVG Noise Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Desktop Custom Cursor */}
        <Cursor />

        {/* Skippable Preloader */}
        <Preloader />

        {/* Smooth Momentum Scroll Provider & Scroll-driven Sky Color */}
        <SmoothScroll>
          <SkyTimeline />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
