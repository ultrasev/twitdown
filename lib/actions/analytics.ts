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

const DEV_API_URL = "http://localhost:3000/api/analytics";
const PROD_API_URL = "https://twitdown.com/api/analytics";
import { http } from "@/lib/http";

// Add return type to the function
export async function getAnalytics(): Promise<AnalyticsResponse> {
  const API_URL =
    process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
  try {
    const res = await http.get<AnalyticsResponse>(API_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return { videos: [] };
  }
}
