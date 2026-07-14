# CLAUDE.md — RXDX Screening Task: Todo List App

## Project Overview
A full-stack MVP todo list app built as a screening task for RXDX.
- ~5 users, each sees only their own private tasks
- Works on **mobile (React Native CLI)** and **web (React + Vite)** simultaneously
- Same user can be logged in on both devices at the same time
- Real-time sync — changes on one device reflect instantly on the other via Socket.IO
- This is a **screen-recorded AI-assisted build** — all prompts, errors, and debugging must be visible

---

## Stack Decisions

| Layer | Choice | Reason |
|---|---|---|
| Mobile | React Native + TypeScript (CLI) | Primary stack, production-grade |
| Web | React + TypeScript (Vite) | Simple, fast, same API client |
| Auth | JWT (jsonwebtoken) | Stateless, works across mobile + web |
| Backend | Node.js + Express + TypeScript | Matches RXDX stack |
| Database | MongoDB Atlas + Mongoose | Matches RXDX stack |
| Real-time | Socket.IO | Task updates pushed to all logged-in devices of same user |
| Token storage (mobile) | MMKV | Fast, synchronous, secure |
| Token storage (web) | localStorage | Simple for MVP |
| State management | Zustand | Lightweight, no boilerplate |
| Backend hosting | Railway / Render | Free tier, one-click deploy |
| Web hosting | Vercel | One command deploy |

**Why Node.js + MongoDB over Firebase:**
Matches RXDX's actual tech stack. Shows full-stack capability — not just Firebase SDK usage.
JWT + MongoDB gives full control over auth and data model. Socket.IO for real-time is
explicit and demonstrable, which is better for a screen recording than Firestore magic.

---

## Architecture Overview

```
Mobile (RN)  ──┐
               ├──► Node.js API (Express) ──► MongoDB Atlas
Web (React)  ──┘         │
                    Socket.IO server
                          │
              ┌───────────┴───────────┐
           Mobile                   Web
        (same user,              (same user,
        real-time updates)      real-time updates)
```

**Real-time flow:**
1. User logs in on mobile → receives JWT → connects to Socket.IO with JWT
2. User logs in on web → receives JWT → connects to Socket.IO with JWT
3. Mobile creates a task → API saves to MongoDB → emits `task:created` to all sockets of that userId
4. Web receives `task:created` event → Zustand store updates → UI re-renders instantly

---

## Folder Structure

### Backend (Node.js + Express)

```
server/
├── src/
│   ├── config/
│   │   ├── db.ts                  # MongoDB connection
│   │   └── env.ts                 # ENV validation
│   ├── controllers/
│   │   ├── authController.ts      # register, login
│   │   └── taskController.ts      # CRUD handlers
│   ├── middleware/
│   │   ├── authMiddleware.ts      # JWT verify, attach req.user
│   │   └── errorMiddleware.ts     # Global error handler
│   ├── models/
│   │   ├── User.ts                # Mongoose User schema
│   │   └── Task.ts                # Mongoose Task schema
│   ├── routes/
│   │   ├── authRoutes.ts          # POST /auth/register, /auth/login
│   │   └── taskRoutes.ts          # GET/POST/PUT/DELETE /tasks
│   ├── socket/
│   │   └── socketHandler.ts       # Socket.IO setup + event handlers
│   ├── types/
│   │   └── index.ts               # Express Request extension, shared types
│   └── index.ts                   # Express app + Socket.IO server entry
├── .env
├── package.json
└── tsconfig.json
```

### Mobile App (React Native CLI)

