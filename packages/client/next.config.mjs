import withBundleAnalyzer from "@next/bundle-analyzer";
const AGORA_API_URL = process.env.AGORA_API_URL;
const AGORA_API_KEY = process.env.AGORA_API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AGORA_API_URL: AGORA_API_URL,
    AGORA_API_KEY: AGORA_API_KEY,
  },
  reactStrictMode: true,
  // https://maxschmitt.me/posts/next-js-api-proxy
  // https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
  async rewrites() {
    return [
      {
        source: '/api/agora/:path*',
        destination: `${AGORA_API_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    domains: ["picsum.photos", "storage.googleapis.com"],
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
