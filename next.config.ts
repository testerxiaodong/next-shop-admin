import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'binfgbgsoetsbeapeoks.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // 将请求体大小限制设置为 15 MB
    },
  },
  /* config options here */
}

export default nextConfig
