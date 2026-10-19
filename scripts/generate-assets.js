const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function generateCleanPhotographicImage({ width, height, theme = "warmLight" }) {
  const themes = {
    warmLight: {
      c1: "#FAF6F0",
      c2: "#EFE6D8",
      accent: "#C86B4A",
      shadow: "rgba(47, 74, 60, 0.08)",
      glow: "rgba(242, 217, 184, 0.6)",
    },
    dawnPaper: {
      c1: "#F7F2EB",
      c2: "#E8DDD0",
      accent: "#D48B6A",
      shadow: "rgba(14, 21, 18, 0.06)",
      glow: "rgba(245, 230, 211, 0.5)",
    },
    sageClean: {
      c1: "#F3F5F2",
      c2: "#E2E8E1",
      accent: "#2F4A3C",
      shadow: "rgba(14, 21, 18, 0.05)",
      glow: "rgba(218, 230, 222, 0.4)",
    },
    duskWarm: {
      c1: "#EDE4DA",
      c2: "#DFD2C4",
      accent: "#C86B4A",
      shadow: "rgba(14, 21, 18, 0.08)",
      glow: "rgba(200, 107, 74, 0.2)",
    },
  };

  const t = themes[theme] || themes.warmLight;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Base architectural ambient gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.c1}" />
        <stop offset="60%" stop-color="${t.c2}" />
        <stop offset="100%" stop-color="${t.c1}" />
      </linearGradient>

      <!-- Soft morning sun window beam -->
      <radialGradient id="sunBeam" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${t.glow}" stop-opacity="0.9" />
        <stop offset="50%" stop-color="${t.glow}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="${t.c2}" stop-opacity="0" />
      </radialGradient>

      <!-- Subtle architectural shadow depth -->
      <linearGradient id="wallDepth" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="${t.shadow}" />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>

      <!-- Fine linen texture filter -->
      <filter id="linenNoise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.035 0" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>

    <!-- Base Canvas -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#sunBeam)" />

    <!-- Architectural room geometry (abstracted quiet space, windows, natural materials) -->
    <rect x="${width * 0.15}" y="0" width="${width * 0.35}" height="${height}" fill="${t.shadow}" opacity="0.3" />
    <line x1="${width * 0.15}" y1="0" x2="${width * 0.15}" y2="${height}" stroke="rgba(14,21,18,0.06)" stroke-width="1.5" />
    <line x1="${width * 0.5}" y1="0" x2="${width * 0.5}" y2="${height}" stroke="rgba(14,21,18,0.04)" stroke-width="1" />

    <!-- Ambient circular daylight reflection -->
    <circle cx="${width * 0.68}" cy="${height * 0.45}" r="${Math.min(width, height) * 0.4}" fill="none" stroke="${t.accent}" stroke-width="1" opacity="0.22" stroke-dasharray="4 8" />
    <circle cx="${width * 0.68}" cy="${height * 0.45}" r="${Math.min(width, height) * 0.25}" fill="none" stroke="${t.accent}" stroke-width="0.75" opacity="0.15" />

    <!-- Fine horizon threshold -->
    <line x1="0" y1="${height * 0.72}" x2="${width}" y2="${height * 0.72}" stroke="rgba(14,21,18,0.08)" stroke-width="1" />
    <rect x="0" y="${height * 0.72}" width="${width}" height="${height * 0.28}" fill="url(#wallDepth)" />

    <!-- Linen Overlay -->
    <rect width="${width}" height="${height}" filter="url(#linenNoise)" />
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
    // Hero Poster (Warm morning light)
    {
      file: path.join(vidDir, "poster.jpg"),
      w: 1920,
      h: 1080,
      theme: "dawnPaper",
    },
    // OpenGraph Image
    {
      file: path.join(pubDir, "og-image.jpg"),
      w: 1200,
      h: 630,
      theme: "warmLight",
    },
    // Services Chapters (Light, warm natural textures)
    {
      file: path.join(imgDir, "service-primary.jpg"),
      w: 1200,
      h: 900,
      theme: "warmLight",
    },
    {
      file: path.join(imgDir, "service-pulmonary.jpg"),
      w: 1200,
      h: 900,
      theme: "sageClean",
    },
    {
      file: path.join(imgDir, "service-preventive.jpg"),
      w: 1200,
      h: 900,
      theme: "dawnPaper",
    },
    {
      file: path.join(imgDir, "service-chronic.jpg"),
      w: 1200,
      h: 900,
      theme: "warmLight",
    },
    {
      file: path.join(imgDir, "service-sleep.jpg"),
      w: 1200,
      h: 900,
      theme: "duskWarm",
    },
    {
      file: path.join(imgDir, "service-weight.jpg"),
      w: 1200,
      h: 900,
      theme: "sageClean",
    },
    {
      file: path.join(imgDir, "service-nutrition.jpg"),
      w: 1200,
      h: 900,
      theme: "warmLight",
    },
    {
      file: path.join(imgDir, "service-lifestyle.jpg"),
      w: 1200,
      h: 900,
      theme: "dawnPaper",
    },
    // Physicians (Editorial portrait palettes)
    {
      file: path.join(imgDir, "doctor-1.jpg"),
      w: 900,
      h: 1200,
      theme: "warmLight",
    },
    {
      file: path.join(imgDir, "doctor-2.jpg"),
      w: 900,
      h: 1200,
      theme: "dawnPaper",
    },
    {
      file: path.join(imgDir, "doctor-3.jpg"),
      w: 900,
      h: 1200,
      theme: "sageClean",
    },
    // Facilities (Clean, pure architectural spaces - NO text!)
    {
      file: path.join(imgDir, "facility-consultation.jpg"),
      w: 1600,
      h: 1000,
      theme: "warmLight",
    },
    {
      file: path.join(imgDir, "facility-pulmonary.jpg"),
      w: 1600,
      h: 1000,
      theme: "sageClean",
    },
    {
      file: path.join(imgDir, "facility-sleep.jpg"),
      w: 1600,
      h: 1000,
      theme: "duskWarm",
    },
  ];

  for (const item of tasks) {
    const svgBuffer = await generateCleanPhotographicImage({
      width: item.w,
      height: item.h,
      theme: item.theme,
    });

    await sharp(svgBuffer)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(item.file);

    console.log(`Generated clean visual: ${path.basename(item.file)}`);
  }
}

main().catch(console.error);
