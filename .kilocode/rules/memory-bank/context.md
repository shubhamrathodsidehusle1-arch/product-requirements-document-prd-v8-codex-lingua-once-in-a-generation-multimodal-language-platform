# Active Context: Codex Lingua Full-Stack App

## Current State

**Project Status**: ✅ Full-stack with auth, APIs, database, seed data

Codex Lingua - "Once-in-a-Generation" Multimodal Language Platform. Full-stack with authentication, API routes, server actions, and database seeding.

## Recently Completed

- [x] Add NextAuth.js authentication with credentials provider
- [x] Create /auth/signin page for user login
- [x] Add API routes: /api/languages, /api/vocabulary, /api/curriculum, /api/ai/personas
- [x] Create server actions for vocabulary and curriculum
- [x] Add database seed script with 15 languages, vocabulary, curriculum, personas, plans, achievements
- [x] Add TypeScript declarations for next-auth
- [x] TypeScript + ESLint passing

## Full-Stack Architecture

| Layer | Components |
|-------|------------|
| Auth | NextAuth.js with credentials provider |
| API | REST endpoints for languages, vocabulary, curriculum, AI personas |
| Server Actions | getVocabulary, getCurriculum for server components |
| Database | 21 tables via Drizzle ORM + SQLite |
| Seed | Initial data: 15 languages, 10 Spanish vocab, curriculum, personas, plans, achievements |

## API Routes

- `GET /api/languages` - List all languages
- `GET /api/vocabulary?language=es` - Get vocabulary items
- `GET /api/curriculum` - Get curriculum paths with units and lessons
- `GET /api/ai/personas?language=es` - Get AI personas
- `POST /api/ai/personas` - Create custom persona

## Session History

| Version | Features |
|---------|----------|
| V1 | Landing page + database schema |
| V2 | Language learning page (6 tabs) |
| V3 | Auth, APIs, seed data (full-stack) |

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Drizzle ORM + SQLite
- NextAuth.js authentication
- Bun package manager