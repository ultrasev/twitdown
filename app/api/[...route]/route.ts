import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import { ApiService } from "../services/api-service";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use("*", async (c, next) => {
  if (c.req.method === "OPTIONS") return next();
  const jwtMiddleware = jwt({
    secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
  });
  return jwtMiddleware(c, next);
});

app.get("/analytics", ApiService.handleAnalytics);
app.post("/twitter/parse", ApiService.handleTwitterParse);

export const GET = handle(app);
export const POST = handle(app);
