// Lógica de resolución del Issue a mostrar — separada en su propia función
// para que sea trivial de auditar y de testear (ver scripts/test-resolve-issue.js).
//
// Regla única, sin excepciones:
//   - Si Sanity devolvió un Issue (sanityIssue no es null/undefined), se usa
//     ESE objeto completo, tal cual vino de la query. Ningún campo se
//     reemplaza individualmente por su versión demo.
//   - Si Sanity no devolvió nada (dataset vacío, sin Issue con
//     isCurrent==true, o falló la conexión), se usa el Issue demo completo.
//
// Deliberadamente NO se hace esto (mezcla campo por campo):
//   const issue = { ...sanityIssue, ...demoIssue }
//   const title = sanityIssue.title || demoIssue.title
//
// Sino esto (todo-o-nada):
//   const issue = sanityIssue ?? demoIssue
export function resolveIssue(sanityIssue, demoIssue) {
  return {
    issue: sanityIssue ?? demoIssue,
    usingFallback: sanityIssue == null
  };
}
