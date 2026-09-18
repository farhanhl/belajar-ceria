# Belajar Ceria — Technical Specification v1

## 1. Tujuan

Dokumen ini mendefinisikan arsitektur teknis untuk **Belajar Ceria**, website pembelajaran interaktif untuk anak usia sekitar 5 tahun.

V1 menggunakan:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion
- dnd-kit
- Zustand
- Zod
- localStorage
- Web Speech API
- Vitest
- Playwright

Tidak menggunakan database atau backend persistence pada V1.

Arsitektur harus tetap modular agar pada masa depan persistence dapat dipindahkan dari localStorage ke database tanpa mengubah sebagian besar business logic dan UI.

---

# 2. Technical Goals

## Primary Goals

1. Website responsif untuk mobile, tablet, dan desktop.
2. Pengalaman interaktif yang cocok untuk anak usia 5 tahun.
3. TTS ramah anak.
4. Multiple child profiles.
5. Progress setiap profile terpisah.
6. Data disimpan secara lokal.
7. Matching game modular.
8. Mudah menambahkan game baru.
9. Bahasa Indonesia sebagai default.
10. English dapat ditambahkan melalui settings.
11. Parent area dapat membaca progress anak.
12. Tidak membutuhkan account/login pada V1.

## Non-Goals V1

- Cloud synchronization
- Database
- Multi-device synchronization
- Online account
- Multiplayer
- Leaderboard
- Server-side game progress
- AI adaptive learning

---

# 3. High-Level Architecture

```text
Browser
│
└── Next.js Application
    │
    ├── App Router
    │
    ├── Presentation Layer
    │   ├── Pages
    │   ├── Components
    │   └── Game UI
    │
    ├── State Layer
    │   └── Zustand
    │
    ├── Domain Layer
    │   ├── Profiles
    │   ├── Games
    │   ├── Progress
    │   ├── Settings
    │   └── TTS
    │
    ├── Storage Layer
    │   └── localStorage
    │
    └── Browser APIs
        └── Web Speech API
```

Business logic tidak boleh bergantung langsung pada React components.

---

# 4. Recommended Project Structure

```text
belajar-ceria/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── profiles/
│   │   └── page.tsx
│   │
│   ├── learn/
│   │   ├── page.tsx
│   │   │
│   │   └── matching/
│   │       ├── page.tsx
│   │       ├── level/
│   │       │   └── page.tsx
│   │       └── result/
│   │           └── page.tsx
│   │
│   ├── parent/
│   │   ├── page.tsx
│   │   └── profile/
│   │       └── [profileId]/
│   │           └── page.tsx
│   │
│   └── settings/
│       └── page.tsx
│
├── components/
│   ├── ui/
│   ├── child/
│   ├── teacher/
│   ├── profile/
│   ├── navigation/
│   └── feedback/
│
├── games/
│   ├── matching/
│   │   ├── components/
│   │   │   ├── MatchingBoard.tsx
│   │   │   ├── MatchingCard.tsx
│   │   │   └── MatchingTarget.tsx
│   │   │
│   │   ├── data/
│   │   │   ├── easy.ts
│   │   │   ├── medium.ts
│   │   │   └── hard.ts
│   │   │
│   │   ├── matching-engine.ts
│   │   ├── matching-types.ts
│   │   └── matching-utils.ts
│   │
│   └── index.ts
│
├── lib/
│   ├── storage/
│   │   ├── storage.ts
│   │   ├── profile-storage.ts
│   │   ├── progress-storage.ts
│   │   └── settings-storage.ts
│   │
│   ├── tts/
│   │   ├── tts.ts
│   │   └── speech-config.ts
│   │
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── id.ts
│   │   └── en.ts
│   │
│   ├── profiles/
│   ├── progress/
│   └── utils/
│
├── stores/
│   ├── profile-store.ts
│   ├── game-store.ts
│   └── settings-store.ts
│
├── types/
│   ├── profile.ts
│   ├── progress.ts
│   ├── game.ts
│   └── settings.ts
│
├── public/
│   ├── images/
│   ├── characters/
│   ├── games/
│   └── sounds/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── prisma/
│   └── # reserved for future database migration
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 5. Next.js

Use:

```text
Next.js App Router
TypeScript
```

Server Components should be used by default.

Client Components should only be introduced when required by:

- browser APIs
- interaction
- state
- drag & drop
- animation
- localStorage
- TTS

Examples of components that will likely be Client Components:

```text
MatchingBoard
MatchingCard
ProfileSelector
TtsButton
GameSession
SettingsPanel
```

---

# 6. Styling

Use:

```text
Tailwind CSS
```

Use `shadcn/ui` only as a technical component foundation.

Do not make the application look like a generic shadcn dashboard.

Belajar Ceria requires a custom visual language:

- colorful
- rounded
- playful
- friendly
- large controls
- large illustrations
- clear hierarchy

---

# 7. Animation

Use:

```text
Motion
```

Animation should be used for:

- card appearance
- correct answer
- incorrect answer
- star reward
- page transitions
- teacher reactions
- buttons
- progress feedback

Animations must remain short and predictable.

Avoid excessive animation that could distract the child.

---

# 8. Drag & Drop

Use:

```text
dnd-kit
```

The matching game should support:

1. Drag an object.
2. Move over target.
3. Release.
4. Validate answer.
5. Show feedback.
6. Update score.
7. Continue or retry.

The game must also provide a tap/click-friendly interaction so it remains usable on touch devices.

---

# 9. State Management

Use:

```text
Zustand
```

Separate global state from game-local state.

Recommended stores:

```text
profile-store
game-store
settings-store
```

## Profile Store

Responsible for:

- profiles
- active profile
- create profile
- select profile
- remove profile if implemented later

## Game Store

Responsible for the current game session:

- game ID
- level
- current question
- questions
- answers
- score
- stars
- completed state

## Settings Store

Responsible for:

- language
- sound enabled
- auto TTS
- volume

Do not put all application state into one giant Zustand store.

---

# 10. localStorage Architecture

The application must NOT call localStorage directly from random UI components.

Use a storage abstraction.

```text
Component
   ↓
