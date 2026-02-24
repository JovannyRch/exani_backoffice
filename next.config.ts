import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
