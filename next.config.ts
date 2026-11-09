import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "m.media-amazon.com",
      "assets.hardwarezone.com",
      "via.placeholder.com"
    ],
  },
};

export default nextConfig;
