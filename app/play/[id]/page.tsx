import { videos } from "@/app/data/videos";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";

type Params = Promise<{ id: string }>;

export default async function PlayPage(props: { params: Params }) {
  const params = await props.params;
  const videoId = params.id;
  const video = videos.find((v) => v.id === videoId);

  if (!video) {
    return <div>{videoId}</div>;
  }

  return (
    <div className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] mx-auto p-4 mt-8">
      <Link
        href="/play"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回列表
      </Link>

      {/* 视频信息 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full font-bold">
            豆瓣 {video.rating}
          </span>
          <span>{video.year}</span>
          <span>{video.country}</span>
        </div>
      </div>

      {/* Play component */}
      <VideoPlayer video={video} />

      <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-semibold">导演：</span>
          {video.director}
        </div>
        <div>
          <span className="font-semibold">演员：</span>
          {video.actors.join(" / ")}
        </div>
        <div>
          <span className="font-semibold">类型：</span>
          {video.type.join(" / ")}
        </div>
        <div className="pt-2">
          <div className="font-semibold mb-2">剧情简介：</div>
          <p className="text-sm leading-relaxed">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
