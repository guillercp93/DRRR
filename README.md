# DRRR — Dollars Chat

Real-time chat app inspired by *Durarara!!* — the Dollars gang's underground communication network.

**Live:** [https://dollars-reactive.web.app](https://dollars-reactive.web.app)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| UI | Material UI v7 |
| Auth | Firebase Authentication |
| Database | Firebase Realtime Database |
| Storage | Firebase Storage |
| Hosting | Firebase Hosting |

## Features

- Real-time messaging with Firebase RTDB listeners
- Email/password authentication
- Online presence tracking
- File uploads (avatars, images)
- Custom dark theme — black + #FFD700 (Dollars yellow)

## Design

**"Urban Underground / Yellow Signal"**

- Absolute black background
- #FFD700 accent as primary signal color
- Staatliches for display headings
- FiraCode for body text
- Grain texture overlay for analog feel

## Setup

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vite build
firebase deploy --only hosting
```
