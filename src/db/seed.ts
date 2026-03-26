import { db } from "./index";
import { languages, vocabularyItems, curriculumPaths, curriculumUnits, curriculumLessons, aiPersonas, subscriptionPlans, achievements, exercises } from "./schema";

const SEED_LANGUAGES = [
  { code: "es", name: "Spanish", nativeName: "Español", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "en", name: "English", nativeName: "English", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "fr", name: "French", nativeName: "Français", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "de", name: "German", nativeName: "Deutsch", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "ja", name: "Japanese", nativeName: "日本語", script: "japanese", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "ko", name: "Korean", nativeName: "한국어", script: "korean", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "zh", name: "Chinese", nativeName: "中文", script: "chinese", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "pt", name: "Portuguese", nativeName: "Português", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "it", name: "Italian", nativeName: "Italiano", script: "latin", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "ru", name: "Russian", nativeName: "Русский", script: "cyrillic", direction: "ltr", tier: "A", releaseStage: "released", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x", tts: "custom" }) },
  { code: "ar", name: "Arabic", nativeName: "العربية", script: "arabic", direction: "rtl", tier: "B", releaseStage: "beta", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x" }) },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "devanagari", direction: "ltr", tier: "B", releaseStage: "beta", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x" }) },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", script: "latin", direction: "ltr", tier: "B", releaseStage: "beta", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x" }) },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", script: "latin", direction: "ltr", tier: "B", releaseStage: "beta", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x" }) },
  { code: "th", name: "Thai", nativeName: "ไทย", script: "thai", direction: "ltr", tier: "B", releaseStage: "beta", aiSupport: JSON.stringify({ chat: "gpt-5", speech: "whisper-x" }) },
];

const SEED_VOCABULARY = [
  { language: "es", word: "hola", translations: JSON.stringify([{ language: "en", translation: "hello" }]), pronunciation: "OH-lah", partOfSpeech: "interjection", exampleSentences: JSON.stringify(["¡Hola! ¿Cómo estás?"]), mnemonic: "Sounds like 'ola' - wave hello!" },
  { language: "es", word: "gracias", translations: JSON.stringify([{ language: "en", translation: "thank you" }]), pronunciation: "GRAH-see-ahs", partOfSpeech: "interjection", exampleSentences: JSON.stringify(["Muchas gracias por tu ayuda."]), mnemonic: "Grace - say thanks with grace!" },
  { language: "es", word: "por favor", translations: JSON.stringify([{ language: "en", translation: "please" }]), pronunciation: "por fah-VOR", partOfSpeech: "phrase", exampleSentences: JSON.stringify(["Por favor, pásame la sal."]), mnemonic: "Por favor = for favor - polite request" },
  { language: "es", word: "buenos días", translations: JSON.stringify([{ language: "en", translation: "good morning" }]), pronunciation: "BWEH-nohs DEE-ahs", partOfSpeech: "phrase", exampleSentences: JSON.stringify(["¡Buenos días! ¿Cómo dormiste?"]), mnemonic: "Buenos días = good days" },
  { language: "es", word: "adiós", translations: JSON.stringify([{ language: "en", translation: "goodbye" }]), pronunciation: "ah-dee-OHS", partOfSpeech: "interjection", exampleSentences: JSON.stringify(["Adiós, hasta mañana."]), mnemonic: "Sounds like 'adios' - bye!" },
  { language: "es", word: "lo siento", translations: JSON.stringify([{ language: "en", translation: "I'm sorry" }]), pronunciation: "loh see-EHN-toh", partOfSpeech: "phrase", exampleSentences: JSON.stringify(["Lo siento, llegué tarde."]), mnemonic: "Lo siento = I feel it" },
  { language: "es", word: "agua", translations: JSON.stringify([{ language: "en", translation: "water" }]), pronunciation: "AH-gwah", partOfSpeech: "noun", exampleSentences: JSON.stringify(["¿Me puedes dar agua?"]), mnemonic: "Sounds like 'ague' - need water!" },
  { language: "es", word: "comida", translations: JSON.stringify([{ language: "en", translation: "food" }]), pronunciation: "koh-MEE-dah", partOfSpeech: "noun", exampleSentences: JSON.stringify(["La comida está deliciosa."]), mnemonic: "Comida = food, same root" },
  { language: "es", word: "casa", translations: JSON.stringify([{ language: "en", translation: "house" }]), pronunciation: "KAH-sah", partOfSpeech: "noun", exampleSentences: JSON.stringify(["Mi casa es tu casa."]), mnemonic: "Casa = house, like 'case'" },
  { language: "es", word: "libro", translations: JSON.stringify([{ language: "en", translation: "book" }]), pronunciation: "LEE-broh", partOfSpeech: "noun", exampleSentences: JSON.stringify(["Este libro es interesante."]), mnemonic: "Libros = books in Spanish" },
];

