import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 检查是否是 HTTP 请求
  if (request.headers.get("x-forwarded-proto") !== "https") {
    // 对于 HTTP 请求，返回 200 OK
    return new NextResponse("OK", { status: 200 });
  }
  // 对于其他请求，不做任何处理
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
