import { NextResponse } from "next/server";
import { db } from "@/db";
import { vocabularyItems } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    
    const allVocab = await db.select().from(vocabularyItems).limit(50);
    
    const result = language 
      ? allVocab.filter(v => v.language === language)
      : allVocab;
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching vocabulary:", error);
    return NextResponse.json({ error: "Failed to fetch vocabulary" }, { status: 500 });
  }
}