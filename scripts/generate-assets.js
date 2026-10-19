const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function generateSvgImage({ width, height, title, subtitle, tag, theme = "night" }) {
  const themes = {
    night: {
      bg1: "#0E1512",
      bg2: "#121A1F",
      accent: "#C86B4A",
      text: "#F6F1E7",
      sub: "rgba(246, 241, 231, 0.65)",
      grid: "rgba(246, 241, 231, 0.08)",
    },
    dawn: {
      bg1: "#2F4A3C",
      bg2: "#1D3227",
      accent: "#F2D9B8",
      text: "#F2D9B8",
      sub: "rgba(242, 217, 184, 0.75)",
      grid: "rgba(242, 217, 184, 0.12)",
    },
    daylight: {
      bg1: "#EBE3D5",
      bg2: "#DFD5C3",
      accent: "#C86B4A",
      text: "#0E1512",
      sub: "#2F4A3C",
      grid: "rgba(14, 21, 18, 0.08)",
    },
    clay: {
      bg1: "#2B1A14",
      bg2: "#18100C",
      accent: "#C86B4A",
      text: "#F6F1E7",
      sub: "rgba(246, 241, 231, 0.6)",
      grid: "rgba(200, 107, 74, 0.12)",
    },
  };

  const t = themes[theme] || themes.night;

  const escapeXml = (str) =>
    str.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case '"': return "&quot;";
        default: return c;
      }
    });

  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeTag = escapeXml(tag);

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bg1}" />
        <stop offset="100%" stop-color="${t.bg2}" />
      </linearGradient>
      <radialGradient id="radial" cx="70%" cy="30%" r="60%">
        <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.25" />
        <stop offset="100%" stop-color="${t.bg2}" stop-opacity="0" />
      </radialGradient>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${t.grid}" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#grad)" />
    <rect width="${width}" height="${height}" fill="url(#radial)" />
    <rect width="${width}" height="${height}" fill="url(#gridPattern)" />

    <!-- Ambient Architectural Geometry -->
    <circle cx="${width * 0.75}" cy="${height * 0.4}" r="${Math.min(width, height) * 0.35}" fill="none" stroke="${t.accent}" stroke-width="1.5" opacity="0.3" stroke-dasharray="6 6" />
    <line x1="${width * 0.1}" y1="${height * 0.85}" x2="${width * 0.9}" y2="${height * 0.85}" stroke="${t.grid}" stroke-width="1" />

    <!-- Tag -->
    <text x="${width * 0.08}" y="${height * 0.15}" font-family="monospace" font-size="${Math.max(12, Math.floor(width * 0.022))}" fill="${t.accent}" letter-spacing="3">
      ${safeTag}
    </text>

    <!-- Main Title -->
    <text x="${width * 0.08}" y="${height * 0.75}" font-family="Georgia, serif" font-size="${Math.max(22, Math.floor(width * 0.045))}" fill="${t.text}" font-weight="300" letter-spacing="-0.5">
      ${safeTitle}
    </text>

    <!-- Subtitle -->
    <text x="${width * 0.08}" y="${height * 0.82}" font-family="-apple-system, sans-serif" font-size="${Math.max(12, Math.floor(width * 0.022))}" fill="${t.sub}">
      ${safeSubtitle}
    </text>


    <!-- Clinical Badge -->
    <text x="${width * 0.92}" y="${height * 0.92}" font-family="monospace" font-size="10" fill="${t.sub}" text-anchor="end" opacity="0.6">
      PERVAIZ MEDICAL · ARCHIVE
    </text>
  </svg>
  `;

  return Buffer.from(svg);
}

async function main() {
  const imgDir = path.join(__dirname, "..", "public", "images");
  const vidDir = path.join(__dirname, "..", "public", "video");
  const pubDir = path.join(__dirname, "..", "public");

  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
  if (!fs.existsSync(vidDir)) fs.mkdirSync(vidDir, { recursive: true });

  const tasks = [
    // Hero Poster
    {
      file: path.join(vidDir, "poster.jpg"),
      w: 1920,
      h: 1080,
      title: "The Quiet Hours of Rest",
      subtitle: "Pre-dawn light across sheer linen · Sleep & Pulmonary Medicine",
      tag: "ACT I · HERO ARCHIVE",
      theme: "night",
    },
    // OpenGraph Image
    {
      file: path.join(pubDir, "og-image.jpg"),
      w: 1200,
      h: 630,
      title: "Pervaiz Medical Group",
      subtitle: "Pulmonary, Sleep & Restorative Primary Care",
      tag: "CLINICAL MEDICINE",
      theme: "night",
    },
    // Services
    {
      file: path.join(imgDir, "service-primary.jpg"),
      w: 1200,
      h: 900,
      title: "Foundational Primary Intake",
      subtitle: "45–60 min unhurried consultation suite",
      tag: "CHAPTER 01 · PRIMARY CARE",
      theme: "dawn",
    },
    {
      file: path.join(imgDir, "service-pulmonary.jpg"),
      w: 1200,
      h: 900,
      title: "Diagnostic Spirometry Suite",
      subtitle: "Precision flow-volume curves & airway resistance",
      tag: "CHAPTER 02 · PULMONOLOGY",
      theme: "night",
    },
    {
      file: path.join(imgDir, "service-preventive.jpg"),
      w: 1200,
      h: 900,
      title: "Cardiometabolic Interception",
      subtitle: "ApoB, Lp(a) and CAC baseline profiling",
      tag: "CHAPTER 03 · SCREENING",
      theme: "daylight",
    },
    {
      file: path.join(imgDir, "service-chronic.jpg"),
      w: 1200,
      h: 900,
      title: "Vascular & Renal Surveillance",
      subtitle: "Long-term metabolic and hypertension stabilization",
      tag: "CHAPTER 04 · CHRONIC CARE",
      theme: "dawn",
    },
    {
      file: path.join(imgDir, "service-sleep.jpg"),
      w: 1200,
      h: 900,
      title: "Nocturnal Telemetry & Polysomnography",
      subtitle: "Diagnostic sleep studies & CPAP titration",
      tag: "CHAPTER 05 · SLEEP MEDICINE",
      theme: "night",
    },
    {
      file: path.join(imgDir, "service-weight.jpg"),
      w: 1200,
      h: 900,
      title: "Endocrine & Body Composition Lab",
      subtitle: "InBody segmentation and physician metabolic oversight",
      tag: "CHAPTER 06 · METABOLIC CARE",
      theme: "daylight",
    },
    {
      file: path.join(imgDir, "service-nutrition.jpg"),
      w: 1200,
      h: 900,
      title: "Biomarker-Calibrated Nutrition",
      subtitle: "Continuous glucose monitoring & micro-nutrient adaptation",
      tag: "CHAPTER 07 · NUTRITION",
      theme: "dawn",
    },
    {
      file: path.join(imgDir, "service-lifestyle.jpg"),
      w: 1200,
      h: 900,
      title: "Autonomic Nervous Recovery",
      subtitle: "Circadian alignment & zone-2 endurance protocols",
      tag: "CHAPTER 08 · LIFESTYLE",
      theme: "night",
    },
    // Doctors
    {
      file: path.join(imgDir, "doctor-1.jpg"),
      w: 900,
      h: 1200,
      title: "[Dr. Pervaiz, MD]",
      subtitle: "Medical Director · Pulmonary & Sleep Medicine",
      tag: "PHYSICIAN · FOUNDER",
      theme: "night",
    },
    {
      file: path.join(imgDir, "doctor-2.jpg"),
      w: 900,
      h: 1200,
      title: "[Attending Physician, MD]",
      subtitle: "Comprehensive Primary Care & Internal Medicine",
      tag: "PHYSICIAN · INTERNAL MEDICINE",
      theme: "dawn",
    },
    {
      file: path.join(imgDir, "doctor-3.jpg"),
      w: 900,
      h: 1200,
      title: "[Clinical Specialist, MD]",
      subtitle: "Metabolic Health & Clinical Lipidology",
      tag: "PHYSICIAN · METABOLIC MEDICINE",
      theme: "clay",
    },
    // Facilities
    {
      file: path.join(imgDir, "facility-consultation.jpg"),
      w: 1600,
      h: 1000,
      title: "Consultation Suite 01",
      subtitle: "Double-sealed acoustic thresholds & natural 2700K lighting",
      tag: "FACILITY · CONSULTATION",
      theme: "night",
    },
    {
      file: path.join(imgDir, "facility-pulmonary.jpg"),
      w: 1600,
      h: 1000,
      title: "Diagnostic Spirometry Suite 02",
      subtitle: "Calibrated gas analyzers & laminar air exchange",
      tag: "FACILITY · PULMONARY LAB",
      theme: "dawn",
    },
    {
      file: path.join(imgDir, "facility-sleep.jpg"),
      w: 1600,
      h: 1000,
      title: "Atmospheric Sleep Diagnostic Room 03",
      subtitle: "Zero-audible ambient acoustics & residential walnut finishes",
      tag: "FACILITY · SLEEP LAB",
      theme: "clay",
    },
  ];

  for (const item of tasks) {
    const svgBuffer = await generateSvgImage({
      width: item.w,
      height: item.h,
      title: item.title,
      subtitle: item.subtitle,
      tag: item.tag,
      theme: item.theme,
    });

    await sharp(svgBuffer)
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(item.file);

    console.log(`Generated: ${path.basename(item.file)}`);
  }
}

main().catch(console.error);
