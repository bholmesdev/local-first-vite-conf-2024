import { SQLocalDrizzle } from "sqlocal/drizzle";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import {
  customType,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const db = drizzle(new SQLocalDrizzle("database.sqlite3").driver);

const vectorType = customType<{ data: number[]; driverData: ArrayBufferLike }>({
  dataType() {
    return "blob";
  },
  toDriver(value) {
    return new Float32Array(value).buffer;
  },
  fromDriver(value) {
    return Array.from(new Float32Array(new Uint8Array(value).buffer));
  },
});

export const Docs = sqliteTable("Docs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  vector: vectorType("vector"),
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
