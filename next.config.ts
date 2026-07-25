import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uuepctepzesuvvjmvkrz.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "starair.in",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/flight-status",
        destination: "/flight-status",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
