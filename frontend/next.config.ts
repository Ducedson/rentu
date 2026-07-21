import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.rentu.co.mz",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
