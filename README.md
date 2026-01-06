# Realtime Chat Application — Backend

## Overview

This repository contains the **backend** for a realtime chat application. The backend is built using **Node.js, TypeScript, and Express** with a **clean, layered architecture** suitable for production systems. The goal of this backend is to provide a secure, scalable foundation that can support realtime messaging, authentication, and future feature expansion.

This README is the **single source of truth** for backend documentation. No separate docs folder is required at this stage.

---

## Tech Stack

### Core

* Node.js
* TypeScript
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT (Access Token + Refresh Token)
* httpOnly Cookies
* bcrypt
* Zod (request validation)

### Realtime (Planned)

* Socket.IO

---

## Architecture

The backend follows a **modular, layered architecture**:

* **Routes**: Define API endpoints
* **Controllers**: Handle HTTP request/response
* **Services**: Business logic
* **Models**: Database schemas
* **Middlewares**: Cross‑cutting concerns (auth, errors)
* **Utils**: Reusable helpers (JWT, cookies)

This separation ensures:

* Maintainability
* Testability
* Scalability
* Team‑friendly development

---

## Folder Structure

```
src/
├── config/
│   ├── db.ts            # MongoDB connection
│   ├── env.ts           # Environment variables loader
│   └── index.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.route.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.schema.ts
│   │
│   ├── user/
│   │   ├── user.model.ts
│   │   ├── user.service.ts
│   │   └── user.schema.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
│
├── utils/
│   ├── jwt.ts
│   └── cookie.ts
│
├── app.ts               # Express app setup
├── server.ts            # Server bootstrap
└── index.ts             # Entry point
```

---

## Development Phases

### Phase 1 — Backend Foundation (Current)

* Node.js + TypeScript setup
* Environment configuration
* MongoDB connection
* User model
* Authentication system
* Protected routes
* Request validation with Zod

### Phase 2 — Realtime Messaging (Planned)

* Socket.IO integration
* Typing indicators
* Online / offline status
* Message delivery & seen events

### Phase 3 — Advanced Features (Planned)

* Group chats
* Media messages
* Message reactions
* Search & pagination

---

## API Endpoints (Phase 1)

### Authentication

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | /api/auth/register | Register a new user            |
| POST   | /api/auth/login    | Login user                     |
| POST   | /api/auth/logout   | Logout user                    |
| GET    | /api/auth/me       | Get current authenticated user |

---

## Authentication Flow

1. User registers or logs in
2. Server issues:

   * Access token
   * Refresh token
3. Tokens are stored in **httpOnly cookies**
4. Protected routes use auth middleware
5. Refresh token is used to issue new access tokens

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:3000
```

---

## Scripts

```
npm run dev     # Start development server
npm run build   # Build TypeScript
npm start       # Start production server
```

---

## Error Handling

* Centralized error middleware
* Consistent error response format
* No unhandled promise rejections

---

## Validation

* Zod schemas validate:

  * Request bodies
  * Route params
  * Query strings
* Invalid requests never reach business logic

---

## Status

🚧 Backend under active development

Frontend (Next.js) and realtime features will be added after the backend foundation is complete.
