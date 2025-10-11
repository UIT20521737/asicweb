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
    ],
  },
};

export default nextConfig;
