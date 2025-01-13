// Constants for configuration
const DEFAULT_VIDEO_URL = "https://cdn.plyr.io/static/blank.mp4";
const CACHE_TTL = 14400; // 4 hours in seconds
const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB chunks

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get("video") || DEFAULT_VIDEO_URL;

  if (!isValidVideoUrl(videoUrl)) {
    return createErrorResponse("Invalid video URL", 400);
  }

  const range = request.headers.get("range");

  try {
    // If no range is requested, return metadata only
    if (!range) {
      const head = await fetch(videoUrl, { method: "HEAD" });
      return new Response(null, {
        status: 200,
        headers: addResponseHeaders(head.headers),
      });
    }

    // Parse range header
    const [start, end] = range
      .replace(/bytes=/, "")
      .split("-")
      .map(Number);
    const rangeEnd = end || start + CHUNK_SIZE - 1;

    // Create cache key for this chunk
    const cacheKey = new Request(`${videoUrl}#chunk-${start}-${rangeEnd}`);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
      response = await fetch(videoUrl, {
        headers: { Range: `bytes=${start}-${rangeEnd}` },
        cf: {
          cacheTtl: CACHE_TTL,
          cacheEverything: true,
        },
      });

      // Cache the chunk
      if (response.status === 206) {
        await cache.put(cacheKey, response.clone());
      }
    }

    return new Response(response.body, {
      status: 206,
      headers: addResponseHeaders(response.headers),
    });
  } catch (error) {
    return createErrorResponse(`Error loading video: ${error.message}`, 500);
  }
}

function isValidVideoUrl(url) {
  // 实现 URL 验证逻辑
  // 例如，检查 URL 格式，允许的域名等
  try {
    new URL(url);
    // 这里可以添加更多的验证逻辑
    // 例如，检查 URL 是否来自允许的域名列表
    return true;
  } catch {
    return false;
  }
}

function addResponseHeaders(originalHeaders) {
  const headers = new Headers(originalHeaders);
  headers.set("Cache-Control", `public, max-age=${CACHE_TTL}`);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

function createErrorResponse(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
