export type FestivalDay = {
  id: "viernes" | "sabado" | "domingo";
  day: string;
  date: string;
  verb: string;
  summary: string;
  items: {
    time: string;
    title: string;
    description: string;
    highlights?: string[];
  }[];
};

export type FestivalWorkshop = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  modality?: "general" | "vip";
  description: string;
  activities: string[];
  note?: string;
};

export type FestivalTicket = {
  id: string;
  name: string;
  price: number;
  badge?: string;
  description: string;
};

export type FestivalExtra = {
  id: string;
  title: string;
  priceLabel: string;
  description: string;
  details: string[];
};

export const festival = {
  title: "Festival TuConexión 2026",
  edition: "Cuarta edición",
  theme: "Nueva Humanidad",
  motto: "Todos unidos por un mismo propósito",
  dateLabel: "13 · 14 · 15 de noviembre de 2026",
  stayLabel: "3 días · 2 noches",
  capacity: 120,
  location: "Aldea Kiryus · Burruyacú · Tucumán",
  ticketUrl:
    "https://comunidadkiryus.fanzsites.com/event/163160-festival-tuconexion-2026?themePreview=12310",
  description:
    "Tres días en plena naturaleza para encontrarnos, aprender haciendo y compartir arte, música, convivencia y celebración. Una invitación a experimentar otra manera de estar juntos.",
  invitation: "No vengas solamente a escuchar hablar de una Nueva Humanidad. Vení a vivirla.",
  programNote:
    "Programa previsto por la organización. Las duraciones de los talleres son orientativas; la distribución por bloques, los horarios definitivos y los cupos se confirmarán antes del festival.",
  onlineServiceNote:
    "La compra online en Fanz agrega un 10% de cargo por servicio a los valores base. Revisá el desglose y el total antes de pagar.",
} as const;

