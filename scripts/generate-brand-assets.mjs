import sharp from "sharp";
const logo = "public/images/logo-kiryus-white.png";
await sharp(logo)
  .webp({ lossless: true })
  .toFile("public/images/kiryus-logo.webp");
await sharp(logo)
  .extract({ left: 0, top: 0, width: 495, height: 577 })
  .extend({ top: 12, bottom: 12, left: 53, right: 53, background: "#12382A" })
  .resize(192, 192)
  .flatten({ background: "#12382A" })
  .png()
  .toFile("public/favicon.png");
const background = await sharp("public/images/comunidad-paisaje.webp")
  .resize(650, 630, { fit: "cover", position: "attention" })
  .toBuffer();
const brand = await sharp(logo).resize(200).toBuffer();
const text = Buffer.from(
  '<svg width="1200" height="630"><rect width="550" height="630" fill="#12382A"/><text x="58" y="250" font-family="Georgia,serif" font-size="67" fill="#F5F2E9">Habitar la Tierra.</text><text x="58" y="333" font-family="Georgia,serif" font-size="62" fill="#DCE6D5" font-style="italic">Regenerar</text><text x="58" y="410" font-family="Georgia,serif" font-size="62" fill="#DCE6D5" font-style="italic">el futuro.</text><text x="58" y="560" font-family="sans-serif" font-size="18" fill="#DCE6D5">ARGENTINA · COLOMBIA · ESPAÑA</text></svg>',
);
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#12382A" },
})
  .composite([
    { input: background, left: 550, top: 0 },
    { input: text },
    { input: brand, left: 58, top: 35 },
  ])
  .jpeg({ quality: 85 })
  .toFile("public/images/social-cover.jpg");
console.log(
  "Logo, favicon and social cover generated from original brand assets.",
);
