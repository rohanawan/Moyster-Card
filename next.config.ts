import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the project root to silence workspace warnings
  turbopack: {
    root: __dirname,
  },
  // Enable experimental features if needed
  experimental: {
    // Add any valid experimental features here
  },
};

export default nextConfig;
