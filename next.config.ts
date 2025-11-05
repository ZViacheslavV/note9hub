import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  /*   experimental: {
    turbo: false,
  }, */
  images: {
    remotePatterns: [
      {
        hostname: 'ac.goit.global',
      },
    ],
  },
};

export default nextConfig;
