import { db } from "@/lib/db";
import { twitterCache } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function GET() {
  try {
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

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
