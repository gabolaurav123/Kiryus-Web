# Restauración de fotografías y entrega adaptable

Auditoría de partida: 1 de octubre de 2026. Este documento distingue las fotografías documentales recuperadas de Kiryus de cualquier derivado mejorado mediante IA. Las medidas de la tabla se contrastaron con los archivos reales usando Sharp; no son resoluciones supuestas.

## Diagnóstico del material actual

| Fotografía | Archivo público | Dimensiones reales | Peso WebP | Uso observado |
| --- | --- | --- | --- | --- |
| Amanecer | `/images/comunidad-amanecer.webp` | 1200 × 1600 | 367.210 bytes | Hero de Inicio y Regeneración |
| Paisaje | `/images/comunidad-paisaje.webp` | 1280 × 960 | 233.630 bytes | Hero de Red; alternativa horizontal para Inicio |
| Colaboración | `/images/comunidad-colaboracion.webp` | 960 × 477 | 108.958 bytes | Hero de Nosotros |
| Círculo | `/images/comunidad-circulo.webp` | 1280 × 960 | 257.198 bytes | Hero de Vida en comunidad y tarjeta de Inicio |
| Grupo | `/images/comunidad-grupo.webp` | 960 × 1280 | 242.832 bytes | Miniatura de Inicio y galería |
| Argentina | `/images/argentina-actividad.webp` | 900 × 976 | 177.752 bytes | Tarjeta y hero de Argentina |
| Colombia | `/images/colombia-comunidad.webp` | 1200 × 1330 | 382.422 bytes | Tarjeta y hero de Colombia |

Los originales tienen las mismas dimensiones que estas versiones. Por tanto, una URL de Next Image que solicite un ancho de 1920 no demuestra que el archivo tenga detalle real de 1920 píxeles.

La fotografía Amanecer es vertical, de relación 3:4. Inicio utiliza un marco de alrededor de 1400 × 660 píxeles CSS en escritorio, más una capa de movimiento con 48 píxeles de margen vertical, 8 de margen horizontal y escala máxima de 1,06. `object-fit: cover` recorta gran parte de la imagen: en este ejemplo, el alto visible del original dentro del hero queda aproximadamente en un tercio. El recorte depende del viewport y del estado del movimiento. Aumentar la resolución o la calidad de compresión no recupera el contenido que el encuadre descarta.

Paisaje ya es horizontal, de relación 4:3, y conserva bastante más contexto en el mismo marco. Debe priorizarse una fuente horizontal para el hero de escritorio. Amanecer puede conservarse como imagen vertical, galería o hero que muestre una composición deliberadamente más alta. No ampliar lateralmente el territorio mediante generación para forzar una panorámica documental.

## Separar original y derivado

- Mantener intactos los archivos originales, sus WebP actuales, identificadores, dimensiones, procedencia y asociación territorial en `images-manifest.json`.
- Crear un identificador y archivo nuevos para cada restauración. Ejemplo de nombre, pendiente del resultado final: `comunidad-paisaje-restaurada.webp`.
- Registrar el derivado por separado con su `sourceAssetId`, URL de procedencia de la fotografía base, herramienta, instrucción exacta, dimensiones reales de salida, bytes, encuadre, transformaciones de exportación y nota de revisión visual.
- Presentarlo como una versión restaurada con IA a partir de una fotografía real, nunca como una nueva captura original ni como evidencia de una ubicación, fecha o actividad nueva. Conservar la localización sin confirmar de las fotografías generales.
- Preferir el derivado revisado para el hero y conservar la fuente documental en la galería. No reemplazar automáticamente todos los usos de `getImage` por una versión generada.

Las pruebas actuales de integridad comprueban que los originales no se amplían y que sus dimensiones corresponden a los archivos. Deben conservar ese contrato. Las pruebas de derivados pueden comprobar existencia, dimensiones reales, identificación de la fuente y metadatos de restauración; no deben debilitar la comprobación de originales ni declarar como detalle capturado los píxeles estimados por IA.

## Invariantes para la restauración

Instrucción de referencia; guardar debajo la instrucción exacta utilizada cuando exista un resultado:

> Restaura esta fotografía existente. Reduce compresión y ruido con moderación; mejora la claridad y conserva un aspecto fotográfico natural. Mantén la composición, la relación de aspecto, la perspectiva, las personas y sus identidades, vestuario, poses, objetos, construcciones, vegetación, cielo, iluminación y colores reconocibles. No añadas ni elimines personas, objetos, edificios o paisaje. No extiendas el encuadre. No inventes texto ilegible ni reconstruyas rasgos que la fotografía no permite distinguir. No cambies la escena ni la conviertas en ilustración. Conserva la textura y las pequeñas imperfecciones de una fotografía real; evita halos, piel artificial y nitidez excesiva.

Comparar el resultado con el original a tamaño completo y con el recorte usado en escritorio y móvil. Una salida con caras alteradas, objetos nuevos, construcciones modificadas, texto inventado o extensión de paisaje debe descartarse o revisarse antes de utilizarse. La instrucción por sí sola no garantiza que el modelo respete cada detalle.

## Next Image en la versión instalada

Documentación local revisada: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, Next 16.3.8. También se revisó `dist/server/image-optimizer.js` para contrastar la operación efectiva.

