import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { APP_NAME, ROLE } from "@/lib/http";
interface JWTPayload {
  app: string;
  role: string;
  iat?: number;
  exp?: number;
}

// JWT authentication middleware
export const authMiddleware = async (c: Context, next: Next) => {
  if (c.req.method === "OPTIONS") return next();

  try {
    // First verify JWT token
    const jwtMiddleware = jwt({
      secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
    });

    // Important: Use async function that returns Promise<void>
    await jwtMiddleware(c, async () => {
      return Promise.resolve();
    });

    const payload = c.get("jwtPayload") as JWTPayload;
    console.log("JWT Payload:", payload);

    if (payload.app !== APP_NAME) {
      console.log("Invalid app:", payload.app);
      return c.json({ error: "Invalid application" }, 403);
    }

    if (payload.role !== ROLE) {
      console.log("Invalid role:", payload.role);
      return c.json({ error: "Invalid role" }, 403);
    }

    // Only proceed if all validations pass
    return await next();
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ error: "Authentication failed" }, 401);
  }
};
