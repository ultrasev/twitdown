import { Hono } from "hono";
import { logger } from "hono/logger";
import { authMiddleware } from "./auth";

export function setupMiddleware(app: Hono) {
  // Global logger for all routes
  app.use("*", logger());

  // Protected routes with JWT
  app.use("/analytics/*", authMiddleware);
  app.use("/twitter/*", authMiddleware);

  return app;
}
