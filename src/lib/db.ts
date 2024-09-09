import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const db = drizzle(new SQLocalDrizzle("database.sqlite3").driver);

export const Docs = sqliteTable("Docs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  vector: blob("vector"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export async function initTables() {
  await db.run(
    sql`
    CREATE TABLE IF NOT EXISTS Docs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      vector BLOB,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `
  );
}