export const festivalDays: FestivalDay[] = [
  {
    id: "viernes",
    day: "Viernes",
    date: "13 de noviembre",
    verb: "Conectar",
    summary: "De desconocidos a comunidad. La experiencia comienza desde que llegás.",
    items: [
      {
        time: "14:00–16:00",
        title: "Llegada a Kiryus",
        description:
          "Acreditación, instalación del camping y reconocimiento del predio. Una bienvenida con música, primeros encuentros y la apertura del Mercado Autosostenible.",
        highlights: ["Acreditación", "Camping", "Bienvenida", "Mercado Autosostenible"],
      },
      {
        time: "16:00",
        title: "Apertura oficial",
        description:
          "Comienza la cuarta edición de TuConexión. Compartimos el propósito Nueva Humanidad y los acuerdos para convivir y cuidar la aldea, la naturaleza y a quienes nos acompañan.",
      },
      {
        time: "16:30",
        title: "120 personas · Un mismo propósito",
        description:
          "Movimiento, juego, miradas y conversaciones para empezar a encontrarnos. Uno de los grandes protagonistas del festival es la persona que todavía no conociste.",
        highlights: ["Movimiento", "Juego", "Encuentros", "Conversaciones"],
      },
      {
        time: "17:30",
        title: "Tiempo TuConexión",
        description:
          "Merienda, naturaleza, arte, mercado, descanso y conversaciones. Tiempo para recorrer, conocer y simplemente estar.",
      },
      {
        time: "18:30",
        title: "Yoga Nidra · Marité",
        description:
          "Una experiencia guiada de relajación profunda y descanso consciente. Un momento para detener el ritmo exterior, relajar el cuerpo y entrar en quietud.",
      },
      {
        time: "19:30",
        title: "Cena + encuentro",
        description:
          "Gastronomía, mesas compartidas, mercado y conversaciones para seguir conociéndonos.",
      },
      {
        time: "21:00",
        title: "Baño de Gong · Carlos Sat Nam",
        description:
          "Una inmersión sonora a través de la vibración del gong. Un espacio para detenernos, escuchar y entrar en presencia.",
      },
      {
        time: "22:00",
        title: "Silencio bajo las estrellas",
        description:
          "Meditación, naturaleza y quietud para integrar lo vivido durante el primer día.",
      },
      {
        time: "22:30",
        title: "Descanso",
        description:
          "La primera noche termina temprano. El sábado nos encontramos antes de que salga el sol.",
      },
    ],
  },
  {
    id: "sabado",
    day: "Sábado",
    date: "14 de noviembre",
    verb: "Experimentar",
    summary: "Del yo al nosotros. Aprender haciendo, cooperar y celebrar juntos.",
    items: [
      {
        time: "05:15",
        title: "Despertar",
        description: "Comenzamos suavemente nuestro segundo día, antes del amanecer.",
      },
      {
        time: "05:45",
        title: "Ceremonia de salida del sol",
        description:
          "Caminamos juntos en silencio, respiramos y recibimos el nacimiento de un nuevo día. Que nazca dentro de nosotros aquello que queremos ver nacer en el mundo.",
      },
      {
        time: "07:00–09:00",
        title: "Desayuno + descanso",
        description:
          "Desayunar, dormir, caminar, conversar o estar en la naturaleza. Cada persona elige cómo continuar su mañana.",
      },
      {
        time: "09:00",
        title: "Despertar consciente",
        description:
          "Una propuesta opcional de meditación, movimiento, tai chi y naturaleza para activar el cuerpo antes de las experiencias.",
      },
      {
        time: "10:00–12:30",
        title: "Talleres & experiencias · Bloque I",
        description:
          "Propuestas en simultáneo para construir tu propio recorrido. La organización confirmará la distribución de los talleres y la inscripción de las experiencias con cupos limitados.",
        highlights: [
          "Inmersión en hielo",
          "Desactivación de creencias limitantes",
          "Constelaciones Neuroarquetípicas",
          "Cosmética natural",
          "Bioconstrucción",
          "Arte colectivo",
          "Meditación & presencia",
        ],
      },
      {
        time: "12:30–15:00",
        title: "Tiempo para vivir",
        description:
          "Almuerzo, siesta, naturaleza, mercado, arte, música y descanso. Dejamos espacio para esos encuentros que suceden entre una actividad y la siguiente.",
        highlights: ["Una conversación", "Una persona", "Una historia", "Un encuentro"],
      },
      {
        time: "15:00–16:30",
        title: "Talleres & experiencias · Bloque II",
        description:
          "Un segundo turno para explorar otras propuestas. La distribución y duración efectiva de cada experiencia se confirmarán con la organización.",
      },
      {
        time: "16:30",
        title: "Merienda + descanso",
        description: "Una pausa antes de volver a encontrarnos en las experiencias colectivas.",
      },
      {
        time: "17:00",
        title: "El otro también soy yo",
        description:
          "Una gran experiencia colectiva de escucha, comunicación, confianza, reconocimiento, límites, cooperación y presencia. Aprender a relacionarnos también forma parte de construir una humanidad diferente.",
      },
      {
        time: "18:15",
        title: "Ensayo de la Nueva Humanidad",
        description:
          "Creamos pequeñas aldeas con desafíos, necesidades, recursos y decisiones. Tendremos que comunicarnos, negociar, compartir y resolver juntos, para pasar del yo al nosotros.",
        highlights: ["Crear pequeñas aldeas", "Compartir recursos", "Tomar decisiones", "Cooperar"],
      },
      {
        time: "19:30",
        title: "Cena + descanso",
        description: "Cuando cae la noche, TuConexión cambia de energía.",
      },
      {
        time: "20:30",
        title: "Escenario TuConexión · Música en vivo",
        description:
          "El escenario recibe a músicos y artistas invitados. Una noche de música meditativa, mantras, canciones, ritmo, arte y movimiento. La grilla artística completa se anunciará próximamente.",
      },
      {
        time: "Sábado a la noche",
        title: "Alma Qhana · Concierto meditativo",
        description:
          "Marité y Carlos Sat Nam comparten mantras, shabds y cantos medicina. Una experiencia musical para encontrarnos con el presente a través del sonido y la voz. Horario específico a confirmar dentro de la programación nocturna.",
        highlights: ["Mantras", "Shabds", "Cantos medicina", "Voz y presencia"],
      },
      {
        time: "Durante la noche",
        title: "Fogatas de la Nueva Humanidad",
        description:
          "El fuego se convierte en un escenario más íntimo. Historias, música, conversaciones, risas y silencios compartidos bajo el mismo cielo.",
      },
      {
        time: "Durante la noche",
        title: "Gran fiesta TuConexión",
        description:
          "El escenario se transforma en una celebración de música, baile, arte y alegría. Una noche para soltar, disfrutar y aprender también a celebrar juntos.",
      },
    ],
  },
  {
    id: "domingo",
    day: "Domingo",
    date: "15 de noviembre",
    verb: "Integrar",
    summary: "De la experiencia a la vida. Llevar a casa aquello que elegimos cultivar.",
    items: [
      {
        time: "08:30–10:00",
        title: "Desayuno lento",
        description:
          "Después de la celebración del sábado comenzamos más tarde. Café, naturaleza, música, mercado y conversaciones, sin prisa.",
      },
      {
        time: "10:00",
        title: "Experiencia Kiryus · La aldea desde adentro",
        description:
          "Recorremos Kiryus para conocer cómo se piensa una ecoaldea y los desafíos reales de construir comunidad. ¿Cómo sería vivir en una comunidad de la Nueva Humanidad?",
        highlights: [
          "Naturaleza y agua",
          "Alimento y vivienda",
          "Energía y sustentabilidad",
          "Comunidad, servicio y convivencia",
        ],
      },
      {
        time: "11:00",
        title: "Círculos de integración · ¿Qué descubrí?",
        description:
          "Nos reunimos en pequeños grupos para compartir qué descubrimos de nosotros y del otro, qué nos sorprendió o incomodó, qué aprendimos de convivir y qué queremos llevar a nuestra vida.",
      },
      {
        time: "12:00",
        title: "Arte + juego · La humanidad que elegimos",
        description:
          "Teatro, música, movimiento, humor e improvisación. Una creación colectiva para expresar jugando lo que estos tres días nos hicieron pensar y sentir: la humanidad que dejamos y la que elegimos.",
      },
      {
        time: "13:00–14:30",
        title: "Almuerzo + Mercado Autosostenible",
        description:
          "Un último gran momento para comer, recorrer stands, conocer emprendimientos y proyectos, intercambiar contactos, comprar, conversar y crear alianzas.",
      },
      {
        time: "14:30",
        title: "Gran círculo · 120 voces, un mismo propósito",
        description:
          "Volvemos a reunirnos. Cada grupo aporta una palabra, una reflexión o un aprendizaje para construir simbólicamente el Manifiesto TuConexión 2026.",
      },
      {
        time: "15:30",
        title: "Ceremonia de la semilla",
        description:
          "Una semilla, una intención y una pregunta: ¿qué elegís cultivar a partir de ahora? Un símbolo para llevarte y recordar que la experiencia continúa cuando volvemos a casa.",
      },
      {
        time: "16:00–17:00",
        title: "Gran cierre TuConexión 2026",
        description:
          "Música, integración, celebración, agradecimientos, foto oficial y abrazos. Llegamos como desconocidos y compartimos otra manera de estar juntos; ahora comienza la tarea de llevarla a nuestra vida.",
      },
      {
        time: "17:00",
        title: "Fin del festival",
        description: "El final de TuConexión 2026. Y quizás, el comienzo de algo mucho más grande.",
      },
    ],
  },
];