```
app/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── lotties/
│   ├── components/
│   │   └── cards/
│   │       └── TaskCard.tsx       # Checkbox, title, edit, delete
│   ├── constants/
│   │   └── AppConstants.ts        # App-wide constants
│   ├── contexts/                  # (unused in MVP — using Zustand)
│   ├── enums/
│   │   └── RouteEnum.ts           # Screen name enums
│   ├── hocs/
│   ├── languages/
│   │   ├── en.json
│   │   ├── tn.json
│   │   └── i18n.ts
│   ├── routes/
│   │   ├── Router.tsx             # Stack navigator
│   │   ├── NavigationParamList.ts # Typed route params
│   │   └── RootNavigation.ts      # navigationRef
│   ├── screens/
│   │   ├── splash/
│   │   │   ├── Screen.tsx
│   │   │   └── useScreen.ts       # Check token → navigate
│   │   ├── login/
│   │   │   ├── Screen.tsx
│   │   │   └── useScreen.ts       # POST /auth/login, store JWT
│   │   └── taskList/
│   │       ├── Screen.tsx
│   │       └── useScreen.ts       # Fetch tasks, Socket.IO listener, CRUD
│   ├── services/
│   │   ├── apiServices/
│   │   │   ├── GetApiServices.ts  # getTasks()
│   │   │   ├── PostApiServices.ts # addTask(), login(), register()
│   │   │   └── LookupApiServices.ts
│   │   ├── constants/
│   │   │   ├── ApiConstants.ts    # BASE_URL, API endpoints
│   │   │   └── QueryKeys.ts
│   │   ├── requestModels/
│   │   │   ├── AuthRequest.ts
│   │   │   └── TaskRequest.ts
│   │   ├── responseModels/
│   │   │   ├── AuthResponse.ts
│   │   │   └── TaskResponse.ts
│   │   └── HttpsClient.ts         # Axios instance with JWT interceptor
│   ├── storage/
│   │   ├── MMKV.ts                # MMKV instance
│   │   ├── LocalStore.ts          # get/set token, user
│   │   └── StorageKeys.ts         # TOKEN, USER keys
│   ├── stores/
│   │   ├── authStore.ts           # Zustand — user, token, setAuth, clearAuth
│   │   ├── taskStore.ts           # Zustand — tasks[], loading, setTasks, addTask, etc.
│   │   └── hooks/
│   │       ├── useAuthStore.ts
│   │       └── useTaskStore.ts
│   ├── themes/
│   ├── types/
│   │   └── index.ts               # Task, User, ApiResponse types
│   └── utils/
│       ├── SecurityUtils.ts       # logout, clearToken
│       └── ErrorHandlerUtils.ts   # parseAxiosError
├── android/
├── ios/
├── __tests__/
├── patches/
├── .env                           # API_BASE_URL=http://localhost:3000
├── CLAUDE.md
└── package.json
```

### Web App (React + Vite)

```
web/
├── src/
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   └── AddTaskInput.tsx
│   ├── screens/
│   │   ├── Login.tsx
│   │   └── TaskList.tsx
│   ├── services/
│   │   └── HttpsClient.ts         # Axios instance (same BASE_URL)
│   ├── stores/
│   │   ├── authStore.ts
│   │   └── taskStore.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useTasks.ts
│   └── types/
│       └── index.ts
└── App.tsx
```

---

## Data Models

### MongoDB User Schema
```typescript
// models/User.ts
{
  _id: ObjectId,
  email: string,          // unique, lowercase
  password: string,       // bcrypt hashed
  createdAt: Date,
}
```

### MongoDB Task Schema
```typescript
// models/Task.ts
{
  _id: ObjectId,
  userId: ObjectId,       // ref: 'User' — owner
  title: string,
  completed: boolean,     // default: false
  createdAt: Date,
  updatedAt: Date,
}
```

### JWT Payload
```typescript
{
  userId: string,
  email: string,
  iat: number,
  exp: number,            // 7 days
}
```

---

## API Endpoints

### Auth
```
POST /api/auth/register    { email, password } → { token, user }
POST /api/auth/login       { email, password } → { token, user }
```

### Tasks (all require Authorization: Bearer <token>)
```
GET    /api/tasks          → Task[]           (only this user's tasks)
POST   /api/tasks          { title }          → Task
PUT    /api/tasks/:id      { title?, completed? } → Task
DELETE /api/tasks/:id      → { success: true }
```

**Security:** Every task route calls `authMiddleware` which verifies JWT and
attaches `req.user`. All DB queries filter by `userId: req.user.userId` —
a user can never access another user's tasks even with a valid token.

---

## Socket.IO Events

### Client → Server
```
authenticate    { token }           # Send JWT after connecting
```

### Server → Client
```
task:created    Task                # New task added
task:updated    Task                # Task edited or toggled
task:deleted    { id: string }      # Task removed
```

**How rooms work:**
- On `authenticate`, server verifies JWT and joins socket to room `user:{userId}`
- On any task mutation, server emits event to `user:{userId}` room
- Only sockets belonging to that user receive the event

---

## Key File Responsibilities

### `server/src/index.ts`
- Express app setup
- Socket.IO server attached to HTTP server
- Mount routes: `/api/auth`, `/api/tasks`
- Global error middleware at end

