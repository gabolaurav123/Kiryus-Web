import {
  documentaryImage,
  villages,
  type VillageSlug,
  type DocumentaryImage,
} from "./villages";
export const getImage = documentaryImage;
export const lifeImages = [
  "comunidad-grupo",
  "comunidad-jardin",
  "comunidad-actividad",
  "comunidad-interior",
  "comunidad-circulo",
  "comunidad-paisaje",
].map(getImage);
export const countryImages = Object.fromEntries(
  villages.map((village) => [village.slug, village.gallery]),
) as Record<VillageSlug, DocumentaryImage[]>;
