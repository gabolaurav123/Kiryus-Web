# Verificación de la implementación

## Correcciones y CRM — 1 de octubre de 2026

Esta revisión sustituye la clasificación territorial de la entrega inicial: Argentina y Colombia son las dos aldeas actuales; España está en `/legado/espana`. La hoja decorativa del cierre se redibujó con silueta, nervio y venas conectadas; en móvil tiene un espacio propio. El CRM está implementado, pero su activación pública requiere un volumen persistente y credenciales privadas. Hasta entonces la web mantiene WhatsApp y las API privadas permanecen protegidas.

| Comprobación ejecutada | Resultado |
| --- | --- |
| Instalación congelada, tipos y lint | Aprobados; sin errores ni advertencias |
| Pruebas de unidad e integración de módulos | 30 aprobadas, incluidas 11 de CRM |
| Build de producción | Aprobado; APIs y panel dinámicos en Node 24 |
| Rutas públicas | 10 páginas 200 con H1 único, metadatos y HTML inicial; cinco redirecciones 308 al destino correcto; cuatro 404 reales |
| Acceso administrativo | `/admin` sin sesión devuelve 307 a login; login no indexable; APIs de leads y CSV sin sesión devuelven 401 |
| CRM HTTP real (`pnpm test:crm`) | Consentimiento, validación, cuerpo acotado, Origin, cookie privada, reintento sin duplicados, conflicto de contenido, notas, estado, filtros y CSV verificados |
| Persistencia | Servidor de producción detenido y arrancado con la misma base temporal: consulta, notas y sesión conservadas; logout revoca el acceso |
| Prueba en navegador | Login con cuenta local ficticia; selección y actualización de estado/notas; filtro Argentina; formulario móvil Colombia con revisión, consentimiento y referencia real; consulta visible en el panel |
| Diseño adaptable | CRM, legado y directorio sin desbordamiento horizontal a 360, 768 y 1024 px; CRM y formulario a 390 px; escritorio a 1440 px |
| Menú móvil | Solo Argentina y Colombia bajo Nuestras aldeas; Legado de España separado |

Los datos usados para las pruebas son ficticios y están aislados del servicio público. No se enviaron mensajes a WhatsApp ni correos. Las pruebas HTTP crean credenciales aleatorias y eliminan exclusivamente sus directorios temporales. Una segunda revisión encontró y corrigió un riesgo de mezclar notas al cambiar de selección durante una actualización y la codificación del enlace mailto.

El volumen mínimo se verificó en el diálogo de Seenode: 5 GB por US$2,50/mes, total Basic + volumen US$6,50/mes. El límite previo era US$4/mes; no se contrató almacenamiento sin ampliarlo. La comprobación de persistencia local no acredita por sí sola un volumen remoto activado. El responsable debe configurar sus credenciales, un plazo de conservación y backups; detalles en [crm.md](crm.md).

Las secciones siguientes conservan el registro histórico de la entrega inicial.

