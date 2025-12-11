import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Add the Turbopack configuration directly here.
  // This structure is often required for Turbopack-related config when using a monorepo setup.
  turbopack: {
    // We resolve the path relative to this configuration file
    root: path.resolve(__dirname),
  },

  // Leave experimental empty or remove it if you have no other experimental flags
  // We'll remove the 'as any' since we are following a known config path now
  experimental: {
    // Keep other experimental flags if you have them, otherwise, this can be removed.
  },
};

export default nextConfig;