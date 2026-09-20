# LATAMesa — sitio + panel de administración + diseño completo

Este ZIP reemplaza **todo** el contenido de tu repositorio actual
(`latamesa-web-3f9j`). Trae de vuelta el diseño editorial completo (hero con
tipografía superpuesta, menú con contraste automático, composición
asimétrica, alternancia de fondos claros/oscuros) conectado a Sanity, más
seis piezas de contenido ficticio listas para usar como demo.

Todo se hace desde el navegador: **github.com**, **sanity.io** y **vercel.com**.
No hace falta terminal en ningún paso.

---

## Qué cambió respecto a tu versión publicada

- **Home, Issue y ahora también Piece** (`/piece/[slug]`) reconstruidos con
  la composición editorial completa: hero a pantalla completa con
  tipografía superpuesta, panel de índice sobre fondo de color, banda
  fotográfica a sangre, bloque de cita editorial, tarjetas de acceso.
- **Menú con contraste automático**: cada sección de cada página lleva
  `data-header-theme="dark"` o `"light"`; el menú detecta cuál está detrás
  en cada momento del scroll y cambia de blanco a negro con una transición
  suave — funciona igual en desktop y mobile.
- **Piece es ahora su propio tipo de documento en Sanity**, no un objeto
  suelto: cada ensayo, entrevista, feature visual o evento tiene su propia
  URL, y el Issue solo referencia el orden en que aparecen.
- **Entrevistas con preguntas y respuestas**, **cuerpo de texto con Portable
  Text** (el editor de texto enriquecido de Sanity), y **galería** para
  features visuales — todo con campos que se muestran u ocultan en
  `/studio` según el tipo de pieza que elijas.
- **Contenido ficticio completo** (`lib/demoData.js`): un issue con nota
  editorial, ensayo, texto curatorial, entrevista, feature visual y
  evento — todo con nombres, citas, fechas y créditos ficticios. Se
  muestra solo mientras Sanity no tenga contenido real publicado con ese
  mismo slug; en cuanto publicás, el contenido real lo reemplaza
  automáticamente, usando exactamente los mismos componentes (no hay un
  "diseño de mentira" separado del real).
- **Páginas de Archivo, Exhibiciones, Eventos, Sobre y Contacto** agregadas
  como páginas simples (para que el menú nunca lleve a un error 404),
  listas para ampliarse con el mismo patrón que Issue/Piece más adelante.

Junto con este ZIP recibís también:

- `LATAMesa_Guia_de_Contenido_Demo.docx` — todo el contenido ficticio,
  campo por campo, organizado igual que el formulario de `/studio`, para
  copiar y pegar si querés reemplazar el fallback por contenido real
  idéntico a la demo. Incluye la guía de imágenes y recortes.

---

## 1. Qué archivos reemplazar en GitHub

Reemplazá **el repositorio entero**, no archivos sueltos — hay carpetas
nuevas (`app/piece`, `app/archive`, etc.) y el schema de Sanity cambió de
forma (Piece pasó a ser un documento propio), así que mezclar la versión
vieja con la nueva puede dejar referencias rotas.

## 2. Cómo subir el proyecto completo

