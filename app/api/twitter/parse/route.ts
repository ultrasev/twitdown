import { NextResponse } from "next/server";
import { db, sql } from "@/lib/db";
import { twitterCache } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
export const runtime = 'edge';
// Constants for API configuration
const TWITDOWN_API = process.env.TWITTER_DOWN_API;
const API_ENDPOINT = `${TWITDOWN_API}/api/parse`;
const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "*/*",
  Origin: TWITDOWN_API,
  Referer: TWITDOWN_API,
};

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Extract status ID from URL using regex
    const statusIdMatch = url.match(/status\/(\d+)/);
    const statusId = statusIdMatch?.[1];

    if (!statusId) {
      return NextResponse.json(
        { error: "Invalid Twitter URL" },
        { status: 400 }
      );
    }

    // Check cache first
    const cachedData = await db
      .select()
      .from(twitterCache)
      .where(eq(twitterCache.statusId, statusId))
      .limit(1);

    if (cachedData.length > 0) {
      // Update analytics
      await db
        .update(twitterCache)
        .set({
          viewCount: sql`${twitterCache.viewCount} + 1`,
          lastAccessedAt: new Date(),
        })
        .where(eq(twitterCache.statusId, statusId));

      return NextResponse.json({
        ...cachedData[0],
        resolutions: JSON.parse(cachedData[0].resolutions),
      });
    }

    // If not in cache, fetch from external API
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: HEADERS as Record<string, string>,
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error parsing Twitter video:", error);
    return NextResponse.json(
      { error: "Failed to parse Twitter video" },
      { status: 500 }
    );
  }
}
