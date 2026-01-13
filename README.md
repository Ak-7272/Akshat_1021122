# Task Board (Frontend + Backend)

Simple task/board application with a React + Vite frontend and an Express + MongoDB backend.

## Project Structure

- [backend/](backend/) — Express API, authentication, task routes
- [frontend/](frontend/) — React app (Vite), UI components and pages

## Project Links

https://taskmanager-six-dusky.vercel.app/

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth
- Frontend: React, Vite, Axios

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A MongoDB instance (Atlas or local)

## Environment Variables

Create a `.env` file in `backend/` with at least:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — (optional) backend port, default 5000

## Backend — Setup & Run

From project root:

```bash
cd backend
npm install
```

Start in development (auto-restarts with changes):

```bash
npm run dev
```

Or start production:

```bash
npm start
```

The backend exposes routes under `/api` (e.g., `/api/auth`, `/api/tasks`).

Note: CORS is configured to allow cross-origin requests. If you need to restrict origins, update `backend/src/server.js`.

## Frontend — Setup & Run

From project root:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Development Tips

- Backend logs include server start and DB connection; check console for errors.
- Frontend uses `axios` for API calls; configure the base URL in `frontend/src/api/axios.js` if needed.

## Troubleshooting

- If the frontend cannot reach the backend, ensure backend is running and CORS allows your frontend origin.
- Check `.env` values and MongoDB network access (Atlas IP whitelist or local DB running).


