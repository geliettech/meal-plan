import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        pathname: "**",
         //     hostname: "image.clerk.user",
        hostname: "img.clerk.com",
      },
    ],
  }
};

export default nextConfig;
