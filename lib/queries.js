// Queries en GROQ (el lenguaje de consultas de Sanity).
// "pieces[]->" quiere decir: traeme el contenido completo de cada pieza
// referenciada, no solo su ID.

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

export const CURRENT_ISSUE_QUERY = `*[_type == "issue" && isCurrent == true] | order(publishedAt desc)[0]{
  ...,
  "slug": slug.current,
  pieces[]->${PIECE_FIELDS}
}`;

export const ISSUE_BY_SLUG_QUERY = `*[_type == "issue" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  pieces[]->${PIECE_FIELDS}
}`;

export const ALL_ISSUES_QUERY = `*[_type == "issue"] | order(publishedAt desc){
  number,
  theme,
  season,
  predominantColor,
  "slug": slug.current,
  heroImage
}`;

export const PIECE_BY_SLUG_QUERY = `*[_type == "piece" && slug.current == $slug][0]${PIECE_FIELDS.replace('}', ',\n  "relatedIssue": relatedIssue->{ "slug": slug.current, number, theme, predominantColor, accentColor }\n}')}`;
