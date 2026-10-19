export interface ServiceChapter {
  id: string;
  numeral: string;
  title: string;
  act: "II";
  eyebrow: string;
  lead: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  clinicalFocus: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const servicesData: ServiceChapter[] = [
  {
    id: "primary-care",
    numeral: "01",
    act: "II",
    eyebrow: "FOUNDATIONAL HEALTH",
    title: "Primary Care",
    lead: "A physician who knows your baseline before something goes wrong.",
    body: "Routine exams should not feel rushed. We take the time to examine subtle systemic shifts, manage acute illness, and coordinate diagnostic testing with clear, unhurried answers.",
    ctaText: "Discuss primary intake",
    ctaHref: "#booking",
    clinicalFocus: [
      "[ANNUAL WELLNESS EXAMS PLACEHOLDER]",
      "Same-day acute evaluations",
      "Comprehensive biomarker baseline panels",
      "Medication reconciliations",
    ],
    image: {
      src: "/images/service-primary.jpg",
      alt: "Quiet clinical consultation room bathed in warm morning light",
    },
  },
  {
    id: "pulmonary-medicine",
    numeral: "02",
    act: "II",
    eyebrow: "PULMONARY PHYSIOLOGY",
    title: "Pulmonary Medicine",
    lead: "Most lung problems start as a cough you stopped noticing.",
    body: "Airway inflammation, chronic shortness of breath, and post-viral fatigue require precision diagnostic spirometry and sustained therapeutic titration — not quick prescriptions.",
    ctaText: "Explore pulmonary care",
    ctaHref: "#booking",
    clinicalFocus: [
      "In-office spirometry & diffusion studies",
      "Asthma and COPD clinical stabilization",
      "Unexplained dyspnea workup",
      "[PULMONARY FIBROSIS MONITORING PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-pulmonary.jpg",
      alt: "Medical diagnostic pulmonary equipment set against natural wooden surfaces",
    },
  },
  {
    id: "preventive-screening",
    numeral: "03",
    act: "II",
    eyebrow: "EARLY INTERCEPTION",
    title: "Preventive Screening",
    lead: "Detecting vascular and cellular variance years before symptoms manifest.",
    body: "We map out age- and family-stratified screening timelines: cardiovascular calcium indexing, metabolic screenings, cancer risk stratification, and targeted imaging protocols.",
    ctaText: "Review screening protocols",
    ctaHref: "#booking",
    clinicalFocus: [
      "Advanced lipid and lipoprotein (a) testing",
      "Cardiovascular risk stratification",
      "Age-stratified oncology screenings",
      "[CAROTID & AORTIC ULTRASOUND PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-preventive.jpg",
      alt: "Clear glass medical diagnostic vials arranged on an illuminated marble counter",
    },
  },
  {
    id: "chronic-disease",
    numeral: "04",
    act: "II",
    eyebrow: "LONG-TERM STABILIZATION",
    title: "Chronic Disease Management",
    lead: "Hypertension and metabolic dysfunction managed with disciplined clinical vigilance.",
    body: "Managing long-term illness is about protecting organ reserve. We track vascular resistance, renal markers, and glucose trends with granular, frequent checkpoints.",
    ctaText: "Structure chronic care",
    ctaHref: "#booking",
    clinicalFocus: [
      "Type 2 diabetes & insulin resistance",
      "Refractory hypertension protocols",
      "Renal & hepatic function monitoring",
      "[AUTOIMMUNE CO-MANAGEMENT PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-chronic.jpg",
      alt: "Physician reviewing granular metabolic trend charts in natural daylight",
    },
  },
  {
    id: "sleep-medicine",
    numeral: "05",
    act: "II",
    eyebrow: "NEUROLOGY OF SLEEP",
    title: "Sleep Medicine",
    lead: "Sleep is a medical subject. We treat it like one.",
    body: "Disrupted sleep alters hormone signaling, pulmonary hemodynamics, and cardiac rhythm. We diagnose obstructive apnea, hypopnea, and circadian misalignment through clinical sleep studies.",
    ctaText: "Begin sleep assessment",
    ctaHref: "#booking",
    clinicalFocus: [
      "Home sleep apnea testing (HSAT)",
      "CPAP titration and mask tolerance optimization",
      "Insomnia cognitive-behavioral coordination",
      "[RESTLESS LEG SYNDROME EVALUATION PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-sleep.jpg",
      alt: "Soft linen bedding illuminated by early dawn light through sheer curtains",
    },
  },
  {
    id: "weight-management",
    numeral: "06",
    act: "II",
    eyebrow: "METABOLIC MEDICINE",
    title: "Medical Weight Management",
    lead: "Weight is biology, not willpower. We measure the endocrine drivers.",
    body: "Evidence-based metabolic protocols designed by physicians. We evaluate leptin resistance, thyroid parameters, and visceral adiposity to preserve lean muscle while reducing metabolic load.",
    ctaText: "Schedule metabolic intake",
    ctaHref: "#booking",
    clinicalFocus: [
      "InBody body composition analysis",
      "GLP-1 receptor agonist physician supervision",
      "Metabolic rate assessment",
      "[SKELETAL MUSCLE PRESERVATION STRATEGY PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-weight.jpg",
      alt: "Clean architectural medical measuring apparatus in balanced ambient space",
    },
  },
  {
    id: "clinical-nutrition",
    numeral: "07",
    act: "II",
    eyebrow: "CELLULAR FUEL",
    title: "Clinical Nutrition",
    lead: "Dietary protocols calibrated to blood markers, not trends.",
    body: "Nutrition tailored specifically to lipid panels, gut microbiome stability, and glucose variability. Our plans are practical, sustainable, and reviewed by clinical specialists.",
    ctaText: "Consult nutrition specialist",
    ctaHref: "#booking",
    clinicalFocus: [
      "Continuous glucose monitor (CGM) analysis",
      "Micro-nutrient deficiency correction",
      "Anti-inflammatory dietary adaptation",
      "[GASTROINTESTINAL RESTORATION PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-nutrition.jpg",
      alt: "Minimalist ceramic bowl containing wholesome whole foods in soft daylight",
    },
  },
  {
    id: "lifestyle-medicine",
    numeral: "08",
    act: "II",
    eyebrow: "SUSTAINED EQUILIBRIUM",
    title: "Lifestyle Medicine",
    lead: "The daily mechanics of breath, movement, and nervous system regulation.",
    body: "Translating physiology into daily habits. We build actionable frameworks for autonomic recovery, circadian alignment, and zone-2 cardiovascular conditioning.",
    ctaText: "Integrate lifestyle plan",
    ctaHref: "#booking",
    clinicalFocus: [
      "Autonomic nervous system recovery protocols",
      "Cardiovascular endurance (Zone 2) guidelines",
      "Circadian light exposure therapy",
      "[STRESS RESILIENCE FRAMEWORK PLACEHOLDER]",
    ],
    image: {
      src: "/images/service-lifestyle.jpg",
      alt: "A tranquil outdoor botanical garden view through floor-to-ceiling glass",
    },
  },
];
