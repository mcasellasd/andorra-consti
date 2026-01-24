/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuració per exportació estàtica (per SiteGround o qualsevol servidor web)
  // NOTA: Si utilitzes l'API d'OpenAI, no pots usar 'export' - elimina aquesta línia
  // output: 'export',
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