const SEED_CURRICULUM = [
  { language: "es", cefrLevel: "A1", name: "Spanish A1 - Beginner", description: "Learn basic Spanish for everyday situations", estimatedHours: 40, learningObjectives: JSON.stringify(["Introduce yourself", "Ask for directions", "Order food", "Make basic conversation"]) },
  { language: "es", cefrLevel: "A2", name: "Spanish A2 - Elementary", description: "Build on A1 knowledge with more complex structures", estimatedHours: 80, learningObjectives: JSON.stringify(["Describe people and places", "Talk about past events", "Make comparisons", "Express opinions"]) },
  { language: "en", cefrLevel: "A1", name: "English A1 - Beginner", description: "Start your English journey from scratch", estimatedHours: 40, learningObjectives: JSON.stringify(["Basic greetings", "Numbers and counting", "Simple questions", "Daily vocabulary"]) },
];

const SEED_UNITS = [
  { pathId: 1, unitNumber: 1, title: "Greetings & Introductions", description: "Learn to greet people and introduce yourself", grammarTopics: JSON.stringify(["Ser vs Estar", "Subject pronouns"]), vocabularyThemes: JSON.stringify(["Greetings", "Numbers 1-10"]), culturalFocus: "Spanish greetings culture", targetSkills: JSON.stringify(["Speaking", "Listening"]), estimatedMinutes: 45 },
  { pathId: 1, unitNumber: 2, title: "Numbers & Time", description: "Count to 100 and tell time", grammarTopics: JSON.stringify(["Gender of nouns", "Question words"]), vocabularyThemes: JSON.stringify(["Numbers", "Time"]), culturalFocus: "Spanish time concepts", targetSkills: JSON.stringify(["Listening", "Reading"]), estimatedMinutes: 40 },
  { pathId: 1, unitNumber: 3, title: "Food & Drinks", description: "Order at restaurants and discuss preferences", grammarTopics: JSON.stringify(["Gustar verb", "Indefinite articles"]), vocabularyThemes: JSON.stringify(["Food items", "Drinks", "Restaurant phrases"]), culturalFocus: "Spanish dining customs", targetSkills: JSON.stringify(["Speaking", "Writing"]), estimatedMinutes: 55 },
];

const SEED_LESSONS = [
  { unitId: 1, lessonNumber: 1, title: "Basic Greetings", learningOutcomes: JSON.stringify(["Say hello and goodbye", "Use formal and informal greetings"]), contentType: "interactive", durationMinutes: 15, orderIndex: 1 },
  { unitId: 1, lessonNumber: 2, title: "Introducing Yourself", learningOutcomes: JSON.stringify(["Say your name", "Tell where you're from"]), contentType: "audio", durationMinutes: 20, orderIndex: 2 },
  { unitId: 1, lessonNumber: 3, title: "Numbers 1-10", learningOutcomes: JSON.stringify(["Count to 10", "Ask for numbers"]), contentType: "video", durationMinutes: 15, orderIndex: 3 },
  { unitId: 2, lessonNumber: 1, title: "Count to 100", learningOutcomes: JSON.stringify(["Count by tens", "Combine numbers"]), contentType: "interactive", durationMinutes: 20, orderIndex: 1 },
  { unitId: 2, lessonNumber: 2, title: "Telling Time", learningOutcomes: JSON.stringify(["Ask the time", "Tell time in Spanish"]), contentType: "text", durationMinutes: 20, orderIndex: 2 },
  { unitId: 3, lessonNumber: 1, title: "Restaurant Vocabulary", learningOutcomes: JSON.stringify(["Name food items", "Order a meal"]), contentType: "audio", durationMinutes: 25, orderIndex: 1 },
  { unitId: 3, lessonNumber: 2, title: "Using Gustar", learningOutcomes: JSON.stringify(["Express likes and dislikes", "Use gustar correctly"]), contentType: "interactive", durationMinutes: 30, orderIndex: 2 },
];

