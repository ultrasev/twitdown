import { NextResponse } from "next/server";

// Constants for API configuration
const API_ENDPOINT = "https://www.xxxxxxxx/api/parse";
const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "*/*",
  Origin: "https://www.xxxxxxxx",
  Referer: "https://www.xxxxxxxx/",
};

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Call external API
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch video data");
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error parsing Twitter video:", error);
    return NextResponse.json(
      { error: "Failed to parse Twitter video" },
      { status: 500 }
    );
  }
}
