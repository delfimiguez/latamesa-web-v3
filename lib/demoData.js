// Contenido ficticio de demostración — se muestra solo cuando Sanity
// todavía no tiene un Issue publicado (o no tiene ese slug en particular).
// En cuanto publicás contenido real en /studio, estos datos dejan de usarse
// automáticamente: todas las páginas primero intentan traer datos de Sanity
// y solo si no encuentran nada, caen acá.
//
// Este mismo contenido es el que está transcripto en
// "LATAMesa_Guia_de_Contenido_Demo.docx" campo por campo, para que puedas
// copiarlo directo a /studio si querés reemplazar el fallback por contenido
// real idéntico al de la maqueta.

let _k = 0;
const bp = (text) => ({ _type: 'block', _key: `demo-${_k++}`, style: 'normal', children: [{ _type: 'span', _key: `demo-span-${_k++}`, text }] });

export const DEMO_PIECES = [
  {
    _id: 'demo-editorial',
    kind: 'editorial',
    number: '01',
    title: 'Cartas que llegan tarde',
    slug: 'cartas-que-llegan-tarde',
    author: 'Valentina Ríos',
    role: 'Directora editorial, LATAMesa',
    intro: 'La nota que abre el Issue 01: por qué este número nació de una caja de cartas sin abrir.',
    excerpt: 'Correspondencias reúne diez voces que piensan la distancia no como pérdida sino como forma de trabajo.',
    readTime: '4 min',
    pullQuote: '"Este issue nació de una caja de cartas sin abrir, encontrada en un archivo familiar en Streatham. Nunca supimos a quién iban dirigidas."',
    body: [
      bp('Correspondencias reúne diez voces que piensan la distancia no como pérdida sino como forma de trabajo. Cada pieza de este número —ensayo, entrevista, archivo visual— parte de un gesto epistolar: escribir hacia un lugar que ya no existe del todo.'),
      bp('No elegimos el tema por nostalgia. Lo elegimos porque casi todas las personas que hacen parte de esta redacción tienen, en algún cajón, una carta que nunca terminaron de escribir, o una que llegó demasiado tarde para importar. Quisimos preguntarnos qué hace ese objeto —la carta, el gesto de escribirla— cuando ya no cumple su función original.'),
      bp('Este número no ofrece respuestas cerradas. Ofrece cinco formas distintas de habitar esa demora: el bordado de Renata Ibarra, la cartografía curatorial de Mateo Solano, la conversación con Camila Duarte, la fotografía de estudio de Andrés Bello, y el registro de una apertura que, como toda apertura, también es una forma de correspondencia.')
    ],
    isLead: false
  },
  {
    _id: 'demo-essay',
    kind: 'essay',
    number: '02',
    title: 'Tejer la distancia',
    slug: 'tejer-la-distancia',
    author: 'Renata Ibarra',
    role: 'Artista visual, Bogotá / Londres',
    intro: 'Renata Ibarra escribe sobre el bordado como archivo: coser cartas que no llegaron, punto por punto, entre dos geografías.',
    excerpt: 'Cada punto es una palabra que no llegó a tiempo. Bordar es la forma más lenta que encontré de seguir escribiendo esa carta.',
    readTime: '9 min',
    pullQuote: 'Cada punto es una palabra que no llegó a tiempo. Bordar es la forma más lenta que encontré de seguir escribiendo esa carta.',
    imageCaption: 'Detalle de bordado sobre carta postal',
    imageCredit: 'R. Ibarra, 2026',
    body: [
      bp('Empecé a bordar cartas que nunca envié en 2019, en un taller compartido en Bogotá, sin saber todavía que me iba a mudar a Londres dos años después. Lo que empezó como un ejercicio de caligrafía terminó siendo un método de trabajo: cada carta que no llegó a su destinatario se convierte, en mis manos, en una superficie textil.'),
      bp('El bordado impone una velocidad. No se puede apurar un punto de cadeneta. Esa lentitud es, para mí, la forma más honesta de nombrar lo que le pasa a una carta quen viaja entre continentes: llega tarde, o no llega, o llega a alguien que ya cambió.'),
      bp('Esta serie —Correspondencia lenta— reúne catorce piezas bordadas sobre papel de carta encontrado en mercados de pulgas de Bogotá, Madrid y Londres. Ninguna carta es mía. Todas fueron escritas por otras personas, a destinatarios que nunca sabremos si las recibieron.')
    ],
    isLead: true
  },
  {
    _id: 'demo-curator-essay',
    kind: 'curator-essay',
    number: '03',
    title: 'Cartografías provisionales',
    slug: 'cartografias-provisionales',
    author: 'Mateo Solano',
    role: 'Curador independiente',
    intro: 'Mateo Solano propone leer la diáspora latinoamericana en Londres como un archivo en constante reordenamiento.',
    excerpt: 'Un mapa de la diáspora nunca está terminado. Se corrige cada vez que alguien más llega, o cada vez que alguien se va.',
    readTime: '7 min',
    pullQuote: 'Un mapa de la diáspora nunca está terminado. Se corrige cada vez que alguien más llega, o cada vez que alguien se va.',
    imageCaption: 'Vista de sala, montaje previo a la apertura',
    imageCredit: 'Cortesía Tributary Space',
    body: [
      bp('Curar una muestra sobre la diáspora latinoamericana en Londres implica aceptar, de entrada, que el objeto de estudio se mueve mientras uno lo describe. No hay un mapa fijo de "lo latinoamericano" en esta ciudad: hay superposiciones, barrios que cambiaron de nombre no oficial tres veces en una década, direcciones de talleres que ya no existen.'),
      bp('Correspondencias no intenta fijar ese mapa. Lo trata como lo que es: una cartografía provisional, hecha de direcciones postales que ya no corresponden a nadie, y de artistas que trabajan, precisamente, con esa provisionalidad.')
    ],
    isLead: false
  },
  {
    _id: 'demo-interview',
    kind: 'interview',
    number: '04',
    title: 'Habitar el archivo',
    slug: 'habitar-el-archivo',
    author: 'Camila Duarte',
    role: 'Entrevistada por Julia Restrepo',
    intro: 'Conversación con Camila Duarte sobre migración, memoria familiar y el archivo como material de trabajo.',
    excerpt: 'Mi archivo familiar tiene más agujeros que documentos. Trabajo con los agujeros.',
    readTime: '11 min',
    pullQuote: 'Mi archivo familiar tiene más agujeros que documentos. Trabajo con los agujeros.',
    imageCaption: 'Retrato de la artista en su estudio',
    imageCredit: 'Cortesía de la artista',
    interviewQA: [
      {
        question: 'Julia Restrepo: Tu instalación para esta muestra parte de una caja de documentos familiares. ¿Cómo llegaste a esa caja?',
        answer: [bp('Camila Duarte: La encontré cuando mi abuela se mudó de casa, en 2021. No era una caja ordenada — tenía recibos, una foto sin fecha, una carta a la mitad. Entendí que ese desorden era el material real, no algo que había que "limpiar" antes de exhibir.')]
      },
      {
        question: '¿Qué significa para vos trabajar con documentos que no cuentan una historia completa?',
        answer: [bp('Significa aceptar que el archivo miente tanto como cuenta. Mi familia migró en tres momentos distintos y cada uno dejó un registro parcial. La instalación no rellena esos vacíos: los deja visibles, como parte de la pieza.')]
      },
      {
        question: '¿Cómo se conecta esto con el resto del Issue 01?',
        answer: [bp('Creo que todas las piezas de este número comparten una sospecha: que la distancia no se resuelve, se documenta. Mi trabajo documenta lo que falta; el de Renata borda lo que no llegó. Son la misma pregunta desde ángulos distintos.')]
      },
      {
        question: '¿Qué esperás que la audiencia se lleve de esta pieza?',
        answer: [bp('No espero que resuelvan nada. Espero que reconozcan sus propios archivos incompletos — la mayoría de las familias migrantes tienen uno.')]
      }
    ],
    isLead: false
  },
  {
    _id: 'demo-visual',
    kind: 'visual',
    number: '05',
    title: 'Estudios de taller',
    slug: 'estudios-de-taller',
    author: 'Andrés Bello',
    role: 'Fotógrafo documental',
    intro: 'Una secuencia de Andrés Bello recorre ocho estudios de artistas latinoamericanos activos entre Londres y Sudamérica.',
    excerpt: 'Fotografié ocho estudios en cuatro ciudades. Todos, sin excepción, tenían una pared dedicada a trabajo sin terminar.',
    readTime: '4 min',
    pullQuote: 'Fotografié ocho estudios en cuatro ciudades. Todos, sin excepción, tenían una pared dedicada a trabajo sin terminar.',
    imageCaption: 'Estudio de artista, Bogotá',
    imageCredit: 'A. Bello, 2026',
    isLead: false
  },
  {
    _id: 'demo-event',
    kind: 'event',
    number: '06',
    title: 'Apertura: Correspondencias en Tributary Space',
    slug: 'apertura-tributary-space',
    author: 'LATAMesa + Tributary Space',
    intro: 'La exhibición que acompaña al Issue 01 abre sus puertas con una noche de inauguración abierta al público.',
    excerpt: 'Apertura abierta al público, con presencia de cuatro de los cinco artistas del número.',
    readTime: '2 min',
    eventDate: 'Sábado 14 de noviembre, 2026',
    eventTime: '18:00 — 21:00',
    eventLocation: 'Tributary Space, Unit 4, Bellenden Rd, Peckham, London',
    imageCaption: 'Fachada del espacio la noche de apertura',
    imageCredit: 'Cortesía Tributary Space',
    body: [
      bp('La exhibición Correspondencias: Nuevas Voces Latinoamericanas abre el sábado 14 de noviembre en Tributary Space, Peckham, con obra de Renata Ibarra, Camila Duarte, Andrés Bello, Sofía Nakashima e Iván Cortez, curada por Mateo Solano.'),
      bp('Entrada gratuita, sin reserva previa. Acceso sin escalones. La conversación de apertura será en español e inglés.')
    ],
    isLead: false
  }
];

