export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Intake" | "Pulmonary & Sleep" | "Billing";
}

export const faqData: FaqItem[] = [
  {
    id: "faq-first-visit",
    question: "What should I expect during my initial consultation?",
    answer:
      "[CLINIC INTAKE PLACEHOLDER: Your initial intake is scheduled for a full 45 to 60 minutes. Your physician conducts an uninterrupted review of your medical history, current symptom chronology, prior diagnostic labs, and baseline pulmonary/vitals examination before establishing a collaborative diagnostic plan.]",
    category: "Intake",
  },
  {
    id: "faq-sleep-study",
    question: "How does a home sleep apnea test (HSAT) work?",
    answer:
      "[SLEEP PROTOCOL PLACEHOLDER: If clinically indicated, you are provided with a compact, calibrated diagnostic sensor to wear during one night in your own bed. It records airflow, chest effort, pulse oximetry, and snoring. Data is uploaded directly to our clinical software for board-certified sleep physician analysis.]",
    category: "Pulmonary & Sleep",
  },
  {
    id: "faq-referrals",
    question: "Do I require a specialist referral before booking?",
    answer:
      "[REFERRAL POLICY PLACEHOLDER: Most PPO plans and standard Medicare allow self-referral to our internal medicine, pulmonary, and sleep specialists without prior authorization. HMO or managed plans may require an initial authorization from your primary care physician, which our staff can assist in coordinating.]",
    category: "Intake",
  },
  {
    id: "faq-same-day",
    question: "Are same-day appointments available for acute respiratory symptoms?",
    answer:
      "[ACUTE ACCESS PLACEHOLDER: Yes. We reserve dedicated clinical blocks each morning and afternoon specifically for established patients experiencing sudden pulmonary exacerbations, acute shortness of breath, or respiratory infections.]",
    category: "Pulmonary & Sleep",
  },
  {
    id: "faq-records",
    question: "How do you coordinate with my outside specialists?",
    answer:
      "[RECORDS PROTOCOL PLACEHOLDER: We securely transmit clinical visit summaries, spirometry curves, and laboratory panels directly to your cardiology, oncology, or surgical teams within 24 hours of each clinical encounter.]",
    category: "Billing",
  },
  {
    id: "faq-pricing",
    question: "Are upfront self-pay pricing schedules available?",
    answer:
      "[PRICING TRANSPARENCY PLACEHOLDER: We maintain fully itemized and transparent self-pay rates for consultations, spirometry, electrocardiograms, and sleep studies, provided to you before any clinical service is performed.]",
    category: "Billing",
  },
];
