export type ImpactFigure = {
  id: string;
  value: number;
  prefix?: string;
  label: string;
  source: string;
  measurementPeriod: string | null;
};

export const impactFigures: ImpactFigure[] = [
  {
    id: "villages",
    value: 2,
    label: "Aldeas actuales",
    source: "Confirmación de la comunidad, 1 de octubre de 2026",
    measurementPeriod: null,
  },
  {
    id: "trees",
    value: 240,
    prefix: "+",
    label: "Árboles plantados",
    source: "https://www.comunidadkiryus.org/",
    measurementPeriod: null,
  },
  {
    id: "land",
    value: 15,
    label: "Hectáreas regeneradas",
    source: "https://www.comunidadkiryus.org/",
    measurementPeriod: null,
  },
];

export const impactContext =
  "Dos aldeas actuales: Argentina y Colombia. España forma parte del legado de Kiryus. Árboles y superficie: cifras comunicadas por Kiryus, sin período de medición especificado.";

export const sustainableGoals = [
  {
    number: 7,
    name: "Energía asequible y no contaminante",
    label: "Energía limpia",
  },
  {
    number: 11,
    name: "Ciudades y comunidades sostenibles",
    label: "Comunidades sostenibles",
  },
  {
    number: 12,
    name: "Producción y consumo responsables",
    label: "Producción responsable",
  },
  { number: 13, name: "Acción por el clima", label: "Acción climática" },
  {
    number: 15,
    name: "Vida de ecosistemas terrestres",
    label: "Ecosistemas terrestres",
  },
  { number: 17, name: "Alianzas para lograr los objetivos", label: "Alianzas" },
];
