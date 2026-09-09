# chat-app-backend

Express + Socket.IO backend for [chat-app](https://github.com/jesusgabri3l/chat-app). Handles Google Sign-In verification, message persistence in Firestore, and realtime message broadcast over WebSockets.

## Stack

- Express 5 + TypeScript 5
- Socket.IO 4
- Firebase (Firestore) via the client SDK
- google-auth-library for verifying Google ID tokens

## Local development

```bash
cp .env.example .env   # fill in real values
npm install
npm run dev
```

Required env vars (see `.env.example`): `PORT`, `CLIENT_ORIGIN` (the frontend origin allowed by CORS/Socket.IO), `GOOGLE_CLIENT_ID`, and the `FIREBASE_*` config values from the Firebase project settings.

## Scripts

- `npm run dev` — run with hot reload (tsx)
- `npm run build` — type-check and emit to `dist`
- `npm start` — run the built server (`dist/index.js`)
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Deploy (Render)

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** from this repo.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add the env vars from `.env.example` in the Render dashboard, with `CLIENT_ORIGIN` set to the deployed frontend URL.

Render's free web services spin down after inactivity and take a few seconds to wake up on the first request.
