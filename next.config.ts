import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The 29 redirects from docs/02-content-inventory.md section 8 are added in milestone 8.
};

export default nextConfig;
