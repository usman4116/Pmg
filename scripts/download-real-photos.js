const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const photos = [
  // Doctors (3:4 portrait)
  {
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop",
    dest: "doctor-1.jpg",
    w: 900,
    h: 1200,
  },
  {
    url: "https://images.unsplash.com/photo-1594824813583-e18e0a6d5d5b?q=80&w=900&auto=format&fit=crop",
    dest: "doctor-2.jpg",
    w: 900,
    h: 1200,
  },
  {
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=900&auto=format&fit=crop",
    dest: "doctor-3.jpg",
    w: 900,
    h: 1200,
  },

  // Facilities (16:10 or 16:9 landscape)
  {
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
    dest: "facility-consultation.jpg",
    w: 1600,
    h: 1000,
  },
  {
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop",
    dest: "facility-pulmonary.jpg",
    w: 1600,
    h: 1000,
  },
  {
    url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?q=80&w=1600&auto=format&fit=crop",
    dest: "facility-sleep.jpg",
    w: 1600,
    h: 1000,
  },

  // Services Chapters (4:3 landscape)
  {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    dest: "service-primary.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
    dest: "service-pulmonary.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    dest: "service-preventive.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    dest: "service-chronic.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    dest: "service-sleep.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    dest: "service-weight.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop",
    dest: "service-nutrition.jpg",
    w: 1200,
    h: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1200&auto=format&fit=crop",
    dest: "service-lifestyle.jpg",
    w: 1200,
    h: 900,
  },
];

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Status ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function main() {
  const imgDir = path.join(__dirname, "..", "public", "images");

  for (const item of photos) {
    try {
      console.log(`Downloading ${item.dest}...`);
      const buffer = await download(item.url);
      const outPath = path.join(imgDir, item.dest);

      await sharp(buffer)
        .resize(item.w, item.h, { fit: "cover", position: "center" })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outPath);

      console.log(`✓ Saved real photo: ${item.dest}`);
    } catch (err) {
      console.error(`Failed ${item.dest}:`, err.message);
    }
  }
}

main().catch(console.error);
