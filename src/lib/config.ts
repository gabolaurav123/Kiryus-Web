export const siteConfig = {
  name: "Comunidad Kiryus",
  description:
    "Ecoaldeas en Argentina y Colombia, con el legado de España. Personas y territorios que se encuentran para aprender, colaborar y regenerar.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  indexable: process.env.SITE_INDEXABLE === "true",
  whatsapp: "573105606709",
  whatsappDisplay: "+57 310 560 6709",
  instagram: "https://www.instagram.com/ecoaldeaskiryus/",
  tiktok: "https://www.tiktok.com/@ecoaldeaskiryus",
  source: "https://www.comunidadkiryus.org/",
};
export const directWhatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, Comunidad Kiryus. Me gustaría conocer las aldeas y las formas de participar.")}`;