Zustand / Domain Service
   ↓
Storage Repository
   ↓
localStorage
```

Example API:

```ts
getProfiles()
createProfile(name)
getProfile(profileId)
setActiveProfile(profileId)
updateProgress(profileId, progress)
getSettings()
updateSettings(settings)
```

This abstraction is important because the storage implementation can later be replaced.

---

# 11. Storage Key

Use a single namespace:

```text
belajar-ceria
```

Recommended keys:

```text
belajar-ceria:data
belajar-ceria:settings
```

A single application data object is preferred for V1 because it makes backup/restore easier.

---

# 12. Application Data Schema

Example:

```ts
type AppData = {
  version: number;
  profiles: ChildProfile[];
  activeProfileId: string | null;
  settings: AppSettings;
};
```

Example data:

```json
{
  "version": 1,
  "profiles": [
    {
      "id": "profile_uuid",
      "name": "Fatimah",
      "createdAt": "2026-09-18T00:00:00.000Z",
      "updatedAt": "2026-09-18T00:00:00.000Z",
      "progress": {}
    }
  ],
  "activeProfileId": "profile_uuid",
  "settings": {
    "language": "id",
    "soundEnabled": true,
    "autoTts": true,
    "volume": 0.8
  }
}
```

---

# 13. Profile Model

```ts
type ChildProfile = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  progress: ProfileProgress;
};
```

Use a UUID for `id`.

The name must never be used as the database/storage identifier.

This supports multiple children with the same name.

---

# 14. Progress Model

Recommended:

```ts
type GameProgress = {
  currentLevel: number;
  stars: number;
  gamesCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastPlayedAt: string | null;
};
```

Profile progress:

```ts
type ProfileProgress = {
  matching: {
    easy: GameProgress;
    medium: GameProgress;
    hard: GameProgress;
  };
};
```

This structure allows future games:

```ts
type ProfileProgress = {
  matching: ...;
  letters: ...;
  numbers: ...;
  memory: ...;
  puzzle: ...;
};
```

---

# 15. Settings Model

```ts
type AppSettings = {
  language: "id" | "en";
  soundEnabled: boolean;
  autoTts: boolean;
  volume: number;
};
```

Default:

```ts
{
  language: "id",
  soundEnabled: true,
  autoTts: true,
  volume: 0.8
}
```

---

# 16. Storage Versioning

localStorage data must include:

```ts
version: number
```

Example:

```json
{
  "version": 1
}
```

If the schema changes in the future:

```text
V1
 ↓ migration
