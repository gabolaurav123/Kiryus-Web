import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import sharp from "sharp";
import manifest from "../docs/images-manifest.json";
import { villages } from "../src/content/villages";

test("las fotografías de cada sede tienen una asociación respaldada por su página", () => {
  for (const village of villages) {
    assert.ok(village.gallery.length > 0, `Falta galería: ${village.country}`);
    for (const image of [village.image, ...village.gallery]) {
      const asset = manifest.assets.find(
        (candidate) => candidate.publicPath === image.src,
      );
      assert.ok(asset, `Falta procedencia: ${image.src}`);
      assert.equal(asset.kind, "photograph");
      assert.equal(
        asset.association.country,
        village.slug,
        `Sede sin respaldar para ${image.src}`,
      );
      assert.ok(
        asset.appearances.some(
          (appearance) => appearance.pageUrl === village.source,
        ),
      );
      assert.equal(image.alt, asset.alt);
    }
  }
});

test("las dimensiones del contenido corresponden a los archivos reales y no amplían el original", async () => {
  const images = villages.flatMap((village) => [
    village.image,
    ...village.gallery,
  ]);
  const unique = [
    ...new Map(images.map((image) => [image.src, image])).values(),
  ];
  await Promise.all(
    unique.map(async (image) => {
      const asset = manifest.assets.find(
        (candidate) => candidate.publicPath === image.src,
      )!;
      const metadata = await sharp(
        path.join(process.cwd(), "public", image.src),
      ).metadata();
      assert.equal(image.width, metadata.width);
      assert.equal(image.height, metadata.height);
      assert.ok(image.width <= asset.originalDimensions.width);
      assert.ok(image.height <= asset.originalDimensions.height);
    }),
  );
});
