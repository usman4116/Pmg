import { siteConfig } from "@/content/site";
import { faqData } from "@/content/faq";
import { teamData } from "@/content/team";

export const defaultMetadata = {
  metadataBase: new URL("https://pervaizmedical.com"),
  title: "Pervaiz Medical Group | Pulmonary, Sleep & Restorative Primary Care",
  description:
    "Comprehensive primary care, board-certified pulmonary medicine, and clinical sleep diagnostics. An unhurried medical practice centered on your breath and baseline health.",
  keywords: [
    "Pulmonary specialist",
    "Sleep medicine clinic",
    "Internal medicine physician",
    "Primary care",
    "Diagnostic spirometry",
    "Sleep apnea treatment",
    "Pervaiz Medical Group",
  ],
  authors: [{ name: "Pervaiz Medical Group" }],
  creator: "Pervaiz Medical Group",
  publisher: "Pervaiz Medical Group",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pervaizmedical.com",
    siteName: siteConfig.name,
    title: "Pervaiz Medical Group | Pulmonary, Sleep & Restorative Primary Care",
    description:
      "A medical practice centered on your breath and baseline health. Unhurried diagnostic medicine, pulmonary care, and clinical sleep studies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pervaiz Medical Group — A Day of Breath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pervaiz Medical Group | Pulmonary, Sleep & Restorative Primary Care",
    description: "An unhurried medical practice centered on your breath and baseline health.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export function generateClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.tagline,
    telephone: siteConfig.phone,
    url: "https://pervaizmedical.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    medicalSpecialty: [
      "https://schema.org/Pulmonary",
      "https://schema.org/PrimaryCare",
      "SleepMedicine",
    ],
    isAcceptingNewPatients: true,
  };
}

export function generatePhysicianJsonLd() {
  return teamData.map((doc) => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doc.name,
    jobTitle: doc.title,
    medicalSpecialty: doc.specialty,
    description: doc.bio,
    worksFor: {
      "@type": "MedicalClinic",
      name: siteConfig.name,
    },
  }));
}

export function generateFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
