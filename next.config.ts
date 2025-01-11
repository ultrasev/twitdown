/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/ext_tw_video_thumb/**",
      },
      {
        protocol: "https",
        hostname: "video.twimg.com",
        pathname: "/ext_tw_video/**",
      },
    ],
  },
};

export default nextConfig;
