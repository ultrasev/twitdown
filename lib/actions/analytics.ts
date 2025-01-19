// Define the video interface
export interface Video {
  statusId: string;
  username: string;
  thumbnail: string;
  text: string;
  downloadCount: number;
  viewCount: number;
  lastAccessedAt: string;
  createdAt: string;
}

// Define the API response interface
interface AnalyticsResponse {
  videos: Video[];
}

const DEV_API_URL = "http://localhost:3000";
const PROD_API_URL = "https://twitdown.com";
import { http } from "@/lib/http";

function getURL(api: string) {
  return process.env.NODE_ENV === "production"
    ? PROD_API_URL + api
    : DEV_API_URL + api;
}

// Add return type to the function
export async function getAnalytics(): Promise<AnalyticsResponse> {
  const API_URL = getURL("/api/analytics");
  try {
    const res = await http.get<AnalyticsResponse>(API_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return { videos: [] };
  }
}

export interface DailyStats {
  date: Date;
  videoCount: number;
  totalViews: number;
  uniqueUsers: number;
}

// Add new function for stats
export async function getStats(days: number = 7): Promise<DailyStats[]> {
  const API_URL = getURL("/api/dailystats?days=" + days);
  try {
    const res = await http.get<{ stats: DailyStats[] }>(API_URL);
    return res.data.stats;
  } catch (err) {
    console.error(err);
    return [];
  }
}
