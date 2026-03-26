# Active Context: Codex Lingua Full-Stack App

## Current State

**Project Status**: ✅ Full-stack with auth, APIs, database, and all PRD features implemented

Codex Lingua - "Once-in-a-Generation" Multimodal Language Platform. Complete with authentication, API routes, server actions, database seeding, and all major user-facing features.

## Recently Completed

- [x] Add NextAuth.js authentication with credentials provider
- [x] Create /auth/signin page for user login
- [x] Add API routes: /api/languages, /api/vocabulary, /api/curriculum, /api/ai/personas
- [x] Create server actions for vocabulary and curriculum
- [x] Add database seed script with 15 languages, vocabulary, curriculum, personas, plans, achievements
- [x] Add TypeScript declarations for next-auth
- [x] TypeScript + ESLint passing
- [x] User Dashboard (/dashboard) - stats, streaks, due vocab, recommended lessons
- [x] Placement Assessment (/assessment) - language selection, level testing, CEFR results
- [x] Profile Settings (/settings/profile) - display name, email, timezone, home language
- [x] Progress Dashboard (/progress) - XP tracking, level progress, weekly goals, language stats
- [x] Live Classes (/classes) - class listings, filtering (free/live), scheduling
- [x] Subscription Management (/settings/subscription) - plan comparison, usage stats, billing
- [x] Notification Center (/settings/notifications) - notifications list, filters, mark as read
- [x] Achievements (/achievements) - achievements list with progress, categories, XP rewards
- [x] Language Search on Landing - search 120+ languages with autocomplete
- [x] Onboarding Flow (/onboarding) - 4-step: language, level, goals, time commitment

## Full-Stack Architecture

| Layer | Components |
|-------|------------|
| Auth | NextAuth.js with credentials provider |
| API | REST endpoints for languages, vocabulary, curriculum, AI personas |
| Server Actions | getVocabulary, getCurriculum for server components |
| Database | 21 tables via Drizzle ORM + SQLite |
| Seed | Initial data: 15 languages, 10 Spanish vocab, curriculum, personas, plans, achievements |

## Pages & Routes

| Path | Description |
|------|-------------|
| / | Landing page with language search |
| /dashboard | User dashboard with stats and continue learning |
| /assessment | Placement test for CEFR level |
| /progress | Detailed progress tracking |
| /achievements | Achievements and milestones |
| /classes | Live classes schedule |
| /onboarding | New user 4-step onboarding |
| /learn/[code] | Language learning with 6 tabs |
| /learn/[code]/practice | Exercise practice |
| /learn/[code]/review | Vocabulary review (SRS) |
| /settings/profile | User profile settings |
| /settings/subscription | Subscription management |
| /settings/notifications | Notification preferences |
| /settings/ai | AI provider settings |
| /admin/content | Content management |
| /auth/signin | Sign in page |

## API Routes

- `GET /api/languages` - List all languages
- `GET /api/vocabulary?language=es` - Get vocabulary items
- `GET /api/curriculum` - Get curriculum paths with units and lessons
- `GET /api/ai/personas?language=es` - Get AI personas
- `POST /api/ai/personas` - Create custom persona
- `POST /api/ai/chat` - AI chat for tutoring

## Session History

| Version | Features |
|---------|----------|
| V1 | Landing page + database schema |
| V2 | Language learning page (6 tabs) |
| V3 | Auth, APIs, seed data (full-stack) |
| V4 | Full PRD implementation - dashboard, assessment, settings, classes, achievements, onboarding |

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Drizzle ORM + SQLite
- NextAuth.js authentication
- Bun package manager