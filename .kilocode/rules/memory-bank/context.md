# Active Context: Codex Lingua MVP

## Current State

**Project Status**: ✅ Landing page + language learning page implemented

Codex Lingua - "Once-in-a-Generation" Multimodal Language Platform. Landing page and language learning interface complete.

## Recently Completed

- [x] Landing page with hero, features, language catalog, pricing
- [x] Language learning page at `/learn/[code]` with 6 tabs:
  - Learn: lessons, XP progress, level tracking
  - AI Tutor: chat interface with persona
  - Vocabulary: SRS deck with mastered/learning status
  - Pronunciation: audio playback, recording UI
  - Writing: text input, templates, AI feedback
  - Community: groups, live events
- [x] Sidebar with navigation and daily progress
- [x] TypeScript + ESLint passing

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Landing page | ✅ |
| `src/app/learn/[code]/page.tsx` | Language learning page | ✅ |
| `src/db/schema.ts` | 21 database tables | ✅ |

## Current Focus

Next steps could include:
1. Add API routes for backend functionality
2. Connect to database for persistent data
3. Add user authentication
4. Create actual lesson content

## Session History

| Date | Changes |
|------|---------|
| V1 | Landing page + database schema |
| V2 | Language learning page with all learning modes |

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Drizzle ORM + SQLite
- Bun package manager