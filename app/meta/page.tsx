import { getAnalytics, getStats } from "@/lib/actions/analytics";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

async function AnalyticsContent() {
  const [{ videos }, stats] = await Promise.all([getAnalytics(), getStats(7)]);

  const videoArray = Array.isArray(videos) ? videos : [];

  return (
    <div className="space-y-8 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Videos",
            value: videoArray.length,
            icon: "📊",
          },
          {
            title: "Total Views",
            value: videoArray.reduce(
              (acc, vid) => acc + (vid.viewCount || 0),
              0
            ),
            icon: "👀",
          },
          {
            title: "Unique Users",
            value: stats[0]?.uniqueUsers || 0,
            icon: "👥",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold dark:text-white">
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Stats Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold p-6 border-b dark:border-gray-700">
          Daily Statistics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  New Videos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Unique Users
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats.map((stat) => (
                <tr
                  key={stat.date.toString()}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(stat.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {stat.videoCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {stat.totalViews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {stat.uniqueUsers.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Video
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {videoArray.map((video) => (
                <tr key={video.statusId} className="hover:bg-gray-50">
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
                        <div className="font-medium">@{video.username}</div>
                        <a
                          href={`https://twitter.com/${video.username}/status/${video.statusId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline truncate max-w-md"
                        >
                          {video.text?.slice(0, 32)}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-medium">
                      {video.viewCount?.toLocaleString() ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
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
    </div>
  );
}

// Main dashboard page
export default function PageDashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Showing top 50 most viewed videos
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <AnalyticsContent />
      </Suspense>
    </main>
  );
}
