export interface FacilityRoom {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  caption: string;
  specs: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const facilitiesData: FacilityRoom[] = [
  {
    id: "consultation-suite",
    numeral: "01",
    title: "Acoustically Isolated Consultation Rooms",
    subtitle: "Built for quiet concentration and uninterrupted dialogue.",
    caption:
      "Designed with solid natural oak, ambient daylight control, and noise-damping acoustic wall panels so your medical history is shared in private stillness.",
    specs: ["Natural circadian lighting", "Double-sealed acoustic thresholds", "Air exchange rated HEPA H14"],
    image: {
      src: "/images/facility-consultation.jpg",
      alt: "Quiet medical consultation room with mid-century wooden desk and soft warm sunlight",
    },
  },
  {
    id: "pulmonary-lab",
    numeral: "02",
    title: "Diagnostic Pulmonary Suite",
    subtitle: "Precision spirometry and diffusion testing in-house.",
    caption:
      "Equipped with calibrated whole-body plethysmography and instant diffusion capacity analysis. No hospital wait times or outsourced testing queues.",
    specs: ["Calibrated spirometric gas analyzers", "Daily medical grade sterilization", "Real-time flow-volume looping"],
    image: {
      src: "/images/facility-pulmonary.jpg",
      alt: "State of the art pulmonary testing suite with immaculate stone counter and clean equipment",
    },
  },
  {
    id: "sleep-lab",
    numeral: "03",
    title: "Atmospheric Sleep Diagnostic Room",
    subtitle: "Sleep studies calibrated for physiological rest, not clinical anxiety.",
    caption:
      "Engineered with hospital-grade multichannel polysomnography concealed behind residential walnut cabinetry, organic linen bedding, and silent environmental airflow.",
    specs: ["Medical polysomnography telemetry", "Zero audible ambient HVAC hum", "Subtle indirect 2700K lighting"],
    image: {
      src: "/images/facility-sleep.jpg",
      alt: "Serene clinical sleep diagnostic room with hotel-like warmth and linen textures",
    },
  },
];
