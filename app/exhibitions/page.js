import Link from 'next/link';
import SimplePage from '@/components/SimplePage';

export default function ExhibitionsPage() {
  return (
    <SimplePage active="exhibitions" eyebrow="Agenda" title="Exhibiciones" intro="Muestras y proyectos curatoriales de artistas latinoamericanos y su diáspora en Londres.">
      <div className="is-list">
        <Link className="is-piece lt-focus" href="/piece/estudios-de-taller" style={{ gridTemplateColumns: '1fr' }}>
          <div className="body" style={{ gridColumn: '1 / -1' }}>
            <h3>Correspondencias: Nuevas Voces Latinoamericanas</h3>
            <p className="intro">14 nov — 20 dic 2026 · Tributary Space, Peckham, London</p>
          </div>
        </Link>
      </div>
    </SimplePage>
  );
}
