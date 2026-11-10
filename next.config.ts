import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/tienda-virtual_JEAN";

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: "export" as const,
    basePath: repositoryBasePath,
    trailingSlash: true,
  }),
  devIndicators: false,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
