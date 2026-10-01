# Plan de migración

El destino solicitado para el código es `gabolaurav123/Kiryus-Web`. La publicación del código y su CI están verificadas. El servicio independiente de Seenode fue creado y su primer build y runtime están activos. El sitio actual `https://www.comunidadkiryus.org/` continúa siendo la referencia pública; este documento no acredita cambios en su dominio, DNS o hosting.

## Registro de la entrega

Completar únicamente con información comprobada:

| Dato | Valor actual |
| --- | --- |
| URL del repositorio accesible | https://github.com/gabolaurav123/Kiryus-Web |
| Rama publicada | `main` |
| Commit revisado | `b29663775db2ae30b2a11c568a2ac27f433ca8bc` (implementación y CI aprobadas) |
| Servicio e identificador de Seenode | `Kiryus-Web`, servicio `975066`, Basic (512 MB), Node 24, US$4/mes |
| URL HTTPS de vista previa | https://kiryus-web.seenode.app |
| Build y runtime del servicio | Logs de Seenode confirmaron Build successful y Deployment successful; puerto 3000 |
| Revisión funcional y visual de la URL pública | Diez páginas, redirecciones, 404, canonical HTTPS y noindex verificados; CTA, validación, revisión, copia y menú móvil probados. Ver `qa.md`. |
| Cambio de dominio definitivo | Fuera de la etapa de vista previa; pendiente de una instrucción específica |

No sustituir estos pendientes por una URL de ejemplo ni interpretar un build local como un despliegue público.

## Etapa 1: publicar el código y la vista previa

1. Revisar el diff, mantener el lockfile y confirmar que el repositorio contiene fotografías optimizadas y documentación, sin archivos temporales o secretos.
2. Con Node.js 24 y pnpm 11.19.0, completar instalación congelada, tipos, lint, pruebas y build. Registrar los resultados reales y el commit.
3. Publicar ese commit en el repositorio solicitado. Comprobar acceso y rama; la CI debe ejecutar sus verificaciones.
4. Crear o conectar el servicio web de Seenode a la rama revisada con Node 24 y la configuración de `deployment.md`.
5. Usar `NEXT_PUBLIC_SITE_URL` con la URL HTTPS real de la vista previa, `SITE_INDEXABLE=false` y `PORT=3000`. Reconstruir después de fijar la URL asignada.
6. Revisar logs, estado del servicio, páginas y recursos de la URL pública. Registrar servicio, URL y commit efectivos.

El inicio de producción utiliza `node scripts/start.mjs`, salida normal de Next.js y puerto 3000. La CI no compra servicios ni despliega. La vista previa no modifica los registros DNS del sitio actual.

## Revisión de la vista previa

Esta lista define trabajo pendiente; marcar una comprobación solo después de realizarla.

- Navegación principal, rutas de sedes y páginas de Contacto/Privacidad; URL desconocida con respuesta 404.
- Fotografías, logo, iconos, fuentes, legibilidad, menú y distribución en móvil/escritorio.
- Formulario de participación: preselección desde CTAs, validación, revisión, edición y copia; fechas opcionales para estadía.
- Apertura de WhatsApp con el número y mensaje correctos, sin enviar una consulta real de prueba a la comunidad. La interfaz no debe afirmar recepción o reserva.
- Blog vacío y borrador inaccesible; publicación real futura revisada desde su propio flujo editorial.
- Metadatos y enlaces canónicos referidos a la URL de vista previa, robots sin indexación, `robots.txt` con bloqueo y sitemap sin URLs.
- Recursos y rutas sin 404 inesperados; logs de runtime sin errores relevantes.

El bloqueo de robots no protege el acceso. Si el contenido de una revisión debe ser privado, configurar un control de acceso antes de incorporarlo; `draft` y `noindex` no sustituyen ese control.

## Rutas que se conservan o trasladan

