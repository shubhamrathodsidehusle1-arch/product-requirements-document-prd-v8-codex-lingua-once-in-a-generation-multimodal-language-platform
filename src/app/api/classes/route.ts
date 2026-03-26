import { NextResponse } from "next/server";

const MOCK_CLASSES = [
  {
    id: 1,
    title: "Spanish Conversation Club",
    description: "Practice speaking with fellow learners",
    instructor: "María García",
    classType: "group",
    language: "es",
    cefrLevel: "A2",
    maxParticipants: 8,
    currentParticipants: 5,
    scheduledAt: new Date(Date.now() + 3600000).toISOString(),
    durationMinutes: 45,
    status: "scheduled",
  },
  {
    id: 2,
    title: "Grammar Workshop: Ser vs Estar",
    description: "Master the tricky differences between these two verbs",
    instructor: "Prof. Rodríguez",
    classType: "masterclass",
    language: "es",
    cefrLevel: "B1",
    maxParticipants: 50,
    currentParticipants: 23,
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    durationMinutes: 60,
    status: "scheduled",
  },
  {
    id: 3,
    title: "Japanese Pronunciation Practice",
    description: "Perfect your accent with native speaker feedback",
    instructor: "Yuki Tanaka",
    classType: "1on1",
    language: "ja",
    cefrLevel: "A1",
    maxParticipants: 1,
    currentParticipants: 0,
    scheduledAt: new Date(Date.now() + 172800000).toISOString(),
    durationMinutes: 30,
    status: "scheduled",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const classType = searchParams.get("type");

    let result = MOCK_CLASSES;

    if (language) {
      result = result.filter(c => c.language === language);
    }
    if (classType) {
      result = result.filter(c => c.classType === classType);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, classId, action } = body;

    if (!userId || !classId) {
      return NextResponse.json({ error: "userId and classId required" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `Enrolled in class ${classId}` });
  } catch (error) {
    console.error("Error managing enrollment:", error);
    return NextResponse.json({ error: "Failed to manage enrollment" }, { status: 500 });
  }
}