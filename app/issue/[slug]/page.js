import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Frame from '@/components/Frame';
import { client } from '@/lib/sanity';
import { ISSUE_BY_SLUG_QUERY } from '@/lib/queries';
import { DEMO_ISSUE, KIND_LABEL } from '@/lib/demoData';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function IssuePage({ params }) {
  // Mismo principio que en app/page.js (ver lib/resolveIssue.js): el Issue
  // que se muestra es SIEMPRE un único objeto completo — el de Sanity, o el
  // demo — nunca una mezcla campo por campo de los dos.
  let sanityIssue = null;
  try {
    sanityIssue = await client.fetch(ISSUE_BY_SLUG_QUERY, { slug: params.slug });
  } catch (e) {
    // sin conexión a Sanity todavía
  }
  let issue = sanityIssue;
  let usingFallback = false;
  if (!issue) {
    if (params.slug === DEMO_ISSUE.slug) {
      issue = DEMO_ISSUE;
      usingFallback = true;
    } else {
      return notFound();
    }
  }

  const pieces = issue.pieces || [];
  const lead = pieces.find((p) => p.isLead) || pieces[0];
  const rest = pieces.filter((p) => p !== lead);

  return (
    <div className="is-root" style={{ '--predominant': issue.predominantColor || '#2647E8', '--accent': issue.accentColor || '#C9FF32' }}>
      <Nav active="issue" issueLabel={`Issue ${issue.number} — ${issue.theme}`} initialTheme="light" />

      {usingFallback && (
        <div style={{ background: '#151515', color: '#fff', fontSize: 12, padding: '8px 16px', textAlign: 'center' }}>
          Mostrando contenido de ejemplo para el slug &quot;{params.slug}&quot; — cargá un issue en Sanity con ese mismo slug para reemplazarlo.
        </div>
      )}

      <header className="is-head" data-header-theme="light">
        <div className="lt-wrap">
          <div className="is-head-grid">
            <div className="meta">
              <p className="is-num">Issue<b>{issue.number}</b></p>
              <p className="is-season">{issue.season}{issue.period ? ` · ${issue.period}` : ''}</p>
            </div>
            <div className="body">
              <h1 className="is-theme">{issue.theme}</h1>
              <p className="is-desc">{issue.description}</p>
              <div className="is-actions">
                <Link className="lt-link-arrow lt-focus" href="/archive">Ver todos los issues
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
                </Link>
              </div>
            </div>
            <div className="aside">
              <div className="is-swatches" aria-hidden="true">
                <span style={{ background: issue.predominantColor }}></span>
                <span style={{ background: issue.accentColor }}></span>
                <span style={{ background: '#151515' }}></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {issue.editorialQuote && (
        <section className="is-editorial" data-header-theme="light">
          <div className="lt-wrap is-editorial-grid">
            <div className="label"><p className="lt-folio">Editorial note</p></div>
            <div className="text">
              <p className="lt-quote" style={{ fontSize: 26, color: 'var(--predominant)' }}>{issue.editorialQuote}</p>
              <p>{issue.editorialNote}</p>
              {issue.editorName && (
                <p className="by">{issue.editorName}<span>{issue.editorRole}</span></p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="is-pieces" data-header-theme="light">
        <div className="lt-wrap">
          <div className="is-pieces-head"><h2>Contenido del issue</h2></div>

          {lead && (
            <Link className="is-lead lt-focus" href={`/piece/${lead.slug}`}>
              <div className="media">
                <div className="frame-wrap">
                  <Frame
                    image={lead.mainImage}
                    tone="predominant"
                    label={lead.author || ''}
                    index="Fig. 01"
                    caption={lead.imageCaption}
                    credit={lead.imageCredit}
                    aspectRatio="16/10"
                  />
                </div>
              </div>
              <div className="copy">
                <p className="lt-eyebrow cat">{KIND_LABEL[lead.kind] || lead.kind}{lead.readTime ? ` · ${lead.readTime} de lectura` : ''}</p>
                <h3>{lead.title}</h3>
                <p className="intro">{lead.intro}</p>
              </div>
            </Link>
          )}

          <div className="is-list">
            {rest.map((p, i) => (
              <Link className="is-piece lt-focus" href={`/piece/${p.slug}`} key={p._id || i}>
                <div className="thumb frame-wrap">
                  <Frame image={p.mainImage} tone="ink" label={p.author || ''} index={String(i + 2).padStart(2, '0')} showCredit={false} />
                </div>
                <div className="body">
                  <p className="lt-eyebrow cat">{KIND_LABEL[p.kind] || p.kind}</p>
                  <h3>{p.title}</h3>
                  <p className="intro">{p.intro}</p>
                </div>
                <span className="rt">{p.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
