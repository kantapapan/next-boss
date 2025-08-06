import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // styled-componentsのSSRサポートを有効化
    styledComponents: true,
  },
};

export default nextConfig;