import { getAnalytics, getStats } from "@/lib/actions/analytics";
import { Suspense } from "react";
import Loading from "./loading";
import { CardAnalyticsStats } from "./components/CardAnalyticsStats";
import { ChartAnalyticsDailyStats } from "./components/ChartAnalyticsDailyStats";
import { TableAnalyticsVideos } from "./components/TableAnalyticsVideos";

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
          <CardAnalyticsStats key={stat.title} {...stat} />
        ))}
      </div>

      {/* Daily Stats Chart */}
      <ChartAnalyticsDailyStats stats={stats} />

      {/* Videos Table */}
      <TableAnalyticsVideos videos={videoArray} />
    </div>
  );
}

export default function PageDashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Analytics Dashboard
        </h1>
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
