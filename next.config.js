/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fjjuivkrjxcbsqpwvudn.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
