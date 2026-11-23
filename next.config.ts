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

  async redirects() {
    return [
      {
        source: "/blog/berlin/7-best-burgers-in-berlin-in-2021",
        destination: "/berlin/best-burgers-berlin",
        permanent: true,
      },
      {
        source: "/blog/berlin/9-cool-bars-in-berlin-kreuzberg-distric",
        destination: "/berlin/best-bars-kreuzberg",
        permanent: true,
      },
      {
        source: "/blog/berlin/9-coolest-bars-in-berlin-kreuzberg",
        destination: "/berlin/best-bars-kreuzberg",
        permanent: true,
      },
      {
        source: "/blog/berlin/9-best-bars-in-berlin-schoneberg",
        destination: "/berlin/best-bars-schoeneberg",
        permanent: true,
      },
      {
        source: "/blog/berlin/10-historical-museums-in-berlin",
        destination: "/berlin/historical-museums-berlin",
        permanent: true,
      },
      { source: "/trip/berlin", destination: "/berlin", permanent: true },
      { source: "/trip/:slug", destination: "/", permanent: false },
      { source: "/coming-soon/:slug", destination: "/", permanent: false },
      { source: "/trips", destination: "/", permanent: false },
      { source: "/how-it-works", destination: "/about", permanent: true },
      { source: "/blog/:path*", destination: "/berlin", permanent: true }, // last: catch-all
    ];
  },
};

export default nextConfig;
