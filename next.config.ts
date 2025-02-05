import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "avatar.vercel.sh", "res.cloudinary.com"],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
};

export default nextConfig;
