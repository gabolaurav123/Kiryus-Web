import { documentaryImage } from "./villages";

/** Historical contributions are distinct from current villages and participation. */
export const spainLegacy = {
  slug: "espana",
  country: "España",
  location: "Finca Orihuelo, Campo de San Juan, Moratalla, Murcia",
  description:
    "La aportación de España a la historia de Kiryus: encuentros, permacultura, agricultura regenerativa y aprendizajes compartidos.",
  introduction:
    "España forma parte de la historia de Kiryus. Los encuentros y las prácticas compartidas en torno al cuidado de la tierra, la convivencia y la producción local han aportado al camino de la comunidad.",
  historicalContext:
    "La presentación histórica de Kiryus en España sitúa esta experiencia en la finca Orihuelo, en Campo de San Juan, Moratalla, y describe un trabajo vinculado a la agricultura regenerativa, la permacultura y el cultivo de frutos secos.",
  contributions: [
    "Encuentros y convivencia en comunidad",
    "Prácticas de agricultura regenerativa y permacultura",
    "Cultivo de frutos secos y producción local",
    "Aprendizajes y colaboraciones alrededor del territorio",
  ],
  image: documentaryImage("espana-convivencia"),
  gallery: ["espana-convivencia", "espana-encuentro", "espana-cultivo"].map(
    documentaryImage,
  ),
  source: "https://www.comunidadkiryus.org/kiryus-espa%C3%B1a",
} as const;