const SEED_PERSONAS = [
  { name: "María", description: "Your friendly Spanish conversation partner", language: "es", personaType: "coach", personality: JSON.stringify({ tone: "friendly", formality: "mixed", humorLevel: "medium" }), isSystem: true },
  { name: "Chef Ramón", description: "Spanish chef who teaches food vocabulary", language: "es", personaType: "scenario", scenarioConfigs: JSON.stringify({ scenarios: ["restaurant", "market", "cooking"] }), isSystem: true },
  { name: "Professor García", description: "Grammar expert who explains rules clearly", language: "es", personaType: "grammar", personality: JSON.stringify({ tone: "academic", formality: "high", humorLevel: "low" }), isSystem: true },
  { name: "Travel Agent Carmen", description: "Helps you practice travel scenarios", language: "es", personaType: "scenario", scenarioConfigs: JSON.stringify({ scenarios: ["airport", "hotel", "directions"] }), isSystem: true },
];

const SEED_SUBSCRIPTION_PLANS = [
  { name: "Free", monthlyPriceCents: 0, features: JSON.stringify({ languages: 3, xpPerDay: 50, aiMessagesPerDay: 10, vocabularyDecks: 3 }), limits: JSON.stringify({ languages: 3, xpPerDay: 50, aiMessagesPerDay: 10 }) },
  { name: "Plus", monthlyPriceCents: 999, yearlyPriceCents: 9999, features: JSON.stringify({ languages: 10, xpPerDay: 200, aiMessagesPerDay: 100, vocabularyDecks: "unlimited", offlineMode: true, advancedAnalytics: true }), limits: JSON.stringify({ languages: 10, xpPerDay: 200, aiMessagesPerDay: 100 }) },
  { name: "Pro", monthlyPriceCents: 1999, yearlyPriceCents: 19999, features: JSON.stringify({ languages: "unlimited", xpPerDay: "unlimited", aiMessagesPerDay: "unlimited", customPersonas: 10, apiAccess: "10k/mo", prioritySupport: true }), limits: JSON.stringify({ languages: "unlimited", xpPerDay: "unlimited", aiMessagesPerDay: "unlimited" }) },
];

const SEED_ACHIEVEMENTS = [
  { name: "First Steps", description: "Complete your first lesson", category: "milestone", criteria: JSON.stringify({ type: "lessons", value: 1 }), points: 10, tier: "bronze" },
  { name: "Vocabulary Builder", description: "Learn 10 new words", category: "learning", criteria: JSON.stringify({ type: "vocabulary", value: 10 }), points: 25, tier: "bronze" },
  { name: "Week Warrior", description: "Maintain a 7-day streak", category: "streak", criteria: JSON.stringify({ type: "streak", value: 7 }), points: 50, tier: "silver" },
  { name: "Conversation Starter", description: "Send 50 messages to AI tutor", category: "learning", criteria: JSON.stringify({ type: "aiMessages", value: 50 }), points: 75, tier: "silver" },
  { name: "Language Explorer", description: "Start learning 3 languages", category: "milestone", criteria: JSON.stringify({ type: "languages", value: 3 }), points: 100, tier: "gold" },
  { name: "Perfect Pronunciation", description: "Get 100% on 10 pronunciation exercises", category: "expert", criteria: JSON.stringify({ type: "pronunciationPerfect", value: 10 }), points: 150, tier: "gold" },
];