export const festivalWorkshops: FestivalWorkshop[] = [
  {
    id: "inmersion-en-hielo",
    title: "Inmersión en hielo",
    subtitle: "Soltar cargas y límites mentales",
    duration: "2 horas · duración orientativa",
    modality: "vip",
    description:
      "Un encuentro consciente con el frío para observar las cargas que venís sosteniendo y los límites que tu mente fue construyendo. Antes de la inmersión habrá preparación, respiración y conexión corporal; cada participante podrá identificar simbólicamente aquello que elige dejar atrás.",
    activities: [
      "Preparación y respiración guiada.",
      "Identificación de cargas y límites mentales.",
      "Conexión cuerpo–mente.",
      "Inmersión consciente y voluntaria.",
      "Momento simbólico de soltar.",
      "Recuperación e integración.",
    ],
    note:
      "No es una competencia ni una prueba de resistencia. La inmersión será voluntaria, progresiva y supervisada, respetando las condiciones de seguridad de cada participante.",
  },
  {
    id: "creencias-limitantes",
    title: "Desactivación de creencias limitantes",
    subtitle: "Dejá de repetir aquello que ya no querés para tu vida",
    duration: "2 horas · duración orientativa",
    modality: "vip",
    description:
      "Una experiencia de Neurofitness Active® para observar las creencias y los patrones aprendidos que pueden condicionar nuestras decisiones. Exploramos aquello que queremos cambiar y seguimos repitiendo, para ensayar respuestas diferentes.",
    activities: [
      "Identificación de un patrón repetitivo.",
      "Reconocimiento de la creencia que puede sostenerlo.",
      "Observación de pensamientos, emociones y conductas automáticas.",
      "Exploración de nuevas alternativas.",
      "Entrenamiento de una respuesta diferente.",
    ],
  },
  {
    id: "constelaciones-neuroarquetipicas",
    title: "Constelaciones Neuroarquetípicas",
    subtitle: "Explorá tu relación con el dinero",
    duration: "2 horas · duración orientativa",
    modality: "vip",
    description:
      "El dinero puede representar seguridad, merecimiento, poder, miedo, pertenencia o libertad. A través de una experiencia grupal y representativa observaremos esa relación desde otra perspectiva, explorando los patrones que aparecen al recibir, generar, conservar o compartir recursos.",
    activities: [
      "Qué representa el dinero para cada persona.",
      "Desde qué lugar nos relacionamos con él.",
      "Patrones aprendidos alrededor de abundancia y escasez.",
      "Merecimiento y capacidad de recibir.",
      "Arquetipos vinculados al dinero.",
      "Nuevas formas posibles de relacionarnos con los recursos.",
    ],
  },
  {
    id: "cosmetica-natural",
    title: "Cosmética natural",
    subtitle: "Siempre bella · Siempre natural",
    duration: "2 horas · duración orientativa",
    modality: "vip",
    description:
      "Un taller práctico para acercarnos de forma consciente al cuidado de la piel y a los productos que usamos cada día. Conoceremos ingredientes naturales y sus posibilidades en rutinas sencillas de autocuidado. Sobre todo, vamos a aprender haciendo.",
    activities: [
      "Ingredientes naturales para el cuidado de la piel.",
      "Usos y propiedades cosméticas.",
      "Rutinas sencillas de cuidado.",
      "Elaboración de una preparación práctica.",
      "Belleza, autocuidado y consumo consciente.",
    ],
  },
  {
    id: "bioconstruccion",
    title: "Bioconstrucción",
    subtitle: "De la tierra a una pared",
    duration: "3 horas · duración orientativa",
    modality: "vip",
    description:
      "Vamos a construir. Trabajaremos con materiales y mezclas para realizar, entre todos, un modelo práctico de panel de pared. Una experiencia colaborativa para comprender cómo se combinan los recursos de la bioconstrucción y preguntarnos cómo queremos habitar la Tierra.",
    activities: [
      "Introducción práctica a la bioconstrucción.",
      "Reconocimiento de materiales.",
      "Preparación de materiales y mezclas.",
      "Comprensión de la estructura de un panel.",
      "Armado del modelo.",
      "Aplicación práctica de los materiales.",
      "Trabajo colaborativo.",
      "Construcción del panel entre todos.",
    ],
    note: "Su distribución horaria se confirmará con la organización.",
  },
  {
    id: "arte-colectivo",
    title: "Arte colectivo",
    subtitle: "El mural TuConexión 2026",
    duration: "2 horas · duración orientativa",
    modality: "vip",
    description:
      "Una pared, muchas manos y una historia compartida. Crearemos el mural oficial de esta cuarta edición: cada persona podrá dejar una forma, palabra, símbolo, huella o fragmento de color. No necesitás ser artista. La obra quedará en Aldea Kiryus como memoria del encuentro.",
    activities: [
      "Creación individual y colectiva.",
      "Color y expresión.",
      "Símbolos de la Nueva Humanidad.",
      "Cooperación.",
      "Intervención del mural.",
      "Construcción de una memoria común.",
    ],
  },
  {
    id: "meditacion-presencia",
    title: "Meditación & presencia",
    subtitle: "Volver al silencio",
    duration: "2 horas · duración orientativa",
    modality: "general",
    description:
      "Una invitación a bajar el volumen de afuera y escuchar lo que sucede adentro. Respiración, atención corporal, naturaleza, silencio y meditación para detenernos y estar presentes. No necesitás experiencia previa.",
    activities: [
      "Respiración y atención corporal.",
      "Contacto con la naturaleza.",
      "Espacios de silencio.",
      "Meditación y presencia.",
    ],
  },
];

