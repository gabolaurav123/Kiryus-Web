export type FestivalDay = {
  id: "sabado" | "domingo";
  day: string;
  number: number;
  date: string;
  isoDate: string;
  verb: string;
  summary: string;
  items: { time: string; title: string; description: string }[];
};
export type FestivalWorkshop = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  description: string;
  note?: string;
};
export type FestivalTicket = {
  id: "camping" | "habitacion";
  name: string;
  price: number;
  description: string;
  includes: string[];
  notIncluded: string[];
  note: string;
};
export type FestivalExtra = {
  id: string;
  title: string;
  priceLabel: string;
  description: string;
  details: string[];
};
export type FestivalFaq = {
  category: "compra" | "viaje" | "participar";
  question: string;
  answer: string;
};

// Propuesta y programa facilitados por la organización el 16/10/2026.
// Sustituyen íntegramente las modalidades y el programa anteriores.
export const festival = {
  title: "Festival TuConexión 2026",
  edition: "Cuarta edición",
  theme: "Nueva Humanidad",
  motto: "Todos unidos por un mismo propósito",
  dateLabel: "14 y 15 de noviembre de 2026",
  shortDateLabel: "14 y 15 de noviembre",
  compactDateLabel: "14–15 nov",
  posterDateLabel: "14 / 15 NOV",
  stayLabel: "2 días · 1 noche",
  startDate: "2026-11-14T09:00:00-03:00",
  endDate: "2026-11-15T17:00:00-03:00",
  location: "Aldea Kiryus · Burruyacú · Tucumán",
  ticketUrl: "https://comunidadkiryus.fanzsites.com/event/163160-festival-tuconexion-2026?themePreview=12310",
  description: "Dos días y una noche para compartir naturaleza, movimiento, música, arte y comunidad. Un recorrido para soltar, encontrarnos y crear juntos.",
  invitation: "No vengas solamente a escuchar hablar de una Nueva Humanidad. Vení a experimentarla.",
  programNote: "Todas las experiencias forman parte del mismo recorrido y están incluidas en ambas modalidades. La inmersión en hielo es voluntaria y supervisada.",
} as const;

