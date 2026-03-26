# System Patterns: Codex Lingua

## Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Custom Tailwind theme
│   └── learn/
│       └── [code]/         # Language learning pages
├── db/                     # Database layer
│   ├── schema.ts           # Drizzle schema (21 tables)
│   ├── index.ts            # Database client
│   ├── migrate.ts          # Migration runner
│   └── migrations/        # Generated migrations
└── (expand as needed)
    ├── components/         # React components
    ├── lib/                # Utilities
    ├── actions/           # Server actions
    └── api/               # API routes
```

## Database Schema (21 Tables)

### Core
- `users` - User accounts and preferences
- `languages` - Language catalog with tiers
- `user_languages` - User's target languages and progress

### Curriculum
- `curriculum_paths` - CEFR-level paths per language
- `curriculum_units` - Units within paths
- `curriculum_lessons` - Individual lessons

### Vocabulary & Exercises
- `vocabulary_items` - Word definitions, translations
- `user_vocabulary` - SRS state per user/word
- `exercises` - Exercise definitions
- `exercise_attempts` - User attempts
- `user_exercise_progress` - Mastery tracking

### AI & Conversation
- `ai_personas` - AI tutor configurations
- `ai_conversation_sessions` - Session metadata
- `ai_conversation_messages` - Message history

### Speech
- `speech_recordings` - User recordings with scores

### Subscriptions & Notifications
- `subscription_plans` - Plan definitions
- `user_subscriptions` - User's active subscription
- `notifications` - User notifications

### Analytics & Gamification
- `learning_events` - Daily activity logs
- `achievements` - Badge definitions
- `user_achievements` - Unlocked badges

## Key Design Patterns

### 1. App Router Pattern

```
src/app/
├── page.tsx              # Landing page: /
├── learn/
│   └── [code]/           # Language pages: /learn/es
│       └── page.tsx
└── api/
    └── route.ts          # API: /api/*
```

### 2. Server Components by Default

All components are Server Components unless marked with `"use client"`:
```tsx
// Server Component - can fetch data, access DB
export default async function Page() {
  const data = await db.select().from(users);
  return <div>{data.length} users</div>;
}

// Client Component - for interactivity
"use client";
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 3. Database Access Pattern

```tsx
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(id: number) {
  return db.select().from(users).where(eq(users.id, id));
}
```

### 4. Component Organization

```
src/components/
├── ui/                   # Reusable (Button, Card, Input)
├── layout/               # (Header, Footer, Sidebar)
├── sections/             # (Hero, Features, Pricing)
└── learn/                # Language-specific components
```

## Styling Conventions

### Tailwind CSS 4 Theme

Custom theme in `globals.css`:
- `--color-brand-*` - Primary blue palette
- `--color-accent-*` - Purple/pink for highlights
- `--color-surface-*` - Dark theme colors

Component classes:
- `.glass-card` - Glassmorphism cards
- `.gradient-text` - Animated gradient text
- `.btn-primary` / `.btn-secondary` - Styled buttons
- `.input-search` - Styled search inputs

## State Management

For MVP:
- Server Components for data fetching
- `useState` for local component state

Future considerations:
- Zustand for client state
- React Query for server state caching