V2
 ↓ migration
V3
```

This prevents existing users from losing progress after an application update.

---

# 17. localStorage Safety

All storage functions must handle:

- missing data
- malformed JSON
- unavailable localStorage
- schema mismatch
- old versions
- corrupted values

Do not allow a storage error to crash the entire application.

If data cannot be parsed, the application should recover gracefully and provide a safe fallback.

---

# 18. TTS Architecture

Do not call the Web Speech API directly from every component.

Create a TTS service:

```ts
speak({
  text,
  language,
  volume
});
```

Other methods:

```ts
stop();
pause();
resume();
isSupported();
```

Architecture:

```text
UI
 ↓
TTS Service
 ↓
SpeechSynthesis
 ↓
Browser
```

---

# 19. TTS Configuration

Indonesian:

```text
id-ID
```

English:

```text
en-US
```

The exact voice available depends on the browser/device.

The application should therefore:

1. Detect available voices.
2. Prefer an Indonesian female voice for Indonesian.
3. Prefer a suitable English female voice for English.
4. Fall back to the browser's default voice.
5. Never fail the game if a preferred voice is unavailable.

---

# 20. TTS UX

Automatic TTS:

```text
Page opens
    ↓
Wait until UI is ready
    ↓
Speak instruction
```

Replay:

```text
🔊
```

Pressing the speaker button should repeat the current instruction.

Do not start multiple speech instances simultaneously.

Before starting new speech:

```text
speechSynthesis.cancel()
```

Then speak the new message.

---

# 21. TTS Content

TTS messages should be short.

Example:

```text
"Selamat datang, Fatimah!"
"Yuk kita bermain!"
"Cari gambar yang sama."
"Hebat! Jawabanmu benar!"
"Tidak apa-apa. Coba lagi, ya."
"Yeay! Kamu berhasil!"
```

Avoid long paragraphs.

---

# 22. Internationalization

Use translation keys.

Example:

```ts
t("welcome", { name })
t("matching.instruction")
t("matching.correct")
t("matching.tryAgain")
```

Do not hard-code Indonesian text throughout components.

Example:

```ts
{
  matching: {
    instruction: "Cari gambar yang sama.",
    correct: "Hebat! Jawabanmu benar!",
    tryAgain: "Tidak apa-apa. Coba lagi, ya."
  }
}
```

English:

```ts
{
  matching: {
    instruction: "Find the matching picture.",
    correct: "Great! You got it right!",
    tryAgain: "That's okay. Try again!"
  }
}
```

---

# 23. Matching Game Architecture

The matching game should be independent from the page.

```text
Matching Game
│
├── Game Data
├── Game Engine
├── Game State
├── Board
├── Card
├── Target
├── Feedback
└── Result
```

---

# 24. Matching Game Data Model

Example:

```ts
type MatchingItem = {
  id: string;
  pairId: string;
  image: string;
  label?: string;
};
```

Example:

```ts
{
  id: "apple-1",
  pairId: "apple",
  image: "/games/matching/apple.png",
  label: "Apel"
}
```

The label is optional because the first version should primarily rely on visual recognition.

---

# 25. Question Model

```ts
type MatchingQuestion = {
  id: string;
  items: MatchingItem[];
  targetId: string;
};
```

The game engine determines:

- which item is correct
- which targets are distractors
- whether the answer is correct
- when the question is completed

The UI should not contain answer-validation logic.

---

# 26. Game Engine

The matching engine should expose pure functions where possible.

Example:

```ts
createQuestion(level)
checkAnswer(question, answerId)
calculateStars(result)
isLevelComplete(progress)
```

Pure functions are easier to test.

---

# 27. Game Session

A session contains exactly:

```text
5 questions
```

Flow:

```text
Start Session
    ↓
Question 1
    ↓
Answer
    ↓
Feedback
    ↓
Question 2
    ↓
...
    ↓
Question 5
    ↓
