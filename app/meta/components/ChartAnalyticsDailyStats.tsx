"use client";
import { DailyStats } from "@/lib/actions/analytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDailyStatsProps {
  stats: DailyStats[];
}

export function ChartAnalyticsDailyStats({ stats }: ChartDailyStatsProps) {
  // 处理数据，把日期转换成更友好的格式
  const chartData = stats
    .map((stat) => ({
      date: new Date(stat.date).toLocaleDateString("zh-CN", {
        month: "numeric",
        day: "numeric",
      }),
      videos: stat.videoCount,
    }))
    .reverse(); // 反转数组使得日期从左到右递增

  // 计算最大值和最小值来设置Y轴范围
  const maxValue = Math.max(...chartData.map((item) => item.videos));
  const minValue = Math.min(...chartData.map((item) => item.videos));
  // 给最大值加点余量，最小值如果接近0就从0开始
  const yAxisMax = Math.ceil(maxValue * 1.1);
  const yAxisMin = minValue > 3 ? Math.floor(minValue * 0.9) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Daily New Videos
      </h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6B7280" tick={{ fill: "#6B7280" }} />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: "#6B7280" }}
              domain={[yAxisMin, yAxisMax]}
              allowDecimals={false} // 不显示小数
              tickCount={6} // 控制刻度数量
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#F3F4F6",
              }}
              itemStyle={{ color: "#F3F4F6" }}
              labelStyle={{ color: "#F3F4F6" }}
              formatter={(value: number) => [Math.round(value), "Videos"]} // 确保显示整数
            />
            <Line
              type="monotone"
              dataKey="videos"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