export const festivalGeneralIncludes = [
  "Acceso a los tres días de TuConexión.",
  "Dos noches en carpa comunitaria compartida para mujeres o para hombres, o espacio para instalar tu propia carpa.",
  "Ceremonia Kiryus de Salida del Sol.",
  "Yoga Nidra con Marité.",
  "Baño de Gong con Carlos Sat Nam.",
  "Programación musical general, músicos y artistas invitados.",
  "Fogatas y Gran Fiesta TuConexión.",
  "Actividades colectivas y dinámicas de conexión y convivencia.",
  "Acceso al Mercado Autosostenible.",
  "Espacios de naturaleza, meditación e integración.",
  "Recorrido y experiencia por Aldea Kiryus.",
];

export const festivalVipIncludes = [
  "Todo lo incluido en la entrada general.",
  "Inmersión en hielo.",
  "Neurofitness Active® · Desactivación de creencias limitantes.",
  "Constelaciones Neuroarquetípicas · Relación con el dinero.",
  "Cosmética natural · Siempre bella, siempre natural.",
  "Bioconstrucción · Construcción práctica de un panel de pared.",
  "Arte colectivo · Mural TuConexión 2026.",
  "Pasaporte hacia la Nueva Humanidad.",
];

export const festivalPurchaseConditions: {
  title: string;
  description: string;
}[] = [
  {
    title: "Reserva de $20.000 ARS",
    description:
      "Podés comenzar tu inscripción con una reserva de valor base $20.000 ARS. Las condiciones de confirmación y su aplicación al valor de la entrada se anunciarán próximamente.",
  },
  {
    title: "Pago del saldo",
    description:
      "El plazo para completar el pago de la entrada se anunciará próximamente.",
  },
  {
    title: "Cambios y cancelaciones",
    description:
      "Las condiciones de cambios, cancelaciones y devoluciones de entradas, reservas y vouchers se anunciarán próximamente.",
  },
  {
    title: "Medios de pago",
    description:
      "Los precios publicados de entradas, reservas y vouchers son valores base en ARS. La compra online en Fanz agrega un 10% de cargo por servicio; revisá el desglose y el total antes de pagar. Los medios de pago disponibles y sus condiciones se muestran al momento de comprar.",
  },
  {
    title: "Participación de menores",
    description:
      "Las condiciones de ingreso y participación de menores de edad se anunciarán próximamente.",
  },
  {
    title: "Inmersión en hielo",
    description:
      "La participación es voluntaria y supervisada. Antes de realizarla se comunicarán las indicaciones y condiciones de seguridad. La organización podrá limitar la participación cuando existan condiciones que hagan desaconsejable la experiencia.",
  },
  {
    title: "Programación y experiencia VIP",
    description:
      "VIP incluye la programación general y las experiencias especiales indicadas en esta página. La grilla publicada todavía no es definitiva: los nuevos músicos, artistas, ponentes, facilitadores y expositores confirmados se incorporarán progresivamente.",
  },
];