Result
```

---

# 28. Difficulty

Three difficulty levels:

```ts
type Difficulty = "easy" | "medium" | "hard";
```

## Easy

- identical images
- few objects
- obvious differences
- simple layouts

## Medium

- more objects
- more distractors
- variation in placement/size

## Hard

- more objects
- similar distractors
- eventually semantic relationships

V1 Level 1 must remain visually simple.

---

# 29. Game Result

```ts
type GameResult = {
  profileId: string;
  gameId: string;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
};
```

After the session ends:

```text
GameResult
   ↓
Progress Service
   ↓
Profile Progress
   ↓
Storage
```

---

# 30. Star Calculation

V1 can use a simple rule:

```text
5 correct = 5 stars
4 correct = 4 stars
3 correct = 3 stars
2 correct = 2 stars
1 correct = 1 star
0 correct = 0 stars
```

The system should make the calculation a reusable function so it can change later.

---

# 31. Profile Flow

## No Profile

```text
/
 ↓
Create Profile
 ↓
Name
 ↓
Save Profile
 ↓
Dashboard
```

## One Profile

```text
/
 ↓
Existing Profile
 ↓
Dashboard
```

## Multiple Profiles

```text
/
 ↓
Profile Selection
 ↓
Select Child
 ↓
Dashboard
```

---

# 32. Creating Profile

Validation:

```text
Name required
Minimum reasonable length
Trim whitespace
```

Example:

```ts
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(30)
});
```

Do not require email, password, birth date, or other personal information in V1.

---

# 33. Parent Area

V1 parent area reads local data.

```text
Parent Area
    ↓
Select Child
    ↓
Progress Dashboard
```

Example:

```text
Fatimah

Level: 3
Stars: 18

Games Completed: 12
Questions: 60
Correct: 52
Accuracy: 86.7%
```

Parent area should not modify game progress directly.

---

# 34. Parent Access

Since there is no authentication in V1, parent area should be treated as a convenience feature rather than a secure account system.

If stronger privacy/security is required later, add authentication when backend infrastructure is introduced.

---

# 35. Backup & Restore

Because all data is local, implement a backup mechanism as a future V1.x feature.

Backup:

```text
localStorage
 ↓
JSON
 ↓
Download
```

Restore:

```text
JSON file
 ↓
Validate with Zod
 ↓
Migrate if necessary
 ↓
Save to localStorage
```

Suggested filename:

```text
belajar-ceria-backup.json
```

---

# 36. Data Export Safety

Imported JSON must be validated before writing to localStorage.

Never blindly trust imported data.

Validation should verify:

- version
- profiles
- profile IDs
- names
- progress structure
- settings

---

# 37. Routing

Recommended routes:

```text
/
```

Entry point / profile routing.

```text
/profiles
```

Profile selection.

```text
/learn
```

Game selection.

```text
/learn/matching
```

Matching game.

```text
/learn/matching/result
```

Game result.

```text
/parent
```

Parent dashboard.

```text
/parent/profile/[profileId]
```

Specific child's progress.

```text
/settings
```

Settings.

---

# 38. Navigation Rules

Child navigation should be simple.

Avoid exposing too many links.

Primary navigation:

```text
Home
Games
Settings
```

Parent area should be visually separated.

---

# 39. Responsive Requirements

Breakpoints should support:

```text
Mobile
Tablet
Desktop
```

The game board must dynamically resize.

Touch targets should be large.

Recommended minimum interactive target:

```text
44 × 44 px
```

Prefer larger targets for the child-facing UI.

---

# 40. Performance

Target:

- fast initial load
- optimized images
- lazy-load non-critical game assets
- avoid unnecessary re-renders
- avoid loading all future game assets on startup
- keep animations lightweight

Do not load assets for games that the child has not opened.

---

# 41. Asset Organization

```text
public/
├── characters/
│   └── teacher/
│       ├── idle.png
│       ├── happy.png
│       ├── thinking.png
│       └── encouraging.png
│
├── games/
│   └── matching/
│       ├── animals/
│       ├── fruits/
│       ├── vehicles/
│       └── objects/
│
└── sounds/
```

Teacher states can later be replaced by animated assets without changing game logic.

---

# 42. Teacher Character

The teacher should be represented as a reusable component:

```tsx
<Teacher
  expression="happy"
  message="Hebat!"
  showSpeaker