### `server/src/config/db.ts`
- `mongoose.connect(MONGODB_URI)`
- Export connection status

### `server/src/middleware/authMiddleware.ts`
```typescript
// Verify JWT, attach req.user = { userId, email }
// Return 401 if missing or invalid
```

### `server/src/socket/socketHandler.ts`
```typescript
// On connection: wait for 'authenticate' event
// Verify token → join room `user:{userId}`
// Expose emitToUser(userId, event, data) helper
```

### `app/src/services/HttpsClient.ts`
```typescript
// Axios instance with baseURL from .env
// Request interceptor: attach Authorization: Bearer <token> from MMKV
// Response interceptor: handle 401 → clearAuth → navigate to Login
```

### `app/src/services/constants/ApiConstants.ts`
```typescript
export const BASE_URL = process.env.API_BASE_URL;

export const API = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
};
```

### `app/src/storage/StorageKeys.ts`
```typescript
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
};
```

### `app/src/stores/authStore.ts`
```typescript
type AuthStore = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
};
```

### `app/src/stores/taskStore.ts`
```typescript
type TaskStore = {
  tasks: Task[];
  loading: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: string) => void;
  setLoading: (loading: boolean) => void;
};
```

### `app/src/screens/taskList/useScreen.ts`
- Fetch tasks on mount via `GetApiServices.getTasks()`
- Connect to Socket.IO with JWT
- Listen for `task:created`, `task:updated`, `task:deleted`
- Update Zustand taskStore on each event
- Expose handlers: addTask, updateTask, deleteTask, toggleComplete
- Disconnect socket on unmount

### `app/src/utils/ErrorHandlerUtils.ts`
```typescript
export const parseAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Request failed';
  }
  return 'Something went wrong';
};
```

---

## Core Features (MVP Scope)

### Auth
- [x] Register + Login with email/password
- [x] JWT stored in MMKV (mobile) / localStorage (web)
- [x] Persistent session — check token on splash screen
- [x] Logout — clear token + disconnect socket