export const festivalTickets: FestivalTicket[] = [
  {
    id: "general",
    name: "Entrada general",
    price: 133000,
    badge: "General",
    description:
      "Tres días, dos noches de alojamiento compartido o espacio para tu carpa, ceremonias, música, meditación, convivencia y actividades colectivas.",
  },
  {
    id: "vip",
    name: "Entrada VIP",
    price: 369000,
    badge: "VIP",
    description:
      "Todo lo incluido en General, más seis talleres y experiencias especiales y el Pasaporte hacia la Nueva Humanidad.",
  },
  {
    id: "reserva",
    name: "Reserva",
    price: 20000,
    description:
      "Comenzá tu inscripción con una reserva de valor base $20.000 ARS. La compra online en Fanz agrega un 10% de cargo por servicio. Las condiciones de confirmación, pago del saldo y cancelaciones se anunciarán próximamente.",
  },
  {
    id: "voucher-general",
    name: "Voucher 5 × 4 · General",
    price: 532000,
    badge: "Para venir en grupo",
    description:
      "Cinco personas participan con modalidad General al valor de cuatro entradas. Ahorro total del grupo: $133.000 ARS.",
  },
  {
    id: "voucher-vip",
    name: "Voucher 5 × 4 · VIP",
    price: 1476000,
    badge: "Para venir en grupo",
    description:
      "Cinco personas participan con modalidad VIP al valor de cuatro entradas. Ahorro total del grupo: $369.000 ARS.",
  },
];

