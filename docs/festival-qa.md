# Verificación de TuConexión 2026

Realizada el 3 de octubre de 2026 sobre el nuevo apartado `/evento` y su integración con Kiryus.

## Comprobaciones completadas

- `pnpm check`: tipos, ESLint, 30 pruebas, build de producción, 14 rutas públicas, redirecciones, páginas inexistentes, metadatos y pruebas HTTP del CRM con persistencia tras reinicio.
- Revisión visual y funcional en Microsoft Edge mediante Playwright, sobre el servidor local de producción, a 1440, 768, 390 y 360 píxeles. Sin desbordamiento horizontal del documento en los tres tamaños menores; la navegación de secciones permite su propio desplazamiento horizontal.
- El programa entrega las 33 actividades en HTML. Sus tres días se despliegan con controles nativos y funcionan también con JavaScript deshabilitado.
- Los siete talleres abren y cierran, muestran actividades y distinguen las seis propuestas VIP de meditación General. Las biografías de ambos facilitadores se despliegan y sus fotografías cargan.
- Los siete enlaces «Adquirir» conservan exactamente el enlace suministrado, incluido `themePreview=12310`, y abren la plataforma externa. No se ejecutó ningún pago ni se afirma haber comprobado el checkout externo.
- El anuncio abre en una carga pública inicial y después de recargar. Cierra por Escape, botón y fondo, libera el bloqueo de desplazamiento y da foco inicialmente a «Ver evento».
- El teclado no enfoca el contenido de fondo mientras el diálogo está abierto. El diálogo nativo permite pasar temporalmente a los controles del navegador.
- «Ver evento» navega a `/evento` y cierra el anuncio. El anuncio no se genera dentro de esa ruta al navegar o recargar, ni en `/admin/login`. Volver al inicio por navegación interna abre el anuncio de nuevo.
- El anuncio no utiliza cookies, localStorage ni sessionStorage para recordar el cierre. El enlace destacado de inicio y la navegación mantienen accesible Evento aun cuando se cierra el anuncio o no se ejecuta JavaScript.
- Las animaciones se verificaron con movimiento normal y con movimiento reducido. El contenido principal se entrega visible desde el servidor; los efectos respetan la preferencia del navegador.
- Sin errores JavaScript de página durante el recorrido automatizado. No se enviaron mensajes ni consultas reales a la organización.

## Evidencia

Capturas locales de portada, programa, protagonistas, entradas, anuncio en móvil y escritorio, información de compra y página completa en `outputs/festival-qa`, fuera del repositorio. Los originales de los retratos y el dosier no forman parte del build.

## Publicación

La autorización existente permite actualizar GitHub y el servicio Seenode `975066`, Basic de US$4/mes. Esta actualización no contrata recursos adicionales.

En la revisión de acceso, el panel Seenode redirigió a login: la sesión de navegador no estaba vigente. No hay un token Seenode configurado en el entorno o en GitHub y la CI actual comprueba el código sin desplegar. La publicación remota de esta revisión requiere renovar esa sesión y desplegar el commit revisado; no se declara completada con las comprobaciones locales.
