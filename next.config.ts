import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Zdjęcia ofert z ESTI (CDN klienta — uzupełnimy gdy poznamy faktyczny host)
      { protocol: "https", hostname: "**.starnawska.pl" },
      { protocol: "https", hostname: "**.starnawska.iq.pl" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
