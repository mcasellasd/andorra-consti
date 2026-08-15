/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
  // Railway: output standalone per desplegament eficient (imatge més petita, arrencada més ràpida)
  output: 'standalone',
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
}

module.exports = nextConfig
