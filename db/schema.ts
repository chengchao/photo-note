import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const photo = sqliteTable("photo", {
  id: text("id").primaryKey(),
  uri: text("uri"),
  description: text("description"),
});
