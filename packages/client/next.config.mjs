import MillionLint from '@million/lint';
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {};
export default MillionLint.next({
  rsc: true
})(process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig);