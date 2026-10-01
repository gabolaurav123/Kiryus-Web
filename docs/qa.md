# Verificación de la implementación

Revisión realizada el 1 de octubre de 2026 sobre el build de producción local de Next.js, servido en `http://localhost:3000`. Los resultados de publicación y la URL final se registrarán después del despliegue.

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

No se obtuvieron mediciones de campo de Core Web Vitals, ni se atribuyen puntuaciones Lighthouse a este sitio. LCP ≤2,5 s, CLS <0,1 e INP <200 ms son objetivos para el seguimiento tras publicar. La revisión de tamaños no sustituye una auditoría completa con lectores de pantalla, zoom del navegador o dispositivos físicos.

## Capturas

Se guardaron seis capturas reales de viewport, fuera del repositorio, en la carpeta de entrega `outputs/screenshots`: inicio, Colombia y participación, cada una en móvil y escritorio. Se conservan como JPEG. La captura completa de una página excedió el tiempo disponible de la API del navegador; las capturas entregadas muestran los capítulos principales y el formulario visible.

## Datos pendientes

- Período de medición de árboles y hectáreas.
- Condiciones, disponibilidad y aportes de participación en cada aldea.
- Respaldo institucional del registro que figuraba en el footer antiguo, omitido de esta versión.
- Artículos reales, autoría y fechas aprobadas para activar el blog.
- Una instrucción específica para trasladar el dominio de producción.
