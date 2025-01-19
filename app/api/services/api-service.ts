import { Context } from 'hono';
import { TwitterService } from './twitter-service';

export const ApiService = {
  // Handle analytics request
  async handleAnalytics(c: Context) {
    try {
      const videos = await TwitterService.getAnalytics();
      return c.json({ videos });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
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

      // const cachedData = await TwitterService.getCachedData(statusId);
      // if (cachedData) {
      //   return c.json(cachedData);
      // }

      const data = await TwitterService.fetchAndCache(url, statusId);
      return c.json(data);

    } catch (error) {
      console.error("Error parsing Twitter video:", error);
      return c.json({ error: "Failed to parse Twitter video" }, 500);
    }
  }
};