Revisión realizada el 1 de octubre de 2026 sobre el build de producción local de Next.js, servido en `http://localhost:3000`. El código se publicó en `main` con el commit `b29663775db2ae30b2a11c568a2ac27f433ca8bc`. [GitHub Actions](https://github.com/gabolaurav123/Kiryus-Web/actions/runs/36919771401) repitió instalación, tipos, lint, 17 pruebas, build y rutas en Ubuntu con resultado aprobado. Vista previa pública: https://kiryus-web.seenode.app. El despliegue de `041bd59dd61c6c984074211dc528509d202ae1e7` quedó activo y su [CI](https://github.com/gabolaurav123/Kiryus-Web/actions/runs/36920791318) también pasó.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile` | Instalación reproducible aprobada |
| `pnpm typecheck` | Sin errores |
| `pnpm lint` | Sin errores ni advertencias tras corregir Link interno y el atributo del radio |
| `pnpm test` | 17 pruebas aprobadas: validación, Unicode, fechas, WhatsApp, borradores y fotografías |
| `pnpm build` | Build de producción aprobado; páginas públicas generadas |
| `pnpm test:routes` | 10 páginas con HTTP 200, HTML inicial, H1 único, título propio, idioma, canonical y noindex |
| Redirecciones | 308 a las tres sedes; variante sin ñ y `%C3%B1` verificadas sin bucle |
| URLs ausentes | 404 real en página desconocida, sede inexistente, artículo inexistente y borrador editorial real |
| Entorno preview | robots bloquea rastreo, sitemap vacío; favicon, logo y portada social responden 200 |

Las pruebas HTTP arrancan y detienen su propio servidor en el puerto 3101 y requieren un build previo. No contactan WhatsApp, Instagram o TikTok.

## Navegador y recorrido de participación

- Portada, Colombia y participación revisadas a 360, 390, 768, 1024 y 1440 px. Sin desbordamiento horizontal, con un H1 por página.
- Nosotros, directorio, Argentina, España, blog, contacto y privacidad revisados a 390 y 1440 px. Sin desbordamiento horizontal.
- Desplegable de Aldeas: apertura con flecha abajo, foco en primer enlace, End hacia España y Escape con foco de vuelta al botón.
- Menú móvil: abre un dialog, enfoca su cierre, bloquea scroll; Escape cierra, devuelve foco y restaura el scroll.
- Galería: abre la fotografía elegida; flecha derecha cambia a la siguiente; End muestra la última; Escape cierra y devuelve foco a la miniatura original.
- Salto al contenido: activa y enfoca el elemento main.
- Formulario: preselección de estadía y Argentina, errores visibles junto a campos, conservación del nombre al corregir, nombres con tildes y apóstrofe, mensaje de varias líneas y revisión previa.
- WhatsApp: enlace público con el número oficial y mensaje codificado; teléfono y fechas vacíos omitidos. No se enviaron mensajes ni solicitudes reales.
- Copia: el botón copió el texto y mostró el estado correcto en el navegador. Volver a editar conservó nombre, apellido y mensaje.
- Blog: estado vacío cuidado; la plantilla queda en draft. Su slug público devuelve 404.

La apertura de una aplicación nativa de WhatsApp y el teclado virtual de un teléfono físico no se emularon. El fallo de permisos del portapapeles tiene una alternativa de selección manual implementada; no se forzó ese permiso en el navegador del usuario.

## Diseño, acceso y límites de medición

Contrastes calculados para las combinaciones principales: verde profundo/crema 11,55:1; verde principal/crema 5,56:1; texto secundario/crema 5,45:1; terracota de foco/crema 5,31:1. Los textos sobre fotografía usan un degradado localizado. Se revisaron encuadres de personas y proporciones del logo.

El HTML inicial entrega texto, enlaces y valores finales de impacto. Las animaciones no ocultan contenido esencial. CSS y Motion contemplan `prefers-reduced-motion`; los contadores comprueban esa preferencia antes de animar. No se cambió la configuración de accesibilidad del sistema del usuario para forzar la preferencia.

Se solicitó PageSpeed Insights para la URL pública; la API devolvió HTTP 429 por cuota agotada, sin resultados Lighthouse. No se obtuvieron mediciones de campo de Core Web Vitals, ni se atribuyen puntuaciones Lighthouse a este sitio. LCP ≤2,5 s, CLS <0,1 e INP <200 ms son objetivos para el seguimiento tras publicar. La revisión de tamaños no sustituye una auditoría completa con lectores de pantalla, zoom del navegador o dispositivos físicos.

## Capturas

Se guardaron seis capturas reales de viewport, fuera del repositorio, en la carpeta de entrega `outputs/screenshots`: inicio, Colombia y participación, cada una en móvil y escritorio. Se conservan como JPEG. La captura completa de una página excedió el tiempo disponible de la API del navegador; las capturas entregadas muestran los capítulos principales y el formulario visible.

## Datos pendientes

- Período de medición de árboles y hectáreas.
- Condiciones, disponibilidad y aportes de participación en cada aldea.
- Respaldo institucional del registro que figuraba en el footer antiguo, omitido de esta versión.
- Artículos reales, autoría y fechas aprobadas para activar el blog.
- Una instrucción específica para trasladar el dominio de producción.

## Verificación pública en Seenode

- Servicio `975066`, Basic 512 MB, una réplica. El panel muestra US$4,00/mes y despliegue activo del commit `041bd59`.
- Se verificaron las diez páginas públicas con HTTP 200, H1 único, canonical HTTPS correcto y `noindex, nofollow`.
- Las cuatro redirecciones devolvieron 308; páginas, sedes, artículos inexistentes y el borrador real devolvieron 404. Robots bloquea rastreo y sitemap no tiene URLs.
- En navegador público a 390 px: CTA «Consultar visita» de Colombia preseleccionó visita y Colombia; se verificaron errores, nombres con tildes, revisión, enlace de WhatsApp, copia y conservación al editar. Menú móvil cerró con Escape y devolvió el foco.
- Portada pública a 1440 px: logo y fotografía principal terminaron de cargar; sin errores de consola en el recorrido revisado. Se guardó una captura adicional de la web pública.
- El runtime mostró una petición con Server Reference ID inválido, no correspondiente a una acción implementada en el sitio. No se reprodujo como fallo funcional en la navegación o el formulario revisados; el formulario no utiliza Server Actions ni recepción de servidor. No se atribuye una causa no comprobada a esa petición.
- Los resultados HTTP completos se guardaron en `outputs/verification-public.json` fuera del repositorio. Los commits posteriores a esta verificación documentan la entrega, sin cambiar el código de la web.
