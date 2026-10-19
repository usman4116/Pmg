export interface SiteConfig {
  name: string;
  tagline: string;
  legalName: string;
  phone: string;
  emergencyNotice: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  navigation: Array<{
    label: string;
    href: string;
    chapter?: string;
  }>;
  bookingUrl: string;
}

export const siteConfig: SiteConfig = {
  name: "Pervaiz Medical Group",
  legalName: "Pervaiz Medical Group, LLC",
  tagline: "Pulmonary, sleep, and restorative primary medicine.",
  phone: "(555) 019-2834",
  emergencyNotice: "If you are experiencing a life-threatening medical emergency or severe acute chest pain, please call 911 immediately.",
  address: {
    street: "[CLINIC ADDRESS PLACEHOLDER — e.g. 1420 Medical Parkway]",
    suite: "Suite 400",
    city: "[CITY PLACEHOLDER]",
    state: "[STATE PLACEHOLDER]",
    zip: "[ZIP CODE]",
    country: "United States",
  },
  hours: {
    weekdays: "Monday – Friday: 8:00 AM – 5:00 PM",
    saturday: "Saturday: 9:00 AM – 1:00 PM (By Appointment)",
    sunday: "Sunday: Closed",
  },
  navigation: [
    { label: "Overview", href: "#hero", chapter: "00" },
    { label: "Introduction", href: "#intro", chapter: "01" },
    { label: "Services", href: "#services", chapter: "02" },
    { label: "Conditions", href: "#conditions", chapter: "03" },
    { label: "Philosophy", href: "#why-us", chapter: "04" },
    { label: "Physicians", href: "#team", chapter: "05" },
    { label: "Patient Voices", href: "#testimonials", chapter: "06" },
    { label: "Insurance", href: "#insurance", chapter: "07" },
    { label: "The Space", href: "#facilities", chapter: "08" },
    { label: "Questions", href: "#faq", chapter: "09" },
    { label: "Consultation", href: "#booking", chapter: "10" },
  ],
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://pervaizmedical.com/book-appointment",
};
