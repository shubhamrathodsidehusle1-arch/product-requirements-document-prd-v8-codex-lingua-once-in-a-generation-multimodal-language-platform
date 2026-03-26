import { NextResponse } from "next/server";
import { db } from "@/db";
import { userLanguages, learningEvents } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const language = searchParams.get("language");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const userIdNum = parseInt(userId);
    const allUserLangs = await db.select().from(userLanguages);
    let userLangs = allUserLangs.filter(ul => ul.userId === userIdNum);

    if (language) {
      userLangs = userLangs.filter(ul => ul.targetLanguage === language);
    }

    return NextResponse.json(userLangs);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, language, action, xpEarned, activityType, durationSeconds } = body;

    if (!userId || !language) {
      return NextResponse.json({ error: "userId and language required" }, { status: 400 });
    }

    const userIdNum = parseInt(userId);
    const allUserLangs = await db.select().from(userLanguages);
    const userLang = allUserLangs.find(ul => ul.userId === userIdNum && ul.targetLanguage === language);

    if (action === "addXP" && xpEarned) {
      const newXP = (userLang?.xp || 0) + xpEarned;
      const newStreak = (userLang?.streak || 0) + 1;
      const now = new Date();
      
      if (userLang) {
        const updated = await db.update(userLanguages)
          .set({ xp: newXP, streak: newStreak, updatedAt: now })
          .returning();
        return NextResponse.json(updated[0]);
      } else {
        const inserted = await db.insert(userLanguages).values({
          userId: userIdNum,
          targetLanguage: language,
          xp: xpEarned,
          streak: 1,
          level: "A1",
        }).returning();
        return NextResponse.json(inserted[0]);
      }
    }

    if (activityType) {
      await db.insert(learningEvents).values({
        userId: userIdNum,
        language,
        modality: activityType,
        score: xpEarned || 0,
        durationSeconds: durationSeconds || 0,
        occurredAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}