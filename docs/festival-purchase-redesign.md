# TuConexión: acceso directo a las entradas

Revisión del 3 de octubre de 2026. La petición es simplificar la página Kiryus `/evento` y hacer evidente cómo adquirir una entrada. La configuración de Fanz queda fuera de esta revisión.

## Presentación

- Portada breve con fecha, lugar, precios y botón «Adquirir entrada».
- Entradas inmediatamente después de la portada. General y VIP explican sus diferencias en una frase y tres puntos; cada opción tiene un botón propio antes del detalle completo.
- Reserva y promoción 5×4 mantienen los valores entregados por la organización. Los enlaces conservan el destino Fanz suministrado, incluido `themePreview=12310`.
- Barra de adquisición fija en escritorio y móvil, con espacio reservado al final del documento. WhatsApp se eleva en esta ruta y ambos controles se ocultan al abrir un diálogo.
- Los tres días del programa, talleres, biografías, logística, condiciones y preguntas están en desplegables nativos inicialmente cerrados. Se conservan las 33 actividades, siete talleres, 15 preguntas y siete condiciones de compra en el HTML.
- Alojamiento incluido, exclusiones y condiciones pendientes de la reserva permanecen visibles junto a las entradas. No se modifican importes ni porcentajes del proveedor.
- Los saltos a secciones reservan espacio para las dos cabeceras. Los efectos respetan movimiento reducido y los controles tienen foco visible.

## Comprobaciones

Tipos, ESLint, 30 pruebas, build de producción, 14 rutas públicas y comprobaciones HTTP del CRM aprobados localmente. El CRM se prueba con datos aislados.

La revisión inicial de navegador pasó de 13.335 a menos de 5.500 píxeles de altura en escritorio y de 19.123 a menos de 6.800 en móvil de 390 píxeles, con el programa cerrado. La revisión detectó y corrigió el contraste de títulos sobre verde y el espacio de los saltos de sección. Las mediciones describen el contenido inicialmente visible, no la longitud al abrir todos los detalles.

La compra se deriva a Fanz. No se efectuaron pedidos ni pagos como parte de esta revisión. Publicar requiere desplegar el commit revisado en el servicio existente `975066`; no se contratan recursos adicionales.

## Actualización de condiciones comerciales

La organización aclaró posteriormente que solo VIP incluye el traslado ida y vuelta entre San Miguel de Tucumán y Aldea Kiryus. Para General continúa como extra de $25.000 ARS por persona. Los seis talleres especiales permanecen incluidos en VIP y se informan por separado a $35.000 ARS cada uno, con cupos e inscripción a consultar. No se inventa inventario para activar ventas de talleres.

La reserva de $20.000 ARS se identifica como pago parcial y no como entrada completa. Se conservan las condiciones pendientes de confirmación, aplicación al valor final, saldo y cancelaciones. Los importes de General, VIP y vouchers no cambian. La actualización comprende tarjetas, detalles, estadía, extras y preguntas frecuentes (ahora 16 preguntas y ocho condiciones).

## Selección del 5×4 en Fanz

Las tarifas grupales 5×4 se presentan por separado de las individuales dentro de General y VIP. Cada tarifa grupal exige seleccionar al menos cinco entradas y aplica la promoción nativa de Fanz; comparte el inventario de su modalidad. Para cinco personas, los valores base son $532.000 en General y $1.476.000 en VIP. Los cargos existentes del proveedor se conservan. La página Kiryus indica ahora elegir expresamente la tarifa grupal y cinco entradas, válidas para los tres días del festival. No se usan Combos ni Ofertas, destinados a combinar eventos diferentes.

La actualización de este texto pasó ESLint y build de producción. La revisión de Fanz comprobó cantidades de cinco y seis sin realizar pedidos ni pagos.
