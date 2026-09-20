// Una "pieza" es cada contenido del issue: nota editorial, ensayo, texto
// curatorial, entrevista, feature visual o noticia/evento. Es su propio
// documento (no vive adentro del Issue) para que cada una tenga su propia
// URL (/piece/tu-slug) y se pueda enlazar desde el índice del issue.
const KIND_OPTIONS = [
  { title: 'Nota editorial', value: 'editorial' },
  { title: 'Ensayo de artista', value: 'essay' },
  { title: 'Texto curatorial', value: 'curator-essay' },
  { title: 'Entrevista', value: 'interview' },
  { title: 'Feature visual', value: 'visual' },
  { title: 'Noticia / Evento', value: 'event' }
];

export default {
  name: 'piece',
  title: 'Pieza',
  type: 'document',
  fields: [
    {
      name: 'kind',
      title: 'Tipo de contenido',
      type: 'string',
      options: { list: KIND_OPTIONS, layout: 'radio' },
      validation: (Rule) => Rule.required()
    },
    { name: 'number', title: 'Número / orden (ej: "02")', type: 'string' },
    { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug (para la URL, ej: "tejer-la-distancia")',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required()
    },
    { name: 'author', title: 'Autor / artista / entrevistado', type: 'string' },
    { name: 'role', title: 'Rol o cargo del autor', type: 'string' },
    { name: 'intro', title: 'Bajada (resumen corto, 1-2 líneas)', type: 'text', rows: 2 },
    { name: 'excerpt', title: 'Extracto destacado', type: 'text', rows: 3 },
    { name: 'readTime', title: 'Tiempo de lectura (ej: "9 min")', type: 'string' },
    { name: 'pullQuote', title: 'Cita destacada', type: 'text', rows: 2 },

    {
      name: 'body',
      title: 'Cuerpo del texto',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'El texto completo del ensayo, nota editorial o texto curatorial.',
      hidden: ({ document }) => document?.kind === 'interview'
    },

    {
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Texto alternativo', type: 'string' }
      ]
    },
    { name: 'imageCaption', title: 'Pie de foto', type: 'string' },
    { name: 'imageCredit', title: 'Crédito de la imagen', type: 'string' },

    {
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Texto alternativo', type: 'string' },
            { name: 'caption', title: 'Pie de foto', type: 'string' },
            { name: 'credit', title: 'Crédito', type: 'string' }
          ]
        }
      ],
      description: 'Se usa en piezas de tipo "Feature visual".',
      hidden: ({ document }) => document?.kind !== 'visual'
    },

    {
      name: 'interviewQA',
      title: 'Preguntas y respuestas',
      type: 'array',
      description: 'Solo para piezas de tipo "Entrevista".',
      hidden: ({ document }) => document?.kind !== 'interview',
      of: [
        {
          type: 'object',
          name: 'qa',
          title: 'Pregunta / respuesta',
          fields: [
            { name: 'question', title: 'Pregunta', type: 'string' },
            { name: 'answer', title: 'Respuesta', type: 'array', of: [{ type: 'block' }] }
          ],
          preview: { select: { title: 'question' } }
        }
      ]
    },

    {
      name: 'eventDate',
      title: 'Fecha del evento',
      type: 'string',
      description: 'Solo para piezas de tipo "Noticia / Evento". Texto libre, ej: "Sábado 14 de noviembre, 2026".',
      hidden: ({ document }) => document?.kind !== 'event'
    },
    {
      name: 'eventTime',
      title: 'Horario',
      type: 'string',
      hidden: ({ document }) => document?.kind !== 'event'
    },
    {
      name: 'eventLocation',
      title: 'Ubicación',
      type: 'text',
      rows: 2,
      hidden: ({ document }) => document?.kind !== 'event'
    },

    {
      name: 'isLead',
      title: '¿Es la pieza destacada del issue? (la más grande en el índice)',
      type: 'boolean',
      initialValue: false
    },

    {
      name: 'relatedIssue',
      title: 'Issue al que pertenece',
      type: 'reference',
      to: [{ type: 'issue' }]
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind', media: 'mainImage' }
  }
};
