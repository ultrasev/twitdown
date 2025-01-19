import { Video } from "@/lib/actions/analytics";
import Image from "next/image";

interface TableVideosProps {
  videos: Video[];
}

export function TableAnalyticsVideos({ videos }: TableVideosProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Video
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {videos.map((video) => (
              <tr
                key={video.statusId}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10">
                      {video.thumbnail && (
                        <Image
                          src={video.thumbnail}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-xl object-cover w-10 h-10"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium dark:text-gray-300">
                        @{video.username}
                      </div>
                      <a
                        href={`https://twitter.com/${video.username}/status/${video.statusId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate max-w-md"
                      >
                        {video.text?.slice(0, 32)}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {video.viewCount?.toLocaleString() ?? 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {video.createdAt
                    ? new Date(video.createdAt).toLocaleString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
