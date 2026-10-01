# Consultas y panel administrativo

El CRM registra solo consultas enviadas desde el formulario con consentimiento explícito. El visitante puede revisar su consulta antes de enviarla y, después, abrir WhatsApp si lo desea. No se envían mensajes, correos ni notificaciones automáticamente.

## Activación y almacenamiento

El backend usa `node:sqlite` de Node 24, sin servicio externo ni dependencia nativa adicional. SQLite se ejecuta en WAL, `synchronous=FULL`, consultas parametrizadas y una sola réplica del servidor. La documentación oficial presenta las API como síncronas y SQLite como release candidate en versiones recientes de Node 24: [SQLite](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html). Este diseño sirve para el tráfico inicial; requiere revisar arquitectura y capacidad antes de aumentar réplicas o volumen significativo.

La producción solo se activa cuando están presentes todas estas variables:

```dotenv
CRM_DATA_DIR=/ruta/absoluta/del/volumen/persistente
CRM_ADMIN_EMAIL=correo-del-responsable@example.org
CRM_ADMIN_PASSWORD_HASH=scrypt$16384$8$1$...
NEXT_PUBLIC_SITE_URL=https://kiryus-web.seenode.app
```

`CRM_DATA_DIR` debe estar en un volumen persistente del hosting, fuera de la carpeta pública y del código, conservarse al reiniciar y desplegar y ser accesible únicamente al proceso. No apuntar a `/tmp`, al filesystem efímero del contenedor ni al repositorio. La aplicación exige una ruta absoluta y no usa una alternativa efímera en producción; el operador debe verificar que la ruta corresponda al volumen real. En desarrollo, con credenciales configuradas, la ruta por defecto es `.crm-data/` (debe estar excluida de Git).

Si falta la configuración, las API devuelven `503`, no guardan datos y la web conserva el contacto por WhatsApp. Crear el volumen puede generar un coste adicional: no activar mientras no esté autorizado y verificado su importe. No publicar una base de datos, copias, variables privadas ni credenciales en GitHub.

Genera el hash desde una terminal local interactiva:

```sh
node scripts/hash-crm-password.mjs
```

El script pide una contraseña oculta de 14 a 256 caracteres y muestra solo el hash con salt aleatorio. Introducir ese hash como variable privada del hosting; conservar la contraseña en el gestor de contraseñas del responsable. No pasar contraseñas como argumentos ni guardar texto plano en el repositorio. El algoritmo usa scrypt N=16384, r=8, p=1 y comparación de longitud fija: [Node Crypto](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html).

## Seguridad y uso

- Un administrador configurado por entorno; no hay registro público ni credenciales predeterminadas.
- Sesión aleatoria de 256 bits guardada como hash SHA-256, caduca en ocho horas, cookie `HttpOnly`, `SameSite=Strict`, `Secure` en producción. Cambiar correo o hash de contraseña invalida las sesiones existentes. Cerrar sesión elimina su registro.
- `/api/admin/*` exige sesión incluso si se conoce un ID; `POST`, `PATCH` y `DELETE` exigen el `Origin` público exacto. No se habilita CORS. Las respuestas son privadas, `no-store` y `noindex`.
- El formulario público valida de nuevo todos los datos en el servidor, limita tamaño y tipo JSON, exige consentimiento, descarta el honeypot y utiliza una clave UUID v4 para impedir duplicados en reintentos. La misma clave con otro contenido devuelve conflicto.
- Los límites de frecuencia se guardan en SQLite. Hay límites globales, de red y de correo, incluidos los intentos de acceso. Las claves de límite son HMAC con salt interno y no guardan direcciones IP ni correos en texto plano.
- Por defecto se ignoran los encabezados de IP de proxy: toda la web comparte un límite de red conservador de 30 intentos de consulta/hora y cinco intentos de inicio de sesión/15 minutos. Los envíos inválidos también consumen el límite. Solo establecer `CRM_TRUST_PROXY_HEADERS=true` cuando el proveedor haya confirmado que sobrescribe `X-Forwarded-For` recibido del cliente. Con esa opción el límite es de 12 intentos de consulta/hora y cinco intentos de acceso/15 minutos por IP; el global y el de correo siguen activos frente a intentos de evasión. Los reintentos idénticos de una consulta ya guardada no consumen el límite de correo, pero siguen sujetos al control global y de red.
- La exportación CSV solo existe en el panel autenticado, incluye los filtros y neutraliza prefijos de fórmulas, comillas y saltos de línea. Tiene un máximo de 10000 consultas por exportación. Un CSV exportado contiene datos personales y requiere el mismo cuidado que la base de datos.
- Las notas son internas y de texto plano, hasta 8000 caracteres. Estados: `nuevo`, `contactado`, `en_conversacion`, `cerrado`. La búsqueda incluye nombre, apellido, correo, teléfono y mensaje; la lista pagina en grupos de 25.

## API

`POST /api/leads`: campos de participación más `consent:true`, `website:""` y `idempotencyKey:crypto.randomUUID()`. Responde `201` con `{id,createdAt,replayed:false}`, o `200` con `replayed:true` para un reintento idéntico. Validación `400` con `{error,errors}`; conflicto `409`; límite `429`; configuración o persistencia no disponible `503`. El honeypot ocupado recibe `202` genérico sin registrar una consulta.

`POST /api/admin/login` recibe `{email,password}`; `POST /api/admin/logout` cierra sesión; `GET /api/admin/session` devuelve `{email,expiresAt}`. `GET /api/admin/leads` admite `q`, `status`, `village`, `interest`, `page` y devuelve `{leads,total,page,pageSize,stats}`; las estadísticas son globales. `GET /api/admin/leads/:id` devuelve `{lead}`; `PATCH` admite `{status,notes}`; `DELETE` elimina la consulta de la base activa. `GET /api/admin/export.csv` exporta los filtros actuales. Todos estos endpoints administrativos están protegidos.

## Operación y conservación

Antes de activar: probar consentimiento, envío, reintento, acceso privado y exportación con consultas de prueba; eliminar esas consultas; reiniciar y desplegar para verificar la persistencia del volumen. Confirmar que los endpoints privados no son accesibles sin sesión. No registrar payloads ni contraseñas en los logs.

El responsable debe decidir y comunicar un plazo de conservación de consultas, revisar las consultas cerradas y atender solicitudes de eliminación. La eliminación retira la fila de la base activa (`secure_delete=ON`); las copias anteriores, WAL y backups requieren su propio ciclo de conservación. El código no promete una eliminación forense ni gestiona automáticamente las copias del proveedor.

Mantener backups cifrados con acceso limitado. Para copiar SQLite activa usar su API de backup o detener temporalmente la aplicación y copiar la base junto a sus archivos `-wal` y `-shm`, nunca solo el archivo principal mientras sigue escribiendo. Probar una restauración antes de confiar en el procedimiento. Los backups son responsabilidad del operador; este despliegue no agrega servicios de backup de pago sin autorización.

Las pruebas en `tests/crm.test.ts` verifican persistencia entre conexiones, consentimiento, idempotencia, filtros, cambio de estado, notas, eliminación, CSV, scrypt, sesiones, rotación, límites persistentes, control de origen y límites JSON. Usan bases temporales aisladas y no datos reales.
