const DEV_API_URL = "http://localhost:3000/api/analytics";
const PROD_API_URL = "https://twitdown.com/api/analytics";
import { http } from "@/lib/http";

export async function getAnalytics() {
  const API_URL =
    process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
  try {
    const res = await http.get(API_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return { videos: [] };
  }
}