### Tasks
- [x] Create task
- [x] Read tasks (user's own only)
- [x] Update task title (inline edit)
- [x] Toggle complete (checkbox + strikethrough)
- [x] Delete task
- [x] Empty state + loading state

### Multi-device / Real-time
- [x] Socket.IO connection authenticated with JWT
- [x] Task created on mobile → web updates instantly
- [x] Task toggled on web → mobile updates instantly
- [x] User B cannot see User A's tasks (enforced at API + socket room level)

---

## Test Accounts

Register these via the app or Postman before recording:

```
user1@test.com / Test@1234
user2@test.com / Test@1234
```

---

## Build Steps

Follow these one at a time. Tell Claude Code:
**"Read CLAUDE.md fully. Then do Step N only."**

**Step 1 — Backend Setup**
- Init Node.js + TypeScript project in `server/`
- Install: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `socket.io`, `cors`, `dotenv`
- Install dev: `typescript`, `ts-node-dev`, `@types/*`
- Create `src/index.ts` — Express + Socket.IO server
- Create `src/config/db.ts` — MongoDB connection
- Create `.env` — MONGODB_URI, JWT_SECRET, PORT

**Step 2 — Auth Backend**
- `src/models/User.ts` — Mongoose schema with bcrypt pre-save hook
- `src/middleware/authMiddleware.ts` — JWT verify
- `src/controllers/authController.ts` — register, login
- `src/routes/authRoutes.ts` — POST /api/auth/register, /api/auth/login
- Test with Postman/curl before moving on

**Step 3 — Tasks Backend**
- `src/models/Task.ts` — Mongoose schema with userId ref
- `src/controllers/taskController.ts` — getTasks, addTask, updateTask, deleteTask
- `src/routes/taskRoutes.ts` — protected routes
- All queries filter by `userId: req.user.userId`

**Step 4 — Socket.IO**
- `src/socket/socketHandler.ts` — authenticate event, join user room
- `emitToUser(userId, event, data)` helper
- Call emitToUser after each task mutation in controller

**Step 5 — Mobile Types + Constants**
- `src/types/index.ts` — Task, User, ApiResponse
- `src/services/responseModels/` — TaskResponse, AuthResponse
- `src/services/requestModels/` — TaskRequest, AuthRequest
- `src/services/constants/ApiConstants.ts` — BASE_URL, API endpoints
- `src/services/constants/QueryKeys.ts`
- `src/storage/StorageKeys.ts`
- `src/enums/RouteEnum.ts`

**Step 6 — Mobile Storage + Stores**
- `src/storage/MMKV.ts` — MMKV instance
- `src/storage/LocalStore.ts` — typed get/set helpers
- `src/stores/authStore.ts` + `hooks/useAuthStore.ts`
- `src/stores/taskStore.ts` + `hooks/useTaskStore.ts`

**Step 7 — HttpsClient + Services**
- `src/services/HttpsClient.ts` — Axios + JWT interceptor + 401 handler
- `src/services/apiServices/PostApiServices.ts` — login, register, addTask, updateTask, deleteTask, toggleComplete
- `src/services/apiServices/GetApiServices.ts` — getTasks
- `src/utils/ErrorHandlerUtils.ts` — parseAxiosError
- `src/utils/SecurityUtils.ts` — logout helper

**Step 8 — Navigation**
- `src/routes/NavigationParamList.ts`
- `src/routes/RootNavigation.ts`
- `src/routes/Router.tsx` — Splash → Login → TaskList

**Step 9 — Splash + Login Screens**
- `src/screens/splash/useScreen.ts` — check MMKV token → navigate
- `src/screens/splash/Screen.tsx` — Lottie animation
- `src/screens/login/useScreen.ts` — login handler, store JWT
- `src/screens/login/Screen.tsx` — email, password, login button

**Step 10 — TaskList Screen**
- `src/screens/taskList/useScreen.ts` — fetch tasks, Socket.IO listener, CRUD handlers
- `src/screens/taskList/Screen.tsx` — FlatList, header, AddTaskInput
- `src/components/cards/TaskCard.tsx` — checkbox, title, edit, delete

**Step 11 — Web App**
- `npm create vite@latest web -- --template react-ts`
- Install: `axios`, `socket.io-client`, `zustand`
- Mirror Login + TaskList screens
- Same Axios client with JWT from localStorage
- Socket.IO connection same as mobile
- Deploy to Vercel

**Step 12 — Final Demo + Closing Review**
- Run demo script below
- Record honest closing assessment

---

## What's Not Production-Ready (Say This on Camera)

- No refresh token — JWT expires in 7 days, user has to re-login after
- No input validation on backend (should use zod or joi)
- No rate limiting on API endpoints
- Passwords require no strength enforcement
- No task pagination (fine for 5 users, not for 5000)
- No error boundaries in React/RN
- Socket reconnection not explicitly handled (socket.io-client auto-reconnects but not tested under network drop)
- No HTTPS locally (fine for demo, required in production)
- Web app not mobile-browser optimized

---

## Environment Variables

### `server/.env`
```
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_strong_secret_here
CLIENT_URL=http://localhost:5173
```

### `app/.env`
```
API_BASE_URL=http://10.0.2.2:3000    # Android emulator
# API_BASE_URL=http://localhost:3000  # iOS simulator
```

### `web/.env`
```
VITE_API_BASE_URL=http://localhost:3000
```

---

## How to Use This File With Claude Code

Start each step by saying:
> "Read CLAUDE.md fully. Then do Step N only."

One step at a time. Do not batch steps — it muddies the recording.

When an error occurs:
> "I got this error: [paste error]. Help me understand why and fix it properly."

---

## Opening Prompt for Recording

Use this as your very first prompt on camera:

```
I'm building an MVP todo list app for a technical screening task.
Read my CLAUDE.md first, then confirm you understand:
1. The full stack — Node.js + MongoDB + Socket.IO + React Native + React
2. The folder structure (screen/useScreen pattern, services layer, Zustand stores)
3. How real-time sync works via Socket.IO rooms
4. How user data isolation is enforced at the API level
Ask me if anything needs clarification before we write any code.
```

---

## Demo Script (Final Recording Segment)

```
1. Show server running in terminal (npm run dev)
2. Open web app in browser → login as user1@test.com
3. Open mobile app → login as user1@test.com
4. On mobile: create task "Buy groceries"
5. Show web — task appears instantly (Socket.IO event)
6. On web: mark task complete → show mobile updates
7. On web: edit task title → show mobile updates
8. On mobile: logout → login as user2@test.com
9. Show TaskList — empty (user2 has no tasks)
10. Say: "Private data isolation is enforced at the API level —
    every DB query filters by userId from the JWT.
    Socket.IO rooms ensure only the task owner receives events."
```
