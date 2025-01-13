import { NextRequest, NextResponse } from "next/server";
import { videos } from "@/app/data/videos";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return new NextResponse(JSON.stringify({ error: "Video not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const workerUrl = `https://stream.tpz.workers.dev/?video=${encodeURIComponent(
    video.sourceUrl
  )}`;
  const range = request.headers.get("range");

  try {
    const response = await fetch(workerUrl, {
      headers: range ? { Range: range } : {},
      // Add next: { revalidate: 14400 } if you want to cache at Next.js level
    });

    if (!response.ok && response.status !== 206) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error("Worker error:", {
        status: response.status,
        error: errorData,
      });
      return NextResponse.json(errorData, { status: response.status });
    }

    // Let Cloudflare Worker handle the caching
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Stream error:", error);
    return NextResponse.json(
      { error: "Error streaming video" },
      { status: 500 }
    );
  }
}
