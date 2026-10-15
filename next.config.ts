import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.10.7.111', 'vibez.apponislam.top', 'getvibez.app', 'api.getvibez.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.getvibez.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'getvibez.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vibezapi.apponislam.top',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
