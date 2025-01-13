import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// Twitter video cache table with analytics data
export const twitterCache = pgTable("twitdown_cache", {
  statusId: varchar("status_id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  thumbnail: text("thumbnail").notNull(),
  text: text("text"),
  resolutions: text("resolutions").notNull(), // Store as JSON string

  // Analytics fields
  downloadCount: integer("download_count").default(0),
  viewCount: integer("view_count").default(0),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type for our response
export type TwitterVideoData = {
  thumbnail: string;
  resolutions: {
    url: string;
    resolution: string;
    quality: string;
  }[];
  text: string;
  username: string;
  statusId: string;
};
