# chat-app-backend

Express + Socket.IO backend for [chat-app](https://github.com/jesusgabri3l/chat-app). Handles Google Sign-In verification, message persistence in Firestore, and realtime message broadcast over WebSockets.

Live at [chat-app-backend-b0ny.onrender.com](https://chat-app-backend-b0ny.onrender.com) (Render free tier — sleeps on inactivity, first request after idle can take ~30-50s to wake up).

## Stack

- Express 5 + TypeScript 5
- Socket.IO 4
- Firebase Admin SDK (Firestore)
- google-auth-library for verifying Google ID tokens

## Local development

```bash
cp .env.example .env   # fill in real values
npm install
npm run dev
```

Required env vars (see `.env.example`):

- `PORT` — defaults to 5000 locally; Render sets this itself in production
- `CLIENT_ORIGIN` — the frontend origin allowed by CORS/Socket.IO (e.g. `http://localhost:5173` in dev, `https://jesusgabri3l.github.io` in production)
- `GOOGLE_CLIENT_ID` — must match the Client ID [chat-app](https://github.com/jesusgabri3l/chat-app) signs in with
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` — from a Firebase service account key (Project settings → Service accounts → Generate new private key)

Firestore security rules should stay locked down (`allow read, write: if false;`) — the Admin SDK authenticates as a trusted server and bypasses rules entirely, so there's no need to open them to clients.

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
5. Add the env vars listed above in the Render dashboard, with `CLIENT_ORIGIN` set to the deployed frontend's origin.
