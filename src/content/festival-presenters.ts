export type FestivalPresenter = {
  id: "marite" | "carlos";
  name: string;
  role: string;
  offering: string;
  time: string;
  shortBio: string;
  fullBio: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position: string;
  };
  instagramUrl: string;
};

// Biografías: texto de Marité aportado por la organización, biografía corta
// de Carlos y dossier Alma Qhana (págs. 2–4). Instagram: cartel de la pág. 8.
// Las antigüedades aproximadas de la biografía de 2024 no se actualizan a 2026.
export const festivalPresenters: FestivalPresenter[] = [
  {
    id: "marite",
    name: "Marité Zalazar",
    role: "Movimiento, conciencia y bienestar",
    offering: "Yoga Nidra",
    time: "Viernes · 18:30",
    shortBio:
      "Su recorrido une danza, yoga, tai chi y biodanza con prácticas de bienestar. En Yoga Nidra propone una pausa de relajación, calma y presencia.",
    fullBio: [
      "El camino personal de Marité siempre ha estado vinculado al trabajo con el cuerpo y la conciencia, a través de disciplinas como la danza, el yoga, el tai chi y la biodanza. En ese recorrido incorporó distintas herramientas que hoy forman parte de su práctica.",
      "Su formación en terapias holísticas acompaña su trabajo con el masaje, la reflexología y el reiki. También integra el yoga nidra como una práctica de relajación y descanso.",
      "Marité cree en el valor de la pausa y del autocuidado. Su propósito es ofrecer un espacio cuidado de calma y silencio, donde cada persona pueda relajar el cuerpo, aquietar la mente y reconectar con la presencia.",
    ],
    image: {
      src: "/images/evento/marite.webp",
      alt: "Retrato de Marité Zalazar",
      width: 1598,
      height: 1600,
      position: "50% 20%",
    },
    instagramUrl: "https://www.instagram.com/marite_zalazar/",
  },
  {
    id: "carlos",
    name: "Carlos Sat Nam",
    role: "Música, yoga y sonido",
    offering: "Baño de gong",
    time: "Viernes · 21:00",
    shortBio:
      "Músico y practicante de yoga, Carlos comparte clases, talleres y conciertos. Su recorrido integra Kundalini Yoga, gong y Nāda Yoga.",
    fullBio: [
      "Carlos Sat Nam es músico y buscador espiritual. Su recorrido reúne la música con la práctica y la enseñanza de Kundalini Yoga, Reiki y Sat Nam Rasayan.",
      "Toca el gong y comparte Nāda Yoga, una práctica vinculada al sonido. Ha ofrecido clases, talleres y conciertos a grupos de distintas edades y ha grabado varios discos de mantras.",
      "En su búsqueda, el yoga se encuentra con la vida misma. Su propuesta invita a acercarse al sonido, la música y la presencia a través de una experiencia compartida.",
    ],
    image: {
      src: "/images/evento/carlos-sat-nam.webp",
      alt: "Carlos Sat Nam durante un encuentro al aire libre",
      width: 1200,
      height: 1600,
      position: "50% 25%",
    },
    instagramUrl: "https://www.instagram.com/carlos.satnam/",
  },
];

export type FestivalDuo = {
  name: "Alma Qhana";
  subtitle: string;
  description: string;
  detail: string[];
  instagramUrl: string;
  spotifyUrl: string;
};

// Dossier, págs. 2, 9, 10 y 12: origen, propuesta, instrumentos y enlaces.
// El álbum enlazado es de Carlos Sat Nam; no se presenta como disco del dúo.
// El inicio del escenario del sábado no es un horario individual del concierto.
export const festivalDuo: FestivalDuo = {
  name: "Alma Qhana",
  subtitle: "Carlos Sat Nam y Marité Zalazar · Concierto de mantras",
  description:
    "Alma Qhana nació en Salta, Argentina, del encuentro de Carlos y Marité a través del canto. Su propuesta reúne mantras, shabds y canto compartido con voces, guitarra y percusión.",
  detail: [
    "El nombre Alma Qhana se presenta en su dossier como «Claridad del Alma». El dúo invita a abrir un espacio de escucha y presencia a través del sonido, la música y la voz.",
    "Carlos aporta la voz y la guitarra; Marité, la voz y la percusión. Juntos proponen un encuentro de canto y meditación.",
    "Alma Qhana participa en el escenario del sábado, cuya programación comienza a las 20:30.",
  ],
  instagramUrl: "https://www.instagram.com/alma.qhana/",
  spotifyUrl: "https://open.spotify.com/album/7myr2AiH8Fbt1mfBEuxj4R",
};
