# Desplegar y mantener Kiryus

Servicio creado: `Kiryus-Web` (`975066`), https://kiryus-web.seenode.app. Runtime Node 24, Basic (512 MB), una réplica, US$4/mes. Límite mensual autorizado por el usuario. El primer build y arranque remoto finalizaron correctamente. No se añadieron bases de datos ni volúmenes.

## Entorno reproducible

Usar Node.js 24 y pnpm 11.19.0. Conservar `pnpm-lock.yaml` y el campo `packageManager` de `package.json`. No mezclar lockfiles de npm, Yarn y pnpm.

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile
npx --yes pnpm@11.19.0 typecheck
npx --yes pnpm@11.19.0 lint
npx --yes pnpm@11.19.0 test
npx --yes pnpm@11.19.0 build
node scripts/start.mjs
```

El script de arranque ejecuta el servidor de producción de Next.js sobre `0.0.0.0` y respeta `PORT`; utiliza 3000 cuando esa variable no existe. Este proyecto usa la salida normal de Next.js. No requiere copiar carpetas standalone ni construir una imagen Docker.

## Vista previa en Seenode

Crear un **Web service** conectado al repositorio de GitHub autorizado. Seleccionar la rama que contiene la versión revisada y verificar su commit. Si `package.json` está en la raíz, dejar vacío **Root directory**.

| Campo | Valor |
| --- | --- |
| Language | Node 24 |
| Build command | `npx --yes pnpm@11.19.0 install --frozen-lockfile && npx --yes pnpm@11.19.0 build` |
| Start command | `node scripts/start.mjs` |
| Port | `3000` |
| `PORT` | `3000` |
| `NEXT_PUBLIC_SITE_URL` | URL HTTPS real del servicio de vista previa |
| `SITE_INDEXABLE` | `false` |
| `NEXT_TELEMETRY_DISABLED` | `1` (opcional) |

El campo **Port** de Seenode y `PORT` deben coincidir. Seenode no garantiza inyectar esa variable: definirla expresamente. Un puerto distinto o una escucha limitada a localhost suele producir un error 502.

Precios consultados el 1 de octubre de 2026: Basic, 512 MB, US$4/mes; Standard, 1 GB, US$7/mes; Pro, 2 GB, US$14/mes. Se eligió Basic dentro del límite de US$4/mes autorizado. Revisar uso real antes de proponer cambios de plan; un aumento requiere ampliar ese límite. No añadir base de datos ni volumen al sitio público si no existe una necesidad concreta de persistencia.

El sitio original continuará disponible. La vista previa no modifica dominio, DNS ni hosting de producción. Su configuración desactiva indexación, bloquea robots y publica un sitemap vacío. `robots.txt` no es un control de acceso: el enlace de vista previa sigue siendo público.

Abrir los logs de build y runtime, esperar el estado activo y comprobar la URL. Auto-deploy está desactivado por defecto; puede activarse en Settings para la rama elegida después de revisar el flujo. La CI valida el código y no despliega ni compra servicios.

## Variables y producción

El 3 de octubre de 2026 el usuario autorizó conectar el dominio de Wix a Seenode. La dirección principal de producción es `https://www.comunidadkiryus.org`: configurar `NEXT_PUBLIC_SITE_URL` con esa URL y `SITE_INDEXABLE=true`, y reconstruir. Las comprobaciones `test:routes` validan ahora tanto producción como vista previa según estas dos variables. En producción, el dominio raíz redirige permanentemente a `www`, conservando ruta y parámetros; el enlace técnico de Seenode continúa disponible.

El panel de Seenode ofrece explícitamente estas dos opciones DNS para el servicio `975066`: `A` raíz a `94.237.83.139` y `CNAME www` a `up-de-fra1-k8s-1.apps.run-on-seenode.com`. La dirección A procede del panel; no se deduce resolviendo el CNAME. Mantener Wix como administrador del dominio y DNS (`ns0.wixdns.net` y `ns1.wixdns.net`), reemplazar únicamente los registros web y verificar HTTPS para ambos nombres. No cancelar el dominio ni cambiar sus servidores de nombres. La configuración deseada no acredita por sí sola propagación o certificados: comprobar ambos en cada traslado.

Las variables están disponibles en build y ejecución. **Apply changes** en Seenode reinicia la imagen existente sin reconstruir Git. Al cambiar `NEXT_PUBLIC_SITE_URL`, cualquier `NEXT_PUBLIC_*` o un valor utilizado para generar páginas durante el build, realizar un nuevo despliegue del commit revisado. Next.js incorpora las variables públicas al código generado.

La migración al dominio definitivo autorizada el 3 de octubre de 2026 requiere:

1. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS definitivo y revisar canonical y metadatos sociales.
2. Configurar `SITE_INDEXABLE=true` y reconstruir. Revisar `robots.txt`, `sitemap.xml` y las etiquetas robots.
3. Configurar el dominio en Seenode y aplicar únicamente los registros DNS que indique el proveedor; esperar verificación de dominio y TLS.
4. Comprobar las redirecciones de sedes antiguas, incluida la variante con ñ, y las rutas nuevas.
5. Verificar todas las páginas, imágenes, navegación móvil y formulario sin enviar consultas de prueba a la comunidad.

El filesystem del servicio es efímero. El contenido del sitio vive en Git. El CRM incorporado debe permanecer desactivado hasta adjuntar un volumen persistente y configurar las credenciales; no guardar consultas en la capa efímera.

## Activar el CRM

