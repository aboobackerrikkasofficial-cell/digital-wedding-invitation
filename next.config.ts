import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["10.117.201.105:3000", "10.117.201.105", "localhost:3000"]
    }
  } as any,
  // Fix for the HMR cross-origin block on mobile
  // @ts-ignore
  allowedDevOrigins: ["10.117.201.105"],
};

export default nextConfig;