export const festivalExtras: FestivalExtra[] = [
  {
    id: "traslado",
    title: "Traslado ida y vuelta",
    priceLabel: "$25.000 ARS por persona",
    description:
      "San Miguel de Tucumán ↔ Aldea Kiryus. Si no tenés movilidad propia, podés reservar un lugar en el transporte organizado por el festival.",
    details: [
      "Ida hasta la puerta de Aldea Kiryus y regreso a San Miguel de Tucumán al finalizar el festival el domingo.",
      "Encuentro previsto en Parque 9 de Julio, en la zona cercana a la Terminal de Ómnibus.",
      "Reserva previa directamente con la organización.",
      "Los horarios exactos y el punto de encuentro se informarán a quienes contraten el traslado.",
      "Servicio extra: no está incluido en la entrada.",
    ],
  },
  {
    id: "carpa",
    title: "Alquiler de carpa individual",
    priceLabel: "Consultá precio y disponibilidad",
    description:
      "Si preferís privacidad y no tenés carpa propia, podés solicitar una carpa individual. Es una alternativa opcional a las carpas comunitarias incluidas en tu entrada.",
    details: [
      "Servicio opcional con reserva previa.",
      "Unidades limitadas: solicitá disponibilidad con anticipación.",
      "Precio y condiciones a confirmar directamente con la organización.",
      "Servicio extra: no está incluido en la entrada.",
    ],
  },
  {
    id: "colchon",
    title: "Alquiler de colchón inflable",
    priceLabel: "Consultá precio y disponibilidad",
    description:
      "Podés solicitar un colchón inflable para hacer más cómoda tu estadía de camping durante el festival.",
    details: [
      "Servicio opcional con reserva previa.",
      "Unidades limitadas: solicitá disponibilidad con anticipación.",
      "Precio y disponibilidad a confirmar con la organización para las dos noches del festival.",
      "Servicio extra: no está incluido en la entrada.",
    ],
  },
];

export const festivalPackingList = [
  "Bolsa de dormir o ropa de cama y almohada, también si utilizás las carpas comunitarias.",
  "Tu carpa, si preferís instalarla en el sector habilitado.",
  "Abrigo para la noche, ropa cómoda y una muda adicional.",
  "Calzado adecuado para caminar por el predio.",
  "Toalla y elementos de higiene personal.",
  "Botella reutilizable para agua.",
  "Colchoneta o manta para las propuestas de descanso y meditación.",
  "Linterna, protección solar y repelente.",
  "Traje de baño y ropa seca para cambiarte, si participás de la inmersión en hielo.",
];

export const festivalAlwaysOn = [
  "Música en vivo y artistas invitados",
  "Naturaleza y espacios de silencio",
  "Arte y creación colectiva",
  "Meditación y experiencias",
  "Talleres para aprender haciendo",
  "Fogatas, baile y celebración",
  "Dinámicas de conexión",
  "Mercado Autosostenible",
  "Gastronomía",
  "Convivencia y comunidad",
];

