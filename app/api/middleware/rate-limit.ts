import { Context, Next } from "hono";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Logger } from "tslog";

const logger = new Logger({ name: "rate-limit" });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

// Rate limit middleware for Hono
export async function rateLimitMiddleware(c: Context, next: Next) {
  try {
    const ip = c.req.header("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`);
      return c.json({ error: "Too Many Requests" }, 429, {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      });
    }

    return await next();
  } catch (error) {
    logger.error("Rate limit error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
