import Link from 'next/link';
import SimplePage from '@/components/SimplePage';
import { client } from '@/lib/sanity';
import { ALL_ISSUES_QUERY } from '@/lib/queries';
import { DEMO_ISSUE } from '@/lib/demoData';

export const revalidate = 60;

export default async function ArchivePage() {
  let issues = [];
  try {
    issues = await client.fetch(ALL_ISSUES_QUERY);
  } catch (e) {
    // sin Sanity todavía
  }
  if (!issues || issues.length === 0) {
    issues = [{ number: DEMO_ISSUE.number, theme: DEMO_ISSUE.theme, season: DEMO_ISSUE.season, slug: DEMO_ISSUE.slug }];
  }

  return (
    <SimplePage active="archive" eyebrow="Archivo" title="Issues anteriores" intro="Cada edición de LATAMesa con su propia paleta y temática curatorial.">
      <div className="is-list">
        {issues.map((iss) => (
          <Link className="is-piece lt-focus" href={`/issue/${iss.slug}`} key={iss.slug} style={{ gridTemplateColumns: '1fr' }}>
            <div className="body" style={{ gridColumn: '1 / -1' }}>
              <h3>Issue {iss.number} — {iss.theme}</h3>
              <p className="intro">{iss.season}</p>
            </div>
          </Link>
        ))}
      </div>
    </SimplePage>
  );
}
