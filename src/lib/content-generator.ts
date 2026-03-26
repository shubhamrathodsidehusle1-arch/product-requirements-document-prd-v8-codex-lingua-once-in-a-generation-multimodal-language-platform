import { sendChatMessage } from "@/lib/ai";
import type { ChatMessage } from "@/lib/ai";

interface GeneratedContent {
  success: boolean;
  data?: any;
  error?: string;
}

export async function generateWithAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  try {
    const response = await sendChatMessage(messages, {
      provider: "kilocode",
      model: "kilo-auto/free",
      maxTokens: 4096,
      temperature: 0.7,
    });
    return response.content;
  } catch (error: any) {
    console.error("AI generation error:", error.message);
    throw error;
  }
}

export async function generateSpanishCurriculum(): Promise<GeneratedContent> {
  const systemPrompt = `You are an expert Spanish curriculum designer. Create accurate, pedagogically sound language learning content. Always respond in valid JSON format.`;

  const userPrompt = `Generate a comprehensive Spanish A1 curriculum with the following structure. Return ONLY valid JSON, no additional text:

{
  "path": {
    "language": "es",
    "cefrLevel": "A1",
    "name": "Spanish A1 - Beginner",
    "description": "Learn basic Spanish for everyday situations",
    "estimatedHours": 40,
    "learningObjectives": ["Introduce yourself", "Ask for directions", "Order food", "Make basic conversation", "Describe people and places", "Talk about daily activities"]
  },
  "units": [
    {
      "unitNumber": 1,
      "title": "Unit title",
      "description": "Unit description",
      "grammarTopics": ["topic1", "topic2"],
      "vocabularyThemes": ["theme1", "theme2"],
      "culturalFocus": "cultural aspect",
      "targetSkills": ["speaking", "listening"],
      "estimatedMinutes": 45,
      "lessons": [
        {
          "lessonNumber": 1,
          "title": "Lesson title",
          "learningOutcomes": ["outcome1", "outcome2"],
          "contentType": "interactive|audio|video|text",
          "durationMinutes": 15,
          "orderIndex": 1
        }
      ]
    }
  ]
}

Create 5 units for A1 Spanish covering: Greetings, Numbers, Family, Food, Daily Routines. Each unit should have 2-3 lessons. Be accurate with Spanish grammar.`;

  try {
    const result = await generateWithAI(systemPrompt, userPrompt);
    const parsed = JSON.parse(result);
    return { success: true, data: parsed };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function generateVocabulary(language: string, theme: string, count: number = 20): Promise<GeneratedContent> {
  const systemPrompt = `You are an expert vocabulary creator for language learning. Create accurate vocabulary items with translations, pronunciations, and examples. Always respond in valid JSON format.`;

  const userPrompt = `Generate ${count} vocabulary words for ${language === "es" ? "Spanish" : language} themed around "${theme}". Return ONLY valid JSON:

[
  {
    "language": "es",
    "word": "spanish word",
    "translations": [{"language": "en", "translation": "english meaning"}],
    "pronunciation": "phonetic pronunciation",
    "partOfSpeech": "noun|verb|adjective|adverb|interjection|phrase",
    "exampleSentences": ["example in Spanish"],
    "mnemonic": "memory aid"
  }
]

Make sure translations are accurate. Use realistic, common vocabulary for A1 level learners.`;

  try {
    const result = await generateWithAI(systemPrompt, userPrompt);
    const parsed = JSON.parse(result);
    return { success: true, data: parsed };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function generateExercises(vocabulary: any[], grammarTopic: string): Promise<GeneratedContent> {
  const systemPrompt = `You are an expert exercise designer for language learning. Create pedagogically sound practice exercises. Always respond in valid JSON format.`;

  const userPrompt = `Generate 15 practice exercises for Spanish A1 level based on vocabulary: ${JSON.stringify(vocabulary.slice(0, 10).map(v => v.word))} and grammar topic: "${grammarTopic}". 

Return ONLY valid JSON array:
[
  {
    "lessonId": 1,
    "exerciseType": "multiple_choice|fill_blank|matching|speaking",
    "difficultyLevel": 1-3,
    "content": {
      "question": "question text",
      "options": ["a", "b", "c", "d"] (for multiple_choice),
      "correctAnswer": "correct answer",
      "hint": "optional hint"
    },
    "pointsPossible": 10-25
  }
]

Create varied exercises: 5 multiple choice, 5 fill in the blank, 5 matching. Ensure correct answers are accurate.`;

  try {
    const result = await generateWithAI(systemPrompt, userPrompt);
    const parsed = JSON.parse(result);
    return { success: true, data: parsed };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function generateAIPersona(language: string): Promise<GeneratedContent> {
  const systemPrompt = `You are an expert at creating AI language tutor personas. Create engaging, educational personas. Always respond in valid JSON format.`;

  const userPrompt = `Generate 4 AI tutor personas for ${language === "es" ? "Spanish" : language} language learning. Return ONLY valid JSON:

[
  {
    "name": "Persona name",
    "description": "Brief description of the persona",
    "language": "es",
    "personaType": "coach|scenario|cultural|grammar|exam",
    "personality": {"tone": "friendly|professional|academic", "formality": "low|medium|high", "humorLevel": "low|medium|high"},
    "isSystem": true
  }
]

Create: 1 conversation coach, 1 scenario expert (restaurant/travel), 1 grammar helper, 1 cultural guide. Make them distinctive and engaging.`;

  try {
    const result = await generateWithAI(systemPrompt, userPrompt);
    const parsed = JSON.parse(result);
    return { success: true, data: parsed };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}