import { db, sql } from "@/lib/db";
import { twitterCache, TwitterVideoData } from "@/lib/db/schema";
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

// Modified interface to include priority
interface TwitterParser {
  priority: number;
  parse(url: string): Promise<TwitterVideoData | null>;
}

// Base parser implementation
abstract class BaseParser implements TwitterParser {
  constructor(public priority: number) {}
  public abstract parse(url: string): Promise<TwitterVideoData | null>;
}

// Primary API parser
class PrimaryApiParser extends BaseParser {
  constructor(priority: number) {
    super(priority);
  }

  async parse(url: string): Promise<TwitterVideoData | null> {
    console.log("parsing with primary api parser");
    const endpoint = TWITTER_CONFIG.ENDPOINT;

    if (!endpoint) {
      console.warn("Primary API endpoint not configured");
      return null;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: TWITTER_CONFIG.HEADERS as Record<string, string>,
      body: JSON.stringify({ url }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return this.formatResponse(data, url);
  }

  private formatResponse(
    data: TwitterVideoData,
    url: string
  ): TwitterVideoData {
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
  }
}

// Twitsave parser
class TwitsaveParser extends BaseParser {
  constructor(priority: number) {
    super(priority);
  }

  async parse(url: string): Promise<TwitterVideoData | null> {
    console.log("parsing with xxxxxxxx parser");
    try {
      const infoResponse = await fetch(
        `https://xxxxxxxx/info?url=${encodeURIComponent(url)}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/json",
            "Accept-Language": "en-US,en;q=0.9",
          },
        }
      );

      if (!infoResponse.ok) return null;
      const html = await infoResponse.text();

      // Extract all download links and their resolutions
      const downloadLinks = this.extractDownloadLinks(html);
      if (downloadLinks.length === 0) return null;

      // Extract other metadata
      const usernameMatch = html.match(
        /href="https:\/\/twitter\.com\/([^"]+)"/
      );
      const textMatch = html.match(/<p class="m-2">([^<]+)<\/p>/);
      const thumbnailMatch = html.match(/poster="([^"]+)"/);

      if (!usernameMatch) return null;

      return {
        username: usernameMatch[1].split("/")[0],
        text: textMatch ? textMatch[1].trim() : "",
        thumbnail: thumbnailMatch ? thumbnailMatch[1] : "",
        resolutions: downloadLinks,
        statusId: TwitterService.extractStatusId(url) || "",
      };
    } catch (error) {
      console.error("TwitsaveParser error:", error);
      return null;
    }
  }

  private extractDownloadLinks(
    html: string
  ): Array<{ url: string; resolution: string; quality: string }> {
    const links: Array<{ url: string; resolution: string; quality: string }> =
      [];

    // Find all download links
    const linkRegex =
      /href="(https:\/\/xxxxxxxx\.com\/download\?file=[^"]+)"[^>]*>[\s\S]*?Resolution:\s*(\d+x\d+)/g;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const downloadUrl = match[1];
      const resolution = match[2];

      // Decode the actual video URL from the download link
      const encodedUrl = new URL(downloadUrl).searchParams.get("file");
      if (!encodedUrl) continue;

      const decodedUrl = Buffer.from(encodedUrl, "base64").toString();

      links.push({
        url: decodedUrl,
        resolution: resolution,
        quality: this.getQualityFromResolution(resolution),
      });
    }

    return links;
  }

  private getQualityFromResolution(resolution: string): string {
    const [width] = resolution.split("x").map(Number);
    if (width >= 1280) return "high";
    if (width >= 720) return "medium";
    return "low";
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
    return db
      .update(twitterCache)
      .set({
        viewCount: sql`${twitterCache.viewCount} + 1`,
        lastAccessedAt: new Date(),
      })
      .where(eq(twitterCache.statusId, statusId));
  },

  // Modified to use priority-based parser chain
  setupParserChain(): TwitterParser[] {
    const parsers = [new PrimaryApiParser(1), new TwitsaveParser(2)];
    return parsers.sort((a, b) => a.priority - b.priority);
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
    await db
      .insert(twitterCache)
      .values({
        statusId,
        username: data.username,
        thumbnail: data.thumbnail,
        text: data.text,
        resolutions: JSON.stringify(data.resolutions),
        viewCount: 1,
        lastAccessedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: twitterCache.statusId,
        set: {
          username: data.username,
          thumbnail: data.thumbnail,
          text: data.text,
          resolutions: JSON.stringify(data.resolutions),
          lastAccessedAt: new Date(),
          updatedAt: new Date(),
        },
      });
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
  },
};
