# Fotografías y marca — inventario de implementación

Consulta y descarga: 1 de octubre de 2026. Se recuperaron originales públicos de Wix eliminando únicamente su tramo de transformación `/v1/…`. No se generaron fotografías ni se amplió artificialmente ningún archivo.

`images-manifest.json` registra URL original, páginas donde aparece, dimensiones, tamaño, texto alternativo, uso sugerido, punto de encuadre y variantes responsivas. Las copias listas para la web están en `public/images`. Los originales y HTML de evidencia permanecen en el inventario de trabajo `work/kiryus-content-assets`, fuera del código que se publica.

## Selección

Se eligieron 17 fotografías y el logo. Se inspeccionaron dos hojas de contacto con `view_image`, además del original de la fotografía panorámica, el logo y el grupo publicado en Colombia.

| Identificador | Uso aconsejado | Dimensiones máximas servidas | Asociación |
| --- | --- | --- | --- |
| comunidad-paisaje | Hero o capítulo territorial | 1280×960 | Página Involúcrate; lugar específico pendiente |
| comunidad-grupo | Hero dividido o galería | 960×1280 | Inicio; lugar específico pendiente |
| comunidad-circulo | Nosotros y capítulo humano | 1280×960 | Nosotros; lugar específico pendiente |
| comunidad-colaboracion | Participación | 960×477 | Involúcrate; lugar específico pendiente |
| comunidad-jardin | Detalle de prácticas | 540×540 | Inicio; lugar específico pendiente |
| comunidad-actividad | Galería documental | 960×1280 | Inicio; lugar específico pendiente |
| comunidad-interior | Galería general | 1600×900 | Inicio/Involúcrate; no atribuir alojamiento a sede |
| comunidad-encuentro | Galería y participación | 1200×1600 | Involúcrate; lugar específico pendiente |
| comunidad-amanecer | Galería documental | 1200×1600 | Involúcrate; lugar específico pendiente |
| argentina-actividad | Hero o ficha de Argentina | 900×976 | Publicada en la página Argentina |
| argentina-mesa | Galería de Argentina | 1200×1600 | Publicada en la página Argentina |
| colombia-comunidad | Hero o ficha de Colombia | 1200×1330 | Publicada en la página Colombia |
| colombia-encuentro | Galería de Colombia | 900×900 | Publicada en la página Colombia |
| colombia-paisaje | Paisaje de Colombia en módulo pequeño | 719×719 | Publicada en la página Colombia |
| espana-convivencia | Hero y apartado de legado de España | 1600×1600 | Publicada en la página histórica de España |
| espana-encuentro | Galería del legado de España | 1600×1600 | Publicada en la página histórica de España |
| espana-cultivo | Prácticas históricas y galería del legado | 900×1112 | Publicada en la página histórica de España |

La asociación por sede reproduce la selección editorial de Kiryus en esa página. No acredita por sí sola coordenadas, fecha, propiedad de la finca ni identidad de las personas. Los textos alternativos describen lo visible, sin asignar nombres o prometer resultados de las actividades.

## Marca

El original del header es un PNG 2495×791 blanco con transparencia. La variante recuperada del footer conserva el mismo símbolo y composición en blanco/gris; no se encontró en estas páginas una variante verde original de mayor resolución.

`logo-kiryus-white.png` conserva la geometría y transparencia. Se recortó únicamente el margen alfa vacío y se redujo a 1200×577. No se redibujó el símbolo ni se cambió la tipografía. Usarlo sobre verde profundo; si la interfaz necesita una marca de otro color, un tratamiento CSS del mismo raster puede conservar su contorno. Mantener su proporción, sin estirar.

## Transformaciones y carga

- WebP con Pillow, calidad 82, método 6; tamaños 480, 960 y hasta 1600 px cuando el original los permite.
- Las variantes nunca superan la anchura original. No se aplicaron filtros, retoques ni generación.
- Fotografías sin recorte persistente; el encuadre final pertenece a la composición. Consultar `cropPosition` y proteger rostros, grupos y puntos de interés.
- Reservar `width` y `height`; usar `sizes` según el diseño. Hero prioritario; galerías diferidas.
- Los 17 archivos principales y el logo suman aproximadamente 4,7 MB en disco. Las variantes responsivas evitan cargar la suma de todos los originales en el inicio.
- Un archivo de 719 px debe ocupar un módulo pequeño; no utilizarlo como hero a ancho completo.

## Recursos excluidos

Las imágenes de las tres tarjetas de sede del inicio son banderas nacionales, no fotografías del territorio. Quedaron excluidas de la nueva selección documental. También se omitieron dos encuadres duplicados de fotos incluidas y una imagen aérea de 240×266 que no permite construir un mapa fiable.

Los iconos sociales y de ODS no se incorporaron como fotografías. Algunos nombres de archivo de ODS no coinciden con lo que representa el píxel; la nueva relación entre número y tema está documentada con la fuente primaria en `content-audit.md`.

## Derechos

El material pertenece a sus respectivos titulares y se reutiliza para la web de Comunidad Kiryus conforme a este encargo. Su publicación en el sitio original no concede una licencia general a terceros. Mantener los derechos del logo y de las fotografías separados de cualquier licencia que se elija para el código. Autoría, fechas y licencias particulares de cada fotografía siguen pendientes de documentación.

## Tipografía

La implementación usa Fraunces Variable y Manrope Variable desde sus paquetes locales de Fontsource. Se revisaron los archivos `LICENSE` instalados: ambas fuentes se distribuyen bajo SIL Open Font License 1.1. Las copias de esos avisos y licencias se conservan en `docs/licenses/Fraunces-OFL.txt` y `docs/licenses/Manrope-OFL.txt`, separadas de los derechos del logo, fotografías y código. No se alteraron los binarios de las fuentes.
