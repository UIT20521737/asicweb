/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asicweb-portal.longpc.xyz',
        pathname: '/api/files/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/files/**',
      },
    ],
  },
};

export default nextConfig;
