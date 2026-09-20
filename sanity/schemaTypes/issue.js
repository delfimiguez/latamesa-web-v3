// Este es el documento que tu cliente completa una vez al mes.
// Cada campo de acá corresponde directamente a algo visible en el sitio.
export default {
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    { name: 'number', title: 'Número (ej: "01")', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'theme', title: 'Título / tema del issue (ej: "Correspondencias")', type: 'string', validation: (Rule) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug (para la URL, ej: "correspondencias")',
      type: 'slug',
      options: { source: 'theme', maxLength: 60 },
      validation: (Rule) => Rule.required()
    },
    { name: 'season', title: 'Temporada (ej: "Otoño 2026")', type: 'string' },
    { name: 'period', title: 'Periodo (ej: "Septiembre – Noviembre 2026")', type: 'string' },
    { name: 'description', title: 'Descripción / bajada editorial', type: 'text', rows: 4 },
    { name: 'editorialQuote', title: 'Cita destacada de portada', type: 'text', rows: 2 },
    { name: 'editorialNote', title: 'Texto editorial completo', type: 'text', rows: 6 },
    { name: 'editorName', title: 'Nombre de la editora / autora de la nota', type: 'string' },
    { name: 'editorRole', title: 'Cargo', type: 'string' },

    {
      name: 'heroImage',
      title: 'Imagen de portada (hero)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }]
    },

    { name: 'predominantColor', title: 'Color predominante del issue', type: 'string', description: 'Código hex, ej: #2647E8', initialValue: '#2647E8' },
    { name: 'accentColor', title: 'Color de acento', type: 'string', description: 'Código hex, ej: #C9FF32', initialValue: '#C9FF32' },

    { name: 'collaborators', title: 'Colaboradores (nombres)', type: 'array', of: [{ type: 'string' }] },

    {
      name: 'pieces',
      title: 'Piezas del issue (orden = orden de aparición)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'piece' }] }],
      description: 'Arrastrá para reordenar — el orden acá define el orden en el índice del issue.'
    },

    { name: 'isCurrent', title: '¿Es el issue actual? (se muestra en la home)', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' }
  ],
  preview: {
    select: { title: 'theme', subtitle: 'number' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Issue ${subtitle}` };
    }
  }
};
