import { NextResponse } from "next/server";
import { db } from "@/db";
import { languages } from "@/db/schema";

export async function GET() {
  try {
    const allLanguages = await db.select().from(languages).orderBy(languages.name);
    return NextResponse.json(allLanguages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}