/>
```

Possible expressions:

```text
idle
happy
encouraging
thinking
celebrating
```

The teacher component should not own game logic.

---

# 43. Error Handling

User-facing errors must be child-friendly.

Do not display technical errors such as:

```text
TypeError: Cannot read properties of undefined
```

Instead:

```text
"Ups, ada masalah sebentar. Yuk coba lagi."
```

Technical details should go to development logs.

---

# 44. Accessibility

Requirements:

- keyboard accessibility where appropriate
- visible focus state
- readable text
- large controls
- TTS support
- replay button
- do not rely only on color
- reduced motion support
- clear interaction feedback

---

# 45. Security & Privacy

V1 stores data only on the local device.

Do not collect unnecessary personal information.

Do not send child profile names to external services unless explicitly required.

TTS text should be generated locally when using Web Speech API.

If a cloud TTS provider is introduced later, privacy implications must be reviewed before implementation.

---

# 46. Browser Considerations

Web Speech API behavior varies by browser and operating system.

The application must:

1. Detect support.
2. Gracefully fall back if unsupported.
3. Never block gameplay because TTS is unavailable.
4. Provide the speaker button when speech is available.
5. Avoid speech overlap.

---

# 47. Testing Strategy

## Unit Tests

Use:

```text
Vitest
```

Test:

- profile creation
- profile selection
- storage parsing
- storage migration
- progress calculation
- star calculation
- matching answer validation
- difficulty configuration
- TTS configuration
- translation lookup

## E2E Tests

Use:

```text
Playwright
```

Test:

```text
New user
 ↓
Create Fatimah
 ↓
Dashboard
 ↓
Matching
 ↓
Complete 5 questions
 ↓
Result
 ↓
Progress saved
 ↓
Reload
 ↓
Progress remains
```

Also:

```text
Create Fatimah
Create Rizky
Select Rizky
Play
 ↓
Verify Fatimah progress is unchanged
```

---

# 48. Important localStorage E2E Test

The following scenario is critical:

```text
Profile A
   ↓
Play game
   ↓
Progress A updated

Profile B
   ↓
Play game
   ↓
Progress B updated

Verify:
Progress A != Progress B
```

This ensures profile isolation.

---

# 49. Suggested Package Categories

Core:

```text
next
react
react-dom
typescript
```

UI:

```text
tailwindcss
shadcn/ui dependencies
```

Interaction:

```text
motion
@dnd-kit/core
```

State:

```text
zustand
```

Validation:

```text
zod
```

Testing:

```text
vitest
@playwright/test
```

No database ORM is required for V1.

---

# 50. Environment Variables

V1 should require as few environment variables as possible.

Because:

- no database
- no authentication backend
- no cloud TTS

The application should ideally run after:

```bash
npm install
npm run dev
```

No external service configuration should be necessary for the core experience.

---

# 51. Development Commands

Recommended:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:e2e
```

---

# 52. TypeScript Rules

Use strict TypeScript.

Recommended:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Avoid:

```ts
any
```

unless there is a documented reason.

Prefer explicit domain types.

---

# 53. Component Rules

Components should have one clear responsibility.

Bad:

```text
MegaDashboard.tsx
```

containing:

- profile management
- TTS
- storage
- game logic
- progress calculation
- UI

Prefer:

```text
ProfileHeader
TeacherCard
GameCard
ProgressSummary
TtsButton
```

with business logic in domain/lib layers.

---

# 54. Game Module Contract

Every future game should follow a similar conceptual contract:

```text
Game
├── metadata
├── levels
├── question generator
├── answer validator
├── scoring
├── progress
└── UI
```

Example:

```ts
type GameDefinition = {
  id: string;
  title: string;
  description: string;
  levels: Difficulty[];
};
```

This makes future games easier to integrate.

---

# 55. Future Game Expansion

The architecture should allow:

```text
games/
├── matching/
├── memory/
├── letters/
├── numbers/
├── colors/
├── shapes/
├── puzzle/
└── story/
```

Each game should reuse:

- profile system
- TTS
- settings
- progress service
- feedback components
- teacher component
- storage layer
- localization

---

# 56. Future Migration to Backend

Current:

```text
UI
 ↓
Domain
 ↓
Storage Interface
 ↓
localStorage
```

Future:

```text
UI
 ↓
Domain
 ↓
Storage Interface
 ↓
API / Database
```

The domain layer should not care whether persistence is localStorage or a remote database.

