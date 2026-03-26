import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.DB_PATH || "local.db");
export const db = drizzle(sqlite, { schema });
export { schema };

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(process.env.DB_PATH || "local.db");
  }
  return dbInstance;
}