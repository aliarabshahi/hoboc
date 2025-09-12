/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/api/proxy/media/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/hoboc/media/**' }, // <-- add this
      { protocol: 'http', hostname: 'nginx', pathname: '/hoboc/media/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' },
      { protocol: 'https', hostname: 'tailwindcss.com', pathname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