---

# 57. Recommended Repository Interface

A future-proof interface can be defined conceptually as:

```ts
interface ProfileRepository {
  getAll(): Promise<ChildProfile[]>;
  getById(id: string): Promise<ChildProfile | null>;
  create(profile: ChildProfile): Promise<void>;
  update(profile: ChildProfile): Promise<void>;
}
```

The V1 implementation:

```text
LocalStorageProfileRepository
```

Future:

```text
ApiProfileRepository
```

This allows migration without rewriting UI components.

---

# 58. Hydration Strategy

Because Next.js can render on the server but localStorage exists only in the browser:

```text
Server Render
     ↓
Client Hydration
     ↓
Load localStorage
     ↓
Initialize Zustand
     ↓
Render profile-dependent UI
```

Do not access localStorage during server rendering.

Avoid hydration mismatches.

---

# 59. First Launch Detection

The application should detect:

```text
No profile
```

and route to profile creation.

If profiles exist:

```text
1 profile
→ automatically continue to that profile

2+ profiles
→ show profile selector
```

This creates the simplest possible first-launch experience.

---

# 60. Definition of Done — Technical V1

- [ ] Next.js App Router configured.
- [ ] TypeScript strict mode enabled.
- [ ] Tailwind CSS configured.
- [ ] UI foundation configured.
- [ ] Motion configured.
- [ ] dnd-kit configured.
- [ ] Zustand configured.
- [ ] Zod configured.
- [ ] localStorage abstraction implemented.
- [ ] Storage schema versioning implemented.
- [ ] Profile creation implemented.
- [ ] Profile selection implemented.
- [ ] Multiple profiles supported.
- [ ] Active profile state implemented.
- [ ] Progress isolation implemented.
- [ ] Matching game engine implemented.
- [ ] Five-question sessions implemented.
- [ ] Easy/Medium/Hard implemented.
- [ ] Star calculation implemented.
- [ ] Result screen implemented.
- [ ] TTS service implemented.
- [ ] Automatic TTS implemented.
- [ ] Replay TTS button implemented.
- [ ] Indonesian language implemented.
- [ ] English translation structure implemented.
- [ ] Settings implemented.
- [ ] Teacher component implemented.
- [ ] Parent progress view implemented.
- [ ] Responsive layout implemented.
- [ ] Unit tests implemented.
- [ ] E2E tests implemented.
- [ ] Build works without external services.
- [ ] No database dependency.

---

# 61. Recommended Implementation Order

Implement in this order:

```text
1. Project initialization
        ↓
2. Design system / Tailwind
        ↓
3. Type definitions
        ↓
4. localStorage layer
        ↓
5. Profile system
        ↓
6. Zustand stores
        ↓
7. TTS service
        ↓
8. Teacher component
        ↓
9. Dashboard
        ↓
10. Matching game engine
        ↓
11. Matching UI
        ↓
12. Scoring & stars
        ↓
13. Result page
        ↓
14. Progress persistence
        ↓
15. Settings / i18n
        ↓
16. Parent area
        ↓
17. Backup/restore
        ↓
18. Tests
        ↓
19. Production build
```

---

# 62. Core Technical Principle

The most important architectural rule for Belajar Ceria:

> **UI, game logic, and data persistence must remain separate.**

The desired architecture is:

```text
                 ┌──────────────┐
                 │     UI       │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │    State     │
                 │   Zustand    │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │    Domain    │
                 │ Game/Profile │
                 └──────┬───────┘
                        │
              ┌─────────▼─────────┐
              │ Storage Interface │
              └─────────┬─────────┘
                        │
                 ┌──────▼───────┐
                 │ localStorage │
                 └──────────────┘
```

This allows Belajar Ceria to start as a simple local-only application while maintaining a clean path toward a larger learning platform.

---

# 63. V1 Technical Philosophy

**Keep infrastructure simple, but architecture clean.**

Do not introduce a database, authentication service, cloud storage, or external TTS provider before they are actually needed.

Invest the complexity budget in:

- excellent child UX
- reliable game engine
- clean profile isolation
- reusable TTS
- reusable progress system
- modular game architecture
- responsive design
- testing

The result should be a small, fast, local-first application that can grow into a much larger learning platform without requiring a rewrite.
