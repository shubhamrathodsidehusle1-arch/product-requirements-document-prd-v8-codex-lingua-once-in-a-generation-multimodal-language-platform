"use server";

import { db } from "@/db";
import { userVocabulary, vocabularyItems } from "@/db/schema";

export async function getDueVocabulary(userId: number, language: string, limit: number = 20) {
  const today = new Date().toISOString().split("T")[0];
  
  const allUserVocab = await db.select().from(userVocabulary);
  const allVocabItems = await db.select().from(vocabularyItems);
  
  const userVocab = allUserVocab.filter(uv => uv.userId === userId);
  
  const dueItems = userVocab.filter(uv => {
    const vocabItem = allVocabItems.find(v => v.id === uv.vocabularyItemId);
    if (!vocabItem || (language && vocabItem.language !== language)) return false;
    if (!uv.nextReviewDate) return true;
    return uv.nextReviewDate <= today;
  });
  
  return dueItems.slice(0, limit).map(uv => {
    const vocabItem = allVocabItems.find(v => v.id === uv.vocabularyItemId);
    return { ...uv, vocabularyItem: vocabItem };
  });
}

export async function addVocabularyToReview(userId: number, vocabularyItemId: number) {
  const allUserVocab = await db.select().from(userVocabulary);
  const alreadyExists = allUserVocab.find(
    uv => uv.userId === userId && uv.vocabularyItemId === vocabularyItemId
  );
  
  if (alreadyExists) return alreadyExists;
  
  const added = await db.insert(userVocabulary).values({
    userId,
    vocabularyItemId,
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    nextReviewDate: new Date().toISOString().split("T")[0],
  }).returning();
  
  return added[0];
}

export async function reviewVocabulary(userId: number, vocabularyItemId: number, quality: number) {
  const allUserVocab = await db.select().from(userVocabulary);
  const userVocab = allUserVocab.find(
    uv => uv.userId === userId && uv.vocabularyItemId === vocabularyItemId
  );
  
  if (!userVocab) return null;
  
  let easeFactor = userVocab.easeFactor || 2.5;
  let intervalDays = userVocab.intervalDays || 0;
  let repetitions = userVocab.repetitions || 0;
  
  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    intervalDays = 1;
  }
  
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDate = nextDate.toISOString().split("T")[0];
  
  const updated = await db.update(userVocabulary)
    .set({
      easeFactor,
      intervalDays,
      repetitions,
      nextReviewDate,
      lastReviewedAt: new Date(),
    })
    .returning();
  
  return updated[0];
}

export async function getVocabularyStats(userId: number, language?: string) {
  const allUserVocab = await db.select().from(userVocabulary);
  const allVocabItems = await db.select().from(vocabularyItems);
  
  let userVocab = allUserVocab.filter(uv => uv.userId === userId);
  
  if (language) {
    const langVocabIds = allVocabItems.filter(v => v.language === language).map(v => v.id);
    userVocab = userVocab.filter(uv => langVocabIds.includes(uv.vocabularyItemId));
  }
  
  const mastered = userVocab.filter(uv => (uv.repetitions || 0) >= 3);
  const learning = userVocab.filter(uv => (uv.repetitions || 0) > 0 && (uv.repetitions || 0) < 3);
  const newWords = userVocab.filter(uv => (uv.repetitions || 0) === 0);
  
  const today = new Date().toISOString().split("T")[0];
  const dueToday = userVocab.filter(uv => uv.nextReviewDate && uv.nextReviewDate <= today);
  
  return {
    total: userVocab.length,
    mastered: mastered.length,
    learning: learning.length,
    newWords: newWords.length,
    dueToday: dueToday.length,
  };
}