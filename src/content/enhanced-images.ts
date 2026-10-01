import manifest from "../../docs/enhanced-images-manifest.json";

/** Display metadata for AI-restored derivatives, distinct from original photographs. */
export type EnhancedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: string;
};

function enhancedImage(id: string): EnhancedImage {
  const image = manifest.assets.find((asset) => asset.id === id);
  if (!image || image.kind !== "ai-restored-photograph") {
    throw new Error(`Unknown restored image: ${id}`);
  }
  return {
    src: image.publicPath,
    alt: image.alt,
    width: image.width,
    height: image.height,
    position: image.cropPosition,
  };
}

export const enhancedLandscape = enhancedImage("comunidad-paisaje-restaurada");
export const enhancedDawn = enhancedImage("comunidad-amanecer-restaurada");