| Ruta del sitio actual | Ruta nueva | Tratamiento |
| --- | --- | --- |
| `/` | `/` | Conservada |
| `/nosotros` | `/nosotros` | Conservada |
| `/involucrate` | `/involucrate` | Conservada; nuevo recorrido de consulta |
| `/blog` | `/blog` | Conservada; sin publicaciones de ejemplo |
| `/kiryus-argentina` | `/aldeas/argentina` | Redirección permanente configurada |
| `/kiryus-colombia` | `/aldeas/colombia` | Redirección permanente configurada |
| `/kiryus-españa` | `/legado/espana` | Redirección permanente al legado; comprobar URL codificada con `%C3%B1` |
| `/kiryus-espana` | `/legado/espana` | Variante sin ñ con redirección permanente al legado |
| `/aldeas/espana` | `/legado/espana` | Redirección permanente; España dejó de figurar como aldea actual por confirmación del usuario |
| Sin equivalente principal previo | `/aldeas`, `/contacto`, `/privacidad` | Rutas nuevas de la entrega |

Las redirecciones están en `next.config.ts`; comprobar su comportamiento HTTP al desplegar. Las rutas históricas de Tienda, Donaciones y Eventos no forman parte de esta primera versión. Inventariar tráfico, enlaces externos y contenido útil de esas secciones antes de decidir su retirada, conservación o destino. No publicar programación antigua como próxima ni usar una redirección general al inicio para ocultar páginas ausentes.

## Etapa 2: traslado al dominio definitivo

Realizar esta etapa cuando exista una instrucción específica para migrar el sitio público. Antes de cambiar DNS, conservar una referencia de los registros actuales y del sitio original, revisar las rutas históricas y definir quién mantiene el dominio y el servicio.

1. Configurar el dominio en Seenode y comprobar los requisitos que muestra su panel. Preparar la nueva versión con `NEXT_PUBLIC_SITE_URL` igual al dominio HTTPS definitivo.
2. Cambiar `SITE_INDEXABLE=true` y reconstruir el commit aprobado. Revisar canonical, robots, sitemap y metadatos sociales del build destinado a producción.
3. Aplicar únicamente los registros DNS indicados por Seenode para el dominio autorizado. Verificar dominio, certificado TLS y comportamiento de la variante `www` y del dominio raíz; elegir una URL canónica única.
4. Comprobar las rutas preservadas, redirecciones permanentes, respuestas 404, formularios, recursos y canales de contacto en el dominio definitivo.
5. Registrar URL, commit, fecha, cambios DNS y resultados. Evitar retirar el hosting anterior antes de completar esta comprobación y la propagación necesaria.

Si se utilizan herramientas de buscadores, presentar el sitemap definitivo después de verificar que contiene las páginas públicas previstas. Las fichas de artículos solo aparecerán cuando existan publicaciones reales aprobadas. No activar indexación en el servicio de vista previa para sustituir esta etapa.

## Recuperación y seguimiento

Conservar el commit anterior revisado y la configuración del servicio. Si una nueva versión falla, volver a desplegar ese commit con las variables del entorno correcto y registrar la incidencia. Ante un problema del cambio de dominio, los registros DNS anteriores documentados permiten preparar la recuperación; considerar cachés y propagación antes de afirmar que se ha restablecido.

Revisar los logs del servicio, errores de rutas, enlaces históricos y vigencia de contactos después del traslado. Acompañar los siguientes despliegues con las comprobaciones pertinentes. No guardar artículos, uploads ni consultas en el filesystem efímero de Seenode: el contenido editorial de esta versión se mantiene en Git.

## Documentos relacionados

- `deployment.md`: campos y variables concretos de Seenode, build, inicio y verificaciones.
- `editorial-guide.md`: artículos, borradores, fuentes, fotografías y mantenimiento.
- `content-audit.md`: contenido respaldado y decisiones que requieren confirmación.
- `images.md` e `images-manifest.json`: recursos documentales y procedencia.
