# Active Context: Codex Lingua MVP

## Current State

**Project Status**: ✅ Database and landing page implemented

Codex Lingua - "Once-in-a-Generation" Multimodal Language Platform. Initial MVP with database schema and landing page complete.

## Recently Completed

- [x] Add database support with Drizzle ORM + SQLite
- [x] Create 21 core schema tables for full language platform
- [x] Build landing page with hero, features, language selection, pricing
- [x] Add custom Tailwind CSS 4 theme with brand colors and animations
- [x] Configure DM Sans font and metadata
- [x] Run typecheck and lint - all passing

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/db/schema.ts` | Database schema (21 tables) | ✅ Ready |
| `src/db/index.ts` | Database client | ✅ Ready |
| `src/db/migrations/` | Drizzle migrations | ✅ Ready |
| `src/app/page.tsx` | Landing page | ✅ Ready |
| `src/app/globals.css` | Custom theme | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |

## Schema Tables

- users, languages, user_languages
- vocabulary_items, user_vocabulary
- curriculum_paths, curriculum_units, curriculum_lessons
- exercises, exercise_attempts, user_exercise_progress
- ai_personas, ai_conversation_sessions, ai_conversation_messages
- speech_recordings
- subscription_plans, user_subscriptions
- notifications
- learning_events
- achievements, user_achievements

## Current Focus

Next steps could include:
1. Add language learning page at `/learn/[code]`
2. Add user authentication
3. Add API routes for curriculum, exercises
4. Seed initial languages and curriculum data

## Session History

| Date | Changes |
|------|---------|
| Initial | Base Next.js 16 template |
| V1 | Database schema + landing page |

## Quick Start Commands

```bash
bun install        # Install dependencies
bun dev            # Start dev server
bun typecheck      # Type check
bun lint           # Lint
bun db:generate   # Generate migrations
```

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Drizzle ORM + SQLite
- Bun package manager