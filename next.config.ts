import type { NextConfig } from "next";

const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    // Static art in /public is not content-hashed: give a replaced asset a new filename.
    return ["/illustration/:path*", "/pillars/:path*", "/hero/:path*"].map((source) => ({
      source,
      headers: longCache,
    }));
  },
};

export default nextConfig;
