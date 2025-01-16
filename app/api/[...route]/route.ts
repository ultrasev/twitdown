import { Context, Hono, Next } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import { ApiService } from "../services/api-service";

const app = new Hono().basePath("/api");

app.use("*", logger());

// JWT middleware for protected routes only
const authMiddleware = async (c: Context, next: Next) => {
  if (c.req.method === "OPTIONS") return next();
  const jwtMiddleware = jwt({
    secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
  });
  return jwtMiddleware(c, next);
};

app.get("/hello", (c) => c.json({ message: "Hello, World!" }));
app.use("/analytics/*", authMiddleware);
app.use("/twitter/*", authMiddleware);

app.get("/analytics", ApiService.handleAnalytics);
app.post("/twitter/parse", ApiService.handleTwitterParse);

export const GET = handle(app);
export const POST = handle(app);
