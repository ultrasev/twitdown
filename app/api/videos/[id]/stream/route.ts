import { NextResponse } from "next/server";
import { videos } from "@/app/data/videos";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const video = videos.find((v) => v.id === params.id);
  if (!video) {
    return new NextResponse("Video not found", { status: 404 });
  }

  const range = request.headers.get("range");

  try {
    const response = await fetch(video.sourceUrl, {
      headers: range ? { Range: range } : {},
    });

    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Error streaming video:", error);
    return new NextResponse("Error loading video", { status: 500 });
  }
}