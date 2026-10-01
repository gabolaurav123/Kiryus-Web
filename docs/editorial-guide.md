# Guía editorial y mantenimiento

Esta guía explica cómo cambiar el contenido de la web sin presentar borradores o datos pendientes como información confirmada. La evidencia de partida está en `content-audit.md`, `content-sources.json` e `images-manifest.json`.

## Revisar una afirmación

Registrar la fuente, la fecha de consulta, el texto que respalda la afirmación y el alcance de ese respaldo. Un dato publicado por Kiryus se puede atribuir a la comunidad; no se convierte por ello en una medición auditada, una certificación o un aval institucional.

Las dos aldeas actuales, Argentina y Colombia, tienen etapas y condiciones diferentes. España forma parte del legado histórico y no ofrece visitas, estadías ni voluntariado a través de esta web. La capacidad comunicada de una sede no equivale a plazas disponibles. No añadir precios, responsables, calendarios, coordenadas exactas, condiciones de alojamiento o resultados ambientales sin confirmación. Las métricas necesitan período, método y alcance antes de describirse como resultados medidos. Mantener pendientes los datos legales y de Fundación Nueva Humanidad hasta contar con documentación.

Los mapas enlazan búsquedas de localidad. No presentarlos como indicaciones precisas de llegada a la finca. Las consultas de participación sirven para coordinar; el sitio no confirma reservas ni tiempos de respuesta.

## Dónde editar

| Contenido | Archivo o carpeta |
| --- | --- |
| Datos y relato de las sedes | `src/content/villages.ts` |
| Aportación histórica de España | `src/content/legacy.ts` y `src/app/legado/espana/page.tsx` |
| Textos de Inicio, Nosotros, Contacto y Privacidad | Sus páginas en `src/app/` y las secciones que utilizan |
| Número y canales oficiales | `src/lib/config.ts` |
| Opciones, preselección y mensaje de participación | `src/lib/participation.ts` |
| Presentación del formulario | `src/components/sections/ParticipationForm.tsx` |
| Selección de imágenes | `src/content/images.ts` y `docs/images-manifest.json` |
| Artículos | `src/content/articles/*.mdx` |
| Metadatos comunes | `src/lib/metadata.ts` y `src/app/layout.tsx` |

Al cambiar los contactos, comprobar también los enlaces visibles y el mensaje preparado. No sustituir el flujo de WhatsApp por una confirmación de envío si no existe un servicio que reciba la consulta. Actualizar Privacidad cuando cambie almacenamiento, proveedores, analítica o recepción de datos.

## Preparar un artículo

Crear un archivo con nombre `slug-del-articulo.mdx`. El slug utiliza minúsculas sin tildes, números y guiones simples, y debe coincidir exactamente con el nombre del archivo. Copiar la estructura de `borrador-editorial.mdx` manteniendo `status: draft`.

```mdx
---
slug: slug-del-articulo
title: "Título pendiente de revisión"
summary: "Resumen pendiente de revisión"
category: vida-comunitaria
author:
  name: "Autoría pendiente de confirmar"
  type: Person
date: "YYYY-MM-DD"
status: draft
---

## Primer apartado

Material de trabajo pendiente de revisión editorial.
```

El ejemplo es un borrador, no un artículo listo para publicar. Reemplazar cada marcador con información real. La fecha de creación de una plantilla no es la fecha de publicación de la historia.

| Campo | Regla al publicar |
| --- | --- |
| `slug` | Coincide con el filename y permanece estable cuando sea posible |
| `title`, `summary` | Texto revisado y fiel al cuerpo del artículo |
| `category` | `naturaleza`, `practicas-sostenibles` o `vida-comunitaria` |
| `author.name` | Nombre real de la persona u organización autora, confirmado |
| `author.type` | `Person` u `Organization`, según la autoría real |
| `date` | Fecha real, válida y entre comillas: `"YYYY-MM-DD"` |
| `status` | `draft` durante la preparación; `published` tras la revisión |
| `updatedAt` | Opcional; fecha real de modificación que no preceda a `date` |
| `aldea` | Opcional; `argentina` o `colombia`, si la relación está confirmada |
| `legacy` | Opcional; `espana`, para una relación confirmada con el legado histórico |
| `cover` | Opcional; objeto con `src`, `alt`, `width` y `height` |

La portada debe existir dentro de `public/images/`; `src` utiliza `/images/nombre-del-archivo.webp`. Indicar las dimensiones reales del archivo servido y un texto alternativo descriptivo. El adaptador verifica el formato del frontmatter; la revisión editorial debe comprobar que el recurso existe, corresponde al artículo y tiene permiso de uso.

