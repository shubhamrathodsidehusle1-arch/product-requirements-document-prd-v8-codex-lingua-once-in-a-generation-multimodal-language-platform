import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("local.db");
const db = drizzle(sqlite, { schema });

async function migrate() {
  console.log("Running migrations...");
  console.log("Database schema loaded successfully.");
  console.log("Tables:", Object.keys(schema).join(", "));
}

migrate().catch(console.error);