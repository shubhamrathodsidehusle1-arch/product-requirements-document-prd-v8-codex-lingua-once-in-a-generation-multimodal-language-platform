import { NextResponse } from "next/server";
import { db } from "@/db";
import { exercises, exerciseAttempts } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");
    const exerciseType = searchParams.get("type");

    const allExercises = await db.select().from(exercises);
    let result = allExercises;

    if (lessonId) {
      result = result.filter(e => e.lessonId === parseInt(lessonId));
    }
    if (exerciseType) {
      result = result.filter(e => e.exerciseType === exerciseType);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, exerciseId, response, timeTaken } = body;

    if (!userId || !exerciseId) {
      return NextResponse.json({ error: "userId and exerciseId required" }, { status: 400 });
    }

    const allExercises = await db.select().from(exercises);
    const exercise = allExercises.find(e => e.id === exerciseId);

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    const content = JSON.parse(exercise.content);
    const points = exercise.pointsPossible || 10;
    let isCorrect = false;
    let score = 0;

    if (exercise.exerciseType === "multiple_choice") {
      isCorrect = response === content.correctAnswer;
      score = isCorrect ? points : 0;
    } else if (exercise.exerciseType === "fill_blank") {
      const userAnswer = (response as string).toLowerCase().trim();
      const correctAnswer = content.correctAnswer.toLowerCase().trim();
      isCorrect = userAnswer === correctAnswer;
      score = isCorrect ? points : Math.floor(points * 0.5);
    } else if (exercise.exerciseType === "matching") {
      isCorrect = true;
      score = points;
    } else if (exercise.exerciseType === "speaking") {
      isCorrect = true;
      score = Math.floor(points * 0.7);
    }

    const attempt = await db.insert(exerciseAttempts).values({
      userId: parseInt(userId),
      exerciseId,
      response: JSON.stringify(response),
      score,
      isCorrect,
      attemptNumber: 1,
      timeTakenSeconds: timeTaken,
      completedAt: new Date(),
    }).returning();

    return NextResponse.json({
      attempt: attempt[0],
      correct: isCorrect,
      score,
      correctAnswer: exercise.exerciseType === "multiple_choice" ? content.correctAnswer : null,
    });
  } catch (error) {
    console.error("Error submitting exercise:", error);
    return NextResponse.json({ error: "Failed to submit exercise" }, { status: 500 });
  }
}