"use server";

import { db } from "@/db";
import { userLanguages, learningEvents, achievements, userAchievements } from "@/db/schema";

export async function getUserProgress(userId: number, language?: string) {
  const allUserLangs = await db.select().from(userLanguages);
  let userLangs = allUserLangs.filter(ul => ul.userId === userId);
  
  if (language) {
    userLangs = userLangs.filter(ul => ul.targetLanguage === language);
  }
  
  return userLangs;
}

export async function addXP(userId: number, language: string, xp: number, activityType: string) {
  const allUserLangs = await db.select().from(userLanguages);
  const userLang = allUserLangs.find(ul => ul.userId === userId && ul.targetLanguage === language);
  
  const newXP = (userLang?.xp || 0) + xp;
  const newStreak = calculateStreak(userLang?.streak || 0, userLang?.updatedAt);
  
  if (userLang) {
    const updated = await db.update(userLanguages)
      .set({ xp: newXP, streak: newStreak, updatedAt: new Date() })
      .returning();
    
    await logLearningEvent(userId, language, activityType, xp);
    await checkAchievements(userId);
    
    return updated[0];
  } else {
    const inserted = await db.insert(userLanguages).values({
      userId,
      targetLanguage: language,
      xp,
      streak: 1,
      level: "A1",
    }).returning();
    
    await logLearningEvent(userId, language, activityType, xp);
    
    return inserted[0];
  }
}

function calculateStreak(currentStreak: number, lastActivityDate?: Date | null): number {
  if (!lastActivityDate) return 1;
  
  const now = new Date();
  const lastDate = new Date(lastActivityDate);
  const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff <= 1) return currentStreak + 1;
  return 1;
}

async function logLearningEvent(userId: number, language: string, activityType: string, score: number) {
  await db.insert(learningEvents).values({
    userId,
    language,
    modality: activityType,
    score,
    durationSeconds: 0,
    occurredAt: new Date(),
  });
}

async function checkAchievements(userId: number) {
  const allAchievements = await db.select().from(achievements);
  const allUserAchievements = await db.select().from(userAchievements);
  const userAchievementIds = allUserAchievements
    .filter(ua => ua.userId === userId)
    .map(ua => ua.achievementId);
  
  const allUserLangs = await db.select().from(userLanguages);
  const totalXP = allUserLangs
    .filter(ul => ul.userId === userId)
    .reduce((sum, ul) => sum + (ul.xp || 0), 0);
  
  const totalStreak = Math.max(...allUserLangs
    .filter(ul => ul.userId === userId)
    .map(ul => ul.streak || 0), 0);
  
  for (const achievement of allAchievements) {
    if (userAchievementIds.includes(achievement.id)) continue;
    
    const criteria = JSON.parse(achievement.criteria);
    let earned = false;
    
    if (criteria.type === "xp" && totalXP >= criteria.value) earned = true;
    if (criteria.type === "streak" && totalStreak >= criteria.value) earned = true;
    if (criteria.type === "lessons") {
      const userEvents = await db.select().from(learningEvents);
      const lessonCount = userEvents.filter(e => 
        e.userId === userId && e.modality === "lesson"
      ).length;
      if (lessonCount >= criteria.value) earned = true;
    }
    
    if (earned) {
      await db.insert(userAchievements).values({
        userId,
        achievementId: achievement.id,
      });
    }
  }
}

export async function getAchievements(userId: number) {
  const allAchievements = await db.select().from(achievements);
  const allUserAchievements = await db.select().from(userAchievements);
  const userAchievementIds = allUserAchievements
    .filter(ua => ua.userId === userId)
    .map(ua => ua.achievementId);
  
  return allAchievements.map(achievement => ({
    ...achievement,
    earned: userAchievementIds.includes(achievement.id),
  }));
}