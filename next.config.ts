import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 86400 },
  async redirects() {
    return [
      {
        source: "/kiryus-argentina",
        destination: "/aldeas/argentina",
        permanent: true,
      },
      {
        source: "/kiryus-colombia",
        destination: "/aldeas/colombia",
        permanent: true,
      },
      {
        source: "/kiryus-españa",
        destination: "/legado/espana",
        permanent: true,
      },
      {
        source: "/kiryus-espa%C3%B1a",
        destination: "/legado/espana",
        permanent: true,
      },
      {
        source: "/kiryus-espana",
        destination: "/legado/espana",
        permanent: true,
      },
      {
        source: "/aldeas/espana",
        destination: "/legado/espana",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