1. Entrá a tu repositorio en [github.com](https://github.com).
2. Seleccioná **todos los archivos y carpetas actuales** (clic en el
   primero, Shift+clic en el último) y eliminalos con **Delete files**
   (o, más simple: borrá el repositorio entero desde Settings → Delete
   this repository, y creá uno nuevo con el mismo nombre).
3. Andá a la página principal del repo (ahora vacío) y tocá
   **"uploading an existing file"**.
4. Arrastrá todo el contenido de esta carpeta (`app`, `components`, `lib`,
   `public`, `sanity`, `styles`, `package.json`, `package-lock.json`,
   `next.config.mjs`, `sanity.config.js`, `jsconfig.json`, `.gitignore`,
   `.env.local.example`, `README.md`) — no la carpeta en sí, lo que está
   adentro.
5. Commit changes.

Si tu cuenta limita la cantidad de archivos por subida, hacelo en un par
de tandas — todo termina en el mismo repositorio.

## 3. Cómo comprobar el deployment en Vercel

Como el repositorio es el mismo que ya tenías conectado, Vercel va a
detectar el nuevo commit y lanzar un deploy solo. Para comprobarlo:

1. Entrá a [vercel.com](https://vercel.com) → tu proyecto (`latamesa-web`).
2. En la pestaña **Deployments**, el commit más reciente debería aparecer
   con estado **Building** y después **Ready**.
3. Las variables de entorno (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`) ya
   están cargadas de la vez anterior — no hace falta tocarlas, salvo que
   estés arrancando de cero (ver README anterior / sección "Si es la
   primera vez" más abajo).
4. Abrí la URL del deployment (`https://latamesa-web-3f9j.vercel.app/`, o
   la que tengas) y confirmá que el hero se vea con la tipografía
   superpuesta sobre la imagen.

### Si es la primera vez que conectás Sanity a este proyecto

Repetí los pasos del README original: crear proyecto en
[sanity.io/manage](https://www.sanity.io/manage), copiar el Project ID,
cargarlo como variable de entorno en Vercel, y agregar la URL de Vercel en
**CORS Origins** (con "Allow credentials" activado).

## 4. Cómo entrar a `/studio`

Andá a:

```
https://tu-dominio-de-vercel.vercel.app/studio
```

Iniciá sesión con cualquier cuenta agregada como **Member** del proyecto
en [sanity.io/manage](https://www.sanity.io/manage) → tu proyecto →
**Members**. `/studio` es una ruta de tu aplicación Next.js, no un slug de
contenido — nunca va a devolver un error 404 ni intentar interpretarse
como una página o pieza.

## 5. Cómo cargar el Issue ficticio usando el documento Word

El documento `LATAMesa_Guia_de_Contenido_Demo.docx` está organizado en
el mismo orden que tenés que cargarlo:

1. **Creá primero las Piezas** (menú lateral → **Piece** → **Create new**):
   nota editorial, ensayo, texto curatorial, entrevista, feature visual,
   evento — un documento por cada una. Cada sección del Word te dice
   exactamente qué texto va en qué campo, el slug a usar, y qué imagen
   correspondería.
2. Publicá cada Pieza (botón **Publish**).
3. **Creá el Issue** (**Issue** → **Create new**), completá sus campos, y
   en **"Piezas del issue"** agregá referencias a las seis piezas que
   creaste, en el orden que indica el Word.
4. Activá **"¿Es el issue actual?"** y publicá el Issue.

La checklist final del documento Word te sirve para confirmar que no te
salteaste ningún campo.

## 6. Cómo comprobar que el contenido publicado reemplazó al fallback

Mientras Sanity no tiene contenido, todas las páginas muestran una franja
negra arriba que dice **"Mostrando contenido de ejemplo..."**. En cuanto
publicás un Issue con el slug correcto y "¿Es el issue actual?" activado:

- Esa franja **desaparece** de la home y de `/issue/tu-slug`.
- El contenido (títulos, imágenes, colores) pasa a ser el que cargaste en
  Sanity, usando exactamente el mismo diseño — no hay que cambiar nada de
  código.
- Puede demorar hasta 60 segundos en reflejarse (el sitio vuelve a pedir
  datos a Sanity como máximo una vez por minuto).

## 7. Qué hacer si Vercel muestra un error

- **"Build Failed"**: entrá al log del deployment fallido en la pestaña
  **Deployments** de Vercel y fijate el mensaje — casi siempre es una
  variable de entorno faltante (revisá que las tres estén cargadas en
  **Settings → Environment Variables**) o un archivo que faltó subir a
  GitHub (compará con la lista de la sección 2 de este README).
- **La home carga pero se ve en blanco o sin estilos**: esperá a que
  termine de propagarse el deploy (podés forzar un refresh con Ctrl/Cmd
  + Shift + R) — a veces el navegador cachea la versión anterior.
- **`/studio` pide iniciar sesión y no te deja entrar**: confirmá en
  [sanity.io/manage](https://www.sanity.io/manage) → tu proyecto →
  **API → CORS Origins** que la URL de Vercel esté agregada con "Allow
  credentials" activado (paso 4 del README original).
- **El contenido de Sanity no aparece y sigue mostrando el fallback**:
  revisá que el Issue tenga **"¿Es el issue actual?"** activado y esté
  **Published** (no solo guardado como borrador).
- Si nada de esto resuelve el problema, revisá el log completo del
  deployment en Vercel — casi siempre el mensaje de error ahí señala la
  causa exacta.

---

## Qué falta migrar

Archive, Exhibitions, Events, About y Contact están resueltas como páginas
simples (mismo sistema visual, sin composición editorial completa) para
que el menú nunca rompa. El mismo patrón usado en Issue/Piece —agregar el
tipo en `sanity/schemaTypes`, la query en `lib/queries.js`, la página en
`app/`— sirve para llevarlas al mismo nivel de detalle cuando lo necesites.

## Dónde está cada cosa

- `sanity.config.js` (raíz) — configuración del Studio embebido, `basePath: '/studio'`
- `app/studio/[[...tool]]/page.jsx` — la ruta que sirve el Studio dentro de Next.js
- `sanity/schemaTypes/issue.js` — campos del Issue
- `sanity/schemaTypes/piece.js` — campos de cada Pieza (con campos condicionales por tipo)
- `lib/demoData.js` — todo el contenido ficticio (fuente única, coincide con el Word)
- `lib/queries.js` — las consultas GROQ a Sanity
- `app/page.js` — home
- `app/issue/[slug]/page.js` — página de issue completo
- `app/piece/[slug]/page.js` — página de cada pieza (ensayo, entrevista, visual, evento)
- `app/{archive,exhibitions,events,about,contact}/page.js` — páginas simples
- `components/Nav.jsx` — menú con contraste automático (IntersectionObserver sobre `data-header-theme`)
- `components/Footer.jsx`, `Frame.jsx`, `SimplePage.jsx` — componentes compartidos
- `styles/globals.css` — todo el sistema visual (tipografía, grillas, hero, panel, piezas)

## Si en algún momento SÍ querés trabajar en tu computadora

Nada de esto lo requiere, pero si más adelante querés tocar código en
local: `npm install` y `npm run dev` como cualquier proyecto Next.js — el
Studio en `/studio` funciona igual en `http://localhost:3000/studio`.
