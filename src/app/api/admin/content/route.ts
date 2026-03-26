import { NextResponse } from "next/server";
import { db } from "@/db";
import { languages, vocabularyItems, curriculumPaths, curriculumUnits, curriculumLessons, aiPersonas, exercises } from "@/db/schema";
import { generateSpanishCurriculum, generateVocabulary, generateExercises, generateAIPersona } from "@/lib/content-generator";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "generate-all") {
      console.log("Starting content generation...");
      
      const curriculumResult = await generateSpanishCurriculum();
      if (!curriculumResult.success || !curriculumResult.data) {
        return NextResponse.json({ error: "Failed to generate curriculum" }, { status: 500 });
      }

      const { path, units } = curriculumResult.data;

      await db.delete(curriculumLessons).returning();
      await db.delete(curriculumUnits).returning();
      await db.delete(curriculumPaths).returning();

      const [newPath] = await db.insert(curriculumPaths).values({
        language: path.language,
        cefrLevel: path.cefrLevel,
        name: path.name,
        description: path.description,
        estimatedHours: path.estimatedHours,
        learningObjectives: JSON.stringify(path.learningObjectives),
      }).returning();

      console.log("Curriculum path created:", newPath.name);

      for (const unit of units) {
        const [newUnit] = await db.insert(curriculumUnits).values({
          pathId: newPath.id,
          unitNumber: unit.unitNumber,
          title: unit.title,
          description: unit.description,
          grammarTopics: JSON.stringify(unit.grammarTopics),
          vocabularyThemes: JSON.stringify(unit.vocabularyThemes),
          culturalFocus: unit.culturalFocus,
          targetSkills: JSON.stringify(unit.targetSkills),
          estimatedMinutes: unit.estimatedMinutes,
        }).returning();

        console.log("Unit created:", newUnit.title);

        for (const lesson of unit.lessons) {
          await db.insert(curriculumLessons).values({
            unitId: newUnit.id,
            lessonNumber: lesson.lessonNumber,
            title: lesson.title,
            learningOutcomes: JSON.stringify(lesson.learningOutcomes),
            contentType: lesson.contentType,
            durationMinutes: lesson.durationMinutes,
            orderIndex: lesson.orderIndex,
          });
        }
      }

      console.log("Generating vocabulary...");
      const vocabThemes = ["Greetings", "Numbers", "Family", "Food", "Daily Routines"];
      const existingVocab = await db.select().from(vocabularyItems);
      await db.delete(vocabularyItems).returning();

      for (const theme of vocabThemes) {
        const vocabResult = await generateVocabulary("es", theme, 15);
        if (vocabResult.success && vocabResult.data) {
          for (const item of vocabResult.data) {
            await db.insert(vocabularyItems).values({
              language: item.language,
              word: item.word,
              translations: JSON.stringify(item.translations),
              pronunciation: item.pronunciation,
              partOfSpeech: item.partOfSpeech,
              exampleSentences: JSON.stringify(item.exampleSentences),
              mnemonic: item.mnemonic,
            });
          }
          console.log(`Added ${vocabResult.data.length} ${theme} words`);
        }
      }

      console.log("Generating AI personas...");
      const personaResult = await generateAIPersona("es");
      await db.delete(aiPersonas).returning();

      if (personaResult.success && personaResult.data) {
        for (const persona of personaResult.data) {
          await db.insert(aiPersonas).values({
            name: persona.name,
            description: persona.description,
            language: persona.language,
            personaType: persona.personaType,
            personality: JSON.stringify(persona.personality),
            isSystem: persona.isSystem,
          });
        }
        console.log(`Added ${personaResult.data.length} AI personas`);
      }

      console.log("Generating exercises...");
      const vocabList = await db.select().from(vocabularyItems);
      const exerciseResult = await generateExercises(vocabList, "Basic Spanish grammar");
      await db.delete(exercises).returning();

      if (exerciseResult.success && exerciseResult.data) {
        for (const ex of exerciseResult.data) {
          await db.insert(exercises).values({
            lessonId: ex.lessonId,
            exerciseType: ex.exerciseType,
            difficultyLevel: ex.difficultyLevel,
            content: JSON.stringify(ex.content),
            pointsPossible: ex.pointsPossible,
          });
        }
        console.log(`Added ${exerciseResult.data.length} exercises`);
      }

      const finalVocab = await db.select().from(vocabularyItems);
      const finalLessons = await db.select().from(curriculumLessons);
      const finalPersons = await db.select().from(aiPersonas);
      const finalExercises = await db.select().from(exercises);

      return NextResponse.json({
        success: true,
        message: "Content generated successfully",
        stats: {
          vocabularyItems: finalVocab.length,
          lessons: finalLessons.length,
          personas: finalPersons.length,
          exercises: finalExercises.length,
        },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Content generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const vocab = await db.select().from(vocabularyItems);
  const paths = await db.select().from(curriculumPaths);
  const units = await db.select().from(curriculumUnits);
  const lessons = await db.select().from(curriculumLessons);
  const personas = await db.select().from(aiPersonas);
  const exerciseList = await db.select().from(exercises);

  return NextResponse.json({
    vocabulary: vocab.length,
    curriculumPaths: paths.length,
    curriculumUnits: units.length,
    curriculumLessons: lessons.length,
    aiPersonas: personas.length,
    exercises: exerciseList.length,
  });
}