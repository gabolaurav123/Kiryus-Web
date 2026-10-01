import manifest from "../../docs/images-manifest.json";

export type VillageSlug = "argentina" | "colombia";
export type DocumentaryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};
export type VillageStatus =
  | "En funcionamiento"
  | "En desarrollo activo";
export type Village = {
  slug: VillageSlug;
  country: string;
  region: string;
  location: string;
  number: string;
  coordinatesLabel: string;
  status: VillageStatus;
  focus: string;
  description: string;
  introduction: string;
  image: DocumentaryImage;
  activities: string[];
  story: { year: string; text: string }[];
  details: { label: string; value: string }[];
  gallery: DocumentaryImage[];
  source: string;
};
export function documentaryImage(id: string): DocumentaryImage {
  const image = manifest.assets.find((asset) => asset.id === id);
  if (!image || image.kind !== "photograph")
    throw new Error(`Unknown photograph: ${id}`);
  return {
    src: image.publicPath,
    alt: image.alt,
    width: image.width,
    height: image.height,
    position: image.cropPosition,
  };
}
export const villages: Village[] = [
  {
    slug: "argentina",
    country: "Argentina",
    region: "Tucumán",
    location: "Altos de Medina, Tucumán",
    number: "01",
    coordinatesLabel: "Sur de América",
    status: "En funcionamiento",
    focus: "Construir con la tierra",
    description:
      "Bioconstrucción, autonomía energética y aprendizaje compartido en el territorio tucumano.",
    introduction:
      "En Altos de Medina, en el municipio de Burruyacú, la comunidad desarrolla viviendas, infraestructura y espacios productivos a través del trabajo colectivo. Es el centro matriz de la red Kiryus.",
    image: documentaryImage("argentina-actividad"),
    activities: [
      "Bioconstrucción e infraestructura comunitaria",
      "Sistemas de autonomía energética",
      "Producción y cuidado del territorio",
      "Encuentros, visitas y aprendizaje colectivo",
    ],
    story: [
      {
        year: "Un territorio compartido",
        text: "La sede se presenta como el centro matriz de operaciones de Kiryus, con espacios construidos por la propia comunidad.",
      },
    ],
    details: [
      { label: "Territorio", value: "9 hectáreas" },
      { label: "Altitud publicada", value: "1.900 m" },
      { label: "Capacidad comunicada", value: "15 personas" },
    ],
    gallery: ["argentina-actividad", "argentina-mesa"].map(documentaryImage),
    source: "https://www.comunidadkiryus.org/kiryus-argentina",
  },
  {
    slug: "colombia",
    country: "Colombia",
    region: "Cundinamarca",
    location: "El Hatillo, Guatavita",
    number: "02",
    coordinatesLabel: "Norte de América del Sur",
    status: "En desarrollo activo",
    focus: "Cultivar nuevas posibilidades",
    description:
      "Recuperación ambiental y bosque comestible en los paisajes de alta montaña de Guatavita.",
    introduction:
      "En la vereda El Hatillo, la comunidad aprende y trabaja alrededor de la reforestación y el desarrollo de un bosque comestible. Es un espacio de convivencia, talleres y colaboración con el territorio.",
    image: documentaryImage("colombia-comunidad"),
    activities: [
      "Reforestación y bosque comestible",
      "Cuidado del suelo y prácticas de permacultura",
      "Talleres y encuentros comunitarios",
      "Visitas y voluntariado coordinados",
    ],
    story: [
      {
        year: "2022",
        text: "Comienza la etapa de gestación de la sede colombiana.",
      },
      {
        year: "2023",
        text: "En septiembre inicia el desarrollo del proyecto en Guatavita, según la historia publicada por Kiryus.",
      },
    ],
    details: [
      { label: "Entorno", value: "Alta montaña" },
      { label: "Línea de trabajo", value: "Bosque comestible" },
      { label: "Participación", value: "Por coordinación previa" },
    ],
    gallery: [
      "colombia-comunidad",
      "colombia-encuentro",
      "colombia-paisaje",
    ].map(documentaryImage),
    source: "https://www.comunidadkiryus.org/kiryus-colombia",
  },
];
export function getVillage(slug: string) {
  return villages.find((village) => village.slug === slug);
}
export const participationOptions = [
  {
    slug: "visita",
    number: "01",
    title: "Conocer una aldea",
    text: "Acércate al territorio y conversa con quienes lo habitan.",
    icon: "Compass",
  },
  {
    slug: "voluntariado",
    number: "02",
    title: "Aportar tus manos",
    text: "Consulta las tareas y las posibilidades de voluntariado.",
    icon: "HandHeart",
  },
  {
    slug: "estadia",
    number: "03",
    title: "Compartir una estadía",
    text: "Pregunta por las condiciones y fechas para convivir unos días.",
    icon: "House",
  },
  {
    slug: "colaboracion",
    number: "04",
    title: "Sumar una idea",
    text: "Conecta tus conocimientos o tu proyecto con la comunidad.",
    icon: "Sprout",
  },
] as const;
