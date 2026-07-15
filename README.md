# TaskFlow — Todo List App

Full-stack MVP todo list app: React Native (mobile) + React/Vite (web) sharing one Node.js/Express/Socket.IO backend, real-time synced across devices. Built as a technical screening task for RXDX.

See [CLAUDE.md](./CLAUDE.md) for the full spec/architecture and [CONVERSATION_LOG.md](./CONVERSATION_LOG.md) for the verbatim AI-assisted build transcript.

---

## Stack

| Layer | Tech |
|---|---|
| Mobile | React Native CLI + TypeScript, Zustand, TanStack Query, React Navigation, MMKV |
| Web | React + Vite + TypeScript, Zustand, TanStack Query |
| Backend | Node.js + Express + TypeScript, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT (7-day expiry) |
| Real-time | Socket.IO (per-user rooms) |

## Repo layout

```
server/   Express API + Socket.IO server
app/      React Native CLI mobile app
web/      React + Vite web app
```

Each has its own `package.json`, `.env`, and README-relevant setup below.

---

## Prerequisites

- Node.js ≥ 18 (mobile requires ≥ 22.11.0 — check `app/package.json` engines)
- MongoDB Atlas cluster (or local MongoDB) — connection string needed
- For mobile: Xcode (iOS) and/or Android Studio (Android) set up for React Native CLI

---

## 1. Backend (`server/`)

```bash
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run dev
```

Runs on `http://localhost:3000` by default. Health check: `GET /health`.

**`.env` values:**

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_strong_secret
CLIENT_URL=http://localhost:5173
```

`CLIENT_URL` must match wherever the web app runs — it's used for CORS and Socket.IO's allowed origin.

---

## 2. Web app (`web/`)

```bash
cd web
npm install
cp .env.example .env   # defaults to localhost:3000, adjust if needed
npm run dev
```

Runs on `http://localhost:5173`. Requires the backend running first.

---

## 3. Mobile app (`app/`)

```bash
cd app
npm install
cp .env.example .env   # set API_BASE_URL for your target device
```

**Choosing `API_BASE_URL` in `.env`:**

| Target | API_BASE_URL |
|---|---|
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical device | `http://<your-machine-LAN-IP>:3000` (device must be on same WiFi; find your IP with `ipconfig getifaddr en0` on macOS) |

iOS also needs CocoaPods installed once:

```bash
cd ios && pod install && cd ..
```

Then run:

```bash
npm run ios       # or
npm run android
```

Metro bundler starts automatically; if it's already running from a previous session and the app seems stuck, kill whatever's on port 8081 and restart with `npx react-native start --reset-cache`.

---

## Test accounts

Register via each app's Register screen, or via curl:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@test.com","password":"Test@1234"}'
```

Suggested accounts for testing multi-device sync:

```
user1@test.com / Test@1234
user2@test.com / Test@1234
```

---

## Verifying real-time sync

1. Start the backend, then both the web app and mobile app.
2. Log in as the same user on both.
3. Create/edit/complete/delete a task on one — it should appear on the other within ~1 second via Socket.IO, no refresh needed.
4. Log in as a different user on either client — task lists should be completely separate (isolation enforced at both the API and Socket.IO room level).

## API reference

```
POST /api/auth/register    { email, password } → { token, user }
POST /api/auth/login       { email, password } → { token, user }

GET    /api/tasks          → Task[]              (Authorization: Bearer <token>)
POST   /api/tasks          { title }              → Task
PUT    /api/tasks/:id      { title?, completed? }  → Task
DELETE /api/tasks/:id      → { success: true }
```

## What's not production-ready

- No refresh token — JWT expires in 7 days, requires re-login after
- No backend input validation library (zod/joi)
- No rate limiting
- No password strength enforcement
- No task pagination
- No error boundaries
- No HTTPS locally (required in production)
