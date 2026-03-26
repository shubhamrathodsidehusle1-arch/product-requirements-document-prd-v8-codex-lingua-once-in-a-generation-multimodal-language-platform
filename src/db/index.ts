import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof createDatabase> | null = null;

export function getDb() {
  if (!dbInstance) {
    const url = process.env.DB_URL;
    const token = process.env.DB_TOKEN;
    
    if (!url || !token) {
      throw new Error("Missing database configuration. Provide url and token in config or set DB_URL and DB_TOKEN environment variables.");
    }
    
    dbInstance = createDatabase(schema, { url, token });
  }
  
  return dbInstance;
}

export const db = getDb();