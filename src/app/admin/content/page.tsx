import { getDb } from "@/db";
import { curriculumPaths, curriculumUnits, curriculumLessons, vocabularyItems, aiPersonas, exercises } from "@/db/schema";

export const dynamic = "force-dynamic";

async function getContentData() {
  try {
    const db = getDb();
    const paths = await db.select().from(curriculumPaths);
    const units = await db.select().from(curriculumUnits);
    const lessons = await db.select().from(curriculumLessons);
    const vocab = await db.select().from(vocabularyItems);
    const personas = await db.select().from(aiPersonas);
    const exerciseList = await db.select().from(exercises);

    return { paths, units, lessons, vocab, personas, exerciseList };
  } catch (error) {
    console.error("Database error:", error);
    return { 
      paths: [], 
      units: [], 
      lessons: [], 
      vocab: [], 
      personas: [], 
      exerciseList: [],
      error: "Database not configured. Set DB_URL and DB_TOKEN environment variables." 
    };
  }
}

function parseJsonField(field: any, defaultValue: any = []): any {
  if (!field) return defaultValue;
  if (typeof field === "object") return field;
  try {
    return JSON.parse(field);
  } catch {
    return defaultValue;
  }
}

export default async function AdminContentPage() {
  const { paths, units, lessons, vocab, personas, exerciseList, error } = await getContentData();

  return (
    <div className="min-h-screen bg-surface-dark">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-slate-400 mt-2">Generate and manage curriculum content</p>
          </div>
        </div>

        {error && (
          <div className="glass-card p-6 mb-6 border-red-500/30">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Database Not Configured</h2>
            <p className="text-slate-400">{error}</p>
            <p className="text-slate-500 text-sm mt-2">
              Please set DB_URL and DB_TOKEN environment variables in your deployment.
            </p>
          </div>
        )}

        {!error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-brand-400 mb-2">{paths.length}</div>
                <div className="text-slate-400">Curriculum Paths</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-accent-400 mb-2">{units.length}</div>
                <div className="text-slate-400">Curriculum Units</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">{lessons.length}</div>
                <div className="text-slate-400">Lessons</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{vocab.length}</div>
                <div className="text-slate-400">Vocabulary Items</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-purple-400 mb-2">{personas.length}</div>
                <div className="text-slate-400">AI Personas</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-orange-400 mb-2">{exerciseList.length}</div>
                <div className="text-slate-400">Exercises</div>
              </div>
            </div>

            {paths.length > 0 && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Curriculum Structure</h2>
                <div className="space-y-4">
                  {paths.map((path) => (
                    <div key={path.id} className="border-l-2 border-brand-500 pl-4">
                      <div className="font-semibold">{path.name}</div>
                      <div className="text-sm text-slate-400">{path.description}</div>
                      <div className="mt-2 space-y-2">
                        {units.filter(u => u.pathId === path.id).map((unit) => (
                          <div key={unit.id} className="ml-4 border-l border-slate-700 pl-3 py-2">
                            <div className="font-medium text-sm">Unit {unit.unitNumber}: {unit.title}</div>
                            <div className="text-xs text-slate-500">
                              {lessons.filter(l => l.unitId === unit.id).length} lessons
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}