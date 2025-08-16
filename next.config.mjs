/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    position: "top-left", // ou 'top-right' / 'bottom-left' / 'bottom-right'
  },
  // Tu veux vraiment le désactiver totalement :
  experimental: {
    nextDev: {
      devPanel: false, // 💣 ça vire le badge dev complet
    },
  },
};

export default nextConfig;
