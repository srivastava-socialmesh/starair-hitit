import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uuepctepzesuvvjmvkrz.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add any other external image hosts you use
      // For example:
      // {
      //   protocol: "https",
      //   hostname: "cdn.shopify.com",
      // },
    ],
  },
};

export default nextConfig;
