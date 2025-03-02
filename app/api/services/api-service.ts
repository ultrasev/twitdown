import { Context } from "hono";
import { TwitterService } from "./twitter-service";
import { Logger } from "tslog";

const logger = new Logger({ name: "api-service" });

export const ApiService = {
  // Handle analytics request
  async handleAnalytics(c: Context) {
    try {
      const videos = await TwitterService.getAnalytics();
      return c.json({ videos });
    } catch (error) {
      logger.error("Failed to fetch analytics:", error);
      return c.json({ error: "Failed to fetch analytics" }, 500);
    }
  },

  // Handle Twitter parse request
  async handleTwitterParse(c: Context) {
    try {
      const { url } = await c.req.json();

      if (!url) {
        return c.json({ error: "URL is required" }, 400);
      }

      const statusId = TwitterService.extractStatusId(url);
      if (!statusId) {
        return c.json({ error: "Invalid Twitter URL" }, 400);
      }

      const cachedData = await TwitterService.getCachedData(statusId);
      if (cachedData) {
        logger.info("Returning cached data for statusId:", statusId);
        return c.json(cachedData);
      }

      const data = await TwitterService.fetchAndCache(url, statusId);
      logger.info("Returning new data for statusId:", statusId);
      return c.json(data);
    } catch (error) {
      logger.error("Error parsing Twitter video:", error);
      return c.json({ error: "Failed to parse Twitter video" }, 500);
    }
  },
};
