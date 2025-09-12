import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.resolve(__dirname, ".."),
};

export default nextConfig;
// nextConfig.outputFileTracingRoot = '/c:/Users/mrput/Documents/VSProject/MyFullstackApp';