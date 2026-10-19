const path = require("path");
const sharp = require("sharp");

async function generateDoctorPortrait({ filename, theme, name, role }) {
  const width = 900;
  const height = 1200;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Warm clinical ambient background -->
      <linearGradient id="wallBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5EFE6" />
        <stop offset="50%" stop-color="#EAE0D2" />
        <stop offset="100%" stop-color="#DFD2C2" />
      </linearGradient>

      <!-- Soft window light casting across physician -->
      <radialGradient id="windowLight" cx="20%" cy="25%" r="85%">
        <stop offset="0%" stop-color="#FFFDF9" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#F2E8DC" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#DFD2C2" stop-opacity="0" />
      </radialGradient>

      <!-- Subtle silhouette tone -->
      <linearGradient id="physicianGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2F3E37" />
        <stop offset="60%" stop-color="#1A2520" />
        <stop offset="100%" stop-color="#0E1512" />
      </linearGradient>

      <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FAF8F5" />
        <stop offset="100%" stop-color="#EDE6DC" />
      </linearGradient>

      <filter id="portraitFilmGrain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.045 0" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>

    <!-- Background Room -->
    <rect width="${width}" height="${height}" fill="url(#wallBg)" />
    <rect width="${width}" height="${height}" fill="url(#windowLight)" />

    <!-- Architectural window frame shadow -->
    <rect x="${width * 0.08}" y="0" width="${width * 0.25}" height="${height}" fill="rgba(14,21,18,0.03)" />
    <line x1="${width * 0.33}" y1="0" x2="${width * 0.33}" y2="${height}" stroke="rgba(14,21,18,0.06)" stroke-width="1.5" />

    <!-- Editorial Physician Silhouette (human form, shoulders, head, posture) -->
    <!-- Head -->
    <circle cx="${width * 0.5}" cy="${height * 0.38}" r="${width * 0.13}" fill="url(#physicianGrad)" />

    <!-- Neck & Collar -->
    <path d="M ${width * 0.44} ${height * 0.48} L ${width * 0.56} ${height * 0.48} L ${width * 0.58} ${height * 0.55} L ${width * 0.42} ${height * 0.55} Z" fill="url(#physicianGrad)" />

    <!-- Medical Attire / Coat Shoulders -->
    <path d="M ${width * 0.18} ${height} C ${width * 0.22} ${height * 0.62}, ${width * 0.38} ${height * 0.52}, ${width * 0.5} ${height * 0.52} C ${width * 0.62} ${height * 0.52}, ${width * 0.78} ${height * 0.62}, ${width * 0.82} ${height} Z" fill="url(#coatGrad)" stroke="rgba(14,21,18,0.08)" stroke-width="1.5" />

    <!-- Inner Lapel & Tie / Collar Detail -->
    <path d="M ${width * 0.45} ${height * 0.53} L ${width * 0.5} ${height * 0.68} L ${width * 0.55} ${height * 0.53} Z" fill="url(#physicianGrad)" opacity="0.85" />
    <line x1="${width * 0.5}" y1="${height * 0.68}" x2="${width * 0.5}" y2="${height}" stroke="rgba(14,21,18,0.12)" stroke-width="2" />

    <!-- Ambient circular lighting ring -->
    <circle cx="${width * 0.75}" cy="${height * 0.28}" r="${width * 0.22}" fill="none" stroke="#C86B4A" stroke-width="1" opacity="0.25" stroke-dasharray="4 6" />

    <!-- Film Grain Overlay -->
    <rect width="${width}" height="${height}" filter="url(#portraitFilmGrain)" />
  </svg>
  `;

  return Buffer.from(svg);
}

async function main() {
  const imgDir = path.join(__dirname, "..", "public", "images");

  const doctors = [
    { filename: "doctor-1.jpg", name: "Lead Physician", role: "Pulmonary" },
    { filename: "doctor-2.jpg", name: "Attending Physician", role: "Primary Care" },
    { filename: "doctor-3.jpg", name: "Clinical Specialist", role: "Metabolic" },
  ];

  for (const doc of doctors) {
    const svg = await generateDoctorPortrait({
      filename: doc.filename,
      name: doc.name,
      role: doc.role,
    });
    await sharp(svg)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(imgDir, doc.filename));
    console.log(`Generated editorial portrait: ${doc.filename}`);
  }
}

main().catch(console.error);
