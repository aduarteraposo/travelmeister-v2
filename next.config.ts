import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "52.47.136.41",
      },
    ],
  },
};

export default nextConfig;
