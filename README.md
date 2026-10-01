# Comunidad Kiryus

Web de Comunidad Kiryus construida con React, Next.js App Router y TypeScript. Presenta las dos aldeas actuales en Argentina y Colombia, el legado histórico de España y las formas de participar. Incluye un CRM privado para consultas, preparado para activarse con almacenamiento persistente y credenciales. El contenido y las fotografías proceden del sitio existente; la evidencia y los datos pendientes se registran en `docs/`.

## Estado de publicación

| Elemento | Estado que debe verificarse |
| --- | --- |
| Destino solicitado en GitHub | [gabolaurav123/Kiryus-Web](https://github.com/gabolaurav123/Kiryus-Web); rama `main` publicada |
| Servicio de vista previa en Seenode | [kiryus-web.seenode.app](https://kiryus-web.seenode.app), servicio `975066`, Basic (512 MB), US$4/mes |
| Versión publicada | Rama `main`; consultar el historial y la ejecución de CI correspondiente. Correcciones territoriales y CRM documentados en `docs/qa.md`. |
| Dominio actual | `https://www.comunidadkiryus.org/`; sin migración de DNS en esta entrega |

El servicio independiente fue creado y el primer build y arranque remoto finalizaron correctamente. Se reconstruyó con la URL HTTPS asignada y se verificaron los canonical, noindex, rutas y formulario en la web pública. Resultados completos en [qa.md](docs/qa.md). La configuración inicial mantiene la vista previa fuera de los índices de búsqueda.

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

`check` ejecuta tipos, lint, pruebas, build y comprobaciones HTTP de rutas y CRM. También están disponibles `typecheck`, `lint`, `test` y `build` por separado. La revisión actual aprobó instalación congelada, tipos, lint, 30 pruebas, build, rutas y CRM HTTP con reinicio local. La CI repite estas comprobaciones en [GitHub Actions](https://github.com/gabolaurav123/Kiryus-Web/actions). El servidor escucha en `0.0.0.0`, utiliza `PORT` y adopta 3000 si la variable no está definida.

## Páginas y participación

Las rutas principales son `/`, `/nosotros`, `/aldeas`, `/aldeas/argentina`, `/aldeas/colombia`, `/legado/espana`, `/involucrate`, `/blog`, `/contacto` y `/privacidad`. España no aparece como aldea ni como opción del formulario. `/aldeas/espana` y las rutas antiguas españolas redirigen permanentemente al legado. El acceso administrativo es `/admin/login`; `/admin` exige una sesión válida.

El formulario ofrece visita, voluntariado, estadía y colaboración. Valida los datos, prepara un mensaje y muestra una revisión antes de abrir WhatsApp. La persona debe enviarlo dentro de WhatsApp; abrir el enlace o copiar el mensaje no crea una solicitud recibida ni una reserva. Las fechas son orientativas y la disponibilidad se coordina con la comunidad.

Mientras el CRM esté desactivado, los campos permanecen en la memoria de la página y solo preparan el mensaje para WhatsApp. Una vez activado, el visitante revisa su consulta y debe aceptar expresamente guardar sus datos para contacto antes de enviarla. La recepción se confirma solo después de guardarla en el servidor, con una referencia real. WhatsApp permanece disponible como alternativa. No hay envío automático de mensajes o correos; no se reutiliza el antiguo Google Forms.

El CRM permite buscar y filtrar por estado, aldea e interés, consultar contactos y mensajes, guardar notas internas, cambiar el estado, exportar CSV y eliminar consultas con confirmación. La configuración y operación están en [crm.md](docs/crm.md). `pnpm test:crm` prueba las API reales de producción con una base temporal aislada, incluyendo un reinicio; no usa datos reales ni servicios externos.

Los enlaces `/involucrate?interes=voluntariado&aldea=colombia` pueden preseleccionar motivo y sede. Los valores válidos y las reglas del mensaje están centralizados en `src/lib/participation.ts`; el número y los perfiles oficiales, en `src/lib/config.ts`. Si cambia el flujo, actualizar también la información visible de privacidad.

## Contenido e imágenes

| Ubicación | Función |
| --- | --- |
| `src/app/` | Páginas, metadatos, robots y sitemap |
| `src/components/` | Navegación, fotografías, secciones y formulario |
| `src/content/villages.ts` | Datos de las dos aldeas actuales y opciones de participación |
| `src/content/legacy.ts` | Legado histórico de España |
| `src/lib/crm/` | Persistencia, autenticación y contratos del CRM |
| `src/components/admin/` | Acceso y panel de seguimiento |
| `src/content/images.ts` | Selección de fotografías por identificador del inventario |
| `public/images/` | Fotografías, marca y recursos servidos localmente |
| `src/content/articles/` | Material editorial MDX |
| `src/lib/articles.ts` | Adaptador tipado que entrega solo artículos publicados |
| `tests/` | Pruebas de artículos y preparación de consultas |

El blog mantiene un estado vacío hasta disponer de artículos reales. `borrador-editorial.mdx` tiene `status: draft`: no aparece en el listado, la búsqueda, las recomendaciones ni el sitemap y no tiene página pública. No cambiarlo a publicado con autoría, fechas o historias de ejemplo. Cada publicación o cambio de slug necesita un nuevo build.

Las fotografías documentales están inventariadas con sus fuentes, dimensiones y texto alternativo. Evitar atribuir una imagen general a una sede sin evidencia. Los derechos de fotografías y logo pertenecen a sus respectivos titulares y son independientes de cualquier licencia del código.

Consultar la [guía editorial](docs/editorial-guide.md), la [auditoría de contenido](docs/content-audit.md) y el [inventario de imágenes](docs/images.md) antes de modificar contenido. `docs/content-sources.json` e `images-manifest.json` conservan los registros estructurados.

## Vista previa y despliegue

La CI de GitHub utiliza Node.js 24 y pnpm 11.19.0, instala con lockfile congelado y ejecuta tipos, lint, pruebas, build y rutas HTTP. No despliega el sitio. La ruta prevista es GitHub → servicio web Node 24 en Seenode, con:

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

El contenido editorial permanece en Git. Las consultas del CRM deben guardarse exclusivamente en un volumen persistente separado, con una sola réplica. Sin esa configuración no se reciben datos en el servidor. El servicio actual cuesta US$4/mes; un volumen de 5 GB añade US$2,50/mes y requiere ampliar el límite autorizado a US$6,50/mes antes de contratarlo. No hay credenciales administrativas predeterminadas ni públicas.
