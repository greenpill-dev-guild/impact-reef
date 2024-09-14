import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/projects",
  //       permanent: true,
  //     },
  //   ];
  // },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["picsum.photos"],
  },
};

export default process.env.ANALYZE === "true" ?
  withBundleAnalyzer(nextConfig)
: nextConfig;