export const festivalDays: FestivalDay[] = [
  {
    id: "sabado", day: "Sábado", number: 14, date: "14 de noviembre", isoDate: "2026-11-14",
    verb: "Soltar para encontrarnos",
    summary: "Naturaleza, experiencias, movimiento y una noche para compartir.",
    items: [
      { time: "09:00", title: "Llegada a Kiryus", description: "Recepción y acreditación. Tiempo para instalar tu carpa o recibir la habitación compartida, conocer el predio y bajar el ritmo." },
      { time: "10:00", title: "Apertura · Un mismo propósito", description: "Un gran círculo para compartir el propósito del encuentro y los acuerdos de respeto, escucha, presencia, cuidado, responsabilidad y servicio." },
      { time: "10:45", title: "Conexión con la naturaleza", description: "Caminar, respirar, observar y compartir momentos de silencio. Una experiencia para bajar el ritmo y volver al presente." },
      { time: "12:00", title: "Experiencia de hielo", description: "Preparación, respiración y conexión corporal antes de una inmersión voluntaria y supervisada. Un espacio para observar nuestra respuesta al desafío, respetando las condiciones de seguridad." },
      { time: "13:30", title: "Almuerzo incluido", description: "Compartimos la mesa y dejamos tiempo para conversar, descansar y encontrarnos." },
      { time: "15:30", title: "Neuroconstelaciones Holográficas", description: "Una experiencia grupal de exploración personal para observar representaciones, patrones y dinámicas en nuestra manera de relacionarnos." },
      { time: "17:30", title: "Pausa", description: "Merienda, naturaleza, descanso, conversaciones y tiempo libre." },
      { time: "18:30", title: "Neurodanza · Del yo al nosotros", description: "Música, cuerpo, juego y expresión para encontrarnos con nosotros, con el otro y con el grupo. No necesitás saber bailar." },
      { time: "20:00", title: "Cena incluida", description: "Compartimos la mesa antes de comenzar la experiencia de la noche." },
      { time: "21:30", title: "Alma Qhana · Concierto meditativo", description: "Marité y Carlos Sat Nam comparten voz, mantras, shabds y cantos medicina. Un encuentro musical de escucha, presencia y conexión." },
      { time: "22:30", title: "Fogata · Lo que dejo, lo que elijo", description: "Música, palabras, conversaciones y silencios alrededor del fuego. Una invitación a preguntarnos qué dejamos atrás y qué elegimos construir." },
      { time: "23:30", title: "Descanso en Kiryus", description: "Después del primer día, dejamos espacio para descansar e integrar lo vivido." },
    ],
  },
  {
    id: "domingo", day: "Domingo", number: 15, date: "15 de noviembre", isoDate: "2026-11-15",
    verb: "Integrar, crear y dejar huella",
    summary: "Recibir el amanecer, crear una obra común y elegir qué llevar a la vida.",
    items: [
      { time: "06:00", title: "Despertar", description: "Nos preparamos para recibir juntos un nuevo día." },
      { time: "06:30", title: "Ceremonia Kiryus · Salida del Sol", description: "Caminamos antes del amanecer, respiramos y esperamos en silencio la llegada del nuevo día." },
      { time: "07:30", title: "Yoga · Cuerpo, respiración y presencia", description: "Una práctica accesible de movimiento consciente, respiración y presencia para integrar lo vivido. No necesitás experiencia previa." },
      { time: "08:30", title: "Desayuno incluido", description: "Tiempo para recuperar energía, conversar y disfrutar de la mañana en Kiryus." },
      { time: "10:00", title: "Baño de Gong · Carlos Sat Nam", description: "Una inmersión sonora guiada por Carlos Sat Nam. Nos recostamos, escuchamos y compartimos un espacio de quietud antes de la etapa colectiva del día." },
      { time: "11:15", title: "El otro también soy yo", description: "Una experiencia colectiva de escucha, cooperación, diferencias y decisiones compartidas. Exploramos cómo construir juntos cuando no pensamos igual." },
      { time: "12:30", title: "Almuerzo comunitario incluido", description: "Compartimos la mesa, descansamos y nos preparamos para crear una huella de esta edición." },
      { time: "14:00", title: "Mural de la Nueva Humanidad", description: "Creamos una obra colectiva con la guía de un artista tucumano especializado en muralismo, cuyo nombre se anunciará próximamente. No necesitás saber pintar: el mural quedará en Kiryus como memoria del encuentro." },
      { time: "15:30", title: "Ceremonia de la Semilla", description: "Elegimos una intención, un valor, una conducta o una acción concreta para cultivar al volver a nuestra vida. Una semilla como símbolo de compromiso." },
      { time: "16:15", title: "Gran círculo de cierre", description: "Nos reunimos frente al mural para compartir una palabra por persona y una fotografía colectiva. ¿Con qué nos vamos de TuConexión?" },
      { time: "17:00", title: "Finalización de TuConexión 2026", description: "La experiencia termina y comienza el compromiso de llevar lo vivido a nuestra vida." },
    ],
  },
];

export const festivalWorkshops: FestivalWorkshop[] = [
  { id: "naturaleza", title: "Conexión con la naturaleza", subtitle: "Volver a sentir", time: "Sábado · 10:45", description: "Caminar, respirar, observar y hacer silencio para volver al presente en el entorno natural de Kiryus." },
  { id: "hielo", title: "Experiencia de hielo", subtitle: "Observar nuestra respuesta al desafío", time: "Sábado · 12:00", description: "Preparación y conexión corporal antes de una inmersión voluntaria y supervisada, sin competir ni demostrar resistencia.", note: "Respetá las indicaciones de seguridad. Si tenés una condición de salud relevante para una exposición intensa al frío, informala y consultá previamente con un profesional de salud." },
  { id: "neuroconstelaciones", title: "Neuroconstelaciones Holográficas", subtitle: "Lo que traigo a mis relaciones", time: "Sábado · 15:30", description: "Exploración grupal de representaciones, patrones y dinámicas en nuestra forma de relacionarnos, desde la observación y la integración." },
  { id: "neurodanza", title: "Neurodanza", subtitle: "Del yo al nosotros", time: "Sábado · 18:30", description: "Música, cuerpo, juego y expresión para pasar del encuentro personal al encuentro con otros. No necesitás saber bailar." },
  { id: "yoga", title: "Yoga", subtitle: "Cuerpo, respiración y presencia", time: "Domingo · 07:30", description: "Movimiento consciente y respiración en una práctica accesible, sin experiencia previa." },
  { id: "gong", title: "Baño de Gong", subtitle: "Del ruido al silencio", time: "Domingo · 10:00", description: "Carlos Sat Nam guía una experiencia de inmersión sonora, escucha y quietud." },
  { id: "mural", title: "Mural de la Nueva Humanidad", subtitle: "Muchas manos · Una sola obra", time: "Domingo · 14:00", description: "Creamos juntos una obra que permanecerá en Kiryus, con la guía de un artista tucumano especializado en muralismo. No necesitás saber pintar.", note: "El nombre del artista invitado se anunciará próximamente." },
];

