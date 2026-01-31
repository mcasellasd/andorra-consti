/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Railway: output standalone per desplegament eficient (imatge més petita, arrencada més ràpida)
  output: 'standalone',
  // Evitar error ESLint "extensions has been removed" amb Railpack/ESLint 9
  eslint: { ignoreDuringBuilds: true },
  // Per exportació estàtica (SiteGround): comenta la línia anterior i descomenta: output: 'export',
  images: {
    unoptimized: true, // Necessari per exportació estàtica
  },
  // Si vols usar paths personalitzats, descomenta:
  // basePath: '/dretplaner.ad', // Si està en un subdirectori
  // trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/explorar',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Exclou @xenova/transformers del bundle del client (només funciona a Node.js)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@xenova/transformers': false,
      };
    }
    return config;
  },
}

module.exports = nextConfig

