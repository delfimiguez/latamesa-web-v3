import Link from 'next/link';
import SimplePage from '@/components/SimplePage';

export default function EventsPage() {
  return (
    <SimplePage active="events" eyebrow="Agenda" title="Eventos" intro="Conversatorios, proyecciones y encuentros abiertos alrededor de cada issue.">
      <div className="is-list">
        <Link className="is-piece lt-focus" href="/piece/apertura-tributary-space" style={{ gridTemplateColumns: '1fr' }}>
          <div className="body" style={{ gridColumn: '1 / -1' }}>
            <h3>Apertura: Correspondencias en Tributary Space</h3>
            <p className="intro">Sábado 14 de noviembre, 2026 · 18:00 — 21:00 · Peckham, London</p>
          </div>
        </Link>
      </div>
    </SimplePage>
  );
}
