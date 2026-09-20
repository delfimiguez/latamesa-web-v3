// Queries en GROQ (el lenguaje de consultas de Sanity).
//
// A propósito NO usamos "..." (spread) para traer los campos del Issue:
// listamos cada campo explícitamente, uno por uno, con el MISMO nombre
// que usa sanity/schemaTypes/issue.js. Así, si un campo no aparece acá,
// se nota de inmediato (viene undefined) en vez de quedar escondido
// dentro de un "..." que trae todo sin que se pueda auditar a simple vista.
//
// "pieces[]->{...}" quiere decir: traeme el contenido completo de cada
// pieza referenciada, no solo su ID.

const PIECE_FIELDS = `{
  _id,
  kind,
  number,
  title,
  "slug": slug.current,
  author,
  role,
  intro,
  excerpt,
  readTime,
  pullQuote,
  body,
  mainImage,
  imageCaption,
  imageCredit,
  gallery,
  interviewQA,
  eventDate,
  eventTime,
  eventLocation,
  isLead
}`;

// Estos campos son exactamente los de sanity/schemaTypes/issue.js.
// Si agregás un campo nuevo al schema, agregalo también acá (y en
// lib/demoData.js y en el componente que lo use) o no va a llegar a la home.
const ISSUE_FIELDS = `{
  _id,
  number,
  theme,
  "slug": slug.current,
  season,
  period,
  description,
  editorialQuote,
  editorialNote,
  editorName,
  editorRole,
  heroImage,
  predominantColor,
  accentColor,
  collaborators,
  isCurrent,
  publishedAt,
  pieces[]->${PIECE_FIELDS}
}`;

export const CURRENT_ISSUE_QUERY = `*[_type == "issue" && isCurrent == true] | order(publishedAt desc)[0]${ISSUE_FIELDS}`;

export const ISSUE_BY_SLUG_QUERY = `*[_type == "issue" && slug.current == $slug][0]${ISSUE_FIELDS}`;

export const ALL_ISSUES_QUERY = `*[_type == "issue"] | order(publishedAt desc){
  number,
  theme,
  season,
  predominantColor,
  "slug": slug.current,
  heroImage
}`;

export const PIECE_BY_SLUG_QUERY = `*[_type == "piece" && slug.current == $slug][0]${PIECE_FIELDS.replace('}', ',\n  "relatedIssue": relatedIssue->{ "slug": slug.current, number, theme, predominantColor, accentColor }\n}')}`;
