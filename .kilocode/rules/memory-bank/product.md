# Product Context: Codex Lingua

## Why This Platform Exists

Traditional language learning apps are limited: gamified drills (Duolingo), basic dialogs (Babbel), or unguided chat (ChatGPT). There's no platform that combines curriculum-grade pedagogy with AI-native experiences, multimodal immersion, and community-powered content at scale.

## Problems It Solves

1. **Depth vs Accessibility**: Apps are either too shallow (games) or too unstructured (raw chat)
2. **Modality Isolation**: Reading, listening, speaking, writing are siloed experiences
3. **Cultural Disconnection**: Content doesn't connect to real media, communities, or culture
4. **AI as Add-on**: AI is bolted on rather than designed into the pedagogy
5. **One-Size-Fits-All**: No adaptation to individual goals, levels, or learning styles

## How It Should Work (User Flow)

1. User lands on platform, browses 120+ languages
2. Selects target language, sees tier (A = full AI, B = partial, etc.)
3. Takes placement assessment (vocab, grammar, listening, speaking)
4. Gets CEFR-level recommendation and personalized path
5. Daily: Immersive content → Drills → AI tutoring → Vocabulary review → Community quest
6. Progress tracked via XP, streaks, mastery vectors, achievements

## Key User Experience Goals

- **"Feels like teleporting into the culture"** - multi-sensory immersion
- **"AI knows me better than a tutor"** - adaptive, supportive, accountable
- **"Never wastes my time"** - ultrafast flows, offline readiness, device continuity

## What This MVP Provides

1. **Landing Page** - Language catalog, feature overview, pricing tiers
2. **Database Schema** - Users, languages, curriculum, exercises, AI, vocabulary, speech, subscriptions
3. **Foundation** - Ready for auth, curriculum pages, API routes

## Integration Points

- **Database**: Drizzle ORM + SQLite already configured
- **Auth**: Add NextAuth or custom auth (not included yet)
- **AI**: Integration points in schema (ai_personas, conversations)
- **Content**: Schema supports curriculum paths, units, lessons