import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { directWhatsapp } from "@/lib/config";
export const metadata = pageMetadata(
  "Privacidad",
  "Cómo funciona el formulario de consulta, qué datos se utilizan y cuándo se abren los canales externos de Comunidad Kiryus.",
  "/privacidad",
);
export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">Información / Privacidad</p>
        <h1>
          Tu consulta,
          <br />
          <em>con claridad.</em>
        </h1>
        <p className="page-hero-intro">
          Información sobre el funcionamiento de esta web y sus canales de
          contacto.
        </p>
      </section>
      <article className="prose legal-page container">
        <p>Última actualización: 1 de octubre de 2026.</p>
        <h2>Qué ocurre con el formulario</h2>
        <p>
          El formulario prepara un mensaje en tu navegador. No lo envía a un
          servidor de Kiryus ni crea una reserva. Los datos permanecen en la
          página mientras preparas la consulta y no se guardan en una base de
          datos ni en el almacenamiento persistente de tu navegador.
        </p>
        <p>
          Al elegir abrir WhatsApp, los datos incluidos en el mensaje se
          incorporan al enlace de ese servicio. Allí puedes revisarlos,
          editarlos y decidir si los envías. Abrir el enlace no significa que la
          comunidad haya recibido tu consulta.
        </p>
        <h2>Qué datos puedes incluir</h2>
        <p>
          El motivo de contacto, la aldea, tu nombre, apellido, correo y mensaje
          permiten contextualizar la consulta. El teléfono y las fechas
          orientativas son opcionales. No se solicita fecha de nacimiento ni
          documentación de identidad.
        </p>
        <p>
          Evita incluir información sensible que no sea necesaria para la
          consulta. Puedes modificar el mensaje antes de enviarlo.
        </p>
        <h2>Canales externos</h2>
        <p>
          WhatsApp, Instagram, TikTok y los mapas tienen sus propias condiciones
          y políticas de privacidad. Se abren cuando eliges seguir un enlace; no
          se cargan sus reproductores, mapas o contenidos incrustados dentro de
          esta web.
        </p>
        <h2>Cookies y medición</h2>
        <p>
          Esta versión no incorpora herramientas de publicidad, analítica
          opcional ni cookies de seguimiento. Las fuentes y fotografías se
          sirven desde el propio sitio. El proveedor de alojamiento puede
          procesar información técnica necesaria para prestar y proteger el
          servicio.
        </p>
        <h2>Consultas sobre información enviada</h2>
        <p>
          Si ya compartiste datos con la comunidad por WhatsApp, puedes
          solicitar información sobre su uso o pedir su corrección mediante el
          mismo canal.{" "}
          <a href={directWhatsapp} target="_blank" rel="noopener noreferrer">
            Contactar a Comunidad Kiryus
          </a>
          .
        </p>
        <p>
          Para conocer el funcionamiento antes de comenzar, visita{" "}
          <Link href="/involucrate">la página de participación</Link>.
        </p>
      </article>
    </>
  );
}
