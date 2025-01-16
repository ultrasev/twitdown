import { Hono } from "hono";
import { logger } from "hono/logger";
import { authMiddleware } from "./auth";
import { rateLimitMiddleware } from "./rate-limit";

export function setupMiddleware(app: Hono) {
  // Global logger for all routes
  app.use("*", logger());

  // Rate limiting for all routes
  app.use("*", rateLimitMiddleware);

  // Protected routes with JWT
  app.use("/analytics/*", authMiddleware);
  app.use("/twitter/*", authMiddleware);

  return app;
}