export const festivalIncludes = [
  "Los dos días completos y una noche en Kiryus, según la modalidad elegida.",
  "Todas las experiencias del programa y las comidas previstas durante el encuentro.",
  "Conexión con la naturaleza, hielo, Neuroconstelaciones Holográficas, Neurodanza y yoga.",
  "Baño de Gong con Carlos Sat Nam y concierto meditativo de Alma Qhana.",
  "Fogata y Ceremonia Kiryus de Salida del Sol.",
  "Experiencia colectiva «El otro también soy yo».",
  "Creación del Mural de la Nueva Humanidad con un artista especializado.",
  "Ceremonia de la Semilla, apertura y gran círculo de cierre.",
  "Espacios de descanso, integración y encuentro.",
];

export const festivalTickets: FestivalTicket[] = [
  {
    id: "camping", name: "Camping", price: 135000,
    description: "Festival completo, comidas y espacio para instalar tu propia carpa.",
    includes: ["Festival completo del sábado y domingo.", "Todas las experiencias del programa.", "Todas las comidas previstas durante el encuentro.", "Espacio en Kiryus para instalar tu propia carpa y pasar una noche."],
    notIncluded: ["Carpa.", "Equipo de camping y ropa de cama.", "Transporte."],
    note: "Traé tu propia carpa y todo lo necesario para acampar.",
  },
  {
    id: "habitacion", name: "Habitación compartida", price: 180000,
    description: "El mismo festival y comidas, con una noche en habitación comunitaria compartida.",
    includes: ["Festival completo del sábado y domingo.", "Todas las experiencias del programa.", "Todas las comidas previstas durante el encuentro.", "Una noche de alojamiento en habitación comunitaria compartida."],
    notIncluded: ["Transporte."],
    note: "Las habitaciones no son privadas y están sujetas a disponibilidad.",
  },
];

export const festivalExtras: FestivalExtra[] = [
  {
    id: "traslado", title: "Transporte opcional · Ida y vuelta", priceLabel: "$25.000 ARS por persona",
    description: "San Miguel de Tucumán ↔ Aldea Kiryus. No está incluido en ninguna modalidad.",
    details: ["Servicio adicional con reserva previa directamente con la organización.", "El horario y punto exacto de salida y regreso se comunicarán a quienes contraten el servicio."],
  },
];

export const festivalPackingList = [
  "Tu propia carpa y equipo completo de camping.",
  "Bolsa de dormir o ropa de cama, almohada y colchón, aislante o colchoneta si lo necesitás.",
  "Toalla, ropa cómoda, abrigo para la noche y la mañana, y calzado adecuado.",
  "Elementos de higiene y aseo personal.",
  "Protector solar, repelente o protección para mosquitos y linterna.",
  "Botella reutilizable.",
  "Traje de baño, toalla y muda seca para después del hielo.",
  "Medicación personal habitual, si corresponde.",
];
export const festivalRoomPackingList = [
  "Ropa cómoda, abrigo, calzado cómodo y toalla.",
  "Elementos de higiene personal, protector solar y repelente.",
  "Botella reutilizable, traje de baño y muda seca.",
  "Medicación personal habitual, si corresponde.",
  "La organización te informará si necesitás algún elemento adicional de ropa de cama.",
];
export const festivalAlwaysOn = ["Naturaleza", "Movimiento", "Música", "Silencio", "Arte colectivo", "Fuego", "Comidas compartidas", "Comunidad"];

