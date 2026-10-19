export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  credentials: string;
  bio: string;
  consultationNote: string;
  image: {
    src: string;
    alt: string;
  };
  parallaxSpeed: number; // for staggered speeds
}

export const teamData: TeamMember[] = [
  {
    id: "lead-physician",
    name: "[DR. PERVAIZ, MD — PLACEHOLDER]",
    title: "Medical Director & Founder",
    specialty: "Pulmonary Medicine & Sleep Specialist",
    credentials: "[BOARD CERTIFIED INTERNAL MEDICINE / PULMONARY / SLEEP PLACEHOLDER]",
    bio: "Focused on airway dynamics and nocturnal physiological stability. Believes diagnosis begins with twenty uninterrupted minutes of listening before writing a prescription.",
    consultationNote: "Clinical focus: Complex sleep architecture & chronic pulmonary care.",
    image: {
      src: "/images/doctor-1.jpg",
      alt: "Portrait of lead physician in clinical office with natural warm side light",
    },
    parallaxSpeed: 0.15,
  },
  {
    id: "primary-care-physician",
    name: "[DOCTOR NAME PLACEHOLDER]",
    title: "Attending Physician",
    specialty: "Comprehensive Primary Care & Internal Medicine",
    credentials: "[MD / FACP / RESIDENCY INSTITUTION PLACEHOLDER]",
    bio: "Dedicated to long-term continuity of care. Manages complex co-morbidities with rigorous laboratory follow-up and empathetic guidance.",
    consultationNote: "Clinical focus: Preventative cardiometabolic screening & acute care.",
    image: {
      src: "/images/doctor-2.jpg",
      alt: "Portrait of attending physician standing calmly by clinical window",
    },
    parallaxSpeed: 0.28,
  },
  {
    id: "metabolic-physician",
    name: "[DOCTOR NAME PLACEHOLDER]",
    title: "Clinical Specialist",
    specialty: "Metabolic Health & Clinical Nutrition",
    credentials: "[MD / MS / CLINICAL LIPIDOLOGY PLACEHOLDER]",
    bio: "Bridges the gap between clinical endocrinology and sustainable daily lifestyle mechanics. Tracks biological markers rather than generic diet trends.",
    consultationNote: "Clinical focus: Continuous glucose dynamics & visceral adiposity reversal.",
    image: {
      src: "/images/doctor-3.jpg",
      alt: "Portrait of clinical metabolic specialist in quiet examination room",
    },
    parallaxSpeed: 0.18,
  },
];