Empezar el cuerpo con `##`, porque la página ya presenta el título como H1. Usar párrafos claros, subtítulos, listas cuando ayuden y enlaces a fuentes identificables. Evitar titulares que prometan resultados que el cuerpo no demuestra. Confirmar identidad, consentimiento y contexto antes de publicar testimonios o nombres de personas.

## Borradores y MDX

El adaptador de `src/lib/articles.ts` entrega únicamente contenido `published`. Los borradores no se compilan como páginas, no aparecen en el listado, filtros, relacionados o sitemap y sus URLs devuelven 404. La búsqueda y las categorías se muestran cuando hay artículos publicados; buscan en título, resumen y categoría con un formulario GET.

Este estado no proporciona confidencialidad al archivo: los borradores forman parte del repositorio y pueden ser visibles a quienes tengan acceso a él. No incluir secretos ni datos personales innecesarios en ningún archivo editorial.

MDX es material editorial confiable revisado en Git. Esta implementación bloquea expresiones JavaScript y no admite fuentes de visitantes o URLs remotas como entrada de compilación. Escribir contenido Markdown; no añadir imports, código ejecutable ni HTML de servicios externos. Un futuro CMS debe mantener el contrato tipado, el filtro de borradores y esa frontera de confianza.

## Fotografías y marca

Consultar `images.md` para el inventario actual y las transformaciones aplicadas. Al incorporar una fotografía:

1. Documentar fuente, autoría, contexto, permiso y sede cuando se conozcan. No deducir lugar, fecha o identidad del nombre del archivo.
2. Conservar el original de trabajo fuera de los recursos públicos y preparar una copia para `public/images/` con dimensiones adecuadas. Evitar ampliar una foto de baja resolución.
3. Registrar en `images-manifest.json` un identificador estable, URL de origen, `publicPath`, dimensiones, tamaño, texto alternativo y encuadre. Mantener el formato del inventario existente.
4. Seleccionarla en `src/content/images.ts` o referenciarla en la portada del artículo. Revisar la imagen en móvil y escritorio, rostros y puntos de interés.

Describir lo visible en el texto alternativo. Una fotografía publicada en la página de una sede acredita esa asociación editorial, no coordenadas, fecha o propiedad de la finca. Las fotografías generales siguen sin atribución territorial específica mientras no exista confirmación.

`Photo` utiliza Next Image con dimensiones reservadas, `sizes` y precarga opcional. Mantener la precarga para recursos prioritarios de la primera pantalla; las galerías no la necesitan. Las portadas de artículos también reservan dimensiones. No estirar el logo ni cambiar su geometría. La licencia del código no concede derechos sobre el logo o las fotografías.

## Revisar y publicar

1. Confirmar contenido, autoría, fuentes, fechas, enlaces, recursos y permiso de publicación.
2. Cambiar a `status: published` solo cuando el artículo esté aprobado.
3. Ejecutar `npx --yes pnpm@11.19.0 check` con Node.js 24.
4. Revisar la página, portada, categorías, búsqueda, relacionados y metadatos en la vista previa. Mantener `SITE_INDEXABLE=false` para esa revisión.
5. Registrar el commit y desplegarlo según `deployment.md`. La CI por sí sola no publica.

Las rutas de artículos se generan durante el build. Altas, retiradas y cambios de slug necesitan reconstrucción. Si se cambia un slug publicado, preparar una redirección permanente hacia el nuevo; si se retira sin reemplazo, revisar enlaces y conservar una respuesta 404 adecuada. No redirigir automáticamente toda ruta desconocida al inicio.

Los metadatos de lectura y `BlogPosting` se forman con el frontmatter. Su presencia no acredita autoría o resultados: depende de la exactitud editorial. Cambiar `NEXT_PUBLIC_SITE_URL` o `SITE_INDEXABLE` también requiere reconstrucción para que URL, canonical, robots y sitemap correspondan al entorno correcto.

## Revisión periódica

Tras un cambio, registrar qué se revisó, el entorno y el commit. Revisar contactos y enlaces externos; confirmar con la comunidad la vigencia de sedes, condiciones y datos de impacto. Mantener el lockfile y las versiones de Node/pnpm acordadas al actualizar dependencias, ejecutar las comprobaciones y revisar el resultado visual. Si todavía no hay historias reales aprobadas, conservar el blog vacío.
