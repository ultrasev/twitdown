/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "video.twimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
