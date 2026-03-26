import { NextResponse } from "next/server";
import { db } from "@/db";
import { curriculumPaths, curriculumUnits, curriculumLessons } from "@/db/schema";

export async function GET() {
  try {
    const paths = await db.select().from(curriculumPaths);
    const units = await db.select().from(curriculumUnits);
    const lessons = await db.select().from(curriculumLessons);
    
    const result = paths.map(path => {
      const pathUnits = units.filter(u => u.pathId === path.id).map(unit => ({
        ...unit,
        lessons: lessons.filter(l => l.unitId === unit.id).sort((a, b) => a.orderIndex - b.orderIndex)
      }));
      return { ...path, units: pathUnits };
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching curriculum:", error);
    return NextResponse.json({ error: "Failed to fetch curriculum" }, { status: 500 });
  }
}