- `quality` por defecto es **75**. `qualities` por defecto permite únicamente **[75]**.
- Para servir `quality={85}` hay que incluir **`images.qualities: [75, 85]`** en `next.config.ts`. Un `quality` de componente fuera de la lista se ajusta al valor permitido más cercano; una petición directa al optimizador con un `q` no permitido devuelve 400.
- Una calidad mayor aumenta el tamaño y puede preservar más detalle de la fuente; no mejora una fuente que ya era borrosa o de baja resolución. Seleccionar 85 para los heroes revisados y mantener 75 para tarjetas y miniaturas ofrece una decisión acotada, que debe confirmarse visualmente.
- La optimización por ancho usa Sharp con `withoutEnlargement: true`. Los `srcset` de anchos grandes no deben confundirse con ampliación real de los archivos pequeños.
- Los tamaños de dispositivo predeterminados son `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]`; los pequeños son `[32, 48, 64, 96, 128, 256, 384]`. El navegador elige según `sizes`, DPR y condiciones del dispositivo.
- AVIF y WebP se negocian con `Accept`. La configuración actual prioriza AVIF; Next convierte la calidad AVIF mediante su propia escala y no aplica literalmente el mismo valor que WebP. Comparar visualmente ambos formatos cuando proceda.

`sizes="100vw"` es apropiado para un hero casi de ancho completo. Para las dos tarjetas de aldeas, declarar 100vw en móvil y 50vw en escritorio. La miniatura de Inicio declara actualmente 160px aunque su caja mide 80px en escritorio y 49–65px en móvil; una declaración acorde al CSS puede evitar recursos innecesariamente grandes: `(max-width: 700px) 49px, (max-width: 1100px) 65px, 80px`. Mantener el preload limitado al hero que puede convertirse en LCP; las imágenes inferiores y la galería permanecen diferidas.

Si un derivado conserva formato horizontal, comprobar también el recorte de móvil. Puede utilizarse dirección de arte con `getImageProps()` y `<picture>` para una variante vertical obtenida por recorte del mismo material, sin inventar contenido fuera de la fotografía. Registrar los dos encuadres. No aumentar el número de variantes o las calidades permitidas sin una necesidad concreta.

## Registro de las restauraciones

El agente principal generó dos restauraciones con **Built-in ImageGen**. Las instrucciones exactas se conservan en `image-enhancement-prompts.json` y se reproducen en `enhanced-images-manifest.json`, junto con las fuentes, dimensiones, pesos, hashes y exportación. Los archivos de `.codex/generated_images` permanecen intactos. Se copiaron sus maestros PNG sin cambios a `outputs/images/`, fuera del repositorio de la web.

| Derivado | Fotografía base | Maestro nativo | Peso PNG | Archivo público | Peso WebP |
| --- | --- | --- | --- | --- | --- |
| Paisaje restaurado | `comunidad-paisaje`, 1280 × 960 | **1448 × 1086** | 3.278.022 bytes | `/images/comunidad-paisaje-restaurada.webp` | 663.840 bytes |
| Amanecer restaurado | `comunidad-amanecer`, 1200 × 1600 | **1086 × 1448** | 3.217.413 bytes | `/images/comunidad-amanecer-restaurada.webp` | 646.050 bytes |

Estas son las dimensiones reales devueltas por la herramienta, medidas con Sharp. Aunque las instrucciones solicitaron idealmente una resolución mayor, las salidas **no son 4K**. Paisaje tiene más píxeles que su base; Amanecer tiene menos. La mejora buscada es de apariencia, claridad y restauración, no una afirmación de resolución capturada ni de recuperación exacta de detalle original.

Fuentes de las fotografías base:

- Paisaje: `originals/comunidad-paisaje.jpg`, [original público de Kiryus](https://static.wixstatic.com/media/12f587_eb829d00338e471bb261aed6b509d2e3~mv2.jpg).
- Amanecer: `originals/comunidad-amanecer.jpg`, [original público de Kiryus](https://static.wixstatic.com/media/12f587_1e1b5f16710344b3b08e029a5e42cde6~mv2.jpg).

Los originales forman parte del inventario de trabajo `work/kiryus-content-assets`. Ambos son material general del sitio, sin ubicación específica confirmada. La restauración no cambia esa clasificación.

La exportación pública utiliza **Sharp WebP, quality 92, effort 6**, sin `resize` ni ampliación. El maestro copiado tiene el mismo SHA-256 que el archivo generado en `.codex`; se comprobó que la exportación mantiene el ancho y el alto del maestro. Las fotografías documentales previas y su manifiesto no se modificaron.

`src/content/enhanced-images.ts` exporta `enhancedLandscape` y `enhancedDawn` a partir del manifiesto separado. Paisaje se utiliza en Inicio de escritorio y Red; Amanecer en Inicio móvil y Regeneración. Inicio usa `getImageProps()` y `<picture>` con un cambio a los 700 px: cada dispositivo descarga la composición adecuada, con preload condicionado por media, carga inmediata y prioridad alta. El encuadre de Inicio es 50% 65%; los heroes editoriales respetan la posición registrada en el manifiesto.

Revisión visual del agente principal: personas, vestuario, objetos y territorio general siguen siendo reconocibles al comparar con las bases. El detalle fino fue reconstruido mediante IA; no se afirma exactitud de microdetalle. Los textos alternativos identifican las imágenes como versiones restauradas con IA.

Verificación local: recortes de Inicio revisados visualmente en escritorio y móvil de 390 × 844, sin desbordamiento horizontal. El navegador seleccionó Paisaje en escritorio y Amanecer en móvil, ambos con `q=85`; Next conserva dimensiones nativas máximas. Logos SVG de Instagram, TikTok y WhatsApp revisados en Contacto; botón flotante de 60 px en escritorio y 54 px en móvil, oculto con el menú abierto y en administración. Las 30 pruebas existentes, compilación de producción, 13 páginas públicas, redirecciones y pruebas HTTP del CRM pasaron tras la integración inicial. La publicación y sus capturas se verifican por separado.
