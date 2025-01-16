import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { APP_NAME, ROLE } from "@/lib/http";
import { Logger } from "tslog";

const logger = new Logger({
  name: "auth",
});

interface JWTPayload {
  app: string;
  role: string;
  iat?: number;
  exp?: number;
}

// JWT authentication middleware
export const authMiddleware = async (c: Context, next: Next) => {
  if (c.req.method === "OPTIONS") return next();
  logger.info(c.req.url);

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
    logger.info("JWT Payload:", payload);

    if (payload.app !== APP_NAME) {
      logger.error("Invalid app:", payload.app);
      return c.json({ error: "Invalid application" }, 403);
    }

    if (payload.role !== ROLE) {
      logger.error("Invalid role:", payload.role);
      return c.json({ error: "Invalid role" }, 403);
    }

    // Only proceed if all validations pass
    return await next();
  } catch (error) {
    logger.error("Auth error:", error);
    return c.json({ error: "Authentication failed" }, 401);
  }
};
