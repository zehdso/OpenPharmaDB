import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
      basePath: "/OpenPharmaDB",
      assetPrefix: "/OpenPharmaDB/",
    }
  : {};

export default nextConfig;