export const festivalFaqs: { question: string; answer: string }[] = [
  {
    question: "¿Tengo que pertenecer a Kiryus o tener experiencia previa?",
    answer:
      "No. TuConexión es un encuentro abierto: no necesitás pertenecer a Kiryus, tener entrenamiento previo, saber meditar ni haber vivido en comunidad. Te invitamos a descubrir, compartir y participar desde el cuidado. Las condiciones de participación de menores se anunciarán próximamente.",
  },
  {
    question: "¿Cuándo y dónde es TuConexión 2026?",
    answer:
      "Son tres días y dos noches, del viernes 13 al domingo 15 de noviembre de 2026, en Aldea Kiryus, Burruyacú, Tucumán, Argentina. La llegada está prevista el viernes entre las 14:00 y las 16:00; el festival termina el domingo a las 17:00. La información específica de acceso se comunicará a los participantes confirmados.",
  },
  {
    question: "¿Cuántas personas participarán?",
    answer:
      "El cupo previsto del festival es de 120 personas. Las experiencias especiales pueden tener cupos propios y requerir inscripción previa.",
  },
  {
    question: "¿Cómo adquiero mi entrada?",
    answer:
      "Elegí Adquirir para ir a Fanz. Los precios de entradas, reservas y vouchers publicados aquí son valores base en pesos argentinos (ARS). La compra online agrega un 10% de cargo por servicio: revisá el desglose y el total antes de pagar. Los medios de pago se muestran al comprar.",
  },
  {
    question: "¿Qué incluye la entrada General?",
    answer:
      "Incluye los tres días del festival, dos noches en carpa comunitaria compartida o espacio para tu propia carpa, la Ceremonia de Salida del Sol, Yoga Nidra, Baño de Gong, música, fogatas, fiesta, actividades colectivas, meditación, integración, acceso al mercado y experiencia Kiryus. Las comidas, el transporte, los talleres especiales VIP, la carpa individual privada y el colchón inflable no están incluidos.",
  },
  {
    question: "¿Qué suma la entrada VIP?",
    answer:
      "Incluye todo lo de General, más acceso a seis experiencias especiales: inmersión en hielo, Neurofitness Active®, Constelaciones Neuroarquetípicas, cosmética natural, bioconstrucción y Mural TuConexión 2026. También incluye el Pasaporte hacia la Nueva Humanidad. Las comidas, el transporte, la carpa individual privada y el colchón inflable siguen siendo extras.",
  },
  {
    question: "¿Puedo reservar y cuándo tengo que completar el pago?",
    answer:
      "Podés comenzar tu inscripción con una reserva de valor base $20.000 ARS. La compra online en Fanz agrega un 10% de cargo por servicio; revisá el desglose y el total antes de pagar. Sus condiciones de confirmación, la aplicación al valor final de la entrada, el plazo para pagar el saldo y las políticas de cambios, cancelaciones y devoluciones se anunciarán próximamente. Los medios de pago disponibles se muestran al comprar.",
  },
  {
    question: "¿Puedo participar de todos los talleres?",
    answer:
      "Hay propuestas en simultáneo para que armes tu recorrido. Meditación y presencia está incluida en General; los seis talleres especiales forman parte de VIP. Algunas experiencias tienen cupos limitados y podrán requerir inscripción previa. La organización confirmará la distribución por bloques y los horarios definitivos, por lo que el acceso VIP no implica poder realizar todas las propuestas al mismo tiempo.",
  },
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "Arte colectivo y meditación están pensados para participar sin experiencia previa. Para otras propuestas, consultá a la organización sus condiciones de participación. La inmersión en hielo es voluntaria, progresiva y supervisada; no es una competencia.",
  },
  {
    question: "¿Dónde voy a dormir? ¿Necesito carpa propia?",
    answer:
      "Tu entrada incluye alojamiento para las dos noches en las grandes carpas comunitarias de Kiryus: una compartida para mujeres y otra para hombres. También podés llevar tu propia carpa e instalarla en el sector habilitado; el espacio está incluido. Cada participante debe traer sus elementos personales para dormir, como bolsa de dormir o ropa de cama y almohada.",
  },
  {
    question: "¿Puedo alquilar una carpa o un colchón?",
    answer:
      "Sí. Si preferís privacidad y no tenés carpa, podés consultar por una carpa individual. También podés solicitar un colchón inflable. Son extras opcionales con unidades limitadas y reserva previa; consultá precio y disponibilidad directamente con la organización.",
  },
  {
    question: "¿Las comidas están incluidas?",
    answer:
      "No. Durante el festival habrá propuestas gastronómicas donde cada participante podrá comprar sus alimentos según sus preferencias. Las opciones y horarios se comunicarán cuando estén confirmados.",
  },
  {
    question: "¿Cómo reservo el traslado desde San Miguel de Tucumán?",
    answer:
      "El traslado organizado de ida y vuelta cuesta $25.000 ARS por persona y requiere reserva previa con la organización. El encuentro previsto es en Parque 9 de Julio, en la zona cercana a la Terminal de Ómnibus. Los horarios y el punto exacto se comunicarán a quienes contraten el servicio. Es un extra y no está incluido en la entrada.",
  },
  {
    question: "¿Dónde consulto alimentación, accesibilidad o necesidades particulares?",
    answer:
      "Escribí a la organización antes de reservar para consultar opciones de alimentación, condiciones del predio, desplazamientos, accesibilidad y cualquier necesidad particular. Las opciones y apoyos disponibles deben confirmarse para tu caso.",
  },
  {
    question: "¿Está confirmada toda la programación musical?",
    answer:
      "Alma Qhana, el dúo de Marité y Carlos Sat Nam, participará con un concierto meditativo durante la noche del sábado. La grilla completa de músicos y artistas invitados se anunciará próximamente, junto con sus horarios específicos.",
  },
];
