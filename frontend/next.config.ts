import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.rentu.co.mz",
      },
    ],
  },
};

export default nextConfig;
