"use server";

import { db } from "@/db";
import { curriculumPaths, curriculumUnits, curriculumLessons } from "@/db/schema";

export async function getCurriculum(language?: string) {
  const paths = await db.select().from(curriculumPaths);
  const units = await db.select().from(curriculumUnits);
  const lessons = await db.select().from(curriculumLessons);
  
  const filteredPaths = language ? paths.filter(p => p.language === language) : paths;
  
  return filteredPaths.map(path => {
    const pathUnits = units.filter(u => u.pathId === path.id).map(unit => ({
      ...unit,
      lessons: lessons.filter(l => l.unitId === unit.id).sort((a, b) => a.orderIndex - b.orderIndex)
    }));
    return { ...path, units: pathUnits };
  });
}

export async function getLessonById(lessonId: number) {
  const lessons = await db.select().from(curriculumLessons);
  return lessons.find(l => l.id === lessonId) || null;
}