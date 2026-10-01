import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./refresh.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { siteConfig } from "@/lib/config";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Comunidad Kiryus · Habitar y regenerar",
    template: "%s | Comunidad Kiryus",
  },
  description: siteConfig.description,
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};
export const viewport: Viewport = {
  themeColor: "#102d24",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/kiryus-logo.webp`,
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  };
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
