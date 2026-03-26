import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiPersonas } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const type = searchParams.get("type");
    
    let personas = await db.select().from(aiPersonas);
    
    if (language) {
      personas = personas.filter(p => p.language === language);
    }
    if (type) {
      personas = personas.filter(p => p.personaType === type);
    }
    
    return NextResponse.json(personas);
  } catch (error) {
    console.error("Error fetching personas:", error);
    return NextResponse.json({ error: "Failed to fetch personas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [persona] = await db.insert(aiPersonas).values({
      name: body.name,
      description: body.description,
      language: body.language,
      personaType: body.personaType,
      personality: JSON.stringify(body.personality || {}),
      isSystem: false,
      isPremium: body.isPremium || false,
    }).returning();
    
    return NextResponse.json(persona);
  } catch (error) {
    console.error("Error creating persona:", error);
    return NextResponse.json({ error: "Failed to create persona" }, { status: 500 });
  }
}