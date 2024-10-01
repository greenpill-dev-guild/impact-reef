import withBundleAnalyzer from "@next/bundle-analyzer";

const AGORA_API_URL = process.env.AGORA_API_URL;
const AGORA_API_KEY = process.env.AGORA_API_KEY;

const hostnames = [
  "euc.li",
  "ens.xyz",
  "content.optimism.io",
  "cdn.charmverse.io",
  "storage.googleapis.com",
  "i.imgur.com",
  "imagedelivery.net",
  "i.seadn.io",
  "lh3.googleusercontent.com",
  "picsum.photos",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AGORA_API_URL: AGORA_API_URL,
    AGORA_API_KEY: AGORA_API_KEY,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
