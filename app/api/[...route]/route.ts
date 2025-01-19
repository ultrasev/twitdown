import { Hono } from "hono";
import { handle } from "hono/vercel";
import { setupMiddleware } from "../middleware";
import { ApiService } from "../services/api-service";

const app = new Hono().basePath("/api");
// Setup middleware
// setupMiddleware(app);

// Public routes
app.get("/hello", (c) => c.json({ message: "Hello, World!" }));

// Protected routes
app.get("/analytics", ApiService.handleAnalytics);
app.post("/twitter/parse", ApiService.handleTwitterParse);

export const GET = handle(app);
export const POST = handle(app);
