const path = require("path");
const sharp = require("sharp");

async function main() {
  const imgDir = path.join(__dirname, "..", "public", "images");
  const vidDir = path.join(__dirname, "..", "public", "video");

  const consultPath = path.join(imgDir, "facility-consultation.jpg");
  const sleepPath = path.join(imgDir, "facility-sleep.jpg");
  const posterPath = path.join(vidDir, "poster.jpg");

  // 1. service-primary.jpg from consultation photo (focused crop)
  await sharp(consultPath)
    .resize(1200, 900, { fit: "cover", position: "left" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-primary.jpg"));
  console.log("Updated service-primary.jpg from real consultation photo");

  // 2. service-sleep.jpg from sleep photo
  await sharp(sleepPath)
    .resize(1200, 900, { fit: "cover", position: "center" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-sleep.jpg"));
  console.log("Updated service-sleep.jpg from real sleep suite photo");

  // 3. service-lifestyle.jpg from consultation garden window crop
  await sharp(consultPath)
    .resize(1200, 900, { fit: "cover", position: "right" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-lifestyle.jpg"));
  console.log("Updated service-lifestyle.jpg from garden light crop");

  // 4. facility-pulmonary.jpg from modern architectural perspective
  await sharp(consultPath)
    .modulate({
      brightness: 1.05,
      saturation: 0.9,
    })
    .tint({ r: 240, g: 245, b: 242 })
    .resize(1600, 1000, { fit: "cover", position: "center" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "facility-pulmonary.jpg"));
  console.log("Updated facility-pulmonary.jpg");

  // 5. service-pulmonary.jpg
  await sharp(consultPath)
    .modulate({ brightness: 1.02, saturation: 0.85 })
    .resize(1200, 900, { fit: "cover", position: "center" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-pulmonary.jpg"));
  console.log("Updated service-pulmonary.jpg");

  // 6. service-preventive.jpg
  await sharp(posterPath)
    .modulate({ brightness: 1.08, saturation: 0.85 })
    .resize(1200, 900, { fit: "cover", position: "center" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-preventive.jpg"));
  console.log("Updated service-preventive.jpg");

  // 7. service-chronic.jpg
  await sharp(consultPath)
    .modulate({ brightness: 0.98, saturation: 0.95 })
    .resize(1200, 900, { fit: "cover", position: "left" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-chronic.jpg"));
  console.log("Updated service-chronic.jpg");

  // 8. service-weight.jpg
  await sharp(consultPath)
    .modulate({ brightness: 1.04, saturation: 0.88 })
    .resize(1200, 900, { fit: "cover", position: "center" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-weight.jpg"));
  console.log("Updated service-weight.jpg");

  // 9. service-nutrition.jpg
  await sharp(posterPath)
    .modulate({ brightness: 1.05, saturation: 0.95 })
    .resize(1200, 900, { fit: "cover", position: "right" })
    .jpeg({ quality: 90 })
    .toFile(path.join(imgDir, "service-nutrition.jpg"));
  console.log("Updated service-nutrition.jpg");
}

main().catch(console.error);
