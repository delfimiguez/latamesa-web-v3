import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // false a propósito: la CDN de Sanity puede tardar en reflejar una
  // publicación reciente, y combinada con el revalidate:60 de Next eso se
  // sentía como "el sitio sigue mostrando contenido viejo" después de
  // publicar. Al leer directo de la API (sin CDN), lo único que controla
  // cuán rápido se ve un cambio es el revalidate de cada página.
  useCdn: false
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
