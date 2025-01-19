interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
}

export function CardAnalyticsStats({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}