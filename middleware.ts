import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "@/lib/middleware/auth";
import { checkRateLimit } from "@/lib/middleware/rate-limit";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // 1. Check authentication
  const authError = await checkAuth(request);
  if (authError) return authError;

  // 2. Check rate limit for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const rateLimitError = await checkRateLimit(request);
    if (rateLimitError) return rateLimitError;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
