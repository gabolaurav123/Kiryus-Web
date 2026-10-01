# Comunidad Kiryus

Web de Comunidad Kiryus construida con React, Next.js App Router y TypeScript. Presenta la red en Argentina, Colombia y España, sus territorios y las formas de participar. El contenido y las fotografías proceden del sitio existente; la evidencia y los datos pendientes se registran en `docs/`.

## Estado de publicación

| Elemento | Estado que debe verificarse |
| --- | --- |
| Destino solicitado en GitHub | `gabolaurav123/Kiryus-Web`; push pendiente de confirmar |
| Servicio de vista previa en Seenode | Pendiente de crear o verificar; registrar su URL real después del despliegue |
| Commit desplegado | Pendiente de registrar junto con el resultado del build |
| Dominio actual | `https://www.comunidadkiryus.org/`; sin migración de DNS en esta entrega |

Esta tabla documenta pendientes, no acredita un despliegue. Actualizarla únicamente con resultados comprobados. La configuración inicial mantiene la vista previa fuera de los índices de búsqueda.

## Desarrollo local

Usar **Node.js 24** y **pnpm 11.19.0**. Ejecutar los comandos desde la raíz del repositorio. `npx` permite utilizar la versión fijada sin instalar pnpm globalmente:

```sh
node --version
npx --yes pnpm@11.19.0 install --frozen-lockfile
```

Copiar `.env.example` a `.env.local`. En PowerShell:

```powershell
Copy-Item -LiteralPath .env.example -Destination .env.local
```

Mantener estos valores para desarrollo:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_INDEXABLE=false
```

```sh
npx --yes pnpm@11.19.0 dev
```

Abrir `http://localhost:3000`. Conservar `pnpm-lock.yaml`; no generar lockfiles de otros gestores. Para revisar una versión de producción local:

```sh
npx --yes pnpm@11.19.0 check
node scripts/start.mjs
```

`check` ejecuta tipos, lint, pruebas y build. También están disponibles `typecheck`, `lint`, `test` y `build` por separado. Estos comandos son instrucciones de verificación; su presencia aquí no implica que todas las comprobaciones ya hayan pasado. El servidor escucha en `0.0.0.0`, utiliza `PORT` y adopta 3000 si la variable no está definida.

## Páginas y participación

Las rutas principales son `/`, `/nosotros`, `/aldeas`, `/aldeas/argentina`, `/aldeas/colombia`, `/aldeas/espana`, `/involucrate`, `/blog`, `/contacto` y `/privacidad`. Las antiguas rutas de las tres sedes tienen redirecciones permanentes configuradas.

El formulario ofrece visita, voluntariado, estadía y colaboración. Valida los datos, prepara un mensaje y muestra una revisión antes de abrir WhatsApp. La persona debe enviarlo dentro de WhatsApp; abrir el enlace o copiar el mensaje no crea una solicitud recibida ni una reserva. Las fechas son orientativas y la disponibilidad se coordina con la comunidad.

Los campos permanecen en la memoria de la página mientras está abierta. No se envían a un backend de Kiryus ni se guardan en localStorage, sessionStorage o una base de datos. Recargar o cerrar la página puede perder el borrador. La copia del mensaje ofrece una alternativa cuando la apertura de WhatsApp no funciona. Los enlaces directos siguen disponibles en Contacto; no se reutiliza el antiguo Google Forms sin una nueva verificación.

Los enlaces `/involucrate?interes=voluntariado&aldea=colombia` pueden preseleccionar motivo y sede. Los valores válidos y las reglas del mensaje están centralizados en `src/lib/participation.ts`; el número y los perfiles oficiales, en `src/lib/config.ts`. Si cambia el flujo, actualizar también la información visible de privacidad.

## Contenido e imágenes

| Ubicación | Función |
| --- | --- |
| `src/app/` | Páginas, metadatos, robots y sitemap |
| `src/components/` | Navegación, fotografías, secciones y formulario |
| `src/content/villages.ts` | Datos de las tres sedes y opciones de participación |
| `src/content/images.ts` | Selección de fotografías por identificador del inventario |
| `public/images/` | Fotografías, marca y recursos servidos localmente |
| `src/content/articles/` | Material editorial MDX |
| `src/lib/articles.ts` | Adaptador tipado que entrega solo artículos publicados |
| `tests/` | Pruebas de artículos y preparación de consultas |

El blog mantiene un estado vacío hasta disponer de artículos reales. `borrador-editorial.mdx` tiene `status: draft`: no aparece en el listado, la búsqueda, las recomendaciones ni el sitemap y no tiene página pública. No cambiarlo a publicado con autoría, fechas o historias de ejemplo. Cada publicación o cambio de slug necesita un nuevo build.

Las fotografías documentales están inventariadas con sus fuentes, dimensiones y texto alternativo. Evitar atribuir una imagen general a una sede sin evidencia. Los derechos de fotografías y logo pertenecen a sus respectivos titulares y son independientes de cualquier licencia del código.

Consultar la [guía editorial](docs/editorial-guide.md), la [auditoría de contenido](docs/content-audit.md) y el [inventario de imágenes](docs/images.md) antes de modificar contenido. `docs/content-sources.json` e `images-manifest.json` conservan los registros estructurados.

## Vista previa y despliegue

La CI de GitHub utiliza Node.js 24 y pnpm 11.19.0, instala con lockfile congelado y ejecuta tipos, lint, pruebas y build. No despliega el sitio. La ruta prevista es GitHub → servicio web Node 24 en Seenode, con:

```text
Build: npx --yes pnpm@11.19.0 install --frozen-lockfile && npx --yes pnpm@11.19.0 build
Start: node scripts/start.mjs
Port: 3000
PORT: 3000
```

Configurar `NEXT_PUBLIC_SITE_URL` con la URL HTTPS real de la vista previa y mantener `SITE_INDEXABLE=false`. En ese estado las páginas emiten robots sin indexación, `robots.txt` bloquea rastreo y el sitemap no contiene URLs. Esto no restringe el acceso al enlace público. Cambiar URL o indexación exige reconstruir la versión que se publicará.

La [guía de despliegue](docs/deployment.md) incluye la configuración de Seenode, variables y comprobaciones. El [plan de migración](docs/migration-plan.md) separa la revisión de la vista previa del traslado del dominio definitivo. Registrar URL, commit y verificaciones efectivos al completar cada etapa.

## Mantenimiento

Editar desde Git, revisar el diff y ejecutar las comprobaciones antes de desplegar. Confirmar periódicamente contactos, condiciones por sede, enlaces externos y datos de impacto con la comunidad. Mantener el estado vacío del blog si todavía no hay material aprobado. Documentar los cambios de contenido, derechos y procedencia junto con los recursos afectados.

El filesystem del servicio no almacena contenido editorial persistente ni consultas. Una recepción por correo, reservas, CMS o analítica futura necesita una implementación propia y una actualización del flujo de datos y privacidad.
