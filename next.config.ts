import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  async rewrites() {
    // Brief route /editions/2026-09.json serves the edition.json route.
    // A rewrite is used because App Router files cannot contain a dot segment.
    return [
      {
        source: "/editions/:edition.json",
        destination: "/editions/:edition/edition.json",
      },
    ];
  },
};

export default nextConfig;
