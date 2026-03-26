# Technical Context: Codex Lingua

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.9.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS with custom theme |
| Drizzle ORM | 0.45.x | Database ORM |
| SQLite | - | Local database |
| Bun | Latest | Package manager & runtime |

## Dependencies

### Production
```json
{
  "next": "^16.1.3",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "@kilocode/app-builder-db": "github:Kilo-Org/app-builder-db#main",
  "drizzle-orm": "^0.45.1"
}
```

### Dev
```json
{
  "drizzle-kit": "^0.31.10",
  "typescript": "^5.9.3",
  "@types/node": "^24.10.2",
  "@types/react": "^19.2.7",
  "@tailwindcss/postcss": "^4.1.17",
  "tailwindcss": "^4.1.17",
  "eslint": "^9.39.1",
  "eslint-config-next": "^16.0.0"
}
```

## Development Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server (http://localhost:3000)
bun build            # Production build
bun start            # Start production server
bun lint             # Run ESLint
bun typecheck        # Run TypeScript type checking
bun db:generate      # Generate Drizzle migrations
```

## Database Schema

Located in `src/db/schema.ts` with 21 tables:
- Core: users, languages, user_languages
- Curriculum: curriculum_paths, curriculum_units, curriculum_lessons
- Vocabulary: vocabulary_items, user_vocabulary
- Exercises: exercises, exercise_attempts, user_exercise_progress
- AI: ai_personas, ai_conversation_sessions, ai_conversation_messages
- Speech: speech_recordings
- Subscriptions: subscription_plans, user_subscriptions
- Notifications: notifications
- Analytics: learning_events
- Gamification: achievements, user_achievements

## Project Structure

```
/
├── package.json            # Dependencies and scripts
├── drizzle.config.ts       # Drizzle configuration
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   ├── globals.css    # Custom Tailwind theme
│   │   └── learn/
│   │       └── [code]/    # Language pages (to add)
│   └── db/                # Database layer
│       ├── schema.ts      # Schema definitions
│       ├── index.ts       # DB client
│       ├── migrate.ts     # Migration runner
│       └── migrations/   # Generated SQL migrations
```

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript with strict mode
- `postcss.config.mjs` - PostCSS (Tailwind) config
- `eslint.config.mjs` - ESLint with flat config
- `drizzle.config.ts` - Drizzle ORM config

## Tailwind CSS 4 Theme

Custom theme in `src/app/globals.css`:

Colors:
- `--color-brand-*` (50-900) - Blue/cyan palette
- `--color-accent-*` (50-900) - Purple/magenta palette
- `--color-surface-*` - Dark theme backgrounds

Components:
- `.glass-card` - Frosted glass cards
- `.gradient-text` - Animated gradient text
- `.btn-primary`, `.btn-secondary` - Styled buttons
- `.input-search` - Search input styling

Animations:
- `.animate-gradient` - Background gradient animation
- `.animate-float` - Floating animation
- `.bg-grid-pattern` - Grid background
- `.bg-radial-gradient` - Radial gradient overlay