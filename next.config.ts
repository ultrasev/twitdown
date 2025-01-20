import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/ext_tw_video_thumb/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/amplify_video_thumb/**",
      },
      {
        protocol: "https",
        hostname: "video.twimg.com",
        pathname: "/ext_tw_video/**",
      },
    ] as RemotePattern[],
  },
};

export default withMDX(nextConfig);