El 1 de octubre de 2026 se verificó en el diálogo de Seenode el volumen mínimo de **5 GB por US$2,50/mes**. Unido a Basic, el total de Kiryus sería **US$6,50/mes**, con una sola réplica. El límite anterior era US$4/mes: no contratar el volumen hasta recibir la ampliación del límite. Su aprobación y creación se registrarán por separado.

1. Adjuntar el volumen de 5 GB a `/data`. Su creación provoca una interrupción breve.
2. Configurar `CRM_DATA_DIR=/data/kiryus-crm`, `CRM_ADMIN_EMAIL` con el correo responsable y `CRM_ADMIN_PASSWORD_HASH` generado localmente con `node scripts/hash-crm-password.mjs`. El responsable conserva su contraseña; nunca subirla a Git. Mantener `NEXT_PUBLIC_SITE_URL` igual al dominio principal del entorno (`https://www.comunidadkiryus.org` en producción) y una réplica.
3. Aplicar y desplegar el commit revisado. El formulario y Privacidad son dinámicos y describen la recepción solo cuando están presentes la ruta persistente y las credenciales válidas. Si falta configuración, continúa el flujo de WhatsApp.
4. Verificar login, consulta consentida, listado, notas, estados, CSV y cierre de sesión con datos ficticios. Reiniciar y comprobar que la consulta sigue presente. Eliminar solo los datos de esa verificación identificados como desechables.
5. Mantener backups restringidos y probar restauraciones según [crm.md](crm.md). No hay backup externo automático contratado.

La prueba automatizada `pnpm test:crm` arranca el servidor de producción en 3102 con credenciales aleatorias y una base temporal, verifica persistencia tras reinicio y limpia exclusivamente su directorio de prueba. La CI también la ejecuta.

## Publicar artículos reales

Los archivos editoriales se guardan en `src/content/articles/`. `src/lib/articles.ts` ofrece un adaptador de archivos con un contrato que puede implementarse con un CMS más adelante. El listado, las recomendaciones, las rutas y el sitemap consultan exclusivamente `status: published`.

La búsqueda por título/resumen y el selector de categorías aparecen solamente cuando existen artículos publicados. Usan un formulario GET y renderizado de servidor; funcionan sin JavaScript. Un resultado vacío conserva los filtros y ofrece volver al listado completo.

`borrador-editorial.mdx` es una plantilla interna. Permanece en `draft`, no aparece públicamente y su URL devuelve 404. Crear un archivo nuevo llamado exactamente como su slug. Su frontmatter publicado debe contener:

```yaml
slug: slug-confirmado
title: "Título revisado"
summary: "Resumen del artículo"
category: naturaleza
author:
  name: "Autoría real confirmada"
  type: Person
date: "YYYY-MM-DD"
status: draft
```

El ejemplo no es una publicación válida hasta reemplazar los marcadores con datos reales. Mantener `draft` durante la revisión. Las categorías preparadas son `naturaleza`, `practicas-sostenibles` y `vida-comunitaria`. La autoría puede tener `type: Person` o `Organization`, según quién escribió el artículo.

Campos opcionales: `aldea` (`argentina` o `colombia`), `legacy: espana` para material histórico, `updatedAt` (fecha real de modificación) y `cover`, con `src`, `alt`, `width` y `height`. La portada debe ser local bajo `/images/`, tener procedencia y permiso documentados, y usar sus dimensiones reales. Omitirla cuando no exista una imagen confirmada.

La fecha debe ser una cadena entre comillas y existir en el calendario. La fecha de modificación no puede preceder a la publicación. El cuerpo empieza con títulos `##`, porque la plantilla de lectura ya presenta un H1.

MDX se compila únicamente desde archivos editoriales confiables y revisados. No utilizar texto del formulario, contenido de visitantes, URLs remotas ni imports dinámicos como fuente MDX. La compilación bloquea expresiones JavaScript. No incluir secretos en el frontmatter ni en el cuerpo. Un CMS futuro debe mantener esta frontera de confianza y el filtrado de borradores.

Después de la aprobación editorial, cambiar a `status: published`, ejecutar las comprobaciones, revisar la página y desplegar. Las rutas se generan durante el build: cada alta, baja o cambio de slug requiere reconstrucción. Al retirar un artículo, revisar enlaces y decidir una redirección editorial cuando exista un destino adecuado.

## Comprobaciones de despliegue

- Instalación congelada, tipos, lint, pruebas y build completados.
- Blog vacío sin artículos de ejemplo publicados; borrador e inexistente responden 404.
- Con `SITE_INDEXABLE=false`, robots bloqueados y sitemap sin URLs.
- Metadatos y sitemap utilizan la URL pública configurada.
- Servidor accesible por el puerto configurado; recursos sin 404 y rutas sin errores.
- Revisión visual de móvil/escritorio y contactos realizada sin enviar solicitudes reales.

Registrar resultados efectivos y el commit desplegado en la documentación de verificación. No presentar esta lista como comprobada hasta ejecutar los pasos.

## Fuentes oficiales

- [Next.js en Seenode](https://seenode.com/docs/frameworks/javascript/nextjs)
- [Puertos](https://seenode.com/docs/deploy/port)
- [Variables](https://seenode.com/docs/configure/environment-variables)
- [Runtimes](https://seenode.com/docs/reference/runtimes)
- [Precios](https://seenode.com/pricing)
- [Variables y self-hosting de Next.js](https://nextjs.org/docs/app/guides/self-hosting)
