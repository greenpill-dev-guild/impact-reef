import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
