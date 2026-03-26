import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiPersonas, aiConversationMessages, aiConversationSessions } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, personaId, message, language } = body;

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
    const conversationHistory = sessionMessages
      .slice(-5)
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    let aiResponse = "";
    
    if (persona) {
      const personaName = persona.name;
      const prompt = `You are ${personaName}, ${persona.description}. 
      
Previous conversation:
${conversationHistory}

User says: "${message}"

Respond as ${personaName} would, keeping responses educational and encouraging. 
If the user makes mistakes, gently correct them.
Keep responses concise and conversational.
Respond in ${language || "Spanish"} unless user switches language.`;

      aiResponse = generateAIResponse(prompt, personaName);
    } else {
      aiResponse = generateAIResponse(message, "Tutor");
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
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}

function generateAIResponse(userMessage: string, personaName: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  const responses: Record<string, string[]> = {
    "María": [
      "¡Muy bien! Let's practice more. Try saying: 'Me llamo María y soy de España.'",
      "¡Excelente! You're getting the hang of it. Remember, Spanish verbs change based on who is speaking.",
      "Don't worry about mistakes - they're the best way to learn! Try again: '¿Cómo te llamas?'",
      "I love your enthusiasm! Let's work on pronunciation. Listen carefully: 'RRRRR' comes from the back of your throat.",
    ],
    "default": [
      "That's a great question! Let me explain...",
      "You're doing wonderfully! Keep practicing every day.",
      "Remember, consistency is key to language learning. Let's continue!",
    ],
  };

  const personaResponses = responses[personaName] || responses["default"];
  const randomResponse = personaResponses[Math.floor(Math.random() * personaResponses.length)];

  if (lowerMessage.includes("hola") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return personaName === "María" 
      ? "¡Hola! ¿Cómo estás hoy? Let's practice some Spanish!"
      : "Hello! Great to practice with you today!";
  }
  
  if (lowerMessage.includes("gracias") || lowerMessage.includes("thank")) {
    return personaName === "María"
      ? "¡De nada! You're welcome. Keep up the great work!"
      : "You're welcome! Remember to say 'thank you' in Spanish: ¡Gracias!";
  }
  
  if (lowerMessage.includes("help") || lowerMessage.includes("ayuda") || lowerMessage.includes("?")) {
    return personaName === "María"
      ? "¡Con mucho gusto! I'm here to help. Ask me anything about Spanish!"
      : "I'm here to help! What would you like to learn about?";
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