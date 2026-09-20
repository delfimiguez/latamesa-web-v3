import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// Página simple reutilizable para las secciones que todavía no tienen su
// propio diseño editorial completo (Archivo, Exhibiciones, Eventos, Sobre,
// Contacto) — están acá para que el menú nunca lleve a un 404. Siguen el
// mismo sistema visual (tipografía, márgenes, contraste de header) que el
// resto del sitio, listas para ampliarse con el mismo patrón usado en
// Issue/Piece cuando haga falta.
export default function SimplePage({ active, eyebrow, title, intro, children }) {
  return (
    <div className="is-root">
      <Nav active={active} initialTheme="light" />
      <header className="is-head" data-header-theme="light">
        <div className="lt-wrap is-head-grid">
          <div className="meta"><p className="lt-eyebrow" style={{ color: 'var(--predominant)' }}>{eyebrow}</p></div>
          <div className="body">
            <h1 className="is-theme">{title}</h1>
            {intro && <p className="is-desc">{intro}</p>}
          </div>
        </div>
      </header>
      {children && (
        <section className="is-pieces" data-header-theme="light">
          <div className="lt-wrap">{children}</div>
        </section>
      )}
      <Footer />
    </div>
  );
}
