"use server";

import { db } from "@/db";
import { vocabularyItems } from "@/db/schema";

export async function getVocabulary(language?: string) {
  const all = await db.select().from(vocabularyItems).limit(100);
  if (!language) return all;
  return all.filter(v => v.language === language);
}

export async function getVocabularyById(id: number) {
  const items = await db.select().from(vocabularyItems).where(
    // @ts-expect-error - drizzle type inference
    vocabularyItems.id === id
  );
  return items[0] || null;
}