const SEED_EXERCISES = [
  { lessonId: 1, exerciseType: "multiple_choice", difficultyLevel: 1, content: JSON.stringify({ question: "How do you say 'Hello' in Spanish?", options: ["Hola", "Adiós", "Gracias", "Por favor"], correctAnswer: "Hola" }), pointsPossible: 10 },
  { lessonId: 1, exerciseType: "fill_blank", difficultyLevel: 1, content: JSON.stringify({ question: "Complete: ___ (Hello)", correctAnswer: "Hola", hint: "Starts with H" }), pointsPossible: 15 },
  { lessonId: 1, exerciseType: "matching", difficultyLevel: 1, content: JSON.stringify({ pairs: [{ term: "Hola", definition: "Hello" }, { term: "Adiós", definition: "Goodbye" }, { term: "Gracias", definition: "Thank you" }, { term: "Por favor", definition: "Please" }] }), pointsPossible: 20 },
  { lessonId: 2, exerciseType: "speaking", difficultyLevel: 2, content: JSON.stringify({ prompt: "Say: Me llamo María", targetText: "Me llamo María", language: "es" }), pointsPossible: 25 },
  { lessonId: 2, exerciseType: "multiple_choice", difficultyLevel: 1, content: JSON.stringify({ question: "What does 'Me llamo' mean?", options: ["My name is", "I am from", "I like", "Thank you"], correctAnswer: "My name is" }), pointsPossible: 10 },
  { lessonId: 3, exerciseType: "multiple_choice", difficultyLevel: 1, content: JSON.stringify({ question: "What number is 'cinco'?", options: ["5", "3", "7", "9"], correctAnswer: "5" }), pointsPossible: 10 },
  { lessonId: 3, exerciseType: "fill_blank", difficultyLevel: 2, content: JSON.stringify({ question: "Three = ___", correctAnswer: "tres", hint: "Sounds like 'trace'" }), pointsPossible: 15 },
  { lessonId: 4, exerciseType: "matching", difficultyLevel: 1, content: JSON.stringify({ pairs: [{ term: "uno", definition: "one" }, { term: "dos", definition: "two" }, { term: "tres", definition: "three" }, { term: "cuatro", definition: "four" }, { term: "cinco", definition: "five" }] }), pointsPossible: 25 },
  { lessonId: 5, exerciseType: "multiple_choice", difficultyLevel: 1, content: JSON.stringify({ question: "How do you say 'water' in Spanish?", options: ["agua", "comida", "casa", "libro"], correctAnswer: "agua" }), pointsPossible: 10 },
  { lessonId: 5, exerciseType: "fill_blank", difficultyLevel: 2, content: JSON.stringify({ question: "I want water = Quiero ___", correctAnswer: "agua", hint: "Water" }), pointsPossible: 15 },
  { lessonId: 6, exerciseType: "speaking", difficultyLevel: 2, content: JSON.stringify({ prompt: "Say: ¿Qué quiere comer?", targetText: "¿Qué quiere comer?", language: "es" }), pointsPossible: 25 },
  { lessonId: 6, exerciseType: "multiple_choice", difficultyLevel: 2, content: JSON.stringify({ question: "What is the plural of 'libro'?", options: ["libros", "libra", "libros", "libritos"], correctAnswer: "libros" }), pointsPossible: 10 },
];

async function seed() {
  console.log("Seeding database...");

  // Seed languages
  await db.insert(languages).values(SEED_LANGUAGES).onConflictDoNothing();
  console.log("Languages seeded");

  // Seed vocabulary
  await db.insert(vocabularyItems).values(SEED_VOCABULARY).onConflictDoNothing();
  console.log("Vocabulary seeded");

  // Seed curriculum paths
  const paths = await db.insert(curriculumPaths).values(SEED_CURRICULUM).onConflictDoNothing().returning();
  console.log("Curriculum paths seeded");

  // Seed units (using the first path ID)
  if (paths.length > 0) {
    const units = await db.insert(curriculumUnits).values(SEED_UNITS.map(u => ({ ...u, pathId: 1 }))).onConflictDoNothing().returning();
    console.log("Curriculum units seeded");

    // Seed lessons (using the first unit IDs)
    if (units.length > 0) {
      const lessonsWithUnitIds = SEED_LESSONS.map((l, i) => ({
        ...l,
        unitId: Math.floor(i / 2) + 1,
      }));
      await db.insert(curriculumLessons).values(lessonsWithUnitIds).onConflictDoNothing();
      console.log("Curriculum lessons seeded");
    }
  }

  // Seed AI personas
  await db.insert(aiPersonas).values(SEED_PERSONAS).onConflictDoNothing();
  console.log("AI personas seeded");

  // Seed subscription plans
  await db.insert(subscriptionPlans).values(SEED_SUBSCRIPTION_PLANS).onConflictDoNothing();
  console.log("Subscription plans seeded");

  // Seed achievements
  await db.insert(achievements).values(SEED_ACHIEVEMENTS).onConflictDoNothing();
  console.log("Achievements seeded");

  // Seed exercises
  await db.insert(exercises).values(SEED_EXERCISES).onConflictDoNothing();
  console.log("Exercises seeded");

  console.log("Seeding complete!");
}

seed().catch(console.error);