/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'static.wixstatic.com'],
  },
  env: {
    NEXT_PUBLIC_WIX_ID: process.env.NEXT_PUBLIC_WIX_ID,
  },
};

export default nextConfig;
