import { db, sql } from "@/lib/db";
import { twitterCache, TwitterVideoData } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { getAdjustedDate } from "@/lib/utils/date-utils";
// Modified interface to include priority
const NEW_API_URL = process.env.NEW_API_URL;
const NEW_API_KEY = process.env.NEW_API_KEY;

interface TwitterParser {
  priority: number;
  parse(url: string): Promise<TwitterVideoData | null>;
}

// Single parser implementation using new API
class TwitterVideoParser implements TwitterParser {
  constructor(public priority: number = 1) {}

  async parse(url: string): Promise<TwitterVideoData | null> {
    console.log("parsing with new API parser");
    try {
      const response = await fetch(
        `${NEW_API_URL}?url=${encodeURIComponent(url)}`,
        {
          headers: {
            "x-api-key": NEW_API_KEY || "",
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      if (!response.ok) return null;
      const data = await response.json();

      return {
        thumbnail: data.thumbnail,
        resolutions: data.resolutions.map(
          (r: { url: string; resolution: string; quality: string }) => ({
            url: r.url,
            resolution: r.resolution,
            quality: r.quality || "default",
          })
        ),
        text: data.text,
        username: data.username,
        statusId: TwitterService.extractStatusId(url) || "",
      };
    } catch (error) {
      console.error("TwitterVideoParser error:", error);
      return null;
    }
  }
}

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
    console.log("updating analytics", getAdjustedDate());
    return db
      .update(twitterCache)
      .set({
        viewCount: sql`${twitterCache.viewCount} + 1`,
        lastAccessedAt: getAdjustedDate(),
      })
      .where(eq(twitterCache.statusId, statusId));
  },

  // Simplified parser chain setup
  setupParserChain(): TwitterParser[] {
    return [new TwitterVideoParser()];
  },

  // Modified fetchAndCache to use priority-based parsing
  async fetchAndCache(url: string, statusId: string) {
    const parsers = this.setupParserChain();

    for (const parser of parsers) {
      const data = await parser.parse(url);
      if (data) {
        await this.cacheVideoData(statusId, data);
        return data;
      }
    }

    throw new Error("All parsers failed to fetch data");
  },

  // Modified cacheVideoData to use upsert
  async cacheVideoData(statusId: string, data: TwitterVideoData) {
    const now = getAdjustedDate();
    await db
      .insert(twitterCache)
      .values({
        statusId,
        username: data.username,
        thumbnail: data.thumbnail,
        text: data.text,
        resolutions: JSON.stringify(data.resolutions),
        viewCount: 1,
        lastAccessedAt: now,
      })
      .onConflictDoUpdate({
        target: twitterCache.statusId,
        set: {
          username: data.username,
          thumbnail: data.thumbnail,
          text: data.text,
          resolutions: JSON.stringify(data.resolutions),
          lastAccessedAt: now,
          updatedAt: now,
        },
      });
  },

  // Get analytics data with multiple ordering criteria
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
      .orderBy(asc(twitterCache.viewCount), desc(twitterCache.createdAt))
      .limit(50);

    return videos;
  },
};
