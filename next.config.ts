import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the site into plain files in `out/` so any static host
  // (Cloudflare Pages, GitHub Pages, …) can serve it.
  output: "export",
  // The built-in image optimizer needs a server; serve the photos as-is.
  images: { unoptimized: true },
};

export default nextConfig;