export const DEMO_ISSUE = {
  _id: 'demo-issue-01',
  number: '01',
  theme: 'Correspondencias',
  slug: 'correspondencias',
  season: 'Otoño 2026',
  period: 'Septiembre – Noviembre 2026',
  description: 'Un número dedicado a la carta como forma: lo que se escribe para llegar tarde, lo que viaja entre Londres y Latinoamérica sin encontrar destinatario fijo. Ensayo, entrevista y archivo visual alrededor de la distancia, el cuidado y la memoria diaspórica.',
  editorialQuote: '"Este issue nació de una caja de cartas sin abrir, encontrada en un archivo familiar en Streatham. Nunca supimos a quién iban dirigidas."',
  editorialNote: 'Correspondencias reúne diez voces que piensan la distancia no como pérdida sino como forma de trabajo. Cada pieza de este número —ensayo, entrevista, archivo visual— parte de un gesto epistolar: escribir hacia un lugar que ya no existe del todo.',
  editorName: 'Valentina Ríos',
  editorRole: 'Directora editorial, LATAMesa',
  predominantColor: '#2647E8',
  accentColor: '#C9FF32',
  collaborators: ['Renata Ibarra', 'Mateo Solano', 'Camila Duarte', 'Andrés Bello', 'Julia Restrepo', 'Sofía Nakashima'],
  isCurrent: true,
  pieces: DEMO_PIECES
};

export const KIND_LABEL = {
  editorial: 'Editorial Note',
  essay: 'Artist Essay',
  'curator-essay': 'Curator Essay',
  interview: 'Interview',
  visual: 'Visual Feature',
  event: 'News / Event'
};

export function findDemoPieceBySlug(slug) {
  return DEMO_PIECES.find((p) => p.slug === slug) || null;
}
