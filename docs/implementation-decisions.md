# Decisiones de implementación

Registro de la versión implementada el 1 de octubre de 2026. Explica los criterios que deben conservarse al mantener el proyecto. Los pasos operativos están en `deployment.md`, `editorial-guide.md` y `migration-plan.md`.

## Entorno y dependencias

El proyecto fija **Next.js 16.3.8, React/React DOM 19.3.0, TypeScript 5.9.3, ESLint 9.39.5 y pnpm 11.19.0**. Node.js 24 es el entorno elegido para desarrollo, CI y Seenode. Aunque `engines.node` permite versiones desde 22, la referencia reproducible de esta entrega es 24.

TypeScript 5.9.3 y ESLint 9.39.5 se fijaron después de comprobar incompatibilidades de TypeScript 7 y ESLint 10 con los plugins del conjunto de lint usado aquí. La elección conserva una cadena de comprobaciones funcional; cualquier actualización debe revisar de nuevo la compatibilidad completa y el lockfile, no solo el número de versión del paquete principal.

La revisión de imports de `src/` y `scripts/` no detectó paquetes de runtime usados sin declaración. Next, React, React DOM, Motion, Lucide, gray-matter, next-mdx-remote, Sharp y las dos familias Fontsource están declarados. Los manifiestos instalados de Next, Motion, Lucide y MDX admiten React 19; React DOM corresponde a la misma versión de React. Node 24 satisface los requisitos de los manifiestos instalados de Next y Sharp. Esta revisión no sustituye una instalación y ejecución en el entorno Linux del proveedor.

Sharp permanece como dependencia de producción para el procesamiento de imágenes. Las herramientas de comprobación pertenecen a `devDependencies`. La salida de Next es la normal, con un servidor Node iniciado por `scripts/start.mjs` que escucha en `0.0.0.0` y respeta `PORT`; no se configuró salida standalone.

## HTML inicial e interacción

App Router mantiene el contenido editorial en componentes de servidor. Las páginas pueden generarse durante el build y entregan su contenido en el HTML inicial, incluidos títulos, enlaces, fotografías y valores de impacto. Los componentes de cliente se limitan a navegación móvil, galería, formulario y animaciones concretas.

`Reveal` mantiene `initial={false}` para no ocultar el contenido antes de cargar JavaScript. Los efectos respetan la preferencia de movimiento reducido. La interacción mejora la presentación, mientras que el contenido y los enlaces principales siguen presentes en el documento servido.

El mapa de `WorldNetwork` es un SVG esquemático con título, descripción y etiquetas de países, acompañado por una lista de enlaces a las tres sedes. Representa la red en Argentina, Colombia y España; no calcula posiciones ni indica entradas a fincas. Evita incorporar un proveedor cartográfico y no introduce coordenadas exactas sin evidencia.

## Fotografías y evidencia

Se utilizan fotografías reales del sitio de Kiryus y su marca, con copias optimizadas servidas localmente. `images-manifest.json` registra procedencia, asociación editorial, dimensiones y texto alternativo; `images.ts` y `villages.ts` reutilizan ese inventario. Las fotos generales no se atribuyen a una sede sin confirmación. Next Image reserva dimensiones y adapta la carga al espacio previsto.

Publicar una fotografía en la web original no acredita ubicación exacta, fecha o autoría ni concede una licencia general a terceros. Los derechos del logo y las fotografías se mantienen separados de la licencia que se elija para el código. La revisión de contenido conserva los datos pendientes y evita convertirlos en afirmaciones públicas.

## Participación y privacidad

El formulario es de cliente y prepara una consulta para WhatsApp. Valida, muestra el mensaje y permite editarlo, copiarlo o abrir el canal oficial. La persona lo envía allí; el sitio no confirma recepción, disponibilidad ni reserva.

Los datos permanecen en memoria mientras la página sigue abierta. No se implementó backend, base de datos, envío por correo ni almacenamiento persistente del navegador. Al abrir WhatsApp, el texto se incorpora al enlace del proveedor externo. El flujo visible y la página de Privacidad describen este comportamiento.

No se incorporaron analítica, publicidad, cookies de seguimiento ni embeds de Instagram, TikTok o mapas. Las fuentes se sirven localmente y los canales externos se abren mediante enlaces elegidos por la persona. Cualquier futura recepción de consultas, medición o servicio incrustado necesita implementación y actualización de la información de privacidad.

## Métricas y ODS

`src/content/impact.ts` define el modelo tipado `ImpactFigure`: identificador, valor, prefijo opcional, etiqueta, fuente y `measurementPeriod`. Las cifras comunicadas por Kiryus se conservan con **`measurementPeriod: null`**, porque no se publicó un período de medición. La nota visible aclara esta limitación; la fecha de consulta del contenido no se utiliza como período medido.

`ImpactCounter` entrega el valor final en el HTML inicial y en un texto accesible. Después puede animar el número visual una vez al entrar en pantalla, sin modificar el dato fuente y con omisión del efecto al preferir movimiento reducido. La animación no representa una medición en vivo ni una extrapolación del impacto.

Los ODS se presentan con números y nombres contrastados, como orientación de las prácticas descritas. No se atribuye aval, certificación o alianza de Naciones Unidas/PNUD.

## Artículos y SEO

El contenido editorial se guarda en archivos MDX locales confiables y revisados. El adaptador tipado solo entrega artículos con `status: published`; los borradores no se convierten en contenido público. El estado inicial del blog permanece vacío y la búsqueda aparece cuando existe material publicado. MDX no acepta entrada de visitantes ni fuentes remotas y bloquea expresiones JavaScript.

Los metadatos, canonical y datos estructurados se generan desde contenido conocido. El JSON-LD de organización no añade una identidad legal sin respaldo; el de artículos utiliza la autoría y fechas reales del frontmatter. Cada alta o cambio de slug necesita reconstruir las rutas.

La vista previa utiliza `SITE_INDEXABLE=false`: robots sin indexación, bloqueo de rastreo y sitemap vacío. La URL se define mediante `NEXT_PUBLIC_SITE_URL`; cambiarla o activar indexación requiere un nuevo build. Esta configuración no protege el acceso al contenido. El dominio definitivo se traslada mediante la etapa específica del plan de migración.

## Verificación registrada

El agente principal confirmó los siguientes resultados locales sobre la versión de implementación:

| Comprobación | Resultado y alcance |
| --- | --- |
| Pruebas automatizadas | 17 pruebas aprobadas: artículos, preparación de consultas e integridad de recursos |
| Páginas HTTP | 10 páginas con respuesta 200, HTML inicial, un H1, idioma español, título específico, canonical y robots de vista previa |
| Redirecciones | 4 recorridos con respuesta 308 y destino válido, incluida España con `%C3%B1` tras añadir la regla codificada |
| Rutas ausentes | 4 respuestas 404 aprobadas, incluido el borrador real `/blog/borrador-editorial` tras corregir y repetir la comprobación |
| Recursos y SEO de vista previa | Robots con bloqueo, sitemap sin URLs y recursos de marca comprobados por el script de rutas |

Estos resultados se refieren a las comprobaciones locales comunicadas; no acreditan un servicio público desplegado ni una revisión visual completa. La URL, commit, logs y resultados reales de Seenode se registran al completar el despliegue. Conservar pruebas que verifiquen comportamiento, procedencia y contratos del contenido al modificar estas decisiones.
