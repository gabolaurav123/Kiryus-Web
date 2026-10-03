# Plan de migración

El código está publicado en `gabolaurav123/Kiryus-Web` y el servicio de Seenode está activo. El 3 de octubre de 2026 se autorizó conectar `https://www.comunidadkiryus.org/` a ese servicio. El registro siguiente conserva la primera entrega; la migración del dominio se documenta en la etapa 2 y requiere comprobar DNS y HTTPS después de aplicarla.

## Registro de la primera entrega

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
| Cambio de dominio definitivo | Autorizado el 3 de octubre de 2026; ver etapa 2 |

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
| `/eventos` | `/evento` | Redirección permanente al apartado actual del festival |
| `/kiryus-argentina` | `/aldeas/argentina` | Redirección permanente configurada |
| `/kiryus-colombia` | `/aldeas/colombia` | Redirección permanente configurada |
| `/kiryus-españa` | `/legado/espana` | Redirección permanente al legado; comprobar URL codificada con `%C3%B1` |
| `/kiryus-espana` | `/legado/espana` | Variante sin ñ con redirección permanente al legado |
| `/aldeas/espana` | `/legado/espana` | Redirección permanente; España dejó de figurar como aldea actual por confirmación del usuario |
| Sin equivalente principal previo | `/aldeas`, `/contacto`, `/privacidad` | Rutas nuevas de la entrega |

Las redirecciones están en `next.config.ts`; comprobar su comportamiento HTTP al desplegar. Tienda, Donaciones, grupos de jardinería y fichas históricas `/event-details/...` no tienen equivalente en la nueva web. No redirigir eventos de 2024–2025 al festival de 2026 ni usar una redirección general al inicio para ocultar páginas ausentes. La antigua ruta genérica `/eventos` sí conduce al apartado vigente `/evento`.

## Etapa 2: traslado al dominio definitivo

Autorizada por el usuario el 3 de octubre de 2026. Conservar `www.comunidadkiryus.org` como dirección principal y Wix como administrador DNS; los registros exactos mostrados por Seenode y las variables del build se documentan en `deployment.md`. La autorización no implica transferir el registro, cancelar Wix ni contratar recursos adicionales. Verificar dominio y TLS después del cambio, sin confundir los valores preparados con una propagación terminada.

### Registro del cambio — 3 de octubre de 2026

- Publicado en Seenode `975066` el commit `87caf3f6071edf411797b2d38c6fee273f11ca06`, con [CI aprobada](https://github.com/gabolaurav123/Kiryus-Web/actions/runs/37144170993). Un primer intento remoto falló antes del build; el segundo compiló y arrancó correctamente.
- Variables verificadas: `NEXT_PUBLIC_SITE_URL=https://www.comunidadkiryus.org` y `SITE_INDEXABLE=true`. Plan Basic y recursos existentes conservados.
- Wix guarda un único `A` raíz a `94.237.83.139` y `CNAME www` a `up-de-fra1-k8s-1.apps.run-on-seenode.com`, TTL de una hora. Ambos servidores autoritativos publican estos valores. Los NS de Wix y el resto de registros se conservaron.
- Seenode verificó ambos nombres y mostró certificados Let's Encrypt activos; `www.comunidadkiryus.org` quedó como dominio predeterminado.
- A las 18:35 UTC se comprobó HTTPS en el destino nuevo sin omitir validación de certificados: robots permite rastreo y anuncia el sitemap de `www`; el dominio raíz responde `308` a `www` conservando ruta y parámetros. La comprobación del build público contiene las 14 rutas del sitemap, canonical de producción y la ficha de Marisa en `/evento`.
- La comprobación directa del destino con `curl --resolve` distingue TLS del servidor de la caché DNS local. A las 18:34 UTC Cloudflare ya veía el nuevo destino de `www`, mientras Google todavía devolvía el CNAME anterior con TTL restante; no se afirma que todas las cachés mundiales hayan terminado de propagarse.
- Respaldos DNS anterior/posterior y auditorías de despliegue se conservaron fuera del repositorio en `../../work/`.

Antes de cambiar DNS, conservar una referencia de los registros actuales y del sitio original y revisar las rutas históricas. El dominio y sus DNS continúan administrados en Wix; Seenode aloja la nueva web.

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
