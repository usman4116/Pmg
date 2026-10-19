export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  date: string;
  consentFlag: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "quote-1",
    quote:
      "“For three years, doctors told me my morning fatigue was just aging. Here, the sleep study identified severe nocturnal airway resistance on night one. Within two weeks of proper titration, I felt present in my own life again.”",
    author: "[PATIENT INITIALS M.K. — PLACEHOLDER]",
    context: "Sleep Medicine & Airway Care",
    date: "Spring 2024",
    consentFlag: "[REVIEW – needs patient consent prior to public launch]",
  },
  {
    id: "quote-2",
    quote:
      "“They don’t look at their watch while you talk. My chronic bronchitis had flared every winter for a decade. We worked through an unhurried protocol that treated the underlying inflammation rather than handing me a recurring inhaler.”",
    author: "[PATIENT INITIALS R.S. — PLACEHOLDER]",
    context: "Pulmonary Medicine",
    date: "Autumn 2024",
    consentFlag: "[REVIEW – needs patient consent prior to public launch]",
  },
  {
    id: "quote-3",
    quote:
      "“An exam that actually felt like medicine. Every lab result was explained in detail, connecting my sleep patterns directly to my blood pressure. I never felt judged, only thoroughly examined.”",
    author: "[PATIENT INITIALS E.L. — PLACEHOLDER]",
    context: "Comprehensive Primary Care",
    date: "Summer 2024",
    consentFlag: "[REVIEW – needs patient consent prior to public launch]",
  },
];
