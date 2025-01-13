import Link from "next/link";
import { videos } from "@/app/data/videos";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/play/${video.id}`}
            className="block hover:scale-105 transition-transform"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video relative">
                <Image
                  src={video.posterUrl || "/x.jpg"}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                    {video.rating}
                  </span>
                  {video.rating && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      豆瓣 {video.rating}
                    </span>
                  )}
                </div>
              </div>

              {/* 视频信息 */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{video.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {video.director} · {video.year} · {video.country}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