export const festivalPurchaseConditions = [
  { title: "La misma experiencia para todos", description: "Las dos modalidades incluyen el programa completo y las comidas previstas. Solo cambia dónde dormís: tu propia carpa o una habitación compartida." },
  { title: "Habitación compartida", description: "El alojamiento es comunitario, no privado, y está sujeto a disponibilidad. La organización informará si necesitás llevar algún elemento adicional de ropa de cama." },
  { title: "Comidas y necesidades alimentarias", description: "Las comidas previstas están incluidas. Informá previamente alergias, intolerancias o necesidades específicas para consultar qué alternativas pueden contemplarse." },
  { title: "Transporte adicional", description: "El traslado de ida y vuelta cuesta $25.000 ARS por persona y no está incluido en ninguna modalidad. Requiere reserva previa con la organización." },
  { title: "Experiencia de hielo", description: "La inmersión es voluntaria y supervisada, con preparación previa e indicaciones de seguridad. Si tenés una condición de salud relevante para una exposición intensa al frío, informala y consultá previamente con un profesional de salud." },
  { title: "Compra y consultas", description: "La adquisición se realiza en Fanz. Revisá las condiciones de compra y consultá con la organización cualquier necesidad particular antes de pagar." },
];

export const festivalFaqs: FestivalFaq[] = [
  { category: "viaje", question: "¿Cuándo y dónde es TuConexión 2026?", answer: "El sábado 14 y domingo 15 de noviembre de 2026, en Aldea Kiryus, Burruyacú, Tucumán. Comienza el sábado a las 09:00 y termina el domingo a las 17:00: dos días y una noche." },
  { category: "participar", question: "¿Hay actividades el viernes?", answer: "No. Esta edición comienza el sábado 14 de noviembre por la mañana." },
  { category: "compra", question: "¿Qué diferencia hay entre las entradas?", answer: "Las actividades y las comidas son las mismas. Camping cuesta $135.000 ARS por persona e incluye el espacio para tu propia carpa. Habitación compartida cuesta $180.000 ARS por persona e incluye una noche en alojamiento comunitario, sujeto a disponibilidad." },
  { category: "compra", question: "¿Tengo que pagar experiencias por separado?", answer: "No. Ambas modalidades incluyen todas las experiencias del programa: naturaleza, hielo, Neuroconstelaciones Holográficas, Neurodanza, yoga, gong, concierto de Alma Qhana, fogata, ceremonias, actividad colectiva y mural." },
  { category: "viaje", question: "¿Kiryus me da la carpa o el equipo de camping?", answer: "No. Si elegís Camping, tenés que llevar tu propia carpa, equipo y elementos para dormir. Kiryus pone el espacio para instalarte durante la noche del festival." },
  { category: "viaje", question: "¿Las habitaciones son privadas?", answer: "No, son comunitarias y compartidas, sujetas a disponibilidad. No necesitás carpa; la organización te informará si debés llevar algún elemento adicional de ropa de cama." },
  { category: "viaje", question: "¿Las comidas están incluidas?", answer: "Sí, las comidas previstas durante el encuentro están incluidas en ambas modalidades. Si tenés alergias, intolerancias o necesidades alimentarias específicas, informalas previamente para consultar las alternativas con la organización." },
  { category: "viaje", question: "¿El transporte está incluido?", answer: "No está incluido en ninguna modalidad. Podés contratar ida y vuelta entre San Miguel de Tucumán y Aldea Kiryus por $25.000 ARS adicionales por persona, con reserva previa. Horarios y punto exacto se comunicarán a quienes contraten el servicio." },
  { category: "participar", question: "¿Necesito experiencia previa o pertenecer a Kiryus?", answer: "No. El festival es abierto y no necesitás pertenecer a Kiryus, saber yoga, bailar o haber participado en otras ediciones. Tampoco necesitás saber pintar para el mural: el proceso estará acompañado por un artista especializado." },
  { category: "participar", question: "¿La inmersión en hielo es obligatoria?", answer: "No, es voluntaria y supervisada. Habrá preparación previa y deberán respetarse las indicaciones de seguridad. Si tenés una condición de salud relevante para la exposición al frío, informala y consultá previamente con un profesional de salud." },
  { category: "participar", question: "¿Quién guía el gong y cuándo es el concierto?", answer: "Carlos Sat Nam guía el Baño de Gong el domingo a las 10:00. Alma Qhana, el dúo de Marité y Carlos Sat Nam, ofrece su concierto meditativo el sábado a las 21:30." },
  { category: "participar", question: "¿Quién acompaña el mural?", answer: "Un artista tucumano especializado en muralismo acompañará el concepto y el proceso colectivo. Su nombre se anunciará próximamente y la obra permanecerá en Kiryus como legado del encuentro." },
  { category: "compra", question: "¿Cómo adquiero mi entrada?", answer: "Los botones de adquisición te llevan a Fanz. Elegí Camping o Habitación compartida, verificá los datos de tu pedido y las condiciones de compra antes de pagar. Para consultas particulares, escribí a la organización." },
];
