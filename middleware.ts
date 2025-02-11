import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request protocol is HTTP
  if (process.env.NODE_ENV === 'production' && !request.headers.get('x-forwarded-proto')?.includes('https')) {
    // Get the original URL and create HTTPS version
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.href = url.href.replace('http://', 'https://');

    // Return 301 permanent redirect
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
