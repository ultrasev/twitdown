import { db, sql } from "@/lib/db";
import { twitterCache } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// API configuration
const TWITTER_CONFIG = {
  API_URL: process.env.TWITTER_DOWN_API,
  ENDPOINT: `${process.env.TWITTER_DOWN_API}/api/parse`,
  HEADERS: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    Accept: "*/*",
    Origin: process.env.TWITTER_DOWN_API,
    Referer: process.env.TWITTER_DOWN_API,
  },
} as const;

export const TwitterService = {
  // Extract status ID from URL
  extractStatusId(url: string): string | null {
    const match = url.match(/status\/(\d+)/);
    return match?.[1] || null;
  },

  // Check and get cached data
  async getCachedData(statusId: string) {
    const cached = await db
      .select()
      .from(twitterCache)
      .where(eq(twitterCache.statusId, statusId))
      .limit(1);

    if (cached.length > 0) {
      await this.updateAnalytics(statusId);
      return {
        ...cached[0],
        resolutions: JSON.parse(cached[0].resolutions),
      };
    }
    return null;
  },

  // Update analytics for cached data
  async updateAnalytics(statusId: string) {
    return db
      .update(twitterCache)
      .set({
        viewCount: sql`${twitterCache.viewCount} + 1`,
        lastAccessedAt: new Date(),
      })
      .where(eq(twitterCache.statusId, statusId));
  },

  // Fetch and cache Twitter data
  async fetchAndCache(url: string, statusId: string) {
    const response = await fetch(TWITTER_CONFIG.ENDPOINT, {
      method: "POST",
      headers: TWITTER_CONFIG.HEADERS as Record<string, string>,
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video data");
    }

    const data = await response.json();

    // Cache the response
    await db.insert(twitterCache).values({
      statusId,
      username: data.username,
      thumbnail: data.thumbnail,
      text: data.text,
      resolutions: JSON.stringify(data.resolutions),
      viewCount: 1,
      lastAccessedAt: new Date(),
    });

    return data;
  },

  // Get analytics data
  async getAnalytics() {
    const videos = await db
      .select({
        statusId: twitterCache.statusId,
        username: twitterCache.username,
        thumbnail: twitterCache.thumbnail,
        text: twitterCache.text,
        downloadCount: twitterCache.downloadCount,
        viewCount: twitterCache.viewCount,
        lastAccessedAt: twitterCache.lastAccessedAt,
        createdAt: twitterCache.createdAt,
      })
      .from(twitterCache)
      .orderBy(desc(twitterCache.viewCount))
      .limit(50);

    return videos;
  }
};
