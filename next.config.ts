import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN || "",
  },
};

export default nextConfig;
