CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`icon_url` text,
	`category` text NOT NULL,
	`criteria` text NOT NULL,
	`points` integer DEFAULT 0,
	`tier` text,
	`is_secret` integer DEFAULT false,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `ai_conversation_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`metadata` text,
	`token_count` integer,
	`model_used` text,
	`created_at` integer,
	FOREIGN KEY (`session_id`) REFERENCES `ai_conversation_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ai_conversation_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`persona_id` integer NOT NULL,
	`language` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`total_messages` integer DEFAULT 0,
	`avg_response_time_ms` integer,
	`user_rating` integer,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`persona_id`) REFERENCES `ai_personas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ai_personas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`language` text NOT NULL,
	`persona_type` text NOT NULL,
	`avatar_url` text,
	`personality` text,
	`scenario_configs` text,
	`is_system` integer DEFAULT false,
	`is_premium` integer DEFAULT false,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `curriculum_lessons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`unit_id` integer NOT NULL,
	`lesson_number` integer NOT NULL,
	`title` text NOT NULL,
	`learning_outcomes` text NOT NULL,
	`content_type` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`order_index` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`unit_id`) REFERENCES `curriculum_units`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `curriculum_paths` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`language` text NOT NULL,
	`cefr_level` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`estimated_hours` integer NOT NULL,
	`prerequisites` text DEFAULT '[]',
	`learning_objectives` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `curriculum_units` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path_id` integer NOT NULL,
	`unit_number` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`grammar_topics` text DEFAULT '[]',
	`vocabulary_themes` text DEFAULT '[]',
	`cultural_focus` text,
	`target_skills` text DEFAULT '[]',
	`estimated_minutes` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`path_id`) REFERENCES `curriculum_paths`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercise_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`response` text NOT NULL,
	`score` real,
	`is_correct` integer NOT NULL,
	`attempt_number` integer DEFAULT 1,
	`time_taken_seconds` integer,
	`completed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lesson_id` integer,
	`exercise_type` text NOT NULL,
	`difficulty_level` integer,
	`content` text NOT NULL,
	`points_possible` integer DEFAULT 1,
	`time_limit_seconds` integer,
	`created_at` integer,
	FOREIGN KEY (`lesson_id`) REFERENCES `curriculum_lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`native_name` text NOT NULL,
	`script` text NOT NULL,
	`direction` text DEFAULT 'ltr' NOT NULL,
	`tier` text DEFAULT 'B' NOT NULL,
	`dialects` text DEFAULT '[]',
	`ai_support` text DEFAULT '{}',
	`cultural_guidelines` text,
	`release_stage` text DEFAULT 'beta',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `learning_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`language` text NOT NULL,
	`modality` text NOT NULL,
	`artifact_id` integer,
	`score` real,
	`duration_seconds` integer,
	`metadata` text DEFAULT '{}',
	`occurred_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`data` text,
	`channel` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`scheduled_at` integer,
	`sent_at` integer,
	`read_at` integer,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `speech_recordings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`language` text NOT NULL,
	`reference_text` text NOT NULL,
	`audio_url` text NOT NULL,
	`duration_ms` integer NOT NULL,
	`score` real,
	`phoneme_scores` text,
	`prosody_score` real,
	`waveform_data` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subscription_plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`stripe_price_id` text,
	`monthly_price_cents` integer DEFAULT 0 NOT NULL,
	`yearly_price_cents` integer,
	`features` text NOT NULL,
	`limits` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`achievement_id` integer NOT NULL,
	`unlocked_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_exercise_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`best_score` real,
	`attempts_count` integer DEFAULT 0,
	`last_attempt_at` integer,
	`mastered_at` integer,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_languages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`target_language` text NOT NULL,
	`level` text,
	`xp` integer DEFAULT 0,
	`streak` integer DEFAULT 0,
	`mastery_vector` text,
	`goals` text DEFAULT '{}',
	`badges` text DEFAULT '[]',
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`plan_id` integer NOT NULL,
	`status` text NOT NULL,
	`current_period_start` integer NOT NULL,
	`current_period_end` integer NOT NULL,
	`cancel_at_period_end` integer DEFAULT false,
	`stripe_subscription_id` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`vocabulary_item_id` integer NOT NULL,
	`ease_factor` real DEFAULT 2.5,
	`interval_days` integer DEFAULT 0,
	`repetitions` integer DEFAULT 0,
	`next_review_date` text,
	`last_reviewed_at` integer,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vocabulary_item_id`) REFERENCES `vocabulary_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`auth_provider` text DEFAULT 'email' NOT NULL,
	`display_name` text NOT NULL,
	`home_language` text,
	`personas` text DEFAULT '[]',
	`subscription_tier` text DEFAULT 'free',
	`timezone` text DEFAULT 'UTC',
	`devices` text DEFAULT '[]',
	`preferences` text DEFAULT '{}',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `vocabulary_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`language` text NOT NULL,
	`word` text NOT NULL,
	`translations` text NOT NULL,
	`pronunciation` text,
	`part_of_speech` text,
	`grammar_notes` text,
	`example_sentences` text DEFAULT '[]',
	`mnemonic` text,
	`image_url` text,
	`audio_url` text,
	`created_at` integer
);
