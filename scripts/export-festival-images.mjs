import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// One-time import of the photographs supplied by the festival organizers.
// No AI alteration, cropping, enlargement or change to the subjects.
const sourceRoot = process.argv[2];
const dossierPhoto = process.argv[3];
if (!sourceRoot || !dossierPhoto) throw new Error("Provide portrait directory and extracted dossier photograph path.");
const destination = resolve("public/images/evento");
await mkdir(destination, { recursive: true });
const sources = [
  [resolve(sourceRoot, "codex-clipboard-4aee6cc2-1df9-4709-ac9d-9581b83a2442.jpg"), "marite"],
  [resolve(sourceRoot, "codex-clipboard-f21f199a-76c4-463c-b23c-8916540be5c7.png"), "carlos-sat-nam"],
  [dossierPhoto, "alma-qhana"],
];
for (const [source, name] of sources) {
  const info = await sharp(source).rotate().webp({ quality: 85, effort: 6 }).toFile(resolve(destination, `${name}.webp`));
  console.log(`${name}: ${info.width}×${info.height}, ${info.size} bytes`);
}
