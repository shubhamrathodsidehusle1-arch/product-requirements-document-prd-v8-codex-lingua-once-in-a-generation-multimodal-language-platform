import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiPersonas, aiConversationMessages, aiConversationSessions } from "@/db/schema";
import { sendChatMessage, getDefaultProvider, type ChatMessage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, personaId, message, language, provider, model } = body;

    if (!userId || !message) {
      return NextResponse.json({ error: "userId and message required" }, { status: 400 });
    }

    const userIdNum = parseInt(userId);
    const allSessions = await db.select().from(aiConversationSessions);
    const activeSessions = allSessions.filter(s => s.userId === userIdNum && s.status === "active");
    let session = activeSessions[0];
    
    if (!session) {
      const newSession = await db.insert(aiConversationSessions).values({
        userId: userIdNum,
        personaId: personaId || 1,
        language: language || "es",
        status: "active",
        startedAt: new Date(),
      }).returning();
      session = newSession[0];
    }

    await db.insert(aiConversationMessages).values({
      sessionId: session.id,
      role: "user",
      content: message,
      createdAt: new Date(),
    });

    const allPersonas = await db.select().from(aiPersonas);
    const persona = allPersonas.find(p => p.id === (personaId || 1));

    const allMessages = await db.select().from(aiConversationMessages);
    const sessionMessages = allMessages.filter(m => m.sessionId === session.id);
    const conversationHistory = sessionMessages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const aiProvider = provider || getDefaultProvider();
    
    let systemPrompt = `You are a language learning tutor. Help the user practice their target language. Be encouraging, correct mistakes gently, and explain grammar concepts when needed.`;
    
    if (persona) {
      systemPrompt = `You are ${persona.name}, ${persona.description}. ${persona.personality ? JSON.parse(persona.personality).tone === "friendly" ? "Be warm and friendly." : "Be professional and clear." : ""} Keep responses educational and encourage practice.`;
    }

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10),
      { role: "user", content: message },
    ];

    let aiResponse: string;
    let usedModel = model || "kilo-auto/free";

    try {
      const response = await sendChatMessage(messages, {
        provider: aiProvider,
        model: usedModel,
        maxTokens: 2048,
        temperature: 0.7,
      });
      aiResponse = response.content;
    } catch (error: any) {
      console.error("AI provider error:", error.message);
      
      aiResponse = generateFallbackResponse(message, persona?.name || "Tutor", language || "es");
    }

    await db.insert(aiConversationMessages).values({
      sessionId: session.id,
      role: "assistant",
      content: aiResponse,
      createdAt: new Date(),
    });

    return NextResponse.json({
      response: aiResponse,
      persona: persona?.name || "Tutor",
      sessionId: session.id,
      provider: aiProvider,
      model: usedModel,
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}

function generateFallbackResponse(userMessage: string, personaName: string, language: string): string {
  const lower = userMessage.toLowerCase();
  
  const responses: Record<string, string[]> = {
    "María": [
      "¡Muy bien! Let's practice more. Try saying: 'Me llamo María y soy de España.'",
      "¡Excelente! You're getting the hang of it. Remember, Spanish verbs change based on who is speaking.",
      "Don't worry about mistakes - they're the best way to learn! Try again: '¿Cómo te llamas?'",
    ],
    "default": [
      "That's a great question! Keep practicing every day.",
      "You're doing wonderfully! Try using the vocabulary you've learned.",
      "Remember, consistency is key to language learning. Let's continue!",
    ],
  };

  const personaResponses = responses[personaName] || responses["default"];
  const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)];

  if (lower.includes("hola") || lower.includes("hello") || lower.includes("hi")) {
    return language === "es" 
      ? "¡Hola! ¿Cómo estás hoy? Let's practice some Spanish!"
      : "Hello! Great to practice with you today!";
  }
  
  if (lower.includes("gracias") || lower.includes("thank")) {
    return language === "es"
      ? "¡De nada! You're welcome. Keep up the great work!"
      : "You're welcome!";
  }

  return randomResponse;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionId = searchParams.get("sessionId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const userIdNum = parseInt(userId);
    const allSessions = await db.select().from(aiConversationSessions);
    let sessions = allSessions.filter(s => s.userId === userIdNum);

    if (sessionId) {
      const sessionIdNum = parseInt(sessionId);
      sessions = sessions.filter(s => s.id === sessionIdNum);
    }

    const allMessages = await db.select().from(aiConversationMessages);
    
    const sessionsWithMessages = sessions.map((session) => {
      const messages = allMessages
        .filter(m => m.sessionId === session.id)
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
      return { ...session, messages };
    });

    return NextResponse.json(sessionsWithMessages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}