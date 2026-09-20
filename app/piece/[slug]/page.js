import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Frame from '@/components/Frame';
import { client, urlFor } from '@/lib/sanity';
import { PIECE_BY_SLUG_QUERY } from '@/lib/queries';
import { DEMO_ISSUE, KIND_LABEL, findDemoPieceBySlug } from '@/lib/demoData';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function PiecePage({ params }) {
  let piece = null;
  let usingFallback = false;
  try {
    piece = await client.fetch(PIECE_BY_SLUG_QUERY, { slug: params.slug });
  } catch (e) {
    // sin conexión a Sanity todavía
  }
  if (!piece) {
    const demo = findDemoPieceBySlug(params.slug);
    if (demo) {
      piece = { ...demo, relatedIssue: DEMO_ISSUE };
      usingFallback = true;
    } else {
      return notFound();
    }
  }

  const issueRef = piece.relatedIssue || DEMO_ISSUE;
  const heroUrl = piece.mainImage ? urlFor(piece.mainImage).width(2000).height(1300).url() : null;

  return (
    <div className="pc-root" style={{ '--predominant': issueRef.predominantColor || '#2647E8', '--accent': issueRef.accentColor || '#C9FF32' }}>
      <Nav active="issue" issueLabel={`Issue ${issueRef.number} — ${issueRef.theme}`} initialTheme="light" />

      {usingFallback && (
        <div style={{ background: '#151515', color: '#fff', fontSize: 12, padding: '8px 16px', textAlign: 'center' }}>
          Mostrando contenido de ejemplo para &quot;{params.slug}&quot; — cargá una Pieza en Sanity con este slug para reemplazarlo.
        </div>
      )}

      <div className="pc-top" data-header-theme="light">
        <Link className="pc-back lt-focus" href={`/issue/${issueRef.slug}`}>← Volver al issue</Link>
      </div>

      <header className="pc-head" data-header-theme="light">
        <div className="lt-wrap pc-head-grid">
          <div className="meta">
            <p className="lt-eyebrow" style={{ color: 'var(--predominant)' }}>{KIND_LABEL[piece.kind] || piece.kind}</p>
            {piece.readTime && <p style={{ fontSize: 13, color: 'rgba(21,21,21,.55)', marginTop: 8 }}>{piece.readTime} de lectura</p>}
          </div>
          <div className="body">
            <h1 className="pc-title">{piece.title}</h1>
            {piece.author && (
              <p className="pc-byline">{piece.author}{piece.role ? ` — ${piece.role}` : ''}</p>
            )}
            {piece.intro && <p className="pc-intro">{piece.intro}</p>}
          </div>
        </div>
      </header>

      {heroUrl && (
        <div className="lt-bleed pc-hero" data-header-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroUrl} alt={piece.mainImage?.alt || ''} loading="lazy" />
          <div className="tint" style={{ background: 'var(--predominant)' }} aria-hidden="true"></div>
          <div className="scrim-b" aria-hidden="true"></div>
          {piece.imageCredit && <span className="corner">Fig. 01 — {piece.imageCredit}</span>}
          {piece.imageCaption && (
            <div className="content"><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{piece.imageCaption}</span></div>
          )}
        </div>
      )}

      {/* --- cuerpo del texto (ensayo / editorial / curatorial) --- */}
      {piece.body && piece.body.length > 0 && (
        <section className="pc-body" data-header-theme="light">
          <div className="lt-wrap pc-body-grid">
            <div className="label"><p className="lt-folio">Texto</p></div>
            <div className="text">
              {piece.pullQuote && <p className="pc-pullquote">{piece.pullQuote}</p>}
              <PortableText value={piece.body} />
            </div>
          </div>
        </section>
      )}

      {/* --- entrevista: preguntas y respuestas --- */}
      {piece.kind === 'interview' && piece.interviewQA && piece.interviewQA.length > 0 && (
        <section className="pc-body" data-header-theme="light" style={{ paddingTop: piece.body?.length ? 0 : undefined }}>
          <div className="lt-wrap">
            {piece.pullQuote && (
              <p className="pc-pullquote" style={{ maxWidth: 900, margin: '0 auto 56px' }}>{piece.pullQuote}</p>
            )}
          </div>
          <div className="pc-qa">
            {piece.interviewQA.map((qa, i) => (
              <div className="pc-qa-item" key={i}>
                <p className="q">{qa.question}</p>
                <div className="a"><PortableText value={qa.answer} /></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- feature visual: galería --- */}
      {piece.kind === 'visual' && (
        <section className="pc-gallery" data-header-theme="light">
          <div className="lt-wrap">
            {piece.pullQuote && <p className="pc-pullquote" style={{ maxWidth: 900 }}>{piece.pullQuote}</p>}
            <div className="pc-gallery-grid">
              {(piece.gallery && piece.gallery.length > 0
                ? piece.gallery
                : [{ image: piece.mainImage, caption: piece.imageCaption, credit: piece.imageCredit }, { caption: 'Estudio, vista general' }, { caption: 'Detalle de proceso' }]
              ).map((g, i) => (
                <div key={i} style={{ width: '100%', aspectRatio: '4/5' }}>
                  <Frame image={g.image} tone={i % 2 === 0 ? 'predominant' : 'accent'} label={g.caption || piece.title} index={`Fig. ${String(i + 1).padStart(2, '0')}`} caption={g.caption} credit={g.credit || piece.imageCredit} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- evento / noticia: información práctica --- */}
      {piece.kind === 'event' && (
        <section className="pc-event-info" data-header-theme="light">
          <div className="lt-wrap pc-event-grid">
            <div className="label"><p className="lt-folio">Información práctica</p></div>
            <div className="items">
              {piece.eventDate && <div><p>Fecha</p><p>{piece.eventDate}</p></div>}
              {piece.eventTime && <div><p>Hora</p><p>{piece.eventTime}</p></div>}
              {piece.eventLocation && <div><p>Ubicación</p><p>{piece.eventLocation}</p></div>}
            </div>
          </div>
        </section>
      )}

      <section className="pc-related" data-header-theme="light">
        <div className="lt-wrap">
          <h2>Relacionado</h2>
          <Link className="pc-related-item lt-focus" href={`/issue/${issueRef.slug}`}>
            <div><h3>Issue {issueRef.number} — {issueRef.theme}</h3><p>Volver al índice completo del issue</p></div>
            <span className="lt-link-arrow">Ver issue
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M0 4.5h12M8.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" /></svg>
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
