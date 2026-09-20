import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { client, urlFor } from '@/lib/sanity';
import { CURRENT_ISSUE_QUERY } from '@/lib/queries';
import { DEMO_ISSUE, KIND_LABEL } from '@/lib/demoData';
import { resolveIssue } from '@/lib/resolveIssue';

export const revalidate = 60; // vuelve a pedir datos a Sanity cada 60s como máximo

export default async function HomePage() {
  // sanityIssue es null si Sanity no tiene ningún Issue con isCurrent==true
  // publicado (o si la consulta falla). resolveIssue() NO mezcla campo por
  // campo: es el Issue de Sanity completo, o el Issue demo completo — nunca
  // los dos combinados. Ver lib/resolveIssue.js.
  let sanityIssue = null;
  try {
    sanityIssue = await client.fetch(CURRENT_ISSUE_QUERY);
  } catch (e) {
    // Sin Sanity conectado todavía (o la consulta falló) -> sanityIssue queda en null.
  }
  const { issue, usingFallback } = resolveIssue(sanityIssue, DEMO_ISSUE);

  const heroUrl = issue.heroImage ? urlFor(issue.heroImage).width(2400).height(1600).url() : null;
  const pieces = issue.pieces || [];
  const bandPiece = pieces.find((p) => p.kind === 'visual') || pieces[pieces.length - 1];

  return (
    <div className="hm-root" style={{ '--predominant': issue.predominantColor || '#2647E8', '--accent': issue.accentColor || '#C9FF32' }}>
      {usingFallback && (
        <div style={{ background: '#151515', color: '#fff', fontSize: 12, padding: '8px 16px', textAlign: 'center', position: 'relative', zIndex: 5 }}>
          Mostrando contenido de ejemplo — publicá un Issue en /studio con &quot;¿Es el issue actual?&quot; activado para reemplazarlo.
        </div>
      )}

      <Nav active="home" issueLabel={`Issue ${issue.number} — ${issue.theme}`} initialTheme="dark" />

      {/* ---- A: hero a pantalla completa, tipografía superpuesta ---- */}
      <section className="hm-hero" id="hm-main" data-header-theme="dark">
        {heroUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroUrl} alt={issue.heroImage?.alt || ''} loading="eager" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, #0c1220, ${issue.predominantColor || '#2647E8'} 140%)` }} />
        )}
        <div className="tint" aria-hidden="true"></div>
        <div className="scrim" aria-hidden="true"></div>
        <div className="hm-hero-copy lt-reveal">
          <span className="brand">LATAMesa — Revista editorial</span>
          <span className="theme">Issue {issue.number}</span>
          <span className="theme serif-ish">{issue.theme}</span>
          <div className="names">
            {(issue.collaborators || []).map((name) => <div key={name}>{name}</div>)}
          </div>
          <Link className="more lt-focus" href={`/issue/${issue.slug}`}>Ver issue completo →</Link>
        </div>
      </section>

      {/* ---- B: panel de índice, poster editorial sobre fondo de color ---- */}
      <section className="hm-panel" data-header-theme="dark">
        <div className="lt-wrap strip">
          <div className="lt-tiny-strip on-dark">
            <span>Contenido — Issue {issue.number}</span>
            <span>{issue.theme}</span>
            <span>{issue.season}</span>
            <span>I–{toRoman(pieces.length)}</span>
          </div>
        </div>

        <div className="lt-wrap hm-panel-grid">
          <div className="hm-panel-meta">
            <p>Issue<b>{issue.number}</b></p>
            <p style={{ marginTop: 22 }}>{(issue.season || '').split(' ')[0]}<b style={{ fontSize: 20 }}>{(issue.season || '').split(' ')[1]}</b></p>
          </div>
          <div className="hm-panel-list">
            <div className="lt-index-list">
              {pieces.map((p, i) => (
                <Link key={p._id || i} className="lt-focus lt-index-item" href={`/piece/${p.slug}`}>
                  <span className="num">{toRoman(i + 1)}.</span>
                  <span className="lbl">{KIND_LABEL[p.kind] || p.kind}<br />{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lt-wrap">
          <div className="info">
            <span>Colaboradores:</span>
            {(issue.collaborators || []).map((name) => <span key={name}>{name}</span>)}
          </div>
        </div>
      </section>

      {/* ---- C: banda fotográfica a sangre, entrada al issue completo ---- */}
      {bandPiece && (
        <Link className="lt-bleed hm-band lt-focus" href={`/issue/${issue.slug}`} aria-label="Entrar al issue completo" data-header-theme="dark">
          {bandPiece.mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={urlFor(bandPiece.mainImage).width(2000).height(1400).url()} alt="" loading="lazy" />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: '#151515' }} />
          )}
          <div className="tint" style={{ background: 'var(--predominant)' }} aria-hidden="true"></div>
          <div className="scrim-t" aria-hidden="true"></div>
          <div className="scrim-b" aria-hidden="true"></div>
          <span className="corner">Fig. 07 — {bandPiece.imageCredit || 'Cortesía del artista'}</span>
          <div className="content">
            <h2>El archivo como forma de estar en dos lugares</h2>
            <span className="go">Leer el issue completo
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M1 5h15.5M12 1l4.5 4L12 9" stroke="#fff" strokeWidth="1.4" /></svg>
            </span>
          </div>
        </Link>
      )}

      {/* ---- D: bloque de papel con la cita editorial ---- */}
      <section className="hm-note" data-header-theme="light">
        <div className="lt-wrap">
          <div className="hm-note-inner">
            <span className="lt-eyebrow">Nota editorial</span>
            <p className="lt-quote">{issue.editorialQuote}</p>
          </div>
        </div>
      </section>

      {/* ---- E: tarjetas de acceso a otras secciones ---- */}
      <section className="hm-access" data-header-theme="light">
        <div className="lt-wrap">
          <div className="hm-access-head">
            <h2>Otras entradas a LATAMesa</h2>
            <Link className="lt-link-arrow lt-focus" href="/archive">Ver todo el archivo
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
            </Link>
          </div>
          <div className="hm-access-list">
            <div className="hm-access-card">
              <p className="lt-folio">01 — Archivo</p>
              <h3>Issues anteriores</h3>
              <p>Cuatro ediciones publicadas desde 2025, cada una con su propia paleta y temática curatorial.</p>
              <Link className="lt-link-arrow lt-focus" href="/archive">Ir al archivo
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
              </Link>
            </div>
            <div className="hm-access-card">
              <p className="lt-folio">02 — Agenda</p>
              <h3>Exhibiciones</h3>
              <p>Muestras y proyectos curatoriales de artistas latinoamericanos y su diáspora en Londres.</p>
              <Link className="lt-link-arrow lt-focus" href="/exhibitions">Ver exhibiciones
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
              </Link>
            </div>
            <div className="hm-access-card">
              <p className="lt-folio">03 — Agenda</p>
              <h3>Eventos</h3>
              <p>Conversatorios, proyecciones y encuentros abiertos alrededor del Issue {issue.number}.</p>
              <Link className="lt-link-arrow lt-focus" href="/events">Ver eventos
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function toRoman(num) {
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let n = num, out = '';
  for (const [v, s] of map) { while (n >= v) { out += s; n -= v; } }
  return out || String(num);
}
