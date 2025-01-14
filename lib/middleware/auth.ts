import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/http";

export async function checkAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  return null;
}
