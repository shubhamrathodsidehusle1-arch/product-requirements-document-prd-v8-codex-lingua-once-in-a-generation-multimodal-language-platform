import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  authProvider: text("auth_provider").notNull().default("email"),
  displayName: text("display_name").notNull(),
  homeLanguage: text("home_language"),
  personas: text("personas").default("[]"),
  subscriptionTier: text("subscription_tier").default("free"),
  timezone: text("timezone").default("UTC"),
  devices: text("devices").default("[]"),
  preferences: text("preferences").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const languages = sqliteTable("languages", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
  nativeName: text("native_name").notNull(),
  script: text("script").notNull(),
  direction: text("direction").notNull().default("ltr"),
  tier: text("tier").notNull().default("B"),
  dialects: text("dialects").default("[]"),
  aiSupport: text("ai_support").default("{}"),
  culturalGuidelines: text("cultural_guidelines"),
  releaseStage: text("release_stage").default("beta"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userLanguages = sqliteTable("user_languages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  targetLanguage: text("target_language").notNull(),
  level: text("level"),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  masteryVector: text("mastery_vector"),
  goals: text("goals").default("{}"),
  badges: text("badges").default("[]"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const vocabularyItems = sqliteTable("vocabulary_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  language: text("language").notNull(),
  word: text("word").notNull(),
  translations: text("translations").notNull(),
  pronunciation: text("pronunciation"),
  partOfSpeech: text("part_of_speech"),
  grammarNotes: text("grammar_notes"),
  exampleSentences: text("example_sentences").default("[]"),
  mnemonic: text("mnemonic"),
  imageUrl: text("image_url"),
  audioUrl: text("audio_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userVocabulary = sqliteTable("user_vocabulary", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  vocabularyItemId: integer("vocabulary_item_id").notNull().references(() => vocabularyItems.id),
  easeFactor: real("ease_factor").default(2.5),
  intervalDays: integer("interval_days").default(0),
  repetitions: integer("repetitions").default(0),
  nextReviewDate: text("next_review_date"),
  lastReviewedAt: integer("last_reviewed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const curriculumPaths = sqliteTable("curriculum_paths", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  language: text("language").notNull(),
  cefrLevel: text("cefr_level").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  estimatedHours: integer("estimated_hours").notNull(),
  prerequisites: text("prerequisites").default("[]"),
  learningObjectives: text("learning_objectives").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const curriculumUnits = sqliteTable("curriculum_units", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pathId: integer("path_id").notNull().references(() => curriculumPaths.id),
  unitNumber: integer("unit_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  grammarTopics: text("grammar_topics").default("[]"),
  vocabularyThemes: text("vocabulary_themes").default("[]"),
  culturalFocus: text("cultural_focus"),
  targetSkills: text("target_skills").default("[]"),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const curriculumLessons = sqliteTable("curriculum_lessons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  unitId: integer("unit_id").notNull().references(() => curriculumUnits.id),
  lessonNumber: integer("lesson_number").notNull(),
  title: text("title").notNull(),
  learningOutcomes: text("learning_outcomes").notNull(),
  contentType: text("content_type").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  orderIndex: integer("order_index").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => curriculumLessons.id),
  exerciseType: text("exercise_type").notNull(),
  difficultyLevel: integer("difficulty_level"),
  content: text("content").notNull(),
  pointsPossible: integer("points_possible").default(1),
  timeLimitSeconds: integer("time_limit_seconds"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const exerciseAttempts = sqliteTable("exercise_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  response: text("response").notNull(),
  score: real("score"),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  attemptNumber: integer("attempt_number").default(1),
  timeTakenSeconds: integer("time_taken_seconds"),
  completedAt: integer("completed_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userExerciseProgress = sqliteTable("user_exercise_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  bestScore: real("best_score"),
  attemptsCount: integer("attempts_count").default(0),
  lastAttemptAt: integer("last_attempt_at", { mode: "timestamp" }),
  masteredAt: integer("mastered_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const aiPersonas = sqliteTable("ai_personas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  language: text("language").notNull(),
  personaType: text("persona_type").notNull(),
  avatarUrl: text("avatar_url"),
  personality: text("personality"),
  scenarioConfigs: text("scenario_configs"),
  isSystem: integer("is_system", { mode: "boolean" }).default(false),
  isPremium: integer("is_premium", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const aiConversationSessions = sqliteTable("ai_conversation_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  personaId: integer("persona_id").notNull().references(() => aiPersonas.id),
  language: text("language").notNull(),
  status: text("status").notNull().default("active"),
  startedAt: integer("started_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  totalMessages: integer("total_messages").default(0),
  avgResponseTimeMs: integer("avg_response_time_ms"),
  userRating: integer("user_rating"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const aiConversationMessages = sqliteTable("ai_conversation_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id").notNull().references(() => aiConversationSessions.id),
  role: text("role").notNull(),
  content: text("content").notNull(),
  metadata: text("metadata"),
  tokenCount: integer("token_count"),
  modelUsed: text("model_used"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const speechRecordings = sqliteTable("speech_recordings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  language: text("language").notNull(),
  referenceText: text("reference_text").notNull(),
  audioUrl: text("audio_url").notNull(),
  durationMs: integer("duration_ms").notNull(),
  score: real("score"),
  phonemeScores: text("phoneme_scores"),
  prosodyScore: real("prosody_score"),
  waveformData: text("waveform_data"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const subscriptionPlans = sqliteTable("subscription_plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  stripePriceId: text("stripe_price_id"),
  monthlyPriceCents: integer("monthly_price_cents").notNull().default(0),
  yearlyPriceCents: integer("yearly_price_cents"),
  features: text("features").notNull(),
  limits: text("limits").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userSubscriptions = sqliteTable("user_subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  planId: integer("plan_id").notNull().references(() => subscriptionPlans.id),
  status: text("status").notNull(),
  currentPeriodStart: integer("current_period_start", { mode: "timestamp" }).notNull(),
  currentPeriodEnd: integer("current_period_end", { mode: "timestamp" }).notNull(),
  cancelAtPeriodEnd: integer("cancel_at_period_end", { mode: "boolean" }).default(false),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  data: text("data"),
  channel: text("channel").notNull(),
  status: text("status").notNull().default("pending"),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  sentAt: integer("sent_at", { mode: "timestamp" }),
  readAt: integer("read_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const learningEvents = sqliteTable("learning_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  language: text("language").notNull(),
  modality: text("modality").notNull(),
  artifactId: integer("artifact_id"),
  score: real("score"),
  durationSeconds: integer("duration_seconds"),
  metadata: text("metadata").default("{}"),
  occurredAt: integer("occurred_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  iconUrl: text("icon_url"),
  category: text("category").notNull(),
  criteria: text("criteria").notNull(),
  points: integer("points").default(0),
  tier: text("tier"),
  isSecret: integer("is_secret", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userAchievements = sqliteTable("user_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: integer("unlocked_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});